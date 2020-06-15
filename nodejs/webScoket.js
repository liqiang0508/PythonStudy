var WebSocketServer = require('ws').Server,
wss = new WebSocketServer({ port: 1010 });
wss.on('connection', function (ws) {
    console.log('client connected');
    ws.on('message', function (message) {
        var Person = require("./protohelper").Person;
//receive
        //console.log(message);
        var buf = new Buffer(message) //客户端序列化的strig 先转成buffer
        console.log(" receive  buf----",buf);
        var array = new Uint8Array(buf)  //buffer在转成Uint8Array
        var p1 = Person.Person.deserializeBinary(array);//pb解码
        console.log("p1 getName",p1.getName());
        console.log("p1 getId",p1.getId());
        console.log("p1 getEmail",p1.getEmail());


//send
       
        var p = new Person.Person();
        p.setName("Lee");
        p.setId(600);
        p.setEmail("497232807@qq.com");

        var data = p.serializeBinary();
        //console.log("data===",data);//Uint8Array
        var buff = new Buffer(data);//bufer
        console.log("buff==",buff);
        console.log(buff.toString());



        // var p1 = Person.Person.deserializeBinary(data);
        // console.log("p1--",p1.getName());
        // console.log("p1-- getId",p1.getId());
        // console.log("p1--getEmail",p1.getEmail());


//send is buffer tostring
        ws.send(buff.toString());
    });

    ws.on('close', function (message) {
        console.log("socket sever close");
    });

    ws.on('error', function (message) {
        console.log("socket sever error");
    });
});


console.log("websocket is run port 1010");