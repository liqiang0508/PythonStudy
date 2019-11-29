// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html
var HttpHelper = require("HttpHelper")
var VersionManager = require("VersionManager")
cc.Class({
    extends: cc.Component,

    properties: {
        label: {
            default: null,
            type: cc.Label
        },
        // foo: {
        //     // ATTRIBUTES:
        //     default: null,        // The default value will be used only when the component attaching
        //                           // to a node for the first time
        //     type: cc.SpriteFrame, // optional, default is typeof default
        //     serializable: true,   // optional, default is true
        // },
        // bar: {
        //     get () {
        //         return this._bar;
        //     },
        //     set (value) {
        //         this._bar = value;
        //     }
        // },
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        console.log("launchScene---start-",Ghotupdateurl);
      
        var self = this
        if (cc && cc.sys.isNative) {

            VersionManager.checkUpdate(Ghotupdateurl, function (code) {
                console.log("checkUpdate===", code)
                self.label.string = code
                if (code == 0) {
                    cc.director.loadScene("helloworld")
                }
                else
                {
                    //cc.director.loadScene("helloworld")
                }
            },function(progress){
                console.log("progress===", progress)
                self.label.string = progress
            })
           

        }
       
        // var path = jsb.fileUtils.getWritablePath() + "dummy_online.png"
        // // console.log("path===",path)
        // var data = jsb.fileUtils.getDataFromFile(path)
        // console.log("222",GgetDirByUrl("res/clubinfo.csb"))
        // console.log("data===",jsb.fileUtils.isFileExist(path),data)
        // jsb.fileUtils.createDirectory(jsb.fileUtils.getWritablePath()+"sada/a")
        // jsb.fileUtils.writeDataToFile(new Uint8Array(data), jsb.fileUtils.getWritablePath() + "/packageTemp/dummy_online3.png");
    },

    

    // update (dt) {},
});
