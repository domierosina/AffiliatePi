Meteor.subscribe('userData');
Meteor.subscribe('business');
Meteor.subscribe('clicks');

//Maybe use this.
//Meteor.users.after.insert(function(userId, user) {
//    if(user.profile.type === "user") {
//        Roles.addUsersToRoles(user._id,"user")
//    } else if (user.profile.type === "business") {
//        Roles.addUsersToRoles(user._id, "business")
//    } else if (user.profile.type === "admin") {
//        Roles.addUsersToRoles(user._id, "admin")
//    }
//});




Template.register.helpers({
    bus: Meteor.users.find({"profile.type": 'business'})
});

Template.register.events({
    'submit form': function(event){
        event.preventDefault();
        var email = $('[name=registerEmail]').val();
        var password = $('[name=registerPassword]').val();
        var username = $('[name=registerUsername]').val();
        var ppEmail = $('[name=registerPayPal]').val();
        var firstName = $('[name=registerFirstName]').val();
        var lastName = $('[name=registerLastName]').val();
        var busSup = $('[name=registerBusinessSupport]').val();
        var terms = event.target.registerAgree.checked;
        var news = event.target.registerNewsletter.checked;
        var type = "user";

        var pass = {
            email: email,
            password: password,
            username: username,
            ppEmail: ppEmail,
            firstName: firstName,
            lastName: lastName,
            busSup: busSup,
            type: type
        };

        //call the meteor method instead of doing it here
        Meteor.call('createNewUser', pass);

        //var use = Accounts.createUser({
        //    email: email,
        //    password: password,
        //    username: username,
        //    profile: {
        //        paypalEmail: ppEmail,
        //        name: {firstName: firstName, lastName: lastName},
        //        businessURL : busSup,
        //        type: type
        //    },
        //    terms: terms,
        //    news: news
        //});
        //
        ////add to user role.
        //Roles.addUsersToRoles(use, ['user']);

        Router.go('success');
    }
});

Template.addBus.events({
    'submit form': function(event){
        event.preventDefault();
        var email = $('[name=busEmail]').val();
        var password = $('[name=busPassword]').val();
        var contact = $('[name=busContactName]').val();
        var bName = $('[name=busName]').val();
        var bURL = $('[name=busURL]').val();
        var bterms = event.target.busAgree.checked;
        var bnews = event.target.busNewsletter.checked;

        var userBus = {
            email: email,
            password: password,
            contact: contact,
            bname: bName,
            url: bURL,
            type: 'business'
        };

        //Roles.addUsersToRoles(userBus, ['business']);

        Meteor.call('createBusiness', userBus);

        Router.go('success');
    }
});

Template.navigation.events({
    'click .logout': function(event){
        event.preventDefault();
        Meteor.logout();
        Router.go('home');
    }
});

Template.loginButton.events({
    'submit form': function(event){
        event.preventDefault();
        var email = event.target.email.value;
        var password = event.target.password.value;
        Meteor.loginWithPassword(email, password);
        Router.go("dashboard")
    }
});

//Meteor.loginWithPassword(email, password, function(error){
//    if(error){
//        console.log(error.reason);
//    } else {
//        Router.go("dashboard");
//    }
//});



















