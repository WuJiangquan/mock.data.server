var Mock = require("mockjs");

class BaseMock {
    constructor(param) {
        this.mock = Mock.mock;
        this.param = param;
        this.Random = Mock.Random;
    }
    getRange(rage) {
        rage = rage || "";
        var ranges = rage.split(",");
        return {
            min: ranges[0] || 0,
            max: ranges[1] || null
        }
    }

    createDate() {}
}


module.exports = BaseMock;