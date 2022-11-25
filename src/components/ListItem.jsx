import { useState, memo, useEffect } from 'react';
import styled, {css} from 'styled-components';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import AddIcon from '@mui/icons-material/Add';
import PlaylistAddCheckOutlinedIcon from '@mui/icons-material/PlaylistAddCheckOutlined';
import { Trailer } from './Trailer';
import { GetContext } from '../context/AppContextContainer';

const imgURL = 'https://image.tmdb.org/t/p/w500';

export const ListItem = memo(({ 
	id, 
	title, 
	backdrop_path, 
	overview, 
	release_date, 
	adult,
	runtime, 
	genres, 
	name, 
	number_of_seasons,
	page,
	videos
})=> {
	const [ isHovered, setIsHovered ] = useState(false);
	const [ addedToList, setAddedToList ] = useState(false);
	const [ trailerOpen, setTrailerOpen ] = useState(false);
	const image = `${imgURL}${backdrop_path}`
	const { checkAddedToList, storageUpdated, onAddRemoveFromList } = GetContext();

// CHECK IF ITEM IS ADDED
	useEffect(()=>{
		setAddedToList(()=>checkAddedToList(id));
	},[storageUpdated]);

	const argumentsNeeded = [
		addedToList, page, 
		id, runtime, number_of_seasons 
	];
	
	return (
		<>
			{ backdrop_path && (
				<Container
					onMouseEnter={() => setIsHovered(true)}
					onMouseLeave={() => setIsHovered(false)}
					page={page}
				>
					<Image src={image} alt='Movie' />
					<Title>{title ? title : name}</Title>
					
					{isHovered && (
						<HoverContainer>

							<ImageSection>
								<ImageHover src={image} alt='Movie' />
								<Title>{title ? title : name}</Title>
							</ImageSection>

							<ItemInfo>
								
								<Icons>
									{videos && <PlayArrowIcon className='icon' onClick={()=>setTrailerOpen(true)} />}
									{ addedToList 
										? <PlaylistAddCheckOutlinedIcon 
												className='icon' 
												onClick={()=>onAddRemoveFromList(...argumentsNeeded)} 
											/> 
										: <AddIcon 
												className='icon' 
												onClick={()=>onAddRemoveFromList(...argumentsNeeded)} 
											/>
									}
								</Icons>

								{ trailerOpen && <Trailer video={videos} setTrailerOpen={setTrailerOpen} />}

								<ItemInfoTop>
									<span>
										{ runtime 
											? `Duration: ${runtime} mins` 
											: `Seasons: ${number_of_seasons}` 
										}
									</span>
									<span className='limit'>{adult ? '+16' : 'PG'}</span>
									<span>{release_date?.substring(0,4)}</span>
								</ItemInfoTop>

								<Description>{overview}</Description>
								<Genre>{genres}</Genre>
								
							</ItemInfo>

						</HoverContainer>
					)}
					
				</Container>
			)}
		</>
	);
})


// STYLES

const Container = styled.div`
	width: 18vw;
	height: 11rem;
	background-color: #0b0b0b;
	margin-right: 0.5vw;
	cursor: pointer;
	color: white;
	position: relative;
	
	@media (max-width: 1281px) {
		width: 23vw;
		height: 190px;
	}
	@media (max-width: 1025px) {
		height: 170px;
	}
	@media (max-width: 900px) {
		height: 155px;
	}
	@media (max-width: 801px) {
		width: 30vw;
	}
	@media (max-width: 600px) {
		height: 140px;
	}
	@media (max-width: 480px) {
		width: 45vw;
	}
	@media (max-width: 320px) {
		width: 94vw;
		height: 170px;
	}
	${({page})=> (page === 'My List' || page === 'New & Popular') && css`
	margin-bottom: 3rem;
	margin-right: 0;
	@media (max-width: 1196px) {
		width: 22vw;
		height: 170px;
	}
	@media (max-width: 942px) {
		width: 30vw;
	}
	@media (max-width: 705px) {
		width: 45vw;
	}
	@media (max-width: 400px) {
		width: 94vw;
	}
	`}
`;

const Image = styled.img`
	width: 100%;
	height: 100%;
	object-fit: cover;
	object-position: center left;
`;

const Title = styled.div`
	position: absolute;
	bottom: 0;
	width: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	background-color: #00000095;
	padding: 0.5rem;
	text-align: center;
	font-weight: 600;
`;

const HoverContainer = styled.div`
	display: flex;
	flex-direction: column;
	width: 325px;
	position: absolute;
	left: -2rem;
	bottom: -20%;
	box-shadow: 0px 0px 15px 0px rgba(255, 255, 255, 0.07);
	border-radius: 5px;
	background-color: #0b0b0b;
	overflow: hidden;
	color: white;
	z-index: 10;
	cursor: auto;
`;

const ImageSection = styled.article`
	position: relative;
	height: 180px;
	width: 100%;
`;

const ImageHover = styled.img`
	width: 100%;
	height: 100%;
	object-fit: cover;
`;

const ItemInfo = styled.div`
	display: flex;
	flex-direction: column;
	padding: 1rem;
`;

const Icons = styled.div`
	display: flex;
	margin-bottom: 10px;

	.icon {
		border-radius: 50%;
		margin-right: 10px;
		font-size: 16px;
		cursor: pointer;
	}
`;

const ItemInfoTop = styled.div`
	display: flex;
	align-items: center;
	margin-bottom: 10px;
	font-size: 14px;
	font-weight: 600;
	color: gray;
	.limit {
		border: 1px solid gray;
		padding: 1px 3px;
		margin: 0 10px;
	}
`;

const Description = styled.div`
	font-size: 13px;
	margin-bottom: 10px;
	line-height: 1.3;
`;

const Genre = styled.div`
	font-size: 14px;
	color: lightgray;
`;
