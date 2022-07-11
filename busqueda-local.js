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

    sabiendo que: m = n

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
        return { resultadoEncontrado: nuevasAristas, pesoEncontrado: pesoNuevo };
    }

    return { resultadoEncontrado: aristas, pesoEncontrado: peso };
}


/* 
    ORDEN DE COMPLEJIDAD: busquedaLocal

    Aunque depende de la cantidad de iteraciones que se hayan configurado, 
    pero este numero seria una constante multiplicando el orden siguiente:

    sabiendo que: m = n

    O(n) * O(n-1)  => O(n * n-1) => O(nˆ2 - n)
*/
export const busquedaLocal = ({ grafo, aristas, peso, configuracion }) => {
    let { cantidadIteraciones = 3, porcentajeMinimaDeMejora = 0 } = configuracion;

    // Buscar vecino mejor
    let encontreVecinoMejor = false,
        mejorPorcentajeDeDisminucion = 0,
        mejorResultado = aristas,
        mejorPeso = peso,
        contador = 0,
        posicionIntercambiar = 1,
        posicionParaReiniciar = aristas.length - 2; // No intercambio con la ultima posicion.

    while (!encontreVecinoMejor) {
        let { resultadoEncontrado, pesoEncontrado } = buscarVecino({
            grafo: grafo, 
            aristas: mejorResultado, 
            peso: mejorPeso, 
            posicionIntercambiar: posicionIntercambiar
        });

        contador++;
        posicionIntercambiar++;

        // Porcentaje de disminucion.
        let diferencia = mejorPeso - pesoEncontrado,
            porcentajeDeDisminucion = (diferencia / mejorPeso) * 100;

        encontreVecinoMejor = 
            (contador > cantidadIteraciones) &&// ya busque mas de 'cantidadIteraciones' vecinos
            (porcentajeDeDisminucion < porcentajeMinimaDeMejora); // y el porcentaje es mayor al 'porcentajeMinimaDeMejora', entonces corto.

        mejorResultado = resultadoEncontrado;
        mejorPeso = pesoEncontrado;
        mejorPorcentajeDeDisminucion = Math.max(mejorPorcentajeDeDisminucion, porcentajeDeDisminucion);

        // Reiciamos si estamos en la ultima posicion y no encontre vecino mejor.
        if (posicionIntercambiar === posicionParaReiniciar && !encontreVecinoMejor) {
            posicionIntercambiar = 1;
            mejorResultado = aristas;
            mejorPeso = peso;
        }
    }

    return { resultadoEncontrado: mejorResultado, pesoEncontrado: mejorPeso };

}
