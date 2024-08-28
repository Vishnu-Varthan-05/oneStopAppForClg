import React from 'react';

export default function Webinar({ webinarName, conductedBy, venue, date }) {
  const webinarList = Array.from({ length: 10 }, (_, index) => ({
    webinarName: `${webinarName} ${index + 1}`,
    conductedBy,
    venue,
    date,
  }));

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {Array.from({ length: 10 }).map((_, index) => (
        <div key={index} className="bg-lightpurple p-6 rounded-lg shadow-md">
          <div className="flex justify-between items-start">
            <h2 className="text-white text-lg font-bold">
              {webinarName || `Webinar ${index + 1}`}
            </h2>
            <button className="text-grey hover:text-white">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                ></path>
              </svg>
            </button>
          </div>
          <div className="mt-4 text-grey">
            <p><strong>Conducted by:</strong> {conductedBy || 'Name'}</p>
            <p><strong>Venue:</strong> {venue || 'Venue'}</p>
            <p><strong>Date:</strong> {date || 'Date'}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
