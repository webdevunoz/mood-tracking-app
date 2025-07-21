import "./NavbarComponent.css";

const NavbarComponent = () => {
  return ( 
    <nav id="header-nav">
      <img src="/src/assets/images/logo.svg" alt="Mood tracker logo" />
      <div id="nav-profile-btn">
        <img id="nav-profile-img" src="/src/assets/images/avatar-lisa.jpg" alt="Profile picture" />
        <span><img src="/src/assets/images/icon-dropdown-arrow.svg" alt="" /></span>
      </div>
    </nav>
)};

export default NavbarComponent;