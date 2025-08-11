declare module '*.geojson' {
  const value: {
    type: string;
    features: Array<{
      type: string;
      geometry: {
        type: string;
        coordinates: number[][][];
      };
      properties: {
        ADMIN: string;
        ISO_A3: string;
        [key: string]: any;
      };
    }>;
  };
  export default value;
} 