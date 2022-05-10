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
import { wsSend, _fetch } from '../../apis'

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
    const pieChart = echarts.init(ref.current as HTMLDivElement)

    _fetch({ findIp: {}, findNetType: {} }).then((res) => {
      const { findIp, findNetType } = res

      if (findIp && findNetType) {
        const { success: findIpSuccess, data: findIpData } = findIp
        const { success: findNetTypeSuccess, data: findNetTypeData } = findNetType

        const { ipUnUsed, ipUsed, netTypeName } = findNetTypeData[0]

        console.log(netTypeName)

        wsSend({ getHostsOnline: { netTypeName } }).then((res: any) => {
          const { getHostsOnline } = res

          if (getHostsOnline) {
            const { success, data } = getHostsOnline

            console.log(getHostsOnline)

            pieChart.setOption({
              title: {
                text: 'ip地址分布情况',
              },
              series: [
                {
                  name: 'ip',
                  type: 'pie',
                  data: [
                    { value: ipUnUsed, name: '未使用' },
                    { value: ipUsed, name: '已使用' },
                    { value: ipUsed, name: '已使用' },
                    { value: data.length, name: '在线' },
                  ],
                },
              ],
            })
          }
        })
      }
    })

    // return () => pieChart.dispose()
  }, [])

  return <div ref={ref} className={`w-full h-full`}></div>
}

export default ECharts
