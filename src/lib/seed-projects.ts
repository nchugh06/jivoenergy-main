import { Project } from "@/types/project";
import { addProject } from "./projects";

export const initialProjects: Omit<Project, 'id'>[] = [
    {
        title: "Solar PV + BESS Hybrid Systems for Health Facilities",
        country: "Liberia",
        region: "West Africa",
        location: "Liberia (39 health facilities)",
        status: "Completed",
        capacity: "2 kWp to 18 kWp per site",
        technology: "Rooftop Solar PV + BESS",
        description: "JIVO Energy has successfully delivered Solar PV and Battery Energy Storage hybrid systems across 39 health facilities in Liberia, supporting the country’s transition to clean and reliable energy. Financed by the World Bank and implemented by the Rural and Renewable Energy Agency, the project was executed over an 18-month installation period and includes two years of Operations & Maintenance support. The systems now provide self-sufficient, eco-friendly electricity to healthcare facilities that were previously operating off-grid and dependent on diesel generators, significantly improving energy reliability in remote locations.",
        beneficiary: "Rural and Renewable Energy Agency",
        financing: "World Bank"
    },
    {
        title: "Santo Amaro Solar Power Plant",
        country: "São Tomé and Príncipe",
        region: "West Africa",
        location: "Santo Amaro",
        status: "Completed",
        capacity: "1.2 MWp",
        technology: "Ground-Mounted, Grid-Connected Solar PV",
        description: "JIVO Energy has successfully executed the Engineering, Procurement, and Construction (EPC) of the 1.2 MWp Santo Amaro Solar Power Plant in São Tomé and Príncipe. Financed by the African Development Bank (AfDB) and implemented under the Energy Transition and Institutional Support Programme (ETISP) on behalf of the Ministry of Natural Resources, Energy and Environment (MNREE), the project marks a significant milestone in strengthening the island’s power infrastructure. By adding 1.2 MWp of clean, grid-connected solar capacity, the plant reduces dependence on diesel generation, helps address peak load constraints, and contributes to improved grid stability and energy sustainability in São Tomé.",
        beneficiary: "Ministry of Natural Resources, Energy and Environment",
        financing: "African Development Bank (AfDB)"
    },
    {
        title: "Solarization of Water Pumping Systems",
        country: "Senegal",
        region: "West Africa",
        location: "Podor & Matam Regions",
        status: "Completed",
        capacity: "650 kW Total",
        technology: "Ground-Mounted Solar PV",
        description: "JIVO Energy has successfully solarized five irrigation water pumping systems across North Senegal, supporting climate-smart agriculture in the Senegal River Valley. Financed by the Qatar Government Fund for Development (QFFD) and procured by the Global Green Growth Institute (GGGI), the project enables sustainable irrigation for rice farms managed by SAED in the Podor and Matam regions. With a total installed capacity of 650 kW, the solar PV systems provide continuous and eco-friendly water access for farmers, reducing reliance on conventional energy sources and strengthening agricultural resilience in line with Senegal’s clean energy goals.",
        beneficiary: "SAED / GGGI",
        financing: "Qatar Government Fund for Development"
    },
    {
        title: "Moyamba Solar PV + BESS Hybrid Mini-grid",
        country: "Sierra Leone",
        region: "West Africa",
        location: "Moyamba Town",
        status: "Completed",
        capacity: "954.8 kWp Solar / 2 MWh Storage",
        technology: "Hybrid (PV + BESS + Diesel)",
        description: "JIVO Energy has successfully delivered Sierra Leone’s first hybrid off-grid energy system in Moyamba Town, providing a fully integrated and independent power solution. Financed by the World Bank and implemented by UNOPS, the project combines a 954.8 kWp solar PV plant, a 2,032.128 kWh battery energy storage system, and a 500 kVA diesel generator. The system ensures reliable and continuous electricity supply to the local community, significantly improving energy access while supporting social and economic development and advancing Sierra Leone’s transition toward sustainable and resilient energy infrastructure.",
        financing: "World Bank / UNOPS"
    },
    {
        title: "Rooftop Solar PV & Energy Efficiency Project",
        country: "Cape Verde",
        region: "West Africa",
        location: "Multiple Islands (32 health centres)",
        status: "Under Development",
        capacity: "560.8 kW Total",
        technology: "Rooftop Solar PV (Grid-connected)",
        description: "JIVO Energy is executing a multi-site rooftop solar PV and energy efficiency project across 32 government health centres in Cape Verde, supporting the Ministry of Health’s transition to clean, reliable, and efficient energy solutions. Financed by the World Bank, the project involves the installation of grid-connected rooftop solar PV systems for self-consumption, along with energy efficiency upgrades including high-efficiency LED lighting and energy-efficient air-conditioning systems. Currently in the final execution and commissioning stage, the project will help reduce grid dependency, enhance energy reliability for critical healthcare infrastructure, lower energy consumption, and contribute to long-term sustainability once fully energized.",
        beneficiary: "Ministry of Health",
        financing: "World Bank"
    },
    {
        title: "Turnkey Construction of PV Solar Power Plant",
        country: "Burkina Faso",
        region: "West Africa",
        location: "Ziga (Relocated from Diapaga)",
        status: "Planned",
        capacity: "2 MWp",
        technology: "Ground-Mounted, Grid-Connected Solar PV",
        description: "JIVO Energy has been engaged in the 2MW Diapaga Solar PV project since 2022 but security chalenges in the region have kept the project on hold. Finally discussions are ongoing to relocate the project to a safer zone, with preliminary studies pointing to Ziga as the opted location, involving ground-mounted solar panels, associated substation infrastructure, and connection to the national grid managed by SONABEL. The project is part of the Yeleen Solar Program, supported by the African Development Bank (AfDB), the Agence Française de Développement (AFD), and the European Union.",
        financing: "AfDB / AFD / EU"
    }
];

// Helper function to be called from UI
export const seedDatabase = async () => {
    console.log("Seeding database...");
    for (const project of initialProjects) {
        await addProject(project);
    }
    console.log("Seeding complete.");
};
