import { useState } from 'react';
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';
import { fetchData } from '../api';
import TimetableCard from '../components/TimetableCard';

export default function Timetable() {
  const [date, setDate] = useState(new Date());
  const queryClient = useQueryClient();

  const { data, error, isLoading } = useQuery({
    queryKey: ['timetable', date.toISOString().split('T')[0]],
    queryFn: () => fetchData(`students/timetable?date=${date.toISOString().split('T')[0]}`),
  });

  const handleDateChange = (newDate) => {
    setDate(newDate);
    queryClient.invalidateQueries('timetable');
  };

  if (isLoading) {
    return <p>Loading timetable...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <div className="max-w-7xl mx-auto ">
      <h1 className="text-2xl font-bold mb-4 text-grey">Timetable for {date.toDateString()}</h1>
      <input
        type="date"
        value={date.toISOString().split('T')[0]}
        onChange={(e) => handleDateChange(new Date(e.target.value))}
        className="bg-purewhite p-2 border border-purple rounded-md w-full mb-4"
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {data.data.map((timetable, index) => (
          <TimetableCard key={timetable.id} timetable={timetable} />
        ))}
      </div>
    </div>
  );
}
