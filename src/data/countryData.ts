interface CountryData {
  lat: number;
  lng: number;
  text: string;
  color: string;
  size: number;
  altitude: number;
  label: string;
  energyData: {
    renewablePercentage: number;
    totalEnergyProduction: string;
    mainEnergySource: string;
    energyConsumption: string;
  };
}

export const countryData: CountryData[] = [
  // Africa
  {
    lat: 30.0444,
    lng: 31.2357,
    text: "Egypt",
    color: "#33FF57",
    size: 2,
    altitude: 0.1,
    label: "Cairo",
    energyData: {
      renewablePercentage: 12,
      totalEnergyProduction: "65 GW",
      mainEnergySource: "Natural Gas",
      energyConsumption: "45 GW"
    }
  },
  {
    lat: 33.5731,
    lng: -7.5898,
    text: "Morocco",
    color: "#33FF57",
    size: 2,
    altitude: 0.1,
    label: "Rabat",
    energyData: {
      renewablePercentage: 35,
      totalEnergyProduction: "10 GW",
      mainEnergySource: "Solar & Wind",
      energyConsumption: "8 GW"
    }
  },
  {
    lat: 6.5244,
    lng: 3.3792,
    text: "Nigeria",
    color: "#33FF57",
    size: 2,
    altitude: 0.1,
    label: "Lagos",
    energyData: {
      renewablePercentage: 15,
      totalEnergyProduction: "12 GW",
      mainEnergySource: "Oil & Gas",
      energyConsumption: "8 GW"
    }
  },
  {
    lat: -33.9249,
    lng: 18.4241,
    text: "South Africa",
    color: "#33FF57",
    size: 2,
    altitude: 0.1,
    label: "Cape Town",
    energyData: {
      renewablePercentage: 18,
      totalEnergyProduction: "58 GW",
      mainEnergySource: "Coal",
      energyConsumption: "50 GW"
    }
  },
  {
    lat: -1.2921,
    lng: 36.8219,
    text: "Kenya",
    color: "#33FF57",
    size: 2,
    altitude: 0.1,
    label: "Nairobi",
    energyData: {
      renewablePercentage: 73,
      totalEnergyProduction: "3 GW",
      mainEnergySource: "Geothermal",
      energyConsumption: "2.5 GW"
    }
  },
  
  // Middle East
  {
    lat: 24.7136,
    lng: 46.6753,
    text: "Saudi Arabia",
    color: "#FF5733",
    size: 2,
    altitude: 0.1,
    label: "Riyadh",
    energyData: {
      renewablePercentage: 0.5,
      totalEnergyProduction: "12.5 million barrels/day",
      mainEnergySource: "Oil",
      energyConsumption: "3.5 million barrels/day"
    }
  },
  {
    lat: 25.2048,
    lng: 55.2708,
    text: "UAE",
    color: "#FF5733",
    size: 2,
    altitude: 0.1,
    label: "Dubai",
    energyData: {
      renewablePercentage: 7,
      totalEnergyProduction: "3.5 million barrels/day",
      mainEnergySource: "Oil & Gas",
      energyConsumption: "1.2 million barrels/day"
    }
  },
  {
    lat: 31.9522,
    lng: 35.9336,
    text: "Jordan",
    color: "#FF5733",
    size: 2,
    altitude: 0.1,
    label: "Amman",
    energyData: {
      renewablePercentage: 20,
      totalEnergyProduction: "5 GW",
      mainEnergySource: "Natural Gas",
      energyConsumption: "4 GW"
    }
  },
  {
    lat: 33.3152,
    lng: 44.3661,
    text: "Iraq",
    color: "#FF5733",
    size: 2,
    altitude: 0.1,
    label: "Baghdad",
    energyData: {
      renewablePercentage: 2,
      totalEnergyProduction: "4.5 million barrels/day",
      mainEnergySource: "Oil",
      energyConsumption: "1.5 million barrels/day"
    }
  },
  {
    lat: 35.6892,
    lng: 51.3890,
    text: "Iran",
    color: "#FF5733",
    size: 2,
    altitude: 0.1,
    label: "Tehran",
    energyData: {
      renewablePercentage: 5,
      totalEnergyProduction: "4.2 million barrels/day",
      mainEnergySource: "Oil & Gas",
      energyConsumption: "2.1 million barrels/day"
    }
  },
  
  // Asia
  {
    lat: 35.6762,
    lng: 139.6503,
    text: "Japan",
    color: "#3357FF",
    size: 2,
    altitude: 0.1,
    label: "Tokyo",
    energyData: {
      renewablePercentage: 20,
      totalEnergyProduction: "250 GW",
      mainEnergySource: "Nuclear",
      energyConsumption: "200 GW"
    }
  },
  {
    lat: 39.9042,
    lng: 116.4074,
    text: "China",
    color: "#3357FF",
    size: 2,
    altitude: 0.1,
    label: "Beijing",
    energyData: {
      renewablePercentage: 30,
      totalEnergyProduction: "2,200 GW",
      mainEnergySource: "Coal",
      energyConsumption: "1,800 GW"
    }
  },
  {
    lat: 28.6139,
    lng: 77.2090,
    text: "India",
    color: "#3357FF",
    size: 2,
    altitude: 0.1,
    label: "New Delhi",
    energyData: {
      renewablePercentage: 25,
      totalEnergyProduction: "400 GW",
      mainEnergySource: "Coal",
      energyConsumption: "350 GW"
    }
  },
  {
    lat: 1.3521,
    lng: 103.8198,
    text: "Singapore",
    color: "#3357FF",
    size: 2,
    altitude: 0.1,
    label: "Singapore",
    energyData: {
      renewablePercentage: 3,
      totalEnergyProduction: "12 GW",
      mainEnergySource: "Natural Gas",
      energyConsumption: "10 GW"
    }
  },
  {
    lat: 13.7563,
    lng: 100.5018,
    text: "Thailand",
    color: "#3357FF",
    size: 2,
    altitude: 0.1,
    label: "Bangkok",
    energyData: {
      renewablePercentage: 15,
      totalEnergyProduction: "45 GW",
      mainEnergySource: "Natural Gas",
      energyConsumption: "40 GW"
    }
  },
  {
    lat: 37.5665,
    lng: 126.9780,
    text: "South Korea",
    color: "#3357FF",
    size: 2,
    altitude: 0.1,
    label: "Seoul",
    energyData: {
      renewablePercentage: 7,
      totalEnergyProduction: "130 GW",
      mainEnergySource: "Nuclear",
      energyConsumption: "110 GW"
    }
  },
  {
    lat: 21.0285,
    lng: 105.8542,
    text: "Vietnam",
    color: "#3357FF",
    size: 2,
    altitude: 0.1,
    label: "Hanoi",
    energyData: {
      renewablePercentage: 12,
      totalEnergyProduction: "60 GW",
      mainEnergySource: "Coal",
      energyConsumption: "50 GW"
    }
  },
  {
    lat: 14.5995,
    lng: 120.9842,
    text: "Philippines",
    color: "#3357FF",
    size: 2,
    altitude: 0.1,
    label: "Manila",
    energyData: {
      renewablePercentage: 22,
      totalEnergyProduction: "25 GW",
      mainEnergySource: "Coal",
      energyConsumption: "20 GW"
    }
  },
  {
    lat: 3.1390,
    lng: 101.6869,
    text: "Malaysia",
    color: "#3357FF",
    size: 2,
    altitude: 0.1,
    label: "Kuala Lumpur",
    energyData: {
      renewablePercentage: 18,
      totalEnergyProduction: "35 GW",
      mainEnergySource: "Natural Gas",
      energyConsumption: "30 GW"
    }
  },
  {
    lat: -6.2088,
    lng: 106.8456,
    text: "Indonesia",
    color: "#3357FF",
    size: 2,
    altitude: 0.1,
    label: "Jakarta",
    energyData: {
      renewablePercentage: 15,
      totalEnergyProduction: "70 GW",
      mainEnergySource: "Coal",
      energyConsumption: "60 GW"
    }
  }
]; 