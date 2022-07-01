import { GraphWM } from "./classes/graph-wm.js";
import { Queue } from "./classes/queue.js";

// Funcion para ordenar por peso.
const ordernamientoPorPeso = (arista1, arista2) => arista1.weight - arista2.weight;

// Heuristica golosa.
// Parametros: 
// - grafo inicial: matriz.
// - vertice inicial: numero.
//  TODO:
// - aleatorizacion: funcion que elije la proxima arista.
export const algoritmoGoloso = (grafo, verticeInicial = 0) => {
    let grafoCompleto = new GraphWM(grafo),
        resultado = [],
        visitados = GraphWM.newVector(grafoCompleto.numberNodes, false),
        predecesores = GraphWM.newVector(grafoCompleto.numberNodes, verticeInicial),
        pesoTotal = 0,
        queue = new Queue();

    queue.enqueue(verticeInicial);
    visitados[verticeInicial] = true;

    while (!queue.isEmpty()) {
        let actual = queue.dequeue(),
            adyacentes = grafoCompleto.adyacentByNode(actual, ordernamientoPorPeso), // parte golosa: odenamiento por el mas cercano.
            noVisitados = adyacentes.filter(aristaAdyacente => !visitados[aristaAdyacente.getNodeTo]), // filtro los adyacentes que no estan visitados
            max = ((noVisitados.length - 1) >= 5) ? 5 : (noVisitados.length - 1), // se elijen posiciones entre los primeros 5 o menos.
            posicionRandom = Math.floor(Math.random() * (max - 0 + 1) + 0), // elijo una posicion aleatoria
            arista = noVisitados[posicionRandom]; // uso esa arista

        if (arista) {
            queue.enqueue(arista.getNodeTo);
            visitados[arista.getNodeTo] = true;
            predecesores[arista.getNodeTo] = arista.getNodeFrom;
            pesoTotal += arista.getWeight;
            resultado.push(arista);
        }
    }

    // Se agrega ultima arista, desde el ultimo nodo visitado hasta el incial.
    let ultimo = resultado[(grafoCompleto.numberNodes -2)],
        ultimaArista = grafoCompleto.getEdge(ultimo.getNodeTo, verticeInicial);

    pesoTotal += ultimaArista.getWeight;
    resultado.push(ultimaArista);

    return { grafoCompleto, resultado, pesoTotal, predecesores, visitados };
}