Ghotupdateurl = "http://192.168.64.164:8080/static/configrelease"//热更新地址

GtempFolder = jsb.fileUtils.getWritablePath() + "packageTemp/"//热更新临时目录

GHotUpFolder = jsb.fileUtils.getWritablePath() + "package/"//热更新真实目录

GtempCfg= jsb.fileUtils.getWritablePath() + "config/appinfoiii.json"//包外配置
GIsArrContain = function(arr,n)
{
    if(arr.indexOf(n)>-1)
    {
        return true;
    }
    else{
        return false;
    }
}

GgetDataFromFile = function(path)
{
    if(cc.sys.isNative)
    {
        var data = jsb.fileUtils.getDataFromFile(path)
        return data
    }
    return null
}   

GwriteStringToFile = function(str,path)
{
    if(cc.sys.isNative)
    {
        jsb.fileUtils.writeStringToFile(str, path);
    }
} 

GwriteDataToFile = function(data,path)
{
    if(cc.sys.isNative)
    {
        jsb.fileUtils.writeDataToFile(new Uint8Array(data), path);
    }
} 

//创建目录
GcreateDir = function(path)
{
    if(cc.sys.isNative)
    {   
        jsb.fileUtils.createDirectory(path);
    }
}

GgetDirByUrl = function(url)
{
    var arr = url.split("/")
    // console.log("GgetDirByUrl==",arr)
    var path = ""
    if(arr.length>1)
    {
        for(var i =0;i<arr.length-1;i++)
        {   
            var tempdir = arr[i]
            if(i==0)
            {
                path = tempdir

            }
            else
            {
                path = path+"/"+tempdir
            }
        }
        
    }
    else
    {
        path = arr[0]
    }
    path = path+"/"
    return path
}

//下载文件
GDownFile = function(url,call)
{
    if (cc.sys.isNative) {
        
        var xhr = new XMLHttpRequest();
        xhr.responseType = 'arraybuffer';
        xhr.open("GET", url, true);
        // Special event
        xhr.onreadystatechange = function () {

            if (xhr.readyState === 4 && xhr.status >= 200) {

                var data = xhr.response
                call(data);

            }
            else {
                call(null);

            }
        }.bind(this);
        xhr.send();
    }

}