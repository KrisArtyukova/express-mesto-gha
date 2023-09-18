    import Card from './components/Card.js';
    import Section from './components/Section.js';
    import { formConfig, avatarEditForm, cardAddForm, popupAddCardOpenBtn, popupEditAvatarOpenBtn, popupProfileOpenButton, profileEditForm } from './utils/constants.js';
    import './pages/index.css';
    import PopupWithImage from './components/PopupWithImage.js';
    import PopupWithForm from './components/PopupWithForm.js';
    import PopupWithConfirmation from './components/PopupWithConfirmation.js';
    import UserInfo from './components/UserInfo.js';
    import FormValidator from './components/FormValidator.js';
    import { api } from './components/Api.js';

    const popupWithFormProfile = new PopupWithForm({
      submitFormCallback: editProfileFormSubmitHandler
     }, '.popup_edit_profile');

     const popupWithFormCard = new PopupWithForm({
      submitFormCallback: addCardFormSubmitHandler
     }, '.popup_cards_add');

     const popupWithFormEditAvatar = new PopupWithForm({
      submitFormCallback: editAvatarFormSubmitHandler
     }, '.popup_edit_avatar');

    const userInfo = new UserInfo({
      profileTitleSelector: '.profile__title',
      profileSubtitleSelector: '.profile__subtitle',
      profileAvatarSelector: '.profile__avatar'
    }, popupWithFormProfile);

    let cardList = undefined;

    Promise.all([api.getUserInfo(), api.getInitialCards()])
    .then(([responseUserInfo, cards]) => {
      if (responseUserInfo) {
        userInfo.setUserInfo(responseUserInfo);
      }

      cardList = new Section({
        items: cards.reverse(),
        renderer: (item) => addCardItem(item)
      }, '.elements');
      cardList.renderItems();
    })
    .finally(() => {
      userInfo.setDefaultBtnText();
    })
    .catch((error) => {
      console.log(error);
    });

    const profileEditFormValidator = new FormValidator(formConfig, profileEditForm);
    const cardAddFormValidator = new FormValidator(formConfig, cardAddForm);
    const editAvatarFormValidator = new FormValidator(formConfig, avatarEditForm);

    const popupWithImage = new PopupWithImage('.popup_img_view');
    popupWithImage.setEventListeners();


     const popupWithFormDeleteCard = new PopupWithConfirmation(
      ({ card, cardId }) => {
        api
          .deleteCard(cardId)
          .then(() => {
            card.remove();
            popupWithFormDeleteCard.close();
          })
          .catch((error) => {
            console.log(error);
          });
      },
      '.popup_delete_card'
     );


    function addCardItem(item) {
      const userId = userInfo._userInfo._id;
      const card = new Card(item, '#cardTemplate', handleCardClick, handleLikeClick, handleDeleteClick, userId);
      const cardElement = card.createCard();
      cardList.addItem(cardElement);
    }

    popupWithFormProfile.setEventListeners();
    popupWithFormCard.setEventListeners();
    popupWithFormEditAvatar.setEventListeners();
    popupWithFormDeleteCard.setEventListeners();

    function handleCardClick(link, name, caption) {
      popupWithImage.open({ link, name, caption });
    }

    function handleLikeClick(cardData, cardId, likeCountElement, likeBtnElement, resolveOwnLike, setNewCardData) {
      if (resolveOwnLike(cardData)) {
        api.deleteLike(cardId)
        .then((cardData) => {
          setNewCardData(cardData);
          likeCountElement.textContent = cardData.likes.length;
          likeBtnElement.classList.remove('element__like-btn_active');
        })
        .catch((error) => {
          console.log(error);
        });
      } else {
        api.addLike(cardId)
        .then((cardData) => {
          setNewCardData(cardData);
          likeCountElement.textContent = cardData.likes.length;
          likeBtnElement.classList.add('element__like-btn_active');
        })
        .catch((error) => {
          console.log(error);
        });
      }
    }

    function handleDeleteClick(card, cardId) {
      popupWithFormDeleteCard.open({card, cardId});
    }

    function editProfileFormSubmitHandler(evt, inputValues) {
      evt.preventDefault();
      userInfo.setLoadingBtnText();
      api.editUserInfo(inputValues['name'], inputValues['info'])
      .then((responseUserInfo) => {
        if (responseUserInfo) {
          userInfo.setUserInfo(responseUserInfo);
        }
      })
      .finally(() => {
        userInfo.setDefaultBtnText();
      })
      .catch((error) => {
        console.log(error);
      });

      userInfo.setUserInfo({
        profileTitleContent: inputValues['name'],
        profileSubtitleContent: inputValues['info'],
      });
    }

    function addCardFormSubmitHandler(evt, inputValues) {
      evt.preventDefault();
      const popupBtn = popupWithFormCard._form.querySelector('.popup__button');
      const defaultTextContent = popupBtn.textContent;
      popupBtn.textContent = `${defaultTextContent} ...`;

      api.addCard(inputValues['title'], inputValues['link'])
      .then((cardData) => {
        addCardItem(cardData);
        popupWithFormCard.close();
      })
      .finally(() => {
        popupBtn.textContent = defaultTextContent;
      })
      .catch((error) => {
        console.log(error);
      });
    }

    function editAvatarFormSubmitHandler(evt, inputValues) {
      evt.preventDefault();
      const avatarLink = inputValues['link'];
      const popupBtn = popupWithFormEditAvatar._form.querySelector('.popup__button');
      const defaultTextContent = popupBtn.textContent;
      popupBtn.textContent = `${defaultTextContent} ...`;


      api.editUserAvatar(avatarLink)
      .then((response) => {
        console.log(response);
        popupEditAvatarOpenBtn.style.backgroundImage=`url(${response.avatar})`;
        popupWithFormEditAvatar.close();
      })
      .finally(() => {
        popupBtn.textContent = defaultTextContent;
      })
      .catch((error) => {
        console.log(error);
      });
    }

    function editBtnHandler() {
      const initialValues = userInfo.getUserInfo();
      popupWithFormProfile.setInitialValues({ name: initialValues.profileTitleContent, info: initialValues.profileSubtitleContent  });
      profileEditFormValidator.resetInputValidity();
      popupWithFormProfile.open();
    }

    function openAddCardPopupBtnHandler() {
      cardAddFormValidator.resetInputValidity();
      popupWithFormCard.open();
    }

    function openEditAvatarPopupBtnHandler() {
      editAvatarFormValidator.resetInputValidity();
      popupWithFormEditAvatar.open();
    }

    popupProfileOpenButton.addEventListener('click', editBtnHandler);
    popupAddCardOpenBtn.addEventListener('click', openAddCardPopupBtnHandler);
    popupEditAvatarOpenBtn.addEventListener('click', openEditAvatarPopupBtnHandler);



