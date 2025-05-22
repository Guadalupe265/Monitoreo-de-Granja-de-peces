const uid = "9KowmHueV3h6FtNACwyhUCaGvcI2";

const variableMap = {
  "Temperatura": "temp",
  "Ph": "ph",
  "Conductividad": "tds",
  "Turbidez": "turbidez",
  "Oxigeno Disuelto": "OxiDisu"
};

const umbrales = {
  temp: 30,
  ph: 8.5,
  tds: 1500,
  turbidez: 50,
  OxiDisu: 8
};

let chart = null;
let currentVariable = null;
let updateInterval = null;
const historicoDatos = {}; // Almacena los historiales por variable

function inicializarOActualizarGrafica(variable, label) {
  const ctx = document.getElementById("graficaVariable").getContext("2d");

  if (!chart) {
    chart = new Chart(ctx, {
      type: "line",
      data: {
        labels: historicoDatos[variable]?.labels || [],
        datasets: [{
          label: label,
          data: historicoDatos[variable]?.values || [],
          borderColor: "rgba(54, 162, 235, 1)",
          backgroundColor: "rgba(54, 162, 235, 0.2)",
          fill: true,
          tension: 0.3,
          borderWidth: 2
        }]
      },
      options: {
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

async function actualizarGrafica() {
  if (!currentVariable) return;

  const res = await fetch(`https://hara-8d199-default-rtdb.firebaseio.com/UsersData/${uid}/${currentVariable}.json`);
  const valor = await res.json();
  const hora = new Date().toLocaleTimeString();

  if (!historicoDatos[currentVariable]) {
    historicoDatos[currentVariable] = { labels: [], values: [] };
  }

  historicoDatos[currentVariable].labels.push(hora);
  historicoDatos[currentVariable].values.push(valor);

  if (historicoDatos[currentVariable].labels.length > 15) {
    historicoDatos[currentVariable].labels.shift();
    historicoDatos[currentVariable].values.shift();
  }

  // ALERTA VISUAL
  const limite = umbrales[currentVariable];
  const alerta = valor > limite;

  if (alerta) {
    chart.data.datasets[0].borderColor = "rgba(255, 0, 0, 1)";
    chart.data.datasets[0].backgroundColor = "rgba(255, 0, 0, 0.2)";
    document.getElementById("alerta").innerText = `⚠ Valor alto: ${valor} supera el límite de ${limite}`;
  } else {
    chart.data.datasets[0].borderColor = "rgba(54, 162, 235, 1)";
    chart.data.datasets[0].backgroundColor = "rgba(54, 162, 235, 0.2)";
    document.getElementById("alerta").innerText = "";
  }

  chart.data.labels = historicoDatos[currentVariable].labels;
  chart.data.datasets[0].data = historicoDatos[currentVariable].values;
  chart.update();
}

document.querySelectorAll('#opciones > .opcion').forEach((opcion) => {
  opcion.addEventListener('click', async (e) => {
    e.preventDefault();

    const titulo = e.currentTarget.querySelector('.titulo').innerText;
    const variable = variableMap[titulo];

    currentVariable = variable;

    inicializarOActualizarGrafica(variable, titulo);

    if (updateInterval) clearInterval(updateInterval);
    await actualizarGrafica();
    updateInterval = setInterval(actualizarGrafica, 5000);
  });
});

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
} // Agrega esto como evento onclick en un botón
