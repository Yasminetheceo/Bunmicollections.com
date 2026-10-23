import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Navbar from '../../components/feature/Navbar';
import Footer from '../../components/feature/Footer';
import ShopHero from './components/ShopHero';
import ShopFilters from './components/ShopFilters';
import ShopGrid from './components/ShopGrid';

interface ShopifyProduct {
  id: string;
  category: string;
  texture: string;
  [key: string]: unknown;
}

const ShopPage = () => {
  const [searchParams] = useSearchParams();
  const [activeFilter, setActiveFilter] = useState('All');
  const [activeTexture, setActiveTexture] = useState('All');
  const [sortBy, setSortBy] = useState('featured');
  const [allProducts, setAllProducts] = useState<ShopifyProduct[]>([]);

  useEffect(() => {
    const category = searchParams.get('category');
    const texture = searchParams.get('texture');
    if (category) {
      setActiveFilter(category);
      setActiveTexture('All');
    } else if (texture) {
      setActiveTexture(texture);
      setActiveFilter('All');
    }
  }, [searchParams]);

  const filteredCount = allProducts.filter((p) => {
    const matchCategory = activeFilter === 'All' || p.category === activeFilter;
    const matchTexture = activeTexture === 'All' || p.texture === activeTexture;
    return matchCategory && matchTexture;
  }).length;

  return (
    <div className="min-h-screen bg-[#FAF8F5]">
      <Navbar />
      <ShopHero />
      <ShopFilters
        activeFilter={activeFilter}
        onFilterChange={(f) => { setActiveFilter(f); setActiveTexture('All'); }}
        activeTexture={activeTexture}
        onTextureChange={(t) => { setActiveTexture(t); setActiveFilter('All'); }}
        sortBy={sortBy}
        onSortChange={setSortBy}
        productCount={filteredCount}
      />
      <ShopGrid
        activeFilter={activeFilter}
        activeTexture={activeTexture}
        sortBy={sortBy}
        onProductsLoaded={(products) => setAllProducts(products as ShopifyProduct[])}
      />
      <Footer />
    </div>
  );
};

export default ShopPage;
