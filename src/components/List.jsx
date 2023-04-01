import { useRef, useState, useEffect } from 'react';
import styled, { css } from 'styled-components';
import ArrowBackIosNewOutlinedIcon from '@mui/icons-material/ArrowBackIosNewOutlined';
import ArrowForwardIosOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined';
import { ListItem } from './ListItem';
import { useFetchContents } from '../hooks/useFetchContents'
import { LoadingList } from './';
import { onArrowClick, checkViewWidth, getStorageMyList } from '../utils';
import { GetContext } from '../context/AppContextContainer';


export const List = ({ listTitle, page }) => {

	const [slideNumber, setSlideNumber] = useState(0);
	const [viewWidth, setViewWidth] = useState(window.innerWidth);
	const [maxSlideNumber, setMaxSlideNumber] = useState(29);
	const listRef = useRef();
	const leftArrow = useRef();
	const rightArrow = useRef();

	const [{ fetchedData: itemsList, pending }, setFetchedData] = useFetchContents();
	const { storageUpdated } = GetContext();

	const arrowClick = (direction) => {
		onArrowClick(direction, {
			leftArrow,
			rightArrow,
			listRef,
			slideNumber,
			viewWidth,
			setSlideNumber,
			maxSlideNumber
		});
	}

	useEffect(() => {
		const updateViewWidth = () => setViewWidth(window.innerWidth);
		window.addEventListener('resize', updateViewWidth);
		checkViewWidth(viewWidth, setMaxSlideNumber);
		return () => window.removeEventListener('resize', updateViewWidth);
	});

	useEffect(() => {
		getStorageMyList(listTitle, page, setFetchedData);
	}, [storageUpdated]);

	const itemsToRender = () => {
		if (itemsList) {
			const items = itemsList.map(item => {
				let data = {
					...item,
					genres: item.genres?.length ? item.genres[0].name : null,
					videos: item.videos?.results?.find(video => video.type === 'Trailer')?.key
				}
				return <ListItem key={item.id} page={page} {...data} />
			})
			return items;
		}
	}

	useEffect(() => {
		itemsToRender();
	}, [itemsList])

	return (
		<>
			{(!itemsList?.length & !pending)
				? <EmptyContainer>
					<EmptyListTitle>Your list is empty.</EmptyListTitle>
				</EmptyContainer>
				: <></>
			}

			{(!itemsList?.length && pending) && <LoadingList />}

			{itemsList?.length && (
				<Container page={page}>
					<ListTitle>{listTitle.name}</ListTitle>
					<Wrapper page={page}>
						<ArrowBackIosNewOutlinedIcon
							className="sliderArrow left"
							onClick={() => arrowClick('left')}
							ref={leftArrow}
							style={{ display: (!slideNumber || page === 'My List' || page == 'New & Popular') && 'none' }}
						/>

						<ListContainer ref={listRef} page={page} >

							{itemsToRender()}

						</ListContainer>

						<ArrowForwardIosOutlinedIcon
							className="sliderArrow right"
							onClick={() => arrowClick('right')}
							ref={rightArrow}
							style={{
								display: (slideNumber === maxSlideNumber)
									|| page === 'My List'
									|| page === 'New & Popular'
									? 'none'
									: 'block'
							}}
						/>
					</Wrapper>
				</Container>
			)
			}
		</>
	)
}


// STYLES

const EmptyContainer = styled.div`
 margin-top: 170px; 
 margin-bottom: 190px;
`;

const Container = styled.div`
	width: 100%;
	margin-bottom: 30px;
`;

const ListTitle = styled.h3`
	color: white;
	font-size: 20px;
	font-weight: 500;
	margin-left: 3vw;
	margin-bottom: 10px;
	position: relative;
	@media (max-width: 399px){
		font-size: 1rem;
	}
`;

const EmptyListTitle = styled(ListTitle)`
	text-align: center;
	margin-left: 0;
`;

const Wrapper = styled.div`
	position: relative;
	${({ page }) => (page === 'My List' || page === 'New & Popular') && css`
		width: 100%;
	`}
	
	.sliderArrow {
		width: 50px;
		height: 100%;
		background-color: rgb(22, 22, 22, 0.5);
		color: white;
		position: absolute;
		z-index: 99;
		top: 0;
		bottom: 0;
		cursor: pointer;
	}
	.left {
		left: 0;
	}
	.right {
		right: 6px;
	}

	@media (max-width: 1036px){
		.right {
			right: 0;
		}
	}
	@media (max-width: 399px) {
		.sliderArrow {
			width: 30px;
		}
	}
`;

const ListContainer = styled.div`
	margin-left: 3vw;
	display: flex;
	margin-top: 10px;
	width: max-content;
	transition: all 1s ease;
	position: relative;
	
	${({ page }) => (page === 'My List' || page === 'New & Popular') && css`
	padding-left: 3vw;
	padding-right: 3vw;
	margin: 0;
	width: 100%;
	flex-wrap: wrap;
	column-gap: 0.5rem;
	@media (max-width: 942px){
		padding-right: 2.3vw;
	}
	`}
`;
