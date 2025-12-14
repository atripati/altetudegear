import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { CartDrawer } from '@/components/CartDrawer';
import { ProductCard } from '@/components/ProductCard';
import { products, categories, collections } from '@/lib/products';
import { cn } from '@/lib/utils';
import { SlidersHorizontal, X } from 'lucide-react';

const Shop = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState('featured');

  const collectionFilter = searchParams.get('collection');

  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Filter by collection
    if (collectionFilter) {
      result = result.filter(
        (p) => p.collection.toLowerCase() === collectionFilter.toLowerCase()
      );
    }

    // Filter by category
    if (selectedCategory !== 'All') {
      result = result.filter((p) => p.category === selectedCategory);
    }

    // Sort
    switch (sortBy) {
      case 'price-low':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        result = result.filter((p) => p.isNew).concat(result.filter((p) => !p.isNew));
        break;
      default:
        // featured - best sellers first
        result = result.filter((p) => p.isBestSeller).concat(result.filter((p) => !p.isBestSeller));
    }

    return result;
  }, [collectionFilter, selectedCategory, sortBy]);

  const clearFilters = () => {
    setSelectedCategory('All');
    setSearchParams({});
  };

  const hasActiveFilters = selectedCategory !== 'All' || collectionFilter;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <CartDrawer />

      <main className="pt-24">
        {/* Page Header */}
        <section className="py-12 border-b border-border">
          <div className="container-custom">
            <h1 className="font-display text-4xl md:text-5xl mb-2">
              {collectionFilter
                ? collections.find((c) => c.slug === collectionFilter)?.name || 'Shop'
                : 'ALL PRODUCTS'}
            </h1>
            <p className="text-muted-foreground">
              {filteredProducts.length} products
            </p>
          </div>
        </section>

        {/* Filters & Products */}
        <section className="py-12">
          <div className="container-custom">
            {/* Filter Bar */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="inline-flex items-center gap-2 px-4 py-2 border border-border rounded-lg hover:bg-secondary transition-colors"
                >
                  <SlidersHorizontal className="w-4 h-4" />
                  Filters
                </button>

                {hasActiveFilters && (
                  <button
                    onClick={clearFilters}
                    className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <X className="w-4 h-4" />
                    Clear filters
                  </button>
                )}
              </div>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 bg-secondary border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="featured">Featured</option>
                <option value="newest">Newest</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>

            {/* Filter Panel */}
            {showFilters && (
              <div className="mb-8 p-6 bg-secondary rounded-lg animate-fade-in">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Categories */}
                  <div>
                    <h3 className="font-semibold uppercase tracking-wider mb-4">Category</h3>
                    <div className="flex flex-wrap gap-2">
                      {categories.map((category) => (
                        <button
                          key={category}
                          onClick={() => setSelectedCategory(category)}
                          className={cn(
                            'px-4 py-2 rounded-full text-sm transition-colors',
                            selectedCategory === category
                              ? 'bg-primary text-primary-foreground'
                              : 'bg-muted text-muted-foreground hover:text-foreground'
                          )}
                        >
                          {category}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Collections */}
                  <div>
                    <h3 className="font-semibold uppercase tracking-wider mb-4">Collection</h3>
                    <div className="flex flex-wrap gap-2">
                      <button
                        onClick={() => setSearchParams({})}
                        className={cn(
                          'px-4 py-2 rounded-full text-sm transition-colors',
                          !collectionFilter
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-muted text-muted-foreground hover:text-foreground'
                        )}
                      >
                        All
                      </button>
                      {collections.map((collection) => (
                        <button
                          key={collection.id}
                          onClick={() => setSearchParams({ collection: collection.slug })}
                          className={cn(
                            'px-4 py-2 rounded-full text-sm transition-colors',
                            collectionFilter === collection.slug
                              ? 'bg-primary text-primary-foreground'
                              : 'bg-muted text-muted-foreground hover:text-foreground'
                          )}
                        >
                          {collection.name}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Products Grid */}
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <p className="text-xl font-medium mb-2">No products found</p>
                <p className="text-muted-foreground mb-6">
                  Try adjusting your filters to find what you're looking for.
                </p>
                <button onClick={clearFilters} className="btn-primary rounded-lg">
                  Clear Filters
                </button>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Shop;
