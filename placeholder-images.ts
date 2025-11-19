import data from './placeholder-images.json';

export type ImagePlaceholder = {
  id: string;
  description: string;
  imageUrl: string;
  imageHint: string;
};

export const placeholderImages: ImagePlaceholder[] = data.placeholderImages;

const placeholderImageMap = new Map(placeholderImages.map(p => [p.id, p]));

const defaultPlaceholder: ImagePlaceholder = {
    id: 'default',
    description: 'Default placeholder image',
    imageUrl: 'https://picsum.photos/seed/default/600/400',
    imageHint: 'placeholder'
};

export function getPlaceholderImage(id: string): ImagePlaceholder {
    return placeholderImageMap.get(id) || defaultPlaceholder;
}
