"use client";

import { useEffect, useState } from "react";
import { getRecommendedProducts } from "@/app/actions";
import ProductCard from "./product-card";
import { Skeleton } from "@/components/ui/skeleton";
import type { Product } from "@/lib/types";

const SectionTitle = ({ title, subtitle }: { title: string; subtitle: string }) => (
  <div className="mb-12 text-center">
    <h2 className="mb-4 font-headline text-3xl font-bold text-primary md:text-4xl">{title}</h2>
    <p className="mx-auto max-w-2xl text-muted-foreground">{subtitle}</p>
    <div className="mx-auto mt-6 h-1 w-20 rounded-full bg-accent" />
  </div>
);

const AiRecommendations = () => {
  const [recommendations, setRecommendations] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecommendations = async () => {
      setLoading(true);
      // In a real app, this would come from user's actual browsing history
      const browsingHistory = "diamond ring, gold watch, luxury perfume";
      try {
        const products = await getRecommendedProducts(browsingHistory);
        setRecommendations(products);
      } catch (error) {
        console.error("Failed to fetch AI recommendations:", error);
        // Optionally set some default recommendations on error
      }
      setLoading(false);
    };

    fetchRecommendations();
  }, []);

  return (
    <section className="bg-burgundy py-16 sm:py-24">
      <div className="container mx-auto px-4">
        <SectionTitle
          title="موصى به لك"
          subtitle="منتجات اخترناها بعناية بناءً على اهتماماتك"
        />
        {loading ? (
          <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="space-y-4">
                <Skeleton className="h-[300px] w-full" />
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-8 w-full" />
              </div>
            ))}
          </div>
        ) : recommendations.length > 0 ? (
          <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {recommendations.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
           <div className="text-center text-muted-foreground">
             <p>لم نتمكن من العثور على توصيات لك في الوقت الحالي.</p>
             <p>تصفح المزيد من المنتجات لتلقي توصيات مخصصة.</p>
            </div>
        )}
      </div>
    </section>
  );
};

export default AiRecommendations;
