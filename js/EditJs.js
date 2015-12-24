// Termitext version 0.0.1

(function() {
    function insertInto(str, input) {
        var val = input.value,
            s = input.selectionStart,
            e = input.selectionEnd;
        input.value = val.slice(0, e) + str + val.slice(e);
        if (e == s) input.selectionStart += str.length - 1;
        input.selectionEnd = e + str.length - 1;
    }
    var closures = {
        40: ')',
        91: ']',
        123: '}',
        34: '"',
        39: "'"
    };
    $("#editor_input").keypress(function(e) {
        if (c = closures[e.which]) insertInto(c, this);
    });
})();


/* ---- add own snippets ----

just add another object property in the snippets 'You snippet keyword' : "Your snippet code"

*/

snippets = {
    'for': "for (var i = 0; i < array.length; i++)  {\n\tarray[i];\n}",
    'function': "function function_name(args)  {\n\toutput('Hello ! I am manoj');\n}",
    'console.log': "console.log('manoj');",
    'array': "[item1, item2, item3];"
}

// converting snippets keyword to array for textcomplete processing
function identifiers() {
    var array = [];

    var i = 0;

    for (var name in snippets) {
        array[i] = name;
        i++;
    }

    return array;
}



$('textarea').textcomplete([{
    identifiers: identifiers(),
    match: /\B:(\w*)$/,
    search: function(term, callback) {
        callback($.map(this.identifiers, function(identifier) {
            return identifier.indexOf(term) === 0 ? identifier : null;
        }));
    },
    index: 1,
    replace: function(identifier) {
        return snippets[identifier];
    }
}, {
    match: /(^|\b)(\w{1,})$/,
    search: function(term, callback) {
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
            'location',
            'input',
            'div',
            'p',
            'button',
            'img',
            'id',
            'className',
            'catch',
            'continue',
            'default',
            'delete',
            'do',
            'else',
            'for',
            'function',
            'if',
            'in',
            'instanceof',
            'new',
            'return',
            'switch',
            'this',
            'throw',
            'try',
            'typeof',
            'void',
            'while',
            'const',
            'width',
            'height'
        ];
        callback($.map(words, function(word) {
            return word.indexOf(term) === 0 ? word : null;
        }));
    },
    replace: function(word) {
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
window.console.log = function(message) {
    output(message);
    return base.apply(this, arguments);
};
