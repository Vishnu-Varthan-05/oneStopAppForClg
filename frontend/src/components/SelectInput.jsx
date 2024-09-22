const SelectInput = ({
  id,
  label,
  options,
  value,
  onChange,
  required,
  labelClass = "block text-sm font-medium text-gray",
  selectClass = "mt-1 block w-full px-3 py-2 focus:outline-none focus:ring-purple focus:border-purple sm:text-sm bg-",
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
        <option style={{backgroundColor:'black'}} key={option.id} value={option.id}>{option.name}</option>
      ))}
    </select>
  </div>
);

export default SelectInput;
