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
            var method = params[0];
            var imgSize = params[1] || "";
            var sizes = imgSize.split(",");
            if ("base64" == method) {
                data = this.Random.dataImage.apply(this.Random, sizes);
            } else {
                data = this.Random.image.apply(this.Random, sizes);
            }

        } catch (error) {
            data = this.Random.image("100x100");
        }
        return data;
    }
}

module.exports = BooleanMock;