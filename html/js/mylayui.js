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
			upload = layui.upload,
			carousel = layui.carousel,
			tree = layui.tree,
			form = layui.form;
			

		// carousel.render({
		//    elem: '#test10'
		//    ,width: '1920px'
		//    ,height: '1080px'
		//    ,interval: 1000
		//  });

		//渲染
		var inst1 = tree.render({
		  elem: '#treeTest'  ,//绑定元素
		  accordion:true
		  ,data: [{
			title: '江西' //一级菜单
			,children: [{
			  title: '南昌' //二级菜单
			  ,children: [{
				title: '高新区' //三级菜单
				//…… //以此类推，可无限层级
			  }]
			}]
		  },{
			title: '陕西' //一级菜单
			,children: [{
			  title: '西安' //二级菜单
			}]
		  }],
		  click: function(obj){
				console.log(obj.data); //得到当前点击的节点数据
				console.log(obj.state); //得到当前节点的展开状态：open、close、normal
				console.log(obj.elem); //得到当前节点元素
				
				console.log(obj.data.children); //当前节点下是否有子节点
			  }
		});

		$(".test").on("click", function(data) {
			var othis = $(this),
				type = othis.data('type');
			var id = othis.attr("id")
			console.log("id===" + id,type)
			let btnText = othis.text()
			// console.log("id===" + btnText)

			layui.use(['TestModule'], function() {
				var test1 = layui.TestModule
				console.log("id2===" + btnText)
				test1.Alert("lalala", btnText, ["yes", "no", "LOL"], function(index) {
					console.log("you click at--" + index)

				})
				// layer.msg(btnText)
			});
		})
		// layer.msg('Hello World');
		//普通图片上传
		var uploadInst = upload.render({
			elem: '#test1',
			url: '/upload/',
			before: function(obj) {
				//预读本地文件示例，不支持ie8
				obj.preview(function(index, file, result) {
					$('#demo1').attr('src', result); //图片链接（base64）
				});
			},
			done: function(res) {
				//如果上传失败
				if (res.code > 0) {
					return layer.msg('上传失败');
				}
				//上传成功
			},
			error: function() {
				//演示失败状态，并实现重传
				var demoText = $('#demoText');
				demoText.html('<span style="color: #FF5722;">上传失败</span> <a class="layui-btn layui-btn-xs demo-reload">重试</a>');
				demoText.find('.demo-reload').on('click', function() {
					uploadInst.upload();
				});
			}
		});

		var rate = layui.rate;
		//渲染
		var ins1 = rate.render({
			elem: '#rateTest', //绑定元素
			text: true,
			choose: function(value){
			   console.log("choose=="+value)
			  }
		});

		var table = layui.table;
		//展示已知数据
		var tableDatas = []
		for(var  i = 0;i<11;i++)
		{
			tableDatas.push({
					"id": "10001",
					"username": "杜甫",
					"email": "xianxin@layui.com",
					"sex": "男",
					"city": "浙江杭州",
					"sign": "人生恰似一场修行",
					"experience": "116",
					"ip": "192.168.0.8",
					"logins": "108",
					"joinTime": "2016-10-14"
				})
		}
		console.log(tableDatas)
		table.render({
			// width:640,
			toolbar: true,
			defaultToolbar: ['filter', 'print', 'exports', {
			    title: '提示' //标题
			    ,layEvent: 'LAYTABLE_TIPS' //事件名，用于 toolbar 事件中使用
			    ,icon: 'layui-icon-tips' //图标类名
			  }],
			elem: '#tabletest',
			cols: [
				[ //标题栏
					{
						field: 'id',
						title: 'ID',
						width: 80,
						sort: true
					}, {
						field: 'username',
						title: '用户名',
						edit: "text",
						width: 120
					}, {
						field: 'email',
						title: '邮箱',
						minWidth: 150
					}, {
						field: 'sign',
						title: '签名',
						minWidth: 160
					}, {
						field: 'sex',
						title: '性别',
						width: 80
					}, {
						field: 'city',
						title: '城市',
						width: 100
					}, {
						field: 'experience',
						title: '积分',
						width: 80,
						sort: true
					}, {
						field: 'ip',
						title: 'IP',
						width: 120
					}
				]
			],
			data: tableDatas
				//,skin: 'line' //表格风格
				,
			even: true
			//,page: true //是否显示分页
			//,limits: [5, 7, 10]
			//,limit: 5 //每页默认显示的数量
		});

		//监听单元格编辑
		table.on('edit(tabletest)', function(obj) {
			var value = obj.value //得到修改后的值
				,
				data = obj.data //得到所在行所有键值
				,
				field = obj.field; //得到字段
			layer.msg('[ID: ' + data.id + '] ' + field + ' 字段更改为：' + value);
		});
	}();
