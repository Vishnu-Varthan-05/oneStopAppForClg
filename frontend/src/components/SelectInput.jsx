const SelectInput = ({ id, label, options, value, onChange, required }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700" htmlFor={id}>{label}</label>
    <select
      id={id}
      name={id}
      value={value}
      onChange={onChange}
      className="mt-1 block w-full px-3 py-2 border border-gray-300 shadow-sm focus:outline-none focus:ring-purple focus:border-purple sm:text-sm"
      required={required}
    >
      <option value="" disabled>Select {label}</option>
      {options.map((option) => (
        <option key={option.id} value={option.id}>{option.name}</option>
      ))}
    </select>
  </div>
);

export default SelectInput;
