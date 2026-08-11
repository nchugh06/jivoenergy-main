import Image from "next/image";

export default function AboutHero() {
  return (
    <section className="relative h-[40vh] w-full flex items-center justify-center overflow-hidden">
      <Image
        src="/assets/banners/AboutUs.jpg"
        alt="About Banner"
        fill
        className="object-cover"
        priority
        sizes="60vw"
      />
      {/* <div className="absolute inset-0 bg-gradient-to-br from-[#085D36]/25 to-[#04301C]/5"></div>
      <div className="relative z-10 container mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
          About Us
        </h1>
        <p className="text-xl text-white/90 max-w-2xl mx-auto">
          Creating lasting value through environmental stewardship, social responsibility, and strong governance.
        </p>
      </div> */}
    </section>
  );
}
