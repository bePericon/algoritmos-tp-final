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

    while (!queue.isEmpty()) {
        let actual = queue.dequeue(),
            adyacentes = grafoCompleto.adyacentByNode(actual, ordernamientoPorPeso), // parte golosa: odenamiento por el mas cercano.
            noVisitados = adyacentes.filter(aristaAdyacente => !visitados[aristaAdyacente.getNodeTo]), // filtro los adyacentes que no estan visitados
            posicionRandom = Math.floor(Math.random() * ((noVisitados.length - 1) - 0 + 1) + 0), // elijo una posicion aleatoria
            arista = noVisitados[posicionRandom]; // uso esa arista

        if (arista) {
            queue.enqueue(arista.getNodeTo);
            visitados[arista.getNodeTo] = true;
            predecesores[arista.getNodeTo] = arista.getNodeFrom;
            resultado.push(arista);
        }
    }

    let ultimo = resultado[(grafoCompleto.numberNodes -2)];
    resultado.push(grafoCompleto.getEdge(ultimo.getNodeTo, inicial));

    return { resultado, predecesores, visitados };
}