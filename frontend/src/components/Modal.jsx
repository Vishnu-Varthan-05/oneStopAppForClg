import { useEffect } from 'react';

export default function Modal({ isOpen, onClose, data, type }) {
  if (!isOpen) return null;

  data = data[0];
  const coloredStars = Array.from({ length: data.importancelvl }, (_, i) => '★').join('');
  const emptyStars = Array.from({ length: 5 - data.importancelvl }, (_, i) => '☆').join('');

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => (document.body.style.overflow = 'unset');
  }, [isOpen]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50 transition-opacity ease-in duration-300">
      <div className="bg-white w-full max-w-md p-6 md:p-8 rounded-xl shadow-xl transform transition-transform duration-300 scale-100 opacity-100 relative mx-4">
        <button
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 focus:outline-none"
          onClick={onClose}
          aria-label="Close Modal"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        <div className="mb-6">
          <h2 className="text-3xl font-bold text-purple text-center mb-2">{data.name}</h2>
          <hr className="border-purple-dark mb-4" />
        </div>

        <div className="text-gray-600 text-lg leading-relaxed grid grid-cols-2 gap-2">
          {type === 'competition' && (
            <>
              <p><strong>Hosted by</strong></p>
              <p>{data.hostedby}</p>
              <p><strong>Category</strong></p>
              <p>{data.type}</p>
              <p><strong>Importance Level</strong></p>
              <p>{coloredStars}{emptyStars}</p>
              <p><strong>Posted by</strong></p>
              <p>{data.postedBy}</p>
              <p><strong>Registration Link</strong></p>
              <p>
                <a href={data.reglink} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                  {data.reglink}
                </a>
              </p>
              <p><strong>Year</strong></p>
              <p>{data.year}</p>
              <p><strong>Department</strong></p>
              <p>{data.department}</p>
            </>
          )}
          {type === 'event' && (
            <>
              <p><strong>Organiser</strong></p>
              <p>{data.organiser}</p>
              <p><strong>Conducted by</strong></p>
              <p>{data.conductedBy}</p>
              <p><strong>Venue</strong></p>
              <p>{data.venue}</p>
              <p><strong>Date</strong></p>
              <p>{new Date(data.date).toLocaleDateString()}</p>
              <p><strong>Time</strong></p>
              <p>{data.time}</p>
              <p><strong>Description</strong></p>
              <p>{data.description}</p>
              <p><strong>Year</strong></p>
              <p>{data.year}</p>
              <p><strong>Department</strong></p>
              <p>{data.department}</p>
            </>
          )}
          {type === 'webinar' && (
            <>
              <p><strong>Organiser</strong></p>
              <p>{data.organiser}</p>
              <p><strong>Conducted by</strong></p>
              <p>{data.conductedBy}</p>
              <p><strong>Venue</strong></p>
              <p>{data.venue}</p>
              <p><strong>Date</strong></p>
              <p>{new Date(data.date).toLocaleDateString()}</p>
              <p><strong>Time</strong></p>
              <p>{data.time}</p>
              <p><strong>Description</strong></p>
              <p>{data.description}</p>
              <p><strong>Year</strong></p>
              <p>{data.year}</p>
              <p><strong>Department</strong></p>
              <p>{data.department}</p>
            </>
          )}
        </div>
        <div className="mt-6 flex justify-end">
          <button
            className="bg-purple text-white px-6 py-2 rounded-lg shadow-md hover:bg-purple-dark transition-colors duration-300 transform hover:scale-105 focus:outline-none"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
