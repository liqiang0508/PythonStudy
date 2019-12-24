layui.config({
			dir: '../layui-v2.5.5/layui/' //layui.js 所在路径（注意，如果是script单独引入layui.js，无需设定该参数。），一般情况下可以无视
				,
			version: false //一般用于更新模块缓存，默认不开启。设为true即让浏览器不缓存。也可以设为一个固定的值，如：201610
				,
			debug: false //用于开启调试模式，默认false，如果设为true，则JS模块的节点会保留在页面
				,
			base: 'js/module/' //设定扩展的Layui模块的所在目录，一般用于外部模块扩展
		})
		
! function() {
	var layer = layui.layer,
		$ = layui.jquery,
		form = layui.form;
	$(".layui-btn").on("click", function(data) {
		var othis = $(this),
		type = othis.data('type');
		var id = othis.attr("id")
		// console.log("id===" + id)
		layui.use(['TestModule'], function() {
			var test1 = layui.TestModule
			test1.Alert("lalala", othis.text(), ["yes","no","LOL"], function(index) {
				console.log("you click at--" + index)
		
			})
		});
	})
	layer.msg('Hello World');

	
}();

// function Alert(title, str, call) {
// 	layer.open({
// 		title: title,
// 		content: str,
// 		cancel: function() {
// 			if (call) {
// 				call(0)
// 			}
// 		},
// 		yes: function(index) {
// 			if (call) {
// 				call(1)
// 			}
// 			layer.close(index);
// 		}
// 	})
// }
