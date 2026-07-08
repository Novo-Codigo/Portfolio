import Image from 'next/image';

export default function Hero() {
  return (
    <section className="py-section-padding px-gutter max-w-container-max mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-stack-gap items-center">
        {/* Left: Content */}
        <div className="md:col-span-6 flex flex-col gap-6 md:pr-12">
          <h1 className="font-headline-lg-mobile text-headline-lg-mobile md:font-headline-lg md:text-headline-lg text-primary" id="init">
            High-Signal Value Proposition
          </h1>
          <p className="font-body-md text-body-md text-on-surface-variant max-w-md">
            Concise, non-exhausting supporting statement. We deliver results without the noise.
          </p>
          <form className="mt-4 flex flex-col sm:flex-row gap-4 w-full max-w-md">
            <div className="flex-grow">
              <label className="sr-only" htmlFor="hero-email">Email address</label>
              <input
                className="w-full bg-transparent border rounded-lg border-gray-400 focus:border-primary py-3 px-2 outline-none font-body-md text-body-md text-on-surface placeholder:text-on-surface-variant transition-colors"
                id="hero-email"
                placeholder="name@company.com"
                required
                type="email"
              />
            </div>
            <button className="bg-primary cursor-pointer text-on-primary font-label-sm text-label-sm px-8 py-3 whitespace-nowrap hover:bg-secondary transition-colors duration-200 rounded-lg" type="submit">
              Start Conversation
            </button>
          </form>
        </div>
        {/* Right: Media */}
        <div className="md:col-span-6 mt-12 md:mt-0 relative aspect-[4/5] bg-surface-muted rounded-DEFAULT overflow-hidden border border-border-subtle">
          <Image
            alt="Founder Portrait"
            className="object-cover w-full h-full rounded-md"
            src="/1000337673.png"
            fill
            priority
          />
        </div>
      </div>
    </section>
  );
}
