'use client'
import Image from 'next/image';
import Media from '@/components/Media';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function MediaPage() {
  return (
    <main className="relative min-h-screen w-full bg-[#062516]">
      <Navbar />
      <section className="relative h-[40vh] w-full flex items-center justify-center overflow-hidden">
        <Image
          src="/assets/banners/Media.jpg"
          alt="Media Banner"
          fill
          className="object-cover"
          priority
        />
        {/* <div className="absolute inset-0 bg-gradient-to-br from-[#085D36]/25 to-[#04301C]/25"></div> */}
      </section>
      {/* <div className='pt-20'>
        
      </div> */}
      <Media />
      <Footer />
    </main>
  )
}
