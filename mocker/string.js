var Base = require("./Base");

class StringMock extends Base {
    constructor(params) {
        super(params);
        this.type = "string";
    }

    createData() {
        var params = this.param.split("|");
        var range = ""
        var data = "";
        var typeReg = /lower|upper|number|symbol|aeiou/
        try {
            switch (params.length) {
                case 1:
                    { //string
                        data = this.mock("@string()")
                    }
                    break;
                case 2:
                    {
                        range = this.getRange(params[1]);
                        if (typeReg.test(params[1])) {
                            data = this.Random.string(params[1])
                        } else {
                            if (range.max) {
                                data = this.mock("@string(" + range.min + "," + range.max + ")")
                            } else {
                                data = this.mock("@string(" + range.min + ")")
                            }
                        }
                    }
                    break;
                case 3:
                    {
                        range = this.getRange(params[2]);
                        if (range.max) {
                            data = this.Random.string(params[1], range.min, range.max)
                        } else {
                            data = this.Random.string(params[1], range.min)
                        }
                    }
                    break;
            }
        } catch (error) {
            data = this.mock("@string()");
        }
        return data;
    }
}

module.exports = StringMock;