export const upload = (files: FileList) => {
	const f = fileListToFileArray(files).map((file) => {
		return new Promise((resolve) => {
			const reader = new FileReader()

			reader.readAsArrayBuffer(file)

			reader.onloadend = () => {
				return resolve(reader.result)
			}
		})
	})

	const formData = new FormData()
}

// 将FileList转为FileArray
const fileListToFileArray = (files: FileList): Array<File> => {
	const len = files.length

	let tempArray: Array<File> = []

	for (let i = 0; i < len; i++) {
		const file = files.item(i)
		file && tempArray.push()
	}

	return tempArray
}
