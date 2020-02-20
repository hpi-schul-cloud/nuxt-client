export default function(data) {
	return {
		color: ["#2f4554", "#b1063a"],
		tooltip: {
			trigger: "item",
			formatter: "{a} <br/>{b} : {c} ({d}%)",
		},
		legend: {
			orient: "vertical",
			left: "right",
			data: ["Teachers", "Students"],
		},
		series: [
			{
				name: "Roles",
				type: "pie",
				data: data,
				itemStyle: {
					emphasis: {
						shadowBlur: 10,
						shadowOffsetX: 0,
						shadowColor: "rgba(0, 0, 0, 0.5)",
					},
				},
				label: {
					normal: {
						show: true,
						position: "inner",
						formatter: "{d}%",
					},
					emphasis: {
						show: true,
						textStyle: {
							fontSize: "15",
							fontWeight: "bold",
						},
					},
				},
			},
		],
	};
}
