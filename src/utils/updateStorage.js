import { getLastEmail } from './';

export const updateStorage = (email, storage) => {
	if (email !== getLastEmail() && storage) {
		const userExists = storage.find((user) => user.email === email);
		if (userExists) {
			storage.push(userExists);
			const userIndex = storage.findIndex((user) => user.email === email);
			storage.splice(userIndex, 1);
			localStorage.setItem('users', JSON.stringify(storage));
		} else {
			storage.push({ email, addedList: { movies: [], tv: [] } });
			localStorage.setItem('users', JSON.stringify(storage));
		}
	}
	if (!storage) {
		localStorage.setItem(
			'users',
			JSON.stringify([{ email, addedList: { movies: [], tv: [] } }])
		);
	}
};
