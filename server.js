var http = require('http');
var urllib = require('url');
var controller = require("./controller")
var fs = require("fs");
var path = require("path");
var storePath = path.resolve(process.cwd(), "./requestData.json");
var jsonp = function(request, responseData) {

    var response = responseData;
    var params = urllib.parse(request.url, true);
    if (params.query && params.query.callback && !/\[404\]action is not exist/.test(responseData)) {
        response = params.query.callback + "(" + responseData + ")"
    }
    return response
}


var storeRequest = function(req) {
    var params = urllib.parse(req.url, true).query;

    var param = "string" == typeof params ? params : JSON.stringify(params);
    fs.writeFile(storePath, param, (err) => {
        if (err) throw err;
        console.log('The file has been saved!');
    });
}


var server = http.createServer(function(request, response) {
    var action = request.url.split("?")[0].split("#")[0];
    if ("/myPostData" === action) {
        var res = fs.readFileSync(storePath);
        response.end(res)
    } else {
        storeRequest(request);
        controller.getResponseData(request, request.url, response, function(res, responseData) {
            var data = JSON.stringify(responseData);
            data = jsonp(request, data);
            data = data.replace("http", "");
            res.end(data)
        })
    }
})

server.listen(80, function(err) {
    if (err) {
        throw err;
    }
    console.log("server runing on 80 port")
});