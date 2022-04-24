const imageUploadUrl = 'http://localhost:9073/upload'
const documentUploadUrl = 'http://localhost:9074/upload'

const requestOptions = (body: any): RequestInit => ({
	method: 'POST',
	body,
	redirect: 'follow',
})

interface UploadRes {
	filepath: string
}

const upload = async (
	url: string,
	files: FileList | Array<File>
): Promise<UploadRes | Array<UploadRes>> => {
	const formData = new FormData()

	const fileLength = files.length

	for (let i = 0; i < fileLength; i++) {
		const file = files[i]

		file && formData.append('file', file)
	}

	return fetch(url, requestOptions(formData)).then(
		(res) => res.ok && res.json()
	)
}

export const imageUpload = (files: FileList | Array<File>) =>
	upload(imageUploadUrl, files)

export const documentUpload = (files: FileList | Array<File>) =>
	upload(documentUploadUrl, files)
