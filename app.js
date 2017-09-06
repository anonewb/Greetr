var g = G$('john', 'doe'); //returns object like jquery
//	g.greet(); // o/p: Hello john!
//	g.greet().greet(true); // o/p: Greetings Formal john!
							// "g.greet()" returns "this" viz pointing to g which then "g.greet(true)" is invoked
g.greet().setLang('es').greet(true); // o/p: Saludos Formal john!							
//	g.greet().setLang('japanese').greet(true); // will show our error 