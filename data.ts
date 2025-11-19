
import type { Product, NavItem, Category, Offer, Feature, FooterLink, SocialLink, ContactInfo, MegaMenuCategory } from './types';
import { Twitter, Instagram, Snapchat } from '@/components/icons';
import { Phone, MapPin, Mail, ShieldCheck, Headset, Undo, Ship } from 'lucide-react';

export const navItems: NavItem[] = [
  { title: 'الرئيسية', href: '/' },
  {
    title: 'فئات المنتجات',
    href: '/products',
    megaMenu: {
      categories: [
        {
          title: 'ملابس',
          subcategories: [
            { name: 'فساتين سهرة', image: 'mega-menu-clothing-1', href: '/products?category=فساتين سهرة' },
            { name: 'ملابس رسمية', image: 'mega-menu-clothing-2', href: '/products?category=ملابس رسمية' },
            { name: 'ملابس كاجوال', image: 'mega-menu-clothing-3', href: '/products?category=ملابس كاجوال' },
            { name: 'ملابس رياضية', image: 'mega-menu-clothing-4', href: '/products?category=ملابس رياضية' },
          ],
        },
        {
          title: 'أحذية',
          subcategories: [
            { name: 'كعب عالي', image: 'mega-menu-shoes-1', href: '/products?category=كعب عالي' },
            { name: 'أحذية رياضية', image: 'mega-menu-shoes-2', href: '/products?category=أحذية رياضية' },
            { name: 'صنادل', image: 'mega-menu-shoes-3', href: '/products?category=صنادل' },
            { name: 'أحذية جلدية', image: 'mega-menu-shoes-4', href: '/products?category=أحذية جلدية' },
          ],
        },
        {
          title: 'حقائب',
          subcategories: [
            { name: 'حقائب يد', image: 'mega-menu-bags-1', href: '/products?category=حقائب يد' },
            { name: 'حقائب ظهر', image: 'mega-menu-bags-2', href: '/products?category=حقائب ظهر' },
            { name: 'حقائب سفر', image: 'mega-menu-bags-3', href: '/products?category=حقائب سفر' },
            { name: 'محافظ', image: 'mega-menu-bags-4', href: '/products?category=محافظ' },
          ],
        },
        {
          title: 'إكسسوارات',
          subcategories: [
            { name: 'مجوهرات', image: 'mega-menu-accessories-1', href: '/products?category=مجوهرات' },
            { name: 'ساعات', image: 'mega-menu-accessories-2', href: '/products?category=ساعات' },
            { name: 'نظارات شمسية', image: 'mega-menu-accessories-3', href: '/products?category=نظارات شمسية' },
            { name: 'أحزمة', image: 'mega-menu-accessories-4', href: '/products?category=أحزمة' },
          ],
        },
      ],
    },
  },
  { title: 'المجموعات الحصرية', href: '/collections' },
  { title: 'الماركات العالمية', href: '/brands' },
  { title: 'من نحن', href: '/about' },
  { title: 'اتصل بنا', href: '/contact' },
];

export const featuredProducts: Product[] = [
  { id: '1', imageId: 'featured-product-1', badge: 'جديد', category: 'مجوهرات', name: 'خاتم الماس LARA الحصري', rating: 4.5, reviews: 120, price: '7,499', originalPrice: '8,999', videoUrl: 'https://videos.pexels.com/video-files/4768853/4768853-hd.mp4' },
  { id: '2', imageId: 'featured-product-2', badge: 'عرض', category: 'ساعات', name: 'ساعة LARA الذهبية الفاخرة', rating: 4.0, reviews: 98, price: '12,999', originalPrice: '15,999' },
  { id: '3', imageId: 'featured-product-3', category: 'عطور', name: 'عطر LARA النادر 100 مل', rating: 5.0, reviews: 215, price: '1,499' },
  { id: '4', imageId: 'featured-product-4', badge: 'الأكثر مبيعاً', category: 'إكسسوارات', name: 'سوار LARA الذهبي الماسي', rating: 4.7, reviews: 150, price: '3,999', originalPrice: '4,599' },
];

export const newArrivals: Product[] = [
  { id: '5', imageId: 'new-arrival-1', badge: 'جديد', category: 'أحذية نسائية', name: 'حذاء كعب عالي - وردي', rating: 4.5, reviews: 45, price: '249', originalPrice: '299' },
  { id: '6', imageId: 'new-arrival-2', badge: 'عرض', category: 'ملابس رجالية', name: 'بليزر كتان بيج', rating: 4.0, reviews: 30, price: '349', originalPrice: '449' },
  { id: '7', imageId: 'new-arrival-3', category: 'ملابس نسائية', name: 'فستان ميدي مطبع بالزهور', rating: 5.0, reviews: 60, price: '299' },
  { id: '8', imageId: 'new-arrival-4', badge: 'الأكثر مبيعاً', category: 'ملابس رجالية', name: 'بنطلون جينز بقصة مستقيمة', rating: 4.7, reviews: 88, price: '199' },
];

export const watches: Product[] = [
  { id: '9', imageId: 'watch-1', badge: 'الأكثر مبيعاً', category: 'ساعات ذكية', name: 'ساعة ذكية S9 الترا', rating: 4.6, reviews: 112, price: '129', originalPrice: '199' },
  { id: '10', imageId: 'watch-2', badge: 'عرض', category: 'ساعات نسائية', name: 'ساعة مايكل كورس ذهبي وردي', rating: 5.0, reviews: 95, price: '450', originalPrice: '650' },
  { id: '11', imageId: 'watch-3', category: 'ساعات كلاسيكية', name: 'ساعة كاسيو بسوار ستانلس ستيل', rating: 4.8, reviews: 180, price: '150' },
  { id: '12', imageId: 'watch-4', badge: 'جديد', category: 'ساعات نسائية', name: 'ساعة جيس بسوار جلدي بني', rating: 4.2, reviews: 40, price: '299' },
];

export const bestSellers: Product[] = [
  { id: '13', imageId: 'bestseller-1', category: 'ساعات', name: 'ساعة LARA الرجالية الكلاسيكية', rating: 4.8, reviews: 200, price: '2,499' },
  { id: '14', imageId: 'bestseller-2', category: 'عطور', name: 'عطر LARA النسائي الفاخر', rating: 4.9, reviews: 180, price: '899' },
  { id: '15', imageId: 'bestseller-3', category: 'حقائب', name: 'حقيبة LARA الجلدية الفاخرة', rating: 4.7, reviews: 130, price: '1,299' },
  { id: '16', imageId: 'bestseller-4', category: 'إكسسوارات', name: 'نظارات LARA الشمسية الفاخرة', rating: 4.6, reviews: 110, price: '599' },
];

export const fashionBestSellers: Product[] = [
  { id: '17', imageId: 'fashion-bestseller-1', category: 'حقائب', name: 'حقيبة يد جلدية - بيج', rating: 4.8, reviews: 90, price: '349' },
  { id: '18', imageId: 'fashion-bestseller-2', category: 'فساتين', name: 'فستان سهرة أسود', rating: 4.9, reviews: 115, price: '499' },
  { id: '19', imageId: 'fashion-bestseller-3', category: 'أحذية رجالية', name: 'حذاء رياضي أبيض', rating: 4.7, reviews: 150, price: '299' },
  { id: '20', imageId: 'fashion-bestseller-4', category: 'إكسسوارات', name: 'نظارات شمسية كلاسيكية', rating: 4.6, reviews: 125, price: '149' },
];

export const womensFashion: Product[] = [
  { id: '21', imageId: 'hero-spring-fashion', category: 'أزياء نسائية', name: 'فستان أنيق من Basso & Brooke', rating: 4.9, reviews: 75, price: '799', videoUrl: 'https://videos.pexels.com/video-files/853874/853874-hd.mp4' },
];

export const mensClothing: Product[] = [
  { id: '22', imageId: 'mens-winter-jacket', category: 'ملابس رجالية', name: 'جاكيت شتوي عالي الجودة للرجال', rating: 4.8, reviews: 135, price: '450', originalPrice: '600' },
];

export const shoes: Product[] = [
  { id: '23', imageId: 'product-sneaker', category: 'أحذية', name: 'حذاء رياضي أنيق للجنسين', rating: 4.7, reviews: 110, price: '350', originalPrice: '450' },
];

export const womensBags: Product[] = [
  { id: '24', imageId: 'womens-bag-1', category: 'حقائب نسائية', name: 'حقيبة جيس برينتون الصغيرة', rating: 4.9, reviews: 85, price: '420', originalPrice: '550' },
];

export const allProducts: Product[] = [
  ...featuredProducts,
  ...newArrivals,
  ...watches,
  ...bestSellers,
  ...fashionBestSellers,
  ...womensFashion,
  ...mensClothing,
  ...shoes,
  ...womensBags,
].map(p => ({ ...p, title: p.name }));

export const categories: Category[] = [
  { title: 'ملابس وأزياء', subtitle: 'أحدث الصيحات', image: 'category-clothing-fashion', href: '/products/fashion' },
  { title: 'فساتين سهرة', subtitle: 'تصاميم حصرية للنساء', image: 'category-1', href: '/products?category=فساتين سهرة' },
  { title: 'مجوهرات Lara', subtitle: 'فخامة تتجاوز الزمن', image: 'lara-jewelry-set', href: '/products?category=مجوهرات' },
  { title: 'ملابس رجالية', subtitle: 'أناقة ورقي للرجال', image: 'category-2', href: '/products?category=ملابس رجالية' },
  { title: 'أحذية', subtitle: 'تصاميم مريحة وعصرية', image: 'category-3', href: '/products?category=أحذية' },
  { title: 'حقائب', subtitle: 'تصاميم عملية وأنيقة', image: 'category-4', href: '/products?category=حقائب' },
];

export const offers: Offer[] = [
  {
    tag: 'عرض خاص',
    title: 'مجموعة المجوهرات الماسية',
    description: 'احصل على خصم 30% على مجموعة المجوهرات الماسية الحصرية من LARA. تشمل الخاتم، الأقراط، والعقد المصنوعة بدقة عالية.',
    price: '10,499',
    originalPrice: '14,999',
    image: 'offer-1',
  },
  {
    tag: 'عرض محدود',
    title: 'ساعة LARA الذهبية الفاخرة',
    description: 'احصل على ساعة LARA الذهبية الفاخرة مع خصم 25% لفترة محدودة. الساعة مصنوعة من الذهب عيار 18 قيراط وتأتي مع ضمان 5 سنوات.',
    price: '11,999',
    originalPrice: '15,999',
    image: 'offer-2',
  },
];

export const features: Feature[] = [
  { icon: Ship, title: 'شحن سريع', description: 'توصيل سريع لجميع أنحاء المملكة خلال 24-48 ساعة' },
  { icon: ShieldCheck, title: 'منتجات أصلية', description: 'جميع منتجاتنا أصلية 100% مع شهادات ضمان' },
  { icon: Headset, title: 'دعم فني 24/7', description: 'فريق دعم فني متاح على مدار الساعة لمساعدتك' },
  { icon: Undo, title: 'إرجاع سهل', description: 'سياسة إرجاع مرنة خلال 14 يوم من تاريخ الشراء' },
];

export const footerLinks: { title: string; links: FooterLink[] }[] = [
  {
    title: 'روابط سريعة',
    links: [
      { title: 'الرئيسية', href: '/' },
      { title: 'من نحن', href: '/about' },
      { title: 'المنتجات', href: '/products' },
      { title: 'المجموعات الحصرية', href: '/collections' },
      { title: 'اتصل بنا', href: '/contact' },
    ],
  },
  {
    title: 'خدمة العملاء',
    links: [
      { title: 'مركز المساعدة', href: '/help' },
      { title: 'شروط الاستخدام', href: '/terms' },
      { title: 'سياسة الخصوصية', href: '/privacy' },
      { title: 'سياسة الإرجاع', href: '/returns' },
      { title: 'الأسئلة الشائعة', href: '/faq' },
    ],
  },
];

export const socialLinks: SocialLink[] = [
  { name: 'Twitter', icon: Twitter, href: '#' },
  { name: 'Instagram', icon: Instagram, href: '#' },
  { name: 'Snapchat', icon: Snapchat, href: '#' },
];

export const contactInfo: ContactInfo[] = [
  { icon: MapPin, text: 'المملكة العربية السعودية - الرياض - حي العليا' },
  { icon: Phone, text: '+967779240291' },
  { icon: Mail, text: 'info@lara-store.com' },
];

export type { MegaMenuCategory };
