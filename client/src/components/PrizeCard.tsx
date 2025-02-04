import { useState } from "react";
import coin from "../assets/images/coin.svg";
import logoWG from "../assets/images/logo_wildy_gamy.png";
import PrizeExchangeModal from "../components/PrizeExchangeModal";
import type { Prize } from "../services/types";

const PrizeCard = ({
  prize,
  onExchange,
}: { prize: Prize; onExchange: () => void }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleExchangeClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsModalOpen(true);
    document.body.classList.add("modal-open");
  };

  const handleConfirm = () => {
    onExchange();
    setIsModalOpen(false);
    document.body.classList.remove("modal-open");
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    document.body.classList.remove("modal-open");
  };
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleExchangeClick(e as unknown as React.MouseEvent);
    }
  };

  return (
    <div
      className="prize-card"
      onKeyDown={handleKeyDown}
      onClick={handleExchangeClick}
    >
      <div className="prize-card__content">
        <div className="prize-card__image-container">
          <img
            src={prize.image ? prize.image : logoWG}
            alt={prize.name}
            className="prize-card__image"
          />
        </div>
        <h3 className="prize-card__title">{prize.name}</h3>

        <div className="prize-card__points">
          <span className="prize-card__points-value">
            {prize.exchange_price}
          </span>
          <img src={coin} className="prize-coin" alt="coin" />
        </div>
      </div>

      <div className="prize-card__description">
        <p>{prize.description}</p>
      </div>

      {isModalOpen && (
        <PrizeExchangeModal
          prizeName={prize.name}
          prizeCost={prize.exchange_price}
          onConfirm={handleConfirm}
          onCancel={handleCancel}
        />
      )}
    </div>
  );
};

export default PrizeCard;
