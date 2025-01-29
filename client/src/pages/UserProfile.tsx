import "../styles/UserProfile.css";
import { Crown, Gift, Medal, Tickets, Trophy } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import logoWG from "../assets/images/logo_wildy_gamy.png";
import GameCard from "../components/GameCard";
import PrizeCard from "../components/PrizeCard";
import type { Game, Prize, User } from "../services/types";

export default function UserProfile() {
  const { id } = useParams();
  const [userProfile, setUserProfile] = useState<User | null>(null);
  const [favorites, setFavorites] = useState<Game[]>([]);
  const [prizeAcquired, setPrizeAcquired] = useState<Prize[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        // Fetch user data
        const userResponse = await fetch(
          `${import.meta.env.VITE_API_URL}/api/user/${id}`,
          { credentials: "include" },
        );
        if (!userResponse.ok) throw new Error("Failed to fetch user data");
        const userData = await userResponse.json();
        setUserProfile(userData);

        // Fetch favorites
        const favoritesResponse = await fetch(
          `${import.meta.env.VITE_API_URL}/api/user/${id}/favorites`,
          { credentials: "include" },
        );
        if (!favoritesResponse.ok) throw new Error("Failed to fetch favorites");
        const favoritesData = await favoritesResponse.json();
        setFavorites(favoritesData);

        // Fetch acquired prizes
        const prizesResponse = await fetch(
          `${import.meta.env.VITE_API_URL}/api/user/${id}/acquired`,
          { credentials: "include" },
        );
        if (!prizesResponse.ok) throw new Error("Failed to fetch prizes");
        const prizesData = await prizesResponse.json();
        setPrizeAcquired(prizesData);
      } catch (error) {
        console.error("Error:", error);
        setError(error instanceof Error ? error.message : "An error occurred");
      } finally {
        setIsLoading(false);
      }
    };

    if (id) fetchData();
  }, [id]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!userProfile) return <div>User not found</div>;

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
              <Tickets className="user-profile-actual-points-icon" />
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
              game={{
                id: game.id,
                price: game.price.toString(),
                image: game.image || "",
                description: game.description || "",
                name: game.name,
              }}
              userId={userProfile?.id}
            />
          ))}{" "}
        </div>
        <p className="user-profile-page-title">MES RÉCOMPENSES</p>
        {prizeAcquired.length > 0 ? (
          <div className="user-profile-page-prizes-container">
            {prizeAcquired.map((prize) => (
              <PrizeCard key={prize.id} prize={prize} />
            ))}
          </div>
        ) : (
          <p className="user-profile-page-no-prizes-message">
            Aucune récompense acquise
          </p>
        )}
      </div>
    </>
  );
}
