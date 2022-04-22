const url = 'http://localhost:8081/upload'

const requestOptions = (body: any): RequestInit => ({
	method: 'POST',
	body,
	redirect: 'follow',
})

interface UploadRes {
	filepath: string
}

export const upload = async (files: FileList): Promise<UploadRes | Array<UploadRes>> => {
	const formData = new FormData()

	const fileLength = files.length

	for (let i = 0; i < fileLength; i++) {
		const file = files.item(i)
		file && formData.append('file', file)
	}

	return fetch(url, requestOptions(formData)).then((res) => res.ok && res.json())
}
