var Base = require("./Base");

class AddressMock extends Base {
    constructor(param) {
        super(param);
        this.type = "boolean";
    }

    createData() {
        var data = "";
        try {
            var params = this.param.split("|");
            var method = params[0];
            if (/1$/.test(method)) {
                method = method.replace(/1$/, "");
                data = this.mock("@" + method + "(true)");
            } else {
                data = this.mock("@" + method);
            }

        } catch (error) {
            data = this.mock('@county()')
        }
        return data;
    }
}

module.exports = AddressMock;