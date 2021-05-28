import { useCallback, useState, useContext } from "react";
import { withRouter, useHistory } from "react-router";
import { Link } from "react-router-dom";
import { app } from "../../base";

const SignUp = () => {
  const [error, setError] = useState<string>("");
  const history = useHistory();
  const handleSignUp = useCallback(
    async (event) => {
      event.preventDefault();
      const { email, password, name } = event.target.elements;
      try {
        await app.createUserWithEmailAndPassword(email.value, password.value);
        let user = app.currentUser;
        if (user)
          user
            .updateProfile({
              displayName: name.value,
            })
            .then(
              function () {},
              function (error) {
                console.log(error);
              }
            );
        history.push("/");
      } catch (error) {
        setError("email or password can not be blank");
        console.log("invalid credentials", error);
      }
    },
    [history]
  );

  return (
    <div>
      <form onSubmit={handleSignUp} className="signup_form">
        <p>Sign up</p>
        <br />
        <label>
          <input name="name" type="text" placeholder="name" />
        </label>
        <span>{error}</span>
        <label>
          <input name="email" type="email" placeholder="Email" />
        </label>
        <br />
        <span>{error}</span>
        <label>
          <input name="password" type="password" placeholder="Password" />
        </label>
        <br />
        <button type="submit">Sign Up</button>
        <Link to="/login">&larr; Already Signed Up? Sign In</Link>
      </form>
    </div>
  );
};

export default withRouter(SignUp);
