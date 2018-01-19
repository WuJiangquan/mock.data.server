var EnumType = require("./enum");
var NumberMock = require("./number");
var urllib = require('url');
var otherMock = require("./other");
var dateMock = require("./date");
var imgMock = require("./img");
var addressMock = require("./address");
var generators = {
    "string": require("./string"),
    "number": NumberMock,
    "int": NumberMock,
    "float": NumberMock,
    "boolean": require("./boolean"),
    "reg": require("./reg"),
    "time": dateMock,
    "date": dateMock,
    "datetime": dateMock,
    "tiemStamp": dateMock,
    "now": dateMock,
    "img": imgMock,
    "base64": imgMock,
    "name": otherMock,
    "clast": otherMock,
    "cfirst": otherMock,
    "last": otherMock,
    "first": otherMock,
    "cname": otherMock,
    "email": otherMock,
    "ip": otherMock,
    "guid": otherMock,
    "increment": otherMock,
    "paragraph": otherMock,
    "sentence": otherMock,
    "word": otherMock,
    "title": otherMock,
    "cparagraph": otherMock,
    "csentence": otherMock,
    "cword": otherMock,
    "ctitle": otherMock,
    "region": addressMock,
    "province": addressMock,
    "city": addressMock,
    "county": addressMock,
    "city1": addressMock,
    "county1": addressMock,
    "zip": addressMock,
}

var getGenerator = function(rule) {
    var Type = generators[rule.split("|")[0]];
    return new Type(rule);
};

var generatorData = function(req, model, data) {
    if ("function" == typeof model) {
        var params = urllib.parse(req.url, true)
        return model(params, data || "");
    }
    if ("object" == typeof model) {
        return createRandomData(req, model)
    }
    if ("string" == typeof model) {
        var generator = getGenerator(model);
        return generator.createData();
    }
}

//utile

var getRange = function(rage) {
    rage = rage || "";
    var ranges = rage.split(",");
    return {
        min: ranges[0] || 0,
        max: ranges[1] || null
    }
}

var generateRandomInRage = function(min, max) {
    min = parseInt(min);
    var times = min;
    if (max && max != min) {
        max = parseInt(max);
        var ramdom = Math.random();
        var powTime = (max + "").length;
        ramdom = parseInt(ramdom * Math.pow(10, powTime));
        times = ramdom % (max - min) + min;
    }
    return times;
}

var getRandomTimes = function(rule) {
    var params = rule.split("|");
    var range = getRange(params[1]);
    return generateRandomInRage(range.min, range.max);
}

var createIterationData = function(rule, model, req) {
    var result = [];
    var times = getRandomTimes(rule);
    for (var i = 0; i < times; i++) {
        var mockData = generatorData(req, model);
        result.push(mockData);
    }
    return result;
}

var getRandomDataFromArray = function(times, array) {
    var res = [];
    var len = "";
    for (var i = times; i > 0; i--) {
        len = array.length;
        var index = generateRandomInRage(1, len);
        var currentRandomItem = array[index];
        array.splice(index, 1);
        res.push(currentRandomItem)
    }
    return res;
}

var getDataInArray = function(rule, array) {
    if ("[object Array]" == Object.prototype.toString.call(array)) {
        var times = getRandomTimes(rule);
        return getRandomDataFromArray(times, array);
    }
    throw new Error("in 的枚举值必须是数组")
}

var createRandomData = function(req, model) {
    var data = {};

    for (var prop in model) {
        var rule = model[prop];
        if (/\|enum/.test(prop)) {
            var fieldName = prop.split("|")[0];
            rule = prop.replace(fieldName + "|", "")
            data[fieldName] = new EnumType(rule).createData(model[prop]);
        } else if (/\|foreach/.test(prop)) {
            var fieldName = prop.split("|")[0];
            rule = prop.replace(fieldName + "|", "")
            data[fieldName] = createIterationData(rule, model[prop], req);
        } else if (/\|in/.test(prop)) {
            var fieldName = prop.split("|")[0];
            rule = prop.replace(fieldName + "|", "");
            var array = Array.prototype.slice.call(model[prop]);
            data[fieldName] = getDataInArray(rule, array);
        } else if ("string" === typeof rule) {
            var generator = getGenerator(rule);
            data[prop] = generator.createData();
        } else {
            data[prop] = generatorData(req, rule, data)
        }
    }
    return data;
}

module.exports = function(req, model) {
    var data = ""
    try {
        data = createRandomData(req, model)
    } catch (error) {
        console.log(error)
        data = ""
    };
    return data;
}