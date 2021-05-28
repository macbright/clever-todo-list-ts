import { useCallback, useContext, useState } from "react";
import { withRouter, Redirect, useHistory } from "react-router";
import { Link } from "react-router-dom";
import { app } from "../../base";
import { AuthContext } from "../Auth";

const Login = () => {
  const [error, setError] = useState<string>("");
  const history = useHistory();
  const handleLogin = useCallback(
    async (event) => {
      event.preventDefault();
      const { email, password } = event.target.elements;
      try {
        await app.signInWithEmailAndPassword(email.value, password.value);
        history.push("/");
      } catch (error) {
        setError("Incorrect email address or password");
        console.log("Incorrect email address or password", error);
      }
    },
    [history]
  );

  const { currentUser } = useContext(AuthContext);

  if (currentUser) {
    return <Redirect to="/" />;
  }

  return (
    <div>
      <form onSubmit={handleLogin} className="login_form">
        <p>Log in</p>
        <span>{error}</span>
        <label>
          <input name="email" type="email" placeholder="Email" />
        </label>
        <br />
        <label>
          <input name="password" type="password" placeholder="Password" />
        </label>
        <br />
        <button type="submit">Log in</button>
        <Link to="/signup">&larr; New User? Sign Up</Link>
      </form>
    </div>
  );
};

export default withRouter(Login);
