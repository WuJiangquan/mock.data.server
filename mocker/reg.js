var Base = require("./base");

class BooleanMock extends Base {
    constructor(param) {
        super(param);
        this.type = "reg";
    }

    createData() {
        var data = "";
        try {
            var params = this.param.split("|");
            var regExp = new RegExp(params[1]);
            data = this.mock({
                "regexp": regExp
            })["regexp"];
        } catch (error) {
            data = "";
        }
        return data;
    }
}

module.exports = BooleanMock;