import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchData } from '../api';
import Modal from '../components/Modal';
import WishlistButton from './WishlistButton';
import detailsIcon from '../assets/expand_purple.svg'; 
import NotifyButton from './NotifyButton';
export default function CompetitionCard({ competition }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isFetched, setIsFetched] = useState(false);

  const { data, error, isLoading } = useQuery({
    queryKey: ['competition', competition.id],
    queryFn: () => fetchData(`students/competition/${competition.id}`),
    enabled: isOpen && !isFetched,
    onSuccess: () => setIsFetched(true),
  });

  if (isLoading) {
    return <p>Loading competition...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <div className="relative bg-purewhite p-6 rounded-lg shadow-sm border border-purple">
      <div className="flex justify-between items-start">
        <h2 className="text-purple text-lg font-bold">
          {competition.name}
        </h2>
        <div className="flex-col justify-end">
          <WishlistButton item={competition} type="competition" />
          <NotifyButton/>
        </div>
      </div>
      <div className="mt-2 text-lightblack grid grid-cols-2 gap-1">
        <p><strong>Hosted by</strong></p>
        <p>{competition.hostedby}</p>
        <p><strong>Importance Level</strong></p>
        <p>{Array.from({ length: competition.importancelvl }, (_, i) => '★').join('')}{Array.from({ length: 5 - competition.importancelvl }, (_, i) => '☆').join('')}</p>
      </div>

      <img
        src={detailsIcon}
        alt="View Details"
        className="absolute bottom-4 right-4 w-8 h-8 cursor-pointer transition-transform transform hover:scale-110"
        onClick={() => setIsOpen(true)} 
      />

      {isOpen && (
        <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} data={data} type="competition" />
      )}
    </div>
  );
}
