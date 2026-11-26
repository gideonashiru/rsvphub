"use client";

import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import appLogo from "@/assets/images/favicon_io/android-chrome-512x512.png";
import { cn } from "@/lib/utils/utils";

interface NavbarProps {
  children: React.ReactNode;
  className?: string;
}

interface NavBodyProps {
  children: React.ReactNode;
  className?: string;
  visible?: boolean;
}

interface NavItemsProps {
  items: {
    name: string;
    link: string;
  }[];
  className?: string;
  onItemClick?: () => void;
}

interface MobileNavProps {
  children: React.ReactNode;
  className?: string;
  visible?: boolean;
}

interface MobileNavHeaderProps {
  children: React.ReactNode;
  className?: string;
}

interface MobileNavMenuProps {
  children: React.ReactNode;
  className?: string;
  isOpen: boolean;
  onClose: () => void;
}

export const Navbar = ({ children, className }: NavbarProps) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const updateVisibility = () => setVisible(window.scrollY > 100);
    updateVisibility();
    window.addEventListener("scroll", updateVisibility, { passive: true });
    return () => window.removeEventListener("scroll", updateVisibility);
  }, []);

  return (
    <div className={cn("fixed inset-x-0 top-20 z-40 w-full", className)}>
      {React.Children.map(children, (child) =>
        React.isValidElement<{ visible?: boolean }>(child)
          ? React.cloneElement(child, { visible })
          : child,
      )}
    </div>
  );
};

export const NavBody = ({ children, className, visible }: NavBodyProps) => (
  <div
    style={{ minWidth: "800px" }}
    className={cn(
      "relative z-[60] mx-auto hidden w-full max-w-7xl flex-row items-center justify-between self-start rounded-full bg-transparent px-4 py-2 transition-all duration-200 lg:flex dark:bg-transparent",
      visible &&
        "translate-y-5 bg-white/80 shadow-md backdrop-blur lg:w-[40%] dark:bg-neutral-950/80",
      className,
    )}
  >
    {children}
  </div>
);

export const NavItems = ({ items, className, onItemClick }: NavItemsProps) => (
  <nav
    className={cn(
      "absolute inset-0 hidden flex-1 flex-row items-center justify-center space-x-2 text-sm font-medium lg:flex",
      className,
    )}
  >
    {items.map((item) => (
      <a
        key={item.link}
        href={item.link}
        onClick={onItemClick}
        className="rounded-full px-4 py-2 text-neutral-600 transition-colors hover:bg-gray-100 hover:text-neutral-900 dark:text-neutral-300 dark:hover:bg-neutral-800 dark:hover:text-white"
      >
        {item.name}
      </a>
    ))}
  </nav>
);

export const MobileNav = ({ children, className, visible }: MobileNavProps) => (
  <div
    className={cn(
      "relative z-50 mx-auto flex w-full max-w-[calc(100vw-2rem)] flex-col items-center justify-between rounded-3xl bg-transparent px-0 py-2 transition-all duration-200 lg:hidden",
      visible &&
        "w-[90%] translate-y-5 bg-white/80 px-3 shadow-md backdrop-blur dark:bg-neutral-950/80",
      className,
    )}
  >
    {children}
  </div>
);

export const MobileNavHeader = ({
  children,
  className,
}: MobileNavHeaderProps) => (
  <div
    className={cn("flex w-full flex-row items-center justify-between", className)}
  >
    {children}
  </div>
);

export const MobileNavMenu = ({
  children,
  className,
  isOpen,
}: MobileNavMenuProps) =>
  isOpen ? (
    <div
      id="mobile-navigation"
      className={cn(
        "absolute inset-x-0 top-16 z-50 flex w-full flex-col items-start justify-start gap-4 rounded-lg bg-white px-4 py-8 shadow-md dark:bg-neutral-950",
        className,
      )}
    >
      {children}
    </div>
  ) : null;

export const MobileNavToggle = ({
  isOpen,
  onClick,
}: {
  isOpen: boolean;
  onClick: () => void;
}) => {
  const Icon = isOpen ? X : Menu;

  return (
    <button
      type="button"
      aria-controls="mobile-navigation"
      aria-expanded={isOpen}
      aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
      onClick={onClick}
      className="inline-flex h-10 w-10 items-center justify-center rounded-md text-foreground hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring lg:hidden"
    >
      <Icon aria-hidden="true" className="h-5 w-5" />
    </button>
  );
};

export const NavbarLogo = () => (
  <Link
    href="/"
    className="relative z-20 mr-4 flex items-center space-x-2 px-2 py-1 text-sm font-normal text-black"
  >
    <Image src={appLogo} alt="RSVP Hub" width={30} height={30} />
    <span className="font-medium text-black dark:text-white">RSVP Hub</span>
  </Link>
);

export const NavbarButton = ({
  href,
  as: Tag = "a",
  children,
  className,
  variant = "primary",
  ...props
}: {
  href?: string;
  as?: React.ElementType;
  children: React.ReactNode;
  className?: string;
  variant?: "primary" | "secondary" | "dark" | "gradient";
} & (
  | React.ComponentPropsWithoutRef<"a">
  | React.ComponentPropsWithoutRef<"button">
)) => {
  const baseStyles =
    "relative inline-block cursor-pointer rounded-md bg-white px-4 py-2 text-center text-sm font-bold text-black transition duration-200 hover:-translate-y-0.5";

  const variantStyles = {
    primary:
      "shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(34,_42,_53,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]",
    secondary: "bg-transparent shadow-none dark:text-white",
    dark: "bg-black text-white shadow-md",
    gradient: "bg-gradient-to-b from-blue-500 to-blue-700 text-white shadow-md",
  };

  return (
    <Tag
      href={href || undefined}
      className={cn(baseStyles, variantStyles[variant], className)}
      {...props}
    >
      {children}
    </Tag>
  );
};
