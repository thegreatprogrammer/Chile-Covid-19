import { APP, data, canvas } from './app.js';
import { DATA } from './data.js';
import { Canvas } from './canvas.js';

export class Interfaz{

    constructor(){
        this.init();
        this.fechaToday = moment().format('D/M/YYYY');
        this.totalCases = [];
    }

    // Método ejecutado al arrancar la app
    init(){
        // Configurando valores (en el campo de fecha, por ejemplo)
        this.setDefaultValues();
    }

    // Método para cargar los valores por defecto al arrancar la app
    setDefaultValues(){

        // Configurando el valor por defecto del campo fecha
        document.getElementById('fecha').value = "";

        // Mostrando el panel de datos de la información del día.
        this.setTodayDate();

        // Colocándole un valor máximo al input de fecha, este valor máximo es el día actual
        document.getElementById('fecha').setAttribute("max", moment().format("YYYY-MM-DD"));

        // Gráfico inicial
        // data.obtenerDatos()
        //     .then( data =>{

        //         let arr = Object.values(data.response.confirmed.locations[48].history);

        //         canvas.setDataGraph(arr, "Contagiados");
                
        //         });
    }

    // Método que carga la data de contagiados, recuperados y fallecidos al día
    setTodayDate(){

        let dataToday = data.obtenerDatos()
            .then( data => {

                let datos = data.response.All;

                this.fillMainData(this.fechaToday, datos.confirmed, datos.deaths, datos.recovered);
            })
            .catch(reject =>{

                // Si es media noche y no hay datos disponibles para el día, se mostrará la data del día anterior

                let yesterday = moment().subtract(1, 'days').format('D/M/YY');

                this.dataNumbers(yesterday);
            });

    }

    // Método para obtener la respuesta de la API, y, dependiendo de si el método fue llamado desde el inicio de la aplicación (DOMContentLoaded) o desde el botón de búsqueda, se colocarán los datos de la fecha actual o días anteriores.
    dataNumbers(fecha){
        
        if(fecha === this.fechaToday){
            
            this.setTodayDate();

            
        } else{

            data.getDailyData(fecha);
        
        }
    }

    // Método para imprimir el panel de casos de COVID-19 en las estadísticas
    fillMainData(date, confirmed, deaths, recovered){

        let info = document.getElementById('date');

        info.innerHTML = `
        <div class="todayData text-center">
            <h6>Fecha última actualización: <span id="fechaToday">${date}</span></h6>
            <h5>Casos confirmados: <span id="confirm1">${confirmed}</span></h5>
            <h5>Recuperados: <span id="recover1" style="color: #40FF00; font-weight: bold">${recovered}</span></h5>
            <h5>Fallecidos: <span id="death1" style="color: #FACC2E; font-weight: bold">${deaths}</span></h5>
        </div>
    `;
    }

}
