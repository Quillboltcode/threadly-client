import React from "react";

interface LogoProps extends React.SVGProps<SVGSVGElement> {
  width?: number | string;
  height?: number | string;
}

const LogoComponent: React.FC<LogoProps> = ({
  width = 100,
  height = 100,
  className,
  ...props
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    viewBox="0 0 100 100"
    className={className}
    {...props}
  >
    <style>
      {
        `.thread {
          fill: none;
          stroke: #007bff;
          stroke-width: 4;
          stroke-linecap: round;
          stroke-linejoin: round;
        }`
      }
    </style>
    <circle cx={50} cy={50} r={40} className="thread" />
    <path d="M50,10 a40,40 0 0,1 0,80 a40,40 0 0,1 0,-80" className="thread" />
    <circle cx={50} cy={50} r={6} fill="#007bff" />
    <circle cx={30} cy={30} r={6} fill="#007bff" />
    <circle cx={70} cy={30} r={6} fill="#007bff" />
    <circle cx={30} cy={70} r={6} fill="#007bff" />
    <circle cx={70} cy={70} r={6} fill="#007bff" />
    <line x1={50} y1={50} x2={30} y2={30} className="thread" />
    <line x1={50} y1={50} x2={70} y2={30} className="thread" />
    <line x1={50} y1={50} x2={30} y2={70} className="thread" />
    <line x1={50} y1={50} x2={70} y2={70} className="thread" />
  </svg>
);

export default LogoComponent;
