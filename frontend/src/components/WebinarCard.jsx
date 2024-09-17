import WishlistButton from './WishlistButton';

export default function WebinarCard({ webinar }) {
  return (
    <div className="bg-lightpurple p-6 rounded-lg shadow-md">
      <div className="flex justify-between items-start">
        <h2 className="text-white text-lg font-bold">
          {webinar.name || `Webinar ${webinar.id}`}
        </h2>
        <WishlistButton item={webinar} type="webinar" />
      </div>
      <div className="mt-4 text-lightblack">
        <p><strong>Conducted by:</strong> {webinar.conductedBy || 'Name'}</p>
        <p><strong>Venue:</strong> {webinar.venue || 'Venue'}</p>
        <p><strong>Date:</strong> {new Date(webinar.date).toLocaleDateString()}</p>
        <p><strong>Time:</strong> {webinar.time || 'Time'}</p>
      </div>
    </div>
  );
}
