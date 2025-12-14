import { Mountain, Shield, Compass, Award } from 'lucide-react';

const features = [
  {
    icon: Shield,
    title: 'High Performance',
    description: 'Engineered for extreme conditions with cutting-edge materials and construction.',
  },
  {
    icon: Compass,
    title: 'Tested in Real Conditions',
    description: 'Every piece is tested by athletes on actual expeditions and training sessions.',
  },
  {
    icon: Mountain,
    title: 'Himalayan Heritage',
    description: 'Inspired by Nepal and the world\'s highest peaks. Altitude is in our DNA.',
  },
  {
    icon: Award,
    title: 'Premium Quality',
    description: 'Only the finest materials. Built to last through countless adventures.',
  },
];

export function WhySection() {
  return (
    <section className="py-24 bg-background">
      <div className="container-custom">
        <div className="text-center mb-16">
          <p className="text-primary font-medium uppercase tracking-widest mb-2">
            The Altitude Difference
          </p>
          <h2 className="font-display text-4xl md:text-5xl mb-4">
            WHY ALTITUDE GEAR
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            We don't just make gear. We forge equipment for those who demand more—
            designed in Nepal, tested at altitude, built for performance.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="card-premium p-8 text-center group hover:border-primary/50 transition-colors"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-6 group-hover:bg-primary/20 transition-colors">
                <feature.icon className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-display text-xl mb-3">{feature.title}</h3>
              <p className="text-muted-foreground text-sm">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
