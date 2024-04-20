import PropTypes from 'prop-types';

const Logo = ({ name }) => {
  return <span className="text-white text-lg font-bold">{name}</span>;
};

Logo.propTypes = {
  name: PropTypes.string.isRequired,
};

export default Logo;
