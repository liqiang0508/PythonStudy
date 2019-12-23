! function() {
	var layer = layui.layer,
		$ = layui.jquery,
		form = layui.form;
	$(".layui-btn").on("click", function(data) {
		var othis = $(this),
			type = othis.data('type');
		var id = othis.attr("id")
		console.log("id===" + id)
		Alert("Title", othis.text(), function(data) {
			console.log("data==" + data)
		})
	})
	layer.msg('Hello World');

	layui.use(['TestModule'], function() {
		console.log("加载TestModule")

		var test1 = layui.TestModule
		// console.log("add=="+test1.Add(5,6))
		// test1.hello()
		test1.Alert("lalala", "222", ["yes", "no", "hhu"], function(index) {
			alert("you click at--" + index)

		})
	});
}();

function Alert(title, str, call) {
	layer.open({
		title: title,
		content: str,
		cancel: function() {
			if (call) {
				call(0)
			}
		},
		yes: function(index) {
			if (call) {
				call(1)
			}
			layer.close(index);
		}
	})
}
