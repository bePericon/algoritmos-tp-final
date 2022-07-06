import { GraphXML } from "./classes/graph-xml.js";
import { Queue } from "./classes/queue.js";

/* 
    ORDEN DE COMPLEJIDAD: algoritmoGoloso

    Sin tener en cuenta la creacion de vectores.
    Sin tener en cuenta el filtrado de los adyacentes en cada iteracion.
    Es el siguiente:

    O(n)

    Teniendo en cuenta la creacion de vectores y 
    el filtrado de los adyacentes en cada iteracion.
    Es el siguiente:

    O(2n + nˆ2) =>  O(nˆ2)
*/
export const algoritmoGoloso = ({ grafo, verticeInicial = 0, aleatorizacion = null }) => {
    let resultado = [],
        visitados = GraphXML.newVector(grafo.numberNodes, false),
        predecesores = GraphXML.newVector(grafo.numberNodes, verticeInicial),
        pesoTotal = 0,
        queue = new Queue();

    queue.enqueue(verticeInicial);
    visitados[verticeInicial] = true;

    while (!queue.isEmpty()) {
        let actual = queue.dequeue(),
            adyacentes = grafo.adyacentByNode(actual),// parte golosa, adyacentes ya ordenados.
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
    let ultimo = resultado[(grafo.numberNodes -2)],
        ultimaArista = grafo.getEdge(ultimo.getNodeTo, verticeInicial);

    pesoTotal += ultimaArista.getWeight;
    resultado.push(ultimaArista);

    return { grafo, resultado, pesoTotal, predecesores, visitados };
}