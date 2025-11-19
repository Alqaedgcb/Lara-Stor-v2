import { Star, StarHalf, StarOff } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StarRatingProps {
  rating: number;
  maxRating?: number;
  className?: string;
  starClassName?: string;
}

const StarRating = ({
  rating,
  maxRating = 5,
  className,
  starClassName,
}: StarRatingProps) => {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 !== 0;
  const emptyStars = maxRating - fullStars - (halfStar ? 1 : 0);

  return (
    <div className={cn('flex items-center gap-x-0.5 text-yellow-400', className)}>
      {[...Array(fullStars)].map((_, i) => (
        <Star key={`full-${i}`} className={cn('h-4 w-4 fill-current', starClassName)} />
      ))}
      {halfStar && <StarHalf key="half" className={cn('h-4 w-4 fill-current', starClassName)} />}
      {[...Array(emptyStars)].map((_, i) => (
        <Star key={`empty-${i}`} className={cn('h-4 w-4 text-gray-300 fill-current', starClassName)} />
      ))}
    </div>
  );
};

export default StarRating;
