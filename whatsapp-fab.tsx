import Link from 'next/link';
import { Whatsapp } from '@/components/icons';

const WhatsAppFab = () => {
  return (
    <div className="fixed bottom-5 start-5 z-50">
      <Link
        href="https://wa.me/967779240291"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="flex h-8 w-8 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform hover:scale-110"
      >
        <Whatsapp className="h-4 w-4" />
      </Link>
    </div>
  );
};

export default WhatsAppFab;
