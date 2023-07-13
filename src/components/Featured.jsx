import { useState, useEffect } from 'react';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import styled from 'styled-components';
import { Spinner } from '@chakra-ui/react';
import { Trailer, FeaturedInfo } from './';
import { useGetContent } from '../hooks/useGetContent';

const imgURL = 'https://image.tmdb.org/t/p/original';
const logoURL = 'https://image.tmdb.org/t/p/w500';

const listTitle = { name: 'Featured' };


export function Featured({ page }) {
	const [logo, setLogo] = useState('');
	const [video, setVideo] = useState('');
	const [trailerOpen, setTrailerOpen] = useState(false);
	const [infoOpen, setInfoOpen] = useState(false);

	const { itemsList: fetchedData, error, isLoading } = useGetContent(page, listTitle);

	// Query content data
	useEffect(() => {
		setInfoOpen(false);
	}, [page]);

	// with content data we may have logo and trailer video
	useEffect(() => {
		if (fetchedData && fetchedData[0]?.images?.logos[0]?.file_path) {
			setLogo(`${logoURL}${fetchedData[0]?.images?.logos[0]?.file_path}`);
		}
		if (fetchedData && fetchedData[0]?.videos?.results) {
			setVideo(fetchedData[0].videos.results.find(({ type }) => type === 'Trailer')?.key);
		}
	}, [fetchedData]);

	if (isLoading) {
		return (
			<Loading>
				<Spinner color='red.500' size='lg' />
			</Loading>
		);
	}

	return (
		<Container image={fetchedData ? `${imgURL}${fetchedData[0]?.backdrop_path}` : ''}>
			<Info infoOpen={infoOpen} >
				<Logo src={logo} alt='Logo' />

				{
					!infoOpen
						? <>
							<Description>
								{fetchedData && fetchedData[0]?.overview}
							</Description>

							<Buttons>

								<ButtonPlay onClick={() => setTrailerOpen(true)}>
									<PlayArrowIcon />
									<p>Play</p>
								</ButtonPlay>

								<ButtonInfo onClick={() => setInfoOpen(true)}>
									<InfoOutlinedIcon />
									<p>Info</p>
								</ButtonInfo>

							</Buttons>
						</>
						// When info is open
						: <FeaturedInfo video={video} fetchedData={fetchedData} page={page} />
				}

			</Info>
			{/* Trailer video is open */}
			{trailerOpen && <Trailer video={video} setTrailerOpen={setTrailerOpen} />}

		</Container>
	);
}


// STYLES

const Container = styled.section`
	position: relative;
	height: 95vh;
	background: ${({ image }) => `linear-gradient(to bottom, transparent 70%,#0b0b0b30 80%, #0b0b0b), url(${image})`};
	background-size: cover;
	background-repeat: no-repeat;
	background-position: center;
	margin-bottom: -6vh;
	display: flex;
	justify-content: start;
	align-items: center;
	@media (max-height: 640px) {
		margin-bottom: -4rem;
	}
	@media (max-height: 399px) {
		margin-bottom: -2rem;
	}
	@media (max-width: 399px){
		justify-content: center;
		margin-bottom: -2.7rem;
		padding-left: 3px;
		padding-right: 3px;
	}
`;

const Loading = styled(Container)`
	justify-content: center;
	background: #0b0b0b;
	height: 100vh;
	width: 100%;
`;

const Info = styled.div`
	width: ${({ infoOpen }) => infoOpen ? '43%' : '35%'};
	max-width: 600px;
	position: relative;
	left: 4rem;
	color: white;
	display: flex;
	flex-direction: column;
	background: radial-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.4));
	padding: 2rem;
	border-radius: 1.4rem;
	font-size: 0.9rem;
	margin-top: 20vh;
	margin-bottom: 22vh;

	@media (max-width: 992px){
		width: 60%;
	}
	@media (max-width: 699px) {
		width: 85%;
		left: 30px;
	}
	@media (max-width: 399px) {
		width: 98%;
		padding: 1rem;
		position: initial;
		left: initial;
		align-items: center;
		padding: 2rem 0.8rem;
		margin-top: 17vh;
		margin-bottom: 22vh;
	}
	@media (max-height: 399px) {
		left: 10px;
		width: 100%;
		padding-bottom: 0.5rem;
		margin-top: 50px;
		margin-bottom: 100px;
	}
	@media (max-height: 280px){
		transform: scale(0.9);
	}
`;

const Logo = styled.img`
	max-height: 40vh;
	max-width: 20rem;
	@media (max-width: 699px) {
		width: 75%;
	}
	@media (max-height: 458px) {
		width: 70%;
	}
	@media (max-height: 399px) {
		width: 40vh;
	}
`;

const Description = styled.p`
	margin: 20px 0px;
	font-size: 1rem;
	line-height: 1.2;
	@media (max-height: 320px){
		font-size: 0.8rem;
	}
	@media (max-width: 399px){
		font-size: 0.8rem;
	}
`;

const Buttons = styled.div`
	display: flex;
	@media (max-height: 458px) {
		transform: scale(0.9);
	}
	@media (max-height: 375px) {
		transform: scale(0.7);
	}
	@media (max-width: 399px){
		justify-content: center;
	}
`;

const ButtonPlay = styled.button`
	padding: 0.5rem 0;
	width: 7rem;
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
	@media (max-width: 285px){
		transform: scale(0.8)
	}
`;

const ButtonInfo = styled(ButtonPlay)`
	background-color: gray;
	color: white;
	margin-right: 0;
	svg {
		width: 1.2em;
		height: 1.2em;
	}
`;
