import { NavLink, useHref, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Nav = () => {
  const token = localStorage.getItem('token');

  const hRef = useHref();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    toast.success('Successfully logged out user');
    setTimeout(() => {
      navigate('/login');
    }, 500);
  };

  return (
    <div className="text-white flex items-center gap-x-4">
      <NavLink className={hRef === '/' && 'font-semibold'} to={'/'}>
        Add Product
      </NavLink>
      <NavLink className={hRef === '/all' && 'font-semibold'} to={'/all'}>
        All Products
      </NavLink>
      <NavLink
        className={hRef === '/messages' && 'font-semibold'}
        to={'/messages'}
      >
        Messages
      </NavLink>
      <NavLink className={hRef === '/login' && 'font-semibold'} to={'/login'}>
        Login
      </NavLink>
      <button
        disabled={!token}
        className="p-0 bg-gray-900 text-white"
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  );
};

export default Nav;
