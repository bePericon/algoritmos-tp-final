import { GraphWM } from "./classes/graph-wm.js";
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

const grafo = new GraphWM(grafo01);

console.log("GRAFO COMPLETO");
grafo.print();

let resultado = algoritmoGoloso(grafo).map((arista) => `${arista.toString()}, `);
console.log("Resultado algoritmo goloso: ", `[${resultado}]`)