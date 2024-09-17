import WishlistButton from './WishlistButton';

export default function EventCard({ event }) {
  return (
    <div className="bg-lightpurple p-6 rounded-lg shadow-md">
      <div className="flex justify-between items-start">
        <h2 className="text-white text-lg font-bold">
          {event.name || `Event ${event.id}`}
        </h2>
        <WishlistButton item={event} type="event" />
      </div>
      <div className="mt-4 text-lightblack">
        <p><strong>Conducted by:</strong> {event.conductedBy || 'Name'}</p>
        <p><strong>Venue:</strong> {event.venue || 'Venue'}</p>
        <p><strong>Date:</strong> {new Date(event.date).toLocaleDateString()}</p>
        <p><strong>Time:</strong> {event.time || 'Time'}</p>
      </div>
    </div>
  );
}
