import React, { useState } from "react";
import useLogin from "../../Hooks/useLogin";
import "./login.scss";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login, loading, isError } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(email, password);
  };
  return (
    <section>
      <form className="form" onSubmit={handleSubmit}>
        <div className="login">
          <div className="input_email">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="input_pass">
            <input
              placeholder="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {isError && <div> Incorrenct email/Password</div>}
          <button className="s_btn" disabled={loading} type="submit">
            {" "}
            Login{" "}
          </button>
          <p className="message">
            Not registered? <a href="/signup">Create an account</a>
          </p>
        </div>
      </form>
    </section>
  );
};

export default Login;
