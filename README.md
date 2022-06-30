# ALGORITMOS - Trabajo Practico Final

## Metaheuristica: GRASP

### Enunciado

1. Proponer un algoritmo goloso para el problema del viajante de comercio.

La heuristica golosa propuesta es: **el vertice mas cercano**.

2. Aleatorizar el algoritmo anterior.

Se eligira de forma **aleatoria entre los primeros 5 vertices** (o menos) ordenados por cercania.

3. Proponer un algoritmo de búsqueda local para el problema del viajante de comercio.

Como **operador local** se utilizara el **intercambio de consecutivos**.

4. Variar parámetros y la estrategia del algoritmo de búsqueda local que optimicen el funcionamiento del mismo.

5. Construir un algoritmo GRASP para el problema del viajante de comercio. La entrada de su algoritmo será un
archivo con una instancia del problema del viajante de comercio (ej: matriz de distancias), y la salida deberá ser
un archivo de texto plano con un circuito hamiltoniano y su valor.

6. Presentar un gráco de scoring contra la cantidad de iteraciones para baterías de distintas instancias, que permita
decidir una cantidad de iteraciones que ayude a encontrar un valor cercano al óptimo sin desperdiciar tiempo de
cómputo.