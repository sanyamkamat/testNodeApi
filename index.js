var http = require("http");
var url = require("url");
var Youtube = require("youtube-api");
var output = "";

Youtube.authenticate({
    type: "oauth",
    token: AUTH_TOKEN
});

var server = http.createServer(function(req,res){
    var url_parts = url.parse(req.url, true);
    var query = url_parts.query;
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
                output+="<p>Video Link: <a href='https://www.youtube.com/watch?v="+element.id.videoId+"'>"+element.snippet.title+"</a></p>";
                output+="<p>Thumbnails:<br><img src='"+element.snippet.thumbnails.default.url+"' /></p><hr>";
                //console.log(data);
            });
            res.end(output);
        }
    });
});

server.listen(9000);
console.log("The server is running on http://localhost:9000");
