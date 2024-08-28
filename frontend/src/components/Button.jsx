export default function Button({ type = 'button', onClick, children, className = '' }) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`px-4 py-2  text-lightpurple font-semibold shadow-sm transition  hover:bg-purple hover:text-white trans focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple border-solid border-2 ${className}`}
    >
      {children}
    </button>
  );
};
