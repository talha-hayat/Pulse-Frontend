-- Create leads table for contact form submissions
CREATE TABLE public.leads (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  restaurant_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  message TEXT,
  product_id TEXT,
  restaurant_logo TEXT, -- ✅ NEW: Logo URL field
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security for leads
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

-- Create policy to allow anyone to insert leads (for contact form)
CREATE POLICY "Anyone can submit leads" 
ON public.leads 
FOR INSERT 
TO anon
WITH CHECK (true);

-- Create policy to allow anyone to view leads
CREATE POLICY "Anyone can view leads" 
ON public.leads 
FOR SELECT 
TO anon
USING (true);

-- Create orders table with all required fields
CREATE TABLE public.orders (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID,
  product_id TEXT NOT NULL,
  business_name TEXT NOT NULL,
  business_address TEXT NOT NULL,
  phone TEXT NOT NULL,
  delivery_address TEXT NOT NULL,
  city TEXT NOT NULL,
  country TEXT DEFAULT 'Pakistan',
  quantity INTEGER NOT NULL DEFAULT 1000,
  bottles_per_week INTEGER,
  delivery_days TEXT[], -- Array for multiple delivery days
  notes TEXT,
  price NUMERIC,
  payment_status TEXT DEFAULT 'pending',
  status TEXT NOT NULL DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security for orders
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

-- Create policies for orders (allow anonymous inserts for orders)
CREATE POLICY "Anyone can create orders" 
ON public.orders 
FOR INSERT 
TO anon
WITH CHECK (true);

CREATE POLICY "Anyone can view orders" 
ON public.orders 
FOR SELECT 
TO anon
USING (true);

CREATE POLICY "Anyone can update orders" 
ON public.orders 
FOR UPDATE 
TO anon
USING (true);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_leads_updated_at
BEFORE UPDATE ON public.leads
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_orders_updated_at
BEFORE UPDATE ON public.orders
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create storage bucket for restaurant logos (if not exists)
INSERT INTO storage.buckets (id, name, public)
VALUES ('restaurant-logos', 'restaurant-logos', true)
ON CONFLICT (id) DO NOTHING;

-- Set up storage policies for restaurant-logos bucket
CREATE POLICY "Anyone can upload logos"
ON storage.objects FOR INSERT TO anon
WITH (bucket_id = 'restaurant-logos');

CREATE POLICY "Anyone can view logos"
ON storage.objects FOR SELECT TO anon
WITH (bucket_id = 'restaurant-logos');