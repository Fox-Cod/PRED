// userAuth.js
import { makeAutoObservable, runInAction } from "mobx";

export default class userAuth {
  constructor() {
    this._isAuth = false;       // Состояние аутентификации
    this._userId = 0;           // ID пользователя
    this._defaultRole = "utilizador"; // Роль по умолчанию
    this._profile = {};            // Данные пользователя
    this._token = {};           // Токен пользователя
    this._activity = [];        // Данные активности
    this._loading = true;       // Состояние загрузки
    makeAutoObservable(this);   // Автоматическое отслеживание изменений MobX
  }

  // Методы для установки значений
  setIsAuth(isAuth) {
    this._isAuth = isAuth;
  }

  setUserId(userId) {
    this._userId = userId;
  }

  setDefaultRole(role) {
    this._defaultRole = role;
  }

  setProfile(profile) {
    this._profile = profile;
  }

  setToken(token) {
    this._token = token;
  }

  setActivity(activity) {
    this._activity = activity;
  }

  setLoading(loading) {
    this._loading = loading;
  }

  // Геттеры для получения значений
  get isAuth() {
    return this._isAuth;
  }

  get userId() {
    return this._userId;
  }

  get defaultRole() {
    return this._defaultRole;
  }

  get profile() {
    return this._profile;
  }

  get token() {
    return this._token;
  }

  get activity() {
    return this._activity;
  }

  get loading() {
    return this._loading;
  }
}
