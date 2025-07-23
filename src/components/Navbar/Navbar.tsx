import { useEffect, useRef, useState } from "react";
import "./Navbar.css";
import ProfilePopover from "../ProfilePopover/ProfilePopover";
import SettingsModal from "../SettingsModal/SettingsModal";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const buttonRef = useRef<HTMLDivElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (
        !buttonRef.current?.contains(target) &&
        !popoverRef.current?.contains(target)
      ) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      <nav id="header-nav">
        <img src="/src/assets/images/logo.svg" alt="Mood tracker logo" />
        <div
          id="nav-profile-btn"
          ref={buttonRef}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <img
            id="nav-profile-img"
            src="/src/assets/images/avatar-lisa.jpg"
            alt="Profile picture"
          />
          <span>
            <img src="/src/assets/images/icon-dropdown-arrow.svg" alt="" />
          </span>
        </div>
      </nav>
      {isMenuOpen && (
        <ProfilePopover
          ref={popoverRef}
          onClose={() => setIsMenuOpen(false)}
          onSettingsClick={() => setIsSettingsOpen(true)}
        />
      )}
      {isSettingsOpen && (
        <SettingsModal onClose={() => setIsSettingsOpen(false)} />
      )}
    </>
  );
};

export default Navbar;
