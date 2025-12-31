import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// 📦 Product Configuration
const PRODUCTS: Record<string, { name: string; description: string; image: string; price: number }> = {
  "500ml": {
    name: "500ml Bottle",
    description: "Perfect for single serving. Easy to carry anywhere.",
    image:
      "https://liorbzcsebltevjpcnwt.supabase.co/storage/v1/object/public/restaurant-logos/custom-business-water-bottle-labels-promote-your-brand-in-style-or-icustomlabel.webp",
    price: 35, 
  },
  "1.5L": {
    name: "1.5L Bottle",
    description: "Best for family use or longer trips.",
    image:
      "https://liorbzcsebltevjpcnwt.supabase.co/storage/v1/object/public/restaurant-logos/bottle-1.5L.jpg",
    price: 45, 
  },
};

const DELIVERY_DAYS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const Order = () => {
  const [searchParams] = useSearchParams();
  const { toast } = useToast();

  const productKey = searchParams.get("product") || "500ml";
  const product = PRODUCTS[productKey] || PRODUCTS["500ml"];

  const [formData, setFormData] = useState({
    business_name: "",
    phone: "",
    delivery_address: "",
    city: "",
    country: "Pakistan",
    quantity: 1000,
    per_week: "",
    delivery_days: [] as string[],
    notes: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [totalAmount, setTotalAmount] = useState(0);
  const [pricePerBottle, setPricePerBottle] = useState(product.price);

  // Calculate total amount whenever quantity or product changes
  useEffect(() => {
    const calculatedTotal = Number(formData.quantity) * pricePerBottle;
    setTotalAmount(calculatedTotal);
  }, [formData.quantity, pricePerBottle]);

  // Update price when product changes
  useEffect(() => {
    setPricePerBottle(product.price);
  }, [product]);

  // 📝 Handle Form Changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDeliveryDayToggle = (day: string) => {
    setFormData((prev) => {
      const exists = prev.delivery_days.includes(day);
      return {
        ...prev,
        delivery_days: exists
          ? prev.delivery_days.filter((d) => d !== day)
          : [...prev.delivery_days, day],
      };
    });
  };

  // 📩 Submit Order
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (Number(formData.quantity) < 1000) {
      toast({
        title: "Quantity Too Low ⚠️",
        description: "Minimum order is 1000 bottles.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    const user = JSON.parse(localStorage.getItem("user") || "{}");

    try {
      const res = await fetch(`${import.meta.env.VITE_BASE_URL}api/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          // User information
          userName: user.userName,
          email: user.email,
          user_id: user.id,
          
          // Product information
          product_id: productKey,
          product_name: product.name,
          price_per_bottle: pricePerBottle,
          quantity: formData.quantity,
          total_amount: totalAmount,
          
          // Delivery information
          business_name: formData.business_name,
          phone: formData.phone,
          delivery_address: formData.delivery_address,
          city: formData.city,
          country: formData.country,
          bottles_per_week: formData.per_week,
          delivery_days: formData.delivery_days,
          
          // Additional notes
          notes: formData.notes,
        }),
      });

      if (!res.ok) throw new Error("Failed to place order");

      const result = await res.json();

      toast({
        title: "Order Placed Successfully 🎉",
        description: `Your order for ${product.name} has been placed successfully. Total amount: Rs. ${totalAmount.toLocaleString()}`,
      });

      // Reset form
      setFormData({
        business_name: "",
        phone: "",
        delivery_address: "",
        city: "",
        country: "Pakistan",
        quantity: 1000,
        per_week: "",
        delivery_days: [],
        notes: "",
      });
    } catch (err) {
      console.error("Order Error:", err);
      toast({
        title: "Error",
        description: "Failed to place order. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 pt-20">
        <div className="container mx-auto px-4 py-12 max-w-4xl">
          {/* Product Card */}
          <Card className="border-border mb-8">
            <CardHeader>
              <CardTitle className="text-primary">{product.name}</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col md:flex-row gap-6">
              <img
                src={product.image}
                alt={product.name}
                className="w-full md:w-1/3 rounded-lg object-contain"
              />
              <div className="text-sm text-muted-foreground space-y-3">
                <p>
                  You must order a minimum of <strong>1000 bottles</strong>.
                  We create a custom label for your business and print labels in bulk.
                </p>
                <p>
                  Price per bottle: <strong>Rs. {product.price}</strong>
                  <br />
                  <span className="text-xs text-amber-600">
                    (Price is for bottles only. Delivery charges will be calculated separately based on your location)
                  </span>
                </p>
                <p>
                  Example: If you need <strong>100 bottles per week</strong>, our team will
                  deliver weekly until your 1000-bottle order is completed.
                </p>
                <p>
                  For complaints or inquiries, please contact us at{" "}
                  <a
                    href="mailto:Pulseofficial@gmail.com"
                    className="text-primary font-medium"
                  >
                    Pulseofficial@gmail.com
                  </a>
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Order Form */}
          <Card className="border-border">
            <CardHeader>
              <CardTitle className="text-primary">Place Your Order</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="business_name" className="block text-sm font-medium mb-1 text-gray-700">
                        Business Name *
                      </label>
                      <Input
                        id="business_name"
                        name="business_name"
                        value={formData.business_name}
                        onChange={handleChange}
                        required
                        placeholder="Enter your business name"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium mb-1 text-gray-700">
                        Phone Number *
                      </label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        placeholder="Enter your phone number"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="delivery_address" className="block text-sm font-medium mb-1 text-gray-700">
                        Delivery Address *
                      </label>
                      <Input
                        id="delivery_address"
                        name="delivery_address"
                        value={formData.delivery_address}
                        onChange={handleChange}
                        required
                        placeholder="Enter delivery address"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="city" className="block text-sm font-medium mb-1 text-gray-700">
                        City *
                      </label>
                      <Input
                        id="city"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        required
                        placeholder="Enter your city"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="country" className="block text-sm font-medium mb-1 text-gray-700">
                        Country
                      </label>
                      <Input
                        id="country"
                        name="country"
                        value={formData.country}
                        disabled
                        className="bg-gray-100 text-gray-600"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="quantity" className="block text-sm font-medium mb-1 text-gray-700">
                        Quantity (Minimum 1000 bottles) *
                      </label>
                      <Input
                        id="quantity"
                        name="quantity"
                        type="number"
                        min="1000"
                        value={formData.quantity}
                        onChange={handleChange}
                        required
                        placeholder="Enter quantity"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="per_week" className="block text-sm font-medium mb-1 text-gray-700">
                        Bottles Required Per Week *
                      </label>
                      <Input
                        id="per_week"
                        name="per_week"
                        type="number"
                        value={formData.per_week}
                        onChange={handleChange}
                        required
                        placeholder="Enter bottles per week"
                      />
                    </div>
                    
                    {/* Total Amount Display */}
                    <div className="p-4 bg-primary/10 rounded-lg border border-primary/20">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">Total Amount:</span>
                        <span className="text-xl font-bold text-primary">
                          Rs. {totalAmount.toLocaleString()}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        {formData.quantity} bottles × Rs. {pricePerBottle}
                      </p>
                      <p className="text-xs text-amber-600 mt-2">
                        Note: This amount is for bottles only. Delivery charges will be calculated separately.
                      </p>
                    </div>
                    
                    {/* Delivery Days */}
                    <div>
                      <label className="block text-sm font-medium mb-2 text-gray-700">
                        Preferred Delivery Days *
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        {DELIVERY_DAYS.map((day) => (
                          <label key={day} className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              checked={formData.delivery_days.includes(day)}
                              onChange={() => handleDeliveryDayToggle(day)}
                              className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                            />
                            <span className="text-sm">{day}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <label htmlFor="notes" className="block text-sm font-medium mb-2 text-gray-700">
                    Additional Notes or Special Instructions
                  </label>
                  <Textarea
                    id="notes"
                    name="notes"
                    value={formData.notes}
                    onChange={handleChange}
                    rows={3}
                    placeholder="Enter any special instructions or notes for your order..."
                  />
                </div>

                <Button 
                  type="submit" 
                  disabled={isSubmitting} 
                  className="w-full py-3 bg-primary hover:bg-primary/90 text-white font-semibold"
                >
                  {isSubmitting ? "Placing Order..." : "Place Order"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Order;