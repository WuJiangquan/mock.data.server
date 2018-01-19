module.exports = {
    "/api/activity": {
        name: "cfirst",
        id: "string|number|5",
        age: "increment|1",
        rich: "float|,100000",
        is_vip: "boolean",
        "children|foreach|4,10": "string|lower|6",
        "wife|enum|1": {
            "01": "jon",
            "02": "winess"
        },
        "sons|in|1": ["sonA", "sonB", "sonC"],
        "func": function(params, context) {
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