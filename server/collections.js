Songs = new Meteor.Collection("songs");
User = new Meteor.Collection("user") ;
SongQueue = new Meteor.Collection("songqueue") ;

Meteor.publish('songs', function(){
    return Songs.find({})
});

Meteor.publish('user', function(){
    return User.find({})
});

Meteor.publish('queue', function(){
    return SongQueue.find({})
});