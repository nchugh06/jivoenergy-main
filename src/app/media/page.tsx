'use client'
import Image from 'next/image';
import Media from '@/components/Media';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function MediaPage() {
  return (
    <main className="relative min-h-screen w-full bg-[#062516]">
      <Navbar />
      <section className="relative h-[60vh] w-full flex items-center justify-center overflow-hidden">
        <Image
          src="/assets/media-banner.jpg"
          alt="Media Banner"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#085D36]/50 to-[#04301C]/50"></div>
        <div className="relative z-10 container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            Media
          </h1>
          {/* <p className="text-xl text-white/90 max-w-2xl mx-auto">
                               Creating lasting value through environmental stewardship, social responsibility, and strong governance.
                             </p> */}
        </div>
      </section>
      <div className='pt-20'>
        <Media />
      </div>
      <Footer />
    </main>
  )
}
