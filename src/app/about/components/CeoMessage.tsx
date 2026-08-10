export default function CeoMessage() {
  return (
    <section className="py-10 md:py-12 bg-[#F5FBF5]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] items-stretch bg-white rounded-[32px] shadow-xl overflow-hidden">
          <div className="relative w-full overflow-hidden rounded-[32px] bg-slate-200">
            <img
              src="/about/Rajesh_Chugh_CEO.png"
              alt="Company leader or executive portrait"
              className="h-full w-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-black/10 via-transparent to-black/10" />
          </div>
          <div className="p-8 sm:p-10 lg:p-12 flex flex-col justify-between h-full">
            <div>
              <div className="inline-flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.18em] text-[#085D36] mb-4">
                <span className="h-0.5 w-10 bg-[#085D36] inline-block" />
                CEO's Message
              </div>
              <div className="space-y-4">
                {/* <p className="font-semibold text-[#062516] leading-snug">
                  At JIVO Energy, we believe that access to reliable and sustainable energy is the foundation of economic growth and social progress.
                </p> */}
                <p className="text-gray-700 max-w-2xl leading-7 italic">
                  "At JIVO Energy, we believe that access to reliable and sustainable energy is the foundation of economic growth and social progress. Our commitment is to accelerate Africa's energy transition by delivering innovative, high-quality renewable energy solutions that create lasting value for our partners, communities, and future generations. Together, we are building a cleaner, more sustainable future for Africa."
                </p>
                <div className="border-l-4 border-[#085D36] pl-6">
                  <p className="mt-5 text-sm text-gray-700 tracking-[0.14em] font-semibold">
                    <b>Rajesh Chugh</b><br></br>
                    Chief Executive Officer, JIVO Energy
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
