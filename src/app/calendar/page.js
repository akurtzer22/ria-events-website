'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { supabase } from '../supabase'

export default function CalendarPage() {
  const [events, setEvents] = useState([])
  const [currentDate, setCurrentDate] = useState(new Date())
  const [loading, setLoading] = useState(true)

  // Fetch events from Supabase when page loads
  useEffect(() => {
    fetchEvents()
  }, [])

  async function fetchEvents() {
    try {
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .order('event_date', { ascending: true })
      
      if (error) throw error
      setEvents(data || [])
    } catch (error) {
      console.error('Error fetching events:', error)
    } finally {
      setLoading(false)
    }
  }

  // Get calendar data for current month
  function getCalendarDays() {
    const year = currentDate.getFullYear()
    const month = currentDate.getMonth()
    
    // First day of month
    const firstDay = new Date(year, month, 1)
    // Last day of month
    const lastDay = new Date(year, month + 1, 0)
    
    // Days to show (including empty cells for alignment)
    const days = []
    
    // Add empty cells for days before month starts
    for (let i = 0; i < firstDay.getDay(); i++) {
      days.push(null)
    }
    
    // Add all days in month
    for (let i = 1; i <= lastDay.getDate(); i++) {
      days.push(new Date(year, month, i))
    }
    
    return days
  }

  // Get events for a specific day
  function getEventsForDay(date) {
    if (!date) return []
    
    const dateString = date.toISOString().split('T')[0]
    return events.filter(event => event.event_date === dateString)
  }

  // Navigate to previous month
  function previousMonth() {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1))
  }

  // Navigate to next month
  function nextMonth() {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1))
  }

  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December']
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

  // Format time from database to display (convert 19:30:00 to 7:30 PM)
  function formatTimeDisplay(timeStr) {
    if (!timeStr) return ''

    const [hours24, minutes] = timeStr.split(':')
    let hours = parseInt(hours24)
    const period = hours >= 12 ? 'PM' : 'AM'

    if (hours > 12) hours -= 12
    if (hours === 0) hours = 12

    return `${hours}:${minutes} ${period}`
  }

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
            <Link href="/calendar" className="text-gray-700 hover:text-purple-600 font-semibold">
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

      {/* Calendar */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-lg p-6">
          {/* Month Navigation */}
          <div className="flex items-center justify-between mb-6">
            <button
              onClick={previousMonth}
              className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
            >
              ← Previous
            </button>
            
            <h2 className="text-2xl font-bold text-gray-900">
              {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
            </h2>
            
            <button
              onClick={nextMonth}
              className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
            >
              Next →
            </button>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <p className="text-gray-600">Loading events...</p>
            </div>
          ) : (
            <>
              {/* Day Headers */}
              <div className="grid grid-cols-7 gap-2 mb-2">
                {dayNames.map(day => (
                  <div key={day} className="text-center font-semibold text-gray-700 py-2">
                    {day}
                  </div>
                ))}
              </div>

              {/* Calendar Grid */}
              <div className="grid grid-cols-7 gap-2">
                {getCalendarDays().map((date, index) => {
                  const dayEvents = date ? getEventsForDay(date) : []
                  const isToday = date && 
                    date.toDateString() === new Date().toDateString()

                  return (
                    <div
                      key={index}
                      className={`min-h-24 p-2 border rounded ${
                        !date ? 'bg-gray-50' : isToday ? 'bg-purple-50 border-purple-300' : 'bg-white'
                      }`}
                    >
                      {date && (
                        <>
                          <div className={`text-sm font-semibold mb-1 ${
                            isToday ? 'text-purple-600' : 'text-gray-700'
                          }`}>
                            {date.getDate()}
                          </div>
                          
                          {dayEvents.map(event => {
                            const timeDisplay = formatTimeDisplay(event.start_time) +
                              (event.end_time ? ` - ${formatTimeDisplay(event.end_time)}` : '')
                            return (
                              <div
                                key={event.id}
                                className="text-xs bg-purple-100 text-purple-800 rounded px-2 py-1 mb-1 cursor-pointer hover:bg-purple-200"
                                title={`${event.title} at ${timeDisplay}`}
                              >
                                <div className="font-semibold truncate">{event.title}</div>
                                <div className="truncate">{timeDisplay}</div>
                              </div>
                            )
                          })}
                        </>
                      )}
                    </div>
                  )
                })}
              </div>

              {/* Events List Below Calendar */}
              <div className="mt-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Upcoming Events
                </h3>
                
                {events.length === 0 ? (
                  <p className="text-gray-600">No events scheduled yet.</p>
                ) : (
                  <div className="space-y-4">
                    {events.map(event => (
                      <div key={event.id} className="border rounded-lg p-4 hover:shadow-md transition">
                        <h4 className="text-lg font-bold text-purple-600 mb-2">
                          {event.title}
                        </h4>
                        <div className="grid grid-cols-2 gap-2 text-sm text-gray-700">
                          <div>
                            <span className="font-semibold">Date:</span> {event.event_date}
                          </div>
                          <div>
                            <span className="font-semibold">Time:</span>{' '}
                            {formatTimeDisplay(event.start_time)}
                            {event.end_time && ` - ${formatTimeDisplay(event.end_time)}`}
                          </div>
                          <div>
                            <span className="font-semibold">Location:</span> {event.location}
                          </div>
                          {event.dress_code && (
                            <div>
                              <span className="font-semibold">Dress Code:</span> {event.dress_code}
                            </div>
                          )}
                        </div>
                        {event.description && (
                          <p className="mt-2 text-gray-600">{event.description}</p>
                        )}
                        {event.rsvp_link && (
                          <div className="mt-3">
                            <a
                              href={event.rsvp_link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-block bg-purple-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-purple-700 transition"
                            >
                              RSVP Now
                            </a>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  )
}