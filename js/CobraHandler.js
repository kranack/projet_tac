/*Mise à jour des fonctionalités via les données reçues par cobra*/
"use strict";

Array.prototype.contains = function(v) {
    for(var i = 0; i < this.length; i++) {
        if(this[i] === v) {
			return true;
		}
    }
    return false;
};

function messageInitialize(content) {
	this.date = new Date(content.date).toLocaleString();
}

var CobraHandler = (function(Cobra, DOMHelper, DOMObject, MessageListView, UserListView, ListeCourseView){

	function CobraHandler() {
		this.url = "http://cobra-framework.com:8080";
		this.apiUrl = "http://cobra-framework.com:3000/api/events/";
		this.socketId = null;
		this.user = new User();
		this.users = [];

        // Vues
        this.messageListView = new MessageListView();
        this.userListView = new UserListView();
        this.courseListView = new ListeCourseView();
	};

	/*Héritage de Cobra*/
	CobraHandler.prototype = Cobra.prototype;
	CobraHandler.prototype.constructor = CobraHandler;

	CobraHandler.prototype.getLists = function() {
        this.joinRoom('_get_lists');
    };

	CobraHandler.prototype.sendAnEntry = function(message, type){
        Cobra.prototype.sendMessage.call(this, this.user.get('username'), message, this.user.get('room'), true, type);
	};

    CobraHandler.prototype.clientInfos = function(message) {
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
		this.socket.emit("clients", {user: this.user.get('username'), toAll: true});
		Cobra.prototype.joinRoom.call(this, this.user.get('room'));
	};

	CobraHandler.prototype.joinRoomCallback = function (roomName) {
	  // appel à l'API pour récupérer tous les messages de la room roomName
		var xhr = new XMLHttpRequest();
		xhr.open('GET', this.apiUrl + roomName, true);
		xhr.send(null);
		xhr.onreadystatechange = this.onReadyStateChangeCallback(xhr);

	};

	CobraHandler.prototype.onReadyStateChangeCallback = function(xhr) {
		if (xhr.readyState === 4 && (xhr.status === 200 || xhr.status === 0)) {
			var result = JSON.parse(xhr.response);
			if (result.Error === true) {
				return ;
			}

			for (var i = 0; i < result.Events.length; i++) {
				var content = JSON.parse(result.Events[i].content);
				var user = new User({
					username: content.user,
					socketId: content.socketId
				});
				if (content.type !== "connect") {
					this.messageListView.messages.push(new Message({
						content: content.message,
						user: user,
						timestamp: result.Events[i].timestamp,
						initialize: messageInitialize(content)
					}));
				}
			}
		}
	};

	CobraHandler.prototype.messageReceivedCallback = function (message) {
		// Lors de l'arrivée dans une room donne la liste des utilisateurs contenus dans la room
		if(message.type === "infos"){
            this.socket.emit('message', { user: this.user.get('username'), room: this.user.get('room'), message: "", date: new Date(), socketId: this.socket.id ,toAll: true, type: "connect"});
			for(var i = 0; i < message.clients.length; i++)
			{
				// Contient l'id du client
                this.userListView.users.push(
                    new User({
                        username: '',
                        socketId: message.clients[i]
                    })
                );
			}
			// Mon id attribué par la room
			this.socketId = message.socketId;
		}
		else if (message.message) {
		 // Message reçu, je le traite
            var user = new User({
                username: message.user,
                socketId: message.socketId
            });
            this.messageListView.messages.push(new Message({
                content: message.message,
                user: user,
                timestamp: message.timestamp,
                initialize: function() {
                    this.date = new Date().toLocaleString();
                }
            }));
	 	}
	};

	CobraHandler.prototype.clientJoinedRoomCallback = function(data) {
        this.users.push(new User({
			socketId: data.id
		}));
	};

  CobraHandler.prototype.clientLeftRoomCallback = function(){
	  //
  };

	return CobraHandler;
})(Cobra, DOMHelper, DOMObject, MessageListView, UserListView, ListeCourseView);

var CobraHelper = new CobraHandler();
