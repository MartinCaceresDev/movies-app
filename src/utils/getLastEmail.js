export const getLastEmail = () => {
	let storage;
	try {
		storage = JSON.parse(localStorage.getItem('users'));
		if (storage) {
			const lastEmail = storage[storage.length - 1].email;
			return lastEmail;
		} else {
			return '';
		}
	} catch (err) {
		console.log(err);
	}
};
