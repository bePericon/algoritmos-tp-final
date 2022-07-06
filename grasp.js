import { busquedaLocal } from "./busqueda-local.js";
import { algoritmoGoloso } from "./heuristica-golosa.js";

/* 
    ORDEN DE COMPLEJIDAD: grasp

    Aunque depende de la cantidad de iteraciones que se hayan configurado, 
    pero este numero seria una constante multiplicando el orden siguiente:

    goloso + busqueda local

    O(nˆ2) + O(m * n-1) => O(nˆ2) + O(mˆ2) =>  O(2nˆ2)
*/
export const grasp = ({
    grafoCompletoOrdenado,
    iteracionesMaximas,
    aleatorizacionDeHeuristica,
    printCadaTantasIteraciones,
    cantidadIteracionesBL,
    porcentajeMinimaDeMejoraBL
}) => {
    let cantidadIteraciones = 0;
    let mejorResultado = [];
    let mejorPeso = 0;

    console.log(">>> MEJORES VALORES <<<");
    while (cantidadIteraciones < iteracionesMaximas) {
        let { resultado, pesoTotal } =
            algoritmoGoloso({
                grafo: grafoCompletoOrdenado, 
                verticeInicial: 0,
                aleatorizacion: aleatorizacionDeHeuristica
            });

        let { resultadoEncontrado, pesoEncontrado } = 
            busquedaLocal({ 
                grafo: grafoCompletoOrdenado,
                aristas: resultado,
                peso: pesoTotal,
                configuracion: { cantidadIteraciones: cantidadIteracionesBL, porcentajeMinimaDeMejora: porcentajeMinimaDeMejoraBL }
            });

        // Primer iteracion.
        if(cantidadIteraciones === 0){
            mejorResultado = resultadoEncontrado;
            mejorPeso = pesoEncontrado;

            // console.log("Primer resultado: ", aristas);
            // console.log("Primer peso: ", peso);
        }

        // Me quedo siempre con el mejor.
        if(mejorPeso > pesoEncontrado){
            mejorResultado = resultadoEncontrado;
            mejorPeso = pesoEncontrado;
        }

        // printCadaTantasIteraciones
        if(cantidadIteraciones > 0 && (cantidadIteraciones % printCadaTantasIteraciones === 0)){
            console.log(`ITERACION: ${cantidadIteraciones} - PESO: ${mejorPeso}`);
        }

        cantidadIteraciones++;
    }

    // console.log("Ultimo resultado: ", mejorResultado);
}