import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';

interface Testimonial {
  id: number;
  name: string;
  location: string;
  image: string;
  text: string;
  rating: number;
}

const TESTIMONIALS: Testimonial[] = [
  {
    id: 1,
    name: "Priya Sharma",
    location: "Mumbai",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200&h=200",
    text: "The quality of the Banarasi saree I ordered exceeded my expectations. The zari work is exquisite and the fabric feels so premium. Truly a piece of Surat's heritage!",
    rating: 5
  },
  {
    id: 2,
    name: "Anjali Gupta",
    location: "Delhi",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200&h=200",
    text: "RoziRoti has become my go-to for ethnic wear. Their customer service is fantastic, and the delivery was surprisingly fast. I wore their suit to a wedding and got so many compliments!",
    rating: 5
  },
  {
    id: 3,
    name: "Sneha Reddy",
    location: "Hyderabad",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=200&h=200",
    text: "I was skeptical about buying sarees online, but RoziRoti changed that. The color was exactly as shown in the photos, and the packaging was beautiful. Highly recommended!",
    rating: 4
  },
  {
    id: 4,
    name: "Meera Patel",
    location: "Surat",
    image: "https://images.unsplash.com/photo-1607746882042-944635dfe10e?auto=format&fit=crop&q=80&w=200&h=200",
    text: "Even as someone from Surat, I find RoziRoti's collection very unique. They have a great eye for detail and the prices are very competitive for the quality they offer.",
    rating: 5
  }
];

export const Testimonials: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const slideNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  const slidePrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  useEffect(() => {
    const timer = setInterval(slideNext, 8000);
    return () => clearInterval(timer);
  }, []);

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 500 : -500,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 500 : -500,
      opacity: 0
    })
  };

  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="text-center mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="flex items-center justify-center space-x-2 text-brand-gold mb-4"
          >
            <Star size={16} fill="currentColor" />
            <span className="text-xs font-bold uppercase tracking-[0.3em]">Our Happy Circle</span>
            <Star size={16} fill="currentColor" />
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-serif text-brand-maroon mb-4">Customer Stories</h2>
          <p className="text-brand-dark/60 max-w-2xl mx-auto">Hear from the women who have embraced the elegance of RoziRoti.</p>
        </div>

        <div className="relative h-[400px] md:h-[350px] flex items-center justify-center">
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 }
              }}
              className="absolute w-full max-w-4xl"
            >
              <div className="bg-brand-beige/20 rounded-[40px] p-8 md:p-12 flex flex-col md:flex-row items-center gap-8 md:gap-12 border border-brand-gold/10">
                <div className="relative flex-shrink-0">
                  <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-4 border-white shadow-xl">
                    <img 
                      src={TESTIMONIALS[currentIndex].image} 
                      alt={TESTIMONIALS[currentIndex].name}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="absolute -bottom-2 -right-2 bg-brand-gold text-white p-2 rounded-full shadow-lg">
                    <Quote size={16} fill="currentColor" />
                  </div>
                </div>

                <div className="flex-1 text-center md:text-left">
                  <div className="flex items-center justify-center md:justify-start space-x-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        size={16} 
                        className={i < TESTIMONIALS[currentIndex].rating ? "text-brand-gold fill-brand-gold" : "text-brand-gold/20"} 
                      />
                    ))}
                  </div>
                  <p className="text-lg md:text-xl font-serif text-brand-dark italic mb-6 leading-relaxed">
                    "{TESTIMONIALS[currentIndex].text}"
                  </p>
                  <div>
                    <h4 className="text-brand-maroon font-bold text-lg">{TESTIMONIALS[currentIndex].name}</h4>
                    <p className="text-brand-dark/40 text-xs uppercase tracking-widest">{TESTIMONIALS[currentIndex].location}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Controls */}
          <div className="absolute bottom-0 md:bottom-auto md:left-0 md:right-0 flex justify-center md:justify-between items-center w-full px-4 md:px-0 pointer-events-none">
            <button 
              onClick={slidePrev}
              className="p-4 rounded-full bg-white shadow-lg text-brand-maroon hover:bg-brand-maroon hover:text-white transition-all pointer-events-auto mr-4 md:mr-0"
            >
              <ChevronLeft size={24} />
            </button>
            <button 
              onClick={slideNext}
              className="p-4 rounded-full bg-white shadow-lg text-brand-maroon hover:bg-brand-maroon hover:text-white transition-all pointer-events-auto"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>

        {/* Dots */}
        <div className="flex justify-center space-x-2 mt-12">
          {TESTIMONIALS.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setDirection(index > currentIndex ? 1 : -1);
                setCurrentIndex(index);
              }}
              className={`h-1.5 transition-all rounded-full ${index === currentIndex ? "w-8 bg-brand-maroon" : "w-2 bg-brand-maroon/20"}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
