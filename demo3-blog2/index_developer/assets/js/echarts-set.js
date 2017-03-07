(function(){
	var statsEch=document.getElementById('stats-echarts');
	var myChart = echarts.init(statsEch);
	var idx = 1;
	var option = {
		timeline : {
			data : [
				'2013-01-01', '2013-02-01', '2013-03-01', '2013-04-01', '2013-05-01',
				{ name:'2013-06-01', symbol:'emptyStar6', symbolSize:8 },
				'2013-07-01', '2013-08-01', '2013-09-01', '2013-10-01', '2013-11-01',
				{ name:'2013-12-01', symbol:'star6', symbolSize:8 }
			],
			label : {
				formatter : function(s) {
					return s.slice(0, 7);
				}
			}
		},
		options : [
			{
				tooltip : {
					trigger: 'item',
					formatter: "{c} ({d}%)"
				},
				toolbox: {
					show : true,
					feature : {
						mark : {show: true},
						magicType : {
							show: true, 
							type: ['pie', 'funnel'],
							option: {
								funnel: {
									x: '25%',
									width: '50%',
									funnelAlign: 'left',
									max: 1700
								}
							}
						},
						restore : {show: true},
						saveAsImage : {show: true}
					}
				},
				series : [
					{
						type:'pie',
						center: ['50%', '45%'],
						radius: '50%',
						data:[
							{value: idx * 128 + 80,  name:'华科'},
							{value: idx * 64  + 160,  name:'武大'},
							{value: idx * 32  + 320,  name:'华师'},
							{value: idx * 16  + 640,  name:'其他'}
						]
					}
				]
			},
			{
				series : [
					{
						type:'pie',
						data:[
							{value: idx * 128 + 280,  name:'华科'},
							{value: idx * 64  + 10,  name:'武大'},
							{value: idx * 32  + 400,  name:'华师'},
							{value: idx * 16  + 240,  name:'其他'}
						]
					}
				]
			},
			{
				series : [
					{
						
						type:'pie',
						data:[
							{value: idx * 128 + 180,  name:'华科'},
							{value: idx * 64  + 160,  name:'武大'},
							{value: idx * 32  + 200,  name:'华师'},
							{value: idx * 16  + 300,  name:'其他'}
						]
					}
				]
			},
			{
				series : [
					{
						
						type:'pie',
						data:[
							{value: idx * 128 + 80,  name:'华科'},
							{value: idx * 64  + 100,  name:'武大'},
							{value: idx * 32  + 300,  name:'华师'},
							{value: idx * 16  + 220,  name:'其他'}
						]
					}
				]
			},
			{
				series : [
					{
						
						type:'pie',
						data:[
							{value: idx * 128 + 600,  name:'华科'},
							{value: idx * 64  + 160,  name:'武大'},
							{value: idx * 32  + 320,  name:'华师'},
							{value: idx * 16  + 240,  name:'其他'}
						]
					}
				]
			},
			{
				series : [
					{
						
						type:'pie',
						data:[
							{value: idx * 128 + 80,  name:'华科'},
							{value: idx * 64  + 160,  name:'武大'},
							{value: idx * 32  + 520,  name:'华师'},
							{value: idx * 16  + 240,  name:'其他'}
						]
					}
				]
			},
			{
				series : [
					{
						
						type:'pie',
						data:[
							{value: idx * 128 + 80,  name:'华科'},
							{value: idx * 64  + 360,  name:'武大'},
							{value: idx * 32  + 120,  name:'华师'},
							{value: idx * 16  + 540,  name:'其他'}
						]
					}
				]
			},
			{
				series : [
					{
						
						type:'pie',
						data:[
							{value: idx * 128 + 180,  name:'华科'},
							{value: idx * 64  + 260,  name:'武大'},
							{value: idx * 32  + 320,  name:'华师'},
							{value: idx * 16  + 440,  name:'其他'}
						]
					}
				]
			},
			{
				series : [
					{
						
						type:'pie',
						data:[
							{value: idx * 128 + 280,  name:'华科'},
							{value: idx * 64  + 260,  name:'武大'},
							{value: idx * 32  + 120,  name:'华师'},
							{value: idx * 16  + 540,  name:'其他'}
						]
					}
				]
			},
			{
				series : [
					{
						
						type:'pie',
						data:[
							{value: idx * 128 + 300,  name:'华科'},
							{value: idx * 64  + 260,  name:'武大'},
							{value: idx * 32  + 120,  name:'华师'},
							{value: idx * 16  + 340,  name:'其他'}
						]
					}
				]
			},
			{
				series : [
					{
						
						type:'pie',
						data:[
							{value: idx * 128 + 500,  name:'华科'},
							{value: idx * 64  + 160,  name:'武大'},
							{value: idx * 32  + 420,  name:'华师'},
							{value: idx * 16  + 140,  name:'其他'}
						]
					}
				]
			},
			{
				series : [
					{
						
						type:'pie',
						data:[
							{value: idx * 128 + 80,  name:'华科'},
							{value: idx * 64  + 260,  name:'武大'},
							{value: idx * 32  + 520,  name:'华师'},
							{value: idx * 16  + 40,  name:'其他'}
						]
					}
				]
			}
		]
	};
	myChart.setOption(option);
	$(window).resize(function(){
		myChart = echarts.init(statsEch);
		myChart.setOption(option);
	});
})();
