import { ui } from "./app.js";

export class DATA {
    
  getDailyData(fecha) {
    let newData = this.obtenerDatos().then(data => {
      let confirmedData = data.response.confirmed.locations[48].history;
      let recoveredData = data.response.recovered.locations[39].history;
      let deathsData = data.response.deaths.locations[48].history;

      for (const [key, value] of Object.entries(confirmedData)) {
        let compare = moment(key).format("D/M/YY");
        if (compare == fecha) {
          confirmedData = value;
        }
      }

      for (const [key, value] of Object.entries(recoveredData)) {
        let compare = moment(key).format("D/M/YY");
        if (compare == fecha) {
          recoveredData = value;
        }
      }

      for (const [key, value] of Object.entries(deathsData)) {
        let compare = moment(key).format("D/M/YY");
        if (compare == fecha) {
          deathsData = value;
        }
      }

      ui.fillMainData(fecha, confirmedData, deathsData, recoveredData);
    });
  }

  async obtenerDiario() {
    const url = await fetch(
      "https://covid19-server.chrismichael.now.sh/api/v1/ReportsByCountries/chile"
    );

    let response = await url.json();

    return {
      response
    };
  }

  async obtenerDatos() {
    const url = await fetch(`https://covid19api.herokuapp.com`);

    let response = await url.json();

    return {
      response
    };
  }
}
