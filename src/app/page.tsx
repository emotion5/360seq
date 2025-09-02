import Link from 'next/link';
import Image from 'next/image';

const imageSequences = [
  {
    name: 'Drill',
    path: '/drill',
    thumbnail: '/drill-images/drill-01.jpg',
    description: '36-frame drill spin with smooth rotation'
  },
  {
    name: 'Adidas Sneakers',
    path: '/adidas',
    thumbnail: '/adidas-images/adidas-001.jpg',
    description: '71-frame shoe spin with multi-angle view'
  },
  {
    name: 'Jar',
    path: '/jar00',
    thumbnail: '/jar00/jar-001.jpeg',
    description: '3-frame jar rotation with amber theme'
  },
  {
    name: 'Box',
    path: '/box00',
    thumbnail: '/box00/box-001.jpeg',
    description: '4-frame box rotation with blue theme'
  }
];

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-200 p-8">
      <div className="max-w-6xl mx-auto text-center">
        <h1 className="text-4xl font-bold text-slate-800 mb-4">
          360° 제품 뷰어 갤러리
        </h1>
        <p className="text-lg text-slate-600 mb-12">
          마우스 휠과 드래그로 조작할 수 있는 인터랙티브 360도 제품 뷰
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {imageSequences.map((sequence) => (
            <Link 
              key={sequence.name}
              href={sequence.path}
              className="group bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <div className="relative aspect-square">
                <Image
                  src={sequence.thumbnail}
                  alt={sequence.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <h2 className="text-xl font-semibold text-slate-800 mb-2 group-hover:text-blue-600">
                  {sequence.name} 360°
                </h2>
                <p className="text-slate-600 mb-4">
                  {sequence.description}
                </p>
                <div className="text-blue-600 font-medium">
                  데모 보기 →
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-12 text-slate-500 text-sm">
          <p>조작법: 마우스 휠로 회전 • 클릭 드래그로 스핀</p>
        </div>
      </div>
    </div>
  );
}
