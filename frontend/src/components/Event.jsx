import React from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { fetchData, postData } from '../api'; 
import heartIcon from '../assets/heart.svg';
import heartIconRed from '../assets/heartfill.svg';

export default function Event() {
  const { data, error, isLoading } = useQuery({
    queryKey: ['events'],
    queryFn: () => fetchData('students/event'),
  });

  const mutation = useMutation({
    mutationFn: (event) => postData('users/wishlist', event),
    onSuccess: () => {
      alert('event added to wishlist!');
    },
    onError: (error) => {
      console.error('Error adding to wishlist:', error);
    }
  });

  const handleAddToWishlist = (event) => {
    mutation.mutate(event);
  };

  if (isLoading) {
    return <p>Loading events...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {data.data.map((event, index) => (
        <div key={event.id} className="bg-lightpurple p-6 rounded-lg shadow-md">
          <div className="flex justify-between items-start">
            <h2 className="text-white text-lg font-bold">
              {event.name || `event ${index + 1}`}
            </h2>
            <button
              className="text-grey hover:text-white"
              onClick={() => handleAddToWishlist(event)}
            >
              {event.isWishlist === 1 ? (
                <img src={heartIconRed} alt="Remove from wishlist" className="w-6 h-6" />
          
              ) : (
                <img src={heartIcon} alt="Add to wishlist" className="w-6 h-6" />
              )}
            </button>
          </div>
          <div className="mt-4 text-lightblack">
            <p><strong>Conducted by:</strong> {event.conductedBy || 'Name'}</p>
            <p><strong>Venue:</strong> {event.venue || 'Venue'}</p>
            <p><strong>Date:</strong> {new Date(event.date).toLocaleDateString()}</p>
            <p><strong>Time:</strong> {event.time || 'Time'}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
