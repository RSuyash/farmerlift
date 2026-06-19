'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Menu, Phone, Mail, ChevronDown, X } from 'lucide-react';
import { useState, useEffect, ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { ThemeToggle } from '@/components/global/ThemeToggle';
import GoogleTranslate from '@/components/global/GoogleTranslate';
import { motion, AnimatePresence } from 'framer-motion';

type MenuItem = {
  name: string;
  href: string;
};

type DesktopNavDropdownProps = {
  label: string;
  dotColor: string;
  children: ReactNode;
  basePath: string;
  pathname: string;
};

type DropdownLinkProps = {
  href: string;
  children: ReactNode;
  pathname: string;
};

type MobileMenuSectionProps = {
  title: string;
  items: MenuItem[];
  pathname: string;
  setIsMobileMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const DesktopNavLink = ({
  href,
  label,
  pathname,
}: {
  href: string;
  label: string;
  pathname: string;
}) => {
  const isActive = pathname === href;
  return (
    <div className="relative h-full flex items-center">
      <Link
        href={href}
        className={cn(
          'flex items-center gap-1.5 whitespace-nowrap text-[15px] font-medium transition-colors relative group h-full px-4',
          isActive
            ? 'text-emerald-700 dark:text-emerald-400'
            : 'text-gray-600 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400',
        )}
      >
        {label}
        {isActive && (
          <motion.span
            layoutId="activeUnderline"
            className="absolute -bottom-px left-4 right-4 h-0.75 bg-emerald-600 dark:bg-emerald-500 rounded-t-sm"
          />
        )}
      </Link>
    </div>
  );
};

const DesktopNavDropdown = ({
  label,
  dotColor,
  children,
  basePath,
  pathname,
}: DesktopNavDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);

  // Active if current pathname starts with the basePath
  const isActive =
    label === 'Products'
      ? pathname.startsWith('/catalogue') || pathname.startsWith('/products')
      : basePath !== '#' && pathname.startsWith(basePath);

  return (
    <div
      className="relative h-full flex items-center"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <button
        className={cn(
          'flex items-center gap-2 whitespace-nowrap text-[15px] font-medium transition-colors relative group h-full px-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 rounded-md',
          isActive || isOpen
            ? 'text-emerald-700 dark:text-emerald-400'
            : 'text-gray-600 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400',
        )}
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        <div className="flex items-center gap-1.5">
          {/* Micro-Colored Dot Indicator (Nurture.farm pattern) */}
          <span className={cn('w-1.5 h-1.5 rounded-full', dotColor)} />
          {label}
        </div>
        <ChevronDown
          strokeWidth={1.5}
          className={cn(
            'h-3.5 w-3.5 opacity-60 transition-transform duration-300',
            isOpen ? 'rotate-180 opacity-100' : '',
          )}
        />
        {isActive && (
          <motion.span
            layoutId="activeUnderline"
            className="absolute -bottom-px left-4 right-4 h-0.75 bg-emerald-600 dark:bg-emerald-500 rounded-t-sm"
          />
        )}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="absolute top-full left-0 min-w-60 pt-4 z-50"
          >
            <div className="bg-white dark:bg-zinc-900 rounded-xl shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] dark:shadow-none border border-gray-100 dark:border-white/10 overflow-hidden py-3 flex flex-col">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const DropdownLink = ({ href, children, pathname }: DropdownLinkProps) => {
  const isActive = pathname === href;
  return (
    <Link
      href={href}
      className={cn(
        'px-5 py-2.5 text-sm font-medium transition-all mx-2 rounded-lg hover:-translate-y-0.5 hover:bg-gray-50 dark:hover:bg-white/5',
        isActive
          ? 'text-emerald-600 dark:text-emerald-400 bg-emerald-50/50 dark:bg-white/5'
          : 'text-gray-600 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400',
      )}
    >
      {children}
    </Link>
  );
};

const NavDivider = () => (
  <div
    className="h-6 w-px bg-gray-200 dark:bg-white/10 mx-2"
    aria-hidden="true"
  />
);

const MobileMenuSection = ({
  title,
  items,
  pathname,
  setIsMobileMenuOpen,
}: MobileMenuSectionProps) => (
  <div className="flex flex-col gap-1 mb-6">
    <h4 className="text-[11px] font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400 mb-2 px-2">
      {title}
    </h4>
    {items.map((item) => {
      const isActive = pathname === item.href;
      return (
        <Link
          key={item.name}
          href={item.href}
          onClick={() => setIsMobileMenuOpen(false)}
          className={cn(
            'flex items-center justify-between px-4 py-3.5 rounded-xl font-semibold transition-colors active:scale-[0.98]',
            isActive
              ? 'bg-emerald-50 dark:bg-white/5 text-emerald-600 dark:text-emerald-400'
              : 'text-gray-800 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-white/5',
          )}
        >
          {item.name}
        </Link>
      );
    })}
  </div>
);

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Top Bar */}
      <div className="w-full flex flex-col z-51">
        <div className="bg-emerald-950 dark:bg-black border-b border-white/10 text-white py-1.5 text-xs transition-colors duration-300 relative z-51">
          <div className="container-width flex justify-between items-center px-4">
            <div className="flex items-center gap-5 opacity-90 font-medium">
              <a
                href="tel:+918788113105"
                className="flex items-center gap-2 hover:text-emerald-300 transition-colors"
              >
                <Phone className="h-3 w-3" />
                <span>+91 87881-13105</span>
              </a>
              <a
                href="mailto:farmerliftmanagement@gmail.com"
                className="hidden sm:flex items-center gap-2 hover:text-emerald-300 transition-colors"
              >
                <Mail className="h-3 w-3" />
                <span>farmerliftmanagement@gmail.com</span>
              </a>
            </div>
            <div className="flex items-center gap-4">
              <GoogleTranslate className="scale-[0.8] origin-right" />
              <Link
                href="/about"
                className="hover:text-emerald-300 opacity-90 transition duration-300 hover:underline decoration-emerald-400 underline-offset-4 font-medium"
              >
                Company
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <header className="sticky top-0 w-full z-50">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className={cn(
            'w-full transition-all duration-300 border-b',
            isScrolled
              ? 'bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md shadow-sm border-gray-200/50 dark:border-white/10 h-18'
              : 'bg-white dark:bg-zinc-950 border-transparent shadow-none h-22',
          )}
          suppressHydrationWarning
        >
          <div className="container-width flex h-full items-center px-4">
            {/* Left Block: Logo */}
            <div className="flex-1 flex justify-start items-center">
              <Link
                href="/"
                className="flex shrink-0 items-center gap-2 group focus-visible:ring-2 focus-visible:ring-emerald-500 rounded-md"
              >
                <div className="relative h-12 w-14 transition-transform duration-300 group-hover:scale-105">
                  <Image
                    src="/images/farmerlift_icon_transparent.png"
                    alt="FarmerLift Logo"
                    fill
                    className="object-contain object-left"
                    sizes="(max-width: 768px) 48px, 64px"
                    priority
                  />
                </div>
                <div className="flex flex-col" suppressHydrationWarning>
                  <span className="text-[22px] font-bold font-outfit tracking-tight text-gray-900 dark:text-white leading-none">
                    FarmerLift
                  </span>
                </div>
              </Link>
            </div>

            {/* Center Block: Desktop Navigation (Nurture.farm Architecture) */}
            <nav className="hidden lg:flex shrink-0 items-center justify-center h-full relative mx-4">
              <DesktopNavLink href="/" label="Home" pathname={pathname} />

              <NavDivider />

              <DesktopNavDropdown
                label="Products"
                dotColor="bg-emerald-500"
                basePath="/catalogue"
                pathname={pathname}
              >
                <DropdownLink href="/products" pathname={pathname}>
                  All Products
                </DropdownLink>
                <DropdownLink href="/catalogue" pathname={pathname}>
                  Browse Categories
                </DropdownLink>
                <DropdownLink href="/#shop-by-crop" pathname={pathname}>
                  Shop By Crop
                </DropdownLink>
              </DesktopNavDropdown>

              <DesktopNavDropdown
                label="Solutions"
                dotColor="bg-blue-500"
                basePath="/solutions"
                pathname={pathname}
              >
                <DropdownLink href="/about" pathname={pathname}>
                  For Farmers
                </DropdownLink>
                <DropdownLink href="/about" pathname={pathname}>
                  For Dealers
                </DropdownLink>
                <DropdownLink href="/certifications" pathname={pathname}>
                  Certifications
                </DropdownLink>
              </DesktopNavDropdown>

              <DesktopNavDropdown
                label="Partner"
                dotColor="bg-amber-500"
                basePath="/partner"
                pathname={pathname}
              >
                <DropdownLink href="/register" pathname={pathname}>
                  Partner Program
                </DropdownLink>
                <DropdownLink href="/dealer-enquiry" pathname={pathname}>
                  Dealer Enquiry
                </DropdownLink>
              </DesktopNavDropdown>

              <NavDivider />

              <DesktopNavDropdown
                label="Resources"
                dotColor="bg-purple-500"
                basePath="/resources"
                pathname={pathname}
              >
                <DropdownLink href="/blog" pathname={pathname}>
                  Blog
                </DropdownLink>
                <DropdownLink href="/gallery" pathname={pathname}>
                  Gallery
                </DropdownLink>
                <DropdownLink href="/about" pathname={pathname}>
                  About Us
                </DropdownLink>
              </DesktopNavDropdown>
            </nav>

            {/* Right Block: Actions */}
            <div className="flex-1 flex justify-end items-center gap-5">
              <div className="hidden md:block">
                <ThemeToggle />
              </div>

              <Link
                href="/contact"
                className="hidden lg:block focus-visible:ring-2 focus-visible:ring-emerald-500 rounded-full"
              >
                <Button className="whitespace-nowrap bg-emerald-600 hover:bg-emerald-700 text-white font-semibold transition-transform rounded-full px-8 h-11 hover:scale-[1.02] active:scale-[0.98]">
                  Contact Us
                </Button>
              </Link>

              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden relative z-60 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-white/10"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label="Toggle Mobile Menu"
                aria-expanded={isMobileMenuOpen}
              >
                {isMobileMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </Button>
            </div>
          </div>
        </motion.div>
      </header>

      {/* Mobile Menu Overlay & Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-90 bg-black/60 backdrop-blur-sm lg:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />

            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 right-0 z-100 w-[85vw] sm:w-100 bg-white dark:bg-zinc-950 border-l border-gray-100 dark:border-white/10 shadow-2xl lg:hidden flex flex-col"
              role="dialog"
              aria-modal="true"
              aria-label="Mobile Navigation Menu"
            >
              <div className="flex items-center justify-between p-6 border-b border-gray-100 dark:border-white/10 shrink-0">
                <div className="flex items-center gap-3">
                  <div className="relative h-8 w-10">
                    <Image
                      src="/images/farmerlift_icon_transparent.png"
                      alt="Logo"
                      fill
                      className="object-contain"
                      sizes="40px"
                    />
                  </div>
                  <span className="font-bold font-outfit text-xl">Menu</span>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsMobileMenuOpen(false)}
                  aria-label="Close Menu"
                  className="hover:bg-gray-100 dark:hover:bg-white/10"
                >
                  <X className="w-6 h-6" />
                </Button>
              </div>

              <div className="flex-1 overflow-y-auto p-6 flex flex-col">
                <MobileMenuSection
                  title="Explore"
                  items={[
                    { name: 'Home', href: '/' },
                    { name: 'All Products', href: '/products' },
                    { name: 'Shop By Crop', href: '/#shop-by-crop' },
                  ]}
                  pathname={pathname}
                  setIsMobileMenuOpen={setIsMobileMenuOpen}
                />
                <MobileMenuSection
                  title="Solutions"
                  items={[
                    { name: 'For Farmers', href: '/about' },
                    { name: 'For Dealers', href: '/about' },
                    { name: 'Certifications', href: '/certifications' },
                  ]}
                  pathname={pathname}
                  setIsMobileMenuOpen={setIsMobileMenuOpen}
                />
                <MobileMenuSection
                  title="Business"
                  items={[
                    { name: 'Partner Program', href: '/register' },
                    { name: 'Dealer Enquiry', href: '/dealer-enquiry' },
                  ]}
                  pathname={pathname}
                  setIsMobileMenuOpen={setIsMobileMenuOpen}
                />
                <MobileMenuSection
                  title="Resources"
                  items={[
                    { name: 'Blog', href: '/blog' },
                    { name: 'Gallery', href: '/gallery' },
                    { name: 'About Us', href: '/about' },
                  ]}
                  pathname={pathname}
                  setIsMobileMenuOpen={setIsMobileMenuOpen}
                />
              </div>

              <div className="p-6 border-t border-gray-100 dark:border-white/10 space-y-4 bg-gray-50/50 dark:bg-black/20 shrink-0 relative shadow-[0_-8px_16px_-8px_rgba(0,0,0,0.05)] dark:shadow-[0_-8px_16px_-8px_rgba(0,0,0,0.2)]">
                <div className="flex md:hidden items-center justify-between px-2 mb-2">
                  <span className="text-sm font-semibold text-gray-600 dark:text-gray-300">
                    Theme
                  </span>
                  <ThemeToggle />
                </div>

                <div className="flex flex-col gap-3">
                  <Link
                    href="/register"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block focus-visible:ring-2 focus-visible:ring-emerald-500 rounded-xl"
                  >
                    <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold h-12 rounded-xl transition-transform hover:scale-[1.02] active:scale-[0.98]">
                      Join as Partner
                    </Button>
                  </Link>

                  <Link
                    href="/contact"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block focus-visible:ring-2 focus-visible:ring-emerald-500 rounded-xl"
                  >
                    <Button
                      variant="outline"
                      className="w-full border-gray-200 dark:border-white/10 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-white/5 font-semibold h-12 rounded-xl transition-transform hover:scale-[1.02] active:scale-[0.98]"
                    >
                      Contact Us
                    </Button>
                  </Link>
                </div>

                <p className="text-[11px] font-medium text-center text-gray-400 mt-2">
                  © {new Date().getFullYear()} FarmerLift.
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
