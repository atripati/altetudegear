import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import collectionTraining from '@/assets/collection-training.jpg';
import collectionOutdoor from '@/assets/collection-outdoor.jpg';
import collectionEveryday from '@/assets/collection-everyday.jpg';
import collectionLimited from '@/assets/collection-limited.jpg';

const collections = [
  {
    id: 'training',
    name: 'Training Wear',
    description: 'Built for intensity',
    image: collectionTraining,
    href: '/shop?collection=training',
  },
  {
    id: 'outdoor',
    name: 'Outdoor / Trekking',
    description: 'Conquer every trail',
    image: collectionOutdoor,
    href: '/shop?collection=outdoor',
  },
  {
    id: 'everyday',
    name: 'Everyday Performance',
    description: 'Summit to street',
    image: collectionEveryday,
    href: '/shop?collection=everyday',
  },
  {
    id: 'limited',
    name: 'Limited Edition',
    description: 'Exclusive drops',
    image: collectionLimited,
    href: '/shop?collection=limited',
  },
];

export function CollectionsSection() {
  return (
    <section className="py-24 bg-background">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12">
          <div>
            <p className="text-primary font-medium uppercase tracking-widest mb-2">
              Collections
            </p>
            <h2 className="font-display text-4xl md:text-5xl">
              GEAR FOR EVERY PURSUIT
            </h2>
          </div>
          <Link
            to="/collections"
            className="mt-4 md:mt-0 inline-flex items-center gap-2 text-sm font-medium uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors group"
          >
            View All Collections
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {collections.map((collection, index) => (
            <Link
              key={collection.id}
              to={collection.href}
              className="group relative overflow-hidden rounded-lg aspect-[3/4]"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <img
                src={collection.image}
                alt={collection.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
              
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <p className="text-sm text-muted-foreground mb-1">
                  {collection.description}
                </p>
                <h3 className="font-display text-2xl group-hover:text-primary transition-colors">
                  {collection.name}
                </h3>
                <div className="mt-4 flex items-center gap-2 text-sm font-medium uppercase tracking-wider opacity-0 translate-y-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
                  Shop Collection
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
