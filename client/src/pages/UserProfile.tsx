import "../styles/UserProfile.css";
import { Coins, Crown, Gift, Medal, Trophy } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import logoWG from "../assets/images/logo_wildy_gamy.png";
import GameCard from "../components/GameCard";
import type { Game, User } from "../services/types";

export default function UserProfile() {
  const { id } = useParams();
  const [userProfile, setUserProfile] = useState(null as null | User);
  const [favorites, setFavorites] = useState<Game[]>([]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/user/${id}`,
        );
        if (!response.ok) throw new Error("Failed to fetch user data");
        const data = await response.json();
        setUserProfile(data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    if (id) fetchUserData();
  }, [id]);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/user/${id}/favorites`,
          {
            credentials: "include",
          },
        );
        if (!response.ok) throw new Error("Failed to fetch favorites");
        const data = await response.json();
        setFavorites(data);
      } catch (error) {
        console.error("Error fetching favorites:", error);
      }
    };

    if (id) fetchFavorites();
  }, [id]);

  return (
    <>
      <div className="user-profile-page-container">
        <img className="play-wg-logo-user-page" src={logoWG} alt="Logo" />
        <h1 className="user-profile-page-title">MON PROFIL</h1>
        <div className="user-profile-info-card">
          <img
            className="user-profile-avatar"
            src={userProfile ? userProfile.profile_pic : ""}
            alt=""
          />
          <h2 className="h2-welcome-message">
            Bonjour {userProfile ? userProfile.username : ""}
          </h2>
          <div className="user-profile-stats-bar">
            <div className="user-profile-stats-total-points">
              <Crown className="user-profile-total-points-icon" />
              <p>{userProfile ? userProfile.total_points : 0}</p>
            </div>
            <div className="user-profile-stats-rank">
              <Trophy className="user-profile-trophy-icon" />
              <p>7</p>
            </div>
            <div className="user-profile-stats-actual-points">
              <Coins className="user-profile-actual-points-icon" />
              <p>{userProfile ? userProfile.current_points : 0}</p>
            </div>
          </div>
          <div className="user-profile-button-container">
            <button type="button" className="user-profile-ranking-button">
              <Medal className="user-profile-medal-icon" />
              <p>Voir le classement</p>
            </button>
            <button type="button" className="user-profile-exchange-button">
              <Gift className="user-profile-gift-icon" />
              <p>Échanger mes points</p>
            </button>
          </div>
        </div>
        <p className="user-profile-page-title">MES FAVORIS</p>
        <div className="user-profile-page-favorites-container">
          {favorites.map((game) => (
            <GameCard
              key={game.id}
              game={{ ...game, price: game.price.toString() }}
            />
          ))}{" "}
        </div>
        <p className="user-profile-page-title">MES RÉCOMPENSES</p>
      </div>
    </>
  );
}
