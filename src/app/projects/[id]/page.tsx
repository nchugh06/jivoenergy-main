import type { Metadata } from 'next';
import { slugFromPath } from '@/lib/seo';
import { getPageMetadata } from '@/lib/seoMetadata';
import ProjectDetailPageClient from './ProjectDetailPageClient';

const PROJECT_SEO: Record<string, { title: string; description: string }> = {
  'uganda-kabulasoke-solar-plant': {
    title: '23 MWp Kabulasoke Solar Plant, Uganda | JIVO Energy',
    description:
      "Discover JIVO Energy's 23 MWp Kabulasoke Solar Plant in Uganda, delivering renewable solar power and supporting clean energy generation and energy access.",
  },
  'uganda-nkonge-solar-plant': {
    title: '23 MWp Nkonge Solar Plant, Uganda | JIVO Energy',
    description:
      "Explore JIVO Energy's 23 MWp Nkonge Solar Plant in Uganda, supporting renewable electricity generation, sustainable power and improved energy access.",
  },
  'ethiopia-7-mini-grids': {
    title: '2 MWp + 8 MWh 7 Mini-Grids, Ethiopia | JIVO Energy',
    description:
      "Explore JIVO Energy's 2 MWp solar and 8 MWh storage across seven mini-grids in Ethiopia, supporting reliable renewable power and energy access.",
  },
  'kenya-kakuma-refugee-camp-hybrid-project': {
    title: '350 kWp/1.2 MWh Kakuma Hybrid Project, Kenya',
    description:
      "Discover JIVO Energy's 350 kWp solar PV and 1.2 MWh storage hybrid project in Kakuma, Kenya, supporting reliable and sustainable energy access.",
  },
  'kenya-chepkumia-county-solar-plant': {
    title: '260 kWp Chepkumia Solar Plant, Kenya | JIVO Energy',
    description:
      "Explore JIVO Energy's 260 kWp Chepkumia County Solar Plant in Kenya, providing renewable solar power and supporting sustainable energy infrastructure.",
  },
  'kenya-kakuma-biashara-hybrid-project': {
    title: '60 kWp/250 kWh Kakuma Biashara BESS, Kenya',
    description:
      "Discover JIVO Energy's 60 kWp solar PV system with 250 kWh BESS in Kakuma Biashara, Kenya, delivering reliable renewable energy and storage.",
  },
  'kenya-embu-county-solar-plant': {
    title: '20 kWp Rooftop Solar Plant, Embu County | JIVO',
    description:
      "Explore JIVO Energy's 20 kWp rooftop solar project in Embu County, Kenya, generating clean renewable power and supporting sustainable energy use.",
  },
  'machakos-county': {
    title: '240 kWp Machakos Solar Energy Project, Kenya',
    description:
      "Discover JIVO Energy's 240 kWp Machakos County solar energy project in Kenya, supporting clean electricity generation and reliable renewable power.",
  },
  'liberia-39-health-facilities': {
    title: '200 kWp + 1 MWh Solar PV & BESS, Liberia',
    description:
      "Explore JIVO Energy's 200 kWp Solar PV and 1 MWh BESS project supporting 39 health facilities in Liberia with reliable clean energy.",
  },
  'sao-tome-and-principe-santo-amaro-solar-plant': {
    title: '1.2 MWp Santo Amaro Solar Plant, São Tomé',
    description:
      "Discover JIVO Energy's 1.2 MWp Santo Amaro Solar Plant in São Tomé and Príncipe, supporting clean electricity generation and renewable energy access.",
  },
  'sierra-leone-hybrid-project': {
    title: '954.8 kWp Sierra Leone Hybrid Energy Project',
    description:
      "Explore JIVO Energy's 954.8 kWp hybrid energy project in Sierra Leone, supporting reliable renewable power and sustainable electricity access.",
  },
  'senegal-solar-project': {
    title: '650 kWp Solar Energy Project in Senegal | JIVO',
    description:
      "Discover JIVO Energy's 650 kWp solar energy project in Senegal, supporting renewable electricity generation and sustainable energy development.",
  },
  'cape-verde-32-public-health-centres': {
    title: '560.8 kWp Solar Project, Cape Verde | JIVO Energy',
    description:
      "Explore JIVO Energy's 560.8 kWp renewable energy project supporting 32 public health centres in Cape Verde with reliable clean electricity.",
  },
  'burkina-faso-solar-plant': {
    title: '2 MWp Burkina Faso Solar Plant | JIVO Energy',
    description:
      "Discover JIVO Energy's 2 MWp solar plant in Burkina Faso, supporting renewable electricity generation, clean power and sustainable energy infrastructure.",
  },
  'malawi-lilongwe-bess-project': {
    title: '20 MW/40 MWh Lilongwe BESS Project, Malawi',
    description:
      "Explore JIVO Energy's 20 MW/40 MWh Lilongwe BESS project in Malawi, supporting grid stability, renewable integration and reliable electricity supply.",
  },
  'zimbabwe-solar-plant': {
    title: '3.5 MWp Zimbabwe Solar Plant | JIVO Energy',
    description:
      "Discover JIVO Energy's 3.5 MWp solar plant in Zimbabwe, supporting clean electricity generation and the country's transition to renewable energy.",
  },
  'malawi-mzuzu-hybrid-project': {
    title: '2 MWp + 5 MWh Mzuzu Hybrid Project, Malawi',
    description:
      "Explore JIVO Energy's 2 MWp solar PV and 5 MWh storage Mzuzu Hybrid Energy Project in Malawi, delivering reliable and sustainable renewable power.",
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const path = `/projects/${id}`;
  return getPageMetadata(slugFromPath(path), path, PROJECT_SEO[id]);
}

export default function ProjectDetailPage() {
  return <ProjectDetailPageClient />;
}
