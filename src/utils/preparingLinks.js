import * as link from './links';

/**
 * 
 * @param {String} page - (String) Name of the page.
 * @param {{name: string; id: string}} listObject - Object with two properties: 'name' (string) and 'id' (string) (optional).
 * @param {{ids: string[]} | string[]} ids - Page === 'My List' ? string[] : { ids: string[] }
 * @returns { Promise<string[]> } - (string[]) Returns an array of urls to fetch.
 */

export const preparingLinks = (page, listObject, ids) => {
	let linksToFetch = [];
	if (page === 'Movies') {
		linksToFetch = ids.ids?.map((id) => `${link.movieBeforeMovieID}${id}${link.movieAfterMovieID}`);
	} else if (page === 'TV') {
		linksToFetch = ids.ids?.map((id) => `${link.tvShowBeforeID}${id}${link.tvShowAfterID}`);
	} else if (page === 'My List') {
		if(listObject.name === 'Featured') {
			console.log('ids', ids)
			linksToFetch = ids.ids?.map((id) => `${link.movieBeforeMovieID}${id}${link.movieAfterMovieID}`);
		} else {
			let moviesLinks = ids.movies?.map((id) => `${link.movieBeforeMovieID}${id}${link.movieAfterMovieID}`);
			let tvLinks = ids.tv?.map((id) => `${link.tvShowBeforeID}${id}${link.tvShowAfterID}`);
			linksToFetch.push(...moviesLinks, ...tvLinks);
		}
	} else if (page === 'New & Popular') {
		if (listObject.name === 'Popular') {
			const tempLinks = [];
			ids.ids.forEach((id, index) => {
				tempLinks[index] = index % 2 === 0
				? `${link.movieBeforeMovieID}${id}${link.movieAfterMovieID}`
				: `${link.tvShowBeforeID}${id}${link.tvShowAfterID}`;
				linksToFetch = tempLinks;
			});
		} else if(listObject.name === 'Featured') {
			linksToFetch = ids.ids?.map((id) => `${link.movieBeforeMovieID}${id}${link.movieAfterMovieID}`);
		}
	}
	return linksToFetch;
};
