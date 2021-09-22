export default function (timeLabels, values) {
	return {
		color: ["#9e292b"],
		tooltip: {
			trigger: "axis",
		},
		xAxis: {
			type: "category",
			data: timeLabels,
		},
		yAxis: {
			type: "value",
			axisLabel: {
				formatter: "{value} ms",
			},
		},
		series: [
			{
				data: values,
				type: "line",
			},
		],
	};
}
