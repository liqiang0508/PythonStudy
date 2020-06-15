var WebSocketServer = require('ws').Server,
wss = new WebSocketServer({ port: 1010 });
wss.on('connection', function (ws) {
    console.log('client connected');
    ws.on('message', function (message) {
        var Person = require("./protohelper").Person;
//receive
        // console.log(JSON.stringify(message));
        var buf = new Buffer(message); //客户端序列化的strig 先转成buffer
        console.log(" receive=",buf);
        var array = new Uint8Array(buf)  //buffer在转成Uint8Array
        var p1 = Person.Person.deserializeBinary(array);//pb解码

        console.log("p1 getName",p1.getName());
        console.log("p1 getId",p1.getId());
        console.log("p1 getEmail",p1.getEmail());

        // var testBuf = new Buffer(['1a', "03", '62', '61', '72', '08', 'ef', 'bf', 'bd','02', '12', '06', '63', '6c', '69', '65', '6e','74']);

        // var Testp1 = Person.Person.deserializeBinary(testBuf);//pb解码
        
        // console.log("Testp1 getName",Testp1.getName());
        // console.log("Testp1 getId",Testp1.getId());
        // console.log("Testp1 getEmail",Testp1.getEmail());
//send
        var  personId = parseInt(p1.getId())+1;  
        var p = new Person.Person();
        p.setId("300");
        p.setName("Lee");
        p.setEmail("bar");

        var data = p.serializeBinary();//pb序列化是Uint8Array
       //  // console.log("data===",data);//Uint8Array
        var buff = new Buffer(data);//用Uint8Array生成bufer
        console.log("protobuf==",buff);
       //  console.log(buff.toString());
       // // console.log("JSON===", JSON.stringify(data))

      // ws.send(buff.toString());

        var Person = require("./person");
        var person =  Person.Person.create({"id":personId.toString(),"name":"Lee","email":"bar"});
        // console.log(person.id);
        // console.log(person.name);
        var bytes = Person.Person.encode(person).finish();
         console.log("protobufjs===",bytes);
         ws.send(bytes.toString());
        // var p1 = Person.Person.deserializeBinary(data);
        // console.log("p1--",p1.getName());
        // console.log("p1-- getId",p1.getId());
        // console.log("p1--getEmail",p1.getEmail());


//send is buffer tostring
       // ws.send(buff.toString());//发送buffer.tostring()
    });

    ws.on('close', function (message) {
        console.log("socket sever close");
    });

    ws.on('error', function (message) {
        console.log("socket sever error");
    });
});


console.log("websocket is run port 1010");