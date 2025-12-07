import React from "react";

interface DottedCircleProps {
  size?: number;      // ukuran keseluruhan (px)
  color?: string;     // warna titik
  dotSize?: number;   // tebal titik
  gap?: number;       // jarak antar titik (mengatur jumlah)
  className?: string; // optional styling tambahan
}

const DottedCircle: React.FC<DottedCircleProps> = ({
  size = 24,
  color = "#000",
  dotSize = 2,
  gap = 6,
  className = "",
}) => {
  const radius = size / 2 - dotSize;

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      className={className}
    >
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke={color}
        strokeWidth={dotSize}
        strokeDasharray={`${dotSize} ${gap}`}
        strokeLinecap="round"
      />
    </svg>
  );
};

export default DottedCircle;
