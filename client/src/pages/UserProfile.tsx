import "../styles/UserProfile.css";
import {
  Crown,
  Gift,
  Medal,
  Tickets,
  Trophy,
  Upload,
  UserRoundCog,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import logoWG from "../assets/images/logo_wildy_gamy.png";
import GameCard from "../components/GameCard";
import PrizeCard from "../components/PrizeCard";
import UserSettingsModal from "../components/UserSettingsModal";
import type { Game, Prize, User } from "../services/types";

export default function UserProfile() {
  const { id } = useParams();
  const [userProfile, setUserProfile] = useState<User | null>(null);
  const [favorites, setFavorites] = useState<Game[]>([]);
  const [prizeAcquired, setPrizeAcquired] = useState<Prize[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const handleProfilePicChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    if (!e.target.files || !e.target.files[0]) return;

    const file = e.target.files[0];

    if (file.size > 5 * 1024 * 1024) {
      setUploadError("L'image ne doit pas dépasser 5MB");
      return;
    }

    try {
      setIsUploading(true);
      const formData = new FormData();
      formData.append("profile_pic", file);

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/user/${id}`,
        {
          method: "PUT",
          credentials: "include",
          body: formData,
        },
      );
      if (!response.ok) throw new Error("Échec de la mise à jour");

      const data = await response.json();
      setUserProfile(data);
    } catch (error) {
      console.error("Error:", error);
      setUploadError("Erreur lors de la mise à jour de l'image");
    } finally {
      setIsUploading(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        // Fetch user data
        const userResponse = await fetch(
          `${import.meta.env.VITE_API_URL}/api/user/${id}`,
          { credentials: "include" },
        );

        if (!userResponse.ok) {
          throw new Error(`HTTP error! status: ${userResponse.status}`);
        }

        const userData = await userResponse.json();
        setUserProfile({
          ...userData,
          phone_number: userData.phone_number ?? "",
        });

        // Fetch favorites
        const favoritesResponse = await fetch(
          `${import.meta.env.VITE_API_URL}/api/user/${id}/favorites`,
          { credentials: "include" },
        );
        const favoritesData = await favoritesResponse.json();
        setFavorites(favoritesData);

        // Fetch prizes
        const prizesResponse = await fetch(
          `${import.meta.env.VITE_API_URL}/api/user/${id}/acquired`,
          { credentials: "include" },
        );
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
          <UserRoundCog
            className="user-profile-page-settings-icon"
            onClick={toggleModal}
          />
          <div className="user-profile-avatar-wrapper">
            <img
              className="user-profile-avatar"
              src={userProfile?.profile_pic}
              alt="Avatar"
            />
            <label className="upload-icon" htmlFor="profile-pic-upload">
              <Upload size={16} />
              <input
                id="profile-pic-upload"
                type="file"
                accept="image/jpeg,image/png,image/jpg"
                onChange={handleProfilePicChange}
                style={{ display: "none" }}
              />
            </label>
            {isUploading && (
              <span className="upload-status">Chargement...</span>
            )}
            {uploadError && <span className="upload-error">{uploadError}</span>}
          </div>
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
                ...game,
                price: game.price.toString(),
                image: game.image || "",
                description: game.description || "",
              }}
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
        {isModalOpen && (
          <UserSettingsModal
            isOpen={isModalOpen}
            onClose={toggleModal}
            user={userProfile}
            onUserUpdate={(updatedUser) => setUserProfile(updatedUser)}
          />
        )}
      </div>
    </>
  );
}
