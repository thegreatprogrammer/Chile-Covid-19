import { ui } from "./app.js";

export class DATA {

  constructor(){
    this.daily;
  }

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

    this.daily = response;

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

  provideArray(proyeccion){

    let newData = this.obtenerDatos().then(data => {

      let confirmedData = data.response.confirmed.locations[48].history;
      let recoveredData = data.response.recovered.locations[39].history;
      let deathsData = data.response.deaths.locations[48].history;

      // Lógica para obtener el array ordenado de las fechas y cantidades 
      
      const orderArray = (info) =>{
        
        let newFecha, newArray = [], arr = [];

        for (const [key, value] of Object.entries(info)) {
          
          if (value !== 0) {

            let aux;
            newFecha = key.split('/');

            aux = newFecha[0];
            newFecha[0] = newFecha[1];
            newFecha[1] = aux;

            let array = [newFecha, value];
            arr.push(array);
          }
        }

        let arr3 = [], arr4 = [], arr5 = [], arr6 = [], arr7 = [];

        for(let i = 1; i<31; i++){
          for(let j = 0; j< arr.length; j++){
            if(arr[j][0][0] == i){
                  newArray.push(arr[j]);
              }
          }
        }

      for(let j = 0; j< newArray.length; j++){
        switch(newArray[j][0][1]){
          case '3':
            arr3.push(newArray[j]);
            break;

          case '4':
            arr4.push(newArray[j]);
            break;
              
          case '5':
            arr5.push(newArray[j]);
            break;
            
           case '6':
            arr6.push(newArray[j]);
            break;
            
            case '7':
            arr7.push(newArray[j]);
            break;
          }
        }

        let array = [];
        array = array.concat(arr3, arr4, arr5, arr6, arr7);
                  
        return array

      };

      let confirmed = orderArray(confirmedData);
      let recovered = orderArray(recoveredData);
      let deaths = orderArray(deathsData);

      // Confirmados 

      for(let i = 0; i <= confirmed.length; i++){

        let factor, dato;

        if(i === 0){

          dato = confirmed[i][0].join('/');
          factor = 0;

          proyeccion.innerHTML += 
          `
          <tr>
            <th scope="row">${dato}</th>
            <td>${confirmed[i][1]}</td>
            <td>${factor}</td>
            <td>${confirmed[i][1]}</td>
          </tr>
        `
        }else {
        
          if(i === confirmed.length){

            dato = confirmed[i-1][0].join('/');

            factor = ((Number(document.getElementById('confirm1').innerText)/(confirmed[i-1][1]))).toFixed(3);

            if(factor !== 1.000 && Number(document.getElementById('confirm1').innerText) - confirmed[i-1][1] !== 0){
                proyeccion.innerHTML += 
                `
                  <tr>
                    <th scope="row">${moment().format('D/M/YY')}</th>
                    <td>${Number(document.getElementById('confirm1').innerText) - confirmed[i-1][1]}</td>
                    <td>${factor}</td>
                    <td>${Number(document.getElementById('confirm1').innerText)}</td>
                  </tr>
                `
            }

          }

          else{

            dato = confirmed[i][0].join('/');

            factor = ((confirmed[i][1]/(confirmed[i-1][1]))).toFixed(3);
            
            proyeccion.innerHTML += `
              <tr>
                <th scope="row">${dato}</th>
                <td>${confirmed[i][1] - confirmed[i-1][1]}</td>
                <td>${factor}</td>
                <td>${confirmed[i][1]}</td>
              </tr>
            `
            }
        }
      }

      // Recuperados 

      /*let recuperados = document.getElementById('recuperados');

      for(let i = 0; i <= recovered.length; i++){

        let factor, dato;

        if(i === 0){

          dato = recovered[i][0].join('/');
          factor = 0;

          recuperados.innerHTML += 
          `
          <tr>
            <th scope="row">${dato}</th>
            <td>${recovered[i][1]}</td>
            <td>${factor}</td>
            <td>${recovered[i][1]}</td>
          </tr>
        `
        } else {
        
          if(i === recovered.length){

            dato = recovered[i-1][0].join('/');

            factor = ((Number(document.getElementById('recover1').innerText)/(recovered[i-1][1]))).toFixed(3);

            if(factor !== 1.000 && Number(document.getElementById('recover1').innerText) - recovered[i-1][1] !== 0){
                
             if(Number(document.getElementById('recover1').innerText) - recovered[i-1][1] > 0){
       
              recuperados.innerHTML += 
                `
                  <tr>
                    <th scope="row">${moment().format('D/M/YY')}</th>
                    <td>${Number(document.getElementById('recover1').innerText) - recovered[i-1][1]}</td>
                    <td>${factor}</td>
                    <td>${Number(document.getElementById('recover1').innerText)}</td>
                  </tr>
                `
             } 
            }
            
          }

          else{

            dato = recovered[i][0].join('/');

            factor = ((recovered[i][1]/(recovered[i-1][1]))).toFixed(3);
            
            recuperados.innerHTML += `
              <tr>
                <th scope="row">${dato}</th>
                <td>${recovered[i][1] - recovered[i-1][1]}</td>
                <td>${factor}</td>
                <td>${recovered[i][1]}</td>
              </tr>
            `
            }
        }
      }*/

      // Fallecidos 

      let fallecidos = document.getElementById('fallecidos');

      for(let i = 0; i <= deaths.length; i++){

        let factor, dato;

        if(i === 0){

          dato = deaths[i][0].join('/');
          factor = 0;

          fallecidos.innerHTML += 
          `
          <tr>
            <th scope="row">${dato}</th>
            <td>${deaths[i][1]}</td>
            <td>${factor}</td>
            <td>${deaths[i][1]}</td>
          </tr>
        `
        } 
        
        else {
        
          if(i === deaths.length){

            dato = deaths[i-1][0].join('/');

            factor = ((Number(document.getElementById('death1').innerText)/(deaths[i-1][1]))).toFixed(3);
            

            if(factor !== 1.000 && Number(document.getElementById('death1').innerText) - deaths[i-1][1] !== 0){
                fallecidos.innerHTML += 
                `
                  <tr>
                    <th scope="row">${moment().format('D/M/YY')}</th>
                    <td>${Number(document.getElementById('death1').innerText) - deaths[i-1][1]}</td>
                    <td>${factor}</td>
                    <td>${Number(document.getElementById('death1').innerText)}</td>
                  </tr>
                `
            }

          }

          else{

            dato = deaths[i][0].join('/');

            factor = ((deaths[i][1]/(deaths[i-1][1]))).toFixed(3);
            
            fallecidos.innerHTML += `
              <tr>
                <th scope="row">${dato}</th>
                <td>${deaths[i][1] - deaths[i-1][1]}</td>
                <td>${factor}</td>
                <td>${deaths[i][1]}</td>
              </tr>
            `
          }
        }
      }

      // SIR

      let sir = document.getElementById('SIR');
      let newConfirmed = [];

    /*  const newFilter = () => {

        let fecha2 = new Date('2020-04-14').toLocaleDateString();

        for(let i = 0; i<confirmed.length; i++){

          let fecha1 = new Date(confirmed[i][0].join('/')).toLocaleDateString();

          if(fecha1 >= fecha2){
            newConfirmed.push(confirmed[i][0]);
          }
        }
      };

      newFilter();*/

     /* const newFilter = confirmed.filter( confirm => new Date(confirm[0].join('/')).toLocaleDateString() > new Date('2020-04-14').toLocaleDateString());

      console.log(newFilter); 
      /*for(let i = 0; i <= deaths.length; i++){

        let factor, dato;

        if(i === 0){

          dato = deaths[i][0].join('/');
          factor = 0;

          fallecidos.innerHTML += 
          `
          <tr>
            <th scope="row">${dato}</th>
            <td>${deaths[i][1]}</td>
            <td>${factor}</td>
            <td>${deaths[i][1]}</td>
          </tr>
        `
        } 
        
        else {
        
          if(i === deaths.length){

            dato = deaths[i-1][0].join('/');
            let newFecha = moment().format('D/M/YY');

            if(dato === newFecha){
              factor = 0;
              dato = moment().format('D/M/YY');
              fallecidos.innerHTML += 
              `
                <tr>
                  <th scope="row">${dato}</th>
                  <td>${Number(document.getElementById('death1').innerText) - deaths[i-1][1]}</td>
                  <td>${factor}</td>
                  <td>${document.getElementById('death1').innerText}</td>
                </tr>
              `
            }

          }

          else{

            dato = deaths[i][0].join('/');

            factor = ((deaths[i][1]/(deaths[i-1][1]))).toFixed(3);
            
            fallecidos.innerHTML += `
              <tr>
                <th scope="row">${dato}</th>
                <td>${deaths[i][1] - deaths[i-1][1]}</td>
                <td>${factor}</td>
                <td>${deaths[i][1]}</td>
              </tr>
            `
          }
        }
      }*/
      
      }
    )

  }
}

export const data = new DATA();
