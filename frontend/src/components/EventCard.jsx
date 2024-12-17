import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchData } from '../api';
import Modal from '../components/Modal';
import WishlistButton from './WishlistButton';
import detailsIcon from '../assets/expand_purple.svg'; 
import NotifyButton from './NotifyButton';
export default function EventCard({ event }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isFetched, setIsFetched] = useState(false);

  const { data, error, isLoading } = useQuery({
    queryKey: ['event', event.id],
    queryFn: () => fetchData(`students/event/${event.id}`),
    enabled: isOpen && !isFetched,
    onSuccess: () => setIsFetched(true),
  });

  if (isLoading) {
    return <p>Loading event...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <div className="relative bg-purewhite p-6 rounded-lg shadow-sm border border-purple">
      <div className="flex justify-between items-start">
        <h2 className="text-purple text-lg font-bold">
          {event.name || `Event ${event.id}`}
        </h2>
        <div className="flex-col justify-end">
          <WishlistButton item={event} type="event" />
          <NotifyButton /> 
        </div>
      </div>
      <div className="mt-2 text-lightblack grid grid-cols-2 gap-1">
        <p><strong>Conducted by</strong></p>
        <p>{event.conductedBy || 'Name'}</p>
        <p><strong>Venue</strong></p>
        <p>{event.venue || 'Venue'}</p>
        <p><strong>Date</strong></p>
        <p>{new Date(event.date).toLocaleDateString()}</p>
        <p><strong>Time</strong></p>
        <p>{event.time || 'Time'}</p>
      </div>
      
      <img
        src={detailsIcon}
        alt="View Details"
        className="absolute bottom-4 right-4 w-8 h-8 cursor-pointer transition-transform transform hover:scale-110"
        onClick={() => setIsOpen(true)} 
      />

      {isOpen && (
        <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} data={data} type={"event"} />
      )}
    </div>
  );
}
