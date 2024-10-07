'use client';

import Link from 'next/link';

import { usePathname } from 'next/navigation';

const routes = [
  { label: 'Posts', href: '/posts' },
  { label: 'Create', href: '/posts/create' },
];

export function Navbar() {
  const pathname = usePathname();

  return (
    <nav className='flex gap-4 items-center'>
      <ul className='flex gap-x-4 items-center'>
        {routes.map((route) => {
          return (
            <li key={route.label}>
              <Link
                href={route.href}
                className={`${
                  pathname === route.href
                    ? 'text-slate-950 font-semibold'
                    : 'text-slate-400'
                }`}
              >
                {route.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
