Template.duplicates.onRendered(function() {

    Session.set('loadedDuplicates', false);

    var playlist_id = Router.current().params['_id']

    Meteor.call('getDuplicateTracksFromPlaylist', playlist_id, function(err, response) {

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

        });

        // Temporary hack, can't
        // remove more than 1 duplicate without
        // completely reloading
        window.location.reload()

        //$('#' + track_id).remove();
        //Session.set('duplicateTracks', $.grep(Session.get('duplicateTracks'), function(e) { return e.uri != track_uri }));
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
