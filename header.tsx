

"use client";

import Link from 'next/link';
import { Search, User, Heart, ShoppingCart, Menu, Camera, Globe, ArrowRight } from 'lucide-react';
import React, { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetClose } from '@/components/ui/sheet';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { navItems } from '@/lib/data';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { useAuth, useUser } from '@/firebase';


const Logo = () => (
    <Link href="/" className="flex items-center" aria-label="Lara e-Store">
      <Image
        src="https://i.ibb.co/MyBhLww6/Logo-Lara.png"
        alt="LARA Store Logo"
        width={140}
        height={71}
        priority
        className="h-auto w-auto"
      />
    </Link>
  );

const SearchBar = () => (
  <div className="animated-gradient-border-search w-full max-w-sm">
    <form action="/search" className="relative flex w-full">
      <Input
        type="search"
        name="q"
        placeholder="ما الذي تبحث عنه؟"
        className="h-7 rounded-full border-0 focus:ring-0 pe-24 bg-background"
      />
      <Button type="button" variant="ghost" size="icon" className="absolute top-0 end-12 h-7 w-7 rounded-none text-muted-foreground hover:bg-transparent">
          <Camera className="h-4 w-4" />
      </Button>
      <Button type="submit" size="icon" className="absolute top-0 end-0 h-7 w-12 rounded-s-none rounded-full bg-muted hover:bg-muted/90">
          <Search className="h-4 w-4 text-primary" />
      </Button>
    </form>
  </div>
);

const HeaderActions = () => {
    const { user, isUserLoading } = useUser();
    const auth = useAuth();

    return (
        <div className="flex items-center gap-x-1">
            {isUserLoading ? (
                 <div className="flex items-center gap-2">
                    <div className="h-6 w-6 rounded-full bg-muted animate-pulse" />
                    <div className="h-6 w-6 rounded-full bg-muted animate-pulse" />
                    <div className="h-6 w-6 rounded-full bg-muted animate-pulse" />
                </div>
            ) : user ? (
                 <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="rounded-full border border-accent h-6 w-6 p-0">
                            <User className="h-3 w-3 text-primary" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56" align="end">
                        <DropdownMenuLabel>مرحباً {user.displayName || user.email}</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem asChild><Link href="/profile">ملفي الشخصي</Link></DropdownMenuItem>
                        <DropdownMenuItem asChild><Link href="/orders">طلباتي</Link></DropdownMenuItem>
                        <DropdownMenuItem asChild><Link href="/wishlist">المفضلة</Link></DropdownMenuItem>
                        <DropdownMenuItem asChild><Link href="/settings/account">الإعدادات</Link></DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => auth.signOut()}>تسجيل الخروج</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            ) : (
                <Button asChild variant="ghost" size="sm" className="rounded-full border border-accent h-6 w-6 p-0">
                    <Link href="/auth">
                      <User className="h-3 w-3" />
                    </Link>
                </Button>
            )}
             <Button asChild variant="ghost" size="sm" className="rounded-full relative border border-accent h-6 w-6 p-0">
                 <Link href="/wishlist">
                    <Heart className="h-3 w-3" />
                    <Badge variant="default" className="absolute top-[-0.6rem] right-[-0.6rem] h-5 w-5 justify-center p-0 rounded-full bg-muted/50 text-primary">5</Badge>
                </Link>
            </Button>
            <Button asChild variant="ghost" size="sm" className="rounded-full relative border border-accent h-6 w-6 p-0">
                <Link href="/cart" >
                    <ShoppingCart className="h-3 w-3" />
                    <Badge variant="default" className="absolute top-[-0.6rem] right-[-0.6rem] h-5 w-5 justify-center p-0 rounded-full bg-muted/50 text-primary">3</Badge>
                </Link>
            </Button>
        </div>
    )
};

const MainNav = () => (
    <nav className="hidden lg:flex items-center gap-2 text-sm font-semibold">
        <NavigationMenu>
            <NavigationMenuList>
                <NavigationMenuItem>
                    <NavigationMenuTrigger className="bg-muted px-4 py-2">
                       <Menu className="me-2" /> جميع الفئات
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                       <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                        {navItems.map((component) => (
                            <ListItem
                            key={component.title}
                            title={component.title}
                            href={component.href}
                            >
                            </ListItem>
                        ))}
                        </ul>
                    </NavigationMenuContent>
                </NavigationMenuItem>
            </NavigationMenuList>
        </NavigationMenu>
        
        {navItems.slice(1, 5).map(item => (
            <Link key={item.title} href={item.href} className="hover:text-accent transition-colors px-3 py-2 rounded-md">{item.title}</Link>
        ))}
    </nav>
);

const SecondaryNav = () => (
     <div className="hidden lg:flex items-center gap-4 text-sm text-muted-foreground">
        <Link href="#" className="hover:text-accent">مركز المساعدة</Link>
        <Link href="#" className="hover:text-accent">كن مورداً</Link>
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                    <Globe className="h-5 w-5" />
                    <span className="sr-only">تغيير اللغة</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuItem>English</DropdownMenuItem>
                <DropdownMenuItem>العربية</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
        <div className="flex items-center gap-2">
            <Image src="https://flagcdn.com/w20/ye.png" alt="Yemen Flag" width={20} height={15} />
            <span>YER</span>
        </div>
    </div>
);


const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"


const MobileNav = () => {
    const { user } = useUser();
    const [isOpen, setIsOpen] = useState(false);

    const mobileNavItems = [
      { title: 'الرئيسية', href: '/' },
      { title: 'جميع الفئات', href: '/products' },
      { title: 'الملف الشخصي', href: '/profile' },
      { title: 'الاعدادات', href: '/settings/account' },
      { title: 'الطلبات', href: '/orders' },
      { title: 'المفضلة', href: '/wishlist' },
      { title: 'آراء عملاءنا', href: '/' },
      { title: 'من نحن', href: '/about' },
      { title: 'خدمة العملاء', href: '/contact' },
      { title: 'إتصل بنا', href: '/contact' },
    ];
    
    return (
     <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="text-primary lg:hidden">
          <Menu className="h-6 w-6" />
          <span className="sr-only">فتح القائمة</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[300px] bg-gradient-to-b from-pink-100 via-white to-cyan-100 p-0 text-black">
        <SheetHeader className="flex flex-row items-center justify-between p-4">
           <SheetTitle className="sr-only">القائمة</SheetTitle>
           <div className="w-24">
             <Logo />
           </div>
           <SheetClose asChild>
             <Button variant="ghost" size="icon">
               <ArrowRight className="h-5 w-5" />
             </Button>
           </SheetClose>
        </SheetHeader>
        <div className="flex h-full flex-col">
          <nav className="flex-1 space-y-2 p-4">
             {!user && (
              <Link href="/auth" onClick={() => setIsOpen(false)} className="block rounded-md px-4 py-2 text-lg font-medium hover:bg-white/50">
                الدخول / إنشاء حساب
              </Link>
            )}
            {mobileNavItems.map((item) => (
              <Link key={item.title} href={item.href} onClick={() => setIsOpen(false)} className="block rounded-md px-4 py-2 text-lg font-medium hover:bg-white/50">
                {item.title}
              </Link>
            ))}
          </nav>
          <div className="border-t p-4">
           <a href="tel:+967779240291" className="flex items-center justify-center gap-x-3 text-gray-700">
              <Globe className="h-5 w-5" />
              <span className="font-semibold">العربية / YER</span>
            </a>
          </div>
        </div>
      </SheetContent>
    </Sheet>
    )
  };


export default function Header() {
  const [showSearchBar, setShowSearchBar] = useState(true);

  useEffect(() => {
    const controlSearchBar = () => {
      if (typeof window !== 'undefined') {
        if (window.scrollY > 0) {
          setShowSearchBar(false);
        } else {
          setShowSearchBar(true);
        }
      }
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', controlSearchBar);

      return () => {
        window.removeEventListener('scroll', controlSearchBar);
      };
    }
  }, []);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/40 bg-gradient-to-l from-[#ffecd2] via-[#ffffff] to-[#e0f2e9]">
      <div className="container mx-auto px-4">
        <div className="flex h-20 items-center justify-between gap-4">
            <div className="lg:hidden">
              <MobileNav />
            </div>
            
            <div className="hidden lg:flex flex-1 items-center justify-center">
                <div className="flex items-center justify-between w-full max-w-7xl">
                    <Logo />
                    <SearchBar />
                    <HeaderActions />
                </div>
            </div>

            <div className="lg:hidden">
                <Logo />
            </div>

            <div className="flex items-center lg:hidden">
              <HeaderActions />
            </div>

        </div>
      </div>
       <div className="hidden lg:flex border-t border-border/40 bg-background/80 backdrop-blur-sm">
        <div className="container mx-auto flex h-12 items-center justify-between px-4">
          <MainNav />
          <SecondaryNav />
        </div>
      </div>
      <div className={cn(
          "lg:hidden container mx-auto px-4 pb-4 transition-all duration-300 ease-in-out",
          showSearchBar ? "max-h-40 opacity-100" : "max-h-0 opacity-0 !p-0 overflow-hidden"
        )}>
          <div className="w-full">
            <SearchBar />
          </div>
      </div>
    </header>
  );
}
