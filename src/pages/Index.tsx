
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, Cake, Coffee, IceCream, ShoppingBag } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import { useCart } from '@/context/CartContext';
import productsData from '@/data/products.json';

const Index: React.FC = () => {
  const [featuredProducts, setFeaturedProducts] = useState<any[]>([]);
  const { addItem } = useCart();

  useEffect(() => {
    // Get featured products
    const featured = productsData.featured.map(id => 
      productsData.products.find(product => product.id === id)
    ).filter(Boolean) as any[];
    
    setFeaturedProducts(featured);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-28 pb-16 md:pt-40 md:pb-24 bg-gradient-to-b from-primary to-background">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center">
            <div className="lg:w-1/2 lg:pr-12 text-center lg:text-left">
              <span className="inline-block px-3 py-1 bg-accent/10 text-accent rounded-full text-sm font-medium mb-6 animate-fade-in">
                Handcrafted with love
              </span>
              <h1 className="heading-xl mb-6 animate-fade-in animation-delay-200">
                Delicious <span className="text-gradient">Sweet Treats</span> for Every Occasion
              </h1>
              <p className="paragraph mb-8 max-w-xl mx-auto lg:mx-0 animate-fade-in animation-delay-400">
                Indulge in our premium selection of handcrafted cakes, yogurts, and sweet delights made with the finest ingredients. Perfect for celebrations or everyday moments of joy.
              </p>
              <div className="flex flex-wrap justify-center lg:justify-start gap-4 animate-fade-in animation-delay-600">
                <Link to="/products" className="btn-primary">
                  Shop Now
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
                <Link to="/about" className="btn-outline">
                  About Us
                </Link>
              </div>
            </div>
            <div className="lg:w-1/2 mt-12 lg:mt-0">
              <div className="relative">
                <div className="rounded-3xl overflow-hidden aspect-[4/3] animate-fade-in">
                  <img 
                    src="https://images.unsplash.com/photo-1567171466295-4afa63d45416?q=80&w=1000&auto=format&fit=crop" 
                    alt="Delicious cakes and pastries" 
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* Floating Elements */}
                <div className="absolute -top-6 -right-6 bg-white rounded-2xl glass-card p-4 shadow-lg animate-float">
                  <div className="flex items-center">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 text-amber-400" fill="currentColor" />
                      ))}
                    </div>
                    <span className="ml-2 font-medium">4.9/5</span>
                  </div>
                  <p className="text-sm mt-1">From 500+ Reviews</p>
                </div>
                <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl glass-card p-4 shadow-lg animate-float animation-delay-400">
                  <p className="font-medium">Fresh Daily</p>
                  <p className="text-sm text-muted-foreground mt-1">Made every morning</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="heading-lg mb-4">Explore Categories</h2>
            <p className="paragraph max-w-2xl mx-auto">
              Browse through our carefully curated categories of sweet delights
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {productsData.categories.map((category) => (
              <Link 
                key={category.id} 
                to={`/products?category=${category.id}`}
                className="group relative overflow-hidden rounded-2xl aspect-square hover-card"
              >
                <img 
                  src={category.image} 
                  alt={category.name} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent transition-opacity p-6 flex flex-col justify-end">
                  <h3 className="text-white text-xl font-semibold">{category.name}</h3>
                  <p className="text-white/90 text-sm mt-2 flex items-center">
                    Browse collection <ArrowRight className="ml-2 h-4 w-4" />
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 md:py-24 bg-primary">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
            <div>
              <h2 className="heading-lg mb-4">Featured Products</h2>
              <p className="paragraph max-w-2xl">
                Our most popular and beloved sweet treats
              </p>
            </div>
            <Link 
              to="/products" 
              className="btn-outline mt-6 md:mt-0 self-start md:self-auto"
            >
              View All Products
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {featuredProducts.map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                name={product.name}
                price={product.price}
                discountPrice={product.discountPrice}
                image={product.image}
                rating={product.rating}
                reviews={product.reviews}
                category={product.category}
                isNew={product.isNew}
                isBestSeller={product.isBestSeller}
                className="animate-fade-in"
              />
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="heading-lg mb-4">Why Choose Us</h2>
            <p className="paragraph max-w-2xl mx-auto">
              What makes our sweet treats special and loved by our customers
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-6 rounded-2xl bg-white shadow-sm hover-card flex flex-col items-center">
              <div className="w-16 h-16 flex items-center justify-center rounded-full bg-accent/10 text-accent mb-4">
                <Cake className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Premium Ingredients</h3>
              <p className="text-muted-foreground">
                We source only the finest ingredients to ensure exceptional taste and quality in every bite.
              </p>
            </div>

            <div className="text-center p-6 rounded-2xl bg-white shadow-sm hover-card flex flex-col items-center">
              <div className="w-16 h-16 flex items-center justify-center rounded-full bg-accent/10 text-accent mb-4">
                <Coffee className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Handcrafted Daily</h3>
              <p className="text-muted-foreground">
                All our products are made fresh daily by our skilled pastry chefs to ensure freshness.
              </p>
            </div>

            <div className="text-center p-6 rounded-2xl bg-white shadow-sm hover-card flex flex-col items-center">
              <div className="w-16 h-16 flex items-center justify-center rounded-full bg-accent/10 text-accent mb-4">
                <IceCream className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Unique Flavors</h3>
              <p className="text-muted-foreground">
                Explore our wide range of unique and creative flavor combinations that will delight your taste buds.
              </p>
            </div>

            <div className="text-center p-6 rounded-2xl bg-white shadow-sm hover-card flex flex-col items-center">
              <div className="w-16 h-16 flex items-center justify-center rounded-full bg-accent/10 text-accent mb-4">
                <ShoppingBag className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Fast Delivery</h3>
              <p className="text-muted-foreground">
                We ensure quick and safe delivery to preserve the freshness and quality of our sweet treats.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 md:py-24 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="heading-lg mb-4">What Our Customers Say</h2>
            <p className="paragraph max-w-2xl mx-auto">
              Hear from our satisfied customers about their experience with our products
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <div className="bg-white p-6 rounded-2xl shadow-sm hover-card">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-amber-400" fill="currentColor" />
                ))}
              </div>
              <p className="mt-4 text-lg italic">
                "The strawberry cheesecake was absolutely divine! It was creamy, rich, and the perfect balance of sweetness. Will definitely order again."
              </p>
              <div className="mt-6 flex items-center">
                <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
                  <span className="font-medium text-accent">SR</span>
                </div>
                <div className="ml-3">
                  <h4 className="font-medium">Sarah R.</h4>
                  <p className="text-sm text-muted-foreground">Loyal Customer</p>
                </div>
              </div>
            </div>

            {/* Testimonial 2 */}
            <div className="bg-white p-6 rounded-2xl shadow-sm hover-card">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-amber-400" fill="currentColor" />
                ))}
              </div>
              <p className="mt-4 text-lg italic">
                "I ordered a chocolate truffle cake for my anniversary and it was a hit! The presentation was beautiful and the taste was exceptional."
              </p>
              <div className="mt-6 flex items-center">
                <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
                  <span className="font-medium text-accent">MJ</span>
                </div>
                <div className="ml-3">
                  <h4 className="font-medium">Michael J.</h4>
                  <p className="text-sm text-muted-foreground">New Customer</p>
                </div>
              </div>
            </div>

            {/* Testimonial 3 */}
            <div className="bg-white p-6 rounded-2xl shadow-sm hover-card">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-amber-400" fill="currentColor" />
                ))}
              </div>
              <p className="mt-4 text-lg italic">
                "The Greek honey yogurt is my daily breakfast now. It's creamy, not too sweet, and so satisfying. The delivery is always on time too!"
              </p>
              <div className="mt-6 flex items-center">
                <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
                  <span className="font-medium text-accent">AK</span>
                </div>
                <div className="ml-3">
                  <h4 className="font-medium">Amelia K.</h4>
                  <p className="text-sm text-muted-foreground">Regular Customer</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 md:py-24 bg-accent text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="heading-lg mb-6">Ready to Satisfy Your Sweet Cravings?</h2>
          <p className="paragraph text-white/80 max-w-2xl mx-auto mb-8">
            Explore our wide range of delicious sweet treats and place your order today. Delivery available to your doorstep.
          </p>
          <Link to="/products" className="btn-primary bg-white text-accent hover:bg-white/90">
            Shop Now
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
