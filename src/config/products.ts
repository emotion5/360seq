export interface ProductConfig {
  name: string;
  path: string;
  imagePath: string;
  imagePrefix: string;
  imageExtension: string;
  totalFrames: number;
  frameDigits: number;
  description: string;
}

export const productConfigs: ProductConfig[] = [
  {
    name: 'Drill',
    path: '/drill',
    imagePath: '/drill-images/',
    imagePrefix: 'drill',
    imageExtension: 'jpg',
    totalFrames: 36,
    frameDigits: 2,
    description: '36-frame drill spin with smooth rotation'
  },
  {
    name: 'Adidas Sneakers',
    path: '/adidas',
    imagePath: '/adidas-images/',
    imagePrefix: 'adidas',
    imageExtension: 'jpg',
    totalFrames: 71,
    frameDigits: 3,
    description: '71-frame shoe spin with multi-angle view'
  },
  {
    name: 'Jar',
    path: '/jar00',
    imagePath: '/jar00/',
    imagePrefix: 'jar',
    imageExtension: 'jpeg',
    totalFrames: 3,
    frameDigits: 3,
    description: '3-frame jar rotation with amber theme'
  },
  {
    name: 'Box',
    path: '/box00',
    imagePath: '/box00/',
    imagePrefix: 'box',
    imageExtension: 'jpeg',
    totalFrames: 4,
    frameDigits: 3,
    description: '4-frame box rotation with blue theme'
  }
];

export const getProductByPath = (path: string): ProductConfig | undefined => {
  return productConfigs.find(product => product.path === path);
};

export const getThumbnailSrc = (product: ProductConfig): string => {
  const frameNumber = '1'.padStart(product.frameDigits, '0');
  return `${product.imagePath}${product.imagePrefix}-${frameNumber}.${product.imageExtension}`;
};