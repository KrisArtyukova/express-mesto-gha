export default class UserInfo {
  constructor({ profileTitleSelector, profileSubtitleSelector, profileAvatarSelector }, popupWithFormProfile) {
    this._userInfo = undefined;
    this._profileAvatarElement = document.querySelector(profileAvatarSelector);
    this._popupWithFormProfile = popupWithFormProfile;
    this._popupForm = this._popupWithFormProfile._popupElement;
    this._popupBtn = this._popupForm.querySelector('.popup__button');
    this._popupBtnTextContent = this._popupBtn.textContent;
    this._profileTitle = document.querySelector(profileTitleSelector);
    this._profileSubtitle = document.querySelector(profileSubtitleSelector);
  }

  getUserInfo() {
    return {
      profileTitleContent: this._userInfo.name,
      profileSubtitleContent: this._userInfo.about,
      userInfo: this._userInfo,
    }
  }

  setLoadingBtnText() {
    this._popupBtn.textContent = `${this._popupBtnTextContent} ...`
  }

  setDefaultBtnText() {
    this._popupBtn.textContent = this._popupBtnTextContent;
  }

  setUserInfo(userInfo) {
    this._userInfo = userInfo;
    this._profileTitle.textContent = userInfo.name;
    this._profileSubtitle.textContent = userInfo.about;
    this._popupWithFormProfile.close();
  }

}
