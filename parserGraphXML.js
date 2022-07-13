import { readFileSync, readdirSync } from 'fs';
import { toJson } from 'xml2json';
import { GraphXML } from "./classes/graph-xml.js";

const weights = {
    'burma14': 3323,  
    'gr17': 2085,      
    'gr21': 2707,
    'gr24': 1272,     
    'fri26': 937,     
    'bayg29': 1610,
    'bays29': 2020,   
    'dantzig42': 699, 
    'att48': 10628,
    'gr48': 5046,     
    'hk48': 11461,      
    'eil51': 426,
    'berlin52': 7542, 
    'brazil58': 25395,  
    'eil76': 538,
    'gr96': 55209,     
    'd198': 15780,
    'eil101': 629,    
    'gr120': 6942,
    'bier127': 118282,  
    'ch130': 6110,     
    'gr137': 69853,
    'ch150': 6528,    
    'brg180': 1950
}

const listFiles = readdirSync('./data/tests');

const getListGraph = (order) => {
    let listGraph = [];
    listFiles.forEach((nameFile) => {
        const xml = readFileSync(`./data/tests/${nameFile}`);
        const parsedGraph = JSON.parse(toJson(xml)).travellingSalesmanProblemInstance;

        const graphXML = new GraphXML(parsedGraph.graph.vertex, order, parsedGraph.name, weights[parsedGraph.name]);

        listGraph.push(graphXML);
    });
    return listGraph;
}

export { getListGraph };