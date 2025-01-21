import coin from "../assets/images/coin.svg";
import logoWG from "../assets/images/logo_wildy_gamy.png";
import type { Prize } from "../services/types";

const PrizeCard = ({ prize }: { prize: Prize }) => {
  return (
    <div className="prize-card">
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
    </div>
  );
};

export default PrizeCard;
