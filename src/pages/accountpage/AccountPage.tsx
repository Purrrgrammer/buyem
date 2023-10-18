import { useAppSelector } from "../../hooks";
import { AccountPageDetail } from "../../component/moreaccountpage/AccountPageDetail";
import { User } from "../../model";

const AccountPage = () => {
  const account = useAppSelector((state) => state.account);
  const addres = useAppSelector((state) => state.account.orders);
  console.log(addres);
  return (
    <div className="page my-3">
      <div className="myaccount">
        <h1 className="my-4">My Account</h1>
        <div className="d-flex justify-content-center my-3">
          <img className="user-image" src={account.image} alt="" />
          <div className="d-flex flex-column justify-content-center align-content-center text-start mx-4">
            <div className="fw-bold"> {account.userName}</div>
            <div> {account.userEmail}</div>
            <a className="items-in-cart" href="/cart">
              {`Items in Cart: ${
                JSON.parse(localStorage.getItem("userCart")!)?.length || 0
              }`}
            </a>
          </div>
        </div>
      </div>
      {/* profile */}

      <AccountPageDetail account={account} />
    </div>
  );
};

export default AccountPage;
