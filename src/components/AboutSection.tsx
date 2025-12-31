import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Link } from "react-router-dom";
import { Filter, ArrowRight } from "lucide-react";
import aboutImage from "@/assets/About.png";

const AboutSection = () => {
  // Detect jab section viewport me ho
  const { ref, inView } = useInView({
    triggerOnce: true, // ek hi baar animate hoga
    threshold: 0.2, // 20% visible hone par trigger
  });

  return (
    <section
      id="about"
      ref={ref}
      className="relative py-20 bg-secondary/30 overflow-hidden flex items-center mt-20 lg:mt-[200px]"
      role="region"
      aria-label="About Pulse Company in Pakistan"
    >
      {/* JSON-LD Schema for AEO + SEO */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "Pulse",
          "description":
            "Pulse provides premium custom mineral water bottles for restaurants across Pakistan including Karachi, Lahore, and Islamabad, enhancing brand identity with personalized labeling.",
          "url": "https://yourdomain.com",
          "logo": "https://yourdomain.com/logo.png",
          "foundingDate": "2020",
          "founder": {
            "@type": "Person",
            "name": "Your Founder Name",
          },
          "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "+92-300-1234567",
            "contactType": "customer support",
            "areaServed": "PK",
            "availableLanguage": ["en", "ur"],
          },
          "sameAs": [
            "https://facebook.com/Pulse",
            "https://instagram.com/Pulse",
            "https://linkedin.com/company/Pulse",
          ],
        })}
      </script>

      {/* FAQ Schema for AEO */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": [
            {
              "@type": "Question",
              "name": "What is Pulse?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text":
                  "Pulse provides premium custom mineral water bottles with personalized labeling for restaurants and businesses across Pakistan.",
              },
            },
            {
              "@type": "Question",
              "name": "Where does Pulse deliver?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text":
                  "Pulse currently serves restaurants and cafés in Karachi, Lahore, and Islamabad.",
              },
            },
            {
              "@type": "Question",
              "name": "Can I order custom branded water bottles?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text":
                  "Yes, Pulse specializes in custom branded mineral water bottles tailored to your restaurant's identity.",
              },
            },
          ],
        })}
      </script>

      <div className="container mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        <motion.div
          className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center"
          initial={{ opacity: 0, y: 100 }} // neeche se start
          animate={inView ? { opacity: 1, y: 0 } : {}} // visible hone par animate
          transition={{ duration: 1, ease: "easeOut" }}
        >
          {/* Left Side - Image - Order changed for mobile */}
          <div className="relative group order-2 lg:order-1">
            <motion.img
              src={aboutImage}
              alt="Pulse branded mineral water bottles in Karachi, Lahore, and Islamabad"
              className="rounded-2xl shadow-xl w-full max-w-md mx-auto lg:max-w-full transform group-hover:scale-105 transition-transform duration-700"
              loading="lazy"
              decoding="async"
              initial={{ opacity: 0, x: -80 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 1, delay: 0.3 }}
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/40 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
          </div>

          {/* Right Side - Text Content */}
          <motion.div
            className="max-w-xl mx-auto text-center lg:text-left space-y-6 order-1 lg:order-2 px-4 sm:px-0"
            initial={{ opacity: 0, x: 80 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-primary tracking-tight">
              About <span className="text-foreground">Pulse</span>
            </h2>
            <div className="w-20 h-1 bg-primary mx-auto lg:mx-0 rounded-full animate-grow" />

            <p className="text-base sm:text-lg leading-relaxed text-muted-foreground">
              Pulse is Pakistan's trusted provider of{" "}
              <strong>custom branded mineral water bottles</strong> for
              restaurants, cafés, and hospitality businesses. We combine{" "}
              <em>purity, taste, and premium quality</em> with{" "}
              <strong>personalized labeling</strong> to strengthen your brand's
              identity in{" "}
              <strong>Karachi, Lahore, and Islamabad</strong>.
            </p>

            <ul className="space-y-3 text-muted-foreground text-left">
              <li className="flex items-start gap-2">
                <span className="mt-1">✔️</span>
                <span>Pure, safe, and refreshing mineral water</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1">✔️</span>
                <span>Custom labeling tailored to your restaurant's branding</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1">✔️</span>
                <span>Serving restaurants in Karachi, Lahore & Islamabad</span>
              </li>
            </ul>

            <p className="text-base sm:text-lg text-foreground font-medium">
              Elevate your dining experience with <strong>Pulse</strong>{" "}
              – where purity meets branding excellence.
            </p>

            {/* New Filtration Process Button */}
            <motion.div
              className="pt-4"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              <Link 
                to="/filtration" 
                className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-500 to-emerald-500 
                         text-white font-semibold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl 
                         transform hover:scale-105 transition-all duration-300 group"
                aria-label="View our 10-stage water filtration process"
              >
                <Filter className="w-5 h-5" />
                <span className="text-base">View Filtration Process</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              
              <p className="text-sm text-muted-foreground mt-2 max-w-md">
                Discover our advanced 10-stage purification system that ensures 
                99.9% pure, alkaline, and mineral-rich drinking water.
              </p>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Decorative background animation */}
      <div className="absolute top-0 left-0 w-40 h-40 bg-primary/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-0 right-0 w-56 h-56 bg-primary/10 rounded-full blur-3xl animate-ping" />
    </section>
  );
};

export default AboutSection;