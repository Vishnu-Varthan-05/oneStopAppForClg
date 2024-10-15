import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchData, postData } from '../api'; 
import SelectInput from './SelectInput';
import TextInput from './TextInput';

const EventCompetitionForm = () => {
  const [formType, setFormType] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    hostedby: '',
    importancelvl: '',
    reglink: '',
    conductedBy: '',
    venue: '',
    date: '',
    time: '',
    description: '',
    type: '',
    year: '',
    department: '',
    expiresAt: '',
  });

  const queryClient = useQueryClient();

  const { data: years, isLoading: loadingYears, error: errorYears } = useQuery({
    queryKey: ['years'], 
    queryFn: () => fetchData('year')
  });

  const { data: departments, isLoading: loadingDepartments, error: errorDepartments } = useQuery({
    queryKey: ['departments'], 
    queryFn: () => fetchData('department')
  });

  const handleFormTypeChange = (e) => {
    setFormType(e.target.value);
    setFormData({ ...formData, type: e.target.value === 'competition' ? '0' : '1' });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const mutation = useMutation({
    mutationFn: () => {
      const endpoint = formType === 'competition' ? 'faculty/competitions' : 'faculty/webevents';
      return postData(endpoint, formData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(); 
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate();
  };

  if (loadingYears || loadingDepartments) {
    return <div>Loading...</div>;
  }

  if (errorYears || errorDepartments) {
    return <div>Error loading data: {errorYears?.message || errorDepartments?.message}</div>;
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <SelectInput
        id="formType"
        label="Select Form Type"
        options={[
          { id: 'competition', name: 'Competition' },
          { id: 'webinar', name: 'Webinar/Event' },
        ]}
        value={formType}
        onChange={handleFormTypeChange}
        required
      />

      {formType && (
        <>
          <TextInput 
            id="name" 
            label={formType === 'competition' ? "Competition Name" : "Webinar/Event Name"} 
            value={formData.name} 
            onChange={handleInputChange} 
            required 
          />
          
          {formType === 'competition' ? (
            <>
              <TextInput 
                id="hostedby" 
                label="Hosted By" 
                value={formData.hostedby} 
                onChange={handleInputChange} 
                required 
              />
              <TextInput 
                id="importancelvl" 
                label="Importance Level" 
                type="number" 
                value={formData.importancelvl} 
                onChange={handleInputChange} 
                required 
              />
              <TextInput 
                id="reglink" 
                label="Registration Link" 
                value={formData.reglink} 
                onChange={handleInputChange} 
                required 
              />
            </>
          ) : (
            <>
              <TextInput 
                id="conductedBy" 
                label="Conducted By" 
                value={formData.conductedBy} 
                onChange={handleInputChange} 
                required 
              />
              <TextInput 
                id="venue" 
                label="Venue" 
                value={formData.venue} 
                onChange={handleInputChange} 
                required 
              />
              <TextInput 
                id="date" 
                label="Date" 
                type="date" 
                value={formData.date} 
                onChange={handleInputChange} 
                required 
              />
              <TextInput 
                id="time" 
                label="Time" 
                type="time" 
                value={formData.time} 
                onChange={handleInputChange} 
                required 
              />
              <TextInput 
                id="description" 
                label="Description" 
                value={formData.description} 
                onChange={handleInputChange} 
                required 
              />
            </>
          )}

          <SelectInput
            id="type"
            label="Type"
            options={formType === 'competition' 
              ? [{ id: '0', name: 'Internal' }, { id: '1', name: 'External' }]
              : [{ id: '0', name: 'Webinar' }, { id: '1', name: 'Event' }]
            }
            value={formData.type}
            onChange={handleInputChange}
            required
          />

          <SelectInput
            id="year"
            label="Year"
            options={years}
            value={formData.year}
            onChange={handleInputChange}
            required
          />

          <SelectInput
            id="department"
            label="Department"
            options={departments}
            value={formData.department}
            onChange={handleInputChange}
            required
          />

          <TextInput 
            id="expiresAt" 
            label="Expires At" 
            type="datetime-local" 
            value={formData.expiresAt} 
            onChange={handleInputChange} 
            required 
          />
        </>
      )}

      <button type="submit" className="mt-4 px-4 py-2 bg-purple text-purewhite rounded hover:bg-purple-700">
        Submit
      </button>

      {mutation.isError && <p>Error submitting form: {mutation.error.message}</p>}
      {mutation.isSuccess && <p>Form submitted successfully!</p>}
    </form>
  );
};

export default EventCompetitionForm;