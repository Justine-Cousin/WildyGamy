import { useEffect, useState } from "react";
import PrizeCard from "../components/PrizeCard";
import type { Prize } from "../services/types";
import "../styles/prizePage.css";
import logoWG from "../assets/images/logo_wildy_gamy.png";

const PrizePage = () => {
  const [prizes, setPrizes] = useState<Prize[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPrizes = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/prizes`,
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

        setPrizes(data);
      } catch (error) {
        console.error("Erreur lors de la récupération des prix:", error);
        setError(
          error instanceof Error ? error.message : "Une erreur est survenue",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchPrizes();
  }, []);

  if (loading) {
    return (
      <div className="prizes-page">
        <div className="prizes-page__loading">Chargement...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="prizes-page">
        <div className="prizes-page__error">{error}</div>
      </div>
    );
  }

  return (
    <div className="prizes-page">
      <img className="prize-logo" src={logoWG} alt="Logo" />
      <div className="prizes-page__container">
        <h1 className="prizes-page__title">RÉCOMPENSES</h1>
        <div className="prizes-page__grid">
          {prizes.map((prize) => (
            <PrizeCard key={prize.id} prize={prize} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PrizePage;
