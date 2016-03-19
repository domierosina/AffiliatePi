/**
 * Created by RobertH on 2016-03-19.
 */
Clicks = new Mongo.Collection('clicks');
Business = new Mongo.Collection('business');

if(Meteor.isServer){
    if(Business.find().count() == 0){
        Business.insert({
            busName: 'Google',
            busURL: 'http://www.google.ca/'
        },
        {
            busName: 'University of Winnipeg',
            busURL: 'http://www.uwinnipeg.ca/'
        },
        {
            busName: 'Amazon',
            busURL: 'http://www.amazon.ca/'
        },
        {
            busName: 'B&H',
            busURL: 'http://www.bhphotovideo.com/'
        })
    }
}

