
export const fetchFiles = async (filesPath: string[]) => {

    return Promise.all(filesPath.map(async filePath => {

        const res = await fetch(filePath).then(res =>  res.blob().then(res => res.text()))

        return res
    }))

}