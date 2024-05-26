import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { message } from 'antd';
import '../css/Login.css';
const Login = () => {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [errMessage, setErrMessage] = useState("");

  const { loading, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleShowHidePassword = () => {
    setIsShowPassword((prev) => !prev);
  };

  const handleClick = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });

    try {
      const res = await axios.post(
        "http://localhost:8080/api/login",
        credentials,
        { withCredentials: true }
      );

      if (res.data.user.role === "Admin") {
        dispatch({ type: "LOGIN_SUCCESS", payload: res.data.user });
        message.success("Login successful!");
        navigate("/");
      } else {
        dispatch({
          type: "LOGIN_FAILURE",
          payload: { message: "You are not allowed!" },
        });
        message.error("You are not allowed to login!");
      }
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE", payload: err.response.data });
      setErrMessage(err.response.data.message);
    }
  };

  return (
    <div className="login-background">
      <div className="login-container">
        <div className="login-content">
          <div className="text-login">Login</div>
          <div className="login-input">
            <label>Username:</label>
            <input
              type="text"
              placeholder="Enter username"
              id="username"
              value={credentials.username}
              onChange={handleChange}
            />
          </div>
          <div className="login-input">
            <label>Password:</label>
            <div className="show-hide-password">
              <input
                type={isShowPassword ? "text" : "password"}
                placeholder="Enter your password"
                id="password"
                value={credentials.password}
                onChange={handleChange}
              />
              <span onClick={handleShowHidePassword}>
                <i className={isShowPassword ? "fas fa-eye-slash" : "fas fa-eye"}></i>
              </span>
            </div>
          </div>
          <div className="error-message">{errMessage}</div>
          <div>
            <button className="btn-login" onClick={handleClick}>
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;