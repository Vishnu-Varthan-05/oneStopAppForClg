import { useQuery } from '@tanstack/react-query';
import { fetchData } from '../api';
import EventCard from '../components/EventCard';

export default function Event() {
  const { data, error, isLoading } = useQuery({
    queryKey: ['events'],
    queryFn: () => fetchData('students/event'),
  });

  if (isLoading) {
    return <p>Loading events...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {data.data.map((event, index) => (
        <EventCard key={event.id} event={event} />
      ))}
    </div>
  );
}
