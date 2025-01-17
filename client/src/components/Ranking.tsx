import defaultProfilePic from "../assets/images/logo_wildy_gamy.png";
import scoreIcon from "../assets/images/score.png";
import type { User } from "../services/types";

interface RankingProps {
  user: User;
  position: number;
}

const Ranking = ({ user, position }: RankingProps) => {
  if (!user) {
    return null;
  }

  return (
    <div className="ranking-list">
      <div className="ranking-item-container">
        <div className="ranking-number">{position}</div>
        <div className="ranking-item">
          <img
            src={user.profile_pic || defaultProfilePic}
            alt={user.username || "Utilisateur"}
            className="ranking-profilepic"
            onError={(e) => {
              (e.target as HTMLImageElement).src = defaultProfilePic;
            }}
          />
          <div className="ranking-users">
            <p className="ranking-username">{user.username || "Anonyme"}</p>
            <p className="ranking-totalpoints">
              <img className="image-rankingscore" src={scoreIcon} alt="score" />
              {user.total_points || 0}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Ranking;
