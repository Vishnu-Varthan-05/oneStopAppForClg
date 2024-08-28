const TextInput = ({ id, label, type = 'text', value, onChange, required }) => (
    <div>
      <label className="block text-sm font-medium text-purple" htmlFor={id}>{label}</label>
      <input
        type={type}
        id={id}
        name={id}
        value={value}
        onChange={onChange}
        className="mt-1 block w-full px-3 py-2 border border-gray-300 shadow-sm focus:outline-none focus:ring-purple focus:border-purple sm:text-sm"
        required={required}
      />
    </div>
  );
  
  export default TextInput;
  