import React, { useState } from 'react';
import { postData } from "../api";
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    regno: '',
    year: '',
    department: '',
    email: '',
    password: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await postData('student/signup', formData);
      navigate('/login'); 
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <div className="max-w-md w-full p-8 bg-purple text-white rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-8 text-center">Sign Up</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-lightpurple rounded-md focus:outline-none focus:ring-2 focus:ring-purple"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="regno">Registration Number</label>
            <input
              type="text"
              id="regno"
              name="regno"
              value={formData.regno}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-lightpurple rounded-md focus:outline-none focus:ring-2 focus:ring-purple"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="year">Year</label>
            <input
              type="number"
              id="year"
              name="year"
              value={formData.year}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-lightpurple rounded-md focus:outline-none focus:ring-2 focus:ring-purple"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="department">Department</label>
            <input
              type="text"
              id="department"
              name="department"
              value={formData.department}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-lightpurple rounded-md focus:outline-none focus:ring-2 focus:ring-purple"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-lightpurple rounded-md focus:outline-none focus:ring-2 focus:ring-purple"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-lightpurple rounded-md focus:outline-none focus:ring-2 focus:ring-purple"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-lightpurple text-white rounded-md shadow-md hover:bg-grey focus:outline-none focus:ring-2 focus:ring-purple"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
