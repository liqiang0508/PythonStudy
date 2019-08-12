



function showConfirm(title,contentstr, btnsinfo,callback){

	console.log("showTip--", Object.keys(btnsinfo).length)
	var _title = title==""?"提示":title
	

	var html = '<div class= "AlertLayer">\
	<div class="layerbg"></div>\
	<div class ="dialog d-flex flex-column">\
	<div class = "layerTitle"  style="margin-top: 5px">'+_title+'</div>\
	<div class ="layerContent    flex-grow-1 text-center d-flex flex-column justify-content-center" style="word-wrap:break-word; width: 100%;height: 90px;  border-top:1px solid #a1a1a1;border-bottom:1px solid #a1a1a1">\
	</div>\
	<div class="layerBtn d-flex  flex-row  justify-content-center"  style="margin-bottom: 5px;margin-top: 5px">\
	<button type="button"  value = 1  style="display:none; width: 80px" class="btn btnok btn-primary">ok</button>\
	<button type="button"  value = 0  style="display:none; width: 80px" class="btn btncancel btn-primary">cancel</button>\
	</div>\
	</div>\
	</div>'

	$("body").append(html)
	$(".btn").click(function(sender){
		//console.log(sender.targrt.value)
		close()
		if (callback)
		{
			callback(sender.target.value)
		}
		
	})
	$(".layerContent").text(contentstr)
	if(btnsinfo.hasOwnProperty(0))
	{
		var btnInfo = btnsinfo[0]
		$("button[value='0']").css({"display":"inline-block"})

		if (btnInfo.hasOwnProperty('btnText'))
		{
			$("button[value='0']").text(btnInfo['btnText'])
		}
		else
		{
			$("button[value='0']").text("No")
		}
	}
	if(btnsinfo.hasOwnProperty(1))
	{
		var btnInfo = btnsinfo[1]
		$("button[value='1']").css({"display":"inline-block"})
		if (btnInfo.hasOwnProperty('btnText'))
		{
			$("button[value='1']").text(btnInfo['btnText'])
		}
		else
		{
			$("button[value='1']").text("Yes")
		}
	}


	if(btnsinfo.length=2)
	{
		$("button[value='0']").css({"margin-left":"15px"})
	}
	
}

function close()
{
	console.log("close---")
	var html = $(".AlertLayer")
	if (html)
	{
		html.remove()

	}
}