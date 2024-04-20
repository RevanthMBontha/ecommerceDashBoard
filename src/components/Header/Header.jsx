import Logo from './Logo';
import Nav from './Nav';

const Header = () => {
  return (
    <div className="sticky top-0 z-10 bg-gray-900">
      <div className="flex justify-between items center w-1/2 mx-auto p-4 px-8">
        <Logo name="UrbanForge" />
        <Nav />
      </div>
    </div>
  );
};

export default Header;
