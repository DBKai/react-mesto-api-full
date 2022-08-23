import PopupWithForm from "./PopupWithForm";
import { useEffect } from "react";
import useFormAndValidation from "../hooks/useFormAndValidation";

function EditAvatarPopup({isOpen, onClose, onUpdateAvatar}) {
  const { values, handleChange, errors, isValid, setValues, resetForm } = useFormAndValidation();
  const avatarErrorClassName = (`popup__item-error ${errors?.avatar && "popup__item_type_error"}`);

  function handleSubmit(event) {
    event.preventDefault();

    onUpdateAvatar({
      avatar: values.avatar
    });
  }

  useEffect(() => {
    if (isOpen) {
      resetForm();
    }
  }, [isOpen]);

  return (
    <PopupWithForm
      name="avatar"
      title="Обновить аватар"
      submitBtnText="Сохранить"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isValid={isValid}>
      <input
        id="avatar-link"
        name="avatar"
        className="popup__item"
        type="url"
        placeholder="Ссылка на аватар"
        value={values?.avatar || ""}
        onChange={handleChange}
        required/>
      <span id="avatar-link-error" className={avatarErrorClassName}>{errors?.avatar || ""}</span>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;