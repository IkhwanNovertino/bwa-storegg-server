const Nominal = require('./model')

module.exports = {
  index: async (req, res) => {
    try {
      const alertMessage = req.flash('alertMessage');
      const alertStatus = req.flash('alertStatus');

      const alert = { message: alertMessage, status: alertStatus };
      
      const nominal = await Nominal.find();
      
      res.render('admin/nominal/view_nominal', {
        nominal,
        alert
      });
    } catch (error) {
      req.flash('alertMessage', `${error.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/nominal');
    }
  },
  viewCreate: async (req, res) => {
    try {
      res.render('admin/nominal/create')
    } catch (error) {
      req.flash('alertMessage', `${error.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/nominal');
    }
  },
  actionCreate: async (req, res) => {
    try {

      req.flash('alertMessage', 'Berhasil menambahkan koin');
      req.flash('alertStatus', 'success');

      const { coinQuantity, coinName, price } = req.body;

      let nominal = await Nominal({ coinQuantity, coinName, price });
      await nominal.save();

      res.redirect('/nominal');
    } catch (error) {
      req.flash('alertMessage', `${error.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/nominal');
    }
  },
  // viewEdit: async (req, res) => {
  //   try {
  //     const { id } = req.params;
  //     const category = await Category.findById(id);

  //     res.render('admin/category/edit', {
  //       category
  //     })
  //   } catch (error) {
  //     req.flash('alertMessage', `${error.message}`);
  //     req.flash('alertStatus', 'danger');
  //     res.redirect('/nominal');
  //   }
  // },
  // actionEdit: async (req, res) => {
  //   try {
  //     req.flash('alertMessage', 'Berhasil ubah kategori');
  //     req.flash('alertStatus', 'success');

  //     const { id } = req.params;
  //     const { name } = req.body;

  //     const category = await Category.findOneAndUpdate(
  //       { _id: id },
  //       {name}
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
  //     req.flash('alertMessage', 'Berhasil hapus kategori');
  //     req.flash('alertStatus', 'success');

  //     const { id } = req.params;

  //     const category = await Category.deleteOne({ _id: id });

  //     res.redirect('/nominal');
  //   } catch (error) {
  //     req.flash('alertMessage', `${error.message}`);
  //     req.flash('alertStatus', 'danger');
  //     res.redirect('/nominal');
  //   }
  // }
}