Template.duplicates.onRendered(function() {

    Session.set('loadedDuplicates', false);

    var playlist_id = Router.current().params['_id']

    Meteor.call('getDuplicateTracksFromPlaylist', playlist_id, function(err, response) {
        console.log(response);

        Session.set('duplicateTracks', response);
        Session.set('loadedDuplicates', true);
    });

});

Template.duplicates.events({
    'click .remove-dup': function (e) {
        var track_uri = e.currentTarget.id;
        var track_id = e.currentTarget.id.split(':')[2];
        var playlist_id = e.currentTarget.baseURI.split('/')[4];

        Meteor.call('removeDuplicates', playlist_id, track_uri, function(err, response) {
            console.log(response);
            console.log(error);
        });

        // Remove duplicate from list after it's removed from Spotify
        $('#' + track_id).remove();
    },

    'click .home': function(e) {
        Session.set('loadedPlaylists', true);
        Router.go('/');
    }
});


Template.duplicates.helpers({
    duplicates: function() {
        return Session.get('duplicateTracks');
    },

    loadedDuplicates: function() {
        return Session.get('loadedDuplicates');
    }

});
