import { useState } from "react";
import { loginIcon, passwordIcon } from "../../assets/login/asset.js";
import { useAppDispatch, useAppSelector } from "../../hooks/index.js";
import { login } from "../../slices/account-slice/AccountSlice.js";

export function Login() {
  const loginStatus = useAppSelector((state) => state.account.loginState);
  const dispatch = useAppDispatch();
  const handleOnSubmit = () => {
    dispatch(login(loginInput));
    // alert(JSON.stringify(loginInput));
  };
  const [loginInput, setLoginInput] = useState({
    userName: "",
    password: "",
  });

  const onchangeInput = (e: any) => {
    setLoginInput({ ...loginInput, [e.target.name]: e.target.value });
    console.log(loginInput);
  };
  return (
    <div className="page">
      {loginStatus ? (
        <div className="my-4">
          <h1>Successful Login</h1>
        </div>
      ) : (
        <form
          onSubmit={handleOnSubmit}
          className="login-container d-flex align-items-center"
        >
          <div className="block-container d-flex flex-column ">
            <div className="block d-flex">
              <img className="login-icon" src={loginIcon} alt="login-icon" />
              <input
                name="userName"
                type="text"
                placeholder="USERNAME"
                onChange={onchangeInput}
              />
            </div>
            <div className="block d-flex">
              <img className="login-icon" src={passwordIcon} alt="login-icon" />
              <input
                name="password"
                type="password"
                placeholder="PASSWORD"
                onChange={onchangeInput}
              />
            </div>
          </div>
          <button type="submit">Login</button>
        </form>
      )}
    </div>
  );
}

export default Login;
