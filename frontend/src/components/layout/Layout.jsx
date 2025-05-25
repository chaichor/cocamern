import { Outlet } from 'react-router-dom';
import Header from './Header';

const Layout = () => {
  return (
    <div className="h-screen w-screen flex flex-col overflow-hidden bg-gray-100 font-montserrat">
      <Header />
      <main className="flex-1 w-full overflow-auto">
        <div className="w-full px-3 sm:px-4 md:px-6 py-4 sm:py-6 mx-auto max-w-full sm:max-w-xl md:max-w-3xl lg:max-w-5xl xl:max-w-7xl">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Layout;
