import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Star, ArrowRight, Quote } from "lucide-react";
import hz from "../assets/HZ.png";

const CTABanner = () => {
  const testimonials = [
    {
      name: "Gul Malik",
      position: "Owner, Hasan Zae Restaurant",
      comment: "The custom labels elevated our brand image significantly! Our customers love the premium feel.",
      image: hz,
      rating: 5
    },
    {
      name: "Noman",
      position: "Manager, Zaiqa Pasand Burger's",
      comment: "Premium quality that our customers appreciate and notice. Great partnership!",
      image: hz,
      rating: 5
    }
  ];

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        size={16}
        className={index < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}
      />
    ));
  };

  return (
    <section className="py-16 hero-gradient relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-24 h-24 bg-white rounded-full"></div>
        <div className="absolute bottom-20 right-10 w-20 h-20 bg-white rounded-full"></div>
        <div className="absolute top-1/2 left-1/3 w-16 h-16 bg-white rounded-full"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 text-shadow">
            Trusted by Premium Restaurants
          </h2>
          <p className="text-white/80 text-lg max-w-2xl mx-auto text-shadow">
            Discover why leading restaurants choose Pulse for their branding
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="mb-12 max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Customer Testimonials */}
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="relative bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 
                           overflow-hidden h-96 group cursor-pointer
                           hover:bg-white/20 transition-all duration-500"
              >
                {/* Image - Visible by Default */}
                <div className="absolute inset-0 transition-all duration-700 ease-in-out 
                                group-hover:opacity-0 group-hover:scale-110">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                      const fallback = e.currentTarget.parentElement?.querySelector(".image-fallback");
                      if (fallback) (fallback as HTMLElement).style.display = "flex";
                    }}
                  />
                  <div className="image-fallback absolute inset-0 bg-primary/30 hidden 
                                  flex items-center justify-center">
                    <Quote size={60} className="text-white/60" />
                  </div>

                  {/* Name on Image - Bottom */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent 
                                  py-5 px-4 text-center">
                    <h4 className="font-bold text-white text-xl">{testimonial.name}</h4>
                  </div>
                </div>

                {/* Details Overlay - Hidden by Default, Appears on Hover */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/95 to-black/90 
                                flex flex-col items-center justify-center p-8 text-center
                                opacity-0 group-hover:opacity-100 
                                transition-all duration-700 ease-in-out
                                transform translate-y-8 group-hover:translate-y-0">
                  {/* Rating */}
                  <div className="flex items-center mb-4">
                    {renderStars(testimonial.rating)}
                    <span className="text-white/80 text-sm ml-2">({testimonial.rating}.0)</span>
                  </div>

                  {/* Name & Position */}
                  <h4 className="font-bold text-white text-2xl mb-1">{testimonial.name}</h4>
                  <p className="text-white/70 text-sm mb-6">{testimonial.position}</p>

                  {/* Comment */}
                  <div className="max-w-md">
                    <Quote size={28} className="text-white/40 mx-auto mb-4" />
                    <p className="text-white/90 text-base leading-relaxed italic">
                      "{testimonial.comment}"
                    </p>
                  </div>

                  {/* Verified Badge */}
                  <div className="mt-8 flex items-center text-white/70 text-sm bg-white/10 px-5 py-2 rounded-full">
                    <Star size={16} className="text-yellow-400 fill-yellow-400 mr-2" />
                    <span>Verified Customer</span>
                  </div>
                </div>
              </div>
            ))}

            {/* Join Our Customers Card */}
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/20 border-dashed 
                            hover:bg-white/10 transition-all duration-300 group overflow-hidden h-96 
                            flex flex-col">
              <div className="relative h-full flex flex-col">
                <div className="h-64 bg-gradient-to-r from-green-500/30 to-emerald-400/20 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-emerald-400/10 
                                  group-hover:scale-105 transition-transform duration-700"></div>

                  <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 z-10">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-white/30 to-white/10 p-0.5 shadow-lg 
                                    flex items-center justify-center border-2 border-white/30
                                    group-hover:scale-110 transition-transform duration-300">
                      <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                        <ArrowRight size={24} className="text-white" />
                      </div>
                    </div>
                  </div>

                  <div className="absolute top-4 left-4 w-6 h-6 rounded-full bg-white/10"></div>
                  <div className="absolute bottom-4 right-4 w-8 h-8 rounded-full bg-white/10"></div>

                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent 
                                  py-4 px-4 text-center">
                    <h3 className="font-bold text-white text-xl">Join Our Family</h3>
                  </div>
                </div>

                <div className="flex-1 pt-10 pb-8 px-6 text-center flex flex-col justify-between">
                  <div>
                    <p className="text-white/80 text-sm leading-relaxed mb-6">
                      Be the next success story. Let us help elevate your restaurant's brand with premium custom water bottles.
                    </p>
                    <div className="flex items-center justify-center space-x-1 mb-6">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={16} className="text-yellow-400 fill-yellow-400" />
                      ))}
                    </div>
                  </div>

                  <Link to="/contact" className="block">
                    <Button
                      variant="secondary"
                      className="w-full font-semibold group-hover:scale-105 transition-transform duration-200
                                 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
                    >
                      Become Our Customer
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main CTA Section */}
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 text-shadow">
            Ready to Enhance Your Restaurant's Brand?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto text-shadow">
            Join hundreds of premium restaurants using Pulse with custom labels to create unforgettable dining experiences.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link to="/contact">
              <Button size="lg" variant="secondary" className="text-lg px-8 py-4 font-semibold">
                Get Custom Quote
              </Button>
            </Link>
            <Link to="/gallery">
              <Button size="lg" variant="outline" className="text-lg px-8 py-4 border-white hover:bg-white/10">
                View Our Work
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTABanner;