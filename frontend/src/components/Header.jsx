import { Link } from 'react-router-dom';
import Logout from "./Logout";

export default function Header() {
  return (
    <header className="bg-purple">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex-shrink-0 flex items-center">
            <h1 className='text-white text-2xl font-bold'>ONESTOP COLLEGE APP</h1>
          </div>
          <div className="flex items-center space-x-4">
            <Link to="/timetable" className='text-lightpurple hover:text-white px-3 py-2 rounded-md text-sm font-medium'>TimeTable</Link>
            <Link to="/webinar" className='text-lightpurple hover:text-white px-3 py-2 rounded-md text-sm font-medium'>Webinars</Link>
            <Link to="/events" className='text-lightpurple hover:text-white px-3 py-2 rounded-md text-sm font-medium'>Events</Link>
            <Link to="/competitions" className='text-lightpurple hover:text-white px-3 py-2 rounded-md text-sm font-medium'>Competitions</Link>
            <Logout/>
          </div>
        </div>
      </div>
    </header>
  );
}
