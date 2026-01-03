'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '../supabase'

export default function AdminPage() {
  const [user, setUser] = useState(null)
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingEvent, setEditingEvent] = useState(null)
  const router = useRouter()

  // Form fields
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    event_date: '',
    event_time: '',
    dress_code: ''
  })

  // Check if user is logged in
  // Run the auth check on mount and fetch events directly to avoid
  // dependency issues with fetchEvents.
  useEffect(() => {
    async function init() {
      const { data: { user } } = await supabase.auth.getUser()

      if (!user) {
        // Not logged in, redirect to login
        router.push('/login')
        return
      }

      setUser(user)

      // Fetch events once on mount
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

    init()
  }, [router])

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

  async function handleLogout() {
    await supabase.auth.signOut()
    router.push('/')
  }

  function openForm(event = null) {
    if (event) {
      // Editing existing event
      setEditingEvent(event)
      setFormData({
        title: event.title,
        description: event.description || '',
        location: event.location,
        event_date: event.event_date,
        event_time: event.event_time,
        dress_code: event.dress_code || ''
      })
    } else {
      // Creating new event
      setEditingEvent(null)
      setFormData({
        title: '',
        description: '',
        location: '',
        event_date: '',
        event_time: '',
        dress_code: ''
      })
    }
    setShowForm(true)
  }

  function closeForm() {
    setShowForm(false)
    setEditingEvent(null)
  }

  async function handleSubmit(e) {
    e.preventDefault()

    try {
      if (editingEvent) {
        // Update existing event
        const { error } = await supabase
          .from('events')
          .update(formData)
          .eq('id', editingEvent.id)
        
        if (error) throw error
      } else {
        // Create new event
        const { error } = await supabase
          .from('events')
          .insert([formData])
        
        if (error) throw error
      }

      // Refresh events list
      fetchEvents()
      closeForm()
    } catch (error) {
      alert('Error saving event: ' + error.message)
    }
  }

  async function handleDelete(eventId) {
    if (!confirm('Are you sure you want to delete this event?')) return

    try {
      const { error } = await supabase
        .from('events')
        .delete()
        .eq('id', eventId)
      
      if (error) throw error
      fetchEvents()
    } catch (error) {
      alert('Error deleting event: ' + error.message)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-600">Loading...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-purple-600">RIA Admin Dashboard</h1>
          <div className="space-x-4">
            <a
              href="/calendar"
              target="_blank"
              className="text-gray-700 hover:text-purple-600"
            >
              View Public Calendar
            </a>
            <button
              onClick={handleLogout}
              className="text-gray-700 hover:text-red-600"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Welcome Message */}
        <div className="mb-6">
          <h2 className="text-3xl font-bold text-gray-900">Welcome, Admin!</h2>
          <p className="text-gray-600">Manage your RIA events below</p>
        </div>

        {/* Add Event Button */}
        <button
          onClick={() => openForm()}
          className="mb-6 bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-700"
        >
          + Add New Event
        </button>

        {/* Events List */}
        {events.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-8 text-center">
            <p className="text-gray-600">No events yet. Click &apos;Add New Event&apos; to create one!</p>
          </div>
        ) : (
          <div className="grid gap-4">
            {events.map(event => (
              <div key={event.id} className="bg-white rounded-lg shadow p-6">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-purple-600 mb-2">{event.title}</h3>
                    <div className="grid grid-cols-2 gap-2 text-sm text-gray-700">
                      <div><span className="font-semibold">Date:</span> {event.event_date}</div>
                      <div><span className="font-semibold">Time:</span> {event.event_time}</div>
                      <div><span className="font-semibold">Location:</span> {event.location}</div>
                      {event.dress_code && (
                        <div><span className="font-semibold">Dress:</span> {event.dress_code}</div>
                      )}
                    </div>
                    {event.description && (
                      <p className="mt-2 text-gray-600">{event.description}</p>
                    )}
                  </div>

                  <div className="flex gap-2 ml-4">
                    <button
                      onClick={() => openForm(event)}
                      className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(event.id)}
                      className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Event Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full p-6 max-h-[90vh] overflow-y-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              {editingEvent ? 'Edit Event' : 'Add New Event'}
            </h3>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Title */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Event Title *
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                  placeholder="e.g., Jazz Night at Green Mill"
                />
              </div>

              {/* Location */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Location *
                </label>
                <input
                  type="text"
                  required
                  value={formData.location}
                  onChange={(e) => setFormData({...formData, location: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                  placeholder="e.g., 4802 N Broadway, Chicago"
                />
              </div>

              {/* Date and Time */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Date *
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.event_date}
                    onChange={(e) => setFormData({...formData, event_date: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Time *
                  </label>
                  <input
                    type="time"
                    required
                    value={formData.event_time}
                    onChange={(e) => setFormData({...formData, event_time: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                  />
                </div>
              </div>

              {/* Dress Code */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Dress Code
                </label>
                <input
                  type="text"
                  value={formData.dress_code}
                  onChange={(e) => setFormData({...formData, dress_code: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                  placeholder="e.g., Cocktail Attire, Casual"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  rows="4"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                  placeholder="Describe the event..."
                />
              </div>

              {/* Buttons */}
              <div className="flex gap-4 pt-4">
                <button
                  type="submit"
                  className="flex-1 bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700"
                >
                  {editingEvent ? 'Update Event' : 'Create Event'}
                </button>
                <button
                  type="button"
                  onClick={closeForm}
                  className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}