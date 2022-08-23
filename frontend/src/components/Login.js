import { useState } from "react";

function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    onLogin(email, password);
  }

  function handleChange(event) {
    const input = event.target;
    if (input.name === "email") {
      setEmail(input.value);
    }
    if (input.name === "password") {
      setPassword(input.value);
    }
  }

  return (
    <div className="form">
      <h2 className="form__heading">Вход</h2>
      <form className="form__container" onSubmit={handleSubmit} noValidate>
        <fieldset className="form__item-container">
          <input
            className="form__item"
            name="email"
            type="email"
            placeholder="Email"
            minLength="8"
            maxLength="50"
            value={email}
            onChange={handleChange}
            required />
          <input
            className="form__item"
            name="password"
            type="password"
            placeholder="Пароль"
            minLength="8"
            maxLength="50"
            value={password}
            onChange={handleChange}
            required />
        </fieldset>
        <button className="form__submit-button">Войти</button>
      </form>
    </div>
  );
}

export default Login;
