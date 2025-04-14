// Type declarations for Next.js modules

declare module 'next/link' {
  import { ComponentType, ReactNode } from 'react';

  export interface LinkProps {
    href: string;
    as?: string;
    replace?: boolean;
    scroll?: boolean;
    shallow?: boolean;
    passHref?: boolean;
    prefetch?: boolean;
    locale?: string | false;
    className?: string;
    onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
    children?: ReactNode;
  }

  const Link: ComponentType<LinkProps>;
  export default Link;
}

declare module 'next/image' {
  import { ComponentType, ReactNode } from 'react';

  export interface ImageProps {
    src: string;
    alt: string;
    width?: number;
    height?: number;
    fill?: boolean;
    sizes?: string;
    quality?: number;
    priority?: boolean;
    placeholder?: 'blur' | 'empty';
    blurDataURL?: string;
    className?: string;
    style?: React.CSSProperties;
    onLoad?: () => void;
    onError?: () => void;
    loading?: 'lazy' | 'eager';
    objectFit?: 'fill' | 'contain' | 'cover' | 'none' | 'scale-down';
    objectPosition?: string;
  }

  const Image: ComponentType<ImageProps>;
  export default Image;
}

declare module 'next-auth/react' {
  export interface Session {
    user?: {
      name?: string;
      email?: string;
      image?: string;
      role?: string;
    };
    expires: string;
  }

  export function useSession(): {
    data: Session | null;
    status: 'loading' | 'authenticated' | 'unauthenticated';
  };

  export function signIn(provider?: string, options?: any): Promise<any>;
  export function signOut(options?: any): Promise<any>;
}
