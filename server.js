var http = require('http');
var urllib = require('url');
var controller = require("./controller")

var jsonp = function(request, responseData) {

    var response = responseData;
    var params = urllib.parse(request.url, true);
    if (params.query && params.query.callback && !/\[404\]action is not exist/.test(responseData)) {
        response = params.query.callback + "(" + responseData + ")"
    }
    return response
}



var server = http.createServer(function(request, response) {
    var promise = controller.getResponseData(request, request.url, response, function(res, responseData) {
        var data = JSON.stringify(responseData);
        data = jsonp(request, data);
        data = data.replace("http", "");
        res.end(data)

    })

})

server.listen(80, function(err) {
    if (err) {
        throw err;
    }
    console.log("server runing on 80 port")
});