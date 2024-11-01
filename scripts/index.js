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
}

function openPopup(modal) {
  modal.classList.add("modal_opened");
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
  const newCard = {
    name: placeNameInput.value,
    link: placeUrlInput.value,
  };
  cardListEl.prepend(getCardElement(newCard));
  closePopup(addCardModal);
  addCardForm.reset();
}

/*                            Event Handlers                           */
profileEditButton.addEventListener("click", () => {
  nameInput.value = profileTitle.textContent;
  descriptionInput.value = profileDescription.textContent;
  validateForm(profileEditForm);
  openPopup(profileEditModal);
});

profileEditCloseButton.addEventListener("click", () => {
  closePopup(profileEditModal);
});

profileEditForm.addEventListener("submit", handleProfileEditSubmit);

addCardButton.addEventListener("click", () => {
  addCardForm.reset();
  disableButton(addCardForm.querySelector(".modal__button"));
  openPopup(addCardModal);
});
addCardCloseButton.addEventListener("click", () => closePopup(addCardModal));
addCardForm.addEventListener("submit", handleAddCardSubmit);

// Add input validation listeners
profileEditForm.addEventListener("input", () => validateForm(profileEditForm));
addCardForm.addEventListener("input", () => validateForm(addCardForm));

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
