import "./MobileProfile.scss";
import { useContext } from "react";
import { SharedContext } from "../../SharedContext";
import { FiEdit3 } from "react-icons/fi";
import profile_src from "../../assets/others/profile.jpg";
import { RiUser3Line } from "react-icons/ri";
import { VscSettings } from "react-icons/vsc";
import { IoMdHelpCircleOutline } from "react-icons/io";
import { IoLogOutOutline } from "react-icons/io5";
import MobileNavIcon from "../MobileNavigation/MobileNavIcon/MobileNavIcon";

const MobileProfile = () => {
  const { ShowProfile } = useContext(SharedContext);

  return (
    <div className={`mobile_profile ${ShowProfile && "show"}`}>
      <header>
        <img src={profile_src} alt="" />

        <div className="username">
          <span>creativeambition</span>
          <span className="email">ca@io.dev</span>
        </div>

        <FiEdit3 className="action_icon" />
      </header>

      <ul>
        <MobileNavIcon title="Account" Icon={RiUser3Line} />
        <MobileNavIcon title="Settings" Icon={VscSettings} />
        <MobileNavIcon title="Help" Icon={IoMdHelpCircleOutline} />
        <MobileNavIcon title="Logout" Icon={IoLogOutOutline} />
      </ul>
    </div>
  );
};

export default MobileProfile;
