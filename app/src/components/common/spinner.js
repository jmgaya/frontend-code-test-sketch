import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const WithRotation = styled.svg`
  display: flex;
  justify-content: center;
  align-items: center;
  animation: spinner 0.6s linear infinite;

  @keyframes spinner {
    to {
      transform: rotate(360deg);
    }
  }
`;

const Spinner = ({ delayDurationInMs = 800 }) => {
  const [hidden, setHidden] = React.useState(true);

  React.useEffect(() => {
    const handler = setTimeout(() => {
      setHidden(false);
    }, Number.parseInt(delayDurationInMs));
    return () => {
      clearTimeout(handler);
    };
  }, [delayDurationInMs]);

  return hidden ? (
    false
  ) : (
    <WithRotation
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      width="42"
      height="42"
    >
      {" "}
      <defs>
        {" "}
        <radialGradient
          cx="97.483%"
          cy="28.573%"
          fx="97.483%"
          fy="28.573%"
          r="168.336%"
          gradientTransform="translate(0.974834,0.285734),rotate(-3.337588),scale(1.000000,0.404040),translate(-0.974834,-0.285734)"
          id="a"
        >
          {" "}
          <stop stopColor="#f06e00" offset="0%" />{" "}
          <stop stopColor="#f06e00" stopOpacity=".816" offset="18.426%" />{" "}
          <stop stopColor="#f06e00" stopOpacity="0" offset="100%" />{" "}
        </radialGradient>{" "}
      </defs>{" "}
      <g fill="none" fillRule="evenodd">
        {" "}
        <rect fillOpacity="0" fill="#FF0000" width="24" height="24" />{" "}
        <path
          d="M12,23 C5.92486775,23 1,18.0751322 1,12 C1,5.92486775 5.92486775,1 12,1 C18.0751322,1 23,5.92486775 23,12 C23,18.0751322 18.0751322,23 12,23 Z"
          stroke="url(#a)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray="48.33 69.117"
        />{" "}
      </g>
    </WithRotation>
  );
};

Spinner.propTypes = {
  delayDurationInMs: PropTypes.number,
};

export default Spinner;
