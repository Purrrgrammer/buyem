// import { useEffect } from "react";
import { useEffect } from "react";
import "./App.css";
const dispatch = useAppDispatch();
import { useAppDispatch } from "./hooks/index";
import { getDataFromLocalStorage } from "./slices/account-slice/AccountSlice";
function App() {
  useEffect(() => {
    if (localStorage.getItem("userCart")) {
      // console.log(JSON.parse(localStorage.getItem("userCart")));
      dispatch(getDataFromLocalStorage());
      // console.log(cart);
    }
  }, []);
  // useEffect(() => {
  //   if (localStorage.getItem("userCart")) {
  //   }
  // }, [localStorage.getItem("userCart")]);

  return <div className="App"></div>;
}

export default App;
