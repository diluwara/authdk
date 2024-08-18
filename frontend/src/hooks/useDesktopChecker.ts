import { useState, useEffect } from "react";

const isWindowDesktopWidth = () => window.innerWidth > 768;

const useDesktopChecker = () => {
  const [isDesktop, setIsDesktop] = useState(isWindowDesktopWidth);
  useEffect(() => {
    const handleResize = () => setIsDesktop(isWindowDesktopWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return isDesktop;
};

export default useDesktopChecker;
