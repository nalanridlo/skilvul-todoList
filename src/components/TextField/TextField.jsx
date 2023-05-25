import PropTypes from 'prop-types';

const TextField = ({ handleChange, name, value,className }) => {
    return (
      <input
        onChange={handleChange}
        value={value}
        className={className}
        placeholder="{text}"
        type="text"
        name={name}
      />
    );
  };

 TextField.propTypes = {
    handleChange: PropTypes.func,
    name: PropTypes.string,
    value: PropTypes.string,
    className: PropTypes.string,
 };

  export default TextField;