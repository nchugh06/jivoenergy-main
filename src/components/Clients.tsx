'use client';
import Image from 'next/image';
import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Clients = () => {
    const clientsList = [
        'client1.png', 'client2.jpg', 'client3.png', 'client4.png', 'client5.png',
        'client6.png', 'client7.jpg', 'client8.png', 'client9.jpg', 'client10.png',
        'client11.png', 'client12.png', 'client13.png'
    ];

    const [currentIndex, setCurrentIndex] = useState(0);
    const itemsPerView = {
        mobile: 1,
        tablet: 3,
        desktop: 6
    };

    const getItemsToShow = () => {
        if (typeof window === 'undefined') return itemsPerView.desktop;
        if (window.innerWidth < 768) return itemsPerView.mobile;
        if (window.innerWidth < 1024) return itemsPerView.tablet;
        return itemsPerView.desktop;
    };

    const [itemsToShow, setItemsToShow] = useState(itemsPerView.desktop);

    // Handle window resize
    if (typeof window !== 'undefined') {
        window.addEventListener('resize', () => {
            setItemsToShow(getItemsToShow());
        });
    }

    const maxIndex = Math.max(0, clientsList.length - itemsToShow);

    const handleNext = () => {
        setCurrentIndex(prev => (prev >= maxIndex ? 0 : prev + 1));
    };

    const handlePrev = () => {
        setCurrentIndex(prev => (prev <= 0 ? maxIndex : prev - 1));
    };

    const visibleItems = clientsList.slice(currentIndex, currentIndex + itemsToShow);

    return (
        <section className="bg-[#fefefe] py-16 w-full">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-3xl font-bold text-[#062516] text-center mb-12 border-b pb-4">
                    Clients
                </h2>

                <div className="relative">
                    {/* Carousel Container */}
                    <div className="flex items-center justify-center gap-4 md:gap-6">
                        {/* Previous Button */}
                        <button
                            onClick={handlePrev}
                            className="flex-shrink-0 p-2 rounded-full bg-[#085D36] hover:bg-[#062516] text-white transition-colors duration-300 z-10"
                            aria-label="Previous slide"
                        >
                            <ChevronLeft size={24} />
                        </button>

                        {/* Carousel Items */}
                        <div className="flex-1 overflow-hidden">
                            <div className="flex gap-4 md:gap-6 justify-center">
                                {visibleItems.map((img, index) => (
                                    <div
                                        key={currentIndex + index}
                                        className="flex-shrink-0 w-32 h-32 md:w-40 md:h-40 relative p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100 flex items-center justify-center"
                                    >
                                        <Image
                                            src={`/partners/${img}`}
                                            alt={`Client ${currentIndex + index + 1}`}
                                            fill
                                            className="object-contain p-2"
                                            quality={100}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Next Button */}
                        <button
                            onClick={handleNext}
                            className="flex-shrink-0 p-2 rounded-full bg-[#085D36] hover:bg-[#062516] text-white transition-colors duration-300 z-10"
                            aria-label="Next slide"
                        >
                            <ChevronRight size={24} />
                        </button>
                    </div>

                    {/* Dot Indicators */}
                    <div className="flex justify-center gap-2 mt-8">
                        {Array.from({ length: maxIndex + 1 }).map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentIndex(index)}
                                className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                                    currentIndex === index
                                        ? 'bg-[#085D36]'
                                        : 'bg-gray-300 hover:bg-gray-400'
                                }`}
                                aria-label={`Go to slide ${index + 1}`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Clients;