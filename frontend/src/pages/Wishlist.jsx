import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchData } from '../api';
import EventCard from '../components/EventCard';
import WebinarCard from '../components/WebinarCard';
import CompetitionCard from '../components/CompetitionCard';
import SelectInput from '../components/SelectInput';

export default function Wishlist() {
  // Set default selectedType to 'competition'
  const [selectedType, setSelectedType] = useState('competition');

  const { data, error, isLoading } = useQuery({
    queryKey: ['wishlist', selectedType],
    queryFn: async () => {
      if (selectedType === 'event') {
        return await fetchData('students/wishlist/event');
      } else if (selectedType === 'webinar') {
        return await fetchData('students/wishlist/webinar');
      } else if (selectedType === 'competition') {
        return await fetchData('students/wishlist/competition');
      } else {
        return { data: [] }; // Default return an empty data array
      }
    },
    enabled: !!selectedType, // Only run query when a type is selected
  });

  const handleTypeChange = (e) => {
    setSelectedType(e.target.value);
  };

  return (
    <div>
      <SelectInput
        id="type"
        label="Select Type"
        options={[
          { id: 'event', name: 'Event' },
          { id: 'webinar', name: 'Webinar' },
          { id: 'competition', name: 'Competition' },
        ]}
        value={selectedType}
        onChange={handleTypeChange}
        labelClass="block text-lg font-semibold text-purple" 
        selectClass="mt-2 block w-full px-4 py-3 border border-purple" 
      />
      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error.message}</p>
      ) : data?.data?.length ? ( 
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-10">
          {data.data.map((item) => {
            if (selectedType === 'event') {
              return <EventCard key={item.id} event={item} />;
            } else if (selectedType === 'webinar') {
              return <WebinarCard key={item.id} webinar={item} />;
            } else if (selectedType === 'competition') {
              return <CompetitionCard key={item.id} competition={item} />;
            } else {
              return null;
            }
          })}
        </div>
      ) : (
        <p className='mt-10'>No items found</p>
      )}
    </div>
  );
}
