Router.route('/register', {
  name: 'register',
});
Router.route('/login');
Router.route('/dashboard');
Router.route('/forgotPassword');
Router.route('/success');
Router.route('/addBus');
Router.route('/', {
    name: 'home',
    template: 'home'
});
Router.configure({
    layoutTemplate: 'main'
});
