import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Zap } from 'lucide-react';

export function Login() {
  const { signInWithGoogle, user } = useAuth();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  return (
    <div className="min-h-screen bg-teal-900 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="glass-card rounded-2xl p-8">
          <div className="flex justify-center mb-8">
            <Zap className="w-12 h-12 text-purple-500" />
          </div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-teal-900">
            Sign in to BK Scanner
          </h2>
          <p className="mt-2 text-center text-sm text-teal-600">
            Use your Google account to sign in
          </p>
          <div className="mt-8">
            <button
              onClick={signInWithGoogle}
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gradient-to-r from-teal-600 to-teal-500 hover:from-teal-700 hover:to-teal-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 transition-all shadow-lg hover:shadow-xl"
            >
              Continue with Google
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}