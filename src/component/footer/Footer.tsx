import { footerContent } from "../../base";
// type FooterType = keyof typeof footerContent;
const Footer = () => {
  return (
    <div className="footer d-flex justify-content-between">
      {Object.keys(footerContent).map((value) => {
        return (
          <div>
            <div className="footer-content-header text-start fw-semibold">
              {value.toUpperCase()}
            </div>
            {value === "socialmedia"
              ? footerContent[value].map((val: string) => (
                  <img className="social-icon " src={val} alt="" />
                ))
              : footerContent[value as keyof typeof footerContent].map(
                  (val: string) => (
                    <ul>
                      <li>
                        <a href="">{val}</a>
                      </li>
                    </ul>
                  )
                )}
          </div>
        );
      })}
      {/* {footerHead.map((el) => (
        <div
          className={`footer-container ${
            el !== "about" && "legal" && "support"
              ? "connect-with-us"
              : undefined
          }d-flex flex-column text-start mx-4  `}
        >
          <span>{el.toUpperCase()}</span>
          <ul className="footer-content text-white-50 my-3">
            {el === "about"
              ? footerContent.aboutContent.map((el) => <li>{el}</li>)
              : el === "support"
              ? footerContent.supportContent.map((el) => (
                  <li>
                    <a>{el}</a>
                  </li>
                ))
              : el === "legal"
              ? footerContent.legalContent.map((el) => (
                  <li>
                    <a>{el}</a>
                  </li>
                ))
              : footerContent.connectWithUs.map((el) => (
                  <div className="connect-with-us">
                    <img className="social-icon" src={el} />
                  </div>
                ))}
          </ul>
        </div>
      ))} */}
    </div>
  );
};

export default Footer;
