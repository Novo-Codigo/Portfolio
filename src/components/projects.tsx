'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { Link } from '@/i18n/navigation';

export default function Projects() {
  const projects = [
    {
      title: 'Nix - Gestão Eleitoral',
      description: 'An elegant, secure, and user-friendly app designed for managing Brazilian political campaigns effortlessly.',
      img: '/mockups/nix/nix.png',
      gallery: [
        '/mockups/nix/h1.png',
        '/mockups/nix/list.png',
        '/mockups/nix/calendar.png',
        '/mockups/nix/financial.png',
        '/mockups/nix/campaign.png',
        '/mockups/nix/notifications.png',
      ],
      alt: 'Electoral app UI mockup',
      link: 'https://nix-gestao-eleitoral.vercel.app/'
    },
    {
      title: 'Click Cidadão',
      description: 'A digital democracy platform uniting political transparency, public spending oversight, and citizen oversight in one place.',
      img: '/mockups/clickcidadao/clickcidadao.png',
      gallery: [
        '/mockups/clickcidadao/h1.png',
        '/mockups/clickcidadao/h2.png',
        '/mockups/clickcidadao/h3.png',
        '/mockups/clickcidadao/hc1.png',
        '/mockups/clickcidadao/hc2.png',
        '/mockups/clickcidadao/info.png',
        '/mockups/clickcidadao/gps.png',
      ],
      alt: 'Mockup of a digital democracy and citizen complaint app.',
      link: '#'
    },
    {
      title: 'CarnavalRio',
      description: 'A complete digital guide for Brazilian Carnival featuring real-time block tracking, event schedules, and safety alerts.',
      img: '/mockups/carnavalrio/carnavalrio.png',
      gallery: [
        '/mockups/coming-soon.jpg'
      ],
      alt: 'UI mockup of a Brazilian Carnival app showing street block schedules and maps.',
      link: '#'
    }
  ];

  const [activeIndex, setActiveIndex] = useState(0);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [selectedGalleryIndex, setSelectedGalleryIndex] = useState(0);

  useEffect(() => {
    if (isGalleryOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isGalleryOpen]);

  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);
  const minSwipeDistance = 50;

  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % projects.length);
  };

  const prevSlide = () => {
    setActiveIndex((prev) => (prev - 1 + projects.length) % projects.length);
  };

  const onTouchStart = (e: React.TouchEvent) => {
    touchEndX.current = null;
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const onTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const onTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const distance = touchStartX.current - touchEndX.current;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      nextSlide();
    } else if (isRightSwipe) {
      prevSlide();
    }
  };

  const getSlideStyle = (index: number) => {
    let offset = index - activeIndex;

    if (offset < -1) offset += projects.length;
    if (offset > 1) offset -= projects.length;

    const isActive = offset === 0;
    const isLeft = offset === -1;
    const isRight = offset === 1;

    let transform = '';
    if (isActive) {
      transform = 'translate3d(0, 0, 0) scale(1) rotateY(0deg)';
    } else if (isLeft) {
      transform = 'translate3d(-28%, 0, -150px) scale(0.8) rotateY(20deg)';
    } else if (isRight) {
      transform = 'translate3d(28%, 0, -150px) scale(0.8) rotateY(-20deg)';
    } else {
      transform = 'translate3d(0, 0, -300px) scale(0.5)';
    }

    return {
      transform,
      zIndex: isActive ? 10 : 5,
      opacity: isActive ? 1 : 0.45,
      filter: isActive ? 'none' : 'blur(4px)',
      transition: 'all 500ms cubic-bezier(0.25, 1, 0.5, 1)',
    };
  };

  return (
    <section id="projects" className="py-section-padding px-gutter bg-surface-muted border-t border-border-subtle overflow-hidden">
      <div className="max-w-container-max mx-auto relative">
        <div className="mb-12 text-center">
          <h2 className="font-headline-md text-headline-md text-primary">Recent Work</h2>
        </div>

        {/* Carousel Container */}
        <div className="relative w-full max-w-[650px] aspect-[16/9] mx-auto flex items-center justify-center my-6">
          {/* Navigation Arrows for Desktop */}
          <button
            onClick={prevSlide}
            className="absolute -left-12 lg:-left-20 z-20 flex items-center justify-center w-12 h-12 rounded-full border border-border-subtle bg-surface hover:bg-surface-variant text-on-surface shadow-md hover:shadow-lg transition-all duration-300 md:flex hidden cursor-pointer"
            aria-label="Previous project"
          >
            <span className="material-symbols-outlined font-semibold text-lg">chevron_left</span>
          </button>

          <button
            onClick={nextSlide}
            className="absolute -right-12 lg:-right-20 z-20 flex items-center justify-center w-12 h-12 rounded-full border border-border-subtle bg-surface hover:bg-surface-variant text-on-surface shadow-md hover:shadow-lg transition-all duration-300 md:flex hidden cursor-pointer"
            aria-label="Next project"
          >
            <span className="material-symbols-outlined font-semibold text-lg">chevron_right</span>
          </button>

          {/* Carousel Track with 3D Perspective */}
          <div
            className="relative w-full h-full overflow-visible"
            style={{ perspective: '1200px' }}
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
          >
            <div className="relative w-full h-full" style={{ transformStyle: 'preserve-3d' }}>
              {projects.map((project, index) => {
                const style = getSlideStyle(index);
                const isActive = index === activeIndex;

                const slideContent = (
                  <div className="group relative w-full h-full rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-300">
                    <Image
                      alt={project.alt}
                      className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                      src={project.img}
                      fill
                      style={{ objectFit: 'contain' }}
                      priority={isActive}
                    />

                    {/* Darkening Overlay & Zoom Icon for Active slide */}
                    {isActive && (
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center">
                        <div className="opacity-0 group-hover:opacity-100 flex items-center justify-center w-14 h-14 rounded-full bg-surface/90 hover:bg-surface border border-border-subtle text-on-surface shadow-lg scale-90 group-hover:scale-100 transition-all duration-300">
                          <span className="material-symbols-outlined font-semibold text-2xl text-primary">zoom_in</span>
                        </div>
                      </div>
                    )}
                  </div>
                );

                return (
                  <div
                    key={index}
                    className="absolute inset-0 w-full h-full cursor-pointer"
                    style={style}
                    onClick={() => {
                      if (!isActive) {
                        setActiveIndex(index);
                      } else {
                        setIsGalleryOpen(true);
                        setSelectedGalleryIndex(0);
                      }
                    }}
                  >
                    {slideContent}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Index Indicator Dots */}
        <div className="flex justify-center gap-2 mt-8">
          {projects.map((_, index) => {
            const isActive = index === activeIndex;
            return (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 cursor-pointer ${isActive ? 'bg-[#172554] scale-110' : 'bg-black/30 hover:bg-black/50'
                  }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            );
          })}
        </div>

        {/* Dynamic Project Details Below */}
        <div
          key={activeIndex}
          className="text-center mt-10 max-w-xl mx-auto min-h-[120px] animate-fade-in"
        >
          <h3 className="font-headline-md text-headline-md text-primary mb-3">
            {projects[activeIndex].title}
          </h3>
          <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
            {projects[activeIndex].description}
          </p>
        </div>

        {/* Immersive Gallery Overlay (Modal) */}
        {isGalleryOpen && (
          <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex flex-col items-center justify-between p-6 md:p-10 animate-fade-in text-white overflow-y-auto">
            {/* Header */}
            <div className="w-full max-w-5xl flex items-center justify-between border-b border-white/10 pb-4">
              <h3 className="font-headline-md text-headline-md text-white">
                {projects[activeIndex].title} — Gallery
              </h3>
              <button
                onClick={() => setIsGalleryOpen(false)}
                className="flex items-center justify-center w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all duration-300 cursor-pointer"
                aria-label="Close gallery"
              >
                <span className="material-symbols-outlined font-semibold">close</span>
              </button>
            </div>

            {/* Main Viewer Area */}
            <div className="relative w-full max-w-4xl aspect-[16/9] flex items-center justify-center my-auto">
              <Image
                alt={`${projects[activeIndex].title} view ${selectedGalleryIndex + 1}`}
                src={projects[activeIndex].gallery[selectedGalleryIndex]}
                fill
                className="object-contain transition-all duration-500 rounded-lg"
                sizes="(max-w-768px) 100vw, 1200px"
                priority
              />
            </div>

            {/* Bottom Controls Area */}
            <div className="w-full max-w-5xl flex flex-col md:flex-row items-center justify-between gap-6 border-t border-white/10 pt-6">
              {/* Thumbnail Selector */}
              <div className="flex gap-3 overflow-x-auto py-1">
                {projects[activeIndex].gallery.map((imagePath, index) => {
                  const isSelected = index === selectedGalleryIndex;
                  return (
                    <button
                      key={index}
                      onClick={() => setSelectedGalleryIndex(index)}
                      className={`relative w-20 aspect-[16/9] rounded-md overflow-hidden border-2 transition-all duration-300 cursor-pointer ${isSelected
                        ? 'border-[#172554] scale-105 shadow-md shadow-[#172554]/50'
                        : 'border-white/20 hover:border-white/50 opacity-60 hover:opacity-100'
                        }`}
                    >
                      <Image
                        alt={`Thumbnail ${index + 1}`}
                        src={imagePath}
                        fill
                        className="object-cover"
                      />
                    </button>
                  );
                })}
              </div>

              {/* About Button Routing to localized link */}
              <Link
                href={projects[activeIndex].link}
                onClick={(e) => {
                  if (projects[activeIndex].link === '#') {
                    e.preventDefault();
                  } else {
                    setIsGalleryOpen(false);
                  }
                }}
                className={`px-8 py-3 rounded-full font-semibold shadow-md transition-all duration-300 flex items-center gap-2 shrink-0 ${
                  projects[activeIndex].link === '#'
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed opacity-70'
                    : 'bg-white hover:bg-gray-100 text-black hover:shadow-lg cursor-pointer'
                }`}
                aria-disabled={projects[activeIndex].link === '#'}
                tabIndex={projects[activeIndex].link === '#' ? -1 : 0}
              >
                <span>About</span>
                <span className="material-symbols-outlined text-sm font-bold">arrow_forward</span>
              </Link>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
