layui.define(["layer"], function(exports) {
	//do something
	var obj = {
		hello: function() {
			console.log('TestModule----Hello');
		},
		Add: function(a, b) {
			return (a + b)
		},
		Alert: function(title, content, btns, call) {
			var obj = {
				content: content,
				title: title,
				btn: btns,
				yes: function(index, layero) {

					if (call) {
						call(0)
					}
					layer.close(index)
				}
			}
			if (btns.length >= 2) {

				for (let i = 1; i <= btns.length - 1; i++) {
					obj["btn" + (i + 1)] = function() {
						if (call) {
							call(i)
						}
					}
				}
			}
			// console.log(obj)
			layer.open(obj)
		}
	};
	exports('TestModule', obj);
});
