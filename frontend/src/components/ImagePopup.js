function ImagePopup({card, onClose}) {
  function handleClosePopup(event) {
    if (event.target === event.currentTarget) onClose();
  }

  return (
    <div className={`popup popup_type_image-view ${card._id && 'popup_opened'}`}
         onMouseDown={handleClosePopup}>
      <div className="popup__image-container">
        <button className="popup__close"
                type="button"
                aria-label="Закрыть попап"
                onClick={onClose}></button>
        <img className="popup__image" alt={card.name} src={card.link} />
        <p className="popup__caption">{card.name}</p>
      </div>
    </div>
  );
}

export default ImagePopup;