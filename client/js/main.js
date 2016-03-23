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
    'submit #login-nav': function(event, template) {
        event.preventDefault();
        // 1. Collect the username and password from the form
        var email = template.find('#email').value;
        var password = template.find('#password').value;

        // 2. Attempt to login.
        Meteor.loginWithPassword(username, password, function(error) {
            // 3. Handle the response
            if (Meteor.user()) {
                // Redirect the user to where they're loggin into. Here, Router.go uses
                // the iron:router package.
                Router.go('dashboard');
            } else {
                // If no user resulted from the attempt, an error variable will be available
                // in this callback. We can output the error to the user here.
                var message = "<strong>" + error.reason + "</strong>";

                template.find('#form-messages').html(message);
            }

            return;
        });

        return false;
    }
});
