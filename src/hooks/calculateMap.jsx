export default function calculateMap() {
    const calculateBounds = (features) => {
        let minX = Infinity;
        let minY = Infinity;
        let maxX = -Infinity;
        let maxY = -Infinity;

        features.forEach((feature) => {
            if (feature.geometry.type === "MultiPolygon") {
                feature.geometry.coordinates.forEach((polygon) => {
                    polygon.forEach((ring) => {
                        ring.forEach((coord) => {
                            minX = Math.min(minX, coord[0]);
                            minY = Math.min(minY, coord[1]);
                            maxX = Math.max(maxX, coord[0]);
                            maxY = Math.max(maxY, coord[1]);
                        });
                    });
                });
            } else if (feature.geometry.type === "Polygon") {
                feature.geometry.coordinates.forEach((ring) => {
                    ring.forEach((coord) => {
                        minX = Math.min(minX, coord[0]);
                        minY = Math.min(minY, coord[1]);
                        maxX = Math.max(maxX, coord[0]);
                        maxY = Math.max(maxY, coord[1]);
                    });
                });
            }
        });

        return {minX, minY, maxX, maxY};
    };

    const generateSvgPath = (geometry, bounds) => {
        const svgWidth = 800;
        const svgHeight = 900;
        const padding = 20;

        const scaleX = (svgWidth - 2 * padding) / (bounds.maxX - bounds.minX);
        const scaleY = (svgHeight - 2 * padding) / (bounds.maxY - bounds.minY);

        const transformCoordinate = (coord) => {
            const x = (coord[0] - bounds.minX) * scaleX + padding;
            // Y-Achse ist in SVG umgekehrt
            const y = svgHeight - ((coord[1] - bounds.minY) * scaleY + padding);
            return [x, y];
        };

        let pathData = "";

        if (geometry.type === "MultiPolygon") {
            geometry.coordinates.forEach((polygon) => {
                polygon.forEach((ring) => {
                    const transformedRing = ring.map(transformCoordinate);

                    transformedRing.forEach((point, i) => {
                        if (i === 0) {
                            pathData += `M${point[0]},${point[1]} `;
                        } else {
                            pathData += `L${point[0]},${point[1]} `;
                        }
                    });
                    pathData += "Z ";
                });
            });
        } else if (geometry.type === "Polygon") {
            geometry.coordinates.forEach((ring) => {
                const transformedRing = ring.map(transformCoordinate);

                transformedRing.forEach((point, i) => {
                    if (i === 0) {
                        pathData += `M${point[0]},${point[1]} `;
                    } else {
                        pathData += `L${point[0]},${point[1]} `;
                    }
                });
                pathData += "Z ";
            });
        }
        return pathData;
    };
    return {calculateBounds, generateSvgPath}
}