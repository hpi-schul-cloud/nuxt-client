export default function(data) {
	return {
		tooltip: {
			trigger: "item",
			formatter: "{a} <br/>{b} : {c} ({d}%)",
		},
		calculable: true,
		legend: {
			orient: "vertical",
			x: "left",
			data: ["Active", "Inactive"],
		},
		series: [
			{
				type: "pie",
				name: "Students",
				avoidLabelOverlap: false,
				center: ["25%", "50%"],
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
				labelLine: {
					normal: {
						show: false,
					},
				},
				data: data[0],
			},
			{
				type: "pie",
				name: "Teachers",
				avoidLabelOverlap: false,
				radius: ["50%", "70%"],
				center: ["75%", "50%"],
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
				labelLine: {
					normal: {
						show: false,
					},
				},
				data: data[1],
			},
		],
	};
}
