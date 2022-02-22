const Bank = require('./model')

module.exports = {
  index: async (req, res) => {
    try {
      const alertMessage = req.flash('alertMessage');
      const alertStatus = req.flash('alertStatus');

      const alert = { message: alertMessage, status: alertStatus };

      const bank = await Bank.find();

      res.render('admin/bank/view_bank', {
        bank,
        alert
      });
    } catch (error) {
      req.flash('alertMessage', `${error.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/bank');
    }
  },

  viewCreate: async (req, res) => {
    try {
      res.render('admin/bank/create')
    } catch (error) {
      req.flash('alertMessage', `${error.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/bank');
    }
  },

  actionCreate: async (req, res) => {
    try {
      const { name, nameOfBank, noRek } = req.body;

      let bank = await Bank({ name, nameOfBank, noRek });
      await bank.save();

      req.flash('alertMessage', 'Berhasil menambahkan bank');
      req.flash('alertStatus', 'success');
      res.redirect('/bank');
    } catch (error) {
      req.flash('alertMessage', `${error.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/bank');
    }
  },

  // viewEdit: async (req, res) => {
  //   try {
  //     const { id } = req.params;
  //     const nominal = await Nominal.findById(id);

  //     res.render('admin/nominal/edit', {
  //       nominal
  //     })
  //   } catch (error) {
  //     req.flash('alertMessage', `${error.message}`);
  //     req.flash('alertStatus', 'danger');
  //     res.redirect('/nominal');
  //   }
  // },

  // actionEdit: async (req, res) => {
  //   try {
  //     req.flash('alertMessage', 'Berhasil mengubah koin');
  //     req.flash('alertStatus', 'success');

  //     const { id } = req.params;
  //     const { coinQuantity, coinName, price } = req.body;

  //     await Nominal.findOneAndUpdate(
  //       { _id: id },
  //       { coinQuantity, coinName, price }
  //     );

  //     res.redirect('/nominal');
  //   } catch (error) {
  //     req.flash('alertMessage', `${error.message}`);
  //     req.flash('alertStatus', 'danger');
  //     res.redirect('/nominal');
  //   }
  // },

  // actionDelete: async (req, res) => {
  //   try {
  //     req.flash('alertMessage', 'Berhasil hapus koin');
  //     req.flash('alertStatus', 'success');

  //     const { id } = req.params;

  //     await Nominal.deleteOne({ _id: id });

  //     res.redirect('/nominal');
  //   } catch (error) {
  //     req.flash('alertMessage', `${error.message}`);
  //     req.flash('alertStatus', 'danger');
  //     res.redirect('/nominal');
  //   }
  // }
}