import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-slate-900 dark:to-slate-800">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-gray-900 dark:text-gray-100 mb-6">
            School Management System
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-12 max-w-2xl mx-auto">
            A comprehensive platform to manage school information with modern web technologies.
            Built with Next.js, React, and MySQL.
          </p>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="card p-8 hover:shadow-xl transition-shadow">
              <div className="text-4xl mb-4">🏫</div>
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-4">Add New School</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Register a new school with complete information including contact details and images.
              </p>
              <Link 
                href="/addSchool"
                className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Add School
              </Link>
            </div>
            
            <div className="card p-8 hover:shadow-xl transition-shadow">
              <div className="text-4xl mb-4">📚</div>
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-4">View Schools</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Browse through all registered schools in an organized, ecommerce-style layout.
              </p>
              <Link 
                href="/showSchools"
                className="inline-block bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors"
              >
                View Schools
              </Link>
            </div>
          </div>
          
          <div className="mt-16 card p-8 max-w-4xl mx-auto">
            <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-6">Technologies Used</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div className="p-4">
                <div className="text-2xl mb-2">⚛️</div>
                <p className="font-medium">Next.js</p>
                <p className="text-sm text-gray-600">React Framework</p>
              </div>
              <div className="p-4">
                <div className="text-2xl mb-2">🎨</div>
                <p className="font-medium">Tailwind CSS</p>
                <p className="text-sm text-gray-600">Styling</p>
              </div>
              <div className="p-4">
                <div className="text-2xl mb-2">🗄️</div>
                <p className="font-medium">MySQL</p>
                <p className="text-sm text-gray-600">Database</p>
              </div>
              <div className="p-4">
                <div className="text-2xl mb-2">📝</div>
                <p className="font-medium">React Hook Form</p>
                <p className="text-sm text-gray-600">Form Handling</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
