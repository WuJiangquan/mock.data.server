var Base = require("./base");


class TimeMock {
    generateNormalFormal(type, format) {
        if (format) {
            return format;
        }
        switch (type) {
            case "date":
                {
                    format = 'yyyy-MM-dd'
                }
                break;
            case "time":
                {
                    format = "HH:mm:ss"
                }
                break;
            default:
                {
                    format = "yyyy-MM-dd HH:mm:ss"
                }
        }
        return format;
    }
    createTime(mock, type, format) {
        format = this.generateNormalFormal(type, format);
        return mock('@' + type + '(' + format + ")");
    }
}

class DateMock extends Base {
    constructor(param) {
        super(param);
        this.type = "date";
    }

    createData() {
        var data = "";
        var mock = new TimeMock();
        try {
            var params = this.param.split("|");
            data = mock.createTime(this.mock, params[0], params[1]);
        } catch (error) {
            data = this.mock('@datetime(T)');
        }
        return data;
    }
}

module.exports = DateMock;