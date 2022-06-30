import { GraphWM } from "./classes/graph-wm.js";
import { Queue } from "./classes/queue.js";

const ordernamientoPorPeso = (arista1, arista2) => arista1.weight - arista2.weight;

export const algoritmoGoloso = (grafoCompleto, verticeInicial = 0) => {
    let inicial = verticeInicial,
        resultado = [],
        visitados = GraphWM.newVector(grafoCompleto.numberNodes, false),
        predecesores = GraphWM.newVector(grafoCompleto.numberNodes, verticeInicial),
        queue = new Queue();

    queue.enqueue(inicial);
    visitados[inicial] = true;

    while(!queue.isEmpty()){
        let actual = queue.dequeue(),
            adyacentes = grafoCompleto.adyacentByNode(actual, ordernamientoPorPeso); // parte golosa: odenamiento por el mas cercano.

        for (let arista of adyacentes) {
            if(!visitados[arista.getNodeTo]){
                queue.enqueue(arista.getNodeTo);
                visitados[arista.getNodeTo] = true;
                predecesores[arista.getNodeTo] = arista.getNodeFrom;
                resultado.push(arista);
                break;
            }
        };
    }

    let ultimo = resultado[(grafoCompleto.numberNodes -2)];
    resultado.push(grafoCompleto.getEdge(ultimo.getNodeTo, inicial));

    return { resultado, predecesores, visitados };
}