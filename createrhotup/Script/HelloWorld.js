// var ImgDown = require("ImgDown");
cc.Class({
    extends: cc.Component,

    properties: {
        label: {
            default: null,
            type: cc.Label
        },
        sprite:{
            default: null,
            type: cc.Node
        },
        // defaults, set visually when attaching this script to the Canvas
        text: '9999999999999999!'
    },

    // use this for initialization
    onLoad: function () {
        this.label.string = "hello everybody"
        var a = "aa";
        console.log("onLoad----",a);
        
        if(cc.sys.isNative)
        {
            console.log("6666",jsb.fileUtils.getWritablePath());
        }
        
       
    },

    start:function(){
        var self = this;
      
        // var remoteUrl = "http://54.179.180.39:8080/CSLServer/img/dummy_online.png";
        // var s = remoteUrl.split("/")
        // ImgDown.loadImg(remoteUrl, function (path) {

        //     if (cc.sys.isNative) {
        //         if (path != null) {
        //             ImgDown.loadLocalImg(path, function (spriteFrame) {
        //                 if (spriteFrame != null) {
        //                     self.sprite.getComponent(cc.Sprite).spriteFrame = spriteFrame;
        //                 }

        //             })

        //         } else {
        //             console.log("error url ".remoteUrl);
        //         }
        //     }
        //     else {
        //         var spriteFrame = new cc.SpriteFrame(path, cc.Rect(0, 0, path.width, path.height));
        //         self.sprite.getComponent(cc.Sprite).spriteFrame = spriteFrame;
        //     }


        // });


       

    },
    // called every frame
    update: function (dt) {

    },
});
