module.exports = {
  isLoginAdmin: (req, res, next) => {
    if (req.session.user === null || req.session.user === undefined) {
      req.flash('alertMessage', `Mohon maaf sesi anda telah berakhir, silakan Login kembali!`);
      req.flash('alertStatus', 'warning');
      res.redirect('/');
    } else {
      next();
    }
  }
}