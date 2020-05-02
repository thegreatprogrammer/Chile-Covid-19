import { DATA } from "./data.js";
import { Interfaz } from "./ui.js";
import { Canvas } from "./canvas.js";

export let data = new DATA();
export let canvas = new Canvas();
export let ui = new Interfaz();

export class APP {
  constructor(search) {
    // Trayendo elementos de UI
    this.searchButton = search;
    this.events();
  }

  events() {
    // Evento para el botón buscar, realiza llamado al método dataNumbers() de ui, pasando como parámetro el día dado por el usuario.
    this.searchButton.addEventListener("click", e => {
      e.preventDefault();

      // obtener la fecha proporcionada por usuario y actualizar datos
      let valueData = new Date(
        document.getElementById("fecha").value
      ).toUTCString();

      valueData = moment.utc(valueData).format("D/M/YY");

      ui.dataNumbers(valueData);
    });  
    
    document.addEventListener('DOMContentLoaded', e =>{
        canvas.setGraphs('contagiados');
        canvas.setGraphs('recuperados');
        canvas.setGraphs('fallecidos');
    });

  }
}
