# 下载
## [node安装](https://nodejs.org/zh-cn/download/)
https://nodejs.org/zh-cn/download/
## mock.data.server
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

## mock 的结果
```
{"name":"qirqq","id":8.29863,"age":1,"rich":44891.26424455259,"is_vip":true,"children":["abc","abc"],"wife":{"02":"winess"},"letter":["a","b","c","d"],"sons":["sonC","sonB",null,null,null,null,null,null],"target":45891.26424455259,"game":"145893160735","startTime":"2005/11/28 11:50:53","endTime":"02:12:52","now":"2018-01-19 15:00:00","avatar":"://dummyimage.com/100x100","email":"t.jfpgewfmjm@bgu.ml","address":"云南省 怒江傈僳族自治州 泸水县","zip":"821926","title":"花基做对"}
```

## 查看请求参数
  youthost/myPostData
  
# 配置
## 1.string
### 语法
   string|type|range
### type
   string的类型。 包括：lower,upper,number,symbol,aeiou
   #### lower  小写字母
   #### upper  小写字母
   #### number 小写字母
   #### symbol 小写字母
   #### aeiou  从列举的字符串中选择数据
### range
   min?,min？ 
   生成的字符串的长度范围
   如果只有min 的时候，只生成min个字符。
### 实例
`name:"string"`  生成结果： `{name:"RM!x"}` //随机长度的随机字符

`name : "string|5"`生成结果： `{name:"OK7Pj"}` //长度5 的随机字符

`name:"string|5,10"`  生成结果： `{name:"RM!x"}` //随机长度的随机字符

`name : "string|5"`生成结果： `{name:"RpkxIU&q"}` //长度5 到10的随机字符

`name:"string|number|5"`  生成结果： `{name:"42604"}` //长度为5 的数字

`name : "string|symbol|5"`生成结果： `{name:"#*)%^"}` //长度5 的符号字符串

## 2.number
### 语法
   type|range
### type
   number的类型。 包括：number,int,float
### range
   min?,min？ 
   生成的数字的数值范围
   
### 实例
`name:"number"`  生成结果： `{name:7479130858318088}` //随机大小的数字

`name : "number|5"`生成结果： `{name:5975769678873772}` //最小值为5 的数字

`name:"number|5,10"`  生成结果： `{name:6}` //[5,10]区间的数字

`name:"int|5,10"`  生成结果： `{name:9}` //[5,10]区间的整型


`name:"float|5,10"`  生成结果： `{name:8.2872832896}` //[5,10]区间的浮点数字

## 3.boolean
### 语法
   boolean|trueRate?
### trueRate
   值为true的概率
   
### 实例
`is_vip:"boolean"`  生成结果： `{is_vip:false}` 或者`{is_vip:false}` //true 和 false 的结果是随机的

`is_vip:"boolean|1"`  生成结果： `{is_vip:true}`//值永远为true 
`is_vip:"boolean|0"`  生成结果： `{is_vip:false}`//false 

`is_vip:"boolean|0.6"`  生成结果： `{is_vip:true}`//60% 的机会 结果为true,40% 的机会结果为false


## 4.reg
### 语法
   reg|regExp
### regExp
   正则表达式，根据正则表达式产生内容
   
### 实例
` phone: "reg|^18[0-9]{9}"`  生成结果：`"phone":"18134217475"`

` name: "reg|^abc[a-zA-Z0-9]+def$"`  生成结果：`"name":"abc7edef"`


## 5.date
### 语法
   dateType|format?
### dateType
   时间的类型，包括 
   
   date: 日期，如： 1971/06/28 
   
   time:  时间，如：07:39:48
   
   datetime  日期＋时间 ，如：1971/06/28 07:39:48
    
   now 当前的时间， 比如 2018-02-02 16:00:00
### format  
   时间的格式
#### 年 
    y或者yy   表示年份的后两位  比如  18 00
    yyyy  表示fullYear  bi 如  2018 2000
#### 月 
    M    个位数的月份 不在前面自动补全0 ，比如  7 表示7 月
    MM  个位数的月份在前面自动补全0 ， 比如 07
#### 日 
    d    个位数的日期，不在前面自动补全0 ，比如  2  表示2号
    dd  个位数的日期，在前面自动补全0 ， 比如 02 表示2 号
    
#### 上午 
    A  表示 am
#### 下午
    a 表示pm
#### 时
   H  个位数的时  不会在前面补全0 ， 比如 8  表示8点
   
   HH  个位数的时，会在前面自动补全0， 比如08 表示8点
#### 分 
    m  个位数的分，不会在前面补全0  比如 8 表示08 分
    mm 个位数的分，会在前面补全0，比如 08 表示08 分
#### 秒 
    s  个位数的秒，不会在前面补全0  比如 8 表示08 秒
    ss 个位数的秒，会在前面补全0，比如 08 表示08 秒
#### 时间戳
    T 表示 获取当前的时间戳
#### 间隔
    年月日 之间的间隔 和时分秒之间的间隔，可以为任意自负。比如：`endTime: "time|h&m&s"` 结果为 `"endTime":"3&50&36"`
   
### 实例
 ```
{
  startTime: "date|yyyy-MM-dd",
  endTime: "time|A HH:MM:SS",
  birthday: "datetime|T",
  now: "now|hour",
}
```
生成结果：
```
{
  "startTime":"1973-08-27",
  "endTime":"AM01:08:145",
  "birthday":"790058506718",
  "now":"2018-02-02 16:00:00"
}
```
## 6.img 图片
### 语法
  img|size,background?,text?
### size 图片的尺寸
  width x height
  比如 200x100
  注意，x  即小写字母x
### background， 
   16进制的颜色表示，比如 #4A7BF7 
### text 在图片中插入文本
### 实例
   `avatar: "img|200x300,#4A7BF7,ff00ff"`
   
   生成结果：
   
   ![image](https://dummyimage.com/200x300/4A7BF7&text=%E6%96%87%E5%AD%97)
   
    `avatar: "img|200x300,ff00ff"`
 生成结果(没有设置颜色，则默认为黑色的图片)：
   
   ![image](https://dummyimage.com/200x300/文字)

## 7.text 文本
### 语法
  type|range?
### type 文字的类型
  pararah : 段落
  
  sentence : 句子
  
  word : 词语
  
  title : 标题
  
  cpararah : 中文段落
  
  csentence: 中文句子
  
  cword ： 中文词语
  
  ctitle: 中文标题
  
### range 
   长度范围.
#### pararah|range  cpararah|range
    range 表示这段话包含多少句话，比如pararah|2，则这段话包含两句话  pararah|2,3 这段话包含2 到3局话。
#### sentence|range  title|range  csentence|range  ctitle|range  cword|range
   range 表示这个句子 或者标题 包含多少个单词 比如sentence|3 表明这句话包含3个单词，sentence|3,10 表明这句话包含3 到10 个单词

#### word|range
   range 表示这句话有多少个字母

### 实例
   `title: "ctitle|1,12"` 生成结果 `"title":"象千量年市增划"`
   
   `title: "word|3"` 生成结果 `"title":"vpm"`
   
## 8. name 名字 
### 语法
   type
   包括：
   name : firstName + lastName 
   first : firstName
   last  : lastName
   cname  : 姓 ＋ 名 
   cfirst : 姓
   clast : 名
### 实例
  `name: "name"` 生成结果 `"name":"Edward Allen"`
   
   `name: "first"` 生成结果 `"name":"Joseph"`
   
   `name: "last"` 生成结果 `"name":"Rodriguez"`
   
   `name: "cname"` 生成结果 `"name":"刘刚"`
   
   `name: "cfirst"` 生成结果 `"name":"刘"`
   
   `name: "clast"` 生成结果 `"name":"刚"`
## 8. email
### 实例
  `email: "email"` 生成结果 `"email":"d.qijlt@sicc.bi"`
## 9. address
### 语法
   fielname : "type"
#### type
   province 省 如 广东
   
   city 市   如广州
   
   county 区 如 天河 
   
   city1 省市 如 广东省广州市
   
   county1 省市区 广东省广州市天河区

### 实例
 `address: "county1"`  生成结果： `"address":"河北省 秦皇岛市 海港区"`
 
## 10.循环
### 语法
  fielName|foreach|number : rule
### fielName
   字段名
### foreach|number
   表示当前fielName字段的数值是 一个长度为number 的数组
   
### 实例
`"student|foreach|3": "string|upper|5"`  生成结果： `"student":["FXRNY","TQBRZ","CCWIU"]` // 当前学生字段产生长度为3 的数组，数组内容为长度为5 的大写字母


```
 "student|foreach|3": {
    name: "string|lower|5",
    id: "string|number|5",
    age: "increment|1",
 }
```
生成结果
```
"student":[{
    "name":"vniec",
    "id":"33629",
    "age":2
  },{
    "name":"rdisw",
    "id":"77488",
    "age":3
  },{
    "name":"rteiv",
     "id":"02847",
     "age":4
}]
```


