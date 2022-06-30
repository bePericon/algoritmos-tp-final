
import { Edge } from "./classes/edge.js";
import { GraphWM } from "./classes/graph-wm.js";
import { Queue } from "./classes/queue.js";

const ordernamientoPorPeso = (nodo1, nodo2) => nodo1.weight - nodo2.weight;

export const algoritmoGoloso = (grafoCompleto, verticeInicial = 0) => {
    let inicial = verticeInicial,
        resultado = [],
        visitados = GraphWM.newVector(grafoCompleto.numberNodes, false),
        predecesores = GraphWM.newVector(grafoCompleto.numberNodes, verticeInicial),
        queue = new Queue();

    queue.enqueue(inicial);
    visitados[inicial] = true;
    resultado.push(new Edge(inicial, 0));

    while(!queue.isEmpty()){
        let actual = queue.dequeue(),
            adyacentes = grafoCompleto.adyacentByNode(actual, ordernamientoPorPeso); // parte golosa: odenamiento por el mas cercano.

        for (let arista of adyacentes) {
            let primero = arista;
            if(!visitados[primero.getNode]){
                queue.enqueue(primero.getNode);
                visitados[primero.getNode] = true;
                predecesores[primero.getNode] = actual;
                resultado.push(primero);
                break;
            }
        };
    }

    return { resultado, predecesores, visitados };
}