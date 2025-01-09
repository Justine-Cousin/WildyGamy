import "../styles/Room.css";
import room from "../assets/images/room-image.jpg";

function Room() {
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

function RoomGameOnline() {
  return (
    <div className="room-gameonline">
      <h1 className="room-title-gameonline">Jeux en Ligne</h1>
      <p>
        Jouez
        <br />
        Gagnez des points
        <br />
        Restez dans le top 10
        <br />
      </p>
    </div>
  );
}

function RoomFullPage() {
  return (
    <div className="room-fullpage">
      <Room />
      <RoomGameOnline />
    </div>
  );
}

export default RoomFullPage;
