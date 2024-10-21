import fs from 'fs';

// City coordinates and bounds
const cities = {
  jakarta: {
    center: [106.8456, -6.2088],
    bounds: {
      lng: [106.7, 106.95],
      lat: [-6.15, -6.25]
    }
  },
  pontianak: {
    center: [109.3425, -0.0263],
    bounds: {
      lng: [109.3, 109.4],
      lat: [-0.01, -0.05]
    }
  },
  semarang: {
    center: [110.4203, -6.9932],
    bounds: {
      lng: [110.35, 110.5],
      lat: [-6.95, -7.05]
    }
  },
  singkawang: {
    center: [108.9872, 0.9063],
    bounds: {
      lng: [108.95, 109.02],
      lat: [0.89, 0.92]
    }
  },
  sintang: {
    center: [111.4950, 0.0797],
    bounds: {
      lng: [111.45, 111.55],
      lat: [0.05, 0.1]
    }
  },
  palangkaraya: {
    center: [113.9213, -2.2097],
    bounds: {
      lng: [113.9, 114.0],
      lat: [-2.19, -2.25]
    }
  }
};

const hotelTypes = [
  "Hotel", "Resort", "Inn", "Palace", "Suites", "Grand Hotel"
];

const facilities = [
  "pool", "spa", "restaurant", "gym", "wifi", "meeting-room", 
  "beach-access", "business-center", "parking", "room-service"
];

function generateRandomCoordinate(bounds) {
  const lng = bounds.lng[0] + Math.random() * (bounds.lng[1] - bounds.lng[0]);
  const lat = bounds.lat[0] + Math.random() * (bounds.lat[1] - bounds.lat[0]);
  return [parseFloat(lng.toFixed(6)), parseFloat(lat.toFixed(6))];
}

function generateHotels() {
  const features = [];
  let id = 1;

  Object.entries(cities).forEach(([cityName, cityData]) => {
    // Generate 15-25 hotels per city
    const numHotels = 15 + Math.floor(Math.random() * 10);
    
    for (let i = 0; i < numHotels; i++) {
      const stars = 2 + Math.floor(Math.random() * 4);
      const rooms = 50 + Math.floor(Math.random() * 200);
      const coords = generateRandomCoordinate(cityData.bounds);
      
      const feature = {
        type: "Feature",
        properties: {
          id: `${cityName.substring(0, 3).toUpperCase()}${id.toString().padStart(3, '0')}`,
          name: `${cityName.charAt(0).toUpperCase() + cityName.slice(1)} ${hotelTypes[Math.floor(Math.random() * hotelTypes.length)]} ${id}`,
          stars: stars,
          rooms: rooms,
          price_range: stars <= 3 ? "400000-900000" : stars === 4 ? "900000-2000000" : "2000000-5000000",
          address: `Jl. Example No.${Math.floor(Math.random() * 200)}, ${cityName.charAt(0).toUpperCase() + cityName.slice(1)}`,
          facilities: facilities.sort(() => 0.5 - Math.random()).slice(0, 3 + Math.floor(Math.random() * 4)),
          phone: `+${Math.floor(Math.random() * 10000000000)}`
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

const hotelData = generateHotels();
fs.writeFileSync('hotels.geojson', JSON.stringify(hotelData, null, 2));
console.log(`Generated ${hotelData.features.length} hotels`);