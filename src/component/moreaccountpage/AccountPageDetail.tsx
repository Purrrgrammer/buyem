import { useState } from "react";
import { accountpage } from "../../base";
import { Orders, User } from "../../model";

export const AccountPageDetail: React.FC<User> = ({ account }: any) => {
  const [content, setContent] = useState("none");
  const [active, setActive] = useState();
  const handleOnActive = (key: any) => {
    setActive(key);
    console.log(key);
  };
  var acccontent;
  const personalContent = (
    <div className="container1 d-flex flex-column ">
      <div>Personal Name: {account.fullname}</div>
      <div>Email: {account.userEmail}</div>
      <div>Birth Date: {account.birthDate}</div>
      <div>Country: {account.country}</div>
    </div>
  );

  const addressContent = (
    <div className="container1 d-flex flex-column ">
      <div>Shipping/Billing Name: {account.fullname}</div>
      <div>Billing address: {account.address.billingAddress}</div>
      <div>Shipping Address: {account.address.shippingAddress}</div>
    </div>
  );

  const ordersContent = (
    <table className="account-order-content">
      <tr>
        <th>No.</th>
        <th>orderId</th>
        <th>orderDate</th>{" "}
      </tr>
      {account.orders.map((el: Orders, index: number) => (
        <tr key={index}>
          <td>{index + 1}</td>
          <td>{el.orderId}</td>
          <td>{el.orderId}</td>
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
                  console.log(key);
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
