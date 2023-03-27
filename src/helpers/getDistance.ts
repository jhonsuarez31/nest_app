export const getDistance = (pointOneLat: number, pointOneLon: number, pointTwoLat: number, pointTwoLon: number): number => {

    pointOneLat = degreesToRadians(pointOneLat)
    pointOneLon = degreesToRadians(pointOneLon)
    pointTwoLat = degreesToRadians(pointTwoLat)
    pointTwoLon = degreesToRadians(pointTwoLon)

    const EARTH_RADIUS_KM = 6371;

    const latitud = (pointOneLat - pointTwoLat)

    const longitud = (pointOneLon - pointTwoLon)

    let a = Math.pow(Math.sin(latitud / 2.0), 2) + Math.cos(pointOneLat) * Math.cos(pointTwoLat) * Math.pow(Math.sin(longitud / 2.0), 2);
    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return EARTH_RADIUS_KM * c;

}

const degreesToRadians = (degrees: number): number => {
    return degrees * Math.PI / 180;
};

