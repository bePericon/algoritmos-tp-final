
/* 
    ORDEN DE COMPLEJIDAD: intercambiarConsecutivos
    O(1)

    Nota:
    El metodo ´getEdge(...)´ en mi caso busca en una lista de adyacencia, entonces seria de O(n).
    Pero para que esto siga siendo O(1) se deberia tener la matriz de adyacencia (que no esta implementada).
*/
const intercambiarConsecutivos = ({ grafo, aristas, posicionIntercambiar }) => {
    // Sabiendo que 'posicionIntercambiar' no va a ser la primera ni la ultima
    // podemos restar y sumar sin problemas.
    let anterior = aristas[posicionIntercambiar - 1],
        actual = aristas[posicionIntercambiar],
        siguiente = aristas[posicionIntercambiar + 1],
        pesoARestar = anterior.getWeight + siguiente.getWeight;

    // Obtenemos las nuevas aristas.
    let newAnterior = grafo.getEdge(anterior.getNodeFrom, actual.getNodeTo),
        newActual = grafo.getEdge(actual.getNodeTo, actual.getNodeFrom),
        newSiguiente = grafo.getEdge(actual.getNodeFrom, siguiente.getNodeTo),
        pesoASumar = newAnterior.getWeight + newSiguiente.getWeight;

    // Intercambiamos las aristas.
    aristas[posicionIntercambiar - 1] = newAnterior;
    aristas[posicionIntercambiar] = newActual;
    aristas[posicionIntercambiar + 1] = newSiguiente;

    return { nuevasAristas: aristas, pesoARestar, pesoASumar };
}

/* 
    ORDEN DE COMPLEJIDAD: buscarVecino

    Al hacer la copia de las aristas estariamos haciendo un recorrido en las aristas,
    siendo estas el mismo numero de nodos, mas el intercambiar que es de O(1), entonces seria:

    O(n)
*/
const buscarVecino = ({ grafo, aristas, peso, posicionIntercambiar }) => {
    // Hacemos copia de las aristas.
    let aristasACambiar = [...aristas],
        { nuevasAristas, pesoARestar, pesoASumar } =
            intercambiarConsecutivos({
                grafo: grafo,
                aristas: aristasACambiar,
                posicionIntercambiar: posicionIntercambiar
            }),
        pesoNuevo = ((peso - pesoARestar) + pesoASumar);

    if (pesoNuevo < peso) {
        return { resultadoEncontrado: nuevasAristas, pesoEncontrado: pesoNuevo, vecino: true };
    }

    return { resultadoEncontrado: aristas, pesoEncontrado: peso, vecino: false };
}

/* 
    ORDEN DE COMPLEJIDAD: mejorDeVecindad

    O(n)
*/
export const mejorDeVecindad = ({ grafo, aristas, peso }) => {
    let posicion = 1;
    let posicionFinal = aristas.length - 2;
    let mejorResultado = aristas;
    let mejorPeso = peso;
    let cantidadVecinosEncontradosMejores = 0;

    while (posicion <= posicionFinal) {
        let { resultadoEncontrado, pesoEncontrado, vecino } = buscarVecino({
            grafo: grafo,
            aristas: mejorResultado,
            peso: mejorPeso,
            posicionIntercambiar: posicion
        });

        // console.log(`MEJOR VECINDAD - peso parcial: ${pesoEncontrado} - es vecino?: ${vecino}`);

        mejorResultado = resultadoEncontrado;
        mejorPeso = pesoEncontrado;
        posicion++;

        if (vecino) {
            cantidadVecinosEncontradosMejores++;
            posicion = 1;
        };
    }

    return {
        resultadoMejorEnVecindad: mejorResultado,
        pesoMejorEnVecindad: mejorPeso,
        ultimaPosicion: posicion,
        cantidadVecinosEncontradosMejores
    };
}

/* 
    ORDEN DE COMPLEJIDAD: busquedaLocal

    Aunque depende de la cantidad de iteraciones que se hayan configurado, 
    pero este numero seria una constante multiplicando el orden siguiente:

    O(n) * O(n-1)  => O(n * n-1) => O(nˆ2 - n) => O(nˆ2)
*/
export const busquedaLocal = ({ grafo, aristas, peso, configuracion = { cantidadIteraciones: 3 } }) => {
    let { cantidadIteraciones } = configuracion;

    // Buscar vecino mejor
    let encontreVecinoMejor = false;
    let contador = 0;
    let mejorResultado = aristas;
    let mejorPeso = peso;
    let cantidadEncontradosMejores = 0;

    while ((contador < cantidadIteraciones)) {
        let {
            resultadoMejorEnVecindad,
            pesoMejorEnVecindad,
            ultimaPosicion,
            cantidadVecinosEncontradosMejores
        } = mejorDeVecindad({
            grafo: grafo,
            aristas: mejorResultado,
            peso: mejorPeso
        });

        mejorResultado = resultadoMejorEnVecindad;
        mejorPeso = pesoMejorEnVecindad;

        contador++;
        cantidadEncontradosMejores += cantidadVecinosEncontradosMejores;
    }

    // console.log(`BUSQUEDA LOCAL - cantidad mejores encontrados: ${cantidadEncontradosMejores}`);

    return { resultadoEncontrado: mejorResultado, pesoEncontrado: mejorPeso };
}
