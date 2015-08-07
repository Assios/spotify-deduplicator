# Spotify Deduplicator

Spotify Deduplicator finds duplicate tracks in your Spotify playlists and lets you remove the duplicates directly from the application.

## Local setup
1. Install Meteor: ```curl https://install.meteor.com/ | sh```
2. Clone the repo: ```git clone https://github.com/Assios/Spotify-Deduplicator.git```
3. Go to the [Spotify Developer page](https://developer.spotify.com/my-applications) and create an app.
4. Add a redirect URI. For this example, use ```http://localhost:3000/_oauth/spotify?close```
5. Create a file called ```config.js``` in the ```server``` directory and paste the following into it, using the client ID and secret from the app page you made:
```
ServiceConfiguration.configurations.update({
    "service": "spotify"
}, {
    $set: {
        "clientId": "<YOUR_CLIENT_ID>",
        "secret": "<YOUR_CLIENT_SECRET>"
    }
}, {
    upsert: true
});
```

6. Run ```meteor run``` and the app will be running on port 3000.