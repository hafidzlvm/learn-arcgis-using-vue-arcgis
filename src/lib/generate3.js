import fs from 'fs';

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

const schoolTypes = {
  SD: {
    fullName: "Sekolah Dasar",
    prefixes: ["SDN", "SD", "SDS", "SDK", "SDI"],
    minStudents: 100,
    maxStudents: 500
  },
  SMP: {
    fullName: "Sekolah Menengah Pertama", 
    prefixes: ["SMPN", "SMP", "SMPS", "SMPK", "SMPI"],
    minStudents: 200,
    maxStudents: 800
  },
  SMA: {
    fullName: "Sekolah Menengah Atas",
    prefixes: ["SMAN", "SMA", "SMAS", "SMAK", "SMAI"],
    minStudents: 200,
    maxStudents: 1000
  },
  SMK: {
    fullName: "Sekolah Menengah Kejuruan",
    prefixes: ["SMKN", "SMK", "SMKS", "SMKK", "SMKI"],
    minStudents: 300,
    maxStudents: 1200
  }
};

const facilities = [
  "perpustakaan", "lab-komputer", "lab-ipa", "lab-bahasa", 
  "musholla", "lapangan-olahraga", "kantin", "uks",
  "aula", "ruang-multimedia", "studio-musik", "bengkel-praktik"
];

const accreditations = ["A", "B", "C"];

function generateRandomCoordinate(bounds) {
  const lng = bounds.lng[0] + Math.random() * (bounds.lng[1] - bounds.lng[0]);
  const lat = bounds.lat[0] + Math.random() * (bounds.lat[1] - bounds.lat[0]);
  return [parseFloat(lng.toFixed(6)), parseFloat(lat.toFixed(6))];
}

function generateSchools() {
  const features = [];
  let id = 1;

  Object.entries(cities).forEach(([cityName, cityData]) => {
    // Generate 40-50 schools per city for total ~250-300
    const numSchools = 40 + Math.floor(Math.random() * 10);
    
    for (let i = 0; i < numSchools; i++) {
      const schoolLevel = Object.keys(schoolTypes)[Math.floor(Math.random() * Object.keys(schoolTypes).length)];
      const schoolType = schoolTypes[schoolLevel];
      const prefix = schoolType.prefixes[Math.floor(Math.random() * schoolType.prefixes.length)];
      const students = schoolType.minStudents + Math.floor(Math.random() * (schoolType.maxStudents - schoolType.minStudents));
      const coords = generateRandomCoordinate(cityData.bounds);
      
      const feature = {
        type: "Feature",
        properties: {
          id: `SCH${cityName.substring(0, 1).toUpperCase()}${id.toString().padStart(3, '0')}`,
          name: `${prefix} ${cityName.charAt(0).toUpperCase() + cityName.slice(1)} ${id}`,
          level: schoolLevel,
          type: schoolType.fullName,
          students: students,
          teachers: Math.floor(students / 15), // Approximate teacher ratio
          accreditation: accreditations[Math.floor(Math.random() * accreditations.length)],
          address: `Jl. Pendidikan No.${Math.floor(Math.random() * 200)}, ${cityName.charAt(0).toUpperCase() + cityName.slice(1)}`,
          facilities: facilities.sort(() => 0.5 - Math.random()).slice(0, 4 + Math.floor(Math.random() * 4)),
          year_established: 1960 + Math.floor(Math.random() * 50),
          phone: `+${Math.floor(Math.random() * 10000000000)}`,
          website: `https://${schoolLevel.toLowerCase()}${id}.${cityName.toLowerCase()}.sch.id`,
          extracurricular: ["pramuka", "paskibra", "pmr"].sort(() => 0.5 - Math.random()).slice(0, 2 + Math.floor(Math.random() * 2))
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

const schoolData = generateSchools();
fs.writeFileSync('schools.geojson', JSON.stringify(schoolData, null, 2));
console.log(`Generated ${schoolData.features.length} schools`);