import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { setAccount, setLogout } from "../../slices/account-slice/AccountSlice";
const Navbar = () => {
  const account = useAppSelector((state) => state.account);
  const dispatch = useAppDispatch();
  // which user is logged in
  useEffect(() => {
    if (localStorage.getItem("currentUser")) {
      dispatch(setAccount());
      console.log(account);
    }
  }, []);

  return (
    <nav className="navbar navbar-dark navbar-light bg-dark p-2">
      <div className="buyem navbar-brand">
        <a href={`/`}>BUYEM</a>
      </div>
      <div className="link-container">
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul
            className="d-flex justify-content-between align-items-center w-100 p-4 navbar-nav"
            id="navnavnav"
          >
            <li className="nav-item">
              <a href={`/marketplace`}>Market Place</a>
            </li>
            <li className="nav-item">
              <a href={`/article`}>Article</a>
            </li>
            <div className="account-nav d-flex justify-content-center align-items-center">
              <li className="nav-item ">
                <a href={`/account`}>
                  {account.userName !== "default"
                    ? account.userName
                    : "Account"}
                </a>
              </li>
              <li className="nav-item ">
                <a href={`/cart`} className="cart-icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="30"
                    height="30"
                    fill="currentColor"
                    className="bi bi-cart "
                    viewBox="0 0 16 16"
                  >
                    <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
                  </svg>
                  <div className="cart-number">
                    {JSON.parse(localStorage.getItem("userCart")!)?.reduce(
                      (acc: number, cur: Storage) => {
                        return acc + cur.quantity;
                      },
                      0
                    ) || 0}
                  </div>
                </a>
              </li>
              <li className="nav-item ">
                {/* if logout =logout */}
                <a href={`/login`}>
                  {account.loginState ? (
                    <div
                      onClick={() => {
                        dispatch(setLogout());
                      }}
                    >
                      Logout
                    </div>
                  ) : (
                    "Login"
                  )}
                </a>
              </li>
            </div>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

// OG

// <nav className="navbar navbar-dark navbar-light bg-dark p-2">
//   <div className="buyem navbar-brand">
//     <a href={`/`}>BUYEM</a>
//   </div>
//   <div className="link-container">
//     <button
//       className="navbar-toggler"
//       type="button"
//       data-bs-toggle="collapse"
//       data-bs-target="#navbarNav"
//       aria-controls="navbarNav"
//       aria-expanded="false"
//       aria-label="Toggle navigation"
//     >
//       <span className="navbar-toggler-icon"></span>
//     </button>
//     <div className="collapse navbar-collapse" id="navbarNav">
//       <ul
//         className="d-flex justify-content-between align-items-center w-100 p-4 navbar-nav"
//         id="navnavnav"
//       >
//         <li className="nav-item">
//           <a href={`/marketplace`}>Market Place</a>
//         </li>
//         <li className="nav-item">
//           <a href={`/article`}>Article</a>
//         </li>
//         <div className="account-nav d-flex justify-content-center align-items-center">
//           <li className="nav-item ">
//             <a href={`/account`}>
//               {account.userName !== "default"
//                 ? account.userName
//                 : "Account"}
//             </a>
//           </li>
//           <li className="nav-item ">
//             <a href={`/cart`} className="cart-icon">
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 width="30"
//                 height="30"
//                 fill="currentColor"
//                 className="bi bi-cart "
//                 viewBox="0 0 16 16"
//               >
//                 <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
//               </svg>
//               <div className="cart-number">
//                 {JSON.parse(localStorage.getItem("userCart")!)?.reduce(
//                   (acc: number, cur: Storage) => {
//                     return acc + cur.quantity;
//                   },
//                   0
//                 ) || 0}
//               </div>
//             </a>
//           </li>
//           <li className="nav-item ">
//             {/* if logout =logout */}
//             <a href={`/login`}>
//               {account.loginState ? (
//                 <div
//                   onClick={() => {
//                     dispatch(setLogout());
//                   }}
//                 >
//                   Logout
//                 </div>
//               ) : (
//                 "Login"
//               )}
//             </a>
//           </li>
//         </div>
//       </ul>
//     </div>
//   </div>
// </nav>
