'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';

interface SchoolFormData {
  name: string;
  address: string;
  city: string;
  state: string;
  contact: string;
  email_id: string;
  image?: FileList;
}

export default function AddSchool() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<SchoolFormData>();

  const onSubmit = async (data: SchoolFormData) => {
    setIsSubmitting(true);
    try {
      let imagePath = null;

      // Handle image upload if provided
      if (data.image && data.image[0]) {
        const formData = new FormData();
        formData.append('file', data.image[0]);

        const uploadResponse = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        });

        if (uploadResponse.ok) {
          const uploadResult = await uploadResponse.json();
          imagePath = uploadResult.path;
        }
      }

      // Submit school data
      const response = await fetch('/api/schools', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...data,
          image: imagePath,
        }),
      });

      if (response.ok) {
        alert('School added successfully!');
        reset();
        setUploadedImage(null);
        router.push('/showSchools');
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.error}`);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('An error occurred while submitting the form');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen py-10">
      <div className="container-page">
        <div className="card p-8 animate-fade-in-up">
          <h1 className="text-3xl font-bold text-gray-900 mb-2 text-center">
            Add New School
          </h1>
          <p className="text-center text-gray-600 mb-8">Enter school details and upload an optional image.</p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* School Name */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                School Name *
              </label>
              <input
                type="text"
                id="name"
                {...register('name', { 
                  required: 'School name is required',
                  minLength: {
                    value: 2,
                    message: 'School name must be at least 2 characters'
                  }
                })}
                className={`form-input ${errors.name ? 'error' : ''}`}
                placeholder="Enter school name"
              />
              {errors.name && (
                <p className="form-error">{errors.name.message}</p>
              )}
            </div>

            {/* Address */}
            <div>
              <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">
                Address *
              </label>
              <textarea
                id="address"
                {...register('address', { 
                  required: 'Address is required',
                  minLength: {
                    value: 10,
                    message: 'Address must be at least 10 characters'
                  }
                })}
                className={`form-input ${errors.address ? 'error' : ''} h-20 resize-none`}
                placeholder="Enter complete address"
              />
              {errors.address && (
                <p className="form-error">{errors.address.message}</p>
              )}
            </div>

            {/* City and State */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-2">
                  City *
                </label>
                <input
                  type="text"
                  id="city"
                  {...register('city', { 
                    required: 'City is required',
                    minLength: {
                      value: 2,
                      message: 'City name must be at least 2 characters'
                    }
                  })}
                  className={`form-input ${errors.city ? 'error' : ''}`}
                  placeholder="Enter city"
                />
                {errors.city && (
                  <p className="form-error">{errors.city.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-2">
                  State *
                </label>
                <input
                  type="text"
                  id="state"
                  {...register('state', { 
                    required: 'State is required',
                    minLength: {
                      value: 2,
                      message: 'State name must be at least 2 characters'
                    }
                  })}
                  className={`form-input ${errors.state ? 'error' : ''}`}
                  placeholder="Enter state"
                />
                {errors.state && (
                  <p className="form-error">{errors.state.message}</p>
                )}
              </div>
            </div>

            {/* Contact and Email */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="contact" className="block text-sm font-medium text-gray-700 mb-2">
                  Contact Number *
                </label>
                <input
                  type="tel"
                  id="contact"
                  {...register('contact', { 
                    required: 'Contact number is required',
                    pattern: {
                      value: /^\d{10}$/,
                      message: 'Contact number must be exactly 10 digits'
                    }
                  })}
                  className={`form-input ${errors.contact ? 'error' : ''}`}
                  placeholder="Enter 10-digit contact number"
                />
                {errors.contact && (
                  <p className="form-error">{errors.contact.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="email_id" className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email_id"
                  {...register('email_id', { 
                    required: 'Email is required',
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: 'Please enter a valid email address'
                    }
                  })}
                  className={`form-input ${errors.email_id ? 'error' : ''}`}
                  placeholder="Enter email address"
                />
                {errors.email_id && (
                  <p className="form-error">{errors.email_id.message}</p>
                )}
              </div>
            </div>

            {/* Image Upload */}
            <div>
              <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-2">
                School Image
              </label>
              <input
                type="file"
                id="image"
                accept="image/*"
                {...register('image')}
                onChange={handleImageChange}
                className="form-input"
              />
              {uploadedImage && (
                <div className="mt-4">
                  <img
                    src={uploadedImage}
                    alt="Preview"
                    className="w-32 h-32 object-cover rounded-lg border shadow-sm"
                  />
                </div>
              )}
            </div>

            {/* Submit Button */}
            <div className="flex justify-center gap-4 pt-6">
              <button
                type="button"
                onClick={() => router.push('/')}
                className="btn-secondary"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Adding School...' : 'Add School'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
