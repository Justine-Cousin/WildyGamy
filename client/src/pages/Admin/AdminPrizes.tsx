import { useEffect, useState } from "react";
import logoWG from "../../assets/images/logo_wildy_gamy.png";
import AdminGrid from "../../components/AdminGrid";
import SliderBarAdmin from "../../components/SliderBarAdmin";
import type { Prize } from "../../services/types";
import "../../styles/AdminPrizes.css";

const AdminPrizes = () => {
  const [prizes, setPrizes] = useState<Prize[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const handleSidebarToggle = (open: boolean) => {
    setIsOpen(open);
  };

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
        <div className="prizes-page__loading">
          Ouverture du coffre au trésor... 🎁
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="prizes-page">
        <div className="prizes-page__error">
          <p>Erreur lors de la récupération des prix:</p>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="adminprizes-container">
      <img src={logoWG} alt="logo" className="adminprizes-logo" />
      <SliderBarAdmin isOpen={isOpen} onToggle={handleSidebarToggle} />
      <div className={`main-content ${isOpen ? "main-content-shifted" : ""}`}>
        <div className="adminprizes-content ">
          <div className="admingrid-card">
            {prizes.map((prize) =>
              prize.image && prize.name ? (
                <AdminGrid
                  key={prize.id}
                  id={prize.id}
                  type="price"
                  price={{ image: prize.image, name: prize.name }}
                  onAvailabilityChange={() => {}}
                />
              ) : null,
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPrizes;
