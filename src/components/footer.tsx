import Link from 'next/link';

export default function Footer() {
  return (
    <>
      <section id="contact" className="py-section-padding px-gutter max-w-container-max mx-auto text-center flex flex-col items-center justify-center min-h-[50vh]">
        <h2 className="font-headline-lg-mobile text-headline-lg-mobile md:font-headline-lg md:text-headline-lg text-primary mb-8 max-w-2xl mx-auto">
          Reach Me
        </h2>

        <div className="flex gap-6 items-center justify-center flex-wrap">
          {/* GitHub */}
          <Link href="https://github.com/Novo-Codigo" target="_blank" rel="noopener noreferrer" className="p-4 rounded-lg bg-surface border border-gray-400 hover:border-secondary hover:text-secondary transition-all duration-200 flex items-center justify-center text-primary" aria-label="GitHub">
            {/* @ts-ignore */}
            <ion-icon suppressHydrationWarning name="logo-github" class="text-[24px]"></ion-icon>
          </Link>

          {/* LinkedIn */}
          <Link href="https://linkedin.com/in/melosamuel" target="_blank" rel="noopener noreferrer" className="p-4 rounded-lg bg-surface border border-gray-400 hover:border-secondary hover:text-secondary transition-all duration-200 flex items-center justify-center text-primary" aria-label="LinkedIn">
            {/* @ts-ignore */}
            <ion-icon suppressHydrationWarning name="logo-linkedin" class="text-[24px]"></ion-icon>
          </Link>

          {/* Instagram */}
          <Link href="https://instagram.com/novo.codigo" target="_blank" rel="noopener noreferrer" className="p-4 rounded-lg bg-surface border border-gray-400 hover:border-secondary hover:text-secondary transition-all duration-200 flex items-center justify-center text-primary" aria-label="Instagram">
            {/* @ts-ignore */}
            <ion-icon suppressHydrationWarning name="logo-instagram" class="text-[24px]"></ion-icon>
          </Link>

          {/* Whatsapp */}
          <Link href="https://wa.me/5521998837786" target="_blank" rel="noopener noreferrer" className="p-4 rounded-lg bg-surface border border-gray-400 hover:border-secondary hover:text-secondary transition-all duration-200 flex items-center justify-center text-primary" aria-label="WhatsApp">
            {/* @ts-ignore */}
            <ion-icon suppressHydrationWarning name="logo-whatsapp" class="text-[24px]"></ion-icon>
          </Link>

          {/* E-mail */}
          <Link href="mailto:novocodigo@proton.me" className="p-4 rounded-lg bg-surface border border-gray-400 hover:border-secondary hover:text-secondary transition-all duration-200 flex items-center justify-center text-primary" aria-label="E-mail">
            {/* @ts-ignore */}
            <ion-icon suppressHydrationWarning name="mail-outline" class="text-[24px]"></ion-icon>
          </Link>
        </div>
      </section>

      {/* Footer Component */}
      <footer className="bg-surface dark:bg-background text-primary dark:text-on-background font-body-md text-body-md w-full py-section-padding border-t border-border-subtle dark:border-outline-variant shadow-none opacity-80 hover:opacity-100 transition-opacity">
        <div className="flex flex-col md:flex-row justify-between items-center px-gutter max-w-container-max mx-auto gap-stack-gap">
          <div className="select-none text-headline-md font-headline-md font-bold text-primary dark:text-on-background">
            &lt;/Novo Código&gt;
          </div>
          <div className="select-none text-on-surface-variant dark:text-on-tertiary-container text-sm">
            © 2026 Novo Código. All rights reserved.
          </div>
        </div>
      </footer>
    </>
  );
}