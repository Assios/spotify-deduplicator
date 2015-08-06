Meteor.methods({

    getPlaylists: function() {
        var spotifyApi = new SpotifyWebApi();
        var response = spotifyApi.getUserPlaylists(Meteor.user().services.spotify.id, {
            'limit': 50
        });

        if (checkTokenRefreshed(response, spotifyApi)) {
            response = spotifyApi.getUserPlaylists(Meteor.user().services.spotify.id, {
                'limit': 50
            });
        }

        return response.data.body;
    },

    getTracks: function(ids) {
        var spotifyApi = new SpotifyWebApi();
        var response = spotifyApi.getTracks(ids);

        return response;
    },

    removeTrackFromPlaylist: function(playlist_id, track_uri) {
        var spotifyApi = new SpotifyWebApi();

        // Remove all occurrences of track
        var response = spotifyApi.removeTracksFromPlaylist(Meteor.user().services.spotify.id, playlist_id,
              [{
                  'uri' : track_uri
              }], {});

        return response;
    },

    addTrackToPlaylist: function(playlist_id, track_uri) {
        var spotifyApi = new SpotifyWebApi();

        var response = spotifyApi.addTracksToPlaylist(Meteor.user().services.spotify.id, playlist_id, [track_uri])

        return response;
    },

    removeDuplicates: function(playlist_id, track_uri) {
        var spotifyApi = new SpotifyWebApi();

        // Remove all occurrences of track
        var remove = spotifyApi.removeTracksFromPlaylist(Meteor.user().services.spotify.id, playlist_id,
              [{
                  'uri' : track_uri
              }], {});

        if (checkTokenRefreshed(remove, spotifyApi)) {
            remove = spotifyApi.removeTracksFromPlaylist(Meteor.user().services.spotify.id, playlist_id,
              [{
                  'uri' : track_uri
              }], {});
        }

        // Add once after removing all
        var add = spotifyApi.addTracksToPlaylist(Meteor.user().services.spotify.id, playlist_id, [track_uri]);

        return add;
    },

    getDuplicateTracksFromPlaylist: function(playlist_id) {
        var spotifyApi = new SpotifyWebApi();
     
        var offset = 0;
        var delta = 100;
        var number_of_songs = spotifyApi.getPlaylistTracks(Meteor.user().services.spotify.id, playlist_id, {
            'limit': 100,
            'offset': 100,
            'fields': 'total'
        }).data.body.total;
        var response = [];

        do {
            var array = spotifyApi.getPlaylistTracks(Meteor.user().services.spotify.id, playlist_id, {
                'limit': 100,
                'offset': offset,
                'fields': 'items.track.uri'
            }).data.body.items;

            for (i = 0; i < array.length; i++) {
                array[i] = array[i].track.uri;
            }

            response.push.apply(response, array);
            offset += delta;
            number_of_songs -= 500;
        } while (number_of_songs > 100);


        var sorted = response.sort();

        var uris = [];

        for (var i = 0; i < sorted.length - 1; i++) {
            if (sorted[i + 1] == sorted[i]) {
                uris.push(sorted[i]);
            }
        }

        if (checkTokenRefreshed(response, spotifyApi)) {
            response = spotifyApi.getPlaylistTracks(Meteor.user().services.spotify.id, playlist_id, {
                'limit': 100,
                'offset': 100,
                'fields': 'items.track.uri'
            });
        }

        uris = uniquify(uris);

        ids = [];

        for (i = 0; i < uris.length; i++) {
            ids.push(uris[i].split(':')[2])
        }

        return spotifyApi.getTracks(ids).data.body.tracks;
    },

    randomGreeting: function() {
      var greetings = ["Hello", "Sup,", "Good day", "Hi", "Nice to see you,", "Yo", "Howdy"];

      return  greetings[Math.floor(Math.random() * greetings.length)];
    }
});

var uniquify = function(origArr) {
    var newArr = [],
        origLen = origArr.length,
        found, x, y;

    for (x = 0; x < origLen; x++) {
        found = undefined;
        for (y = 0; y < newArr.length; y++) {
            if (origArr[x] === newArr[y]) {
                found = true;
                break;
            }
        }
        if (!found) {
            newArr.push(origArr[x]);
        }
    }
    return newArr;
}

var checkTokenRefreshed = function(response, api) {
    if (response.error && response.error.statusCode === 401) {
        api.refreshAndUpdateAccessToken();
        return true;
    } else {
        return false;
    }
}
