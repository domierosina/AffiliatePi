///**
// * Created by RobertH on 2016-03-19.
// */
//if(Business.find().count() == 0){
//    Business.insert({
//        busName: 'Google',
//        busURL: 'http://www.google.ca/'
//    });
//    Business.insert({
//        busName: 'Amazon',
//        busURL: 'http://www.amazon.ca/'
//    });
//    Business.insert({
//        busName: 'Uwinnipeg',
//        busURL: 'http://www.uwinnipeg.ca/'
//    });
//}

Meteor.publish('userData', function() {
    return Meteor.users.find({}, {fields: {'profile':1}});
});
//Meteor.publish('business', function() {
//    return Business.find()
//});
Meteor.publish('clicks', function(){
    return Clicks.find()
});

Meteor.methods({
    createNewUser: function(userInfo) {
        var use = Accounts.createUser({
            email: userInfo.email,
            password: userInfo.password,
            username: userInfo.username,
            profile: {
                paypalEmail: userInfo.ppEmail,
                name: {
                    firstName: userInfo.firstName,
                    lastName: userInfo.lastName
                },
                businessURL: userInfo.busSup,
                type: userInfo.type
            }
        });

        Roles.addUsersToRoles(use, ['user']);
    },

    createBusiness: function(bus) {
        var newBus = Accounts.createUser({
            email: bus.email,
            password: bus.password,
            profile: {
                contact: bus.contact,
                bname: bus.bname,
                url: bus.url,
                type: bus.type
            }
        });

        Roles.addUsersToRoles(newBus, ['business']);
    }
});

Accounts.onCreateUser(function (options, user) {
    if(options.profile.type == "user") {
        user.roles = ['user'];
    } else if(options.profile.type == 'business'){
        user.roles = ['business'];
    } else if(options.profile.type == 'admin') {
        user.roles = ['admin'];
    }

    //user.roles = ['user'];

    if (options.profile)
        user.profile = options.profile;
    return user;
});