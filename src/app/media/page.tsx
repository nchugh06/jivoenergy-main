'use client'
import Media from '@/components/Media';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function MediaPage() {
  return (
    <main className="relative min-h-screen w-full bg-[#062516]">
       <Navbar /> 
       <div className='pt-20'>
         <Media />
       </div>
       <Footer />
    </main>
  )
}
