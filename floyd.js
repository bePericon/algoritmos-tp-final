
export const floyd = (grafo) => {
    let result = [...grafo];
    for (var k = 0; k < grafo.length; k++) {
        for (var i = 0; i < grafo.length; i++) {
            for (var j = 0; j < grafo.length; j++) {
                if (result[i][j] > result[i][k] + result[k][j])
                    result[i][j] = result[i][k] + result[k][j];
            }
        }
    }
    return result;
}