import successIcon from "../images/status_success.svg";
import errorIcon from "../images/status_error.svg";

function InfoTooltip({isOpen, onClose, isSuccess}) {
  const successStatusText = "Вы успешно зарегистрировались!";
  const errorStatusText = "Что-то пошло не так! Попробуйте ещё раз.";

  function handleClosePopup(event) {
    if (event.target === event.currentTarget) {
      onClose();
    }
  }

  return (
    <div className={`popup ${isOpen && 'popup_opened'}`} onMouseDown={handleClosePopup}>
      <div className="popup__container tooltip__container">
        <button className="popup__close"
                type="button"
                aria-label="Закрыть попап"
                onClick={onClose}></button>
        <img className="tooltip__icon" src={isSuccess ? successIcon : errorIcon} alt="Статус"/>
        <h2 className="tooltip__heading">{isSuccess ? successStatusText : errorStatusText}</h2>
      </div>
    </div>
  );
}

export default InfoTooltip;
