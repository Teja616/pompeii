import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Star, Plus, MapPin, Phone, Mail, Clock, Users, Flame } from 'lucide-react';

const PompeiiPizzaStudio = () => {
  const [currentVideo, setCurrentVideo] = useState(0);
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [visibleSections, setVisibleSections] = useState(new Set());

  const observerRef = useRef();

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);

    // Intersection Observer for animations
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections(prev => new Set([...prev, entry.target.id]));
          }
        });
      },
      { threshold: 0.1 }
    );

    // Observe all sections
    const sections = document.querySelectorAll('[data-animate]');
    sections.forEach(section => observerRef.current.observe(section));

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  const videos = [
    {
      src: process.env.PUBLIC_URL + '/pizza1.mp4',
      alt: 'Artisan pizza dough being stretched',
      type: 'video'
    },
    {
      src: process.env.PUBLIC_URL + '/mozzarella.mp4',
      alt: 'Mozzarella melting in wood-fired oven',
      type: 'video'
    },
    {
      src: process.env.PUBLIC_URL + '/oven.mp4',
      alt: 'Flames dancing in wood-fired oven',
      type: 'video'
    },
    {
      src: 'image.png',
      alt: 'Cozy studio atmosphere',
      type: 'image'
    }
  ];

  const ingredients = [
    { name: 'San Marzano Tomatoes', price: '$3', image: '🍅' },
    { name: 'Buffalo Mozzarella', price: '$4', image: '🧀' },
    { name: 'Prosciutto di Parma', price: '$6', image: '🥓' },
    { name: 'Fresh Basil', price: '$2', image: '🌿' },
    { name: 'Truffle Oil', price: '$8', image: '🫒' },
    { name: 'Arugula', price: '$2', image: '🥬' }
  ];

  const testimonials = [
    { name: 'Sofia Rossi', rating: 5, text: 'An extraordinary culinary journey. The acoustic ambiance perfectly complements the artisanal flavors.' },
    { name: 'Marco Chen', rating: 5, text: 'Pompeii Pizza Studio redefined my pizza experience. Every bite tells a story of ancient traditions.' },
    { name: 'Elena Volkov', rating: 5, text: 'The sensory experience is unparalleled. From the crackling wood fire to the aromatic herbs.' },
    { name: 'James Mitchell', rating: 5, text: 'A perfect blend of ancient craftsmanship and modern culinary artistry. Absolutely phenomenal.' }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentVideo((prev) => (prev + 1) % videos.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  const toggleIngredient = (ingredient) => {
    setSelectedIngredients(prev => 
      prev.includes(ingredient) 
        ? prev.filter(i => i !== ingredient)
        : [...prev, ingredient]
    );
  };

  const getAnimationClass = (sectionId, animationType = 'slideUp') => {
    const isVisible = visibleSections.has(sectionId);
    if (!isVisible) return 'opacity-0 transform translate-y-12';
    return 'opacity-100 transform translate-y-0';
  };

  // Inline styles for complex animations
  const pulseKeyframes = `
    @keyframes pulse-glow {
      0%, 100% { box-shadow: 0 0 20px rgba(251, 191, 36, 0.3); }
      50% { box-shadow: 0 0 30px rgba(251, 191, 36, 0.6); }
    }
  `;

  const lavaFlowKeyframes = `
    @keyframes lava-flow {
      0% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
      100% { background-position: 0% 50%; }
    }
  `;

  return (
    <div className="bg-stone-900 text-stone-100 overflow-x-hidden">
      <style>{pulseKeyframes}{lavaFlowKeyframes}</style>

      {/* Floating Navigation */}
      <nav className="fixed top-6 left-1/2 z-50" style={{ transform: 'translateX(-50%)' }}>
        <div className="backdrop-blur-md bg-stone-900/30 rounded-full px-8 py-4 border border-stone-700/50">
          <div className="flex items-center space-x-8">
            <div className="text-xl font-serif text-amber-200">Pompeii</div>
            <div className="hidden md:flex space-x-6">
              {['Menu', 'Experience', 'Story', 'Contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className="text-stone-300 hover:text-amber-200 transition-all duration-300 hover:scale-105 relative"
                  onMouseEnter={(e) => {
                    e.target.style.transform = 'scale(1.05)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = 'scale(1)';
                  }}
                >
                  {item}
                </button>
              ))}
            </div>
            <button 
              className="md:hidden transition-transform duration-300"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              style={{ transform: isMenuOpen ? 'rotate(90deg)' : 'rotate(0deg)' }}
            >
              <div className="w-6 h-0.5 bg-stone-300 mb-1 transition-all duration-300"></div>
              <div className="w-6 h-0.5 bg-stone-300 mb-1 transition-all duration-300"></div>
              <div className="w-6 h-0.5 bg-stone-300 transition-all duration-300"></div>
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section with Video Carousel */}
      <section className="relative h-screen overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-stone-900/20 via-transparent to-stone-900/60 z-10"></div>
        
        {videos.map((video, index) => (
          <div
            key={index}
            className="absolute inset-0 transition-all duration-1000"
            style={{
              opacity: index === currentVideo ? 1 : 0,
              pointerEvents: index === currentVideo ? 'auto' : 'none',
              transform: `translateY(${scrollY * 0.5}px) scale(${index === currentVideo ? 1 : 1.1})`,
            }}
          >
            {video.type === 'video' ? (
              <video
                src={video.src}
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-full object-cover"
                style={{ opacity: 0.5 }}
              />
            ) : (
              <img
                src={video.src}
                alt={video.alt}
                className="w-full h-full object-cover transition-transform duration-1000"
                style={{ opacity: 0.5 }}
              />
            )}
          </div>
        ))}

        <div className="absolute inset-0 flex items-center justify-center z-20">
          <div className="text-center">
            <h1 
              className="text-6xl md:text-8xl font-serif mb-6 text-amber-100 transition-all duration-1000"
              style={{
                transform: `translateY(${scrollY * -0.3}px)`,
                textShadow: '0 0 20px rgba(0,0,0,0.5)',
              }}
            >
              Pompeii
            </h1>
            <h2 
              className="text-2xl md:text-3xl font-light mb-8 text-stone-300 transition-all duration-1000"
              style={{
                transform: `translateY(${scrollY * -0.2}px)`,
              }}
            >
              Pizza Studio
            </h2>
            <p 
              className="text-lg text-stone-400 max-w-2xl mx-auto leading-relaxed px-4 transition-all duration-1000"
              style={{
                transform: `translateY(${scrollY * -0.1}px)`,
              }}
            >
              An artisanal journey through ancient flavors and acoustic ambiance, 
              where every pizza tells the story of Vesuvius and time itself.
            </p>
          </div>
        </div>

        {/* Video Navigation Dots */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3 z-20">
          {videos.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentVideo(index)}
              className="w-3 h-3 rounded-full transition-all duration-300"
              style={{
                backgroundColor: index === currentVideo ? '#fbbf24' : '#78716c',
                transform: index === currentVideo ? 'scale(1.25)' : 'scale(1)',
              }}
            />
          ))}
        </div>
      </section>

      {/* Menu Section */}
      <section id="menu" className="py-24 px-4 relative" data-animate>
        <div className="max-w-6xl mx-auto">
          <div 
            className={`text-center mb-16 transition-all duration-1000 ${getAnimationClass('menu')}`}
          >
            <h2 className="text-5xl font-serif mb-6 text-amber-200">Artisanal Menu</h2>
            <p className="text-xl text-stone-400 max-w-3xl mx-auto">
              Each creation is a masterpiece, crafted with ingredients sourced from the volcanic soils of Campania
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              {[
                { name: 'La Vesuviana', desc: 'San Marzano tomatoes, buffalo mozzarella, fresh basil, volcanic sea salt', price: 24 },
                { name: 'L\'Aristocratica', desc: 'Truffle cream, porcini mushrooms, prosciutto di Parma, aged parmesan', price: 32 },
                { name: 'La Marinara Antica', desc: 'Heritage tomatoes, wild oregano, garlic confit, extra virgin olive oil', price: 22 }
              ].map((item, index) => (
                <div 
                  key={item.name}
                  className="bg-stone-800/50 p-8 rounded-lg backdrop-blur-sm border border-stone-700/30 transition-all duration-500 hover:bg-stone-800/70 hover:border-amber-200/30 hover:scale-105"
                  style={{
                    animationDelay: `${index * 200}ms`,
                  }}
                >
                  <h3 className="text-2xl font-serif mb-4 text-amber-200">{item.name}</h3>
                  <p className="text-stone-300 mb-4">{item.desc}</p>
                  <span className="text-xl font-bold text-amber-200">${item.price}</span>
                </div>
              ))}
            </div>

            {/* Build Your Pizza Interactive */}
            <div className="bg-stone-800/30 p-8 rounded-lg backdrop-blur-sm border border-stone-700/30">
              <h3 className="text-2xl font-serif mb-6 text-amber-200 text-center">Build Your Creation</h3>
              
              <div className="relative mb-8">
                <div 
                  className="w-64 h-64 mx-auto rounded-full bg-gradient-to-br from-amber-100 to-yellow-200 border-8 border-amber-800 relative overflow-hidden transition-all duration-500"
                  style={{
                    transform: selectedIngredients.length > 0 ? 'scale(1.05)' : 'scale(1)',
                  }}
                >
                  <div className="absolute inset-4 rounded-full bg-gradient-to-br from-red-600 to-red-700 opacity-80"></div>
                  {selectedIngredients.map((ingredient, index) => (
                    <div
                      key={ingredient.name}
                      className="absolute text-2xl transition-all duration-500"
                      style={{
                        top: `${20 + (index * 15) % 60}%`,
                        left: `${20 + (index * 20) % 60}%`,
                        transform: 'translate(-50%, -50%) scale(1)',
                        animation: `fadeIn 0.5s ease-out ${index * 100}ms both`,
                      }}
                    >
                      {ingredient.image}
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {ingredients.map((ingredient) => (
                  <button
                    key={ingredient.name}
                    onClick={() => toggleIngredient(ingredient)}
                    className={`p-3 rounded-lg border transition-all duration-300 ${
                      selectedIngredients.includes(ingredient)
                        ? 'bg-amber-200 text-stone-900 border-amber-200 scale-105'
                        : 'bg-stone-700/50 border-stone-600 hover:bg-stone-600/50 hover:scale-105'
                    }`}
                  >
                    <div className="text-lg mb-1">{ingredient.image}</div>
                    <div className="text-sm font-medium">{ingredient.name}</div>
                    <div className="text-xs text-stone-400">{ingredient.price}</div>
                  </button>
                ))}
              </div>

              <div className="mt-6 text-center">
                <div className="text-lg font-bold text-amber-200">
                  Total: ${selectedIngredients.reduce((sum, ing) => sum + parseInt(ing.price.slice(1)), 18)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-24 px-4 bg-stone-800/30" data-animate>
        <div className="max-w-6xl mx-auto">
          <div 
            className={`text-center mb-16 transition-all duration-1000 ${getAnimationClass('experience')}`}
          >
            <h2 className="text-5xl font-serif mb-6 text-amber-200">The Studio Experience</h2>
            <p className="text-xl text-stone-400 max-w-3xl mx-auto">
              Immerse yourself in an acoustic dining environment where every sense is awakened
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Flame, title: 'Wood-Fired Mastery', desc: 'Our 900°C Neapolitan oven creates the perfect leopard-spotted crust, infusing each pizza with subtle smokiness' },
              { icon: Users, title: 'Acoustic Ambiance', desc: 'Carefully curated soundscapes complement the crackling fire, creating an immersive sensory journey' },
              { icon: Clock, title: 'Slow Fermentation', desc: 'Our dough ferments for 72 hours, developing complex flavors reminiscent of ancient Roman bread-making traditions' }
            ].map((item, index) => (
              <div 
                key={item.title}
                className="text-center group transition-all duration-500 hover:transform hover:scale-105"
                style={{
                  animationDelay: `${index * 200}ms`,
                }}
              >
                <div className="w-20 h-20 mx-auto mb-6 bg-amber-200 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <item.icon className="w-10 h-10 text-stone-900" />
                </div>
                <h3 className="text-xl font-serif mb-4 text-amber-200">{item.title}</h3>
                <p className="text-stone-400">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section id="story" className="py-24 px-4" data-animate>
        <div className="max-w-4xl mx-auto text-center">
          <div className={`transition-all duration-1000 ${getAnimationClass('story')}`}>
            <h2 className="text-5xl font-serif mb-8 text-amber-200">Our Story</h2>
            <div className="text-lg text-stone-300 leading-relaxed space-y-6">
              <p>
                Born from the ashes of ancient Pompeii, our studio pays homage to the timeless art 
                of pizza-making that survived the volcanic eruption of 79 AD. We discovered fragments 
                of ancient recipes in archaeological sites, inspiring us to recreate these lost flavors.
              </p>
              <p>
                Every ingredient is sourced from the fertile volcanic soils of Campania, where the 
                mineral-rich earth produces tomatoes and herbs with unparalleled depth. Our acoustic 
                environment is designed to slow time, allowing guests to savor each moment and bite.
              </p>
              <p>
                This is not just dining—it's a journey through history, where ancient traditions 
                meet modern culinary artistry in perfect harmony.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 px-4 bg-stone-800/30" data-animate>
        <div className="max-w-6xl mx-auto">
          <h2 className="text-5xl font-serif mb-16 text-center text-amber-200">Guest Experiences</h2>
          
          <div className="flex overflow-x-auto space-x-6 pb-6" style={{ scrollBehavior: 'smooth' }}>
            {testimonials.map((testimonial, index) => (
              <div 
                key={index} 
                className="min-w-80 bg-stone-700/30 p-8 rounded-lg backdrop-blur-sm border border-stone-600/30 transition-all duration-500 hover:scale-105 hover:bg-stone-700/50"
                style={{
                  animationDelay: `${index * 150}ms`,
                }}
              >
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star 
                      key={i} 
                      className="w-5 h-5 text-amber-200 fill-current transition-all duration-300"
                      style={{
                        animationDelay: `${i * 100}ms`,
                      }}
                    />
                  ))}
                </div>
                <p className="text-stone-300 mb-6 italic">"{testimonial.text}"</p>
                <div className="text-amber-200 font-medium">{testimonial.name}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 px-4" data-animate>
        <div className="max-w-4xl mx-auto">
          <div className={`transition-all duration-1000 ${getAnimationClass('contact')}`}>
            <h2 className="text-5xl font-serif mb-16 text-center text-amber-200">Visit Our Studio</h2>
            
            <div className="grid md:grid-cols-2 gap-12">
              <div className="space-y-8">
                {[
                  { icon: MapPin, title: 'Location', detail: 'Via Vesuvio 79, Napoli, Italy' },
                  { icon: Phone, title: 'Reservations', detail: '+39 081 555 0179' },
                  { icon: Mail, title: 'Email', detail: 'hello@pompeiipizza.studio' },
                  { icon: Clock, title: 'Hours', detail: 'Tue-Sun: 6:00 PM - 12:00 AM' }
                ].map((item, index) => (
                  <div 
                    key={item.title}
                    className="flex items-center space-x-4 transition-all duration-500 hover:transform hover:translateX-2"
                    style={{
                      animationDelay: `${index * 100}ms`,
                    }}
                  >
                    <item.icon className="w-6 h-6 text-amber-200" />
                    <div>
                      <div className="font-medium text-stone-200">{item.title}</div>
                      <div className="text-stone-400">{item.detail}</div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="bg-stone-800/50 p-8 rounded-lg backdrop-blur-sm border border-stone-700/30">
                <h3 className="text-2xl font-serif mb-6 text-amber-200">Reserve Your Experience</h3>
                <div className="space-y-4">
                  <input 
                    type="text" 
                    placeholder="Name" 
                    className="w-full p-3 bg-stone-700/50 border border-stone-600 rounded-lg text-stone-100 placeholder-stone-400 focus:border-amber-200 focus:outline-none transition-all duration-300 hover:border-stone-500"
                  />
                  <input 
                    type="email" 
                    placeholder="Email" 
                    className="w-full p-3 bg-stone-700/50 border border-stone-600 rounded-lg text-stone-100 placeholder-stone-400 focus:border-amber-200 focus:outline-none transition-all duration-300 hover:border-stone-500"
                  />
                  <input 
                    type="date" 
                    className="w-full p-3 bg-stone-700/50 border border-stone-600 rounded-lg text-stone-100 focus:border-amber-200 focus:outline-none transition-all duration-300 hover:border-stone-500"
                  />
                  <select className="w-full p-3 bg-stone-700/50 border border-stone-600 rounded-lg text-stone-100 focus:border-amber-200 focus:outline-none transition-all duration-300 hover:border-stone-500">
                    <option>Party Size</option>
                    <option>2 Guests</option>
                    <option>4 Guests</option>
                    <option>6 Guests</option>
                    <option>8+ Guests</option>
                  </select>
                  <button className="w-full bg-amber-200 text-stone-900 py-3 rounded-lg font-medium hover:bg-amber-300 transition-all duration-300 hover:scale-105 shadow-lg">
                    Reserve Table
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer with Lava Flow Animation */}
      <footer className="relative bg-stone-900 pt-16 pb-8 px-4 overflow-hidden">
        <div 
          className="absolute top-0 left-0 w-full h-2"
          style={{
            background: 'linear-gradient(-45deg, #dc2626, #ea580c, #dc2626, #92400e)',
            backgroundSize: '400% 400%',
            animation: 'lava-flow 4s ease-in-out infinite',
          }}
        ></div>
        
        <div className="max-w-6xl mx-auto text-center">
          <div className="text-3xl font-serif mb-4 text-amber-200">Pompeii Pizza Studio</div>
          <p className="text-stone-400 mb-8">Where ancient traditions meet modern artistry</p>
          
          <div className="flex justify-center space-x-8 mb-8">
            {['Instagram', 'Facebook', 'TripAdvisor'].map((social) => (
              <a 
                key={social}
                href="#" 
                className="text-stone-400 hover:text-amber-200 transition-all duration-300 hover:scale-110"
              >
                {social}
              </a>
            ))}
          </div>
          
          <div className="text-stone-500 text-sm">
            © 2025 Pompeii Pizza Studio. All rights reserved.
          </div>
        </div>
      </footer>

      {/* Fixed Bottom CTA */}
      <div className="fixed bottom-6 right-6 z-50">
        <button 
          className="bg-amber-200 text-stone-900 px-8 py-4 rounded-full font-medium shadow-2xl hover:bg-amber-300 transition-all duration-300 hover:scale-105"
          style={{
            animation: 'pulse-glow 2s ease-in-out infinite',
          }}
        >
          Book a Table
        </button>
      </div>

      {/* Additional CSS for animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0);
          }
          to {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1);
          }
        }
        
        .hover\\:scale-105:hover {
          transform: scale(1.05);
        }
        
        .hover\\:scale-110:hover {
          transform: scale(1.1);
        }
        
        .hover\\:translateX-2:hover {
          transform: translateX(0.5rem);
        }
      `}</style>
    </div>
  );
};

export default PompeiiPizzaStudio;