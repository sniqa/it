import { nanoid } from 'nanoid'

// 给对象数据加上一层id包装
export const objectWithId = (data: object) => ({ [nanoid()]: data })

// 给对象数据去掉id包装
const onlyOne = 0
export const objectWithoutId = (data: object) => {
	const [id, obj] = Object.entries(data)[onlyOne]

	return {
		id,
		data: obj,
	}
}

export {}
