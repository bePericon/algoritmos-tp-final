
export const intercambiarConsecutivos = (grafo ,listaAristas) => {
    let a0 = listaAristas[0],
        a1 = listaAristas[1],
        a2 = listaAristas[2],
        pesoARestar = a0.getWeight + a2.getWeight;

    let new0 = grafo.getEdge(a0.getNodeFrom, a2.getNodeFrom),
        new1 = grafo.getEdge(a2.getNodeFrom, a1.getNodeFrom),
        new2 = grafo.getEdge(a1.getNodeFrom, a2.getNodeTo),
        pesoASumar = new0.getWeight + new2.getWeight;

    return { aristasIntercambiadas: [new0, new1, new2], pesoARestar, pesoASumar };
}

export const busquedaLocal = (grafo, aristas, pesoTotal) => {

    let aristasACambiar = aristas.slice(0, 3),
        resto = aristas.slice(3, aristas.length),
        { aristasIntercambiadas, pesoARestar, pesoASumar } = intercambiarConsecutivos(grafo, aristasACambiar);

    // for(let i = 0; i < 3; i++){
    // }

    return { vecino: [...aristasIntercambiadas, ...resto], pesoTotal: ((pesoTotal-pesoARestar)+pesoASumar) }
}