// We need to specify scopes for accessing user-related data
// https://developer.spotify.com/web-api/using-scopes/

Accounts.ui.config({'requestPermissions':{'spotify': ['playlist-modify-private', 'playlist-modify-public', 'playlist-read-private', 'user-library-read']}});
