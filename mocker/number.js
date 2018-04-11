var Base = require("./base");

class NumberMock extends Base {
    constructor(param) {
        super(param);
        this.type = "number";
    }

    createData() {
        var params = this.param.split("|");
        var range = this.getRange(params[1]);
        var numberTypes = {
            "number": "natural",
            "int": "integer",
            "float": "float"
        }
        var numberType = numberTypes[params[0]] || "integer";
        var data = "";
        try {
            switch (params.length) {
                case 1:
                    {
                        data = this.mock("@" + numberType + "()")
                    }
                    break;
                case 2:
                    {
                        if (range.max) {
                            data = this.mock("@" + numberType + "(" + range.min + "," + range.max + ")")
                        } else {
                            data = this.mock("@" + numberType + "(" + range.min + ")")
                        }
                    }
                    break;
            }
        } catch (error) {
            data = this.mock("@integer()");
        }
        return data;
    }
}

module.exports = NumberMock;