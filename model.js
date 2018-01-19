module.exports = {
    "/api/activity": {
        name: "string|symbol|5",
        id: "number|5,10",
        age: "increment|1",
        rich: "float|,100000",
        is_vip: "boolean",
        "children|foreach|2": function() {
            return "abc"
        },
        "wife|enum|1": {
            "01": "jon",
            "02": "winess"
        },
        "device|fixed": "andoid",
        "letter|enum|1,2": ["a", "b", "c", "d"],
        "sons|in|1,10": ["sonA", "sonB", "sonC"],
        "target": function(params, context) {
            return context.rich + 1000;
        },
        game: "reg|^1[0-9]{11}",
        startTime: "datetime|yyyy/MM/dd HH:mm:ss",
        endTime: "time",
        now: "now|hour",
        avatar: "base64|200x300,ff00ff",
        email: "email",
        address: "county1",
        zip: "zip",
        title: "ctitle|1,12"
    }
}