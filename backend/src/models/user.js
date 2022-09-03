const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const UnauthorizedError = require('../errors/unauthorized-error');
const { urlPattern, emailPattern } = require('../utils/constants');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: 'Жак-Ив Кусто',
  },
  about: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: 'Исследователь',
  },
  avatar: {
    type: String,
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
    validate: {
      validator(v) {
        return urlPattern.test(v);
      },
      message: (props) => `${props.value} не соответствует правильному url`,
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator(v) {
        return emailPattern.test(v);
      },
      message: (props) => `${props.value} не соответствует правильному email`,
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
});

async function findUserByCredentials(email, password) {
  const user = await this.findOne({ email }).select('+password');

  if (!user) {
    throw new UnauthorizedError('Неправильные почта или пароль');
  }

  const matched = await bcrypt.compare(password, user.password);

  if (!matched) {
    throw new UnauthorizedError('Неправильные почта или пароль');
  }
  return user;
}
userSchema.statics.findUserByCredentials = findUserByCredentials;
exports.User = mongoose.model('user', userSchema);
