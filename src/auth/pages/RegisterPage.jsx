import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { netflixLogo } from '../../utils';
import { netflixBackground } from '../../utils/netflixBackground';
import { RegisterForm } from '../components/RegisterForm';


export function RegisterPage() {

	return (
		<Container>

			<Top>
				<Image src={netflixLogo} alt='Netflix Logo' />
				<Link to='/login'>Sign In</Link>
			</Top>

			<Content>
				<H1>Unlimited movies, TV shows, and more.</H1>
				<H2>Watch anywhere. Cancel anytime.</H2>

				<RegisterForm />
				
				<P>Ready to watch? Enter your email to create or restart your membership.</P>
			</Content>
			
		</Container>
	);
}




// STYLES

const Container = styled.div`
	width: 100vw;
	height: 100vh;
	background: linear-gradient(to bottom, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.7)), url(${netflixBackground});
	background-size: cover;
	position: relative;
`;

const Top = styled.div`
	position: relative;
	z-index: 10;
	padding: 20px 50px;
	display: flex;
	align-items: center;
	justify-content: space-between;
	a {
		background-color: #E50914;
		border: none;
		color: white;
		border-radius: 5px;
		padding: 0.5rem 1rem;
		font-size: 16px;
		font-weight: 500;
		cursor: pointer;
		text-decoration: none;
	}
	@media (max-width: 399px){
		padding: 20px;
	}
`;

const Image = styled.img`
	max-height: 40px;
	@media (max-width: 640px){
		height: 10vw;
	}
`;

const Content = styled.div`
	width: 100%;
	height: 100%;
	position: absolute;
	top: 0;
	left: 0;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	color: white;
	text-align: center;
	padding-top: 2rem;
`;

const H1 = styled.h1`
	font-size: 3rem;
	min-width: 40%;
	line-height: 1.2;
	@media (max-width: 640px){
		font-size: 40px;
	}
	@media (max-width: 399px){
		line-height: 1;
		font-size: 30px;
	}
`;

const H2 = styled.h2`
	font-weight: 400;
	margin: 20px;
	font-size: 1.2rem;
	@media (max-width: 399px){
		margin: 14px;
	}
`;

const P = styled.p`
	font-size: 20px;
	margin-top: 20px;
	@media (max-width: 399px){
		font-size: 16px;
		margin: 0 10px;
		margin-top: 20px;
	}

`;

