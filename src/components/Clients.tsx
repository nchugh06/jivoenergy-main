'use client';
import Image from 'next/image';

const Clients = () => {
  const clientsList = [
    'client1.jpg', 'client2.jpg', 'client3.jpg', 'client4.jpg', 'client5.jpg',
    'client6.jpg', 'client7.jpg', 'client8.jpg', 'client9.jpg', 'client10.jpg',
    'client11.jpg', 'client12.jpg', 'client13.jpg',
  ];

  return (
    <section className="bg-[#fefefe] py-16 w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="section-title text-center text-[#062516]">Clients</h2>

        <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-7 gap-4 md:gap-6 justify-items-center">
          {clientsList.map((img, index) => (
            <div
              key={img}
              className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 relative p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100 flex items-center justify-center"
            >
              <Image
                src={`/partners/${img}`}
                alt={`Client ${index + 1}`}
                fill
                className="object-contain p-2"
                quality={100}
                sizes="(max-width: 640px) 25vw, (max-width: 768px) 20vw, (max-width: 1024px) 16vw, 180px"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Clients;

