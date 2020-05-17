import PropTypes from "prop-types";

export const artboard = PropTypes.shape({
  name: PropTypes.string.isRequired,
  files: PropTypes.arrayOf(
    PropTypes.shape({
      url: PropTypes.string.isRequired,
      width: PropTypes.number.isRequired,
      height: PropTypes.number.isRequired,
    })
  ),
});
