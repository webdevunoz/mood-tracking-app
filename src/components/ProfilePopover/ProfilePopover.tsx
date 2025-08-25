import "./ProfilePopover.css";
import React from "react";
import "./ProfilePopover.css";
import { useAuth } from "../../context/AuthContext";

interface ProfilePopoverProps {
  ref: React.Ref<HTMLDivElement>;
  onClose: () => void;
  onSettingsClick: () => void;
}

const ProfilePopover = ({
  ref,
  onClose,
  onSettingsClick,
}: ProfilePopoverProps) => {
  const { user } = useAuth();
  const name = user?.name;
  const email = user?.email;

  return (
    <div className="popover-wrapper">
      <div role="menu" ref={ref} className="menu-wrapper">
        <div className="menu-user-info">
          <p className="text-preset-6 text-neutral-900">{name}</p>
          <p className="text-preset-7 text-neutral-300">{email}</p>
        </div>
        <div className="menu-divider"></div>
        <div className="menu-buttons">
          <button
            className="menu-button"
            onClick={() => {
              onSettingsClick();
              onClose();
            }}
          >
            <img
              src="/src/assets/images/icon-settings.svg"
              alt=""
              aria-hidden="true"
            />
            Settings
          </button>
          <button className="menu-button">
            <img
              src="/src/assets/images/icon-logout.svg"
              alt=""
              aria-hidden="true"
            />
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePopover;
