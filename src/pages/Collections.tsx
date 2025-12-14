import { Link } from 'react-router-dom';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { CartDrawer } from '@/components/CartDrawer';
import collectionTraining from '@/assets/collection-training.jpg';
import collectionOutdoor from '@/assets/collection-outdoor.jpg';
import collectionEveryday from '@/assets/collection-everyday.jpg';
import collectionLimited from '@/assets/collection-limited.jpg';
import { ArrowRight } from 'lucide-react';

const collectionsData = [
  {
    id: 'training',
    name: 'Training Wear',
    description: 'Engineered for intensity. Our training collection features moisture-wicking fabrics, ergonomic cuts, and performance-focused design for your toughest workouts.',
    image: collectionTraining,
    href: '/shop?collection=training',
    productCount: 12,
  },
  {
    id: 'outdoor',
    name: 'Outdoor / Trekking',
    description: 'Conquer every trail. Built to withstand extreme conditions, our outdoor collection combines durability with advanced weather protection for mountain adventures.',
    image: collectionOutdoor,
    href: '/shop?collection=outdoor',
    productCount: 18,
  },
  {
    id: 'everyday',
    name: 'Everyday Performance',
    description: 'Summit to street. Athletic comfort meets urban style in our everyday collection—designed for those who don\'t compromise on performance or aesthetics.',
    image: collectionEveryday,
    href: '/shop?collection=everyday',
    productCount: 15,
  },
  {
    id: 'limited',
    name: 'Limited Edition',
    description: 'Exclusive drops. Rare colorways and premium materials come together in our limited collection. Once they\'re gone, they\'re gone.',
    image: collectionLimited,
    href: '/shop?collection=limited',
    productCount: 6,
  },
];

const Collections = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <CartDrawer />

      <main className="pt-24">
        {/* Hero */}
        <section className="py-24 bg-secondary">
          <div className="container-custom">
            <div className="max-w-2xl">
              <p className="text-primary font-medium uppercase tracking-widest mb-4">
                Collections
              </p>
              <h1 className="font-display text-5xl md:text-6xl mb-6">
                GEAR FOR EVERY PURSUIT
              </h1>
              <p className="text-xl text-muted-foreground">
                From intense training sessions to mountain expeditions, each collection 
                is crafted with purpose. Find the gear that matches your ambition.
              </p>
            </div>
          </div>
        </section>

        {/* Collections Grid */}
        <section className="py-24">
          <div className="container-custom">
            <div className="space-y-24">
              {collectionsData.map((collection, index) => (
                <div
                  key={collection.id}
                  className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                    index % 2 === 1 ? 'lg:flex-row-reverse' : ''
                  }`}
                >
                  <Link
                    to={collection.href}
                    className={`relative aspect-[4/3] rounded-lg overflow-hidden group ${
                      index % 2 === 1 ? 'lg:order-2' : ''
                    }`}
                  >
                    <img
                      src={collection.image}
                      alt={collection.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
                  </Link>

                  <div className={index % 2 === 1 ? 'lg:order-1' : ''}>
                    <p className="text-sm text-muted-foreground mb-2">
                      {collection.productCount} Products
                    </p>
                    <h2 className="font-display text-4xl md:text-5xl mb-4">
                      {collection.name.toUpperCase()}
                    </h2>
                    <p className="text-muted-foreground text-lg mb-8">
                      {collection.description}
                    </p>
                    <Link
                      to={collection.href}
                      className="btn-primary rounded-lg group"
                    >
                      Shop Collection
                      <ArrowRight className="inline-block ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Collections;
