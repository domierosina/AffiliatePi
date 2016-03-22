/**
 * Created by RobertH on 2016-03-19.
 */
if(Business.find().count() == 0){
    Business.insert({
        busName: 'Google',
        busURL: 'http://www.google.ca/'
    })
    Business.insert({
        busName: 'Amazon',
        busURL: 'http://www.amazon.ca/'
    })
    Business.insert({
        busName: 'UWinnipeg',
        busURL: 'http://www.uwinnipeg.ca/'
    })
}

Meteor.publish('userData', function() {
    return Meteor.users.find({}, {fields: {'profile':1}});
});
Meteor.publish('business', function() {
    return Business.find()
});
Meteor.publish('clicks', function(){
    return Clicks.find()
});
