async function fetchData() {
  try {
    const uid = "9KowmHueV3h6FtNACwyhUCaGvcI2";

    const [tempRes, phRes, tdsRes, turbidezRes] = await Promise.all([
      fetch(`https://hara-8d199-default-rtdb.firebaseio.com/UsersData/${uid}/temp.json`),
      fetch(`https://hara-8d199-default-rtdb.firebaseio.com/UsersData/${uid}/ph.json`),
      fetch(`https://hara-8d199-default-rtdb.firebaseio.com/UsersData/${uid}/tds.json`),
      fetch(`https://hara-8d199-default-rtdb.firebaseio.com/UsersData/${uid}/turbidez.json`)
    ]);

    const [temp, ph, tds, turbidez] = await Promise.all([
      tempRes.json(),
      phRes.json(),
      tdsRes.json(),
      turbidezRes.json()
    ]);

    document.getElementById("temp").innerText = temp !== null ? `${temp} °C` : "No disponible";
    document.getElementById("phValue").innerText = ph !== null ? `${ph} pH` : "No disponible";
    document.getElementById("tdsValue").innerText = tds !== null ? `${tds} mg/L` : "No disponible";
    document.getElementById("turbidezValor").innerText = turbidez !== null ? `${turbidez} NTU` : "No disponible";

  } catch (error) {
    console.error("Error al obtener los datos:", error);
  }
}

fetchData();
setInterval(fetchData, 5000);
