Template.playlists.onRendered(function() {

    Meteor.call('randomGreeting', function(err, response) {
        Session.set('greeting', response);
    });

    Meteor.call('getPlaylists', function(err, response) {
        // We only want playlists made by the current user
        var own_playlists = []

        for (i = 0; i < response.items.length; i++) {
            if (response.items[i].owner.id == Meteor.user().profile.id) {
                own_playlists.push(response.items[i]);
            }
        }

        Session.set('playlistCount', own_playlists.length);
        Session.set('playlists', own_playlists);
        Session.set('loadedPlaylists', true);
    });
});

Template.playlists.helpers({
    user_name: function() {
        if (Meteor.user()) {
            return Meteor.user().profile.display_name;
        }
    },

    playlistCount: function() {
        return Session.get('playlistCount');
    },

    playlistTracks: function() {
        return Session.get('playlistTracks');
    },

    playlists: function() {
        return Session.get('playlists');
    },

    greeting: function() {
        return Session.get('greeting');
    }
});
