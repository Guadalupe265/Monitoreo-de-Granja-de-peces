async function fetchData() {
  try {
    // Reemplaza el UID por el UID real del usuario
    const uid = "9KowmHueV3h6FtNACwyhUCaGvcI2";  // Esto se debe cambiar dinámicamente si es necesario
    const response = await fetch(`https://hara-8d199-default-rtdb.firebaseio.com/UsersData/${uid}/temp.json`);
    const data = await response.json();

    // Verifica si hay un valor de temperatura
    if (data !== null) {
      // Actualiza el contenido en la página
      document.getElementById("temp").innerText = data + " °C";
    } else {
      document.getElementById("temp").innerText = "No disponible";
    }
  } catch (error) {
    console.error("Error al obtener los datos:", error);
  }
}

// Llama a la función para obtener datos al cargar la página
fetchData();

// Actualiza los datos cada 2 segundos
setInterval(fetchData, 2000);
