export default function(dateLabels, studentsData, teachersData) {
	return {
		color: ["#2f4554", "#b1063a"],
		tooltip: {
			trigger: "axis",
			axisPointer: {
				type: "shadow",
			},
		},
		legend: {
			data: ["Students", "Teachers"],
		},
		toolbox: {
			show: true,
			orient: "vertical",
			left: "right",
			top: "center",
			feature: {
				mark: { show: true },
				dataView: { show: true, readOnly: false },
				magicType: { show: true, type: ["line", "bar", "stack", "tiled"] },
				restore: { show: true },
				saveAsImage: { show: true },
			},
		},
		calculable: true,
		xAxis: [
			{
				type: "category",
				axisTick: { show: false },
				data: dateLabels,
			},
		],
		yAxis: [
			{
				type: "value",
			},
		],
		series: [
			{
				name: "Students",
				type: "bar",
				label: {
					normal: {
						show: true,
						position: "insideBottom",
						distance: 15,
						align: "left",
						verticalAlign: "middle",
						rotate: 90,
						fontSize: 16,
						rich: {
							name: {
								textBorderColor: "#fff",
							},
						},
					},
				},
				barGap: 0,
				data: studentsData,
			},
			{
				name: "Teachers",
				type: "bar",
				label: {
					normal: {
						show: true,
						position: "insideBottom",
						distance: 15,
						align: "left",
						verticalAlign: "middle",
						rotate: 90,
						fontSize: 16,
						rich: {
							name: {
								textBorderColor: "#fff",
							},
						},
					},
				},
				data: teachersData,
			},
		],
	};
}
