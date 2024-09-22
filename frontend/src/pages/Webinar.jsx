import { useQuery } from '@tanstack/react-query';
import { fetchData } from '../api';
import WebinarCard from '../components/WebinarCard';

export default function Webinar() {
  const { data, error, isLoading } = useQuery({
    queryKey: ['webinars'],
    queryFn: () => fetchData('students/webinar'),
  });

  if (isLoading) {
    return <p>Loading webinars...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 ml-28">
      {data.data.map((webinar, index) => (
        <WebinarCard key={webinar.id} webinar={webinar} />
      ))}
    </div>
  );
}
