import { GraphWM } from "./classes/graph-wm.js";
import { Queue } from "./classes/queue.js";

// Heuristica golosa.
// Parametros: 
// - grafo inicial: matriz.
// - vertice inicial: numero.
// - aleatorizacion: funcion que elije la proxima arista.
export const algoritmoGoloso = (grafo, verticeInicial = 0, ordernamiento= null, aleatorizacion = null) => {
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
            adyacentes = grafoCompleto.adyacentByNode(actual, ordernamiento), // parte golosa.
            noVisitados = adyacentes.filter(aristaAdyacente => !visitados[aristaAdyacente.getNodeTo]); // filtro los adyacentes que no estan visitados

        let arista = noVisitados[0]; // Selecciono el primero, ya que estan ordenados de alguna manera golosa.
        if(aleatorizacion){ // Si recibimos una funcion para aleatorizar, la usamos.
            arista = aleatorizacion(noVisitados);
        }

        if (arista) { // Puede que no exista una arista cuando ya estamos en el ultimo nodo.
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