import { useEffect, useState } from "react";

export function DeleteIcon() {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="14.46"
      height="15.955"
      viewBox="0 0 14.46 15.955"
    >
      <g
        id="Icon_feather-trash"
        data-name="Icon feather-trash"
        transform="translate(-4 -2.5)"
      >
        <path
          id="Path_7"
          data-name="Path 7"
          d="M4.5,9H17.96"
          transform="translate(0 -3.009)"
          fill="none"
          stroke={isMobile ? "#fff" : "#e23161"}
        />
        <path
          id="Path_8"
          data-name="Path 8"
          d="M17.969,5.991V16.46a1.5,1.5,0,0,1-1.5,1.5H9a1.5,1.5,0,0,1-1.5-1.5V5.991m2.243,0V4.5a1.5,1.5,0,0,1,1.5-1.5H14.23a1.5,1.5,0,0,1,1.5,1.5v1.5"
          transform="translate(-1.504)"
          fill="none"
          stroke={isMobile ? "#fff" : "#e23161"}
        />
      </g>
    </svg>
  );
}
