const mongoose = require('mongoose');

let bankSchema = mongoose.Schema({
  name: {
    type: String,
    require: [true, 'Nama Pemilik harus diisi']
  },
  nameOfBank: {
    type: String,
    require: [true, 'Nama Bank harus diisi']
  },
  noRek: {
    type: String,
    require: [true, 'Nomor Rekening harus diisi']
  },
}, { timestamps: true })

module.exports = mongoose.model('Bank', bankSchema);