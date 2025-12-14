import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export function BrandStorySection() {
  return (
    <section className="py-24 bg-secondary">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-primary font-medium uppercase tracking-widest mb-2">
              Our Story
            </p>
            <h2 className="font-display text-4xl md:text-5xl mb-6">
              BORN IN THE SHADOW OF EVEREST
            </h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                Altitude Gear was founded in Nepal, where the world's highest peaks 
                serve as both inspiration and testing ground. Our founders, seasoned 
                mountaineers and athletes, saw a gap in the market for performance 
                gear that could truly withstand extreme conditions.
              </p>
              <p>
                Every piece we create is rooted in the principles of altitude training: 
                discipline, endurance, and the relentless pursuit of elevation. We design 
                for those who refuse to accept limits—whether scaling a Himalayan peak 
                or crushing a personal record.
              </p>
              <p>
                From our headquarters in Kathmandu, we work with local artisans and 
                global material innovators to create gear that performs at the highest 
                level. This is not mass-market fashion. This is purpose-driven equipment 
                for those who demand more.
              </p>
            </div>
            <Link
              to="/about"
              className="inline-flex items-center gap-2 mt-8 text-sm font-medium uppercase tracking-wider text-foreground hover:text-primary transition-colors group"
            >
              Read Our Full Story
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          <div className="relative">
            <div className="aspect-square rounded-lg overflow-hidden bg-charcoal">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-electric/10" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <p className="font-display text-8xl md:text-9xl text-foreground/10">8849</p>
                  <p className="text-sm uppercase tracking-widest text-muted-foreground">
                    Meters of Inspiration
                  </p>
                </div>
              </div>
            </div>
            
            {/* Stats */}
            <div className="absolute -bottom-8 -left-8 bg-card border border-border rounded-lg p-6">
              <p className="font-display text-4xl text-primary">2019</p>
              <p className="text-sm text-muted-foreground">Founded in Kathmandu</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
