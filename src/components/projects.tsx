import Image from 'next/image';
import Link from 'next/link';

export default function Projects() {
  const projects = [
    {
      title: 'Nix - Gestão Eleitoral',
      description: 'An elegant, secure, and user-friendly app designed for managing Brazilian political campaigns effortlessly.',
      img: '/nix.png',
      alt: 'Electoral app UI mockup'
    },
    {
      title: 'Click Cidadão',
      description: 'A digital democracy platform uniting political transparency, public spending oversight, and citizen oversight in one place.',
      img: '/click-cidadao.png',
      alt: 'Mockup of a digital democracy and citizen complaint app.'
    },
    {
      title: 'CarnavalRio',
      description: 'A complete digital guide for Brazilian Carnival featuring real-time block tracking, event schedules, and safety alerts.',
      img: '/carnavalrio.png',
      alt: 'UI mockup of a Brazilian Carnival app showing street block schedules and maps.'
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
