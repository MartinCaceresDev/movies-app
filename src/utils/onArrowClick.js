export const onArrowClick = (
	direction,
	{
		leftArrow,
		rightArrow,
		listRef,
		slideNumber,
		viewWidth,
		setSlideNumber,
		maxSlideNumber,
	}
) => {
	let distance = listRef.current.getBoundingClientRect().x;
	if (direction === 'left' && slideNumber > 0) {
		setSlideNumber(slideNumber - 1);
		if (viewWidth > 1281) {
			listRef.current.style.transform = `translateX(${
				distance + viewWidth * 0.895
			}px)`;
		} else if (viewWidth > 801) {
			listRef.current.style.transform = `translateX(${
				distance + viewWidth * 0.91
			}px)`;
		} else if (viewWidth > 480) {
			listRef.current.style.transform = `translateX(${
				distance + viewWidth * 0.885
			}px)`;
		} else if (viewWidth > 320) {
			listRef.current.style.transform = `translateX(${
				distance + viewWidth * 0.88
			}px)`;
		} else {
			listRef.current.style.transform = `translateX(${
				distance + viewWidth * 0.915
			}px)`;
		}
	}
	if (direction === 'right' && slideNumber < maxSlideNumber) {
		setSlideNumber(slideNumber + 1);
		if (viewWidth > 1281) {
			listRef.current.style.transform = `translateX(${
				distance - viewWidth * 0.955
			}px)`;
		} else if (viewWidth > 801) {
			listRef.current.style.transform = `translateX(${
				distance - viewWidth * 0.97
			}px)`;
		} else if (viewWidth > 480) {
			listRef.current.style.transform = `translateX(${
				distance - viewWidth * 0.945
			}px)`;
		} else if (viewWidth > 320) {
			listRef.current.style.transform = `translateX(${
				distance - viewWidth * 0.94
			}px)`;
		} else {
			listRef.current.style.transform = `translateX(${
				distance - viewWidth * 0.975
			}px)`;
		}
	}
	leftArrow.current.style.pointerEvents = 'none';
	rightArrow.current.style.pointerEvents = 'none';
	setTimeout(() => {
		leftArrow.current.style.pointerEvents = 'auto';
		rightArrow.current.style.pointerEvents = 'auto';
	}, 1001);
};
