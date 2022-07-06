import { busquedaLocal } from "./busqueda-local.js";
import { algoritmoGoloso } from "./heuristica-golosa.js";

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
            algoritmoGoloso(grafoCompletoOrdenado, 0, aleatorizacionDeHeuristica);

        let { aristas, peso } = 
            busquedaLocal(
                grafoCompletoOrdenado, 
                resultado, 
                pesoTotal , 
                { cantidadIteraciones: cantidadIteracionesBL, porcentajeMinimaDeMejora: porcentajeMinimaDeMejoraBL }
            );

        // Primer iteracion.
        if(cantidadIteraciones === 0){
            mejorResultado = aristas;
            mejorPeso = peso;

            // console.log("Primer resultado: ", aristas);
            // console.log("Primer peso: ", peso);
        }

        // Me quedo siempre con el mejor.
        if(mejorPeso > peso){
            mejorResultado = aristas;
            mejorPeso = peso;
        }

        // printCadaTantasIteraciones
        if(cantidadIteraciones > 0 && (cantidadIteraciones % printCadaTantasIteraciones === 0)){
            console.log(`ITERACION: ${cantidadIteraciones} - PESO: ${mejorPeso}`);
        }

        cantidadIteraciones++;
    }

    // console.log("Ultimo resultado: ", mejorResultado);
}