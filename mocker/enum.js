var Base = require("./Base");

class BooleanMock extends Base {
    constructor(param) {
        super(param);
        this.type = "enum";
    }

    createData(rule) {
        var data = "";
        var params = this.param.split("|");
        var range = this.getRange(params[1]);
        range.min = Math.max(range.min, 1);
        var key = "mock|" + range.min;
        try {
            if (range.max) {
                key = "mock|" + range.min + "-" + range.max;

            }
            var data = this.mock({
                [key]: rule
            });
            data = data["mock"];
        } catch (error) {
            data = this.mock(rule)
        }
        return data;
    }
}

module.exports = BooleanMock;