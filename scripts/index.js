console.log("JavaScript file loaded");
/*                            DOM Elements                           */
const cardListEl = document.querySelector(".cards__list");
const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;

const profileEditButton = document.querySelector("#profile-edit-button");
const profileEditModal = document.querySelector("#profile-edit-modal");
const profileEditCloseButton = document.querySelector(
  "#profile-edit-close-button"
);
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

const addCardButton = document.querySelector(".profile__add-button");
const addCardModal = document.querySelector("#add-card-modal");
const addCardCloseButton = addCardModal.querySelector(".modal__close");

/*                            Form Elements                           */
const profileEditForm = profileEditModal.querySelector(".modal__form");
const nameInput = document.querySelector("[name='title']");
const descriptionInput = document.querySelector("[name='description']");

const addCardForm = addCardModal.querySelector(".modal__form");
const placeNameInput = addCardModal.querySelector("[name='place-name']");
const placeUrlInput = addCardModal.querySelector("[name='place-url']");

// Add validation settings
nameInput.minLength = 2;
nameInput.maxLength = 40;
descriptionInput.minLength = 2;
descriptionInput.maxLength = 200;

/*                            Functions                           */
function closePopup(modal) {
  modal.classList.remove("modal_opened");
  document.removeEventListener("keydown", handleEscClose);
}

function openPopup(modal) {
  modal.classList.add("modal_opened");
  document.addEventListener("keydown", handleEscClose);
}

function getCardElement(cardData) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImageEl = cardElement.querySelector(".card__image");
  const cardTitleEl = cardElement.querySelector(".card__title");
  const likeButton = cardElement.querySelector(".card__like-button");
  const deleteButton = cardElement.querySelector(".card__delete-button");

  cardImageEl.src = cardData.link;
  cardImageEl.alt = cardData.name;
  cardTitleEl.textContent = cardData.name;

  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle("card__like-button_active");
  });

  deleteButton.addEventListener("click", () => {
    cardElement.remove();
  });

  cardImageEl.addEventListener("click", () => {
    openImagePopup(cardData);
  });

  return cardElement;
}

function handleProfileEditSubmit(e) {
  e.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = descriptionInput.value;
  closePopup(profileEditModal);
}

function handleAddCardSubmit(e) {
  e.preventDefault();
  const cardTitleInput = addCardForm.querySelector('[name="place-name"]');
  const cardUrlInput = addCardForm.querySelector('[name="place-url"]');

  const newCard = {
    name: cardTitleInput.value,
    link: cardUrlInput.value,
  };

  cardListEl.prepend(getCardElement(newCard));
  closePopup(addCardModal);
  addCardForm.reset();
}

/*                            Event Handlers                           */
profileEditButton.addEventListener("click", () => {
  nameInput.value = profileTitle.textContent;
  descriptionInput.value = profileDescription.textContent;
  openPopup(profileEditModal);
});

profileEditCloseButton.addEventListener("click", () => {
  closePopup(profileEditModal);
});

profileEditForm.addEventListener("submit", handleProfileEditSubmit);

addCardButton.addEventListener("click", () => {
  addCardForm.reset();
  openPopup(addCardModal);
});
addCardCloseButton.addEventListener("click", () => {
  closePopup(addCardModal);
});
addCardForm.addEventListener("submit", handleAddCardSubmit);

/*                            Form Data                           */
const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
  },
];

/*                            Initialization                           */
initialCards.forEach((cardData) => {
  cardListEl.append(getCardElement(cardData));
});

const previewImageModal = document.querySelector("#preview-image-modal");
const previewImage = previewImageModal.querySelector(".modal__image");
const previewCaption = previewImageModal.querySelector(".modal__caption");
const previewCloseButton = previewImageModal.querySelector(".modal__close");

function openImagePopup(cardData) {
  previewImage.src = cardData.link;
  previewImage.alt = cardData.name;
  previewCaption.textContent = cardData.name;
  openPopup(previewImageModal);
}

previewCloseButton.addEventListener("click", () =>
  closePopup(previewImageModal)
);

// Function to disable button
function disableButton(button) {
  button.classList.add("modal__button_disabled");
  button.disabled = true;
}

// Function to enable button
function enableButton(button) {
  button.classList.remove("modal__button_disabled");
  button.disabled = false;
}

// Function to validate form
function validateForm(form) {
  const submitButton = form.querySelector(".modal__button");
  const isValid = form.checkValidity();

  if (isValid) {
    enableButton(submitButton);
  } else {
    disableButton(submitButton);
  }
}

// Show input error

function showInputError(formElement, inputElement, errorMessage) {
  console.log("Showing error for:", inputElement.id);
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  if (errorElement) {
    inputElement.classList.add("modal__input_type_error");
    errorElement.textContent = errorMessage;
    errorElement.classList.add("modal__error_visible");
    console.log("Error message:", errorMessage);
  } else {
    console.log("Error element not found for:", inputElement.id);
  }
}

function hideInputError(formElement, inputElement) {
  console.log("Hiding error for:", inputElement.id);
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  if (errorElement) {
    inputElement.classList.remove("modal__input_type_error");
    errorElement.classList.remove("modal__error_visible");
    errorElement.textContent = "";
  }
}

function checkInputValidity(formElement, inputElement) {
  console.log("Checking validity for:", inputElement.id);
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
}

// Function to check if any inputs are invalid
function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => !inputElement.validity.valid);
}

// Function to toggle button state
function toggleButtonState(inputList, buttonElement) {
  if (hasInvalidInput(inputList)) {
    disableButton(buttonElement);
  } else {
    enableButton(buttonElement);
  }
}

// Update setEventListeners function to include button state
function setEventListeners(formElement) {
  console.log("Setting up listeners for form:", formElement.name);
  const inputList = Array.from(formElement.querySelectorAll(".modal__input"));
  const buttonElement = formElement.querySelector(".modal__button");

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      console.log("Input event fired for:", inputElement.id);
      checkInputValidity(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
}

// Initialize validation
document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM loaded, initializing validation");
  setEventListeners(profileEditForm);
  setEventListeners(addCardForm);
});

// handle clicks outside modol
function handleModalClick(evt) {
  if (evt.target.classList.contains("modal")) {
    closePopup(evt.target);
  }
}

//event listeners for clicking outside modols
profileEditModal.addEventListener("mousedown", handleModalClick);
addCardModal.addEventListener("mousedown", handleModalClick);
previewImageModal.addEventListener("mousedown", handleModalClick);

//  Esc key press
function handleEscClose(evt) {
  if (evt.key === "Escape") {
    const openedModal = document.querySelector(".modal_opened");
    if (openedModal) {
      closePopup(openedModal);
    }
  }
}
