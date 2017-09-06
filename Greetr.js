// creating entire new Execution context for our library so all our declared vars are safe and we are only exposing global obj only what we want
// Therefore we are writing whole library inside "()" for safer code reason:tricking syntax parser
// And pass to it want we want access to from global EC. We want access to global variable i.e "window" and the jquery var viz either "jquery or $"
// Using IIFE that accepts global window obj and jq obj
// code inside () will be safe

(function(global, $) { 



}(window, jQuery)); // invoking this function by passing window and jQuery/$ 