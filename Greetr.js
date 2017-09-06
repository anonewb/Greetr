// creating entire new Execution context for our library so all our declared vars are safe and we are only exposing global obj only what we want
// Therefore we are writing whole library inside "()" for safer code reason:tricking syntax parser
// And pass to it want we want access to from global EC. We want access to global variable i.e "window" and the jquery var viz either "jquery or $"
// Using IIFE that accepts global window obj and jq obj
// code inside () will be safe

(function(global, $) { 


	var Greetr = function(firstName, lastName, language) { 
		return new Greetr.init(firstName, lastName, language);  // "Greetr.init(firstName, lastName, language)" this is a function constructor
																//returning obj with new coz to avoid the user of lib to write new each time when he uses "G$()" instead of "new G$()"
	}

	Greetr.prototype = {}; // creating obj inside where we will put methods that i want to use inside my obj thats returned by my Greetr 

	// Now we are building a function constructor that builts an obj which gives 3 properties and sets its value 

	Greetr.init = function(firstName, lastName, language) {  // this is the actual function we are going to call

		// firstly setting up some default properties
		// building this obj viz going to be returened by Greetr functn

		var self = this; // to be safe
		self.firstName = firstName || '';
		self.lastName = lastName || '';
		self.language = language || 'en';

	}

	Greetr.init.prototype = Greetr.prototype;

	global.Greetr = global.G$ = Greetr; // Exposing Greetr to global obj so that we can use our own "G$" 


}(window, jQuery)); // invoking this function by passing window and jQuery/$ 