Router.route('/register', {
    name: 'register'
});


Router.route('click', {
        path: '/click/:_id',
        data: function(){
            return Meteor.users.findOne({id: this.params._id});
        },

        onAfterAction: function(){
            //find the user and corresponding url for which the click occurred based on the URL passed in
            var user = Meteor.users.findOne(this.params._id);

            //insert the new click
            Clicks.insert({
                createdAt: new Date(),
                userID: this.params._id,
                url: user.profile.businessURL
            })

            //redirect
            window.location.replace(user.profile.businessURL);
        }
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
