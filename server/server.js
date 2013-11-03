if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
    if (songsJson) {
    	console.log("[SERVER] songsJson is present, LOADED SONGS: ",songsJson.length,Songs.find().count());
    	if (Songs.find().count() == 0) {
    		_.each(songsJson,function (key){
    			Songs.insert(key);
    		})
    		console.log('[SERVER] Songs added in collection : ',Songs.find().count());
    	}else{
    		console.log('[SERVER] Songs in collection : ',Songs.find().count());
    	}
    }
  });
}
