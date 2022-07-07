import { grasp } from "./grasp.js";
import { getListGraph } from "./parserGraphXML.js";

// Funcion para ordenar por peso.
const ordernamientoPorPeso = (arista1, arista2) => arista1.weight - arista2.weight;

// Funcion para ordenar aleatorizar la seleccion de nodo siguiente.
const aleatorizacionDeHeuristica = (porcentajeAContemplar) => (aristas) => {
    let cantidadAContemplar = Math.floor((aristas.length * porcentajeAContemplar)/100);
    // se elijen posiciones entre los primeros 'cantidadAContemplar' o menos.
    let max = ((aristas.length - 1) >= cantidadAContemplar) ? cantidadAContemplar : (aristas.length - 1),
        posicionRandom = Math.floor(Math.random() * (max - 0 + 1) + 0); // elijo una posicion aleatoria
    return aristas[posicionRandom];
}

// Lista de grafos ordenados por numero de nodos.
const listaDeGrafos = getListGraph(ordernamientoPorPeso).sort((grafo1, grafo2) => grafo1.numberNodes - grafo2.numberNodes); 

const armarMetricasPorGrafo = (grafo) => {
    const grafoNodos = `Grafo actual tiene: >>> ${grafo.numberNodes} Nodos <<<`;
    console.log(grafoNodos)

    const { mejorResultado, mejorPeso } = 
        grasp({
            grafoCompletoOrdenado: grafo,
            aleatorizacionDeHeuristica: aleatorizacionDeHeuristica(20),
            iteracionesMaximas: (grafo.numberNodes * 200),
            printCadaTantasIteraciones: (grafo.numberNodes * 2),
            cantidadIteracionesBL: 10,
            porcentajeMinimaDeMejoraBL: 20
        });

    const mejor = `Mejor peso: >>> ${mejorPeso} <<<
    `;
    console.log(mejor)
}

listaDeGrafos.forEach(armarMetricasPorGrafo);


// const grafo = listaDeGrafos[23];
// const grafoNodos = `Grafo actual tiene: >>> ${grafo.numberNodes} Nodos <<<`;
// console.log(grafoNodos)

// const { mejorResultado, mejorPeso } = 
//     grasp({
//         grafoCompletoOrdenado: grafo,
//         aleatorizacionDeHeuristica: aleatorizacionDeHeuristica(20),
//         iteracionesMaximas: (grafo.numberNodes * 200),
//         printCadaTantasIteraciones: (grafo.numberNodes * 2),
//         cantidadIteracionesBL: 10,
//         porcentajeMinimaDeMejoraBL: 20,
//         logsActivados: true
//     });

// // console.log("Mejor resultado", mejorResultado)
// const mejor = `Mejor peso: >>> ${mejorPeso} <<<`;
// console.log(mejor)
