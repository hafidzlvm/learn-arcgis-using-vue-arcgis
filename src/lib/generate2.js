import fs from 'fs';

const cities = {
  jakarta: {
    center: [106.8456, -6.2088],
    bounds: {
      lng: [106.7, 106.95],
      lat: [-6.15, -6.25]
    },
    prefixes: ["RSUD", "RS", "RSU", "RSIA", "RSAB"]
  },
  pontianak: {
    center: [109.3425, -0.0263],
    bounds: {
      lng: [109.3, 109.4],
      lat: [-0.01, -0.05]
    },
    prefixes: ["RS Sultan Muhammad", "RS", "RSUD", "RSU"]
  },
  semarang: {
    center: [110.4203, -6.9932],
    bounds: {
      lng: [110.35, 110.5],
      lat: [-6.95, -7.05]
    },
    prefixes: ["RS", "RSUD", "RSU", "RSUP"]
  },
  singkawang: {
    center: [108.9872, 0.9063],
    bounds: {
      lng: [108.95, 109.02],
      lat: [0.89, 0.92]
    },
    prefixes: ["RS", "RSUD", "RSU"]
  },
  sintang: {
    center: [111.4950, 0.0797],
    bounds: {
      lng: [111.45, 111.55],
      lat: [0.05, 0.1]
    },
    prefixes: ["RSUD", "RS", "RSU"]
  },
  palangkaraya: {
    center: [113.9213, -2.2097],
    bounds: {
      lng: [113.9, 114.0],
      lat: [-2.19, -2.25]
    },
    prefixes: ["RSUD", "RS", "RSU"]
  }
};

const hospitalTypes = [
  "Umum", "Anak", "Ibu dan Anak", "Jantung", "Kanker", 
  "Jiwa", "Mata", "Bedah", "Orthopedi", "Paru"
];

const facilities = [
  "ICU", "NICU", "PICU", "radiologi", "laboratorium", 
  "farmasi", "rehabilitasi", "hemodialisa", "bedah", "gawat-darurat",
  "poli-umum", "poli-gigi", "poli-anak", "poli-kandungan"
];

const accreditations = ["A", "B", "C"];

function generateRandomCoordinate(bounds) {
  const lng = bounds.lng[0] + Math.random() * (bounds.lng[1] - bounds.lng[0]);
  const lat = bounds.lat[0] + Math.random() * (bounds.lat[1] - bounds.lat[0]);
  return [parseFloat(lng.toFixed(6)), parseFloat(lat.toFixed(6))];
}

function generateHospitals() {
  const features = [];
  let id = 1;

  Object.entries(cities).forEach(([cityName, cityData]) => {
    // Generate 30-40 hospitals per city for total ~200
    const numHospitals = 30 + Math.floor(Math.random() * 10);
    
    for (let i = 0; i < numHospitals; i++) {
      const beds = 50 + Math.floor(Math.random() * 450);
      const coords = generateRandomCoordinate(cityData.bounds);
      const prefix = cityData.prefixes[Math.floor(Math.random() * cityData.prefixes.length)];
      const type = hospitalTypes[Math.floor(Math.random() * hospitalTypes.length)];
      
      const feature = {
        type: "Feature",
        properties: {
          id: `HSP${cityName.substring(0, 1).toUpperCase()}${id.toString().padStart(3, '0')}`,
          name: `${prefix} ${type} ${cityName.charAt(0).toUpperCase() + cityName.slice(1)} ${id}`,
          type: type,
          beds: beds,
          accreditation: accreditations[Math.floor(Math.random() * accreditations.length)],
          address: `Jl. Kesehatan No.${Math.floor(Math.random() * 200)}, ${cityName.charAt(0).toUpperCase() + cityName.slice(1)}`,
          facilities: facilities.sort(() => 0.5 - Math.random()).slice(0, 5 + Math.floor(Math.random() * 5)),
          emergency: true,
          phone: `+${Math.floor(Math.random() * 10000000000)}`,
          website: `https://rs${id}.${cityName.toLowerCase()}.id`
        },
        geometry: {
          type: "Point",
          coordinates: coords
        }
      };
      
      features.push(feature);
      id++;
    }
  });

  return {
    type: "FeatureCollection",
    features: features
  };
}

const hospitalData = generateHospitals();
fs.writeFileSync('hospitals.geojson', JSON.stringify(hospitalData, null, 2));
console.log(`Generated ${hospitalData.features.length} hospitals`);