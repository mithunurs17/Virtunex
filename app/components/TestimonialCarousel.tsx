'use client';

import { useState, useEffect } from 'react';

interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  avatar: string;
  rating: number;
  content: string;
  tags: string[];
  type: 'client' | 'intern';
  gradient: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "John Smith",
    role: "CEO",
    company: "TechStart Inc.",
    avatar: "J",
    rating: 5,
    content: "Virtunex delivered an exceptional web application that exceeded our expectations. Their team's expertise and attention to detail made the entire process smooth and professional. The final product has significantly improved our business operations and user experience.",
    tags: ["Web Development", "UI/UX Design"],
    type: "client",
    gradient: "from-slate-500 to-slate-600"
  },
  {
    id: 2,
    name: "Sarah Johnson",
    role: "Former Intern",
    company: "Now Full-Stack Developer",
    avatar: "S",
    rating: 5,
    content: "My internship at Virtunex was transformative. Working on real-world projects that are actually deployed gave me the confidence and skills I needed to land my dream job.",
    tags: ["VTU Certified"],
    type: "intern",
    gradient: "from-slate-500 to-slate-600"
  },
  {
    id: 3,
    name: "Maria Rodriguez",
    role: "CTO",
    company: "InnovateCorp",
    avatar: "M",
    rating: 5,
    content: "The cloud migration project was executed flawlessly. Virtunex's expertise in modern technologies and their commitment to quality made them the perfect partner for our digital transformation.",
    tags: ["Cloud Migration"],
    type: "client",
    gradient: "from-slate-500 to-slate-600"
  },
  {
    id: 4,
    name: "Alex Chen",
    role: "Former Intern",
    company: "Now Mobile Developer",
    avatar: "A",
    rating: 5,
    content: "The VTU-recognized certificate and real-world project experience I gained at Virtunex opened so many doors. I now have a portfolio of live projects that employers love to see.",
    tags: ["Live Projects"],
    type: "intern",
    gradient: "from-slate-500 to-slate-600"
  },
  {
    id: 5,
    name: "David Wilson",
    role: "Founder",
    company: "StartupXYZ",
    avatar: "D",
    rating: 5,
    content: "Virtunex helped us build our MVP from scratch. Their team's technical expertise and understanding of startup needs made them the perfect development partner for our journey.",
    tags: ["MVP Development"],
    type: "client",
    gradient: "from-slate-500 to-slate-600"
  },
  {
    id: 6,
    name: "Priya Patel",
    role: "Former Intern",
    company: "Now AI Engineer",
    avatar: "P",
    rating: 5,
    content: "Working on AI/ML projects that are actually deployed in production was incredible. The mentorship and real-world exposure I got here was invaluable for my career growth.",
    tags: ["AI/ML Projects"],
    type: "intern",
    gradient: "from-slate-500 to-slate-600"
  }
];

export default function TestimonialCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % testimonials.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % testimonials.length);
    setIsAutoPlaying(false);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    setIsAutoPlaying(false);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
  };

  return (
    <div className="relative w-full max-w-6xl mx-auto">
      {/* Carousel Container */}
      <div className="relative overflow-hidden rounded-3xl">
        <div 
          className="flex transition-transform duration-1000 ease-out"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {testimonials.map((testimonial, index) => (
            <div key={testimonial.id} className="w-full flex-shrink-0">
              <div className="bg-white/90 rounded-3xl p-12 md:p-16 border border-slate-200/50 relative overflow-hidden group transition-all duration-700 hover:-translate-y-3 hover:bg-white mx-4 shadow-2xl">
                
                {/* Subtle background pattern */}
                <div className="absolute inset-0 opacity-[0.02] bg-[linear-gradient(90deg,transparent_1px,transparent_1px),linear-gradient(180deg,transparent_1px,transparent_1px)] bg-[size:50px_50px]"></div>
                
                {/* Floating accent elements */}
                <div className="absolute top-6 right-6 w-24 h-24 bg-gradient-to-br from-blue-100/20 to-indigo-200/20 rounded-full blur-xl group-hover:scale-110 transition-transform duration-700"></div>
                <div className="absolute bottom-6 left-6 w-32 h-32 bg-gradient-to-br from-indigo-100/20 to-purple-200/20 rounded-full blur-xl group-hover:scale-110 transition-transform duration-700" style={{ animationDelay: '0.5s' }}></div>
                
                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-10">
                    <div className="flex items-center">
                      <div className="w-20 h-20 bg-slate-100 rounded-3xl flex items-center justify-center mr-8 shadow-lg border border-slate-200/50 group-hover:scale-110 transition-transform duration-500">
                        <span className="text-2xl font-medium text-slate-700">{testimonial.avatar}</span>
                      </div>
                      <div>
                        <h4 className="text-3xl md:text-4xl font-light text-slate-900 mb-2 tracking-tight">{testimonial.name}</h4>
                        <p className="text-lg text-slate-600 font-medium mb-3">{testimonial.role}, {testimonial.company}</p>
                        <div className="flex items-center space-x-1">
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <svg key={i} className="w-5 h-5 text-amber-400 fill-current" viewBox="0 0 20 20">
                              <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                            </svg>
                          ))}
                          <span className="ml-2 text-sm text-slate-500 font-medium">{testimonial.rating}.0</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-8xl md:text-9xl bg-gradient-to-r from-slate-300 to-slate-400 bg-clip-text text-transparent font-serif opacity-60 group-hover:opacity-80 transition-opacity duration-500">&ldquo;</div>
                  </div>
                  
                  <p className="text-xl md:text-2xl text-slate-700 leading-relaxed mb-8 font-light">
                    &ldquo;{testimonial.content}&rdquo;
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex space-x-3">
                      {testimonial.tags.map((tag, tagIndex) => (
                        <span key={tagIndex} className="px-4 py-2 bg-slate-100 text-slate-700 text-sm font-medium rounded-full border border-slate-200/50 hover:bg-slate-200 transition-colors duration-300">
                          {tag}
                        </span>
                      ))}
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-slate-400 rounded-full"></div>
                      <span className="text-sm text-slate-500 font-medium capitalize">{testimonial.type}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 w-14 h-14 bg-white/90 rounded-2xl shadow-2xl border border-slate-200/50 flex items-center justify-center text-slate-600 hover:text-slate-900 hover:bg-white transition-all duration-300 hover:scale-110 z-20 hover:shadow-3xl"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 w-14 h-14 bg-white/90 rounded-2xl shadow-2xl border border-slate-200/50 flex items-center justify-center text-slate-600 hover:text-slate-900 hover:bg-white transition-all duration-300 hover:scale-110 z-20 hover:shadow-3xl"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Navigation Dots */}
      <div className="flex justify-center mt-12 space-x-4">
        {testimonials.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-4 h-4 rounded-full transition-all duration-500 ${
              index === currentSlide 
                ? 'bg-slate-600 scale-125 shadow-lg' 
                : 'bg-slate-300 hover:bg-slate-400 hover:scale-110'
            }`}
          />
        ))}
      </div>

      {/* Slide Counter */}
      <div className="text-center mt-6">
        <div className="inline-flex items-center gap-3 bg-white/80 rounded-full px-6 py-3 border border-slate-200/50 shadow-sm">
          <span className="text-sm text-slate-600 font-medium">
            {currentSlide + 1} of {testimonials.length}
          </span>
        </div>
      </div>
    </div>
  );
}
