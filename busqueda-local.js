
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