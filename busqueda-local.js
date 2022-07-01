
export const intercambiarConsecutivos = (grafo , nuevasAristas, posicionIntercambiar) => {
    // Sabiendo que 'posicionIntercambiar' no va a ser la primera ni la ultima
    // podemos restar y sumar sin problemas.
    let anterior = nuevasAristas[posicionIntercambiar-1],
        actual = nuevasAristas[posicionIntercambiar],
        siguiente = nuevasAristas[posicionIntercambiar+1],
        pesoARestar = anterior.getWeight + siguiente.getWeight;

    // Obtenemos las nuevas aristas.
    let newAnterior = grafo.getEdge(anterior.getNodeFrom, siguiente.getNodeFrom),
        newActual = grafo.getEdge(siguiente.getNodeFrom, actual.getNodeFrom),
        newSiguiente = grafo.getEdge(actual.getNodeFrom, siguiente.getNodeTo),
        pesoASumar = newAnterior.getWeight + newSiguiente.getWeight;

    // Intercambiamos las aristas.
    nuevasAristas[posicionIntercambiar-1] = newAnterior;
    nuevasAristas[posicionIntercambiar] = newActual;
    nuevasAristas[posicionIntercambiar+1] = newSiguiente;

    return { nuevasAristas, pesoARestar, pesoASumar };
}

export const busquedaLocal = (grafo, aristas, pesoTotal) => {

    // Hacemos copia de las aristas.
    let aristasACambiar = [...aristas];
    let { nuevasAristas, pesoARestar, pesoASumar } = intercambiarConsecutivos(grafo, aristasACambiar, 1);
    let pesoNuevo = ((pesoTotal-pesoARestar)+pesoASumar);

    // Elegimos el mejor de los dos.
    if(pesoNuevo < pesoTotal){
        return { resultado: nuevasAristas, pesoTotal: pesoNuevo, vecino: true };
    }
    
    return { resultado: aristas, pesoTotal: pesoTotal, vecino: false };
}