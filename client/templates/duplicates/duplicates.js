Template.duplicates.onRendered(function() {

    Meteor.call('getDuplicateTracksFromPlaylist', Router.current().params['_id'], function(err, response) {
        console.log(response);

        Session.set('duplicateTracks', response);
    });

});

Template.duplicates.helpers({
    duplicates: function() {
        return Session.get('duplicateTracks');
    },

});
