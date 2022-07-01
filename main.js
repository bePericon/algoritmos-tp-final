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

let { grafoCompleto, resultado, pesoTotal, predecesores, visitados } = algoritmoGoloso(grafo01);
console.log("GRAFO COMPLETO");
grafoCompleto.print();
console.log("ALGORITMO GOLOSO");
console.log("Resultado: ",  resultado);
console.log("Peso total: ", pesoTotal);
console.log("Predecesores: ", predecesores);
console.log("Visitados: ", visitados);
console.log("BUSQUEDA LOCAL: ", busquedaLocal(grafoCompleto, resultado, pesoTotal));
