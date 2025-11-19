
import type { LucideIcon, LucideProps } from "lucide-react";

export type Product = {
  id: string;
  image?: string; // Kept for backward compatibility
  imageId?: string; // Preferred way to reference images
  badge?: string;
  category: string;
  name: string; // Changed from title to name for consistency
  rating: number;
  reviews: number;
  price: string | number;
  originalPrice?: string | number;
  videoUrl?: string; // Add videoUrl to Product type
  title?: string; // Kept for backward compatibility
};

export type NavItem = {
  title: string;
  href: string;
  megaMenu?: MegaMenu;
};

export type MegaMenu = {
  categories: MegaMenuCategory[];
};

export type MegaMenuCategory = {
  title: string;
  subcategories: {
    name: string;
    image: string;
    href: string;
  }[];
};

export type Category = {
  title: string;
  subtitle: string;
  image: string;
  href: string;
};

export type Offer = {
  tag: string;
  title: string;
  description: string;
  price: string;
  originalPrice: string;
  image: string;
};

export type Feature = {
  icon: React.ForwardRefExoticComponent<Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>;
  title: string;
  description: string;
};

export type FooterLink = {
  title: string;
  href: string;
};

export type SocialLink = {
  name: string;
  icon: (props: React.SVGProps<SVGSVGElement>) => JSX.Element;
  href: string;
};

export type ContactInfo = {
  icon: React.ForwardRefExoticComponent<Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>;
  text: string;
};

export type HeroSlide = {
  id: number;
  title: string;
  description: string;
  imageId?: string;
  videoUrl?: string;
};
