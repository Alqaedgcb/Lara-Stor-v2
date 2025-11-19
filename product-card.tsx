
'use client';

import Image from 'next/image';
import Link from 'next/link';
import type { Product } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import StarRating from '@/components/star-rating';
import { Heart, ShoppingCart, Sparkles } from 'lucide-react';
import { getPlaceholderImage } from '@/lib/placeholder-images';
import { cn } from '@/lib/utils';
import React from 'react';

interface ProductCardProps {
  product: Product;
  className?: string;
  onTryOn?: (product: Product) => void;
  onAddToCart?: (product: Product) => void;
}

const ProductCard = ({ product, className, onTryOn, onAddToCart }: ProductCardProps) => {
  const imageId = product.imageId || product.image;
  const placeholder = getPlaceholderImage(imageId);
  const productName = product.name || product.title;
  const productPrice = typeof product.price === 'number' ? product.price.toFixed(2) : product.price;
  const productOriginalPrice = typeof product.originalPrice === 'number' ? product.originalPrice.toFixed(2) : product.originalPrice;

  return (
    <div className={cn("group w-full overflow-hidden transition-all duration-300 hover:shadow-xl flex flex-col rounded-lg bg-gradient-to-r from-purple-500 via-fuchsia-500 to-pink-500 hover:to-orange-400 p-0.5", className)}>
        <Card className="flex flex-col flex-grow bg-card text-card-foreground shadow-lg border-0 h-full">
          <CardHeader className="p-0">
            <div className="relative h-40 w-full">
              <Link href={`/product/${product.id}`} className="block h-full w-full">
                {product.videoUrl ? (
                  <video
                    src={product.videoUrl}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105 rounded-t-md"
                  />
                ) : (
                  <>
                    {placeholder && (
                      <Image
                        src={placeholder.imageUrl}
                        alt={productName}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105 rounded-t-md"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        data-ai-hint={placeholder.imageHint}
                      />
                    )}
                  </>
                )}
              </Link>
              <div className="absolute bottom-2 left-1/2 flex w-full -translate-x-1/2 transform justify-center gap-2 opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:bottom-4">
                  <Button variant="secondary" size="icon" className="rounded-full h-10 w-10 shadow-lg bg-gradient-to-r from-orange-500 via-pink-500 to-purple-500 text-white" onClick={() => onTryOn && onTryOn(product)}>
                      <Sparkles />
                  </Button>
                  <Button size="icon" variant="secondary" className="rounded-full h-10 w-10 shadow-lg">
                      <Heart className="h-5 w-5" />
                  </Button>
                   {onAddToCart ? (
                      <Button onClick={() => onAddToCart(product)} size="icon" className="rounded-full h-10 w-10 bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg">
                          <ShoppingCart className="h-5 w-5" />
                      </Button>
                  ) : (
                      <Button asChild size="icon" className="rounded-full h-10 w-10 bg-accent hover:bg-accent/90 shadow-lg">
                          <Link href={`/product/${product.id}`}>
                              <ShoppingCart className="h-5 w-5" />
                          </Link>
                      </Button>
                   )}
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-4 flex-grow flex flex-col bg-card/80 backdrop-blur-sm">
              <span className="text-sm text-muted-foreground">{product.category}</span>
              <CardTitle className="text-lg font.headline mt-1 mb-2 flex-grow">
                <Link href={`/product/${product.id}`} className="hover:text-accent text-foreground">
                  {productName}
                </Link>
              </CardTitle>
              <div className="flex items-center my-2">
                <StarRating rating={product.rating} />
                {product.reviews && <span className="text-xs text-muted-foreground ms-2">({product.reviews})</span>}
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-xl font-bold text-accent">{productPrice} ر.س</span>
                {productOriginalPrice && (
                  <span className="text-sm text-muted-foreground line-through">
                    {productOriginalPrice} ر.س
                  </span>
                )}
              </div>
          </CardContent>
        </Card>
      </div>
  );
};

export default ProductCard;
