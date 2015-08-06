Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  notFoundTemplate: 'notFound'
});

Router.plugin('ensureSignedIn', {
  except: ['homepage', 'atSignIn', 'atSignUp', 'atForgotPassword']
});

Router.route('/', {name: 'playlists'});

Router.route('playlist/:_id/:name', {
    name: 'duplicates',
    data: function(){
    return {_id: this.params._id, name: this.params.name};
    }
});
