import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchData, postData } from '../api';
import SelectInput from './SelectInput';
import TextInput from './TextInput';
import TimetableCard from './TimetableCard';

const TimeTableForm = () => {
  const [formData, setFormData] = useState({
    year: '',
    department: '',
    date: new Date().toISOString().split('T')[0],
    from: '',
    to: '',
    description: '',
  });

  const queryClient = useQueryClient();

  const { data: years = [], isLoading: loadingYears, error: errorYears } = useQuery({
    queryKey: ['years'],
    queryFn: () => fetchData('year'),
  });

  const { data: departments = [], isLoading: loadingDepartments, error: errorDepartments } = useQuery({
    queryKey: ['departments'],
    queryFn: () => fetchData('department'),
  });

  const { 
    data: timetableData, 
    isLoading: loadingTimetable, 
    error: errorTimetable,
  } = useQuery({
    queryKey: ['timetable', formData.year, formData.department, formData.date],
    queryFn: () => fetchData(`faculty/timetable?studentYear=${formData.year}&studentDepartment=${formData.department}&date=${formData.date}`),
    enabled: !!formData.year && !!formData.department && !!formData.date,
  });

  const mutation = useMutation({
    mutationFn: (data) => postData('faculty/timetable', data),
    onSuccess: () => {
      queryClient.invalidateQueries(['timetable']);
      setFormData((prevData) => ({
        ...prevData,
        from: '',
        to: '',
        description: '',
      }));
    },
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleDateChange = (newDate) => {
    setFormData((prevData) => ({ ...prevData, date: newDate }));
    queryClient.invalidateQueries(['timetable']);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate(formData);
  };

  if (loadingYears || loadingDepartments) {
    return <div>Loading...</div>;
  }

  if (errorYears || errorDepartments) {
    return <div>Error loading data: {errorYears?.message || errorDepartments?.message}</div>;
  }

  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-grey">Timetable for {new Date(formData.date).toDateString()}</h1>
      <form onSubmit={handleSubmit} className="space-y-3 mb-4">
        <SelectInput
          id="year"
          name="year"
          label="Year"
          options={years}
          value={formData.year}
          onChange={handleInputChange}
          required
        />
        <SelectInput
          id="department"
          name="department"
          label="Department"
          options={departments}
          value={formData.department}
          onChange={handleInputChange}
          required
        />
        <TextInput
          id="date"
          name="date"
          label="Date"
          type="date"
          value={formData.date}
          onChange={(e) => handleDateChange(e.target.value)}
          required
          className="bg-purewhite p-2 border border-purple rounded-md w-full"
        />
        {loadingTimetable && <p>Loading timetable...</p>}
        {errorTimetable && <p>Error loading timetable: {errorTimetable.message}</p>}
        {!loadingTimetable && !errorTimetable && timetableData && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {timetableData.data.map((timetable) => (
                <TimetableCard key={timetable.id} timetable={timetable} />
            ))}
            </div>
        )}
        <TextInput
          id="from"
          name="from"
          label="From"
          type="time"
          value={formData.from}
          onChange={handleInputChange}
          required
        />
        <TextInput
          id="to"
          name="to"
          label="To"
          type="time"
          value={formData.to}
          onChange={handleInputChange}
          required
        />
        <TextInput
          id="description"
          name="description"
          label="Description"
          value={formData.description}
          onChange={handleInputChange}
          required
        />
        <button type="submit" className="mt-4 px-4 py-2 bg-purple text-purewhite rounded hover:bg-purple-700" disabled={mutation.isLoading}>
          {mutation.isLoading ? 'Submitting...' : 'Submit'}
        </button>
      </form>
    
      {mutation.isError && (
        <p className="text-red-500">Error submitting form: {mutation.error?.response?.data?.message || mutation.error.message}</p>
      )}
      {mutation.isSuccess && <p className="text-green-500">Form submitted successfully!</p>}
    </div>
  );
};

export default TimeTableForm;