import "./Profile.scss";
import profile_src from "../../assets/others/profile.jpg";
import { FiEdit3 } from "react-icons/fi";
import { RiUser3Line } from "react-icons/ri";
import { MdOutlineColorLens } from "react-icons/md";
import { VscSettings } from "react-icons/vsc";
import { IoMdHelpCircleOutline } from "react-icons/io";
import { IoLogOutOutline } from "react-icons/io5";

import { useContext } from "react";
import { SharedContext } from "../../SharedContext";

const Profile = () => {
  const { ShowProfile, mobileView } = useContext(SharedContext);

  if (!mobileView) {
    return (
      <div className={`profile_info ${ShowProfile && "show"}`}>
        <header>
          <img src={profile_src} alt="" />

          <div className="username">
            <span>creativeambition</span>
            <span className="email">ca@io.dev</span>
          </div>

          <FiEdit3 className="action_icon" />
        </header>

        <ul>
          <li>
            <RiUser3Line className="icon" /> Account
          </li>
          <li>
            <VscSettings className="icon" />
            Preferences
          </li>
          <li>
            <MdOutlineColorLens className="icon" />
            Theme Settings
          </li>
          <li>
            <IoMdHelpCircleOutline className="icon" />
            Help
          </li>
          <li className="logout">
            <IoLogOutOutline className="icon" />
            Logout
          </li>
        </ul>
      </div>
    );
  }
};

export default Profile;
