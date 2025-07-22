import "./ProfilePopover.css";

interface ProfilePopoverProps {
  ref: React.Ref<HTMLDivElement>;
}

const ProfilePopover = ({ ref }: ProfilePopoverProps) => {
  return (
    <div className="popover-wrapper">
      <div role="menu" ref={ref} className="menu-wrapper">
        <div className="menu-user-info">
          <p className="text-preset-6 text-neutral-900">Lisa Maria</p>
          <p className="text-preset-7 text-neutral-300">lisa@mail.com</p>
        </div>
        <div className="menu-divider"></div>
        <div className="menu-buttons">
          <button className="menu-button">
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
