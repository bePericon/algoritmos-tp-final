import { grasp } from "./grasp.js";
import { getListGraph } from "./parserGraphXML.js";

// Funcion para ordenar por peso.
const ordernamientoPorPeso = (arista1, arista2) => arista1.weight - arista2.weight;

// Se crea una sola vez el grafo completo con todos los datos necesarios.
const grafoCompletoOrdenado = getListGraph(ordernamientoPorPeso)[6]; 

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

grasp({
    grafoCompletoOrdenado: grafoCompletoOrdenado,
    aleatorizacionDeHeuristica: aleatorizacionDeHeuristica(10),
    iteracionesMaximas: 1000,
    printCadaTantasIteraciones: 10,
    cantidadIteracionesBL: 200,
    porcentajeMinimaDeMejoraBL: 20
});