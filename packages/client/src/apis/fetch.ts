const url = 'http://localhost:9072/gateway'

const requestOptions = (body: object): RequestInit => ({
	method: 'POST',
	body: JSON.stringify(body),
    headers: new Headers({
        "Content-type": "application/json"
    })
})

export const _fetch = async (data: object) => {
    
    return await fetch(url, requestOptions(data)).then(
		(res) => res.ok && res.json()
	)
}

