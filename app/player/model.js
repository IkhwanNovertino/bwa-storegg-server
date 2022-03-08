const mongoose = require('mongoose');

let playerSchema = mongoose.Schema({
  email: {
    type: String,
    require: [true, 'Email harus diisi']
  },
  name: {
    type: String,
    require: [true, 'Nama harus diisi'],
    maxLength: [225, 'panjang nama harus antara 3 - 225 karakter'],
    minLength: [3, 'panjang nama harus antara 3 - 225 karakter'],
  },
  password: {
    type: String,
    require: [true, 'Password harus diisi'],
    maxLength: [225, 'panjang password harus antara 8 - 225 karakter'],
    minLength: [8, 'panjang password harus antara 8 - 225 karakter'],
  },
  username: {
    type: String,
    require: [true, 'Nama harus diisi'],
    maxLength: [225, 'panjang username harus antara 3 - 225 karakter'],
    minLength: [3, 'panjang username harus antara 3 - 225 karakter'],
  },
  role: {
    type: String,
    enum: ['admin', 'user'],
    default: 'user'
  },
  status: {
    type: String,
    enum: ['Y', 'N'],
    default: ['Y']
  },
  avatar: {
    type: String
  },
  fileName: {
    type: String
  },
  phoneNumber: {
    type: Number,
    require: [true, 'Nomor HP harus diisi'],
    maxLength: [13, 'no. Telpon harus antara 9 - 13 karakter'],
    minLength: [9, 'no. Telpon harus antara 9 - 13 karakter'],
  },
  favourite: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category'
  }
}, { timestamps: true }) // untuk menambahkan createdAt dan updateAt di document(table)

module.exports = mongoose.model('Player', playerSchema);