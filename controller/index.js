// var fs = require("fs")
var path = require('path');
var model = require("../model");
var mockData = require("../mocker/mockData");
var getAction = function(url) {
    return url.split("?")[0].split("#")[0];
}

var getModel = function(action) {

    var res = model[action];
    if (undefined === res) {
        throw new Error("404")
    }
    return res;
}


module.exports = {
    getResponseData: function(req, url, response, callback) {
        var action = getAction(url);
        try {
            var model = getModel(action)
            var data = mockData(req, model);
            response.writeHead(200, { 'Content-Type': 'text/plain;charset=UTF-8' });
            callback(response, data);
        } catch (e) {
            console.log(e)
            response.writeHead(404, { 'Content-Type': 'text/plain;charset=UTF-8' });
            callback(response, "[404]action is not exist,plz confirm that you had add model in controller/model.js or you didn't restart the server");
        }

    }
}