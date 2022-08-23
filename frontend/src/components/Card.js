import CurrentUserContext from "../contexts/CurrentUserContext";
import {useContext}  from "react";

function Card({card, onCardClick, onCardLike, onCardDelete}) {
  const currentUser = useContext(CurrentUserContext);
  const isOwn = card.owner._id === currentUser._id;
  const cardDeleteButtonClassName = (`card__remove-button ${
    isOwn ? 'card__remove-button_visible' : 'card__remove-button_hidden'
  }`);
  const isLiked = card.likes.some(i => i._id === currentUser._id);
  const cardLikeButtonClassName = (`card__like-button ${isLiked && "card__like-button_active" }`);

  function handleClick() {
    onCardClick(card);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleDeleteClick() {
    onCardDelete(card);
  }

  return(
    <article className="card">
      <button className={cardDeleteButtonClassName}
              type="button"
              aria-label="Удалить изображение"
              onClick={handleDeleteClick}></button>
      <img className="card__image"
           src={card.link}
           alt={card.name}
           onClick={handleClick}/>
      <div className="card__caption">
        <h2 className="card__title">{card.name}</h2>
        <div className="card__like-container">
          <button
            className={cardLikeButtonClassName}
            type="button"
            aria-label="Отметить изображение как понравившееся"
            onClick={handleLikeClick}></button>
          <p className="card__like-count">{card.likes.length}</p>
        </div>
      </div>
    </article>
  );
}

export default Card;