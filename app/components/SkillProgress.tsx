// app/components/ProgressCircle.tsx
import { useEffect, useRef } from "react";

interface ProgressCircleProps {
  percent: number;
  circleFill?: string;
  circleEmpty?: string;
  size?: string;
}

export default function ProgressCircle({
  percent,
  circleFill = "#00BC91",
  circleEmpty = "#777777",
  size = "w-32 h-32 md:w-40 md:h-40",
}: ProgressCircleProps) {
  const circleRef = useRef<SVGCircleElement>(null); // Correct type for SVG circle

  useEffect(() => {
    if (circleRef.current) {
      const circumference = 2 * Math.PI * 45; // 45 is the radius of the circle
      const offset = circumference - (percent / 100) * circumference;

      circleRef.current.style.strokeDasharray = `${circumference} ${circumference}`;
      circleRef.current.style.strokeDashoffset = `${offset}`;
      circleRef.current.style.stroke = circleFill;
    }
  }, [percent, circleFill]);

  return (
    <div className={`relative ${size} mx-auto`}>
      <svg className="w-full h-full" viewBox="0 0 100 100">
        <circle
          className="text-gray-200 dark:text-gray-700"
          cx="50"
          cy="50"
          r="45"
          fill="none"
          stroke={circleEmpty}
          strokeWidth="5"
        />
        <circle
          ref={circleRef} // Correctly typed ref
          cx="50"
          cy="50"
          r="45"
          fill="none"
          strokeWidth="5"
          strokeLinecap="round"
          className="transition-all duration-500 ease-in-out"
          transform="rotate(-90 50 50)"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center text-2xl font-semibold text-black dark:text-white">
        {percent}%
      </div>
    </div>
  );
}