export const hexPolygonData = [
  {
    name: "Africa",
    geometry: {
      type: "Polygon",
      coordinates: [[
        [-20, 35],  // Northwest
        [50, 35],   // Northeast
        [50, -35],  // Southeast
        [-20, -35], // Southwest
        [-20, 35]   // Back to start
      ]]
    },
    color: "#33FF57"
  },
  {
    name: "Middle East",
    geometry: {
      type: "Polygon",
      coordinates: [[
        [25, 40],   // Northwest
        [60, 40],   // Northeast
        [60, 15],   // Southeast
        [25, 15],   // Southwest
        [25, 40]    // Back to start
      ]]
    },
    color: "#FF5733"
  },
  {
    name: "Asia",
    geometry: {
      type: "Polygon",
      coordinates: [[
        [60, 45],   // Northwest
        [140, 45],  // Northeast
        [140, 0],   // Southeast
        [60, 0],    // Southwest
        [60, 45]    // Back to start
      ]]
    },
    color: "#3357FF"
  }
]; 