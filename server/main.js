Meteor.startup(function () {
if(Meteor.users.find().count() === 0) {

    console.log('Created Admin user');

    Accounts.createUser({
        username: 'admin',
        email: 'admin@example.com',
        password: 'password',
        profile: {
            name: 'Administrator'
        }
    });
}
});
