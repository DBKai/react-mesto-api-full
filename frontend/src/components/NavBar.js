function NavBar({loggedIn, email, onLogout}) {

  function handleLogout() {
    onLogout();
  }

  return (
    <div className="menu">
      { loggedIn && <p className="menu__email">{email}</p> }
      { loggedIn && <button className="menu__button-logout" onClick={handleLogout}>Выйти</button> }
    </div>
  );
}

export default NavBar;