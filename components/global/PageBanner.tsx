
import Image from 'next/image';

interface PageBannerProps {
    heading: string;
    subtext?: string;
    image: string;
}

export default function PageBanner({ heading, subtext, image }: PageBannerProps) {
    return (
        <section className="relative h-[40vh] min-h-[350px] w-full bg-zinc-900 flex items-center justify-center overflow-hidden">
            <Image
                src={image}
                alt={heading}
                fill
                className="object-cover opacity-50"
                priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />

            <div className="relative z-10 container-width text-center px-4">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-outfit text-white mb-4 animate-in slide-in-from-bottom-4 duration-700">
                    {heading}
                </h1>
                {subtext && (
                    <p className="text-lg md:text-xl text-zinc-200 max-w-2xl mx-auto animate-in slide-in-from-bottom-5 duration-700 delay-100">
                        {subtext}
                    </p>
                )}
            </div>
        </section>
    );
}
