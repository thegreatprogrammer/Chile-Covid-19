import { ui } from "./app.js";

export class DATA {

  constructor(){
    this.daily;
  }

  // Obtener data diaria, recibe la fecha dada por el usuario como parámetro
  async getDailyData(fecha) {

    // https://covid-api.mmediagroup.fr/v1/history?country=Chile&status=confirmed

    // Un método por cada categoría: Contagiados, recuperados, fallecidos.

    let fechaReady, confirmed, deaths, recovered;

    fechaReady = moment(fecha).format("YYYY-MM-DD");

    let dataContagiados =  await this.obtenerContagiados().then(data => {

      let confirmedData = data.response.All.dates;

      // Se recorren todas las fechas   
      // key y value corresponden a: fecha y valor de contagiados
      for (const [key, value] of Object.entries(confirmedData)) {

        // se almacena la fecha correspondiente a cada iteración y se formatea
        // formateando la fecha de YY/M/D a YY-M-D
        let compare = moment(key).format("YYYY-MM-DD");

        // si la fecha de la iteración actual coincide con la fecha dada por el usuario, hace match
        if (compare == fechaReady) {
          confirmed = value;
        }
      }
    });

    let dataFallecidos = await this.obtenerFallecidos().then(data => {

      let deathsData = data.response.All.dates;

      // Se recorren todas las fechas   
      // key y value corresponden a: fecha y valor de contagiados
      for (const [key, value] of Object.entries(deathsData)) {

        // se almacena la fecha correspondiente a cada iteración y se formatea
        // formateando la fecha de YY/M/D a YY-M-D
        let compare = moment(key).format("YYYY-MM-DD");

        // si la fecha de la iteración actual coincide con la fecha dada por el usuario, hace match
        if (compare == fechaReady) {
          deaths = value;
        }
      }
    });

    let dataRecuperados = await this.obtenerRecuperados().then(data => {

      let recoveredData = data.response.All.dates;

      // Se recorren todas las fechas   
      // key y value corresponden a: fecha y valor de contagiados
      for (const [key, value] of Object.entries(recoveredData)) {

        // se almacena la fecha correspondiente a cada iteración y se formatea
        // formateando la fecha de YY/M/D a YY-M-D
        let compare = moment(key).format("YYYY-MM-DD");

        // si la fecha de la iteración actual coincide con la fecha dada por el usuario, hace match
        if (compare == fechaReady) {
          recovered = value;

          // Despliega los valores en interfaz
          ui.fillMainData(moment(fecha).format("DD/MM/YYYY"), confirmed, deaths, recovered);
        }
      }
    });

      
  }

  // async obtenerDiario() {
  //   const url = await fetch(
  //     "https://covid19-server.chrismichael.now.sh/api/v1/ReportsByCountries/chile"
  //   );

  //   let response = await url.json();

  //   this.daily = response;

  //   return {
  //     response
  //   };
  // }

  async obtenerDatos() {

    const url = await fetch(`https://covid-api.mmediagroup.fr/v1/cases?country=Chile`);

    const response = await url.json();

    return {
      response
    };
  }

  async obtenerContagiados() {

    const url = await fetch(`https://covid-api.mmediagroup.fr/v1/history?country=Chile&status=confirmed`);

    const response = await url.json();

    return {
      response
    };
  }

  async obtenerFallecidos() {

    const url = await fetch(`https://covid-api.mmediagroup.fr/v1/history?country=Chile&status=deaths`);

    const response = await url.json();

    return {
      response
    };
  }

  async obtenerRecuperados() {

    const url = await fetch(`https://covid-api.mmediagroup.fr/v1/history?country=Chile&status=recovered`);

    const response = await url.json();

    return {
      response
    };
  }

  async provideArray(proyeccion){

    // se debe llamar a cada metodo según categoría

    // empezar desde 1 de marzo
    // se debe poner comenzando en 2020 (reversar las fechas)
    // calcular bien la cantidad por día
    // para el segundo re brote colorear las celdas de un color distinto (rojo)
    // colocar gráficos actualizados

    let dataContagiados = this.obtenerContagiados().then(data => {

      let confirmedData = data.response.All.dates;
      let tempData = [];
      let fechaTemp;

      for (const [key, value] of Object.entries(confirmedData)) {
          
        if (value !== 0) {

          fechaTemp = moment(key).format("D/MM/YYYY");
          let date = {'fecha': fechaTemp, 'valor': value};
          tempData.push(date)

        }
      }

      // reversando el array
      tempData.reverse();

      for(let i = 0; i <= tempData.length; i++){

        let factor = 1, dato;

        // Insertando filas de la tabla
        if(i === 0){

          proyeccion.innerHTML += 
          `
          <tr>
            <th scope="row">${tempData[0].fecha}</th>
            <td>${tempData[0].valor}</td>
            <td>${factor}</td>
            <td>${tempData[0].valor}</td>
          </tr>
        `
        }else {
        
          if(i === tempData.length){

            factor = ((Number(document.getElementById('confirm1').innerText)/(tempData[i-1].valor))).toFixed(3);

            if(factor !== 1.000 && Number(document.getElementById('confirm1').innerText) - tempData[i-1].valor !== 0){
                proyeccion.innerHTML += 
                `
                  <tr>
                    <th scope="row">${moment().format('D/M/YYYY')}</th>
                    <td>${Number(document.getElementById('confirm1').innerText) - tempData[i-1].valor}</td>
                    <td>${factor}</td>
                    <td>${Number(document.getElementById('confirm1').innerText)}</td>
                  </tr>
                `
            }

          }

          else{

            dato = tempData[i].fecha;

            factor = ((tempData[i].valor/tempData[i-1].valor)).toFixed(3);
            
            proyeccion.innerHTML += `
              <tr>
                <th scope="row">${dato}</th>
                <td>${tempData[i].valor - tempData[i-1].valor}</td>
                <td>${factor}</td>
                <td>${tempData[i].valor}</td>
              </tr>
            `
            }
        }
      }
    });

    let dataRecuperados = this.obtenerRecuperados().then(data => {

      let recoveredData = data.response.All.dates;
      let tempData = [];
      let fechaTemp;

      for (const [key, value] of Object.entries(recoveredData)) {
          
        if (value !== 0) {

          fechaTemp = moment(key).format("D/MM/YYYY");
          let date = {'fecha': fechaTemp, 'valor': value};
          tempData.push(date)

        }
      }

      // reversando el array
      tempData.reverse();

      for(let i = 0; i <= tempData.length; i++){

        let factor = 1, dato;

        // Insertando filas de la tabla
        if(i === 0){

          document.getElementById('recuperados').innerHTML += 
          `
          <tr>
            <th scope="row">${tempData[0].fecha}</th>
            <td>${tempData[0].valor}</td>
            <td>${factor}</td>
            <td>${tempData[0].valor}</td>
          </tr>
        `
        }else {
        
          if(i === tempData.length){

            factor = ((Number(document.getElementById('recover1').innerText)/(tempData[i-1].valor))).toFixed(3);

            if(factor !== 1.000 && Number(document.getElementById('recover1').innerText) - tempData[i-1].valor !== 0){
              document.getElementById('recuperados').innerHTML += 
                `
                  <tr>
                    <th scope="row">${moment().format('D/M/YYYY')}</th>
                    <td>${Number(document.getElementById('recover1').innerText) - tempData[i-1].valor}</td>
                    <td>${factor}</td>
                    <td>${Number(document.getElementById('recover1').innerText)}</td>
                  </tr>
                `
            }

          }

          else{

            dato = tempData[i].fecha;

            factor = ((tempData[i].valor/tempData[i-1].valor)).toFixed(3);
            
            document.getElementById('recuperados').innerHTML += `
              <tr>
                <th scope="row">${dato}</th>
                <td>${tempData[i].valor - tempData[i-1].valor}</td>
                <td>${factor}</td>
                <td>${tempData[i].valor}</td>
              </tr>
            `
            }
        }
      }
    });

    let dataFallecidos = this.obtenerFallecidos().then(data => {

      let deathsData = data.response.All.dates;
      let tempData = [];
      let fechaTemp;

      for (const [key, value] of Object.entries(deathsData)) {
          
        if (value !== 0) {

          fechaTemp = moment(key).format("D/MM/YYYY");
          let date = {'fecha': fechaTemp, 'valor': value};
          tempData.push(date)

        }
      }

      // reversando el array
      tempData.reverse();

      for(let i = 0; i <= tempData.length; i++){

        let factor = 1, dato;

        // Insertando filas de la tabla
        if(i === 0){

          document.getElementById('fallecidos').innerHTML += 
          `
          <tr>
            <th scope="row">${tempData[0].fecha}</th>
            <td>${tempData[0].valor}</td>
            <td>${factor}</td>
            <td>${tempData[0].valor}</td>
          </tr>
        `
        }else {
        
          if(i === tempData.length){

            factor = ((Number(document.getElementById('death1').innerText)/(tempData[i-1].valor))).toFixed(3);

            if(factor !== 1.000 && Number(document.getElementById('death1').innerText) - tempData[i-1].valor !== 0){
              document.getElementById('fallecidos').innerHTML += 
                `
                  <tr>
                    <th scope="row">${moment().format('D/M/YYYY')}</th>
                    <td>${Number(document.getElementById('death1').innerText) - tempData[i-1].valor}</td>
                    <td>${factor}</td>
                    <td>${Number(document.getElementById('death1').innerText)}</td>
                  </tr>
                `
            }

          }

          else{

            dato = tempData[i].fecha;

            factor = ((tempData[i].valor/tempData[i-1].valor)).toFixed(3);
            
            document.getElementById('fallecidos').innerHTML += `
              <tr>
                <th scope="row">${dato}</th>
                <td>${tempData[i].valor - tempData[i-1].valor}</td>
                <td>${factor}</td>
                <td>${tempData[i].valor}</td>
              </tr>
            `
            }
        }
      }

    });

    // let newData = this.obtenerDatos().then(data => {

    //   let confirmedData = data.response.confirmed.locations[48].history;
    //   let recoveredData = data.response.recovered.locations[39].history;
    //   let deathsData = data.response.deaths.locations[48].history;


    //   // Confirmados 

    //   for(let i = 0; i <= confirmed.length; i++){

    //     let factor, dato;

    //     if(i === 0){

    //       dato = confirmed[i][0].join('/');
    //       factor = 0;

    //       proyeccion.innerHTML += 
    //       `
    //       <tr>
    //         <th scope="row">${dato}</th>
    //         <td>${confirmed[i][1]}</td>
    //         <td>${factor}</td>
    //         <td>${confirmed[i][1]}</td>
    //       </tr>
    //     `
    //     }else {
        
    //       if(i === confirmed.length){

    //         dato = confirmed[i-1][0].join('/');

    //         factor = ((Number(document.getElementById('confirm1').innerText)/(confirmed[i-1][1]))).toFixed(3);

    //         if(factor !== 1.000 && Number(document.getElementById('confirm1').innerText) - confirmed[i-1][1] !== 0){
    //             proyeccion.innerHTML += 
    //             `
    //               <tr>
    //                 <th scope="row">${moment().format('D/M/YY')}</th>
    //                 <td>${Number(document.getElementById('confirm1').innerText) - confirmed[i-1][1]}</td>
    //                 <td>${factor}</td>
    //                 <td>${Number(document.getElementById('confirm1').innerText)}</td>
    //               </tr>
    //             `
    //         }

    //       }

    //       else{

    //         dato = confirmed[i][0].join('/');

    //         factor = ((confirmed[i][1]/(confirmed[i-1][1]))).toFixed(3);
            
    //         proyeccion.innerHTML += `
    //           <tr>
    //             <th scope="row">${dato}</th>
    //             <td>${confirmed[i][1] - confirmed[i-1][1]}</td>
    //             <td>${factor}</td>
    //             <td>${confirmed[i][1]}</td>
    //           </tr>
    //         `
    //         }
    //     }
    //   }

    //   // Recuperados 

    //   let recuperados = document.getElementById('recuperados');

    //   for(let i = 0; i <= recovered.length; i++){

    //     let factor, dato;

    //     if(i === 0){

    //       dato = recovered[i][0].join('/');
    //       factor = 0;

    //       recuperados.innerHTML += 
    //       `
    //       <tr>
    //         <th scope="row">${dato}</th>
    //         <td>${recovered[i][1]}</td>
    //         <td>${factor}</td>
    //         <td>${recovered[i][1]}</td>
    //       </tr>
    //     `
    //     } else {
        
    //       if(i === recovered.length){

    //         dato = recovered[i-1][0].join('/');

    //         factor = ((Number(document.getElementById('recover1').innerText)/(recovered[i-1][1]))).toFixed(3);

    //         if(factor !== 1.000 && Number(document.getElementById('recover1').innerText) - recovered[i-1][1] !== 0){
                
    //          if(Number(document.getElementById('recover1').innerText) - recovered[i-1][1] > 0){
       
    //           recuperados.innerHTML += 
    //             `
    //               <tr>
    //                 <th scope="row">${moment().format('D/M/YY')}</th>
    //                 <td>${Number(document.getElementById('recover1').innerText) - recovered[i-1][1]}</td>
    //                 <td>${factor}</td>
    //                 <td>${Number(document.getElementById('recover1').innerText)}</td>
    //               </tr>
    //             `
    //          } 
    //         }
            
    //       }

    //       else{

    //         dato = recovered[i][0].join('/');

    //         factor = ((recovered[i][1]/(recovered[i-1][1]))).toFixed(3);
            
    //         recuperados.innerHTML += `
    //           <tr>
    //             <th scope="row">${dato}</th>
    //             <td>${recovered[i][1] - recovered[i-1][1]}</td>
    //             <td>${factor}</td>
    //             <td>${recovered[i][1]}</td>
    //           </tr>
    //         `
    //         }
    //     }
    //   }

    //   // Fallecidos 

    //   let fallecidos = document.getElementById('fallecidos');

    //   for(let i = 0; i <= deaths.length; i++){

    //     let factor, dato;

    //     if(i === 0){

    //       dato = deaths[i][0].join('/');
    //       factor = 0;

    //       fallecidos.innerHTML += 
    //       `
    //       <tr>
    //         <th scope="row">${dato}</th>
    //         <td>${deaths[i][1]}</td>
    //         <td>${factor}</td>
    //         <td>${deaths[i][1]}</td>
    //       </tr>
    //     `
    //     } 
        
    //     else {
        
    //       if(i === deaths.length){

    //         dato = deaths[i-1][0].join('/');

    //         factor = ((Number(document.getElementById('death1').innerText)/(deaths[i-1][1]))).toFixed(3);
            

    //         if(factor !== 1.000 && Number(document.getElementById('death1').innerText) - deaths[i-1][1] !== 0){
    //             fallecidos.innerHTML += 
    //             `
    //               <tr>
    //                 <th scope="row">${moment().format('D/M/YY')}</th>
    //                 <td>${Number(document.getElementById('death1').innerText) - deaths[i-1][1]}</td>
    //                 <td>${factor}</td>
    //                 <td>${Number(document.getElementById('death1').innerText)}</td>
    //               </tr>
    //             `
    //         }

    //       }

    //       else{

    //         dato = deaths[i][0].join('/');

    //         factor = ((deaths[i][1]/(deaths[i-1][1]))).toFixed(3);
            
    //         fallecidos.innerHTML += `
    //           <tr>
    //             <th scope="row">${dato}</th>
    //             <td>${deaths[i][1] - deaths[i-1][1]}</td>
    //             <td>${factor}</td>
    //             <td>${deaths[i][1]}</td>
    //           </tr>
    //         `
    //       }
    //     }
    //   }

    //   // SIR

    //   let sir = document.getElementById('SIR');
    //   let newConfirmed = [];

    // /*  const newFilter = () => {

    //     let fecha2 = new Date('2020-04-14').toLocaleDateString();

    //     for(let i = 0; i<confirmed.length; i++){

    //       let fecha1 = new Date(confirmed[i][0].join('/')).toLocaleDateString();

    //       if(fecha1 >= fecha2){
    //         newConfirmed.push(confirmed[i][0]);
    //       }
    //     }
    //   };

    //   newFilter();*/

    //  /* const newFilter = confirmed.filter( confirm => new Date(confirm[0].join('/')).toLocaleDateString() > new Date('2020-04-14').toLocaleDateString());

    //   console.log(newFilter); 
    //   /*for(let i = 0; i <= deaths.length; i++){

    //     let factor, dato;

    //     if(i === 0){

    //       dato = deaths[i][0].join('/');
    //       factor = 0;

    //       fallecidos.innerHTML += 
    //       `
    //       <tr>
    //         <th scope="row">${dato}</th>
    //         <td>${deaths[i][1]}</td>
    //         <td>${factor}</td>
    //         <td>${deaths[i][1]}</td>
    //       </tr>
    //     `
    //     } 
        
    //     else {
        
    //       if(i === deaths.length){

    //         dato = deaths[i-1][0].join('/');
    //         let newFecha = moment().format('D/M/YY');

    //         if(dato === newFecha){
    //           factor = 0;
    //           dato = moment().format('D/M/YY');
    //           fallecidos.innerHTML += 
    //           `
    //             <tr>
    //               <th scope="row">${dato}</th>
    //               <td>${Number(document.getElementById('death1').innerText) - deaths[i-1][1]}</td>
    //               <td>${factor}</td>
    //               <td>${document.getElementById('death1').innerText}</td>
    //             </tr>
    //           `
    //         }

    //       }

    //       else{

    //         dato = deaths[i][0].join('/');

    //         factor = ((deaths[i][1]/(deaths[i-1][1]))).toFixed(3);
            
    //         fallecidos.innerHTML += `
    //           <tr>
    //             <th scope="row">${dato}</th>
    //             <td>${deaths[i][1] - deaths[i-1][1]}</td>
    //             <td>${factor}</td>
    //             <td>${deaths[i][1]}</td>
    //           </tr>
    //         `
    //       }
    //     }
    //   }*/
      
    //   }
    // )

  }
}

export const data = new DATA();
