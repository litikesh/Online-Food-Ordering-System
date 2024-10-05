import React from "react";
import "./Footer.css";

const footerLinks = [
  {
    id: 1,
    title: "Get to Know Us",
    list: [
      "Who We Are",
      "Blog",
      " Work With Us",
      "Investor Relations",
      "Report Fraud",
    ],
  },
  {
    id: 2,
    title: "ZOMAVERSE",
    list: [
      "Feeding India",
      "Hyperpure",
      "Zomaland",
      "Advertise Your Products",
      "Self-Publish with Us",
      "› See More",
    ],
  },
  {
    id: 3,
    title: " Payment",
    list: [
      "Business Card",
      "Shop with Points",
      "Reload Your Balance",
      "Currency Converter",
    ],
  },
  {
    id: 4,
    title: "LEARN MORE",
    list: ["Privacy", "Security", "Terms", "Sitemap"],
  },
];

function Footer() {
  return (
    <div className="footer">
      <div className="footer__inner">
        <div className="footer__disclaimer">
          <strong>Disclaimer:</strong> This is not the official Food Store. It
          is a redesign, built purely for educational purpose.
        </div>

        <div className="footer__links">
          {footerLinks.map((link) => (
            <div className="footer__row" key={link.id}>
              <h6>{link.title}</h6>
              <ul>
                {link.list.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="footer__bottom">
          <span className="footer__copy">
            &copy; 2022 | Developed by <a href="/">Litikesh Vilvanathan</a>
          </span>
          <span className="footer__dropDownSpan"></span>
        </div>
      </div>
    </div>
  );
}
export default Footer;
