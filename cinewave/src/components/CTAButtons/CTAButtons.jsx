import "./CTAButtons.scss";
import { HiMiniPlay } from "react-icons/hi2";
import { TbStar } from "react-icons/tb";
import { MdArrowOutward } from "react-icons/md";
import { Link } from "react-router-dom";
import { AddToFavorites } from "../../Data/Data";
import { useContext } from "react";
import { SharedContext } from "../../SharedContext";

const CTAButtons = ({ mediaType, movie, featured }) => {
  const { setProcessing } = useContext(SharedContext);

  const title =
    movie?.title ||
    movie?.original_title ||
    movie?.name ||
    movie?.original_name;

  function handleClick() {
    setProcessing({
      started: true,
      success: null,
    });

    AddToFavorites(movie, mediaType)
      .then(() => {
        setProcessing({
          started: true,
          success: true,
        });
      })
      .catch((err) => {
        setProcessing({
          started: true,
          success: false,
        });
        console.log("An error occurred", err);
      });
  }

  return (
    <div className="cta_buttons">
      {featured ? (
        <Link to={`/${mediaType}/${movie?.id}`}>
          <button>
            <MdArrowOutward className="icon play" />
            <span>More info</span>
          </button>
        </Link>
      ) : (
        <Link to={`/watch/${mediaType}/${title}/${movie?.id}`}>
          <button>
            <HiMiniPlay className="icon play" />
            <span>Watch Trailer</span>
          </button>
        </Link>
      )}

      <button onClick={handleClick}>
        <TbStar className="icon" />
        <span>Add to Favorites</span>
      </button>
    </div>
  );
};

export default CTAButtons;
