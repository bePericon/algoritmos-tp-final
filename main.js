import { busquedaLocal } from "./busqueda-local.js";
import { algoritmoGoloso } from "./heuristica-golosa.js";

// filas x columnas
const grafo01 = [
    [0, 3, 2, 4, Infinity,Infinity],
    [3, 0, 2, Infinity, 4, Infinity],
    [2, 2, 0, Infinity, 2, 1],
    [4, Infinity, Infinity, 0, Infinity, Infinity],
    [Infinity, 4, 2, Infinity, 0, 3],
    [Infinity, Infinity, 1, Infinity,3, 0],
];

// Funcion para ordenar por peso.
const ordernamientoPorPeso = (arista1, arista2) => arista1.weight - arista2.weight;

// Funcion para ordenar aleatorizar la seleccion de nodo siguiente.
const aleatorizacionDeHeuristica = (cantidadAContemplar) => (aristas) => {
    let max = ((aristas.length - 1) >= cantidadAContemplar) ? cantidadAContemplar : (aristas.length - 1), // se elijen posiciones entre los primeros 'cantidadAContemplar' o menos.
        posicionRandom = Math.floor(Math.random() * (max - 0 + 1) + 0); // elijo una posicion aleatoria
    return aristas[posicionRandom];
}

let { grafoCompleto, resultado, pesoTotal, predecesores, visitados } = algoritmoGoloso(grafo01, 0, ordernamientoPorPeso, aleatorizacionDeHeuristica(5));
console.log("GRAFO COMPLETO");
grafoCompleto.print();
console.log("ALGORITMO GOLOSO");
console.log("Resultado: ",  resultado);
console.log("Peso total: ", pesoTotal);
console.log("Predecesores: ", predecesores);
console.log("Visitados: ", visitados);
console.log("BUSQUEDA LOCAL: ", busquedaLocal(grafoCompleto, resultado, pesoTotal));
