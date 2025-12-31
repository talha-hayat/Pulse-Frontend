import { Droplets, Award, DollarSign, Truck } from "lucide-react";
import { useEffect } from "react";

const features = [
  {
    icon: Droplets,
    title: "High-Quality Mineral Water",
    description: "Pure, refreshing mineral water sourced from premium sources",
    image: "/images/water-quality.png",
    price: "500 PKR",
  },
  {
    icon: Award,
    title: "Custom Labeling",
    description: "Professional custom labels that showcase your restaurant's brand",
    image: "/images/custom-label.png",
    price: "1000 PKR",
  },
  {
    icon: DollarSign,
    title: "Competitive Pricing",
    description: "Bulk pricing designed specifically for restaurant partners",
    image: "/images/pricing.png",
    price: "Starting from 300 PKR",
  },
  {
    icon: Truck,
    title: "Fast & Reliable Delivery",
    description: "Timely delivery to keep your restaurant stocked",
    image: "/images/delivery.png",
    price: "Free with bulk orders",
  },
];

const FeaturesSection = () => {
  useEffect(() => {
    // Inject JSON-LD for SEO rich results
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.innerHTML = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "ItemList",
      "name": "Pulse Features",
      "itemListElement": features.map((f, i) => ({
        "@type": "Product",
        "position": i + 1,
        "name": f.title,
        "description": f.description,
        "image": f.image,
        "offers": {
          "@type": "Offer",
          "price": f.price.replace(/\D/g, ""),
          "priceCurrency": "PKR",
          "availability": "https://schema.org/InStock",
        },
      })),
    });
    document.head.appendChild(script);
    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return (
    <section
      id="features"
      className="py-20 bg-gradient-to-b from-blue-50 to-white relative overflow-hidden"
    >
      {/* Decorative gradient blobs */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-blue-300 opacity-20 blur-3xl rounded-full" />
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-blue-500 opacity-20 blur-3xl rounded-full" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
            Why Choose <span className="text-blue-700">Pulse?</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover the benefits that make Pulse the top choice for restaurants
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="group relative text-center p-8 rounded-2xl bg-white shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2 hover:bg-gradient-to-br hover:from-blue-50 hover:to-white"
              style={{ animationDelay: `${index * 0.1}s` }}
              aria-label={feature.title}
            >
              <div className="inline-flex items-center justify-center w-20 h-20 mb-6 bg-gradient-to-r from-blue-600 to-blue-400 text-white rounded-full shadow-lg group-hover:scale-110 transition-transform duration-300">
                <feature.icon size={36} />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-foreground group-hover:text-blue-700 transition-colors">
                {feature.title}
              </h3>
              <p className="text-muted-foreground text-sm">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
