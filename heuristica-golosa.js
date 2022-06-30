
import { GraphWM } from "./classes/graph-wm.js";
import { Queue } from "./classes/queue.js";

const ordernamientoPorPeso = (nodo1, nodo2) => nodo1.weight - nodo2.weight;

export const algoritmoGoloso = (grafoCompleto, verticeInicial = 0) => {
    let inicial = verticeInicial,
        resultado = [],
        visitados = GraphWM.newVector(grafoCompleto.numberNodes, false),
        queue = new Queue();

    queue.enqueue(inicial);

    while(!queue.isEmpty()){
        let fila = queue.dequeue(),
            adyacentes = grafoCompleto.adyacentByNode(fila, ordernamientoPorPeso);

        
        
        resultado = adyacentes
    }

    return resultado;
}