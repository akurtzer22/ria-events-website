'use client'
import Link from 'next/link'

export default function AboutPage() {
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
            <Link href="/about" className="text-gray-700 hover:text-purple-600 font-semibold">
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

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-12">
        {/* Page Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            About RIA
          </h1>
          <p className="text-xl text-gray-600">
            Building community through unforgettable events and experiences
          </p>
        </div>

        {/* Our Founding Section */}
        <section id="founding" className="mb-16 scroll-mt-20">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="flex items-center mb-6">
              <div className="bg-purple-100 rounded-full p-3 mr-4">
                <svg
                  className="w-8 h-8 text-purple-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>
                </svg>
              </div>
              <h2 className="text-3xl font-bold text-gray-900">
                Our Founding
              </h2>
            </div>
            <div className="prose prose-lg max-w-none text-gray-700">
              <p className="mb-4">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </p>
              <p className="mb-4">
                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
              </p>
              <p>
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
              </p>
            </div>
          </div>
        </section>

        {/* Our Mission Section */}
        <section id="mission" className="mb-16 scroll-mt-20">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="flex items-center mb-6">
              <div className="bg-purple-100 rounded-full p-3 mr-4">
                <svg
                  className="w-8 h-8 text-purple-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
              </div>
              <h2 className="text-3xl font-bold text-gray-900">
                Our Mission
              </h2>
            </div>
            <div className="prose prose-lg max-w-none text-gray-700">
              <p className="mb-4">
                Our mission is to create meaningful connections and unforgettable experiences that bring our community together. We believe in:
              </p>
              <ul className="space-y-3 mb-4">
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-purple-600 mr-2 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                  </svg>
                  <span><strong>Building Community:</strong> Fostering genuine connections between individuals through shared experiences and common interests.</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-purple-600 mr-2 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                  </svg>
                  <span><strong>Celebrating Culture:</strong> Showcasing diverse perspectives, traditions, and artistic expressions that enrich our community.</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-purple-600 mr-2 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                  </svg>
                  <span><strong>Creating Opportunities:</strong> Providing platforms for networking, learning, and personal growth through thoughtfully curated events.</span>
                </li>
              </ul>
              <p>
                Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.
              </p>
            </div>
          </div>
        </section>

        {/* Ways to Get Involved Section */}
        <section id="get-involved" className="mb-16 scroll-mt-20">
          <div className="bg-gradient-to-br from-purple-600 to-purple-700 rounded-lg shadow-lg p-8 text-white">
            <div className="flex items-center mb-6">
              <div className="bg-white bg-opacity-20 rounded-full p-3 mr-4">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
                </svg>
              </div>
              <h2 className="text-3xl font-bold">
                Ways to Get Involved
              </h2>
            </div>
            <div className="space-y-6">
              <div className="bg-white bg-opacity-10 rounded-lg p-6 backdrop-blur-sm">
                <h3 className="text-xl font-bold mb-3 flex items-center">
                  <span className="bg-white text-purple-600 rounded-full w-8 h-8 flex items-center justify-center mr-3 font-bold text-lg">1</span>
                  Attend Our Events
                </h3>
                <p className="text-purple-100">
                  Check out our calendar and join us at upcoming events. Whether it's a social gathering, cultural celebration, or networking opportunity, there's something for everyone. No commitment required—just show up and have fun!
                </p>
              </div>

              <div className="bg-white bg-opacity-10 rounded-lg p-6 backdrop-blur-sm">
                <h3 className="text-xl font-bold mb-3 flex items-center">
                  <span className="bg-white text-purple-600 rounded-full w-8 h-8 flex items-center justify-center mr-3 font-bold text-lg">2</span>
                  Volunteer at Events
                </h3>
                <p className="text-purple-100">
                  Help make our events successful by volunteering. From setup and registration to social media coverage and cleanup, we need enthusiastic volunteers. It's a great way to meet people and gain event planning experience.
                </p>
              </div>

              <div className="bg-white bg-opacity-10 rounded-lg p-6 backdrop-blur-sm">
                <h3 className="text-xl font-bold mb-3 flex items-center">
                  <span className="bg-white text-purple-600 rounded-full w-8 h-8 flex items-center justify-center mr-3 font-bold text-lg">3</span>
                  Join the Planning Committee
                </h3>
                <p className="text-purple-100">
                  Ready to take a more active role? Join our planning committee to help organize events, coordinate logistics, and shape the future of RIA. We meet regularly and welcome fresh ideas and perspectives.
                </p>
              </div>

              <div className="bg-white bg-opacity-10 rounded-lg p-6 backdrop-blur-sm">
                <h3 className="text-xl font-bold mb-3 flex items-center">
                  <span className="bg-white text-purple-600 rounded-full w-8 h-8 flex items-center justify-center mr-3 font-bold text-lg">4</span>
                  Sponsor or Partner With Us
                </h3>
                <p className="text-purple-100">
                  Are you a business or organization interested in supporting our mission? We welcome partnerships and sponsorships that help us create even better events for our community. Contact us to learn more about collaboration opportunities.
                </p>
              </div>

              <div className="mt-8 text-center">
                <p className="text-lg mb-4 text-purple-100">
                  Interested in getting involved? We'd love to hear from you!
                </p>
                <a
                  href="mailto:contact@ria.org"
                  className="inline-block bg-white text-purple-600 px-8 py-3 rounded-lg font-semibold hover:bg-purple-50 transition"
                >
                  Contact Us
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <div className="text-center bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Ready to Experience RIA?
          </h2>
          <p className="text-gray-600 mb-6">
            Browse our upcoming events and join us for your next great experience.
          </p>
          <Link
            href="/calendar"
            className="inline-block bg-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-purple-700 transition"
          >
            View Events Calendar
          </Link>
        </div>
      </main>
    </div>
  )
}
