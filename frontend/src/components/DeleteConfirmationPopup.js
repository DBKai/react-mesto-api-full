import PopupWithForm from "./PopupWithForm";

function DeleteConfirmationPopup({isOpen, onClose, handleCardDelete, willBeDeletedCard}) {
  function handleSubmit(event) {
    event.preventDefault();

    handleCardDelete(willBeDeletedCard);
  }

  return(
      <PopupWithForm
        name="confirm"
        title="Вы уверены?"
        submitBtnText="Да"
        isOpen={isOpen}
        onClose={onClose}
        onSubmit={handleSubmit}
        isValid={true}/>
    );
}

export default DeleteConfirmationPopup;