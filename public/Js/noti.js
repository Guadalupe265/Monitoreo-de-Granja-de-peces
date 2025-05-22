// === noti.js ===

const uid = "9KowmHueV3h6FtNACwyhUCaGvcI2";

const variableMap = {
  "Temperatura": "temp",
  "Ph": "ph",
  "Conductividad": "tds",
  "Turbidez": "turbidez",
  "Oxigeno Disuelto": "Ox1Disu"
};

const umbrales = {
  temp: 27,
  ph: 8.5,
  tds: 1500,
  turbidez: 50,
  Ox1Disu: 8
};

let chart = null;
let currentVariable = null;
const historicoDatos = {}; // Almacena los historiales por variable

function inicializarOActualizarGrafica(variable, label) {
  const ctx = document.getElementById("graficaVariable").getContext("2d");

  if (!chart) {
    chart = new Chart(ctx, {
      type: "line",
      data: {
        labels: [],
        datasets: [{
          label: label,
          data: [],
          borderColor: "rgba(75,192,192,1)",
          backgroundColor: "rgba(75,192,192,0.2)",
          fill: true,
          tension: 0.4,
          borderWidth: 2
        }]
      },
      options: {
        responsive: true,
        scales: { y: { beginAtZero: true } }
      }
    });
  } else {
    chart.data.labels = historicoDatos[variable]?.labels || [];
    chart.data.datasets[0].data = historicoDatos[variable]?.values || [];
    chart.data.datasets[0].label = label;
    chart.update();
  }
}

async function actualizarTodasLasVariables() {
  for (const [nombre, clave] of Object.entries(variableMap)) {
    const res = await fetch(`https://hara-8d199-default-rtdb.firebaseio.com/UsersData/${uid}/${clave}.json`);
    const valor = await res.json();
    const hora = new Date().toLocaleTimeString();

    if (!historicoDatos[clave]) {
      historicoDatos[clave] = { labels: [], values: [] };
    }

    historicoDatos[clave].labels.push(hora);
    historicoDatos[clave].values.push(valor);

    if (historicoDatos[clave].labels.length > 15) {
      historicoDatos[clave].labels.shift();
      historicoDatos[clave].values.shift();
    }

    // Si esta variable está siendo visualizada, actualiza la gráfica
    if (clave === currentVariable && chart) {
      const limite = umbrales[clave];
      const alerta = valor > limite;

      chart.data.labels = historicoDatos[clave].labels;
      chart.data.datasets[0].data = historicoDatos[clave].values;

      if (alerta) {
        chart.data.datasets[0].borderColor = "rgba(255, 0, 0, 1)";
        chart.data.datasets[0].backgroundColor = "rgba(255, 0, 0, 0.2)";
        document.getElementById("alerta").innerText = `⚠ Valor alto: ${valor} supera el límite de ${limite}`;
      } else {
        chart.data.datasets[0].borderColor = "rgba(75,192,192,1)";
        chart.data.datasets[0].backgroundColor = "rgba(75,192,192,0.2)";
        document.getElementById("alerta").innerText = "";
      }

      chart.update();
    }
  }
}

document.querySelectorAll('#opciones > .opcion').forEach((opcion) => {
  opcion.addEventListener('click', async (e) => {
    e.preventDefault();

    const titulo = e.currentTarget.querySelector('.titulo').innerText;
    const variable = variableMap[titulo];

    currentVariable = variable;

    contenidoSelect.innerHTML = e.currentTarget.innerHTML;

    select.classList.remove('active');
    opciones.classList.remove('active');

    inicializarOActualizarGrafica(variable, titulo);
    await actualizarTodasLasVariables();
  });
});

// ACTIVA la funcionalidad del menú flotante (faltaba incluir esta parte)
const select = document.querySelector('#select');
const opciones = document.querySelector('#opciones');
const contenidoSelect = document.querySelector('#select .contenido-select');
const hiddenInput = document.querySelector('#inputSelect');

select.addEventListener('click', () => {
  select.classList.toggle('active');
  opciones.classList.toggle('active');
});

setInterval(actualizarTodasLasVariables, 600000); // Actualiza todas cada 10 min

function exportarXLSX() {
  if (!currentVariable || !historicoDatos[currentVariable]) {
    alert("Selecciona una variable primero.");
    return;
  }

  const data = historicoDatos[currentVariable];
  const rows = [["Hora", currentVariable.toUpperCase()]];

  for (let i = 0; i < data.labels.length; i++) {
    rows.push([data.labels[i], data.values[i]]);
  }

  const worksheet = XLSX.utils.aoa_to_sheet(rows);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Datos");

  XLSX.writeFile(workbook, `${currentVariable}_historial.xlsx`);
}
