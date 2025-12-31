import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import bottle15L from "@/assets/1.5 Liter.png";
import bottle500ml from "@/assets/500ml.png"

const products = [
  {
    id: "1.5L",
    name: "1.5L Bottle",
    price: 110,
    currency: "PKR",
    image: bottle15L,
    alt: "Pulse 1.5L custom labeled bottle for restaurants",
    caption: "Bulk Price for Restaurant Partners",
    sku: "MW-15L"
  },
  {
    id: "500ml",
    name: "500ml Bottle",
    price: 60,
    currency: "PKR",
    image: bottle500ml,
    alt: "Pulse 500ml custom labeled bottle for restaurants",
    caption: "Bulk Price for Restaurant Partners",
    sku: "MW-500ML"
  }
];

const ProductsSection = () => {
  const [isLoading, setIsLoading] = useState<string | null>(null);
  const { toast } = useToast();

  // Function to validate JWT token
  const isValidToken = (token) => {
    if (!token) return false;
    
    try {
      // Check if token is a valid JWT format
      const parts = token.split('.');
      if (parts.length !== 3) return false;
      
      // Decode the payload part of JWT
      const payload = JSON.parse(atob(parts[1]));
      
      // Check if token is expired
      const currentTime = Math.floor(Date.now() / 1000);
      if (payload.exp && payload.exp < currentTime) {
        return false;
      }
      
      return true;
    } catch (error) {
      console.error("Token validation error:", error);
      return false;
    }
  };

  // Function to get user data from token
  const getUserFromToken = () => {
    const token = localStorage.getItem("token");
    if (!token || !isValidToken(token)) return null;
    
    try {
      const parts = token.split('.');
      const payload = JSON.parse(atob(parts[1]));
      return payload;
    } catch (error) {
      console.error("Error parsing token:", error);
      return null;
    }
  };

  const handleOrder = async (productId: string) => {
    setIsLoading(productId);
    try {
      // Check if user has a valid token
      const user = getUserFromToken();
      
      if (!user) {
        toast({
          title: "Authentication Required",
          description: "Please sign in to place an order.",
          variant: "destructive",
        });
        window.location.href = "/auth";
        return;
      }

      toast({
        title: "Order Initiated",
        description: "Redirecting to order form...",
      });
      
      // Redirect to order page with product ID
      window.location.href = `/order?product=${productId}`;

    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(null);
    }
  };

  // ✅ SEO + AEO Structured Data
  useEffect(() => {
    const script = document.createElement("script");
    script.type = "application/ld+json";
    const origin = typeof window !== "undefined" ? window.location.origin : "https://Pulse.com";
    script.innerHTML = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "ItemList",
      "itemListElement": products.map((product, index) => ({
        "@type": "Product",
        "position": index + 1,
        "sku": product.sku,
        "name": product.name,
        "image": product.image,
        "description": product.caption,
        "brand": {
          "@type": "Organization",
          "name": "Pulse"
        },
        "offers": {
          "@type": "Offer",
          "priceCurrency": product.currency,
          "price": product.price,
          "availability": "https://schema.org/InStock",
          "url": `${origin}/products/${product.id}`
        }
      }))
    });
    document.head.appendChild(script);
    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return (
    <section 
      id="products" 
      className="py-20 bg-[#181894] text-white"
    >
      <div className="container mx-auto px-4">
        
        {/* Heading */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: -40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4 tracking-tight">
            Our Premium Products
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto text-lg">
            Choose from our high-quality mineral water bottles with custom labeling for your restaurant.
          </p>
        </motion.div>
        
        {/* Products */}
        <div className="grid md:grid-cols-2 gap-10 max-w-5xl mx-auto">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <Card className="bg-[#2a2ab9] border border-white backdrop-blur-md rounded-2xl shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-transform duration-300">
                <CardContent className="p-6">
                  <div className="aspect-square mb-6 overflow-hidden rounded-xl bg-gray-700/40">
                    <img
                      src={product.image}
                      alt={product.alt}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                      loading="lazy"
                    />
                  </div>
                  <h3 className="text-2xl font-semibold mb-2 text-white">
                    {product.name}
                  </h3>
                  <p className="text-3xl font-bold text-blue-400 mb-2">
                    {product.currency} {product.price}
                  </p>
                  <p className="text-sm text-gray-400">
                    {product.caption}
                  </p>
                </CardContent>
                <CardFooter className="p-6 pt-0 flex gap-3">
                  <Button
                    onClick={() => handleOrder(product.id)}
                    disabled={isLoading === product.id}
                    className="bg-blue-600 text-white hover:bg-blue-500 flex-1 rounded-xl shadow-md transition"
                  >
                    {isLoading === product.id ? "Loading..." : "Order Now"}
                  </Button>
                  <Button
                    variant="outline"
                    asChild
                    className="flex-1 border-gray-500 text-gray-700 hover:bg-gray-700 rounded-xl transition"
                  >
                    <a href="/contact">Request Quote</a>
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;