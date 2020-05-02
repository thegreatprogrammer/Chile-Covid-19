export class COVIDMath {


  // Cuántos infectados/contagiados/recuperados habrán al día n después del 1ro de abril

  // Los parámetros son: el factor de crecimiento, la fecha tope, y la cantidad de casos iniciales

  howManyAffected(factor, date, init, category) {

      let result; 
      if(init === 3404){
        result = Math.pow(factor, date + 1) * init;
        return Math.floor(result);
        
      } 
      
      if(category === "rec"){
        result = Math.pow(factor, date - 1) * init;
        return result.toFixed(3);
      }

      if(category == "fal"){
        result = Math.pow(factor, date - 1) * init;
        return result.toFixed(2);
      }
  }

  // Cuántos días deben pasar para tener n infectados. Recibe el factor, la cantidad n de infectados y los casos iniciales.
  howManyDays(factor, n, init) {

    let result = (Math.log(n / init) / Math.log(factor) + 1);

    return result.toFixed(0);

  }

  // Cuál es el factor que se debe mantener para que en un día n hayan n infectados. Recibe la cantidad n de infectados, el día tope y la cantidad inicial

  computeFactor(n, date, init) {
    let result = Math.pow((n / init) , (1 / date));
    return result.toFixed(2);
  }


}

