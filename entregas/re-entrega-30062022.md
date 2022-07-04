
## Entrega 30/06/2022

1. Proponer un algoritmo goloso para el problema del viajante de comercio.

```javascript
export const algoritmoGoloso = (grafo, verticeInicial = 0, ordernamiento = null) => {
    let grafoCompleto = new GraphWM(grafo),
        resultado = [],
        visitados = GraphWM.newVector(grafoCompleto.numberNodes, false),
        predecesores = GraphWM.newVector(grafoCompleto.numberNodes, verticeInicial),
        pesoTotal = 0,
        queue = new Queue();

    queue.enqueue(verticeInicial);
    visitados[verticeInicial] = true;

    while(!queue.isEmpty()){
        let actual = queue.dequeue(),
            adyacentes = grafoCompleto.adyacentByNode(actual, ordernamiento); // parte golosa

        for (let arista of adyacentes) {
            let primero = arista;
            if(!visitados[primero.getNode]){
                queue.enqueue(primero.getNode);
                visitados[arista.getNodeTo] = true;
                predecesores[arista.getNodeTo] = arista.getNodeFrom;
                pesoTotal += arista.getWeight;
                resultado.push(arista);
                break;
            }
        };
    }

    // Se agrega ultima arista, desde el ultimo nodo visitado hasta el incial.
    let ultimo = resultado[(grafoCompleto.numberNodes -2)],
        ultimaArista = grafoCompleto.getEdge(ultimo.getNodeTo, verticeInicial);

    pesoTotal += ultimaArista.getWeight;
    resultado.push(ultimaArista);

    return { grafoCompleto, resultado, pesoTotal, predecesores, visitados };
}
```

- Ejemplo de uso

```javascript
// Funcion para ordenar por peso.
const ordernamientoPorPeso = (arista1, arista2) => arista1.weight - arista2.weight;

let { grafoCompleto, resultado, pesoTotal, predecesores, visitados } = algoritmoGoloso(grafo01, 0, ordernamientoPorPeso)
```

2. Aleatorizar el algoritmo anterior.

```javascript
export const algoritmoGoloso = (grafo, verticeInicial = 0, ordernamiento = null, aleatorizacion = null) => {
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
            adyacentes = grafoCompleto.adyacentByNode(actual, ordernamientoPorPeso), // parte golosa.
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
```

- Ejemplo de uso

```javascript
// Funcion para ordenar por peso.
const ordernamientoPorPeso = (arista1, arista2) => arista1.weight - arista2.weight;

// Funcion para ordenar aleatorizar la seleccion de nodo siguiente.
const aleatorizacionDeHeuristica = (cantidadAContemplar) => (aristas) => {
    // se elijen posiciones entre los primeros 'cantidadAContemplar' o menos.
    let max = ((aristas.length - 1) >= cantidadAContemplar) ? cantidadAContemplar : (aristas.length - 1);
    // elijo una posicion aleatoria
    let posicionRandom = Math.floor(Math.random() * (max - 0 + 1) + 0); 
    return aristas[posicionRandom];
}

let { grafoCompleto, resultado, pesoTotal, predecesores, visitados } = algoritmoGoloso(grafo01, 0, ordernamientoPorPeso, aleatorizacionDeHeuristica(5));
```

3. Proponer un algoritmo de búsqueda local para el problema del viajante de comercio.

**Aclaracion:** La busqueda local solo esta encontrando y comparando con un solo vecino, la idea es a esta funcion mejorarla para la proxima entrega.

```javascript
const intercambiarConsecutivos = (grafo, nuevasAristas, posicionIntercambiar) => {
    // Sabiendo que 'posicionIntercambiar' no va a ser la primera ni la ultima
    // podemos restar y sumar sin problemas.
    let anterior = nuevasAristas[posicionIntercambiar - 1],
        actual = nuevasAristas[posicionIntercambiar],
        siguiente = nuevasAristas[posicionIntercambiar + 1],
        pesoARestar = anterior.getWeight + siguiente.getWeight;

    // Obtenemos las nuevas aristas.
    let newAnterior = grafo.getEdge(anterior.getNodeFrom, siguiente.getNodeFrom),
        newActual = grafo.getEdge(siguiente.getNodeFrom, actual.getNodeFrom),
        newSiguiente = grafo.getEdge(actual.getNodeFrom, siguiente.getNodeTo),
        pesoASumar = newAnterior.getWeight + newSiguiente.getWeight;

    // Intercambiamos las aristas.
    nuevasAristas[posicionIntercambiar - 1] = newAnterior;
    nuevasAristas[posicionIntercambiar] = newActual;
    nuevasAristas[posicionIntercambiar + 1] = newSiguiente;

    return { nuevasAristas, pesoARestar, pesoASumar };
}

const buscarVecino = (grafo, aristas, pesoTotal, posicionIntercambiar) => {
    // Hacemos copia de las aristas.
    let aristasACambiar = [...aristas],
        { nuevasAristas, pesoARestar, pesoASumar } = intercambiarConsecutivos(grafo, aristasACambiar, posicionIntercambiar),
        pesoNuevo = ((pesoTotal - pesoARestar) + pesoASumar);

    if (pesoNuevo < pesoTotal) {
        return { resultado: nuevasAristas, peso: pesoNuevo, vecino: true };
    }

    return { resultado: aristas, peso: pesoTotal, vecino: false };

}

export const busquedaLocal = (grafo, aristas, pesoTotal, { cantidadIteraciones }) => {
    // Buscar vecino mejor
    let encontreVecinoMejor = false,
        mejorResultado = aristas,
        mejorPeso = pesoTotal,
        contador = 0,
        posicionIntercambiar = 1,
        posicionParaReiniciar = aristas.length - 1; // No intercambio con la ultima posicion.

    while (!encontreVecinoMejor) {
        let { resultado, peso, vecino } = buscarVecino(grafo, mejorResultado, mejorPeso, posicionIntercambiar);

        contador++;
        posicionIntercambiar++;

        encontreVecinoMejor = 
            (contador >= cantidadIteraciones) // ya busque mas de 'cantidadIteraciones' vecinos.

        mejorResultado = resultado;
        mejorPeso = peso;

        // Reiciamos si estamos en la ultima posicion y no encontre vecino mejor.
        if (posicionIntercambiar === posicionParaReiniciar && !encontreVecinoMejor) {
            posicionIntercambiar = 1;
            mejorResultado = aristas;
            mejorPeso = pesoTotal;
        }
    }

    return { aristas: mejorResultado, pesoTotal: mejorPeso, contador: contador };

}
```

- Ejemplo de uso

```javascript
let { grafoCompleto, resultado, pesoTotal, predecesores, visitados } = 
    algoritmoGoloso(grafo01, 0, ordernamientoPorPeso, aleatorizacionDeHeuristica(5));

busquedaLocal(grafoCompleto, resultado, pesoTotal , { cantidadIteraciones: 100 })
```