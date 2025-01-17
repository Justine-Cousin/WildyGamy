import "../styles/RankingPage.css";
import { useEffect, useState } from "react";
import logoWG from "../assets/images/logo_wildy_gamy.png";
import Ranking from "../components/Ranking";
import type { User } from "../services/types";

const RankingPage = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/users`,
          {
            method: "GET",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            credentials: "include",
          },
        );

        if (!response.ok) {
          throw new Error(`Erreur HTTP: ${response.status}`);
        }

        const data = await response.json();
        console.error(data);

        setUsers(data);
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des utilisateurs:",
          error,
        );
        setError(
          error instanceof Error ? error.message : "Une erreur est survenue",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) {
    return (
      <div className="ranking-page">
        <div className="ranking-page__loading">Chargement...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="ranking-page">
        <div className="ranking-page__error">{error}</div>
      </div>
    );
  }

  return (
    <div className="ranking-page">
      <img className="ranking-logo" src={logoWG} alt="Logo" />
      <div className="ranking-container">
        <h3 className="ranking-title">Mon Classement</h3>
        {users.map((user, index) => (
          <Ranking key={user.id} user={user} position={index + 1} />
        ))}
      </div>
    </div>
  );
};

export default RankingPage;
