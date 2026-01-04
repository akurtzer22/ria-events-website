import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
      {/* Header */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-purple-600">
            RIA
          </Link>
          <div className="space-x-4">
            <Link href="/calendar" className="text-gray-700 hover:text-purple-600">
              Calendar
            </Link>
            <Link href="/about" className="text-gray-700 hover:text-purple-600">
              About
            </Link>
            <Link href="/team" className="text-gray-700 hover:text-purple-600">
              Team
            </Link>
            <Link href="/login" className="text-gray-700 hover:text-purple-600">
              Admin
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h2 className="text-5xl font-bold text-gray-900 mb-6">
          Art & Music Events in Chicago
        </h2>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Discover curated art and music experiences across Chicago. 
          Join us for unforgettable cultural moments.
        </p>
        <Link 
          href="/calendar"
          className="bg-purple-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-purple-700 inline-block"
        >
          View Events Calendar
        </Link>
      </main>
    </div>
  )
}