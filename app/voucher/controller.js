const Voucher = require('./model');
const Category = require('../category/model');
const Nominal = require('../nominal/model');
const path = require('path');
const fs = require('fs');
const config = require('../../config');

module.exports = {
  index: async (req, res) => {
    try {
      const alertMessage = req.flash('alertMessage');
      const alertStatus = req.flash('alertStatus');

      const alert = { message: alertMessage, status: alertStatus };

      const voucher = await Voucher.find().populate('category').populate('nominals');
      console.log(voucher);

      res.render('admin/voucher/view_voucher', {
        alert,
        voucher
      });
    } catch (error) {
      req.flash('alertMessage', `${error.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/voucher');
    }
  },
  viewCreate: async (req, res) => {
    try {
      const category = await Category.find();
      const nominal = await Nominal.find();
      res.render('admin/voucher/create', {
        category,
        nominal
      })
    } catch (error) {
      req.flash('alertMessage', `${error.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/voucher');
    }
  },
  actionCreate: async (req, res) => {
    try {
      const { name, category, nominals } = req.body;

      if (req.file) {
        let tmp_path = req.file.path;
        let originalExt = req.file.originalname.split('.')[req.file.originalname.split('.').length - 1];
        let filename = req.file.filename + '.' + originalExt;
        let target_path = path.resolve(config.rootPath, `public/uploads/${filename}`);

        const src = fs.createReadStream(tmp_path);
        const dest = fs.createWriteStream(target_path);

        src.pipe(dest)
        src.on('end', async () => {
          try {
            const voucher = new Voucher({ name, category, nominals, thumbnail: filename });
            await voucher.save();

            req.flash('alertMessage', 'Berhasil menambahkan voucher');
            req.flash('alertStatus', 'success');
            res.redirect('/voucher');
          } catch (error) {
            req.flash('alertMessage', `${error.message}`);
            req.flash('alertStatus', 'danger');
            res.redirect('/voucher');
          }
        })
      } else {
        const voucher = new Voucher({ name, category, nominals });
        await voucher.save();

        req.flash('alertMessage', 'Berhasil menambahkan voucher');
        req.flash('alertStatus', 'success');
        res.redirect('/voucher');
      }
    } catch (error) {
      req.flash('alertMessage', `${error.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/voucher');
    }
  },
  // viewEdit: async (req, res) => {
  //   try {
  //     const { id } = req.params;
  //     const voucher = await voucher.findById(id);

  //     res.render('admin/voucher/edit', {
  //       voucher
  //     })
  //   } catch (error) {
  //     req.flash('alertMessage', `${error.message}`);
  //     req.flash('alertStatus', 'danger');
  //     res.redirect('/voucher');
  //   }
  // },
  // actionEdit: async (req, res) => {
  //   try {
  //     req.flash('alertMessage', 'Berhasil mengubah koin');
  //     req.flash('alertStatus', 'success');

  //     const { id } = req.params;
  //     const { coinQuantity, coinName, price } = req.body;

  //     await voucher.findOneAndUpdate(
  //       { _id: id },
  //       {coinQuantity, coinName, price}
  //     );

  //     res.redirect('/voucher');
  //   } catch (error) {
  //     req.flash('alertMessage', `${error.message}`);
  //     req.flash('alertStatus', 'danger');
  //     res.redirect('/voucher');
  //   }
  // },
  // actionDelete: async (req, res) => {
  //   try {
  //     req.flash('alertMessage', 'Berhasil hapus koin');
  //     req.flash('alertStatus', 'success');

  //     const { id } = req.params;

  //     await voucher.deleteOne({ _id: id });

  //     res.redirect('/voucher');
  //   } catch (error) {
  //     req.flash('alertMessage', `${error.message}`);
  //     req.flash('alertStatus', 'danger');
  //     res.redirect('/voucher');
  //   }
  // }
}