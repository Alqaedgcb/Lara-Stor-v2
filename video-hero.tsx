'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import { getPlaceholderImage } from '@/lib/placeholder-images';

export default function ImageHero() {
  const image = getPlaceholderImage('hero-vintage-dress');
  return (
    <div className="relative h-[60vh] w-full overflow-hidden md:h-[75vh]">
      <Image
        src={image.imageUrl}
        alt="اكتشفي الأناقة في كل حركة"
        fill
        className="object-cover"
        priority
        data-ai-hint={image.imageHint}
      />
      <div className="absolute inset-0 flex items-center justify-center bg-black/50">
        <div className="animate-fade-in-up space-y-6 p-4 text-center text-white max-w-2xl">
          <h1 className="font-headline text-4xl font-bold md:text-6xl">
            اكتشفي الأناقة في كل حركة
          </h1>
          <p className="text-lg md:text-xl">
            مجموعة أزيائنا الجديدة تجسد الفخامة والرقي.
          </p>
          <Button
            asChild
            size="lg"
            className="rounded-full bg-primary px-8 py-6 text-lg text-primary-foreground hover:bg-primary/90"
          >
            <Link href="/collections">تسوق الآن</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
