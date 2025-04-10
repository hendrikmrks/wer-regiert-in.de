import { useEffect } from 'react';
import calculateMap from "./calculateMap.jsx";
import bundeslaender from "../data/bundeslaender.geo.json";

export default function useLoadGeoData(svgPaths, setSvgPaths) {
    const {calculateBounds, generateSvgPath, } = calculateMap();
    useEffect(() => {
        const loadGeoData = async () => {
            try {
                const germanyGeoData = bundeslaender;
                if (!germanyGeoData) {
                    throw new Error("Fehler beim Laden der GeoJSON-Daten");
                }

                const bounds = calculateBounds(germanyGeoData.features);
                const paths = {};

                germanyGeoData.features.forEach((feature) => {
                    const stateId = feature.properties.id.toLowerCase();
                    paths[stateId] = generateSvgPath(feature.geometry, bounds);
                });

                setSvgPaths(paths);
            } catch (error) {
                console.error(error);
            }
        };
        loadGeoData()
    }, []);
    return svgPaths;
}