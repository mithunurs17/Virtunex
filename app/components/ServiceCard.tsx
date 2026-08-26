import Image from 'next/image';
import Link from 'next/link';

interface ServiceCardProps {
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  tags: string[];
  href: string;
}

export default function ServiceCard({ title, description, image, imageAlt, tags, href }: ServiceCardProps) {
  return (
    <div className="group relative bg-white/80 backdrop-blur-xl rounded-3xl p-6 md:p-8 shadow-sm border border-white/40 hover:bg-white/90 hover:shadow-lg hover:-translate-y-1 transition-all duration-700 overflow-hidden flex-shrink-0 w-72 md:w-auto">
      {/* Apple-style subtle inner glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent rounded-3xl"></div>
      
      <div className="relative w-full h-36 md:h-52 rounded-2xl overflow-hidden mb-6 md:mb-8">
        <Image
          src={image}
          alt={imageAlt}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/10 via-transparent to-transparent"></div>
        {/* Apple-style subtle overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent"></div>
      </div>
      
      <h3 className="text-xl md:text-2xl font-light text-slate-900 mb-3 tracking-tight">{title}</h3>
      <p className="text-sm md:text-base text-slate-600 mb-6 leading-relaxed font-light">
        {description}
      </p>
      
      <div className="flex flex-wrap gap-2 mb-6">
        {tags.map((tag, index) => (
          <span key={index} className="px-3 py-1.5 bg-slate-50/80 backdrop-blur-sm text-slate-700 text-sm font-medium rounded-full border border-slate-200/30 shadow-sm">
            {tag}
          </span>
        ))}
      </div>
      
      <Link href={href} className="inline-flex items-center text-slate-700 hover:text-slate-900 font-medium group-hover:translate-x-1 transition-all duration-500">
        <span className="mr-2">Explore Service</span>
        <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
        </svg>
      </Link>
    </div>
  );
}
