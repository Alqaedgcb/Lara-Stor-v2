import Link from 'next/link';
import { footerLinks, socialLinks, contactInfo } from '@/lib/data';

const Footer = () => {
  return (
    <footer className="bg-white/50 text-foreground backdrop-blur-sm">
      <div className="container mx-auto px-4 pt-16 pb-8">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* About LARA */}
          <div className="md:col-span-2 lg:col-span-1">
            <h3 className="mb-6 font-headline text-xl font-bold after:mt-2 after:block after:h-0.5 after:w-12 after:bg-accent">عن LARA</h3>
            <p className="text-muted-foreground">
              متجر LARA الإلكتروني هو وجهتك الأولى للمجوهرات الفاخرة والساعات النادرة والعطور الراقية. نقدم تشكيلات حصرية تجمع بين الأصالة والأناقة.
            </p>
            <div className="mt-6 flex gap-x-4">
              {socialLinks.map((social) => (
                <Link
                  key={social.name}
                  href={social.href}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-foreground/10 text-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
                  aria-label={social.name}
                >
                  <social.icon className="h-5 w-5" />
                </Link>
              ))}
            </div>
          </div>

          {/* Quick Links & Customer Service */}
          {footerLinks.map((section) => (
            <div key={section.title}>
              <h3 className="mb-6 font-headline text-xl font-bold after:mt-2 after:block after:h-0.5 after:w-12 after:bg-accent">{section.title}</h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.title}>
                    <Link href={link.href} className="text-muted-foreground transition-colors hover:text-accent hover:ps-1">
                      {link.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact Us */}
          <div>
            <h3 className="mb-6 font-headline text-xl font-bold after:mt-2 after:block after:h-0.5 after:w-12 after:bg-accent">اتصل بنا</h3>
            <ul className="space-y-4">
              {contactInfo.map((info) => (
                <li key={info.text} className="flex items-start gap-x-3">
                  <info.icon className="mt-1 h-5 w-5 flex-shrink-0 text-accent" />
                  <span className="text-muted-foreground">{info.text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-border pt-8 text-center text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} LARA - متجر الفخامة والأناقة. جميع الحقوق محفوظة.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
