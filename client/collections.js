Songs = new Meteor.Collection("songs");
User = new Meteor.Collection("user") ;
SongQueue = new Meteor.Collection("songqueue") ;

Deps.autorun(function () {
	Meteor.subscribe('songs', function (error,results){
		Session.set('getSongs', results);		
	});

	Meteor.subscribe('user', function (error,results){
		Session.set('getUser', results);		
	});

	Meteor.subscribe('queue', function (error,results){
		Session.set('getQueue', results);		
	});
});