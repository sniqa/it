import * as echarts from 'echarts/core'
import {
	PieChart,
	// 系列类型的定义后缀都为 SeriesOption
	PieSeriesOption,
	// LineChart,
	LineSeriesOption,
} from 'echarts/charts'
import {
	TitleComponent,
	// 组件类型的定义后缀都为 ComponentOption
	TitleComponentOption,
	TooltipComponent,
	TooltipComponentOption,
	GridComponent,
	GridComponentOption,
	// 数据集组件
	DatasetComponent,
	DatasetComponentOption,
	// 内置数据转换器组件 (filter, sort)
	TransformComponent,
} from 'echarts/components'
import { LabelLayout, UniversalTransition } from 'echarts/features'
import { CanvasRenderer } from 'echarts/renderers'
import { use } from 'echarts/core'
import { useEffect, useRef } from 'react'

// 通过 ComposeOption 来组合出一个只有必须组件和图表的 Option 类型
type ECOption = echarts.ComposeOption<
	LineSeriesOption | TitleComponentOption | TooltipComponentOption | GridComponentOption | DatasetComponentOption
>

// 注册必须的组件
echarts.use([
	TitleComponent,
	TooltipComponent,
	GridComponent,
	DatasetComponent,
	TransformComponent,
	PieChart,
	LabelLayout,
	UniversalTransition,
	CanvasRenderer,
])

const option: ECOption = {
	// ...
}

const ECharts = () => {
	const ref = useRef<HTMLDivElement>(null)

	useEffect(() => {
		const myChart = echarts.init(ref.current as HTMLDivElement)

		myChart.setOption({
			title: {
				text: 'ECharts 入门示例',
			},
			tooltip: {},
			xAxis: {
				data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子'],
			},
			yAxis: {},
			series: [
				{
					name: '销量',
					type: 'pie',
					data: [5, 20, 36, 10, 10, 20],
				},
			],
		})

		return () => myChart.dispose()
	}, [])

	return <div ref={ref} className={`w-full h-full`}></div>
}

export default ECharts
