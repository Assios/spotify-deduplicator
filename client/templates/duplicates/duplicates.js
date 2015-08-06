Template.duplicates.onRendered(function() {

    Session.set('loaded', false);

    var playlist_id = Router.current().params['_id']

    Meteor.call('getDuplicateTracksFromPlaylist', playlist_id, function(err, response) {
        console.log(response);

        Session.set('duplicateTracks', response);
        Session.set('loaded', true);
    });

    Meteor.call('removeDuplicates', playlist_id, function(err, response) {
        console.log(response);
        console.log(err);
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
