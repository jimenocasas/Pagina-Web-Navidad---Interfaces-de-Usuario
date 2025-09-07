document.getElementById("localizar-btn").addEventListener("click", () => {
  const mapImage = document.getElementById("imagen-mapamundi");
  const locationIcon = document.getElementById("santa-icon");
  const localizarBtn = document.getElementById("localizar-btn");


  // Cambiar la imagen del mapamundi con una transición
  mapImage.style.opacity = "0.5"; // Desaparece
  setTimeout(() => {
    mapImage.src = "media/mapamundi2.jpg"; // Cambia la imagen
    mapImage.style.opacity = "0.5"; // Vuelve a aparecer 
    console.log("entra");
  }, 1100); // Tiempo de la transición (1s)
  
  // Mostrar el icono de la ubicación después de la transición
  setTimeout(() => {
    locationIcon.style.display = "block";
    mapImage.style.opacity = "1"; // Vuelve a aparecer 
  }, 1500); // Mismo tiempo que la transición

  // Deshabilitar el botón para evitar más clics
  localizarBtn.disabled = true;
  localizarBtn.style.cursor = "not-allowed"; // Prohibido más clics
    
  });