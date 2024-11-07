function setEventListeners(formEl, options) {
  const inputEls = [...formEl.querySelectorAll(options.inputSelector)];
  const submitButton = formEl.querySelector(options.submitButtonSelector);

  // Add input event listeners
  inputEls.forEach((inputEl) => {
    inputEl.addEventListener("input", () => {
      console.log("Input event triggered for:", inputEl.id);
      checkInputValidity(formEl, inputEl, options);
      toggleButtonState(inputEls, submitButton, options);
    });
  });
}

function showInputError(formEl, inputEl, { inputErrorClass, errorClass }) {
  const errorMessageEl = formEl.querySelector(`#${inputEl.id}-error`);
  console.log("Finding error element for:", inputEl.id, errorMessageEl);

  if (errorMessageEl) {
    // Add red border to input
    inputEl.classList.add(inputErrorClass);

    // Set error message
    if (inputEl.validity.valueMissing) {
      errorMessageEl.textContent = "Please fill out this field.";
    } else if (inputEl.validity.typeMismatch && inputEl.type === "url") {
      errorMessageEl.textContent = "Please enter a web address.";
    } else if (inputEl.validity.tooShort) {
      errorMessageEl.textContent = `Input is too short (minimum is ${inputEl.minLength} characters)`;
    } else {
      errorMessageEl.textContent = inputEl.validationMessage;
    }

    // Make error visible
    errorMessageEl.classList.add(errorClass);

    console.log("Error shown:", {
      input: inputEl.id,
      message: errorMessageEl.textContent,
      errorVisible: errorMessageEl.classList.contains(errorClass),
    });
  }
}

function hideInputError(formEl, inputEl, { inputErrorClass, errorClass }) {
  const errorMessageEl = formEl.querySelector(`#${inputEl.id}-error`);
  if (errorMessageEl) {
    inputEl.classList.remove(inputErrorClass);
    errorMessageEl.classList.remove(errorClass);
    errorMessageEl.textContent = "";
  }
}

function checkInputValidity(formEl, inputEl, options) {
  console.log(
    "Checking validity for:",
    inputEl.id,
    "Valid:",
    inputEl.validity.valid
  );
  if (!inputEl.validity.valid) {
    showInputError(formEl, inputEl, options);
  } else {
    hideInputError(formEl, inputEl, options);
  }
}

function hasInvalidInput(inputList) {
  return inputList.some((inputEl) => !inputEl.validity.valid);
}

function toggleButtonState(inputList, buttonElement, { inactiveButtonClass }) {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(inactiveButtonClass);
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.remove(inactiveButtonClass);
    buttonElement.disabled = false;
  }
}

function enableValidation(options) {
  const formList = Array.from(document.querySelectorAll(options.formSelector));
  formList.forEach((formEl) => {
    formEl.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    setEventListeners(formEl, options);
  });
}

const config = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

enableValidation(config);
