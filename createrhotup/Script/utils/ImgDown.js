
var ImgDown = {}

ImgDown.getNameByUrl = function(url){
    var strArry = url.split("/")
    return strArry[strArry.length-1];

}
ImgDown.loadImg = function(url,call){
    // console.log("loadImg====".url)
    var self = this;


    if (cc.sys.isNative) {
        var saveName = self.getNameByUrl(url);
        var path = jsb.fileUtils.getWritablePath() + saveName;

        if (jsb.fileUtils.isFileExist(path)) {//本地已经有了
            call(path);
            //console.log("already exist");
            return;
        }
        // 去下载
        var xhr = new XMLHttpRequest();
        xhr.responseType = 'arraybuffer';
        xhr.open("GET", url, true);
        // Special event
        xhr.onreadystatechange = function () {

            if (xhr.readyState === 4 && xhr.status >= 200) {

                var data = xhr.response
                jsb.fileUtils.writeDataToFile(new Uint8Array(data), path);
                call(path);

            }
            else {
                call(null);

            }
        }.bind(this);
        xhr.send();
    }
    else{

        cc.loader.load(url, function (err, tex) {
            // Use texture to create sprite frame
            if (err) {
                console.log("error");
            } else {
                console.log("done");
                call(tex)
                //  var spriteFrame = new cc.SpriteFrame(tex, cc.Rect(0, 0, tex.width, tex.height));
                //  self.sprite.getComponent(cc.Sprite).spriteFrame  = spriteFrame;
            }
        });

    }
    

}

ImgDown.loadLocalImg = function(path,call){

    cc.loader.load(path, function (err, tex) {
        if (err) {
            call(null)
        } else {
            var spriteFrame = new cc.SpriteFrame(tex, cc.Rect(0, 0, tex.width, tex.height));
            call(spriteFrame)
        }
    });

}


// module.exports = ImgDown;