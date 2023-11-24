import { footerContent } from "../../base";
// type FooterType = keyof typeof footerContent;
const Footer = () => {
  return (
    <div className="footer d-flex justify-content-between">
      {Object.keys(footerContent).map((value, index) => {
        return (
          <div>
            <div
              className="footer-content-header text-start fw-semibold"
              key={index}
            >
              {value.toUpperCase()}
            </div>
            {value === "socialmedia"
              ? footerContent[value].map((val, index) => (
                  <a href={val.link} key={index}>
                    <img className="social-icon" src={val.url} alt="" />
                  </a>
                ))
              : footerContent[value as keyof typeof footerContent].map(
                  (val: any, index) => (
                    <ul>
                      <li key={index}>
                        <a href="">{val}</a>
                      </li>
                    </ul>
                  )
                )}
          </div>
        );
      })}
    </div>
  );
};

export default Footer;
