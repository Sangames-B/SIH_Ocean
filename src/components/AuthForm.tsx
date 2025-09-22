import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Waves, Shield, Users, Heart, User } from 'lucide-react';

export const AuthForm: React.FC = () => {
  const { signIn, signUp } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    role: 'citizen' as const,
    region: '',
    organization: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (isLogin) {
        await signIn(formData.email, formData.password);
      } else {
        await signUp(formData.email, formData.password, {
          name: formData.name,
          role: formData.role,
          region: formData.region,
          organization: formData.organization
        });
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const roleOptions = [
    { value: 'citizen', label: 'Citizen', icon: User, description: 'General public access' },
    { value: 'volunteer', label: 'Volunteer', icon: Heart, description: 'Emergency response volunteer' },
    { value: 'official', label: 'Official', icon: Shield, description: 'Government official' },
    { value: 'ngo', label: 'NGO', icon: Users, description: 'Non-governmental organization' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center px-4">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <div className="flex justify-center items-center space-x-3 mb-4">
            <Waves className="w-12 h-12 text-blue-600" />
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                Threat Detection
              </h1>
              <p className="text-blue-600 font-medium">Alert System</p>
            </div>
          </div>
          <h2 className="text-xl text-gray-600 dark:text-gray-300">
            {isLogin ? 'Sign in to your account' : 'Create your account'}
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
            Protecting coastal communities through early warning systems
          </p>
        </div>

        {/* Form */}
        <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            {!isLogin && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    placeholder="Enter your full name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                    Account Type
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {roleOptions.map((role) => {
                      const Icon = role.icon;
                      return (
                        <label
                          key={role.value}
                          className={`relative flex flex-col items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 ${
                            formData.role === role.value 
                              ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' 
                              : 'border-gray-300 dark:border-gray-600'
                          }`}
                        >
                          <input
                            type="radio"
                            name="role"
                            value={role.value}
                            checked={formData.role === role.value}
                            onChange={(e) => setFormData({ ...formData, role: e.target.value as any })}
                            className="sr-only"
                          />
                          <Icon className={`w-6 h-6 mb-2 ${
                            formData.role === role.value ? 'text-blue-600' : 'text-gray-400'
                          }`} />
                          <span className={`text-sm font-medium ${
                            formData.role === role.value 
                              ? 'text-blue-700 dark:text-blue-300' 
                              : 'text-gray-700 dark:text-gray-300'
                          }`}>
                            {role.label}
                          </span>
                          <span className="text-xs text-gray-500 dark:text-gray-400 text-center mt-1">
                            {role.description}
                          </span>
                        </label>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Region
                  </label>
                  <select
                    required
                    value={formData.region}
                    onChange={(e) => setFormData({ ...formData, region: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  >
                    <option value="">Select your region</option>
                    <option value="Coastal Zone A">Coastal Zone A</option>
                    <option value="Coastal Zone B">Coastal Zone B</option>
                    <option value="Coastal Zone C">Coastal Zone C</option>
                    <option value="Inland Region">Inland Region</option>
                  </select>
                </div>

                {(formData.role === 'official' || formData.role === 'ngo') && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Organization
                    </label>
                    <input
                      type="text"
                      value={formData.organization}
                      onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      placeholder="Enter your organization name"
                    />
                  </div>
                )}
              </>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Email Address
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                placeholder="Enter your email"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Password
              </label>
              <input
                type="password"
                required
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                placeholder="Enter your password"
                minLength={6}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Please wait...' : (isLogin ? 'Sign In' : 'Create Account')}
            </button>

            <div className="text-center">
              <button
                type="button"
                onClick={() => setIsLogin(!isLogin)}
                className="text-blue-600 hover:text-blue-500 text-sm font-medium"
              >
                {isLogin ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
              </button>
            </div>
          </form>
        </div>

        {/* Footer */}
        <div className="text-center text-xs text-gray-500 dark:text-gray-400">
          <p>Emergency Hotline: <a href="tel:+1-800-TSUNAMI" className="text-blue-600 font-medium">+1-800-TSUNAMI</a></p>
          <p className="mt-1">For immediate emergencies, call your local emergency services</p>
        </div>
      </div>
    </div>
  );
};