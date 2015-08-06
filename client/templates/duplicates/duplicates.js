Template.duplicates.onRendered(function() {

    Session.set('loaded', false);

    Meteor.call('getDuplicateTracksFromPlaylist', Router.current().params['_id'], function(err, response) {
        console.log(response);

        Session.set('duplicateTracks', response);
        Session.set('loaded', true);
    });

});

Template.duplicates.helpers({
    duplicates: function() {
        return Session.get('duplicateTracks');
    },

    loaded: function() {
        return Session.get('loaded');
    }

});
