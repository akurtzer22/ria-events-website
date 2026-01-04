'use client'
import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '../supabase'

export default function AdminPage() {
  const [user, setUser] = useState(null)
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingEvent, setEditingEvent] = useState(null)
  const router = useRouter()

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    event_date: '',
    start_time: '',
    end_time: '',
    dress_code: '',
    rsvp_link: ''
  })

  const [timeValidation, setTimeValidation] = useState({
    start_time: true,
    end_time: true
  })

  const fetchEvents = useCallback(async () => {
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
  }, [])

  const checkUser = useCallback(async () => {
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      router.push('/login')
      return
    }

    setUser(user)
    fetchEvents()
  }, [router, fetchEvents])

  useEffect(() => {
    checkUser()
  }, [checkUser])

  async function handleLogout() {
    await supabase.auth.signOut()
    router.push('/')
  }

  // Validate and convert time format
  function validateTime(timeStr) {
    if (!timeStr) return null
    
    // Remove extra spaces
    timeStr = timeStr.trim()
    
    // Match formats: "7:00 PM", "7:30 pm", "19:30", "7:00PM"
    const formats = [
      /^(\d{1,2}):(\d{2})\s*(AM|PM|am|pm)$/,  // 7:00 PM
      /^(\d{1,2}):(\d{2})$/                    // 19:30 (24-hour)
    ]
    
    for (let format of formats) {
      const match = timeStr.match(format)
      if (match) {
        let hours = parseInt(match[1])
        const minutes = parseInt(match[2])
        const period = match[3]?.toUpperCase()
        
        // Validate minutes
        if (minutes < 0 || minutes > 59) return null
        
        // Convert to 24-hour format
        if (period) {
          if (hours < 1 || hours > 12) return null
          if (period === 'PM' && hours !== 12) hours += 12
          if (period === 'AM' && hours === 12) hours = 0
        } else {
          if (hours < 0 || hours > 23) return null
        }
        
        // Return in HH:MM:SS format for database
        return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:00`
      }
    }
    
    return null
  }

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

  function handleTimeChange(field, value) {
    setFormData({...formData, [field]: value})
    
    // Validate as user types
    const isValid = value === '' || validateTime(value) !== null
    setTimeValidation({...timeValidation, [field]: isValid})
  }

  function openForm(event = null) {
    if (event) {
      setEditingEvent(event)
      setFormData({
        title: event.title,
        description: event.description || '',
        location: event.location,
        event_date: event.event_date,
        start_time: formatTimeDisplay(event.start_time),
        end_time: event.end_time ? formatTimeDisplay(event.end_time) : '',
        dress_code: event.dress_code || '',
        rsvp_link: event.rsvp_link || ''
      })
    } else {
      setEditingEvent(null)
      setFormData({
        title: '',
        description: '',
        location: '',
        event_date: '',
        start_time: '',
        end_time: '',
        dress_code: '',
        rsvp_link: ''
      })
    }
    setTimeValidation({ start_time: true, end_time: true })
    setShowForm(true)
  }

  function closeForm() {
    setShowForm(false)
    setEditingEvent(null)
  }

  async function handleSubmit(e) {
    e.preventDefault()

    // Validate times
    const startTime24 = validateTime(formData.start_time)
    const endTime24 = formData.end_time ? validateTime(formData.end_time) : null
    
    if (!startTime24) {
      alert('Invalid start time format. Use format like: 7:00 PM or 19:00')
      return
    }
    
    if (formData.end_time && !endTime24) {
      alert('Invalid end time format. Use format like: 8:30 PM or 20:30')
      return
    }

    // Prepare data with converted times
    const dataToSave = {
      title: formData.title,
      description: formData.description,
      location: formData.location,
      event_date: formData.event_date,
      start_time: startTime24,
      end_time: endTime24,
      dress_code: formData.dress_code,
      rsvp_link: formData.rsvp_link
    }

    try {
      if (editingEvent) {
        const { error } = await supabase
          .from('events')
          .update(dataToSave)
          .eq('id', editingEvent.id)
        
        if (error) throw error
      } else {
        const { error } = await supabase
          .from('events')
          .insert([dataToSave])
        
        if (error) throw error
      }

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
        <div className="mb-6">
          <h2 className="text-3xl font-bold text-gray-900">Welcome, Admin!</h2>
          <p className="text-gray-600">Manage your RIA events below</p>
        </div>

        <button
          onClick={() => openForm()}
          className="mb-6 bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-700"
        >
          + Add New Event
        </button>

        {events.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-8 text-center">
            <p className="text-gray-600">No events yet. Click &quot;Add New Event&quot; to create one!</p>
          </div>
        ) : (
          <div className="grid gap-4">
            {events.map(event => (
              <div key={event.id} className="bg-white rounded-lg shadow p-6">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-purple-600 mb-2">
                      {event.title}
                    </h3>
                    <div className="grid grid-cols-2 gap-2 text-sm text-gray-700">
                      <div><span className="font-semibold">Date:</span> {event.event_date}</div>
                      <div>
                        <span className="font-semibold">Time:</span>{' '}
                        {formatTimeDisplay(event.start_time)}
                        {event.end_time && ` - ${formatTimeDisplay(event.end_time)}`}
                      </div>
                      <div><span className="font-semibold">Location:</span> {event.location}</div>
                      {event.dress_code && (
                        <div><span className="font-semibold">Dress:</span> {event.dress_code}</div>
                      )}
                      {event.rsvp_link && (
                        <div className="col-span-2">
                          <span className="font-semibold">RSVP:</span>{' '}
                          <a
                            href={event.rsvp_link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-purple-600 hover:text-purple-800 underline"
                          >
                            {event.rsvp_link}
                          </a>
                        </div>
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

      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full p-6 max-h-[90vh] overflow-y-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              {editingEvent ? 'Edit Event' : 'Add New Event'}
            </h3>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Event Title *
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="e.g., Jazz Night at Green Mill"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Location *
                </label>
                <input
                  type="text"
                  required
                  value={formData.location}
                  onChange={(e) => setFormData({...formData, location: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="e.g., 4802 N Broadway, Chicago"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Date *
                </label>
                <input
                  type="date"
                  required
                  value={formData.event_date}
                  onChange={(e) => setFormData({...formData, event_date: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Start Time *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.start_time}
                    onChange={(e) => handleTimeChange('start_time', e.target.value)}
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                      !timeValidation.start_time ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="e.g., 7:00 PM"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Format: 7:00 PM or 19:00
                    {formData.start_time && (
                      timeValidation.start_time ? 
                        <span className="text-green-600 ml-2">✓ Valid</span> : 
                        <span className="text-red-600 ml-2">✗ Invalid format</span>
                    )}
                  </p>
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    End Time (Optional)
                  </label>
                  <input
                    type="text"
                    value={formData.end_time}
                    onChange={(e) => handleTimeChange('end_time', e.target.value)}
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                      !timeValidation.end_time ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="e.g., 10:00 PM"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Format: 10:00 PM or 22:00
                    {formData.end_time && (
                      timeValidation.end_time ? 
                        <span className="text-green-600 ml-2">✓ Valid</span> : 
                        <span className="text-red-600 ml-2">✗ Invalid format</span>
                    )}
                  </p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Dress Code
                </label>
                <input
                  type="text"
                  value={formData.dress_code}
                  onChange={(e) => setFormData({...formData, dress_code: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="e.g., Cocktail Attire, Casual"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  RSVP Link
                </label>
                <input
                  type="url"
                  value={formData.rsvp_link}
                  onChange={(e) => setFormData({...formData, rsvp_link: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="e.g., https://forms.google.com/..."
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  rows="4"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Describe the event..."
                />
              </div>

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