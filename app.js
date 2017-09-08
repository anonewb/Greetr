//// gets a new object (the architecture allows us to not have to use the 'new' keyword here)
var g = G$('John', 'Doe'); //returns object like jquery
//	g.greet(); // o/p: Hello john!
//	g.greet().greet(true); // o/p: Greetings Formal john!
							// "g.greet()" returns "this" viz pointing to g which then "g.greet(true)" is invoked
//	g.greet().setLang('es').greet(true); // o/p: Saludos Formal john!							
//	g.greet().setLang('japanese').greet(true); // will show our error 
//// use our chainable methods
g.greet().setLang('es').greet(true).log();

//// lets use our object on the click of the login button
$('#login').click(function() {

	//// create a new 'Greetr' object (lets pretend we know the name from the login)
	var loginGrtr = G$('John', 'Doe');

	//// hide the login on the screen
	$('#logindiv').hide();

	//// fire off an HTML greeting, passing the '#greeting' as the selector and the chosen lang, and log the welcome as well
	loginGrtr.setLang($('#lang').val()).HTMLGreeting('#greeting', true).log();
});