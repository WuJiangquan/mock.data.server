var Base = require("./Base");

class BooleanMock extends Base {
    constructor(param) {
        super(param);
        this.type = "boolean";
    }

    createData() {
        var data = "";
        try {
            var params = this.param.split("|");
            var rate = (params[1] || 0.5) * 100;
            rate = parseInt(rate);
            var random = Math.random() * 100;
            random = parseInt(random);
            data = random <= rate;
        } catch (error) {
            data = this.mock('@boolean()')
        }
        return data;
    }
}

module.exports = BooleanMock;