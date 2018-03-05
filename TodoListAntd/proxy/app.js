var express = require('express');
var bodyParser = require('body-parser');
var app = express();

app.use(express.static("public"));
app.use(bodyParser.json({ limit: '1mb' }));  //body-parser 解析json格式数据
app.use(bodyParser.urlencoded({            //此项必须在 bodyParser.json 下面,为参数编码
    extended: true
}));

var server = app.listen(3000, "127.0.0.1", function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);
});

app.get('/', function (req, res) {
    res.send('Hello World!');
});


var tasks = [{
    id: 0,
    name: "预置任务",
    completed: false
}];

var id = tasks.length;
app.post('/api/addTask', function (req, res) {
    console.log(req.body);

    var task = {
        id: id++,
        name: req.body.task_name,
        completed: false
    }

    res.send(JSON.stringify(task));
});

app.get('/api/listTasks', function (req, res) {
    res.send(JSON.stringify(tasks));
});

app.get('/api/test', function (req, res) {
    res.send(JSON.stringify({
        test: "test"
    }));
});