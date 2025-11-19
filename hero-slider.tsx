'use client';

import React from 'react';
import Image from 'next/image';
import Autoplay from 'embla-carousel-autoplay';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Button } from '@/components/ui/button';
import { heroSlides } from '@/lib/mock-data';
import { getPlaceholderImage } from '@/lib/placeholder-images';
import Link from 'next/link';

export default function HeroSlider() {
  const plugin = React.useRef(
    Autoplay({ delay: 5000, stopOnInteraction: true })
  );

  return (
    <Carousel
      plugins={[plugin.current]}
      className="w-full"
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
      opts={{
        loop: true,
        direction: 'rtl'
      }}
    >
      <CarouselContent className="h-[60vh] md:h-[75vh]">
          <CarouselItem>
              <div className="w-full h-full relative">
                 <video
                  src="/basso.mp4"
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                  <div className="text-center text-white p-4 max-w-2xl space-y-6 animate-fade-in-up">
                    <h1 className="text-4xl md:text-6xl font-bold font-headline">
                      اكتشفي الأناقة في كل حركة
                    </h1>
                    <p className="text-lg md:text-xl">
                      مجموعة أزيائنا الجديدة تجسد الفخامة والرقي.
                    </p>
                    <Button asChild size="lg" className="bg-primary text-primary-foreground text-lg px-8 py-6 rounded-full hover:bg-primary/90">
                      <Link href="/collections">تسوق الآن</Link>
                    </Button>
                  </div>
                </div>
              </div>
            </CarouselItem>
        {heroSlides.map((slide, index) => {
          const image = slide.imageId ? getPlaceholderImage(slide.imageId) : null;
          return (
            <CarouselItem key={index}>
              <div className="w-full h-full relative">
                {slide.videoUrl ? (
                   <video
                    src={slide.videoUrl}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover"
                  />
                ) : image && (
                  <Image
                    src={image.imageUrl}
                    alt={slide.title}
                    fill
                    className="object-cover"
                    data-ai-hint={image.imageHint}
                    priority={index === 0}
                  />
                )}
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                  <div className="text-center text-white p-4 max-w-2xl space-y-6 animate-fade-in-up">
                    <h1 className="text-4xl md:text-6xl font-bold font-headline">
                      {slide.title}
                    </h1>
                    <p className="text-lg md:text-xl">
                      {slide.description}
                    </p>
                    <Button asChild size="lg" className="bg-primary text-primary-foreground text-lg px-8 py-6 rounded-full hover:bg-primary/90">
                      <Link href="/collections">تسوق الآن</Link>
                    </Button>
                  </div>
                </div>
              </div>
            </CarouselItem>
          )
        })}
      </CarouselContent>
      <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 text-white bg-white/20 hover:bg-white/40 border-none" />
      <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 text-white bg-white/20 hover:bg-white/40 border-none" />
    </Carousel>
  );
}
