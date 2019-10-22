export default function(timeLabels, values) {
	return {
		tooltip: {
        trigger: 'axis'
    },
		xAxis: {
			type: "category",
			data: timeLabels,
		},
		yAxis: {
			type: "value",
		},
		series: [
			{
				data: values,
				type: "line",
			},
		],
	};
}
