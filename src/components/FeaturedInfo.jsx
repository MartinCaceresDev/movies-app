import { useState, useEffect } from 'react';
import styled from 'styled-components';
import AddIcon from '@mui/icons-material/Add';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PlaylistAddCheckOutlinedIcon from '@mui/icons-material/PlaylistAddCheckOutlined';
import { Trailer } from '.';
import { checkAddedToList, getCredits, onAddRemoveFromList } from '../utils';
import { GetContext } from '../context/AppContextContainer';


export const FeaturedInfo = ({ video, fetchedData, page }) => {

  const [trailerOpen, setTrailerOpen] = useState(false);
  const [addedToList, setAddedToList] = useState(false);
  const [cast, setCast] = useState(null);

  const { storageUpdated, setStorageUpdated } = GetContext();

  const {
    id,
    adult,
    overview,
    release_date,
    first_air_date,
    runtime,
    number_of_seasons,
    genres
  } = fetchedData[0];

  // get type of content
  const type = () => {
    if (runtime) return 'movie';
    if (number_of_seasons) return 'TV';
    else console.log('There is no type of content.');
  };

  // with type of content we get credits of featured movie
  useEffect(() => {
    const contentType = type();
    if (contentType) {
      getCredits(id, contentType)
        .then(castList => setCast(castList))
        .catch(err => console.log(err));
    }
  }, []);

  // is content added to user list?
  useEffect(() => {
    setAddedToList(() => checkAddedToList(id));
  }, [storageUpdated]);

  // Date of content (is it movie or tv show?)
  const date = () => {
    if (release_date) return release_date.slice(0, 4);
    else if (first_air_date) return first_air_date.slice(0, 4);
    else return null;
  };

  // we get three main actors/actresses
  const starring = cast && cast.slice(0, 3).map(actor => actor.name).join(', ');

  const genre = genres.map(genre => genre.name).join(', ');

  const onMyListClick = () => {
    onAddRemoveFromList(addedToList, page, id, runtime, number_of_seasons);
    setStorageUpdated(storageUpdated + 1);
  };

  return (
    <>
      <SpansContainer>

        {date() && <Year>{date()}</Year>}

        <Public>{adult ? '+16' : 'PG'}</Public>

        <Duration>
          {runtime
            ? `Duration: ${runtime} mins`
            : `Seasons: ${number_of_seasons}`
          }
        </Duration>

      </SpansContainer>

      <Description>{overview}</Description>

      <Buttons>
        <ButtonPlay onClick={() => setTrailerOpen(true)}>
          <PlayArrowIcon />
          <p>Play</p>
        </ButtonPlay>

        {trailerOpen && <Trailer setTrailerOpen={setTrailerOpen} video={video} />}

        <ButtonList onClick={onMyListClick}>
          {!addedToList
            ? <>
              <AddIcon />
              <p>My List</p>
            </>
            : <>
              <PlaylistAddCheckOutlinedIcon />
              <p>Added to your List</p>
            </>
          }
        </ButtonList>
      </Buttons>

      <Starring>
        <Title>Starring: </Title>
        {starring}
      </Starring>

      <Genres>
        <Title>Genres: </Title>
        {genre}
      </Genres>
    </>
  );
};


// STYLES


const SpansContainer = styled.div`
  margin: 0.7rem 0;
  display: flex;
  gap: 0.7rem;
  align-items: center;
`;

const Year = styled.span``;

const Public = styled.span`
  border: 1px solid white;
  padding: 0 0.3rem;
`;

const Duration = styled.span``;

const Description = styled.p``;

const Buttons = styled.div`
	display: flex;
  margin: 1rem 0;
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
  user-select: none;
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

const ButtonList = styled(ButtonPlay)`
	background-color: gray;
	color: white;
	svg {
		width: 1.2em;
		height: 1.2em;
	}
`;

const Starring = styled.p``;

const Genres = styled(Starring)``;

const Title = styled.span`
  font-weight: bold;
`;
