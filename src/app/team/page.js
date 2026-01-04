'use client'
import Link from 'next/link'

export default function TeamPage() {
  const teamMembers = [
    {
      id: 1,
      name: 'Team Member Name',
      role: 'Position/Title',
      bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.',
      email: 'member@ria.org',
      imageUrl: '/placeholder-team.jpg'
    },
    {
      id: 2,
      name: 'Team Member Name',
      role: 'Position/Title',
      bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.',
      email: 'member@ria.org',
      imageUrl: '/placeholder-team.jpg'
    },
    {
      id: 3,
      name: 'Team Member Name',
      role: 'Position/Title',
      bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.',
      email: 'member@ria.org',
      imageUrl: '/placeholder-team.jpg'
    },
    {
      id: 4,
      name: 'Team Member Name',
      role: 'Position/Title',
      bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.',
      email: 'member@ria.org',
      imageUrl: '/placeholder-team.jpg'
    },
    {
      id: 5,
      name: 'Team Member Name',
      role: 'Position/Title',
      bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.',
      email: 'member@ria.org',
      imageUrl: '/placeholder-team.jpg'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
      {/* Header */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-purple-600">
            RIA
          </Link>
          <div className="space-x-4">
            <Link href="/" className="text-gray-700 hover:text-purple-600">
              Home
            </Link>
            <Link href="/calendar" className="text-gray-700 hover:text-purple-600">
              Calendar
            </Link>
            <Link href="/about" className="text-gray-700 hover:text-purple-600">
              About
            </Link>
            <Link href="/team" className="text-gray-700 hover:text-purple-600 font-semibold">
              Team
            </Link>
            <Link href="/login" className="text-gray-700 hover:text-purple-600">
              Admin
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-12">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Meet the Team
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Get to know the passionate individuals who make RIA events possible and bring our community together.
          </p>
        </div>

        {/* Team Members Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member) => (
            <div
              key={member.id}
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition"
            >
              {/* Headshot Placeholder */}
              <div className="h-64 bg-gradient-to-br from-purple-200 to-purple-100 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-32 h-32 bg-purple-300 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <svg
                      className="w-16 h-16 text-purple-600"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                    </svg>
                  </div>
                  <p className="text-sm text-purple-600 font-medium">Photo Coming Soon</p>
                </div>
              </div>

              {/* Member Info */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-purple-600 mb-1">
                  {member.name}
                </h3>
                <p className="text-sm text-gray-500 font-semibold mb-3">
                  {member.role}
                </p>
                <p className="text-gray-700 mb-4 text-sm">
                  {member.bio}
                </p>
                <div className="border-t pt-4">
                  <a
                    href={`mailto:${member.email}`}
                    className="text-purple-600 hover:text-purple-800 text-sm font-medium flex items-center"
                  >
                    <svg
                      className="w-4 h-4 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                    </svg>
                    Contact
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-16 bg-purple-600 rounded-lg p-8 text-center text-white">
          <h2 className="text-2xl font-bold mb-4">
            Interested in Joining Our Team?
          </h2>
          <p className="mb-6 text-purple-100">
            We&apos;re always looking for passionate individuals to help organize events and build our community.
          </p>
          <Link
            href="/about#get-involved"
            className="inline-block bg-white text-purple-600 px-8 py-3 rounded-lg font-semibold hover:bg-purple-50 transition"
          >
            Learn How to Get Involved
          </Link>
        </div>
      </main>
    </div>
  )
}
