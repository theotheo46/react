enum ROUTES_NAMES {
  login = 'login',
  forum = 'forum',
  registration = 'registration',
  profile = 'profile',
  changeProfile = 'changeProfile',
  changePassword = 'changePassword',
}

const { login, forum, profile, registration, changePassword, changeProfile } =
  ROUTES_NAMES

export const REGULAR_EXPRESSON = {
  EMAIL: /^(.+)@(.+){2,}\.(.+){2,}$/,
  LOGIN: /^[A-Za-z0-9\-_]{2,16}$/,
  NAME: /^[A-Za-zА-Яа-я\-ъ]{2,16}$/,
  PHONE:
    /^(\+7|7|8)?[\s-]?\(?[489][0-9]{2}\)?[\s-]?[0-9]{3}[\s-]?[0-9]{2}[\s-]?[0-9]{2}$/,
  PASSWORD:
    /^(?=.*[a-zа-я])(?=.*[A-ZА-Я])(?=.*\d)[A-Za-zА-Яа-я\d@$!%*?&_-]{6,}$/,
  MESSAGE: /^[\w\W]{1,}$/,
  TITLE: /^[\w\W]{1,40}$/,
}

export const REGEX_ERRORS = {
  EMAIL: 'E-mail введен не корректно',
  LOGIN:
    'Допускаются только латинские буквы, цифры, знаки - и _ (от 2 до 16 символов).',
  NAME: 'Допускаются только буквы (от 2 до 16 символов).',
  PHONE: 'Введите корректный номер телефона',
  PASSWORD:
    'Минимум 6 символов. Введите хотя бы одну заглавную букву, одну строчную букву и цифру',
  MESSAGE: 'Это поле не должно быть пустым...',
  TITLE:
    'Это поле обязательно для заполнения и должно быть не больше 40 символов',
}

const EMAIL = {
  id: 'email',
  label: 'Email',
  type: 'email',
  required: true,
  name: 'email',
  regex: REGULAR_EXPRESSON.EMAIL,
  errorText: REGEX_ERRORS.EMAIL,
}
const TITLE = {
  id: 'title',
  label: 'Заголовок',
  type: 'text',
  required: true,
  name: 'title',
  regex: REGULAR_EXPRESSON.TITLE,
  errorText: REGEX_ERRORS.TITLE,
}

const LOGIN = {
  id: 'login',
  label: 'Логин',
  type: 'text',
  required: true,
  name: 'login',
  regex: REGULAR_EXPRESSON.LOGIN,
  errorText: REGEX_ERRORS.LOGIN,
}

const DISPLAY_NAME = {
  id: 'display_name',
  label: 'Публичное имя',
  required: false,
  type: 'text',
  name: 'display_name',
  regex: REGULAR_EXPRESSON.LOGIN,
  errorText: REGEX_ERRORS.LOGIN,
}

const FIRST_NAME = {
  id: 'first_name',
  type: 'text',
  required: true,
  label: 'Имя',
  name: 'first_name',
  regex: REGULAR_EXPRESSON.NAME,
  errorText: REGEX_ERRORS.NAME,
}

const SECOND_NAME = {
  id: 'second_name',
  type: 'text',
  required: true,
  label: 'Фамилия',
  name: 'second_name',
  regex: REGULAR_EXPRESSON.NAME,
  errorText: REGEX_ERRORS.NAME,
}

const PHONE = {
  id: 'phone',
  type: 'tel',
  required: true,
  label: 'Телефон',
  name: 'phone',
  regex: REGULAR_EXPRESSON.PHONE,
  errorText: REGEX_ERRORS.PHONE,
}

const PASSWORD = {
  id: 'password',
  type: 'password',
  required: true,
  label: 'Пароль',
  name: 'password',
  regex: REGULAR_EXPRESSON.PASSWORD,
  errorText: REGEX_ERRORS.PASSWORD,
}

const OLD_PASSWORD = {
  id: 'oldPassword',
  type: 'password',
  required: true,
  label: 'Старый пароль',
  name: 'oldPassword',
  regex: REGULAR_EXPRESSON.PASSWORD,
  errorText: REGEX_ERRORS.PASSWORD,
}

const NEW_PASSWORD = {
  id: 'newPassword',
  type: 'password',
  required: false,
  label: 'Новый пароль',
  name: 'newPassword',
  regex: REGULAR_EXPRESSON.PASSWORD,
  errorText: REGEX_ERRORS.PASSWORD,
}

const REPEAT_PASSWORD = {
  id: 'confirm_new_password',
  type: 'password',
  required: true,
  label: 'Повторить новый пароль',
  name: 'confirm_new_password',
  regex: REGULAR_EXPRESSON.PASSWORD,
  errorText: REGEX_ERRORS.PASSWORD,
}

export const VALIDATE_FIELDS = {
  [login]: [LOGIN, PASSWORD],
  [forum]: [TITLE],
  [registration]: [
    FIRST_NAME,
    SECOND_NAME,
    LOGIN,
    EMAIL,
    PHONE,
    PASSWORD,
    REPEAT_PASSWORD,
  ],
  [profile]: [LOGIN, FIRST_NAME, SECOND_NAME, DISPLAY_NAME, EMAIL, PHONE],
  [changePassword]: [OLD_PASSWORD, NEW_PASSWORD, REPEAT_PASSWORD],
  [changeProfile]: [EMAIL, LOGIN, DISPLAY_NAME, FIRST_NAME, SECOND_NAME, PHONE],
}
