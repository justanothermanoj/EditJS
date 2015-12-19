// Termitext version 0.0.1

$('textarea').textcomplete([{
    match: /(^|\b)(\w{2,})$/,
    search: function (term, callback) {
        var words = [
            'for',
            'console',
            'alert',
            'output',
            'clear',
            'document',
            'createElement',
            'function',
            'var',
            'log',
            'appendChild',
            'getElementById',
            'window',
            'innerHTML',
            'Array',
            'addEventListener',
            'Attr',
            'Boolean',
            'break',
            'callback',
            'case',
            'localStorage',
            'location'
        ];
        callback($.map(words, function (word) {
            return word.indexOf(term) === 0 ? word : null;
        }));
    },
    replace: function (word) {
        return word;
    }
}]);

function output(data) {
    document.querySelector("#output").innerHTML += "<p>" + data + "</p>"
}

function clear() {
    var output_window = document.querySelector("#output");
    var parent = output_window.parentNode;
    parent.removeChild(output_window);
    var new_window = document.createElement("div");
    new_window.id = 'output';
    new_window.className = "full_height full_width";
    parent.appendChild(new_window);
}

function run(func) {

    var editor_input = document.querySelector("#editor_input");
    var main_window = document.querySelector("#Main_Window");
    var preScript = document.querySelector("#Main_Script");
    if (preScript) {
        main_window.removeChild(preScript);
    }
    var script = document.createElement('script');
    script.id = "Main_Script";
    script.innerHTML = " function main () { clear(); " + editor_input.value + " }";
    main_window.appendChild(script);

    document.getElementById("main_btn").onclick();

}

var base = window.console.log;
window.console.log = function (message) {
    output(message);
    return base.apply(this, arguments);
};