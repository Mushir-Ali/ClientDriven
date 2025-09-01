import React from 'react'

const LandingPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-800 px-6">
      {/* Company Name */}
      <h1 className="text-5xl font-bold mb-4">Client Driven</h1>
      <p className="text-lg italic mb-12">
        "Empowering collaboration with smarter task management."
      </p>

      {/* Features */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">
        <div className="p-6 bg-white shadow rounded-2xl hover:shadow-lg transition">
          <h2 className="text-2xl font-semibold mb-2">📌 Task Management</h2>
          <p>Create, update, and delete tasks with ease.</p>
        </div>
        <div className="p-6 bg-white shadow rounded-2xl hover:shadow-lg transition">
          <h2 className="text-2xl font-semibold mb-2">👤 User Profiles</h2>
          <p>Users can manage their own profiles and tasks seamlessly.</p>
        </div>
        <div className="p-6 bg-white shadow rounded-2xl hover:shadow-lg transition">
          <h2 className="text-2xl font-semibold mb-2">🛡️ Admin Control</h2>
          <p>Admins can oversee, edit, and manage everything with ease.</p>
        </div>
        <div className="p-6 bg-white shadow rounded-2xl hover:shadow-lg transition">
          <h2 className="text-2xl font-semibold mb-2">📊 Transparency</h2>
          <p>Track progress and collaborate effectively with clarity.</p>
        </div>
      </div>
    </div>
  )
}

export default LandingPage
