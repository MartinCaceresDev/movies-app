import axios from 'axios';
import * as link from '../utils/links';

export const askingForContentIds = async (page, listObject) => {
	let ids = false;
	switch (listObject.name) {
		case 'Trending Now':
		case 'Featured':
			if (page === 'Movies' || page === 'New & Popular' || page === 'My List') {
				ids = await fetchItemsId(link.popularMovies);
			} else if (page === 'TV') {
				ids = await fetchItemsId(link.popularTVShows);
			}
			break;
		case 'Top rated':
			if (page === 'Movies') {
				ids = await fetchItemsId(link.topRatedMovies);
			} else if (page === 'TV') {
				ids = await fetchItemsId(link.topRatedTVShows);
			}
			break;
		case 'Popular':
			if (page === 'New & Popular') {
				const movieIds = await fetchItemsId(link.popularMovies);
				const tvIds = await fetchItemsId(link.popularTVShows);
				let tempIds = [];
				movieIds.forEach((movie, index) => (tempIds[index * 2] = movie));
				tvIds.forEach((show, index) => (tempIds[index * 2 + 1] = show));
				ids = tempIds;
			}
		default:
			if (page === 'Movies') {
				ids = await fetchItemsId(`${link.byGenderMovies}${listObject.id}`);
			} else if (page === 'TV') {
				ids = await fetchItemsId(`${link.byGenderTV}${listObject.id}`);
			}
	}
	return ids;
};

const fetchItemsId = async (url) => {
	try {
		let items = await axios.get(url);
		let ids = items.data.results.map((item) => item.id);
		return ids;
	} catch (err) {
		console.log(err);
	}
};
