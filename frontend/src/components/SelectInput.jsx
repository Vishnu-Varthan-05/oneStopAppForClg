const SelectInput = ({
  id,
  label,
  options,
  value,
  onChange,
  required,
  labelClass = "block text-sm font-medium text-gray-700",
  selectClass = "mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm",
}) => (
  <div>
    <label className={labelClass} htmlFor={id}>{label}</label>
    <select
      id={id}
      name={id}
      value={value}
      onChange={onChange}
      className={selectClass}
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