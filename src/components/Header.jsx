import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { AiOutlineMenu } from 'react-icons/ai';
import styled from 'styled-components';
import { useAuthContext } from '../auth/AuthProvider';
import { netflixLogo, menuLinks } from '../utils';
import { Sidebar } from './Sidebar';


export function Header() {
	const [isScrolled, setIsScrolled] = useState(false);
	const { logout } = useAuthContext();
	const [menuOpen, setMenuOpen] = useState(false);
	const navigate = useNavigate();


	useEffect(() => {
		const updateScroll = () => {
			const scroll = window.pageYOffset;
			scroll > 0 ? setIsScrolled(true) : setIsScrolled(false);
		};
		window.addEventListener('scroll', updateScroll);
		return () => window.removeEventListener('scroll', updateScroll);
	});

	const handleMenuPage = (e) => {
		switch (e.target.innerText) {
			case 'Movies':
			case 'Home':
				navigate('/');
				break;
			case 'TV Shows':
				navigate('/tv');
				break;
			case 'New & Popular':
				navigate('/popular');
				break;
			case 'My List':
				navigate('/mylist');
				break;
			default:
				navigate('/');
		}
	};

	const onMenuClick = ({ target: { id } }) => {
		if (id === 'openIcon') setMenuOpen(true);
		else if (id === 'closeIcon') setMenuOpen(false);
		else if (id === 'sidebar') return;
		else setMenuOpen(false);
	};

	return (
		<>
			<Container scroll={isScrolled}>

				<LeftMenu>
					<Logo src={netflixLogo} alt="Netflix Logo" onClick={handleMenuPage} />

					{menuLinks.map(link => (
						<span onClick={handleMenuPage} key={link}>{link}</span>
					))}
				</LeftMenu>

				<RightMenu>

					<UserIcon>
						<AccountBoxIcon />
					</UserIcon>

					<Account>
						<ArrowDropDownIcon className="icon" />
						<div className="options">
							<span onClick={logout}>Logout</span>
						</div>
					</Account>

				</RightMenu>

				<HamburgerMenu>
					<AiOutlineMenu onClick={onMenuClick} id='openIcon' />
				</HamburgerMenu>

			</Container>

			<Sidebar onMenuClick={onMenuClick} menuOpen={menuOpen} handleMenuPage={handleMenuPage} />
		</>
	);
}

// STYLES

const Container = styled.header`
	width: 100%;
	color: white;
	font-size: 14px;
	position: fixed;
	top: 0;
	z-index: 100;
	background: ${({ scroll }) =>
		scroll
			? '#0b0b0b'
			: 'linear-gradient(to top, transparent 0%, rgb(0, 0, 0, 0.3) 50%)'};
	padding: 0px 50px;
	display: flex;
	align-items: center;
	justify-content: space-between;
	height: 70px;
	@media (max-width: 480px) {
		padding: 0 3vw 0 4vw;
	}
	@media (max-height: 250px){
		height: 45px;
	}
`;

const Logo = styled.img`
	height: 25px;
	margin-right: 40px;
	cursor: pointer;
`;

const LeftMenu = styled.div`
	display: flex;
	align-items: center;
	span {
		margin-right: 20px;
		cursor: pointer;
	}
	@media (max-width: 899px) {
		span:not(.options span) {
			display: none;
		}
	}
`;

const RightMenu = styled(LeftMenu)`
	.icon {
		margin: 0px 15px;
		cursor: pointer;
	}
	span {
		margin-right: 0;
	}
	@media (max-width: 899px) {
		display: none;
		.icon {
			margin-right: 5;
		}
	}
`;

const UserIcon = styled.div`
	width: 2rem;
	height: 2rem;
	cursor: auto;
	display: flex;
		svg {
			height: 2rem;
			width: 2rem;
		}
`;

const Account = styled.div`
	.options {
		display: none;
		background-color: #0b0b0b;
		border-radius: 5px;
	}
	span {
		padding: 10px;
		cursor: pointer;
	}
	:hover {
		.options {
			display: flex;
			flex-direction: column;
			position: absolute;
		}
	}
`;

const HamburgerMenu = styled.div`
	height: 1.2rem;
	width: 1.2rem;
	display: flex;
	svg {
		width: 100%;
		height: 100%;
	}
	@media (min-width: 900px){
		display: none;
	}
`;
