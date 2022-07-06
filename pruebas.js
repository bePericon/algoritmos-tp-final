import { busquedaLocal } from "./busqueda-local-nuevo.js";
import { GraphWM } from "./classes/graph-wm.js";
import { grasp } from "./grasp.js";
import { algoritmoGoloso } from "./heuristica-golosa.js";
import { getListGraph } from "./parserGraphXML.js";

// Funcion para ordenar por peso.
const ordernamientoPorPeso = (arista1, arista2) => arista1.weight - arista2.weight;

// Se crea una sola vez el grafo completo con todos los datos necesarios.
const grafoCompletoOrdenado = getListGraph(ordernamientoPorPeso)[7];

// posicion: 6 - brg180 - optimo: 1950 
// posicion: 14 - eil101 - optimo: 129

// Funcion para ordenar aleatorizar la seleccion de nodo siguiente.
const aleatorizacionDeHeuristica = (porcentajeAContemplar) => (aristas) => {
    let cantidadAContemplar = Math.floor((aristas.length * porcentajeAContemplar)/100);
    // se elijen posiciones entre los primeros 'cantidadAContemplar' o menos.
    let max = ((aristas.length - 1) >= cantidadAContemplar) ? cantidadAContemplar : (aristas.length - 1),
        posicionRandom = Math.floor(Math.random() * (max - 0 + 1) + 0); // elijo una posicion aleatoria
    return aristas[posicionRandom];
}

// const grafo01 = [
//     [0, 3, 2, 4, Infinity,Infinity],
//     [3, 0, 2, Infinity, 4, Infinity],
//     [2, 2, 0, Infinity, 2, 1],
//     [4, Infinity, Infinity, 0, Infinity, Infinity],
//     [Infinity, 4, 2, Infinity, 0, 3],
//     [Infinity, Infinity, 1, Infinity,3, 0],
// ];

// let grafoCompletoOrdenado = new GraphWM(grafo01, ordernamientoPorPeso);

let { resultado, pesoTotal } =
    algoritmoGoloso(grafoCompletoOrdenado, 0, aleatorizacionDeHeuristica(50));

    
let bl = 
    busquedaLocal({ 
        grafo: grafoCompletoOrdenado,
        aristas: resultado,
        peso: pesoTotal,
        configuracion: { cantidadIteraciones: 100, porcentajeMinimaDeMejora: 5 }
    });
    
// grafoCompletoOrdenado.print()

console.log("GOLOSO aristas:", resultado)
console.log(`GOLOSO peso: ${pesoTotal}`)

console.log("BL aristas:", bl.resultadoEncontrado)
console.log(`BL peso: ${bl.pesoEncontrado}`)