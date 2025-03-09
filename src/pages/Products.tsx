
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { SlidersHorizontal, X, Check, ChevronDown } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import productsData from '@/data/products.json';

interface Product {
  id: number;
  name: string;
  price: number;
  discountPrice?: number;
  image: string;
  category: string;
  rating: number;
  reviews: number;
  isNew?: boolean;
  isBestSeller?: boolean;
  inStock: boolean;
}

const sortOptions = [
  { label: 'Newest', value: 'newest' },
  { label: 'Price: Low to High', value: 'price_asc' },
  { label: 'Price: High to Low', value: 'price_desc' },
  { label: 'Best Rated', value: 'rating' },
  { label: 'Most Popular', value: 'popularity' },
];

const Products: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  
  // Get filter parameters from URL
  const categoryParam = searchParams.get('category') || '';
  const searchParam = searchParams.get('search') || '';
  const sortParam = searchParams.get('sort') || 'newest';
  const minPriceParam = searchParams.get('minPrice') || '';
  const maxPriceParam = searchParams.get('maxPrice') || '';
  
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<{id: string, name: string}[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>(categoryParam);
  const [searchQuery, setSearchQuery] = useState<string>(searchParam);
  const [sortOption, setSortOption] = useState<string>(sortParam);
  const [priceRange, setPriceRange] = useState<{min: string, max: string}>({
    min: minPriceParam,
    max: maxPriceParam
  });
  const [isFilterMenuOpen, setIsFilterMenuOpen] = useState<boolean>(false);
  
  useEffect(() => {
    // Initialize data
    setProducts(productsData.products);
    setCategories(productsData.categories);
  }, []);
  
  useEffect(() => {
    // Apply filters whenever filter state changes
    applyFilters();
    // Update URL with current filters
    updateUrlParams();
  }, [selectedCategory, searchQuery, sortOption, priceRange, products]);
  
  const updateUrlParams = () => {
    const params = new URLSearchParams();
    
    if (selectedCategory) params.set('category', selectedCategory);
    if (searchQuery) params.set('search', searchQuery);
    if (sortOption !== 'newest') params.set('sort', sortOption);
    if (priceRange.min) params.set('minPrice', priceRange.min);
    if (priceRange.max) params.set('maxPrice', priceRange.max);
    
    const newUrl = `${location.pathname}${params.toString() ? '?' + params.toString() : ''}`;
    navigate(newUrl, { replace: true });
  };
  
  const applyFilters = () => {
    let filtered = [...products];
    
    // Apply category filter
    if (selectedCategory) {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }
    
    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(product => 
        product.name.toLowerCase().includes(query) || 
        product.category.toLowerCase().includes(query)
      );
    }
    
    // Apply price filter
    if (priceRange.min) {
      filtered = filtered.filter(product => {
        const price = product.discountPrice || product.price;
        return price >= parseFloat(priceRange.min);
      });
    }
    
    if (priceRange.max) {
      filtered = filtered.filter(product => {
        const price = product.discountPrice || product.price;
        return price <= parseFloat(priceRange.max);
      });
    }
    
    // Apply sort
    switch (sortOption) {
      case 'price_asc':
        filtered.sort((a, b) => {
          const priceA = a.discountPrice || a.price;
          const priceB = b.discountPrice || b.price;
          return priceA - priceB;
        });
        break;
        
      case 'price_desc':
        filtered.sort((a, b) => {
          const priceA = a.discountPrice || a.price;
          const priceB = b.discountPrice || b.price;
          return priceB - priceA;
        });
        break;
        
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
        
      case 'popularity':
        filtered.sort((a, b) => b.reviews - a.reviews);
        break;
        
      default: // newest
        filtered.sort((a, b) => b.id - a.id);
        break;
    }
    
    setFilteredProducts(filtered);
  };
  
  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategory(categoryId === selectedCategory ? '' : categoryId);
    setIsFilterMenuOpen(false);
  };
  
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };
  
  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOption(e.target.value);
  };
  
  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPriceRange(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleClearFilters = () => {
    setSelectedCategory('');
    setSearchQuery('');
    setSortOption('newest');
    setPriceRange({ min: '', max: '' });
  };
  
  const toggleFilterMenu = () => {
    setIsFilterMenuOpen(!isFilterMenuOpen);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow pt-24">
        {/* Hero Banner */}
        <div className="bg-primary py-12 mb-8">
          <div className="container mx-auto px-4">
            <h1 className="heading-lg mb-4 text-center">Our Products</h1>
            <p className="paragraph text-center max-w-2xl mx-auto">
              Explore our selection of handcrafted sweet treats made with premium ingredients
            </p>
          </div>
        </div>

        <div className="container mx-auto px-4 pb-24">
          {/* Search and Filter Bar */}
          <div className="mb-8 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            {/* Search */}
            <div className="relative max-w-md w-full">
              <input
                type="search"
                placeholder="Search products..."
                className="w-full px-4 py-2 rounded-lg border border-border bg-white focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent transition-colors"
                value={searchQuery}
                onChange={handleSearchChange}
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              {/* Sort Dropdown */}
              <div className="relative">
                <select
                  className="appearance-none px-4 py-2 pr-8 rounded-lg border border-border bg-white focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent transition-colors w-full"
                  value={sortOption}
                  onChange={handleSortChange}
                >
                  {sortOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground pointer-events-none" size={16} />
              </div>

              {/* Filter Button (Mobile) */}
              <button
                onClick={toggleFilterMenu}
                className="flex items-center justify-center px-4 py-2 rounded-lg border border-border bg-white lg:hidden hover:bg-secondary/50 transition-colors"
              >
                <SlidersHorizontal size={16} className="mr-2" />
                Filters
                {(selectedCategory || priceRange.min || priceRange.max) && (
                  <span className="ml-2 h-5 w-5 flex items-center justify-center text-xs bg-accent text-white rounded-full">
                    {[
                      selectedCategory ? 1 : 0,
                      priceRange.min || priceRange.max ? 1 : 0
                    ].reduce((a, b) => a + b, 0)}
                  </span>
                )}
              </button>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Filters Sidebar (Desktop) */}
            <div className="hidden lg:block w-64 shrink-0">
              <div className="bg-white rounded-xl shadow-sm p-6 sticky top-24">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-semibold text-lg">Filters</h3>
                  {(selectedCategory || priceRange.min || priceRange.max) && (
                    <button
                      onClick={handleClearFilters}
                      className="text-sm text-accent hover:text-accent/80 transition-colors"
                    >
                      Clear all
                    </button>
                  )}
                </div>

                {/* Categories */}
                <div className="mb-8">
                  <h4 className="font-medium mb-3">Categories</h4>
                  <ul className="space-y-2">
                    {categories.map(category => (
                      <li key={category.id}>
                        <button
                          onClick={() => handleCategoryChange(category.id)}
                          className={`flex items-center w-full text-left py-1 px-2 rounded-md ${
                            selectedCategory === category.id
                              ? 'bg-accent/10 text-accent font-medium'
                              : 'hover:bg-secondary/50'
                          }`}
                        >
                          <span
                            className={`w-4 h-4 mr-3 rounded-sm border flex items-center justify-center ${
                              selectedCategory === category.id
                                ? 'border-accent bg-accent text-white'
                                : 'border-muted-foreground'
                            }`}
                          >
                            {selectedCategory === category.id && (
                              <Check size={12} />
                            )}
                          </span>
                          {category.name}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Price Range */}
                <div>
                  <h4 className="font-medium mb-3">Price Range</h4>
                  <div className="flex items-center gap-2">
                    <div className="relative flex-1">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                      <input
                        type="number"
                        name="min"
                        placeholder="Min"
                        className="w-full pl-8 pr-2 py-2 rounded-md border border-border"
                        value={priceRange.min}
                        onChange={handlePriceChange}
                        min="0"
                      />
                    </div>
                    <span className="text-muted-foreground">-</span>
                    <div className="relative flex-1">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                      <input
                        type="number"
                        name="max"
                        placeholder="Max"
                        className="w-full pl-8 pr-2 py-2 rounded-md border border-border"
                        value={priceRange.max}
                        onChange={handlePriceChange}
                        min="0"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Product Grid */}
            <div className="flex-1">
              {filteredProducts.length === 0 ? (
                <div className="text-center py-16 bg-white rounded-xl">
                  <h3 className="font-semibold text-xl mb-2">No products found</h3>
                  <p className="text-muted-foreground">
                    Try adjusting your search or filter to find what you're looking for.
                  </p>
                  <button
                    onClick={handleClearFilters}
                    className="mt-4 btn-primary"
                  >
                    Clear Filters
                  </button>
                </div>
              ) : (
                <>
                  <div className="flex justify-between mb-6">
                    <p className="text-muted-foreground">
                      Showing {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'}
                    </p>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredProducts.map(product => (
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
                      />
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Mobile Filter Drawer */}
      <div 
        className={`fixed inset-0 bg-foreground/30 backdrop-blur-sm z-50 transition-opacity lg:hidden ${
          isFilterMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={toggleFilterMenu}
      >
        <div 
          className={`absolute bottom-0 left-0 right-0 bg-background rounded-t-xl max-h-[80vh] overflow-auto transition-transform ${
            isFilterMenuOpen ? 'translate-y-0' : 'translate-y-full'
          }`}
          onClick={e => e.stopPropagation()}
        >
          <div className="sticky top-0 bg-background p-4 border-b border-border flex items-center justify-between">
            <h3 className="font-semibold text-lg">Filters</h3>
            <div className="flex items-center gap-4">
              {(selectedCategory || priceRange.min || priceRange.max) && (
                <button
                  onClick={handleClearFilters}
                  className="text-sm text-accent hover:text-accent/80 transition-colors"
                >
                  Clear all
                </button>
              )}
              <button onClick={toggleFilterMenu} className="btn-icon">
                <X size={20} />
              </button>
            </div>
          </div>
          
          <div className="p-6">
            {/* Categories */}
            <div className="mb-8">
              <h4 className="font-medium mb-3">Categories</h4>
              <ul className="space-y-2">
                {categories.map(category => (
                  <li key={category.id}>
                    <button
                      onClick={() => handleCategoryChange(category.id)}
                      className={`flex items-center w-full text-left py-2 px-3 rounded-md ${
                        selectedCategory === category.id
                          ? 'bg-accent/10 text-accent font-medium'
                          : 'hover:bg-secondary/50'
                      }`}
                    >
                      <span
                        className={`w-5 h-5 mr-3 rounded-sm border flex items-center justify-center ${
                          selectedCategory === category.id
                            ? 'border-accent bg-accent text-white'
                            : 'border-muted-foreground'
                        }`}
                      >
                        {selectedCategory === category.id && (
                          <Check size={14} />
                        )}
                      </span>
                      {category.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Price Range */}
            <div className="mb-8">
              <h4 className="font-medium mb-3">Price Range</h4>
              <div className="flex items-center gap-2">
                <div className="relative flex-1">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                  <input
                    type="number"
                    name="min"
                    placeholder="Min"
                    className="w-full pl-8 pr-2 py-2 rounded-md border border-border"
                    value={priceRange.min}
                    onChange={handlePriceChange}
                    min="0"
                  />
                </div>
                <span className="text-muted-foreground">-</span>
                <div className="relative flex-1">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                  <input
                    type="number"
                    name="max"
                    placeholder="Max"
                    className="w-full pl-8 pr-2 py-2 rounded-md border border-border"
                    value={priceRange.max}
                    onChange={handlePriceChange}
                    min="0"
                  />
                </div>
              </div>
            </div>

            {/* Apply Button */}
            <button
              onClick={toggleFilterMenu}
              className="w-full btn-primary py-3"
            >
              Apply Filters
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Products;
