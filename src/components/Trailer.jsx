import styled from 'styled-components';

export const Trailer = ({ video, setTrailerOpen }) => {
  return (
		<Backdrop onClick={e=>e.target.name !== 'iframe' && setTrailerOpen(false)}>

			<Iframe 
				name='iframe'
				width="560" 
				height="315" 
				src= {`https://www.youtube.com/embed/${video}`} 
				title="YouTube video player" 
				frameborder="0" 
				allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
				allowfullscreen>
			</Iframe>
			
		</Backdrop>
  )
}


// STYLES 

const Backdrop = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	width: 100vw;
	height: 100vh;
	background-color: #000000b7;
	z-index: 20;
`;

const Iframe = styled.iframe`
	position: fixed;
	top: 25%;
	bottom: 25%;
	left: 50vw;
	transform: translateX(-50%);
	z-index: 21;
	width: 560px;
	height: 315px;
	@media (max-width: 576px){
		width: 90vw;
		height: 315px;
	}
`;

