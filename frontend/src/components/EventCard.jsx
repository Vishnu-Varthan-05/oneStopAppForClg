import WishlistButton from './WishlistButton';

export default function EventCard({ event }) {
  return (
    <div className="bg-purewhite p-6 rounded-lg shadow-sm border border-purple">
      <div className="flex justify-between items-start">
        <h2 className="text-purple text-lg font-bold">
          {event.name || `Event ${event.id}`}
        </h2>
        <WishlistButton item={event} type="event" />
      </div>
      <div className="mt-4 text-ligh">
        <p><strong>Conducted by:</strong> {event.conductedBy || 'Name'}</p>
        <p><strong>Venue:</strong> {event.venue || 'Venue'}</p>
        <p><strong>Date:</strong> {new Date(event.date).toLocaleDateString()}</p>
        <p><strong>Time:</strong> {event.time || 'Time'}</p>
      </div>
    </div>
  );
}
