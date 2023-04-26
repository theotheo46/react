import { Outlet } from 'react-router-dom';
import Navigation from '../components/Navigation/Navigation';

const Layout: React.FC = () => {
  return (
    <>
      <Navigation />
      <Outlet />
    </>
  );
};

export default Layout;
