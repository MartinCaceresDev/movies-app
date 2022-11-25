import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import styled from 'styled-components';
import { Spinner } from '@chakra-ui/react'
import { useState, useEffect } from 'react';
import { useFetchContents } from '../hooks/useFetchContents'
import { Trailer, FeaturedInfo } from './';

const imgURL = 'https://image.tmdb.org/t/p/original';
const logoURL = 'https://image.tmdb.org/t/p/w500';

export function Featured({ page }) {
	const [ logo, setLogo ] = useState('');
	const [ video, setVideo ] = useState('');
	const [ trailerOpen, setTrailerOpen ] = useState(false);
	const [ infoOpen, setInfoOpen ] = useState(false);
	const [{ fetchedData, pending }, setFetchedData] = useFetchContents();

	useEffect(()=>{
		setFetchedData(page, {name: 'Featured'});
		setInfoOpen(false);
	},[page]);
	
	useEffect(()=>{
		if (fetchedData && fetchedData[0]?.images?.logos[0]?.file_path){
			setLogo(`${logoURL}${fetchedData[0]?.images?.logos[0]?.file_path}`);
		}
		if (fetchedData && fetchedData[0]?.videos?.results){
			setVideo(fetchedData[0].videos.results.find(({ type }) => type === 'Trailer')?.key);
		}
	},[fetchedData]);

	if (pending){
		return(
			<Container>
				<Spinner color='red.500' size= 'lg' />
			</Container>
		) 
	}

	return (
		<Container image={fetchedData ? `${imgURL}${fetchedData[0]?.backdrop_path}` : '' }>
			<Info infoOpen={infoOpen} >
				<Logo src={logo} alt='Logo' />

				{
					!infoOpen  
						? <>
								<Description>
									{fetchedData && fetchedData[0]?.overview}
								</Description>

								<Buttons>

									<ButtonPlay onClick={()=>setTrailerOpen(true)}>
										<PlayArrowIcon />
										<p>Play</p>
									</ButtonPlay>

									<ButtonInfo onClick={()=>setInfoOpen(true)}>
										<InfoOutlinedIcon />
										<p>Info</p>
									</ButtonInfo>

								</Buttons>
							</>
						: <FeaturedInfo video={video} fetchedData={fetchedData} page={page} />
				}

			</Info>

			{trailerOpen && <Trailer video={video} setTrailerOpen={setTrailerOpen} />}

		</Container>
	);
}


// STYLES

const Container = styled.section`
	height: 105vh;
	position: relative;
	background: ${({image})=>`linear-gradient(to bottom, transparent 70%,#0b0b0b30 80%, #0b0b0b), url(${image})`};
	background-size: cover;
	background-repeat: no-repeat;
	background-position: center;
	margin-bottom: -100px;
	display: flex;
	justify-content: center;
	align-items: center;
	@media (max-height: 458px) {
		margin-bottom: -15vh;
	}
	@media (max-height: 375px) {
		margin-bottom: -10vh;
	}
	@media (max-height: 320px) {
		margin-bottom: 0;
	}
`;

const Info = styled.div`
	width: ${({ infoOpen })=>infoOpen ? '43%' : '35%'};
	position: absolute;
	left: 50px;
	color: white;
	display: flex;
	flex-direction: column;
	background: radial-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0));
	padding: 2rem;
	border-radius: 10%;
	@media (max-width: 992px){
		width: 60%;
	}
	@media (max-width: 699px) {
		width: 70%;
		left: 30px;
	}
	@media (max-width: 399px) {
		width: 90%;
		padding: 0;
		left: 1rem;
	}
	@media (max-height: 375px) {
		width: 80%;
		bottom: 17vh;
		img {
			width: 50%;
		}
	}
	@media (max-height: 320px) {
		bottom: 5vh;
	}
	@media (max-height: 280px) {
		width: 90%;
	}
`;

const Logo = styled.img`
	width: 350px;
	@media (max-width: 699px) {
		width: 100%;
	}
	@media (max-height: 458px) {
		width: 70%;
	}
	@media (max-height: 375px) {
		width: 50%;
	}
`;

const Description = styled.p`
	margin: 20px 0px;
	font-size: 1rem;
	line-height: 1.2;
`;

const Buttons = styled.div`
	display: flex;
	@media (max-height: 458px) {
		transform: scale(0.9);
	}
	@media (max-height: 375px) {
		transform: scale(0.7);
	}
`;

const ButtonPlay = styled.button`
	padding-top: 0.5rem;
	padding-bottom: 0.5rem;
	border: none;
	border-radius: 5px;
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: 1rem;
	font-weight: 500;
	margin-right: 0.7rem;
	cursor: pointer;
	background-color: white;
	color: #0b0b0b;
	flex-basis: 7rem;
	svg {
		width: 1.5em;
		height: 1.5em;
	}
	p {
		margin-left: 0.4rem;
	}
`;

const ButtonInfo = styled(ButtonPlay)`
	background-color: gray;
	color: white;
	svg {
		width: 1.2em;
		height: 1.2em;
	}
`;
