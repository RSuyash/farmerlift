'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

const crops = [
  {
    name: 'Cotton',
    description: 'Protect against bollworms and optimize fiber yield.',
    image:
      'https://images.unsplash.com/photo-1633527992904-53f86f81a23a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Y290dG9ufGVufDB8fDB8fHww',
    link: '/catalogue?crop=cotton',
  },
  {
    name: 'Wheat',
    description: 'Ensure healthy tillering and robust grain filling.',
    image:
      'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?q=80&w=600&auto=format&fit=crop',
    link: '/catalogue?crop=wheat',
  },
  {
    name: 'Rice',
    description: 'Manage pests and maintain optimal paddy health.',
    image:
      'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cmljZXxlbnwwfHwwfHx8MA%3D%3D',
    link: '/catalogue?crop=rice',
  },
  {
    name: 'Sugarcane',
    description: 'Boost cane weight and sugar recovery rates.',
    image:
      'https://images.unsplash.com/photo-1719424668314-a0def541377b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8c3VnYXJjYW5lfGVufDB8fDB8fHww',
    link: '/catalogue?crop=sugarcane',
  },
  {
    name: 'Vegetables',
    description: 'Complete nutrition and protection for high-value veggies.',
    image:
      'https://images.unsplash.com/photo-1610348725531-843dff563e2c?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHZlZ2V0YWJsZXN8ZW58MHx8MHx8fDA%3D',
    link: '/catalogue?crop=vegetables',
  },
  {
    name: 'Fruits',
    description: 'Enhance fruit size, color, and shelf-life.',
    image:
      'https://images.unsplash.com/photo-1610832958506-aa56368176cf?q=80&w=600&auto=format&fit=crop',
    link: '/catalogue?crop=fruits',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
  },
};

export default function ShopByCropSection() {
  return (
    <section
      id="shop-by-crop"
      className="py-24 bg-white dark:bg-black border-y border-zinc-100 dark:border-white/5 overflow-hidden"
    >
      <div className="container-width">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-2xl">
            <span className="text-emerald-700 dark:text-emerald-400 font-bold uppercase tracking-widest text-xs mb-3 block">
              Targeted Solutions
            </span>
            <h2 className="text-3xl md:text-5xl font-bold font-outfit text-zinc-900 dark:text-white mb-6 tracking-tight">
              Shop By{' '}
              <span className="text-emerald-600 dark:text-emerald-500">
                Crop.
              </span>
            </h2>
            <p className="text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Find precisely what you need. Select your crop to view
              scientifically recommended nutrients, protectants, and growth
              regulators.
            </p>
          </div>
          <div className="hidden md:block pb-2">
            <Link
              href="/catalogue"
              className="group flex items-center text-sm font-bold text-emerald-700 dark:text-emerald-400 hover:text-emerald-800 dark:hover:text-emerald-300 transition-colors uppercase tracking-wide"
            >
              View All Products
              <ArrowRight className="ml-2 w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6"
        >
          {crops.map((crop, index) => (
            <motion.div key={index} variants={cardVariants} className="h-full">
              <Link
                href={crop.link}
                className="group relative block h-full rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-zinc-200/50 dark:border-white/10 bg-zinc-50 dark:bg-zinc-900"
              >
                {/* Image Container */}
                <div className="relative aspect-[4/3] w-full overflow-hidden">
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300 z-10" />
                  <Image
                    src={crop.image}
                    alt={crop.name}
                    fill
                    className="object-cover transform group-hover:scale-110 transition-transform duration-700 ease-out"
                    sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 16vw"
                  />
                  <div className="absolute bottom-3 right-3 z-20 bg-white/90 dark:bg-black/50 backdrop-blur-sm p-1.5 rounded-full transform opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                    <ArrowRight className="w-4 h-4 text-emerald-700 dark:text-emerald-400" />
                  </div>
                </div>

                {/* Content */}
                <div className="p-4 flex flex-col">
                  <h3 className="text-lg font-bold font-outfit text-zinc-900 dark:text-white mb-2 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                    {crop.name}
                  </h3>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 line-clamp-2 leading-relaxed">
                    {crop.description}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        <div className="mt-8 text-center md:hidden">
          <Link
            href="/catalogue"
            className="inline-flex items-center justify-center h-12 px-6 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white font-bold hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
          >
            View All Products
          </Link>
        </div>
      </div>
    </section>
  );
}
