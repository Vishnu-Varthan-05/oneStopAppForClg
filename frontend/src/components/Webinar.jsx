import React from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { fetchData, postData } from '../api'; 
import heartIcon from '../assets/heart.svg';
import heartIconRed from '../assets/heartfill.svg';

export default function Webinar() {
  const { data, error, isLoading } = useQuery({
    queryKey: ['webinars'],
    queryFn: () => fetchData('students/webinar'),
  });

  const mutation = useMutation({
    mutationFn: (webinar) => postData('users/wishlist', webinar),
    onSuccess: () => {
      alert('Webinar added to wishlist!');
    },
    onError: (error) => {
      console.error('Error adding to wishlist:', error);
    }
  });

  const handleAddToWishlist = (webinar) => {
    mutation.mutate(webinar);
  };

  if (isLoading) {
    return <p>Loading webinars...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {data.data.map((webinar, index) => (
        <div key={webinar.id} className="bg-lightpurple p-6 rounded-lg shadow-md">
          <div className="flex justify-between items-start">
            <h2 className="text-white text-lg font-bold">
              {webinar.name || `Webinar ${index + 1}`}
            </h2>
            <button
              className="text-grey hover:text-white"
              onClick={() => handleAddToWishlist(webinar)}
            >
              {webinar.isWishlist === 1 ? (
                <img src={heartIconRed} alt="Remove from wishlist" className="w-6 h-6" />
          
              ) : (
                <img src={heartIcon} alt="Add to wishlist" className="w-6 h-6" />
              )}
            </button>
          </div>
          <div className="mt-4 text-lightblack">
            <p><strong>Conducted by:</strong> {webinar.conductedBy || 'Name'}</p>
            <p><strong>Venue:</strong> {webinar.venue || 'Venue'}</p>
            <p><strong>Date:</strong> {new Date(webinar.date).toLocaleDateString()}</p>
            <p><strong>Time:</strong> {webinar.time || 'Time'}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
