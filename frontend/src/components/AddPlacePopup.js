import PopupWithForm from "./PopupWithForm";
import { useEffect } from "react";
import useFormAndValidation from "../hooks/useFormAndValidation";

function AddPlacePopup({isOpen, onClose, onAddPlace}) {
  const { values, handleChange, errors, isValid, setValues, resetForm } = useFormAndValidation();
  const nameInputClassName = (`popup__item ${errors?.name && "popup__item-error_active"}`);
  const nameErrorClassName = (`popup__item-error ${errors?.name && "popup__item_type_error"}`);
  const linkInputClassName = (`popup__item ${errors?.link && "popup__item-error_active"}`);
  const linkErrorClassName = (`popup__item-error ${errors?.link && "popup__item_type_error"}`);

  function handleSubmit(event) {
    event.preventDefault();

    onAddPlace({
      name: values.name,
      link: values.link
    });
  }

  useEffect(() => {
    if (isOpen) {
      resetForm();
    }
  }, [isOpen])

  return (
    <PopupWithForm
      name="card"
      title="Новое место"
      submitBtnText="Создать"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isValid={isValid}>
      <input
        id="card-name"
        name="name"
        className={nameInputClassName}
        type="text"
        placeholder="Название"
        minLength="2"
        maxLength="30"
        value={values?.name || ""}
        onChange={handleChange}
        required/>
      <span id="card-name-error" className={nameErrorClassName}>{errors?.name || ""}</span>
      <input
        id="card-link"
        name="link"
        className={linkInputClassName}
        type="url"
        placeholder="Ссылка на картинку"
        value={values?.link || ""}
        onChange={handleChange}
        required/>
      <span id="card-link-error" className={linkErrorClassName}>{errors?.link || ""}</span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;