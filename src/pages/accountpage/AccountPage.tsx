import { useAppSelector } from "../../hooks";
import { AccountPageDetail } from "../../component/moreaccountpage/AccountPageDetail";

const AccountPage = () => {
  const account = useAppSelector((state) => state.account);
  const address = useAppSelector((state) => state.account.orders);
  console.log(address);
  return (
    <div className="page my-3">
      <div className="myaccount">
        <h1 className="m-4">My Account</h1>
        <div className="account-info d-flex justify-content-center my-4 mt-5">
          <img className="user-image" src={account.image} alt="" />
          <div className="d-flex flex-column justify-content-center align-content-center text-start mx-4">
            <div className="fw-bold"> {account.userName}</div>
            <div> {account.userEmail}</div>
            <a className="items-in-cart" href="/cart">
              {`Items in Cart: ${
                JSON.parse(localStorage.getItem("userCart")!)?.reduce(
                  (acc: number, cur: Storage) => {
                    return acc + cur.quantity;
                  },
                  0
                ) || 0
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
