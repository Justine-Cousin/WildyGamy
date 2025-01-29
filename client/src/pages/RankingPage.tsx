import "../styles/RankingPage.css";
import { useEffect, useState } from "react";
import logoWG from "../assets/images/logo_wildy_gamy.png";
import Ranking from "../components/Ranking";
import UserStatHeader from "../components/UserStatHeader";
import type { User } from "../services/types";

const RankingPage = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/auth/status`,
          {
            credentials: "include",
          },
        );

        if (response.ok) {
          const data = await response.json();
          setIsAuthenticated(true);
          setCurrentUser(data.user);
        } else {
          setIsAuthenticated(false);
          setCurrentUser(null);
        }
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des utilisateurs:",
          error,
        );
        setIsAuthenticated(false);
      }
    };

    checkAuthStatus();
  }, []);

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

  /*setError(
        error instanceof Error ? error.message : "Une erreur est survenue",
      );
    } finally {
      setLoading(false);
    }
  };
  
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
  }*/

  return (
    <div className="ranking-page">
      <img className="ranking-logo" src={logoWG} alt="Logo" />
      <h3 className="ranking-title">Mon Classement</h3>
      <div className="ranking-bigcontainer">
        {isAuthenticated && currentUser && (
          <div className="ranking-header">
            <UserStatHeader ranking={users} user={currentUser} />
          </div>
        )}
        <div className="ranking-container">
          <div className="ranking-content">
            {users.map((user, index) => (
              <Ranking
                key={user.id}
                user={user}
                position={index + 1}
                isCurrentUser={currentUser ? user.id === currentUser.id : false}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RankingPage;
