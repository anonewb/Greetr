// creating entire new Execution context for our library so all our declared vars are safe and we are only exposing global obj only what we want
// Therefore we are writing whole library inside "()" for safer code reason:tricking syntax parser
// And pass to it want we want access to from global EC. We want access to global variable i.e "window" and the jquery var viz either "jquery or $"
// Using IIFE that accepts global window obj and jq obj
// code inside () will be safe

;(function(global, $) {  // trick to avoid if other code didnt used ';' somewhere

	//// 'new' an abject
	var Greetr = function(firstName, lastName, language) { 
		return new Greetr.init(firstName, lastName, language);  // "Greetr.init(firstName, lastName, language)" this is a function constructor
																//returning obj with new coz to avoid the user of lib to write new each time when he uses "G$()" instead of "new G$()"
	}


	//below objects are not exposed to outside world untill we desire like --SearchFor:goto1
	//// hidden within the scope of the IIFE and never directly accessible
	var supportedLangs = ['en', 'es'];

	//// informal greetings
	var greetings = { //not using arrays coz we wanna ref them by name/value pairs by the name of the property
		en: 'Hello',
		es: 'Hola'
	};

	//// formal greetings
	var formalGreetings = {
		en: 'Greetings Formal',
		es: 'Saludos Formal'
	};

	//// logger messages
	var logMessages = { ///only for dev purpose
		en: 'Logged in',
		es: 'Inicio sesion'
	};

	// will we writing exposable *methods* inside this
	// imagine methods inside this Greetr.init fn
	// refer notes to understand deeply
	//// prototype holds methods (to save memory space)
	Greetr.prototype = { 

		//// 'this' refers to the calling object at execution time 
		fullName: function() {
			return this.firstName + ' ' + this.lastName;
		},

		validate: function() {
			//// check that is a valid language
			//// references the externally inaccessible 'supportLangs' within the closure
			if (supportedLangs.indexOf(this.language) === -1) {
				throw "Invalid language"
			}
		},

		//// retrive messages from object by referring to properties using [] syntax
		greeting: function() {
			return greetings[this.language] + ' ' + this.firstName + ' ' + this.lastName + '!';
		},

		formalGreeting: function() {
			return formalGreetings[this.language] + ' ' + this.firstName + ' ' + this.lastName + '!';
		},

		//// chainable methods return their own containing object
		greet: function(formal) { // to make chainable methods like jq
			var msg;

			//if undefined or null it will be coerced to 'false'
			if (formal) {
				msg = this.formalGreeting();
			}
			else {
				msg = this.greeting();
			}

			if (console) {
				console.log(msg);
			}

			// 'this' refers to the calling oj at execution time
			// makes the method chainable
			return this;
		},

		log: function() {
			if (console) {
				console.log(logMessages[this.language] + ': ' + this.fullName() );
			}

			return this; // makes it chainable
		},

		setLang: function(lang) {

			//// set the language
			this.language = lang;

			//// validate
			this.validate();

			//// make chainable
			return this;
		},

		HTMLGreeting: function(selector, formal) {
			if(!$) {
				throw 'jQuery not loaded';
			}

			if(!selector) {
				throw 'Missing jQuery selector';
			}
			
			//// determine the message
			var msg;
			if(formal) {
				msg = this.formalGreeting();
			}
			else {
				msg = this.greeting();
			}

			//// inject the message in the chosen place in the DOM
			$(selector).html(msg);

			//// make chainable
			return this;
			
		}



	}; // creating obj inside where we will put methods that i want to use inside my obj thats returned by my Greetr 

	// Now we are building a function constructor that builts an obj which gives 3 properties and sets its value 

	//// the actual object is created here, allowing us to 'new' an object without calling 'new'
	Greetr.init = function(firstName, lastName, language) {  // this is the actual function we are going to call

		// firstly setting up some default properties
		// building this obj viz going to be returened by Greetr functn

		var self = this; // to be safe
		self.firstName = firstName || '';
		self.lastName = lastName || '';
		self.language = language || 'en';

		self.validate();

	}

	//// trick borrowed from jQuery so we dont have to use the 'new' keyword
	Greetr.init.prototype = Greetr.prototype; // this makes it possible that Greetr.init have access to all the methods that are present in Greetr.prototype obj

	//// attach our Greetr to the global object, and provide a shorthand '$G' for ease our poor figures
	global.Greetr = global.G$ = Greetr; // Exposing Greetr to global obj so that we can use our own "G$" 
										// --here: goto1


}(window, jQuery)); // invoking this function by passing window and jQuery/$ 