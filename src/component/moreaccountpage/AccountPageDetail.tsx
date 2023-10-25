import { useState } from "react";
import { accountpage } from "../../base";
import { Orders, User } from "../../model";
type propType = { account: User };
export const AccountPageDetail = ({ account }: propType) => {
  const [content, setContent] = useState("none");
  const [active, setActive] = useState();
  const handleOnActive = (key: any) => {
    // : React.ChangeEvent<HTMLInputElement>
    setActive(key);
    console.log(key);
  };
  var acccontent;
  const personalContent = (
    <div className="container1 d-flex flex-column">
      <div>
        <strong>Personal Name:</strong> {account.fullname}
      </div>
      <div>
        <strong>Email:</strong> {account.userEmail}
      </div>
      <div>
        <strong>Birth Date:</strong> {account.birthDate}
      </div>
      <div>
        <strong>Country:</strong> {account.country}
      </div>
    </div>
  );

  const addressContent = (
    <div className="container1 d-flex flex-column ">
      <div>
        <strong>Reciever Name:</strong> {account.fullname}
      </div>
      <div>
        <strong>Billing Address:</strong> {account.address.billingAddress}
      </div>
      <div>
        <strong>Shipping Address:</strong> {account.address.shippingAddress}
      </div>
    </div>
  );

  const ordersContent = (
    <table className="account-order-content">
      <tr>
        <th>No.</th>
        <th>orderId</th>
        <th>orderDate</th>{" "}
      </tr>
      {JSON.parse(localStorage.getItem("newOrders")!)?.map((el: Orders) => (
        <tr key={el.orderNumber}>
          <td>{el.orderNumber}</td>
          <td>{el.orderId}</td>
          <td>{el.orderDate}</td>
        </tr>
      )) ||
        account.orders?.map((el) => (
          <tr key={el.orderNumber}>
            <td>{el.orderNumber}</td>
            <td>{el.orderId}</td>
            <td>{el.orderDate}</td>
          </tr>
        ))}
    </table>
  );

  switch (content) {
    case "Personal Info":
      acccontent = personalContent;
      break;
    case "Address":
      acccontent = addressContent;
      break;
    case "Orders":
      acccontent = ordersContent;
      break;
    case "Favorite":
      // acccontent = favoriteContent;
      break;
    default:
      acccontent = `" Welcome, ${account.fullname} "`;
  }
  return (
    <>
      <div className="d-flex justify-content-center">
        <div>
          {accountpage.map((el, key) => {
            return (
              <button
                key={key}
                onClick={() => {
                  setContent(el.name);
                  handleOnActive(key);
                }}
                className={`account-select d-flex justify-content-between align-items-center 
                  ${active === key ? "active" : undefined}
                `}
              >
                <img className="account-icon" src={el.icon}></img>
                <div className="font-weight-bold">{el.name.toUpperCase()}</div>
                <img
                  style={{ height: "12px" }}
                  src="https://images.vexels.com/media/users/3/136983/isolated/preview/73c5e7dbef9d885a306c8927ef12f465-thick-right-arrowhead.png"
                  alt=""
                />
              </button>
            );
          })}
        </div>
        <div className="account-display d-flex flex-row justify-content-center text-start p-3">
          <div className="">{acccontent}</div>
        </div>
      </div>
    </>
  );
};

export default AccountPageDetail;
