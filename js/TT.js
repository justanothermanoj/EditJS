// Termitext version 0.0.1

function output(data) {
    document.querySelector("#output").innerHTML += "<p>" + data + "</p>"
}

function clear() {
    var output_window = document.querySelector("#output");
    var all_p = output_window.querySelectorAll("p");

    for(var i = 0; i < all_p.length; i++) {
    	all_p[i].parentNode.removeChild(all_p[i]);
    }
}

function run(func) {

    var editor_input = document.querySelector("#editor_input");
    var output_window = document.querySelector("#output");
    var preScript = document.querySelector("#Main_Script");
    if (preScript) {
        output_window.removeChild(preScript);
    }
    var script = document.createElement('script');
    script.id = "Main_Script";
    script.innerHTML = " function main () { " + editor_input.value + " }";
    output_window.appendChild(script);

    document.getElementById("main_btn").onclick();

}
