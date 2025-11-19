import { getPlaceholderImage } from '@/lib/placeholder-images';
import Image from 'next/image';

const AboutPage = () => {
  return (
    <div className="bg-background text-foreground">
      <div className="container mx-auto px-4 py-16 sm:py-24">
        <div className="mb-12 text-center">
          <h1 className="mb-4 font-headline text-4xl font-bold text-primary md:text-5xl">
            عن LARA
          </h1>
          <p className="mx-auto max-w-3xl text-lg text-muted-foreground">
            قصة من الشغف والجمال والفخامة، ولدت لتصنع فرقًا في عالم الأناقة.
          </p>
          <div className="mx-auto mt-6 h-1 w-24 rounded-full bg-accent" />
        </div>

        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 md:items-center lg:gap-24">
          <div className="relative h-96 overflow-hidden rounded-lg shadow-lg md:h-[500px]">
            <Image
              src={getPlaceholderImage('bestseller-3').imageUrl}
              alt="ورشة عمل LARA"
              fill
              className="object-cover"
              data-ai-hint="jewelry workshop"
            />
          </div>
          <div>
            <h2 className="mb-6 font-headline text-3xl font-bold text-primary">
              مهمتنا
            </h2>
            <p className="mb-6 text-lg leading-relaxed text-foreground/80">
              في LARA، نؤمن بأن كل قطعة مجوهرات هي عمل فني يروي قصة. مهمتنا هي
              تقديم تصاميم فريدة تجمع بين الحرفية التقليدية واللمسات العصرية،
              لنعكس جمالك الداخلي ونبرز أناقتك في كل مناسبة.
            </p>
            <p className="text-lg leading-relaxed text-foreground/80">
              نحن نسافر حول العالم بحثًا عن أجود المواد وأندر الأحجار الكريمة
              لنصنع لك قطعًا تتجاوز الزمن وتحكي قصة إرث عائلي تنتقل من جيل إلى
              جيل.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
