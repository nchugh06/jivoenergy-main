'use client';

import ScrollReveal from '@/components/ScrollReveal';

const coreValues = [
  {
    title: 'Quality',
    description:
      'We use only Tier 1 materials and maintain uncompromising standards across every project to ensure long-lasting performance, reliability, and safety.',
    bg: 'bg-[#85c54a]',
    titleClass: 'text-[#062516]',
    textClass: 'text-gray-600',
  },
  {
    title: 'Commitment',
    description:
      'From initial planning to final execution, we are committed to delivering every project on time with precision, reliability, and seamless coordination, ensuring a smooth experience at every step.',
    bg: 'bg-[#1c4832]',
    titleClass: 'text-[#ffffff]',
    textClass: 'text-white',
  },
  {
    title: 'Relationships',
    description:
      'We believe strong partnerships are built on transparency, trust, and consistent communication, creating lasting relationships with our clients and stakeholders.',
    bg: 'bg-[#85c54a]',
    titleClass: 'text-[#062516]',
    textClass: 'text-gray-600',
  },
  {
    title: 'Efficiency',
    description:
      'Our streamlined processes and innovative approach help us deliver optimized energy solutions with maximum efficiency, cost-effectiveness, and impact.',
    bg: 'bg-[#1c4832]',
    titleClass: 'text-[#ffffff]',
    textClass: 'text-white',
  },
];

export default function CoreValues() {
  return (
    <section className="py-16 px-6 md:px-12 bg-white">
      <div className="max-w-7xl mx-auto">
        <h3 className="section-title-spl text-center text-[#062516] mb-10">Our Core Values</h3>
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {coreValues.map((value, index) => (
            <ScrollReveal
              key={value.title}
              className={`rounded-3xl border border-slate-200 ${value.bg} p-6 sm:p-8 shadow-sm hover:shadow-lg`}
              delay={(index + 1) * 0.15}
              from="right"
              distance={90}
            >
              {/* <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[#085D36]/10 text-[#085D36]">
                <span className="text-xl font-semibold">{value.title[0]}</span>
              </div> */}
              <h3 className={`text-xl font-semibold ${value.titleClass} mb-3`}>{value.title}</h3>
              <p className={`${value.textClass} leading-relaxed`} style={{ textAlign: 'left' }}>
                {value.description}
              </p>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
