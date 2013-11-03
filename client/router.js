Router.configure({
  layoutTemplate: 'layout'
});

Router.map(function() { 
  this.route('songs', { path:'/'});
  this.route('queue', { path:'/queue'});
  this.route('songs', { path:'/search'});
});