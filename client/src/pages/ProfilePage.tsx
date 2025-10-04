import React from 'react'
import { useForm } from '@/hooks/useForm'
import { useAuth } from '@/hooks/useAuth'
import { Button } from '@/components/common/Button'
import { Input } from '@/components/common/Input'
import { UserProfile } from '@/types'

interface ProfileFormData {
  firstName: string
  lastName: string
  displayName: string
  phone: string
  bio: string
  locale: string
  timezone: string
}

const initialValues: ProfileFormData = {
  firstName: '',
  lastName: '',
  displayName: '',
  phone: '',
  bio: '',
  locale: 'en',
  timezone: 'UTC',
}

const validateForm = (values: ProfileFormData) => {
  const errors: Partial<Record<keyof ProfileFormData, string>> = {}

  if (!values.firstName) {
    errors.firstName = 'First name is required'
  }

  if (!values.lastName) {
    errors.lastName = 'Last name is required'
  }

  if (values.phone && !/^\+?[\d\s\-\(\)]+$/.test(values.phone)) {
    errors.phone = 'Please enter a valid phone number'
  }

  return errors
}

export const ProfilePage: React.FC = () => {
  const { user, updateProfile, isLoading } = useAuth()
  
  const {
    values,
    errors,
    touched,
    isSubmitting,
    isValid,
    setValues,
    handleChange,
    handleBlur,
    handleSubmit,
  } = useForm(initialValues, validateForm)

  // Initialize form with user data
  React.useEffect(() => {
    if (user) {
      setValues({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        displayName: user.displayName || '',
        phone: '',
        bio: '',
        locale: 'en',
        timezone: 'UTC',
      })
    }
  }, [user, setValues])

  const onSubmit = async (values: ProfileFormData) => {
    const profileData: UserProfile = {
      firstName: values.firstName,
      lastName: values.lastName,
      displayName: values.displayName,
      phone: values.phone,
      bio: values.bio,
      locale: values.locale,
      timezone: values.timezone,
    }

    const result = await updateProfile(profileData)
    
    if (result.success) {
      // Profile updated successfully
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Profile Settings</h1>
          <p className="mt-2 text-gray-600">
            Manage your account settings and preferences.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Form */}
          <div className="lg:col-span-2">
            <div className="card">
              <div className="card-header">
                <h3 className="text-lg font-semibold text-gray-900">Personal Information</h3>
                <p className="mt-1 text-sm text-gray-600">
                  Update your personal details and contact information.
                </p>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="card-body space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Input
                    name="firstName"
                    label="First Name"
                    placeholder="Enter your first name"
                    value={values.firstName}
                    error={touched.firstName ? errors.firstName : undefined}
                    required
                    onChange={handleChange('firstName')}
                    onBlur={handleBlur('firstName')}
                  />

                  <Input
                    name="lastName"
                    label="Last Name"
                    placeholder="Enter your last name"
                    value={values.lastName}
                    error={touched.lastName ? errors.lastName : undefined}
                    required
                    onChange={handleChange('lastName')}
                    onBlur={handleBlur('lastName')}
                  />
                </div>

                <Input
                  name="displayName"
                  label="Display Name"
                  placeholder="Enter your display name"
                  value={values.displayName}
                  onChange={handleChange('displayName')}
                  onBlur={handleBlur('displayName')}
                />

                <Input
                  name="phone"
                  label="Phone Number"
                  type="tel"
                  placeholder="Enter your phone number"
                  value={values.phone}
                  error={touched.phone ? errors.phone : undefined}
                  onChange={handleChange('phone')}
                  onBlur={handleBlur('phone')}
                />

                <Input
                  name="bio"
                  label="Bio"
                  type="textarea"
                  placeholder="Tell us about yourself"
                  value={values.bio}
                  onChange={handleChange('bio')}
                  onBlur={handleBlur('bio')}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="label">Language</label>
                    <select
                      name="locale"
                      value={values.locale}
                      onChange={handleChange('locale')}
                      className="input"
                    >
                      <option value="en">English</option>
                      <option value="es">Spanish</option>
                      <option value="fr">French</option>
                      <option value="de">German</option>
                    </select>
                  </div>

                  <div>
                    <label className="label">Timezone</label>
                    <select
                      name="timezone"
                      value={values.timezone}
                      onChange={handleChange('timezone')}
                      className="input"
                    >
                      <option value="UTC">UTC</option>
                      <option value="America/New_York">Eastern Time</option>
                      <option value="America/Chicago">Central Time</option>
                      <option value="America/Denver">Mountain Time</option>
                      <option value="America/Los_Angeles">Pacific Time</option>
                    </select>
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button
                    type="submit"
                    disabled={!isValid || isSubmitting}
                    loading={isSubmitting || isLoading}
                  >
                    {isSubmitting || isLoading ? 'Saving...' : 'Save Changes'}
                  </Button>
                </div>
              </form>
            </div>
          </div>

          {/* Account Info */}
          <div className="space-y-6">
            <div className="card">
              <div className="card-header">
                <h3 className="text-lg font-semibold text-gray-900">Account Information</h3>
              </div>
              <div className="card-body space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">Email Address</label>
                  <p className="text-sm text-gray-900">{user?.email}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Account Status</label>
                  <p className="text-sm text-green-600 capitalize">{user?.status}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Member Since</label>
                  <p className="text-sm text-gray-900">
                    {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
                  </p>
                </div>
              </div>
            </div>

            <div className="card">
              <div className="card-header">
                <h3 className="text-lg font-semibold text-gray-900">Security</h3>
              </div>
              <div className="card-body space-y-4">
                <Button variant="outline" className="w-full">
                  Change Password
                </Button>
                <Button variant="outline" className="w-full">
                  Two-Factor Authentication
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
