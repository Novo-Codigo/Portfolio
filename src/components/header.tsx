import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-surface dark:bg-background text-primary dark:text-on-background font-label-sm text-label-sm w-full top-0 sticky border-b border-border-subtle dark:border-outline-variant flat no shadows z-50">
      <div className="flex justify-between items-center h-20 px-gutter max-w-container-max mx-auto">
        <Link href="/" className="select-none text-headline-md font-headline-md font-bold text-primary dark:text-on-background">
          &lt;/Novo Código&gt;
        </Link>
        <nav className="hidden md:flex items-center gap-8">
          <Link href="#init" className="text-on-surface-variant dark:text-on-tertiary-container hover:text-secondary dark:hover:text-secondary-fixed-dim transition-colors transition-all duration-200 ease-in-out">
            Init
          </Link>
          <Link href="#projects" className="text-on-surface-variant dark:text-on-tertiary-container hover:text-secondary dark:hover:text-secondary-fixed-dim transition-colors transition-all duration-200 ease-in-out">
            Projects
          </Link>
          <Link href="#contact" className="text-on-surface-variant dark:text-on-tertiary-container hover:text-secondary dark:hover:text-secondary-fixed-dim transition-colors transition-all duration-200 ease-in-out">
            Contact
          </Link>
        </nav>
        <button className="hidden cursor-pointer md:block bg-primary text-on-primary font-label-sm text-label-sm px-6 py-3 rounded-lg hover:bg-secondary transition-colors duration-200">
          Get Started
        </button>
        <button aria-label="Menu" className="md:hidden p-2 text-on-surface-variant">
          <span className="material-symbols-outlined">menu</span>
        </button>
      </div>
    </header>
  );
}
