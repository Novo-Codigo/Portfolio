import Image from 'next/image';
import Link from 'next/link';

export default function Projects() {
  const projects = [
    {
      title: 'Quantum Logistics',
      description: 'Streamlined global supply chain data into a single, high-density terminal interface.',
      img: '',
      alt: 'Quantum Logistics Terminal UI Mockup'
    },
    {
      title: 'Aura Financial',
      description: 'Re-engineered legacy banking workflows to reduce cognitive load by 40%.',
      img: '',
      alt: 'Aura Financial Architectural Diagram'
    },
    {
      title: 'Nexus Health',
      description: 'Deployed a raw, secure patient portal prioritizing immediate action and clarity.',
      img: '',
      alt: 'Nexus Health Mobile UI Mockup'
    }
  ];

  return (
    <section id="projects" className="py-section-padding px-gutter bg-surface-muted border-t border-border-subtle">
      <div className="max-w-container-max mx-auto">
        <div className="mb-12">
          <h2 className="font-headline-md text-headline-md text-primary">Recent Work</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-stack-gap md:gap-gutter">
          {projects.map((project, index) => (
            <Link
              key={index}
              className="group block border border-transparent hover:border-border-subtle transition-colors p-4 -m-4 rounded-lg"
              href="#"
            >
              <div className="aspect-[16/9] bg-surface border border-border-subtle mb-6 overflow-hidden rounded-md relative">
                <Image
                  alt={project.title}
                  className="object-cover w-full h-full opacity-90 group-hover:opacity-100 transition-opacity duration-300 rounded-md"
                  src={project.img}
                  fill
                />
              </div>
              <h3 className="font-headline-md text-headline-md text-primary mb-2 group-hover:text-secondary transition-colors">{project.title}</h3>
              <p className="font-body-md text-body-md text-on-surface-variant">{project.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
