// based on https://www.danbp.org/p/en/node/139
// getEccAnom function based on https://nbodyphysics.com/blog/2016/05/29/planetary-orbits-in-javascript/

import { Vector3 } from 'three';

const degToRad = deg => deg * (Math.PI / 180);

const getEccAnom = (meanAnom, ecc) => {

    const LOOP_LIMIT = 100;

    let eccAnom = meanAnom;
    let eccAnomNext = 0;
    let loopCount = 0;

    while(loopCount++ < LOOP_LIMIT) {
        eccAnomNext = eccAnom + (meanAnom - (eccAnom - ecc * Math.sin(eccAnom)))/(1 - ecc * Math.cos(eccAnom));
        if(Math.abs(eccAnomNext - eccAnom) < 1e-6) break;
        eccAnom = eccAnomNext;
    }

    return eccAnom;
};

export const getOrbitCoords = (elements, frac = 0) => {

    const semi = elements.semi || 1;
    const ecc = elements.ecc || 0;
    const inc = degToRad(elements.inc || 0);
    const meanLong = degToRad(elements.meanLong || 0);
    const longPeri = degToRad(elements.longPeri || 0);
    const longAsc = degToRad(elements.longAsc || 0);

    const argPeri = longPeri - longAsc;
    const meanAnom = meanLong - longPeri + (2 * Math.PI * frac);
    const eccAnom = getEccAnom(meanAnom, ecc);

    const xCenter = semi * (Math.cos(eccAnom) - ecc);
    const yCenter = semi * Math.sqrt(1 - Math.pow(ecc, 2)) * Math.sin(eccAnom);

    const cosArgPeri = Math.cos(argPeri);
    const sinArgPeri=  Math.sin(argPeri);
    const cosLongAsc = Math.cos(longAsc);
    const sinLongAsc = Math.sin(longAsc);
    const cosInc = Math.cos(inc);
    const sinInc = Math.sin(inc);

    const xEcliptic = (cosArgPeri * cosLongAsc - sinArgPeri * sinLongAsc * cosInc) * xCenter + (-sinArgPeri * cosLongAsc - cosArgPeri * sinLongAsc * cosInc) * yCenter;
    const yEcliptic = (cosArgPeri * sinLongAsc + sinArgPeri * cosLongAsc * cosInc) * xCenter + (-sinArgPeri * sinLongAsc + cosArgPeri * cosLongAsc * cosInc) * yCenter;
    const zEcliptic = (sinArgPeri * sinInc) * xCenter + (cosArgPeri * sinInc) * yCenter;

    return new Vector3 (xEcliptic, yEcliptic, zEcliptic);
};

export const getOrbitPoints = (elements, count) => {

    const orbitPoints = [];
    if(count > 0) {
        const inc = 1 / count;
        let frac = 0;
        while(frac < 1) {
            orbitPoints.push(getOrbitCoords(elements, frac));
            frac += inc;
        }
        orbitPoints.push(getOrbitCoords(elements, 0));
    }
    return orbitPoints;
};