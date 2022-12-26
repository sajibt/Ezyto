import React, { useState } from "react";
import { useSignup } from "../../Hooks/useSignup";
import "./signup.scss";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const { signup, loading, isError } = useSignup();

  const handleSubmit = async (e) => {
    e.preventDefault();

    await signup(email, password, name);
  };
  return (
    <section>
      <form className="form" onSubmit={handleSubmit}>
        <div className="signup">
          <div className="input_username">
            <input
              type="text"
              placeholder="Username"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="input_email">
            <input
              placeholder="Email"
              type="email"
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
          {isError && <div> Error </div>}
          <button className="s_btn" disabled={loading} type="submit">
            {" "}
            Signup{" "}
          </button>
          <p className="message">
            Already registered? <a href="/login">Sign In</a>
          </p>
        </div>
      </form>
    </section>
  );
};
export default Signup;
