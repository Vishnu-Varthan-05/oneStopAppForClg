import { useNavigate } from 'react-router-dom';

export default function Logout() {
  const navigate = useNavigate();

  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <a href="/login" onClick={handleLogout} className="text-lightpurple hover:text-white px-3 py-2 rounded-md text-sm font-medium">
      Logout
    </a>
  );
}
