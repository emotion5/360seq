import SpinViewer from '@/components/SpinViewer';
import { getProductByPath } from '@/config/products';

export default function Box00Page() {
  const product = getProductByPath('/box00');
  
  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <SpinViewer
      imagePath={product.imagePath}
      totalFrames={product.totalFrames}
      imagePrefix={product.imagePrefix}
      imageExtension={product.imageExtension}
      productName={product.name}
      frameDigits={product.frameDigits}
    />
  );
}