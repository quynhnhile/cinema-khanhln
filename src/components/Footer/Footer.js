// import Heading from "../Header/Heading";
// import "./footer.css";
import { Link } from "react-router-dom";
import mySvg from "../../asset/images/hbo-max.svg"
// import "../../css/components/Footer/Footer.css"
import "./Footer.css"


const Footer = () => {
  return (
    <>
      <div className="footer">
        <div className="footer__container__row">
          <div className="col-fot1">
            <Link className="navbar-brand" to="/">
              <div className="MainHeading">
                <img src={mySvg} alt="" className="logo2" />{" "}
              </div>
            </Link>
            <div className="footer__details">
              <p>Cinemy Movies and Tv Series</p>
              <p>Nakuru, Kenya</p>
              <p>
                call Us: <span>(+254) 78728340</span>
              </p>
            </div>
          </div>
          <div className="col-fot2">
            <h4 className="footer-title">Resources</h4>
            <div className="menu-footer">
              <ul className="menu">
                <li className="menu-item ">
                  <Link to="#">About CinemyPlex</Link>
                </li>
                <li id="menu-item-72" className="menu-item">
                  <Link to="#">Contact Us</Link>
                </li>
                <li id="menu-item-73" className="menu-item ">
                  <Link to="#">Forums</Link>
                </li>
                <li id="menu-item-74" className="menu-item">
                  <Link to="#">Blog</Link>
                </li>
                <li id="menu-item-75" className="menu-item ">
                  <Link to="#">Help Center</Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="col-fot4">
            <h4 className="footer-title">Legal</h4>
            <div className="menu-footer">
              <ul className="menu">
                <li id="menu-item-76" className="menu-item-76">
                  <Link to="#">Terms of Use</Link>
                </li>
                <li id="menu-item-77" className="menu-item-77">
                  <Link to="#">Privacy Policy</Link>
                </li>
                <li id="menu-item-78" className="menu-item-78">
                  <Link to="#">Security</Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-fot5">
            <h4 className="footer-title">Newsletter</h4>
            <div className="footer-email">
              <p>
                Subscribe to our newsletter system now to get latest news from
                us
              </p>
              <form className="footer-email-form ">
                <input type="email" placeholder="Enter your email" />
                <div>
                  <button onClick={(e) => e.preventDefault()} className="footer-email-submit">Subscribe now</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
