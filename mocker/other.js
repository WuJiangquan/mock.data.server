var Base = require("./base");

class OtherMock extends Base {
    constructor(param) {
        super(param);
        this.type = "boolean";
    }

    createData() {
        var data = "";
        try {
            var params = this.param.split("|");
            var method = params[0];
            if (params[1]) {
                data = this.mock("@" + method + "(" + params[1] + ")");
            } else {
                data = this.mock("@" + method);
            }

        } catch (error) {
            data = ""
        }
        return data;
    }
}

module.exports = OtherMock;