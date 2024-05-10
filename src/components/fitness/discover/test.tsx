import React, { useState } from "react";

const MuscleSVGTest = () => {
  // const [isHovered, setHovered] = useState(false);
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      xmlSpace="preserve"
      className="h-full w-full"
      viewBox="0 0 200 400"
      id="human-muscles-svg"
      // onMouseOver={() => setHovered(true)}
      // onMouseOut={() => setHovered(false)}
    >
      {/* Head */}
      <circle cx="100" cy="50" r="20" fill="lightgray" />

      {/* Torso */}
      <rect x="80" y="70" width="40" height="80" fill="lightblue" />

      {/* Arms */}
      <rect x="60" y="70" width="20" height="80" fill="lightgreen" />
      <rect x="120" y="70" width="20" height="80" fill="lightgreen" />

      {/* Legs */}
      <rect x="90" y="150" width="20" height="80" fill="lightcoral" />
      <rect x="90" y="240" width="20" height="80" fill="lightcoral" />

      {/* Muscles (simplified shapes) */}
      <circle cx="80" cy="120" r="8" fill="red" />
      <circle cx="120" cy="120" r="8" fill="red" />
      <circle cx="80" cy="200" r="8" fill="red" />
      <circle cx="120" cy="200" r="8" fill="red" />
      <circle cx="90" cy="280" r="8" fill="red" />
      <circle cx="90" cy="320" r="8" fill="red" />

      {/* Connective lines (simplified) */}
      <line x1="80" y1="120" x2="90" y2="150" stroke="gray" strokeWidth="2" />
      <line x1="120" y1="120" x2="90" y2="150" stroke="gray" strokeWidth="2" />
      <line x1="80" y1="200" x2="90" y2="240" stroke="gray" strokeWidth="2" />
      <line x1="120" y1="200" x2="90" y2="240" stroke="gray" strokeWidth="2" />
      <line x1="90" y1="280" x2="90" y2="320" stroke="gray" strokeWidth="2" />

      {/* Heart (simplified) */}
      <path
        d="M100 70 Q110 60, 120 70 Q130 80, 120 90 Q110 100, 100 90 Q90 80, 100 70"
        fill="red"
        className="hover:scale-105 duration-100 ease-linear origin-[center_center]"
      />
    </svg>
  );
};

export default MuscleSVGTest;
