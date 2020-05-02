// Botón para mostrar índice en dispositivos de tamaño reducido
let indexButton = document.getElementById("index");

// Índice a mostrar
let index = document.getElementById("static");

// callback

const hideIndex = () => {
  indexButton.innerText = "Ver índice";
  index.style.display = "none";
}

// Evento que mostrará el índice para los dispositivos de tamaño reducido

indexButton.addEventListener("click", e => {
  e.preventDefault();

  if (indexButton.innerText === "Ver índice") {
    indexButton.innerText = "Ocultar índice";
    index.style.display = "block";
    index.style.height = "100vh";
    
  } else {
    hideIndex();
  }
});

// Evento que detecta si se hizo click en un item del índice, ya sea de un dispositivo reducido o un monitor grande. Si el dispositivo es reducido (menos de 770px de ancho), el menú debe ocultarse. Si no, el menú se mantiene visible.

document.addEventListener("click", e => {

  const mq2 = matchMedia("(max-width: 770px)");

  if (e.target.classList.contains("item") && mq2.matches) {
    hideIndex();
  }
});
