'use client';
import Image from 'next/image';

const Clients = () => {
    const clientsList = [
        'client1.png', 'client2.jpg', 'client3.png', 'client4.png', 'client5.png',
        'client6.png', 'client7.jpg', 'client8.png', 'client9.jpg', 'client10.png',
        'client11.png', 'client12.png', 'client13.png'
    ];

    const renderSection = (title: string, images: string[]) => (
        <section className="bg-[#fefefe] py-16">
            <div className="mb-2">
                <h2 className="text-3xl font-bold text-[#062516] text-center mb-10 border-b pb-4 mx-auto max-w-2xl">
                    {title}
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 justify-items-center items-center">
                    {images.map((img, index) => (
                        <div
                            key={index}
                            className="w-[170px] h-[170px] relative p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100 flex items-center justify-center"
                        >
                            <Image
                                src={`/partners/${img}`}
                                alt={`${title} Partner ${index + 1}`}
                                fill
                                className="object-contain p-2"
                                quality={100}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );

    return (
        // <div className="clients">
        //   {clientsList.map((client, index) => (
        //     <Image key={index} src={`/images/${client}`} alt={`Client ${index + 1}`} width={200} height={100} />
        //   ))}
        // </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {renderSection('Clients', clientsList)}
        </div>

    );
}

export default Clients;