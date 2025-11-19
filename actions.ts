"use server";

import { generatePersonalizedRecommendations } from "@/ai/flows/personalized-product-recommendations";
import { allProducts } from "@/lib/data";
import type { Product } from "@/lib/types";

export async function getRecommendedProducts(browsingHistory: string): Promise<Product[]> {
  try {
    const { recommendations } = await generatePersonalizedRecommendations({
      browsingHistory,
    });
    
    if (!recommendations || recommendations.length === 0) {
      return [];
    }

    // Map recommendation names to actual product data
    const recommendedProducts: Product[] = [];
    recommendations.forEach(recName => {
      const foundProduct = allProducts.find(p => p.title.toLowerCase().includes(recName.toLowerCase()));
      if (foundProduct && !recommendedProducts.find(p => p.id === foundProduct.id)) {
        recommendedProducts.push(foundProduct);
      }
    });

    return recommendedProducts.slice(0, 4); // Limit to 4 recommendations
  } catch (error) {
    console.error("Error generating recommendations:", error);
    // Return a default set of products or an empty array on error
    return allProducts.slice(0, 4);
  }
}
