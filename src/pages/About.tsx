import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { CartDrawer } from '@/components/CartDrawer';
import { NewsletterSection } from '@/components/NewsletterSection';
import { Mountain, Target, Users, Globe } from 'lucide-react';

const values = [
  {
    icon: Mountain,
    title: 'Altitude Mindset',
    description: 'We believe in pushing beyond perceived limits. Every product is designed for those who refuse to settle.',
  },
  {
    icon: Target,
    title: 'Performance First',
    description: 'Function drives form. Every stitch, every material choice is made to enhance athletic performance.',
  },
  {
    icon: Users,
    title: 'Community Driven',
    description: 'We build with our athletes, not just for them. Their feedback shapes every collection.',
  },
  {
    icon: Globe,
    title: 'Global Vision',
    description: 'From Nepal to the world. We aim to outfit athletes across every continent with premium gear.',
  },
];

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <CartDrawer />

      <main className="pt-24">
        {/* Hero */}
        <section className="py-24 bg-secondary">
          <div className="container-custom">
            <div className="max-w-3xl">
              <p className="text-primary font-medium uppercase tracking-widest mb-4">
                About Altitude Gear
              </p>
              <h1 className="font-display text-5xl md:text-6xl lg:text-7xl mb-6">
                ELEVATION IS IN OUR DNA
              </h1>
              <p className="text-xl text-muted-foreground">
                Founded in the shadow of the Himalayas, Altitude Gear represents the 
                pinnacle of performance sportswear. We don't just make clothes—we 
                forge equipment for those who demand more.
              </p>
            </div>
          </div>
        </section>

        {/* Story */}
        <section className="py-24" id="story">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              <div>
                <h2 className="font-display text-4xl mb-6">OUR ORIGIN STORY</h2>
                <div className="space-y-6 text-muted-foreground">
                  <p>
                    In 2019, a group of mountaineers and athletes gathered in Kathmandu with a shared 
                    frustration: why couldn't they find gear that truly matched their ambition? Existing 
                    brands were either too fashion-focused or lacked the innovation needed for extreme 
                    conditions.
                  </p>
                  <p>
                    That night, around a fire beneath the stars, Altitude Gear was born. The mission 
                    was simple: create performance wear that could withstand the world's highest peaks 
                    while looking sharp on city streets.
                  </p>
                  <p>
                    Today, we work with local Nepali artisans and global material innovators to create 
                    gear that performs at the highest level. Every piece is tested by real athletes in 
                    real conditions—from base camp at Everest to urban training grounds.
                  </p>
                  <p>
                    Our headquarters remain in Kathmandu, where the mountains that inspired us still 
                    serve as our ultimate testing ground. We're proud to be from Nepal, and we're 
                    determined to share the altitude mindset with athletes worldwide.
                  </p>
                </div>
              </div>
              <div className="relative">
                <div className="aspect-[4/5] rounded-lg bg-charcoal overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-electric/10" />
                </div>
                <div className="absolute -bottom-8 -left-8 bg-card border border-border rounded-lg p-8">
                  <div className="grid grid-cols-2 gap-8">
                    <div>
                      <p className="font-display text-4xl text-primary">2019</p>
                      <p className="text-sm text-muted-foreground">Founded</p>
                    </div>
                    <div>
                      <p className="font-display text-4xl text-primary">50+</p>
                      <p className="text-sm text-muted-foreground">Countries</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-24 bg-secondary">
          <div className="container-custom">
            <div className="text-center mb-16">
              <p className="text-primary font-medium uppercase tracking-widest mb-2">
                What We Stand For
              </p>
              <h2 className="font-display text-4xl md:text-5xl">OUR VALUES</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value) => (
                <div key={value.title} className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-6">
                    <value.icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="font-display text-xl mb-3">{value.title}</h3>
                  <p className="text-muted-foreground text-sm">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Mission */}
        <section className="py-24">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto text-center">
              <p className="text-primary font-medium uppercase tracking-widest mb-4">
                Our Mission
              </p>
              <h2 className="font-display text-4xl md:text-5xl lg:text-6xl mb-8">
                TO OUTFIT THE WORLD'S MOST AMBITIOUS ATHLETES
              </h2>
              <p className="text-xl text-muted-foreground">
                Whether you're scaling Everest or crushing your morning run, we build 
                gear for those who believe limits are meant to be broken. This is 
                performance without compromise.
              </p>
            </div>
          </div>
        </section>

        <NewsletterSection />
      </main>

      <Footer />
    </div>
  );
};

export default About;
