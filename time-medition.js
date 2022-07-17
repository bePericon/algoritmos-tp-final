import microprofiler from 'microprofiler';

let start = 0;

export const startMedition = () => {
    start = microprofiler.start();
}

export const stopMedition = (log = false) => {
    let elapsedUs = microprofiler.measureFrom(start);
    let seconds = elapsedUs * 0.000001;
    let minutes = seconds * 0.0167;
    if (log) {
        console.log(`TIEMPO DE EJECUCION: ${seconds} segundos - ${minutes} minutos`);
    }

    return { nanoseconds: elapsedUs, seconds: seconds, minutes: minutes };
}