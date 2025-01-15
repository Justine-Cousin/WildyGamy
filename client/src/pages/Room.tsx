import "../styles/Room.css";
import { useState } from "react";
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
        Né de l'imagination de quatre passionnés Justine, Charlotte, Abdou et
        Florentin, Wildy Gamy redéfinit l'expérience arcade à Toulouse. Ce lieu
        unique mêle jeu en ligne et physique : gagnez des points depuis chez
        vous et échangez-les contre des sessions sur place. Entre jeux rétro,
        dernières nouveautés et espace lounge équipé, cet établissement est
        devenu le repaire incontournable des gamers toulousains.
      </p>
      <p>
        8 Rue de Valenciennes
        <br />
        31000 Toulouse
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

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

function RoomForm() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newErrors: FormErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = "Le Nom est requis";
    }

    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!formData.email.trim() || !emailPattern.test(formData.email)) {
      newErrors.email = "L'email est requis et doit être valide";
    }

    if (!formData.subject.trim()) {
      newErrors.subject = "Le sujet est requis";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Le message est requis";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      setErrors({});
      alert("Formulaire envoyé avec succès !");
      setFormData({ name: "", email: "", subject: "", message: "" });
    }
  };

  return (
    <div className="form-container">
      <h2 className="form-title">Contactez-nous</h2>
      <form id="myForm" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Votre Nom</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="ex : DUPONT"
          />
          {errors.name && <span className="error">{errors.name}</span>}
        </div>
        <div className="form-group">
          <label htmlFor="email">Adresse email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="ex : lorem.ipsum@gmail.com"
          />
          {errors.email && <span className="error">{errors.email}</span>}
        </div>
        <div className="form-group">
          <label htmlFor="subject">Sujet</label>
          <input
            type="text"
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            placeholder="ex : réservation"
          />
          {errors.subject && <span className="error">{errors.subject}</span>}
        </div>
        <div className="form-group">
          <label htmlFor="message">Votre message</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="ex : Bonjour"
          />
          {errors.message && <span className="error">{errors.message}</span>}
        </div>
        <button className="form-button" type="submit">
          Envoyer
        </button>
      </form>
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
        <RoomForm />
      </div>
    </div>
  );
}

export default Room;
