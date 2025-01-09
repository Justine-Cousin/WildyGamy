import "../styles/Home.css";
import blueArrow from "../assets/images/blue-arrow-icon.svg";
import logo from "../assets/images/logo_wildy_gamy.png";
import pinkArrow from "../assets/images/pink-arrow-icon.svg";
import purpleArrow from "../assets/images/purple-arrow-icon.svg";

export default function Home() {
  return (
    <>
      <div className="home-container">
        <header className="home-header">
          <img src={logo} alt="logo" className="home-logo" />
          <p className="home-welcome-text">
            Votre salle arcade incontournable à Toulouse
            <br />
            Le RDV de tous les passionnés de retro gaming
          </p>
        </header>
        <main className="home-main">
          <div className="wildy-gamy-home-container home_grid-containers">
            WILDY GAMY
            <p className="home-wildy-gamy-text">
              Besoin d'info, des questions?
              <br />
              Venez découvrir qui nous sommes!
            </p>
            <img src={purpleArrow} alt="" className="purple-arrow-icon" />
          </div>

          <div className="home-bottom-container">
            <div className="play-online-home-container home_grid-containers">
              JEU EN LIGNE
              <p className="home-play-online-text">
                Jouez
                <br />
                Gagnez des points
                <br />
                Restez dans le top 10
              </p>
              <img src={pinkArrow} alt="" className="pink-arrow-icon" />
            </div>
            <div className="game-list-home-container home_grid-containers">
              LISTE DES JEUX
              <p className="home-game-list-text">
                Toutes nos bornes
                <br />
                Le top des jeux rétro
              </p>
              <img src={blueArrow} alt="" className="blue-arrow-icon" />
            </div>
            <div className="prizes-home-container home_grid-containers">
              RÉCOMPENSES
              <p className="home-game-list-text">
                Échangez vos points
                <br />
                contre des lots
              </p>
              <img src={pinkArrow} alt="" className="pink-arrow-icon" />
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
