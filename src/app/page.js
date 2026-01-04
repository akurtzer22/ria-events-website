import Link from 'next/link'
import Navigation from '@/components/Navigation'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-amber-50">
      <Navigation currentPage="/" />

      {/* Hero Section with decorative elements */}
      <main className="max-w-7xl mx-auto px-4 py-20 text-center relative">
        {/* Decorative star accents */}
        <div className="absolute top-10 left-10 text-amber-700 opacity-20">
          <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2l2.4 7.4h7.8l-6.3 4.6 2.4 7.4L12 16.8l-6.3 4.6 2.4-7.4L1.8 9.4h7.8z"/>
          </svg>
        </div>
        <div className="absolute top-40 right-20 text-pink-400 opacity-20">
          <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2l2.4 7.4h7.8l-6.3 4.6 2.4 7.4L12 16.8l-6.3 4.6 2.4-7.4L1.8 9.4h7.8z"/>
          </svg>
        </div>

        <h2 className="text-5xl font-bold bg-gradient-to-r from-purple-900 via-purple-700 to-pink-600 bg-clip-text text-transparent mb-10 leading-tight pb-2">
          Art & Music Events in Chicago
        </h2>
        <p className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto mt-4">
          Discover curated art and music experiences across Chicago.
          Join us for unforgettable cultural moments.
        </p>
        <Link
          href="/calendar"
          className="bg-gradient-to-r from-purple-800 to-purple-900 hover:from-pink-600 hover:to-purple-800 text-white px-8 py-3 rounded-lg text-lg font-semibold shadow-lg transition-all duration-300 inline-block"
        >
          View Events Calendar
        </Link>
      </main>
    </div>
  )
}