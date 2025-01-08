import "../styles/Home.css";
import logo from "../assets/images/logo_wildy_gamy.png";

export default function Home() {
  return (
    <>
      <header className="home-header">
        <img src={logo} alt="logo" className="home-logo" />
        <p className="home-welcome-text">
          Votre salle arcade incontournable à Toulouse
          <br />
          Le RDV de tous les passionnés de retro gaming
        </p>
      </header>
      <main className="home-main">
        <div className="wildy-gamy-home-container">Wildy Gamy</div>
        <div className="home-bottom-container">
          <div className="play-online-home-container">Jeux en ligne</div>
          <div className="game-list-home-container">Liste de jeux</div>
          <div className="prizes-home-container">Récompences</div>
        </div>
      </main>
    </>
  );
}
