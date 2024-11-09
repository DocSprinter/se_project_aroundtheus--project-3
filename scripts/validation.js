function setEventListeners(formEl, options) {
  const inputList = Array.from(formEl.querySelectorAll(options.inputSelector));
  const buttonElement = formEl.querySelector(options.submitButtonSelector);

  // Disable button initially
  toggleButtonState(inputList, buttonElement, options);

  inputList.forEach((inputEl) => {
    inputEl.addEventListener("input", () => {
      checkInputValidity(formEl, inputEl, options);
      toggleButtonState(inputList, buttonElement, options);
    });
  });

  // Add form reset listener
  formEl.addEventListener("reset", () => {
    setTimeout(() => {
      toggleButtonState(inputList, buttonElement, options);
    }, 0);
  });
}

function showInputError(formEl, inputEl, { inputErrorClass, errorClass }) {
  const errorMessageEl = formEl.querySelector(`#${inputEl.id}-error`);

  if (errorMessageEl) {
    // Add red border to input
    inputEl.classList.add(inputErrorClass);

    // Set appropriate error message
    if (inputEl.validity.valueMissing) {
      errorMessageEl.textContent = "Please fill out this field.";
    } else if (inputEl.validity.tooShort) {
      errorMessageEl.textContent = `Input is too short (minimum is ${inputEl.minLength} characters)`;
    } else if (inputEl.validity.typeMismatch && inputEl.type === "url") {
      errorMessageEl.textContent = "Please enter a web address.";
    } else {
      errorMessageEl.textContent = inputEl.validationMessage;
    }

    // Make error visible
    errorMessageEl.classList.add(errorClass);

    // Debug log
    console.log("Error shown:", {
      input: inputEl.id,
      message: errorMessageEl.textContent,
      visible: true,
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
  if (!inputEl.validity.valid) {
    showInputError(formEl, inputEl, options);
  } else {
    hideInputError(formEl, inputEl, options);
  }
}

function hasInvalidInput(inputList) {
  return inputList.some((inputEl) => {
    // Check for empty required fields and other validity issues
    return (
      !inputEl.validity.valid ||
      (inputEl.required && inputEl.value.length === 0)
    );
  });
}

function toggleButtonState(inputList, buttonElement, { inactiveButtonClass }) {
  // Check if any inputs are invalid or empty
  if (hasInvalidInput(inputList)) {
    // Disable button
    buttonElement.classList.add(inactiveButtonClass);
    buttonElement.disabled = true;
    console.log("Button disabled: Invalid or empty inputs"); // Debug
  } else {
    // Enable button
    buttonElement.classList.remove(inactiveButtonClass);
    buttonElement.disabled = false;
    console.log("Button enabled: All inputs valid"); // Debug
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

const validationConfig = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

enableValidation(validationConfig);
