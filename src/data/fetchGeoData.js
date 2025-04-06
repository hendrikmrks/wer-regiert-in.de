// fetchGeoData.js
import { feature } from 'topojson-client';

export default async function fetchGermanyGeoData() {
  try {
    // Es gibt verschiedene öffentliche Quellen für GeoJSON-Daten zu Deutschland
    // Hier ein Beispiel, wie man Daten von einer öffentlichen Quelle laden könnte
    const response = await fetch('https://raw.githubusercontent.com/isellsoap/deutschlandGeoJSON/main/2_bundeslaender/4_niedrig.geo.json');
    
    // Alternativ kann man auch lokale Daten verwenden 
    // const response = await fetch('/assets/germany.json');
    
    if (!response.ok) {
      throw new Error('Fehler beim Laden der GeoJSON-Daten');
    }
    
    const data = await response.json();
    
    // Wenn die Daten im TopoJSON-Format sind, müssen sie konvertiert werden
    // Beispiel: return feature(data, data.objects.bundeslaender);
    
    // Bei regulärem GeoJSON
    return data;
  } catch (error) {
    console.error('Fehler beim Laden der GeoJSON-Daten:', error);
    return null;
  }
}