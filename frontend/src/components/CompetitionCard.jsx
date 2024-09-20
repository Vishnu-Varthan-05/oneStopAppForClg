import WishlistButton from './WishlistButton';

export default function CompetitionCard({ competition }) {
  const coloredStars = Array.from({ length: competition.importancelvl }, (_, i) => '★').join('');
  const emptyStars = Array.from({ length: 5 - competition.importancelvl }, (_, i) => '☆').join('');

  return (
    <div className="bg-purewhite p-6 rounded-lg shadow-sm border border-purple">
      <div className="flex justify-between items-start">
        <h2 className="text-purple text-lg font-bold">
          {competition.name}
        </h2>
        <WishlistButton item={competition} type="competition" />
      </div>
      <div className="mt-4 text-lightblack">
        <p><strong>Hosted by:</strong> {competition.hostedby}</p>
        <p><strong>Importance Level:</strong> {coloredStars}{emptyStars}</p>
      </div>
    </div>
  );
}
