import { COVIDMath } from './COVIDMath.js';

let math = new COVIDMath();

let formulario = document.getElementById('formulario');


document.getElementById('calculate1').addEventListener('click', e =>{
    e.preventDefault();

    // Lógica para la primera sección (cuántos casos habrán al día n)

    if(e.target.classList.contains('calculate1')){

        let factor = document.querySelector('.input1 #Factor');
        let date = document.querySelector('.input1 #fecha');
        let result = document.querySelector('.result1 #result');
        let error = document.querySelector('.result1 #error');

        let category = document.querySelector('input[name="category"]:checked');

        if(factor.value !== '' && date.value !== '' && category !== null){

            error.style.display = 'none';

            factor = factor.value;
            date = date.value;
            category = category.value;

            if(category === 'cont'){
                date = moment(date);
                date = date.diff("2020-04-01", 'days');

                result.innerHTML = `Total: ${math.howManyAffected(factor, date, 3404)}`;
                result.style.display = 'block';
            }
            
            if(category === 'rec' || category === 'fal'){
                date = moment(date);
                date = date.diff("2020-03-26", 'days');
                
                result.innerHTML = `Total: ${math.howManyAffected(factor, date, 1, category)}`;
                result.style.display = 'block';

            }

        } else{
            result.style.display = 'none';
            error.innerHTML = 'Ingrese todos los campos (factor, fecha y categoría)';
            error.style.display = 'block';
        }
    }
    
});

document.getElementById('calculate2').addEventListener('click', e =>{
    e.preventDefault();

    // Lógica para sección 2 (cuántos días deben pasar para tener n casos)

    if(e.target.classList.contains('calculate2')){

        let factor = document.querySelector('.input2 #Factor');
        let cantInfected = document.querySelector('.input2 #cantInfected');
        let result = document.querySelector('.result2 #result');
        let error = document.querySelector('.result2 #error');

        let category = document.querySelector('input[name="category2"]:checked');

        if(factor.value !== '' && cantInfected.value !== '' && category !== null){

            error.style.display = 'none';

            factor = factor.value;
            cantInfected = cantInfected.value;
            category = category.value;

            if(category === 'cont'){

                result.innerHTML = `Total: ${math.howManyDays(factor, cantInfected, 3404)}`;
                result.style.display = 'block';
            }
            
            if(category === 'rec' || category === 'fal'){
                
                result.innerHTML = `Total: ${math.howManyDays(factor, cantInfected, 1)}`;
                result.style.display = 'block';

            }

        } else {
            result.style.display = 'none';
            error.innerHTML = 'Ingrese todos los campos (factor, cantidad y categoría)';
            error.style.display = 'block';
        }
    }
});

document.getElementById('calculate3').addEventListener('click', e =>{
    e.preventDefault();
    // Lógica para sección 3 (cuál es el factor para que el día n hayan n casos)
    
    if(e.target.classList.contains('calculate3')){

        let cantInfected = document.querySelector('.input3 #cantInfected');
        let date = document.querySelector('.input3 #fecha');
        let result = document.querySelector('.result3 #result');
        let error = document.querySelector('.result3 #error');

        let category = document.querySelector('input[name="category3"]:checked');

        if(cantInfected.value !== '' && date.value !== '' && category !== null){

            error.style.display = 'none';

            cantInfected = cantInfected.value;
            date = date.value;
            category = category.value;

            if(category === 'cont'){
                date = moment(date);
                date = date.diff("2020-04-01", 'days');
    
                result.innerHTML = `Total: ${math.computeFactor(cantInfected, date, 3404)}`;
                result.style.display = 'block';
            }
            
            if(category === 'rec' || category === 'fal'){
                date = moment(date);
                date = date.diff("2020-03-26", 'days');
                
                result.innerHTML = `Total: ${math.computeFactor(cantInfected, date, 1)}`;
                result.style.display = 'block';
                
            }
        } else{
            result.innerHTML = '';
            error.innerHTML = 'Ingrese todos los campos (cantidad, fecha y categoría)';
            error.style.display = 'block';
        }
        
    } 
});