Meteor.subscribe('userData');
Meteor.subscribe('business');
Meteor.subscribe('clicks');

var business = Business.find();

Template.register.helpers({
    bus: business
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
        Accounts.createUser({
            email: email,
            password: password,
            username: username,
            profile: {
                paypalEmail: ppEmail,
                name: {firstName: firstName, lastName: lastName},
                businessURL : busSup
            },
            terms: terms,
            news: news
        });
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
        Accounts.createUser({
            email: email,
            password: password,
            contact: contact,
            bname: bName,
            url : bURL,
            terms: bterms,
            news: bnews
        });
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

Template.login.events({
    'submit form': function(event){
        event.preventDefault();
        var email = $('[name=email]').val();
        var password = $('[name=password]').val();
        Meteor.loginWithPassword(email, password);
    }
});

Meteor.loginWithPassword(email, password, function(error){
    if(error){
        console.log(error.reason);
    } else {
        Router.go("dashboard");
    }
});
