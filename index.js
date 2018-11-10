module.exports = async (token = '', query = {}, variables = {}) => {
	var res
	if (typeof fetch === 'undefined') {
		return {
			data: null,
			errors: [{
				message: 'Check compatibility in https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API'
			}]
		}
	}
	try {
		res = await fetch('https://api.github.com/graphql', {
			method: 'POST',
			body: JSON.stringify({
				query,
				variables
			}),
			headers: {
				Authorization: `Bearer ${token}`,
			},
		})
	} catch (error) {
		return {
			data: null,
			errors: [{
				message: error
			}]
		}
	}
	if (res.status !== 200) {
		return {
			data: null,
			errors: [{
				message: `Status code is ${res.status}`
			}]
		}
	}
	return res.json()
}
