function add(a,b)
{
	return (a+b);
}

function BtnAddClick(btn,call)
{
	btn.click(call)
}


$(function(){
	console.log(add(100,2),$("#1"))
	BtnAddClick($(".btn"),function(sender){
		console.log(sender,sender.target.textContent);
		alert(sender.target.textContent)
	})

	$('#ex1').slider({
		formatter: function(value) {
			console.log('Current value: ' + value);
			$(".progress-bar").css("width",parseInt(value/100*100)+"%");
			return 'Current value: ' + value;
		}

	})

});

