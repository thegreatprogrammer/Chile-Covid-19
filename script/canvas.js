import { DATA } from "./data.js";

let data = new DATA();

export class Canvas {

  // Se le pasan dos parámetros: el div donde se insertará el gráfico, el array que contendrá la cantidad en días y el array con la data.

  createGraph(label, data, large) {

    let chart1 = document.getElementById('chart1');
    let chart2 = document.getElementById('chart2');
    let chart3 = document.getElementById('chart3');

    if(label === 'Contagiados'){

      let ctx = chart1.getContext("2d");
    ctx.lineCap = "round";
    let myChart = new Chart(ctx, {
      type: "line",
      data: {
        // aquí irán los días
        labels: large,
        datasets: [
          {
            label: `${label} desde el 3 de marzo`,
            // aquí las cantidades de afectados
            data: data,
            options: {},
            backgroundColor: ["rgba(0, 0, 0, 0)"],

            borderColor: [this.setColor(label)],

            borderWidth: 3
          }
        ]
      },
      options: {
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true
              }
            }
          ]
        }
      }
    });

      document.getElementById('chart1').innerHTML = myChart;
      document.getElementById('n1').style.display = 'block';
    }

    if(label === 'Recuperados'){

      let ctx = chart2.getContext("2d");
    ctx.lineCap = "round";
    let myChart = new Chart(ctx, {
      type: "line",
      data: {
        // aquí irán los días
        labels: large,
        datasets: [
          {
            label: `${label} desde el 3 de marzo`,
            // aquí las cantidades de afectados
            data: data,
            options: {},
            backgroundColor: ["rgba(0, 0, 0, 0)"],

            borderColor: [this.setColor(label)],

            borderWidth: 3
          }
        ]
      },
      options: {
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true
              }
            }
          ]
        }
      }
    });

      document.getElementById('chart2').innerHTML = myChart;
      document.getElementById('n2').style.display = 'block';
      
    }

    if(label === 'Fallecidos'){

      let ctx = chart3.getContext("2d");
    ctx.lineCap = "round";
    let myChart = new Chart(ctx, {
      type: "line",
      data: {
        // aquí irán los días
        labels: large,
        datasets: [
          {
            label: `${label} desde el 3 de marzo`,
            // aquí las cantidades de afectados
            data: data,
            options: {},
            backgroundColor: ["rgba(0, 0, 0, 0)"],

            borderColor: [this.setColor(label)],

            borderWidth: 3
          }
        ]
      },
      options: {
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true
              }
            }
          ]
        }
      }
    });

      document.getElementById('chart3').innerHTML = myChart;
      document.getElementById('n3').style.display = 'block';

    }
  }

  setDays(limit) {
    let days = [];

    for (let i = 1; i <= limit; i++) {
      days.push(i);
    }

    return days;
  }

  setColor(color) {
    if (color === "Contagiados") {
      return "rgb(255, 128, 0)";
    }

    if (color === "Recuperados") {
      return "rgb(0, 255, 0)";
    }

    if (color === "Fallecidos") {
      return "rgb(255, 0, 0)";
    }
  }

  setDataGraph(arr, label) {
    let newArray = [];

    for (const [key, value] of Object.entries(arr)) {
      if (value === 0) {
        continue;
      }

      newArray.push(value);
    }

    newArray.sort((a, b) => a - b);

    let days = this.setDays(newArray.length);

    this.createGraph(label, newArray, days);
  }

  // Método para cargar gráficos
  setGraphs(category) {
    let datos, arr;

    switch (category) {
      case "contagiados":
        data.obtenerDatos().then(data => {
          arr = Object.values(data.response.confirmed.locations[48].history);
          this.setDataGraph(arr, "Contagiados");
        });

        break;

      case "recuperados":
        data.obtenerDatos().then(data => {
          arr = Object.values(data.response.recovered.locations[39].history);

          this.setDataGraph(arr, "Recuperados");
        });

        break;

      case "fallecidos":
        data.obtenerDatos().then(data => {
          arr = Object.values(data.response.deaths.locations[48].history);
          this.setDataGraph(arr, "Fallecidos");
        });

        break;
    }
  }
}
