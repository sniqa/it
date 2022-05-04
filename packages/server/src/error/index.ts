export interface ErrorRes {
	errCode: number
	errMsg: string
}
export const MISSING_PARAMS: ErrorRes = {
	errCode: 1101,
	errMsg: 'MISSING_PARAMS',
}

export const PARAMS_ERROR: ErrorRes = {
	errCode: 1102,
	errMsg: 'PARAMS_ERROR',
}

export const USER_REPEAT: ErrorRes = {
	errCode: 1201,
	errMsg: 'USER_REPEAT',
}

export const USER_NOT_EXIST: ErrorRes = {
	errCode: 1202,
	errMsg: 'USER_NOT_EXIST',
}

export const USER_LOGIN_PARAMS_ERROR: ErrorRes = {
	errCode: 1203,
	errMsg: 'USER_LOGIN_PARAMS_ERROR',
}

export const REQUIRED_JSON: ErrorRes = {
	errCode: 901,
	errMsg: 'REQUIRED_JSON',
}

export const UNKOWN_ERROR: ErrorRes = {
	errCode: 902,
	errMsg: 'UNKOWN_ERROR',
}

export const NET_TYPE_REPEAT: ErrorRes = {
	errCode: 903,
	errMsg: 'NET_TYPE_REPEAT',
}

export const DENIED: ErrorRes = {
	errCode: 904,
	errMsg: 'DENIED',
}
export const REPEAT: ErrorRes = {
	errCode: 906,
	errMsg: 'REPEAT',
}

export const EMPTY: ErrorRes = {
	errCode: 907,
	errMsg: 'EMPTY',
}

export const MODIFY_ERROR: ErrorRes = {
	errCode: 908,
	errMsg: 'MODIFY_ERROR',
}

export const IP_FORMAT_ERROR: ErrorRes = {
	errCode: 909,
	errMsg: 'IP_FORMAT_ERROR',
}

// 不在同一地址段not in the same address range
export const NOT_IN_THE_SAME_ADDRESS_RANGE: ErrorRes = {
	errCode: 909,
	errMsg: 'NOT_IN_THE_SAME_ADDRESS_RANGE',
}

// 不存在的网络类型
export const NET_TYPE_NOT_EXIST: ErrorRes = {
	errCode: 910,
	errMsg: 'NET_TYPE_NOT_EXIST',
}

// 不存在的ip地址
export const IP_ADDRESS_NOT_EXIST: ErrorRes = {
	errCode: 911,
	errMsg: 'IP_ADDRESS_NOT_EXIST',
}

interface TrueRes<T> {
	success: true
	data: T
}
export const trueRes = <T>(data: T): TrueRes<T> => {
	return {
		success: true,
		data,
	}
}

interface FlaseRes extends ErrorRes {
	success: false
}
export const falseRes = (errorTip: ErrorRes): FlaseRes => {
	return {
		success: false,
		...errorTip,
	}
}
