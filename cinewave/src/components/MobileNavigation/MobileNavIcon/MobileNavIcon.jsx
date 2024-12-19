import "./MobileNavIcon.scss";
import { Link } from "react-router-dom";
import { useContext, useEffect } from "react";
import { SharedContext } from "../../../SharedContext";

const MobileNavIcon = ({ Icon, title, link, index }) => {
  const { setNavActive } = useContext(SharedContext);

  useEffect(() => {
    const navIcons = document.querySelectorAll(".mobile_nav_icon");

    const currentNavIndex =
      Number(sessionStorage.getItem("mobileNavIndex")) || 0;

    const indicator = document.querySelector(".mobile_nav_icons .indicator");

    navIcons[currentNavIndex].classList.add("active");

    indicator.style.left =
      navIcons[currentNavIndex].getBoundingClientRect().left +
      navIcons[currentNavIndex].offsetWidth / 2 -
      10 +
      "px";

    navIcons.forEach((it) => {
      it.addEventListener("click", () => {
        setTimeout(() => {
          setNavActive(false);
        }, 600);

        navIcons.forEach((it) => {
          it.classList.remove("active");
        });

        it.classList.add("active");
      });
    });
  }, []);

  function handleIndicator(e) {
    e.preventDefault();

    sessionStorage.setItem("mobileNavIndex", index);

    const indicator = document.querySelector(".mobile_nav_icons .indicator");

    const targetX = e.target.getBoundingClientRect().left;

    const targetWidth = e.target.offsetWidth;

    indicator.style.left = targetX + targetWidth / 2 - 10 + "px";

    setTimeout(() => {
      window.location.href = e.target.href;
    }, 600);
  }

  return (
    <Link to={link} className="mobile_nav_icon" onClick={handleIndicator}>
      <Icon className="icon" />
      <span>{title}</span>
    </Link>
  );
};

export default MobileNavIcon;
