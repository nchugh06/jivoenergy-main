export default function CoreValues() {
  return (
    <section className="py-16 px-6 md:px-12 bg-white">
      <div className="max-w-7xl mx-auto">
        <h3 className="section-title-spl text-center text-[#062516] mb-10">Our Core Values</h3>
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          <div className="rounded-3xl border border-slate-200 bg-[#85c54a] p-8 shadow-sm hover:shadow-lg transition-shadow duration-300">
            {/* <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[#085D36]/10 text-[#085D36]">
              <span className="text-xl font-semibold">Q</span>
            </div> */}
            <h3 className="text-xl font-semibold text-[#062516] mb-3">Quality</h3>
            <p className="text-gray-600 leading-relaxed" style={{ textAlign: "left" }}>
              We use only Tier 1 materials and maintain uncompromising standards across every project to ensure long-lasting performance, reliability, and safety.
            </p>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-[#1c4832] p-8 shadow-sm hover:shadow-lg transition-shadow duration-300">
            {/* <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[#085D36]/10 text-[#085D36]">
              <span className="text-xl font-semibold">C</span>
            </div> */}
            <h3 className="text-xl font-semibold text-[#ffffff] mb-3">Commitment</h3>
            <p className="text-white leading-relaxed" style={{ textAlign: "left" }}>
              From initial planning to final execution, we are committed to delivering every project on time with precision, reliability, and seamless coordination, ensuring a smooth experience at every step.
            </p>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-[#85c54a] p-8 shadow-sm hover:shadow-lg transition-shadow duration-300">
            {/* <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[#085D36]/10 text-[#085D36]">
              <span className="text-xl font-semibold">R</span>
            </div> */}
            <h3 className="text-xl font-semibold text-[#062516] mb-3">Relationships</h3>
            <p className="text-gray-600 leading-relaxed" style={{ textAlign: "left" }}>
              We believe strong partnerships are built on transparency, trust, and consistent communication, creating lasting relationships with our clients and stakeholders.
            </p>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-[#1c4832] p-8 shadow-sm hover:shadow-lg transition-shadow duration-300">
            {/* <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[#085D36]/10 text-[#ffffff]">
              <span className="text-xl font-semibold">E</span>
            </div> */}
            <h3 className="text-xl font-semibold text-[#ffffff] mb-3">Efficiency</h3>
            <p className="text-white leading-relaxed" style={{ textAlign: "left" }}>
              Our streamlined processes and innovative approach help us deliver optimized energy solutions with maximum efficiency, cost-effectiveness, and impact.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
