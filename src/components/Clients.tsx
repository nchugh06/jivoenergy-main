'use client';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Clients = () => {
    const clientsList = [
        'client1.jpg', 'client2.jpg', 'client3.jpg', 'client4.jpg', 'client5.jpg',
        'client6.jpg', 'client7.jpg', 'client8.jpg', 'client9.jpg', 'client10.jpg',
        'client11.jpg', 'client12.jpg', 'client13.jpg'
    ];

    const [currentIndex, setCurrentIndex] = useState(0);
    const [itemsToShow, setItemsToShow] = useState(6); // Default to desktop for server render
    const [isHydrated, setIsHydrated] = useState(false);

    const itemsPerView = {
        mobile: 1,
        tablet: 5,
        desktop: 7
    };

    const getItemsToShow = () => {
        if (typeof window === 'undefined') return itemsPerView.desktop;
        if (window.innerWidth < 768) return itemsPerView.mobile;
        if (window.innerWidth < 1024) return itemsPerView.tablet;
        return itemsPerView.desktop;
    };

    // Set correct items on mount and handle resize
    useEffect(() => {
        // Update on mount to match actual window size
        setItemsToShow(getItemsToShow());
        setIsHydrated(true);

        const handleResize = () => {
            setItemsToShow(getItemsToShow());
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

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
                <h2 className="section-title text-center text-[#062516]">
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
                                        className="flex-shrink-0 w-24 h-24 md:w-32 md:h-32 relative p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100 flex items-center justify-center"
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