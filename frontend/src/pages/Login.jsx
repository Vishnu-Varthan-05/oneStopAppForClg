import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import TextInput from '../components/TextInput';
import Button from '../components/Button';
import { postData } from '../api';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: async ({ email, password }) => {
      const response = await postData('/students/login', { email, password });
      return response;
    },
    onError: (error) => {
      console.error('Login failed:', error);
      setError('Login failed. Please check your credentials and try again.');
    },
    onSuccess: (data) => {
      localStorage.setItem('token', data.token);
      navigate('/');
    }
  });

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) navigate('/');
  }, [navigate]);

  const handleLogin = (e) => {
    e.preventDefault();
    mutation.mutate({ email, password });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-md w-full p-8 border border-gray-300 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-purple">Login</h2>
        <form onSubmit={handleLogin} className="mt-4 space-y-4">
          <TextInput
            id="email"
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <TextInput
            id="password"
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Button type="submit" disabled={mutation.isLoading}>
            {mutation.isLoading ? 'Logging in...' : 'Login'}
          </Button>
          {error && <p className="mt-2 text-red-600">{error}</p>}
        </form>
      </div>
    </div>
  );
}
