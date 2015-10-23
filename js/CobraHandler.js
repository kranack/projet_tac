/*Mise à jour des fonctionalités via les données reçues par cobra*/
"use strict";

// On rajoute une fonction contains sur les arrays
Array.prototype.contains = function(v) {
    for(var i = 0; i < this.length; i++) {
        if(this[i] === v) return true;
    }
    return false;
};

var CobraHandler = (function(Cobra, DOMHelper, DOMObject, MessageListView, UserListView){

	function CobraHandler() {
		this.url = "http://cobra-framework.com:8080";
		this.apiUrl = "http://cobra-framework.com:3000/api/events/";
		this.socketId = null;
		this.user = new User();
		this.users = [];

        // Vues
        this.messageListView = new MessageListView();
        this.userListView = new UserListView();
	}

	/*Héritage de Cobra*/
	CobraHandler.prototype = Cobra.prototype;
	CobraHandler.prototype.constructor = CobraHandler;

	/*Lors de l'ouverture de la liste de courses collaborative, gestion de l'entrée du pseudo choisi*/
	/*mettre dans une variable pouvant être réutilisée par la suite*/
	CobraHandler.prototype.displayUsers = function(){
		var userList = DOMHelper.getElement('#users_list');
		for(var i=0; i<this.users.length; i++) {
			var element = '<span id="'+i+'">' + this.users[i] + '</span><br>';
			userList.html(element);
			userList.find(DOMHelper.serialize('span#'+i)).css("color : " + DOMHelper.getRandomColor());
		}
	};

	/*à chaque nouvelle entrée dans la liste, cette fonction devra prendre en compte le pseudo pour identifier qui a fait la nouvelle entrée*/
	/*gère l'affichage d'une room précise avec un paramètre*/
	CobraHandler.prototype.updateList_body = function(){

	};

	CobraHandler.prototype.sendAnEntry = function(message, type){
        Cobra.prototype.sendMessage.call(this, this.user.get('username'), message, this.user.get('room'), true, type);
	};

    CobraHandler.prototype.clientInfos = function(message) {
        console.log(message.user);
        this.userListView.users.push(new User({
            username: message.user,
            socketId: message.socketId
        }));
    };

	/*Utilisation de la classe cobra pour se connecter à la room*/
	CobraHandler.prototype.connection = function(user, room){
		this.roomName = room;
		this.user.set('username', user);
		this.user.set('room', room);
		Cobra.prototype.connect.call(this, this.url);
	};

	CobraHandler.prototype.connectionCallback = function () {
        console.log(this.socket);
		this.socket.emit("clients", {user: this.user.get('username'), toAll: true});
		Cobra.prototype.joinRoom.call(this, this.user.get('room'));
	};

	CobraHandler.prototype.joinRoomCallback = function (roomName) {
		 // appel à l'API pour récupérer tous les messages de la room roomName
      var xhr = new XMLHttpRequest();
      xhr.open('GET', this.apiUrl + roomName, true);
      xhr.send(null);
    	(function(self) {
    		xhr.onreadystatechange = function() {
	        if (xhr.readyState == 4 && (xhr.status == 200 || xhr.status == 0)) {
	            console.log("complete");
	            var result = JSON.parse(xhr.response);
              if (result.Error == true) {
                console.log(result.Message);
                return ;
              }
              console.log(result);
                for (var i = 0; i < result.Events.length; i++) {
	               	var content = JSON.parse(result.Events[i].content);
                    var user = new User({
                        username: content.user,
                        socketId: content.socketId
                    });
                    console.log(content);
					self.messageListView.messages.push(new Message({
                        content: content.message,
                        user: user,
                        timestamp: result.Events[i].timestamp,
                        initialize: function() {
                            this.date = new Date(content.date);
                        }
                    }));

	               	/*var date = new Date(result.Events[i].timestamp);
	               	var messageElement = "<br>" + date.toLocaleTimeString() +
	               		' ' + content.user + " : " + content.message;
	               	displayList.html(messageElement);*/
                    //self.userListView.users.push(user);
	            }
	        }
     	}
    	})(this);

        this.socket.emit('message', { user: this.user.get('username'), room: this.user.get('room'), message: "", date: new Date(), socketId: this.socket.id ,toAll: true, type: "connect"});
	};

	CobraHandler.prototype.messageReceivedCallback = function (message) {
		// Lors de l'arrivée dans une room donne la liste des utilisateurs contenus dans la room
		if(message.type == "infos"){
			for(var i = 0; i < message.clients.length; i++)
			{
				// Contient l'id du client
				var client = message.clients[i];
			}
			// Mon id attribué par la room
			this.socketId = message.socketId;
		}
		else if (message.message) {
		 // Message reçu, je le traite
            var user = new User({
                username: message.user
            });
            this.messageListView.messages.push(new Message({
                content: message.message,
                user: user,
                timestamp: message.timestamp,
                initialize: function() {
                    this.date = new Date();
                }
            }));
	 	}
	}

	CobraHandler.prototype.clientJoinedRoomCallback = function(data) {
        //this.users.push(data.id);
        //this.displayUsers();
		//console.log(JSON.stringify(data.clients));
	}

  CobraHandler.prototype.clientLeftRoomCallback = function(data){
      console.log("client " + data.id + " left room " + data.room);
  }

	return CobraHandler;
})(Cobra, DOMHelper, DOMObject, MessageListView, UserListView);

var CobraHelper = new CobraHandler();
