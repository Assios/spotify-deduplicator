Template.duplicates.onRendered(function() {

    Session.set('loaded', false);

    var playlist_id = Router.current().params['_id']

    Meteor.call('getDuplicateTracksFromPlaylist', playlist_id, function(err, response) {
        console.log(response);

        Session.set('duplicateTracks', response);
        Session.set('loaded', true);
    });

});

Template.duplicates.events({
    'click .remove-dup': function (e) {
        var track_uri = e.currentTarget.id;
        var playlist_id = e.currentTarget.baseURI.split('/')[4];
        console.log(track_uri);
        console.log(playlist_id);

        Meteor.call('removeDuplicates', playlist_id, track_uri, function(err, response) {
            console.log(response);
        });
    }
});


Template.duplicates.helpers({
    duplicates: function() {
        return Session.get('duplicateTracks');
    },

    loaded: function() {
        return Session.get('loaded');
    }

});
