import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Layout from './components/Layout';
import Timetable from './pages/Timetable';
import Event from './pages/Event';
import Webinar from './pages/Webinar';
import Competition from './pages/Competition';
import Signup from './pages/Signup';
import Login from './pages/Login';
import AuthRoute from './components/AuthRoute'; 
import Dashboard from './pages/Dashboard';
import "./index.css";
import Wishlist from './pages/Wishlist';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Layout />}>
            <Route index element={<AuthRoute element={<Timetable />} />} />
            <Route path="timetable" element={<AuthRoute element={<Timetable />} requiredUserType="student"/>} />
            <Route path="webinar" element={<AuthRoute element={<Webinar />} requiredUserType="student"/>} />
            <Route path="events" element={<AuthRoute element={<Event />} requiredUserType="student"/>} />
            <Route path="competitions" element={<AuthRoute element={<Competition />} requiredUserType="student"/>} />
            <Route path="wishlist" element={<AuthRoute element={<Wishlist/>} requiredUserType="student"/>} />
          </Route>
          <Route path="/dashboard" element={<AuthRoute element={<Dashboard />} requiredUserType="faculty" />} />
        </Routes>
      </Router>
    </QueryClientProvider>
  );
}


export default App;
