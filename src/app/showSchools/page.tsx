'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface School {
  id: number;
  name: string;
  address: string;
  city: string;
  state: string;
  contact: string;
  email_id: string;
  image: string | null;
  created_at: string;
}

export default function ShowSchools() {
  const [schools, setSchools] = useState<School[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterState, setFilterState] = useState('');

  useEffect(() => {
    fetchSchools();
  }, []);

  const fetchSchools = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/schools');
      if (response.ok) {
        const data = await response.json();
        setSchools(data.data);
      } else {
        setError('Failed to fetch schools');
      }
    } catch (error) {
      console.error('Error fetching schools:', error);
      setError('An error occurred while fetching schools');
    } finally {
      setLoading(false);
    }
  };

  // Filter schools based on search term and state
  const filteredSchools = schools.filter(school => {
    const matchesSearch = school.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         school.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         school.address.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesState = filterState === '' || school.state === filterState;
    return matchesSearch && matchesState;
  });

  // Get unique states for filter dropdown
  const uniqueStates = [...new Set(schools.map(school => school.state))].sort();

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-lg text-gray-600">Loading schools...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Error</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={fetchSchools}
            className="btn-primary"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Header Section */}
      <div className="bg-white/70 backdrop-blur border-b border-gray-100">
        <div className="container-page py-10">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Our Schools
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover educational institutions across the country. Find the perfect school for your needs.
            </p>
          </div>

          {/* Search and Filter Section */}
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="flex-1">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search schools by name, city, or address..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-3 pl-10 border border-gray-200 rounded-lg bg-white/90 backdrop-blur focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>
            </div>
            <div className="md:w-64">
              <select
                value={filterState}
                onChange={(e) => setFilterState(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg bg-white/90 backdrop-blur focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">All States</option>
                {uniqueStates.map(state => (
                  <option key={state} value={state}>{state}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Results Count */}
          <div className="text-sm text-gray-600 mb-6">
            Showing {filteredSchools.length} of {schools.length} schools
          </div>
        </div>
      </div>

      {/* Schools Grid */}
      <div className="container-page py-10">
        {filteredSchools.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🏫</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">No Schools Found</h3>
            <p className="text-gray-600 mb-6">
              {searchTerm || filterState 
                ? 'Try adjusting your search criteria or filters.'
                : 'No schools have been added yet.'
              }
            </p>
            <Link href="/addSchool" className="btn-primary">
              Add First School
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredSchools.map((school) => (
              <div key={school.id} className="card overflow-hidden animate-fade-in-up">
                {/* School Image */}
                <div className="relative h-48 bg-gray-200">
                  {school.image ? (
                    <Image
                      src={school.image}
                      alt={school.name}
                      fill
                      className="object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                        target.nextElementSibling?.classList.remove('hidden');
                      }}
                    />
                  ) : null}
                  <div className={`absolute inset-0 flex items-center justify-center ${school.image ? 'hidden' : ''}`}>
                    <div className="text-6xl text-gray-400">🏫</div>
                  </div>
                  
                  {/* State Badge */}
                  <div className="absolute top-3 right-3">
                    <span className="bg-blue-600 text-white px-2 py-1 rounded-full text-xs font-medium">
                      {school.state}
                    </span>
                  </div>
                </div>

                {/* School Info */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
                    {school.name}
                  </h3>
                  
                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-start">
                      <svg className="h-4 w-4 mt-0.5 mr-2 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span className="line-clamp-2">{school.address}</span>
                    </div>
                    
                    <div className="flex items-center">
                      <svg className="h-4 w-4 mr-2 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                      <span>{school.city}, {school.state}</span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <div className="flex gap-2">
                      <a
                        href={`tel:${school.contact}`}
                        className="flex-1 bg-green-600 hover:bg-green-700 text-white text-center py-2 px-3 rounded-lg text-sm font-medium transition-colors"
                      >
                        📞 Call
                      </a>
                      <a
                        href={`mailto:${school.email_id}`}
                        className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-center py-2 px-3 rounded-lg text-sm font-medium transition-colors"
                      >
                        ✉️ Email
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Add School CTA */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-14">
        <div className="container-page text-center">
          <h2 className="text-3xl font-bold mb-4">Don't see your school?</h2>
          <p className="text-xl mb-6 opacity-90">
            Help us grow our database by adding your school information.
          </p>
          <Link href="/addSchool" className="bg-white text-blue-600 px-8 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors">
            Add Your School
          </Link>
        </div>
      </div>
    </div>
  );
}
