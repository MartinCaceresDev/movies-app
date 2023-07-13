import axios from 'axios';
import * as link from './links';

/**
 * @param {String} page - (string) Name of the page.
 * @param {{name: string; id: string}} listDetails - (object) List name and id.
 * @returns {Promise<string[]>} ids - (array) Returns an array of content ids.
 */

// export const askingForContentIds = async (page, listDetails) => {
// 	let ids = false;
// 	switch (listDetails.name) {
// 		case 'Trending Now':
// 		case 'Featured':
// 			if (page === 'Movies' || page === 'New & Popular' || page === 'My List') {
// 				ids = await fetchItemsId(link.popularMovies);
// 			} else if (page === 'TV') {
// 				ids = await fetchItemsId(link.popularTVShows);
// 			}
// 			break;
// 		case 'Top rated':
// 			if (page === 'Movies') {
// 				ids = await fetchItemsId(link.topRatedMovies);
// 			} else if (page === 'TV') {
// 				ids = await fetchItemsId(link.topRatedTVShows);
// 			}
// 			break;
// 		case 'Popular':
// 			if (page === 'New & Popular') {
// 				const movieIds = await fetchItemsId(link.popularMovies);
// 				const tvIds = await fetchItemsId(link.popularTVShows);
// 				let tempIds = [];
// 				movieIds.forEach((movie, index) => (tempIds[index * 2] = movie));
// 				tvIds.forEach((show, index) => (tempIds[index * 2 + 1] = show));
// 				ids = tempIds;
// 			}
// 			break;
// 		default:
// 			if (page === 'Movies') {
// 				ids = await fetchItemsId(`${link.byGenderMovies}${listDetails.id}`);
// 			} else if (page === 'TV') {
// 				ids = await fetchItemsId(`${link.byGenderTV}${listDetails.id}`);
// 			}
// 		}
// 		return ids;
// 	};
	
	// Receives the url, fetches the proper ids and returns them in an array.
	// const fetchItemsId = async (url) => {
	// 	try {
	// 		let items = await axios.get(url);
	// 		let ids = items.data.results.map((item) => item.id);
	// 		return ids;
	// 	} catch (err) {
	// 		console.log(err);
	// 	}
	// };




export const askingForContentIdsNew = async ([page, listDetails]) => {
	let idsProperty;
	const ids = {}
	switch (listDetails.name) {
		case 'Trending Now':
		case 'Featured':
			if (page === 'Movies' || page === 'New & Popular' || page === 'My List') {
				idsProperty = await fetchItemsIdNew(link.popularMovies);
			} else if (page === 'TV') {
				idsProperty = await fetchItemsIdNew(link.popularTVShows);
			}
			break;
		case 'Top rated':
			if (page === 'Movies') {
				idsProperty = await fetchItemsIdNew(link.topRatedMovies);
			} else if (page === 'TV') {
				idsProperty = await fetchItemsIdNew(link.topRatedTVShows);
			}
			break;
		case 'Popular':
			if (page === 'New & Popular') {
				const movieIds = await fetchItemsIdNew(link.popularMovies);
				const tvIds = await fetchItemsIdNew(link.popularTVShows);
				let tempIds = [];
				movieIds.forEach((movie, index) => (tempIds[index * 2] = movie));
				tvIds.forEach((show, index) => (tempIds[index * 2 + 1] = show));
				idsProperty = tempIds;
			}
			break;
		default:
			if (page === 'Movies') {
				idsProperty = await fetchItemsIdNew(`${link.byGenderMovies}${listDetails.id}`);
			} else if (page === 'TV') {
				idsProperty = await fetchItemsIdNew(`${link.byGenderTV}${listDetails.id}`);
			}
	}
	ids.ids = idsProperty
	return ids;
};


const fetchItemsIdNew = async (url) => {
	let items = await axios.get(url);
	let ids = items.data.results.map((item) => item.id);
	return ids;
};
