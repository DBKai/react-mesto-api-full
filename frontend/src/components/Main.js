import {useContext} from "react";
import Card from "./Card";
import CurrentUserContext from "../contexts/CurrentUserContext";

function Main({onEditAvatar, onEditProfile, onAddPlace, onCardClick, cards, onCardLike, onCardDelete}) {
  const currentUser = useContext(CurrentUserContext);
  const cardsElements = cards.map((card) => {
    return (
      <Card key={card._id}
        card={card}
        onCardClick={onCardClick}
        onCardLike={onCardLike}
        onCardDelete={onCardDelete}/>
    )
  });

  return (
    <main className="content">
      <section className="profile">
        <button className="profile__avatar-edit"
                type="button"
                aria-label="Изменить аватар профиля"
                onClick={onEditAvatar}>
          <img className="profile__avatar" alt="Аватар профиля" src={currentUser.avatar}/>
        </button>
        <div className="profile__info">
          <div className="profile__info-container">
            <h1 className="profile__name">{currentUser.name}</h1>
            <button className="profile__edit"
                    type="button"
                    aria-label="Редактировать профиль"
                    onClick={onEditProfile}></button>
          </div>
          <p className="profile__job">{currentUser.about}</p>
        </div>
        <button className="profile__card-add"
                type="button"
                aria-label="Добавить изображение"
                onClick={onAddPlace}></button>
      </section>
      <section className="cards" aria-label="Блок с изображениями">{cardsElements}</section>
    </main>
  );
}

export default Main;