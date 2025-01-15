import { useEffect, useState } from "react";
import logoWG from "../../assets/images/logo_wildy_gamy.png";
import AdminGrid from "../../components/AdminGrid";
import SliderBarAdmin from "../../components/SliderBarAdmin";
import type { Prize } from "../../services/types";

const AdminPrizes = () => {
  const [prices, setPrices] = useState<Prize[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const handleSidebarToggle = (open: boolean) => {
    setIsOpen(open);
  };

  useEffect(() => {
    const fetchPrices = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/prices`,
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
        setPrices(data);
      } catch (error) {
        console.error("Erreur lors de la récupération des prix:", error);
        setError(
          error instanceof Error ? error.message : "Une erreur est survenue",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchPrices();
  }, []);

  if (loading) {
    return (
      <div className="prices-page">
        <div className="prices-page__loading">
          Ouverture du coffre au trésor... 🎁
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="prices-page">
        <div className="prices-page__error">
          <p>Erreur lors de la récupération des prix:</p>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="adminprices-container">
      <img src={logoWG} alt="logo" className="adminprices-logo" />
      <SliderBarAdmin isOpen={isOpen} onToggle={handleSidebarToggle} />
      <div className="adminprices-content">
        <div className="admingrid-card">
          {prices.map((price) =>
            price.image && price.name ? (
              <AdminGrid
                key={price.id}
                type="price"
                price={{ image: price.image, name: price.name }}
              />
            ) : null,
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPrizes;
