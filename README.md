# 下载
`git clone https://github.com/WuJiangquan/mock.data.server.git`
# 安装
`cd mock.data.server`
`npm install`
# 启动
`sudo npm run start`  //管理员权限
# 使用
## 绑定host
   `youapihost.com  127.0.0.1`
## 定义规则
   ```
   module.exports = {
    "/api/activity": {
        name: "string|qwertyuio|5",
        id: "float|5,10",
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
   ```
## 访问
   youthost/api/activity
