import { readFileSync, readdirSync } from 'fs';
import { toJson } from 'xml2json';
import { GraphXML } from "./classes/graph-xml.js";

const listFiles = readdirSync('./data/tests');

const getListGraph = (order) => {
    let listGraph = [];
    listFiles.forEach((nameFile) => {
        const xml = readFileSync(`./data/tests/${nameFile}`);
        const parsedGraph = JSON.parse(toJson(xml)).travellingSalesmanProblemInstance;

        const graphXML = new GraphXML(parsedGraph.graph.vertex, order);

        listGraph.push(graphXML);
    });
    return listGraph;
}

export { getListGraph };