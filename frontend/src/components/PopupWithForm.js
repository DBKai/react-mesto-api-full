function PopupWithForm({name, title, isOpen, onClose, submitBtnText, children, onSubmit, isValid}) {
  const submitButtonClassName = (`popup__button ${!isValid && "popup__button_inactive"}`);

  function handleClosePopup(event) {
    if (event.target === event.currentTarget) onClose();
  }

  return (
    <div className={`popup popup_type_${name} ${isOpen && 'popup_opened'}`}
         onMouseDown={handleClosePopup}>
      <div className="popup__container">
        <button className="popup__close"
                type="button"
                aria-label="Закрыть попап"
                onClick={onClose}></button>
        <h2 className="popup__heading">{title}</h2>
        <form name={name} className="popup__form" onSubmit={onSubmit} noValidate>
          <fieldset className="popup__item-container">
            {children}
          </fieldset>
          <button className={submitButtonClassName} disabled={!isValid}>{submitBtnText}</button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;