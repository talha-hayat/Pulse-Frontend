import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import Slide2 from "@/assets/About.png";
import heroRestaurant from "@/assets/hero-restaurant.jpg";
import slide1 from "@/assets/Slide 1.mp4";

const slides = [
  {
    type: "video",
    src: slide1,
    title: "Experience the Purity of Pulse",
    subtitle: "Crystal-clear custom branded water for your restaurant",
    alt: "Promotional video showing Pulse branding for restaurants",
    duration: 9000, // 9 sec for videos
  },
  {
    type: "video",
    src: Slide2,
    title: "Pulse: Your Brand, Our Purity",
    subtitle: "Custom Mineral Water for Restaurants in Pakistan",
    alt: "Elegant restaurant dining table featuring Pulse custom-branded mineral water bottles in Karachi.",
    duration: 9000, // 6 sec for images
  },
  {
    type: "image",
    src: heroRestaurant,
    title: "Premium Quality, Custom Labels",
    subtitle: "Elevate Your Restaurant's Brand Experience",
    alt: "Modern restaurant interior with Pulse premium bottled water served with custom labels across Lahore and Islamabad.",
    duration: 6000,
  },
];

const HeroSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, slides[currentSlide].duration);

    return () => clearTimeout(timer);
  }, [currentSlide]);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () =>
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <section
      id="home"
      className="relative h-screen overflow-hidden"
      role="region"
      aria-roledescription="carousel"
      aria-label="Pulse promotional slides"
    >
      {/* JSON-LD Structured Data for AEO */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          "name": "Pulse",
          "image": "https://yourdomain.com/logo.png",
          "url": "https://yourdomain.com",
          "description":
            "Pulse provides custom branded mineral water bottles for restaurants across Pakistan including Karachi, Lahore, and Islamabad.",
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "Karachi",
            "addressCountry": "PK",
          },
          "telephone": "+92-300-1234567",
          "sameAs": [
            "https://facebook.com/Pulse",
            "https://instagram.com/Pulse",
          ],
        })}
      </script>

      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out transform ${
            index === currentSlide ? "opacity-100 scale-100" : "opacity-0 scale-105"
          }`}
          aria-hidden={index !== currentSlide}
        >
          {slide.type === "video" ? (
            <video
              src={slide.src}
              autoPlay={index === currentSlide}
              muted
              loop
              playsInline
              className="w-full h-full object-cover"
            >
              <track kind="captions" label={slide.alt} />
            </video>
          ) : (
            <img
              src={slide.src}
              alt={slide.alt}
              className="w-full h-full object-cover"
              loading={index === 0 ? "eager" : "lazy"}
              decoding="async"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/70" />
        </div>
      ))}

      {/* Content Overlay */}
      <div
        className="absolute inset-0 flex items-center justify-center text-center"
        aria-live="polite"
      >
        <div className="text-white px-4 max-w-3xl">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-4 drop-shadow-lg animate-fade-in">
            {slides[currentSlide].title}
          </h1>
          <h2 className="text-lg md:text-2xl mb-6 drop-shadow-md animate-fade-in">
            {slides[currentSlide].subtitle}
          </h2>
          <Link
            to="/contact"
            aria-label="Get a custom quote for Pulse branded bottles"
          >
            <Button
              size="lg"
              className="btn-primary text-lg px-8 py-4 rounded-2xl shadow-lg hover:scale-105 transition-transform animate-fade-in"
            >
              Get a Custom Quote
            </Button>
          </Link>
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-primary transition-colors"
        aria-label="Previous promotional slide"
      >
        <ChevronLeft size={42} />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-primary transition-colors"
        aria-label="Next promotional slide"
      >
        <ChevronRight size={42} />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex space-x-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            aria-label={`Go to promotional slide ${index + 1}`}
            className={`w-3 h-3 rounded-full transition-all ${
              index === currentSlide ? "bg-white w-4 h-4" : "bg-white/50 hover:bg-white/80"
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroSlider;

