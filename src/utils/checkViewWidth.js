export const checkViewWidth = (viewWidth, setMaxSlideNumber) => {
	if (viewWidth > 1281) {
		setMaxSlideNumber(3);
	} else if (viewWidth > 801) {
		setMaxSlideNumber(4);
	} else if (viewWidth > 480) {
		setMaxSlideNumber(6);
	} else if (viewWidth > 320) {
		setMaxSlideNumber(9);
	} else if (viewWidth <= 320) {
		setMaxSlideNumber(19);
	}
};
