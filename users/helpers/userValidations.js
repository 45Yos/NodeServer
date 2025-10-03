const DEFAULT_VALIDATION = {
        type: String,
        required: true,
        minLength: 2
}



const PHONE_VALIDATION = {
    type: String,
    required: true,
    match: RegExp(/0[0-9]{1,2}\-?\s?[0-9]{3}\s?[0-9]{4}/),
}


const MAIL_VALIDATION = {
    type: String,
    required: true,
    unique: true,
    match: RegExp(/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/),
}


const PASSWORD_VALIDATION = {
    type: String,
    required: true,
    match: RegExp(/((?=.*\d{1})(?=.*[A-Z]{1})(?=.*[a-z]{1})(?=.*[!@#$%^&*-]{1}))/),
}



const URL = {
    type: String,
  match: RegExp(
    /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/
  ),
  trim: true,
  lowercase: true,
}




module.exports = {
    DEFAULT_VALIDATION,
    PHONE_VALIDATION,
    MAIL_VALIDATION,
    PASSWORD_VALIDATION,
    URL
}