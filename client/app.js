Template.songs.getSongs = function () {
  if (Session.get('SongsResults')) {
  	//console.log(Session.get('SongsResults'));
  	return Session.get('SongsResults');
  }
};

Template.songs.getSongsLength = function () {
  if (Session.get('SongsResults')) {
  	//console.log(Session.get('SongsResults'));
  	return Session.get('SongsResults').length;
  }
};

Template.songs.events({
    'keyup, click #event_search_input' : function (event) {
    // template data, if any, is available in 'this'
    var data = $('#event_search_input').val()

    if (data.length >=3) {
  	  Meteor.setTimeout(function (){
	    	data = data.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&");
	    	var results = Songs.find({ $or:[
	    		{artist:{ $regex : data, $options:"i" }},
	    		{title:{ $regex : data, $options:"i" }}]
    		}).fetch();
    	//console.log('SEARCH ',results);
    		Session.set('SongsResults',results);
    	},500);
    };
  },
  'form': function (event) {
      event.preventDefault();
   },
  'click .event_search_submit' : function(event){
    var data = $('#event_search_input').val()
	    	data = data.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&");
  	var results = Songs.find({ $or:[
  				{artist:{ $regex : data, $options:"i" }},
		  		{title:{ $regex : data, $options:"i" }}]
				}).fetch();
	//console.log('SEARCH ',results);
		Session.set('SongsResults',results);
  },
 	'click .eventCheckInUser' : function(event) {
 	$('#'+this._id).toggleClass('hide');

 	},
 	'click .eventAddUser' : function(event) {
 		var user = $('#'+this._id).children().find('input').val();
 		$('#'+this._id).toggleClass('hide');
		//$('#'+this._id).before($('#'+this._id));
		var selectedSong = $('#'+this._id).prev().children('p');
		
		if (user.length >= 0 ) {
			console.log('test');
			SongQueue.insert({
	      date :Date.now(),
	      artist :this.artist,
	      title : this.title,
	      isActive : true,
	      user : user
			},function (error,results){
				if(error) {
					console.log(error, typeof error);
				}
				if (results) {
					selectedSong.append('<span class="label label-default"> '+ user +' </span>');
					console.log(results);
				};
			});
		};
 	}
});


Template.queue.getQueue = function () {
  return SongQueue.find({},{ sort :{'date':1}}).fetch();
}

Template.queue.getQueueLength = function () {
  return SongQueue.find().fetch().length;
}

Template.queue.events({
  'form': function (event) {
      event.preventDefault();
	}
});

//  format an ISO date using Moment.js
//  http://momentjs.com/
//  moment syntax example: moment(Date("2011-07-18T15:50:52")).format("MMMM YYYY")
//  usage: {{dateFormat creation_date format="MMMM YYYY"}}
Handlebars.registerHelper('dateFormat', function(context, block) {
  if (window.moment) {
    var f = block.hash.format || "MMM DD, YYYY hh:mm:ss A";
    return moment(context).format(f); //had to remove Date(context)
  }else{
    return context;   //  moment plugin not available. return data as is.
  };
});