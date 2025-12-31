import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Phone, Mail, MapPin, Send } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Contact = () => {
  const [formData, setFormData] = useState({
    restaurantName: "",
    email: "",
    phone: "",
    message: "",
    productId: "",
  });

  const [userInfo, setUserInfo] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  // Get user info from localStorage on component mount
  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      try {
        const parsedUser = JSON.parse(userData);
        setUserInfo(parsedUser);

        // Pre-fill email if user is logged in
        setFormData(prev => ({
          ...prev,
          email: parsedUser.email || "",
        }));
      } catch (error) {
        console.error("Error parsing user data:", error);
      }
    }
  }, []);

  // Handle Input Change
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // Submit Form
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Prepare data with user information
      const submissionData = {
        ...formData,
        userId: userInfo?.id || "",
        userName: userInfo?.userName || "",
        userEmail: userInfo?.email || "",
      };
      console.log("📤 Submitting Data:", submissionData);
      console.log("📡 API Endpoint:", import.meta.env.VITE_BASE_URL);

      const response = await fetch(`${import.meta.env.VITE_BASE_URL}send-email`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.restaurantName,
          email: formData.email,
          phone: formData.phone,
          message: formData.message,
        }),
      });


      if (!response.ok) {
        throw new Error("Failed to send message");
      }

      const data = await response.json();
      console.log("✅ API Response:", data);

      toast({
        title: "✅ Message Sent Successfully!",
        description: "We've received your inquiry and will contact you soon.",
      });

      // Reset Form (keep email if user is logged in)
      setFormData({
        restaurantName: "",
        email: userInfo?.email || "", // Keep user email if logged in
        phone: "",
        message: "",
        productId: "",
      });
    } catch (error) {
      console.error(error);
      toast({
        title: "❌ Error",
        description: "Failed to send message. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-white via-slate-50 to-slate-100">
      {/* SEO Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ContactPage",
          "name": "Contact Pulse",
          "description": "Contact Pulse for custom mineral water bottles in Karachi, Lahore, and Islamabad. Get personalized quotes for your restaurant.",
          "url": window.location.href,
        })}
      </script>

      <Navbar />

      <main className="flex-1 pt-20">
        <div className="container mx-auto px-4 py-12 lg:py-16">
          {/* Heading with SEO optimization */}
          <div className="text-center mb-12 lg:mb-16">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-4 tracking-tight">
              Get in Touch
            </h1>
            <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto">
              Ready to enhance your restaurant with custom-labeled mineral water?
              Fill out the form and we'll get back to you with a personalized quote.
            </p>
            {userInfo && (
              <div className="mt-4 p-3 bg-primary/10 rounded-lg inline-block">
                <p className="text-sm text-primary font-medium">
                  👋 Welcome back, {userInfo.userName}! Your email has been pre-filled.
                </p>
              </div>
            )}
          </div>

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 max-w-6xl mx-auto">
            {/* Contact Form - Fixed width issue */}
            <Card className="border border-slate-200 shadow-lg hover:shadow-xl transition-all duration-300 w-full">
              <CardHeader className="bg-gradient-to-r from-primary/90 to-primary text-white rounded-t-xl">
                <CardTitle className="text-lg font-semibold">
                  Send Us a Message
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 lg:p-8">
                <form onSubmit={handleSubmit} className="space-y-6 w-full">
                  <div className="space-y-4 w-full">
                    <div className="w-full">
                      <label
                        htmlFor="restaurantName"
                        className="block text-sm font-medium mb-2 text-gray-700"
                      >
                        Restaurant Name *
                      </label>
                      <Input
                        id="restaurantName"
                        name="restaurantName"
                        value={formData.restaurantName}
                        onChange={handleChange}
                        required
                        placeholder="Enter your restaurant name"
                        className="w-full rounded-lg border-gray-300 focus:ring-2 focus:ring-primary"
                      />
                    </div>

                    <div className="w-full">
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium mb-2 text-gray-700"
                      >
                        Email Address *
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="your@email.com"
                        className="w-full rounded-lg border-gray-300 focus:ring-2 focus:ring-primary"
                        disabled={!!userInfo?.email} // Disable if user is logged in
                      />
                      {userInfo?.email && (
                        <p className="text-xs text-muted-foreground mt-1">
                          Logged in as {userInfo.email}
                        </p>
                      )}
                    </div>

                    <div className="w-full">
                      <label
                        htmlFor="phone"
                        className="block text-sm font-medium mb-2 text-gray-700"
                      >
                        Phone Number *
                      </label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        placeholder="+92 XXX XXXXXXX"
                        className="w-full rounded-lg border-gray-300 focus:ring-2 focus:ring-primary"
                      />
                    </div>

                    <div className="w-full">
                      <label
                        htmlFor="message"
                        className="block text-sm font-medium mb-2 text-gray-700"
                      >
                        Message
                      </label>
                      <Textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows={4}
                        placeholder="Tell us about your requirements..."
                        className="w-full rounded-lg border-gray-300 focus:ring-2 focus:ring-primary resize-vertical"
                      />
                    </div>
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-primary to-primary/90 text-white font-semibold shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? "Sending..." : "Send Message"}
                    <Send size={18} />
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Contact Info */}
            <div className="space-y-6 lg:space-y-8">
              <Card className="border border-slate-200 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-xl font-semibold text-primary">
                    Our Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {[
                    {
                      icon: Phone,
                      label: "Phone",
                      value: "+92 300 2451981",
                      schema: "telephone"
                    },
                    {
                      icon: Mail,
                      label: "Email",
                      value: "Pulseofficial@gmail.com",
                      schema: "email"
                    },
                    {
                      icon: MapPin,
                      label: "Location",
                      value: "Site Area Karachi, Pakistan",
                      schema: "address"
                    },
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center mt-1">
                        <item.icon size={20} />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-800">{item.label}</h3>
                        <p
                          className="text-muted-foreground"
                          itemProp={item.schema}
                        >
                          {item.value}
                        </p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Map */}
              <Card className="border border-slate-200 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-xl font-semibold text-primary">
                    Find Us
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="aspect-video rounded-lg overflow-hidden shadow-md">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d7236.84634917845!2d66.99361707918918!3d24.91764994861236!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3eb33fe3b9c3a543%3A0x78a6b5bded20d337!2sBab%20e%20Khyber%20Metroville%20SITE%20Area!5e0!3m2!1sen!2sus!4v1756290304897!5m2!1sen!2sus"
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="Pulse Location - Bab e Khyber Metroville SITE Area, Karachi, Pakistan"
                      aria-label="Google Maps location of Pulse in Karachi"
                    />
                  </div>
                  <div className="mt-4 text-center">
                    <p className="text-sm text-muted-foreground">
                      Bab e Khyber Metroville SITE Area, Karachi, Pakistan
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Contact;