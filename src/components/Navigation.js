'use client'
import Link from 'next/link'
import Image from 'next/image'

export default function Navigation({ currentPage = '' }) {
  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/calendar', label: 'Calendar' },
    { href: '/about', label: 'About' },
    { href: '/team', label: 'Team' },
    { href: '/login', label: 'Admin' }
  ]

  return (
    <nav className="bg-gradient-to-r from-purple-900 via-purple-800 to-purple-900 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition">
          <Image
            src="/ria-logo.png"
            alt="RIA Logo"
            width={50}
            height={50}
            className="filter drop-shadow-md"
          />
          <span className="text-2xl font-bold text-[#E8DCC8] tracking-wide">RIA</span>
        </Link>
        <div className="flex gap-6">
          {navLinks.map(link => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-medium transition ${
                currentPage === link.href
                  ? 'text-pink-300 font-bold'
                  : 'text-purple-100 hover:text-pink-200'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  )
}
