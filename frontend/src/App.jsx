import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Layout from './components/Layout';
import Timetable from './components/Timetable';
import Event from './components/Event';
import Webinar from './components/Webinar';
import Competition from './components/Competition';
import Signup from './pages/Signup';
import Login from './pages/Login';
import AuthRoute from './components/AuthRoute'; 
import "./index.css";

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
            <Route index element={<AuthRoute element={<Timetable />} protected />} />
            <Route path="timetable" element={<AuthRoute element={<Timetable />} protected />} />
            <Route path="webinar" element={<AuthRoute element={<Webinar />} protected />} />
            <Route path="events" element={<AuthRoute element={<Event />} protected />} />
            <Route path="competitions" element={<AuthRoute element={<Competition />} protected />} />
          </Route>
        </Routes>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
