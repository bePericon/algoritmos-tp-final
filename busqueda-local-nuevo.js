
const intercambiarConsecutivos = ({ grafo, aristas, posicionIntercambiar }) => {
    // Sabiendo que 'posicionIntercambiar' no va a ser la primera ni la ultima
    // podemos restar y sumar sin problemas.
    let anterior = aristas[posicionIntercambiar - 1],
        actual = aristas[posicionIntercambiar],
        siguiente = aristas[posicionIntercambiar + 1],
        pesoARestar = anterior.getWeight + siguiente.getWeight;

    // Obtenemos las nuevas aristas.
    let newAnterior = grafo.getEdge(anterior.getNodeFrom, siguiente.getNodeFrom),
        newActual = grafo.getEdge(siguiente.getNodeFrom, actual.getNodeFrom),
        newSiguiente = grafo.getEdge(actual.getNodeFrom, siguiente.getNodeTo),
        pesoASumar = newAnterior.getWeight + newSiguiente.getWeight;

    // Intercambiamos las aristas.
    aristas[posicionIntercambiar - 1] = newAnterior;
    aristas[posicionIntercambiar] = newActual;
    aristas[posicionIntercambiar + 1] = newSiguiente;

    return { nuevasAristas: aristas, pesoARestar, pesoASumar };
}

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

    // if (pesoNuevo < peso) {
        return { resultadoEncontrado: nuevasAristas, pesoEncontrado: pesoNuevo };
    // }

    // return { resultadoEncontrado: aristas, pesoEncontrado: peso };
}

export const busquedaLocal = ({ grafo, aristas, peso, configuracion }) => {
    let { cantidadIteraciones, porcentajeMinimaDeMejora } = configuracion;

    let mejorVecino = { resultadoEncontrado: aristas, pesoEncontrado: peso };
    let aristasBL = aristas;
    let pesoBL = peso;

    let contador = 0;
    while (contador < cantidadIteraciones) {
        let posicionInicial = 1;
        let posicionNodoActual = 1;
        let ultimaPosicion = aristas.length - 2;

        while (posicionInicial < ultimaPosicion) {
            while (posicionNodoActual <= ultimaPosicion) {
                mejorVecino =
                    buscarVecino({
                        grafo: grafo,
                        aristas: aristasBL,
                        peso: pesoBL,
                        posicionIntercambiar: posicionNodoActual
                    });

                posicionNodoActual++;
            }
            posicionInicial++;
        }

        aristasBL = mejorVecino.resultadoEncontrado;
        pesoBL = mejorVecino.pesoEncontrado;

        contador++;
    }

    console.log("CONTADOR!!", contador)
    return mejorVecino;

}
