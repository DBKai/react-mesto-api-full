import PopupWithForm from "./PopupWithForm";
import { useEffect, useContext} from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";
import useFormAndValidation from "../hooks/useFormAndValidation";

function EditProfilePopup({isOpen, onClose, onUpdateUser}) {
  const currentUser = useContext(CurrentUserContext);
  const { values, handleChange, errors, isValid, setValues, resetForm } = useFormAndValidation();
  const nameInputClassName = (`popup__item ${errors?.name && "popup__item-error_active"}`);
  const nameErrorClassName = (`popup__item-error ${errors?.name && "popup__item_type_error"}`);
  const descriptionInputClassName = (`popup__item ${errors?.about && "popup__item-error_active"}`);
  const descriptionErrorClassName = (`popup__item-error ${errors?.about && "popup__item_type_error"}`);

  function handleSubmit(event) {
    event.preventDefault();

    onUpdateUser({
      name: values.name,
      about: values.about
    });
  }

  useEffect(() => {
    if (isOpen) {
      setValues({...values,
        "name": currentUser.name,
        "about": currentUser.about
      });
    }
  }, [isOpen]);

  return (
    <PopupWithForm
      name="profile"
      title="Редактировать профиль"
      submitBtnText="Сохранить"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isValid={isValid}>
      <input
        id="profile-name"
        name="name"
        className={nameInputClassName}
        type="text"
        placeholder="Имя"
        minLength="2"
        maxLength="40"
        value={values?.name || ""}
        onChange={handleChange}
        required/>
      <span id="profile-name-error" className={nameErrorClassName}>{errors?.name || ""}</span>
      <input
        id="profile-about"
        name="about"
        className={descriptionInputClassName}
        type="text"
        placeholder="О себе"
        minLength="2"
        maxLength="200"
        value={values?.about || ""}
        onChange={handleChange}
        required/>
      <span id="profile-about-error" className={descriptionErrorClassName}>{errors?.about || ""}</span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;