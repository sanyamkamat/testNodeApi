var http = require("http");
var Youtube = require("youtube-api");
var output = "";

Youtube.authenticate({
    type: "oauth",
    token: AUTH_TOKEN
});

var server = http.createServer(function(req,res){
    Youtube.search.list({
        "q":"Node JS training",
        "part": "snippet"
    }, function (err, data) {
        if(err) {   
            res.end('<pre>'+JSON.stringify(err)+'</pre>');
        } else {
            //res.end('<pre>'+JSON.stringify(data)+'</pre>');
            data.items.forEach(function logArrayElements(element, index, array) {
                output+="<p>Title: "+element.snippet.title+"</p>";
                output+="<p>Description: "+element.snippet.description+"</p>";
                output+="<p>Thumbnails:<br><img src='"+element.snippet.thumbnails.default.url+"' /></p><hr>";
                //console.log(data);
            });
            res.end(output);
        }
    });
});

server.listen(9000);
console.log("The server is running on http://localhost:9000");
