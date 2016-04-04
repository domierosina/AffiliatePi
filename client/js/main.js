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

Template.user.helpers({
    monthClicks: function() {
        var oneMonthAgo = moment().subtract(1, "months").toDate();
        return Clicks.find({createdAt: {$gte: oneMonthAgo}}).count();
    },

    totalEarned: function() {
        var cost = 0.02;
        var c = Clicks.find({userID: Meteor.userId()}).count()*cost;
        console.log("total earned: " + c);
        return c;
    },

    monthEarned: function() {
        var oneMonthAgo = moment().subtract(1, "months").toDate();
        return Clicks.find({createdAt: {$gte: oneMonthAgo}}).count()*0.02;
    }
});

Template.business.helpers({
    totalUsers: function() {
        return Meteor.users.find({"profile.businessURL": Meteor.user().profile.url}).count();
        //To christopher henry:
        //This seems to be a bizarre little quirk of meteor, but any queries
        //that call on a profile field need to be put in quotation marks, as
        //above. I have no idea why it is necessary, and the most confusing
        //part is that instead of throwing an error message, the queries work
        //just fine but they always evalue to "0". A couple different times 
        //during this project I had to figure that out and there is little or 
        //no documentation on it anywhere. Maybe briefly add that to your 
        //slides for the next group of students, if possible.
    }
})

Template.dashboard.helpers({
    name: function() {return Meteor.user().username;},
    id: function() {return Meteor.userId();}
});
//Meteor.loginWithPassword(email, password, function(error){
//    if(error){
//        console.log(error.reason);
//    } else {
//        Router.go("dashboard");
//    }
//});



















