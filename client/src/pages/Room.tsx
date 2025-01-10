import "../styles/Room.css";
import Game1 from "../assets/images/game1.jpg";
import Game2 from "../assets/images/game2.jpg";
import Game3 from "../assets/images/game3.jpg";
import Game4 from "../assets/images/game4.jpg";
import Game5 from "../assets/images/game5.jpg";
import Game6 from "../assets/images/game6.jpg";
import logoWG from "../assets/images/logo_wildy_gamy.png";
import room from "../assets/images/room-image.jpg";

function RoomDescription() {
  return (
    <div className="room-container">
      <img className="room-image" src={room} alt="room-image" />
      <h1 className="room-title">Wildy Gamy</h1>
      <p>
        Wildy Gamy est un lieu unique en son genre à Toulouse. À l'image de ses
        créateurs, Justine, Charlotte, Abdou et Florentin, ce temple du gaming
        nouvelle génération réinvente l'expérience arcade. Plongez dans un
        univers où le virtuel rencontre le réel : jouez en ligne depuis chez
        vous, gagnez des points et venez les échanger contre des sessions de jeu
        exclusives dans notre salle.
        <br />
        Notre espace arcade combine le meilleur des deux mondes : une collection
        de jeux rétro et dernière génération, des bornes d'arcade classiques, et
        un système de récompenses innovant. Détendez-vous dans notre espace
        lounge avec une sélection de snacks et de boissons rafraîchissantes
        pendant vos sessions de jeu.
        <br />
        Découvrez Wildy Gamy, là où la communauté gaming toulousaine se retrouve
        pour partager des moments inoubliables.
        <br />
        Rejoignez l'aventure en ligne et sur place !
      </p>
      <p>
        Mardi au Dimanche : 10:30 - 1:00
        <br />
        05 55 55 55 55
      </p>
    </div>
  );
}

interface Game {
  id: number;
  image: string;
  name: string;
}

const gamesData: Game[] = [
  { id: 1, image: Game1, name: "Game 1" },
  { id: 2, image: Game2, name: "Game 2" },
  { id: 3, image: Game3, name: "Game 3" },
  { id: 4, image: Game4, name: "Game 4" },
  { id: 5, image: Game5, name: "Game 5" },
  { id: 6, image: Game6, name: "Game 6" },
];

function RoomCarousel() {
  return (
    <div className="room-carousel">
      <h1 className="room-titlecarousel">NEW GAME</h1>
      <div className="room-carouselcontainer">
        {gamesData.map((game) => (
          <article key={game.id} className="room-gamecard">
            <img src={game.image} alt={game.name} className="room-gameimage" />
            <h2 className="room-gametitle">{game.name}</h2>
          </article>
        ))}
      </div>
    </div>
  );
}

function RoomGameOnline() {
  return (
    <div className="room-gameonline">
      <div className="room-emptydiv"> </div>
      <div className="room-gameonlinecontent">
        <h1 className="room-titlegameonline">
          Jeu en
          <br />
          Ligne
        </h1>
        <p className="room-textgameonline">
          Jouez
          <br />
          Gagnez des points
          <br />
          Restez dans le top 10
          <br />
        </p>
      </div>
    </div>
  );
}

function Room() {
  return (
    <div className="room-page">
      <img className="room-logo" src={logoWG} alt="Logo" />
      <div className="room-fullpage">
        <RoomDescription />
        <RoomCarousel />
        <RoomGameOnline />
      </div>
    </div>
  );
}

export default Room;
