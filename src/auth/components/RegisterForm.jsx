import { useState, useEffect, useRef } from 'react';
import styled, { css } from 'styled-components';
import ArrowForwardIosOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined';
import { useAuthContext } from '../AuthProvider';

export const RegisterForm = () => {

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [emailMessage, setEmailMessage] = useState(false);
	const [passwordMessage, setPasswordMessage] = useState(false);

	const { createUser, registerError } = useAuthContext();

	const emailLabelRef = useRef();
	const passwordLabelRef = useRef();
	const emailInput = useRef();
	const passwordInput = useRef();

	const updateErrorMsg = (e) => {
		if ((e?.type === 'blur' && e.target.id === 'email' && !email) || (e?.type === 'focus' && e.target.id === 'email')) {
			setEmailMessage(false);
		}
		if ((e?.type === 'focus' && e.target.id === 'email') || (e?.type === 'focus' && e.target.id === 'password')) {
			setPasswordMessage(false);
		}
	};

	const invalidBorders = () => {
		emailInput.current.style.borderBottom = emailMessage && '2px solid #FFA00A';
		passwordInput.current.style.borderBottom = passwordMessage && '2px solid #FFA00A';
	};

	useEffect(() => {
		invalidBorders();
	}, [emailMessage, passwordMessage]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			if (email && password) {
				setEmailMessage(false);
				setPasswordMessage(false);
				await createUser(email, password);
				setEmail('');
				setPassword('');
			} else if (!email) {
				setEmailMessage(true);
			} else if (!password) {
				setEmailMessage(false);
				setPasswordMessage(true);
			}
		} catch (err) {
			setEmail('');
			setPassword('');
			console.log(err);
		}
	};

	return (
		<Form onSubmit={handleSubmit}>

			<InputDiv email={email}>
				<Input
					type='email'
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					id='email'
					onFocus={updateErrorMsg}
					onBlur={updateErrorMsg}
					ref={emailInput}
					autoComplete='off'
				/>
				<label ref={emailLabelRef} htmlFor='email'>Email address</label>

				{emailMessage && <span>Enter a valid email address</span>}

				{registerError === 'Firebase: Error (auth/email-already-in-use).'
					&& <span>Email is already registered</span>}

			</InputDiv>

			<br />

			<InputDiv password={password}>
				<Input
					type='password'
					onChange={(e) => setPassword(e.target.value)}
					value={password}
					id='password'
					onFocus={updateErrorMsg}
					onBlur={updateErrorMsg}
					ref={passwordInput}
				/>
				<label ref={passwordLabelRef} htmlFor='password'>Password</label>

				{passwordMessage && <span>Password is required!</span>}

			</InputDiv>

			<RegisterButton type='submit'>
				<span>Get Started</span><ArrowForwardIosOutlinedIcon />
			</RegisterButton>
		</Form>
	);
};



// STYLES

const Form = styled.form`
	min-width: 55%;
	display: flex;
	align-items: flex-start;
	justify-content: center;
	margin-top: 20px;
	border-radius: 5px;
	@media (max-width: 640px){
		flex-direction: column;
		align-items: center;
	}
	@media (max-width: 640px){
		width: 90%;
		margin-top: 12px;
	}
`;

const InputDiv = styled.div`
	display: flex;
	position: relative;
	flex-direction: column;
	align-items: flex-start;
	width: 32%;
	margin-left: 0.3rem;
	@media (max-width: 640px){
		width: 80%;
		margin-left: 0;
		max-width: 300px;
	}
	label {
		position: absolute;
		color: #00000086;
		top: 1.3rem;
		left: 0.6rem;
		transition: all 0.1s;
		@media (max-width: 640px){
			top: 0.8rem;
		}
	}

	input:focus + label {
    top: 0.2rem;
    font: 0.7rem bold;
  }

	${({ email, password }) => (email || password) && css`
		input:not(:placeholder-shown) + label {
      top: 0.2rem;
      font: 0.8rem bold;
    }
	`}

	span {
		margin-top: 0.6rem;
		color: #FFA00A;
		font-weight: 500;
		position: relative;
		left: 0.4rem;
	}
`;

const Input = styled.input`
	border: none;
	padding: 0.6rem 0.6rem 0;
	outline: none;
	width: 100%;
	height: 4rem;
	font-size: 1rem;
	color: black;
	::placeholder {
		font-size: 1rem;
	}
	@media (max-width: 640px){
		height: 3rem;
	}
`;

const RegisterButton = styled.button`
	height: 4rem;
	background-color: #E50914;
	border: none;
	color: white;
	font-size: 1.6rem;
	display: flex;
	align-items: center;
	justify-content: space-between;
	cursor: pointer;
	padding: 0.8rem 1.4rem;
	span {
		margin-right: 0.6rem;
		white-space: nowrap;
		text-align: center;
	}
	:active {
		background-color: #b90811;
	}
	@media (max-width: 640px){
		height: 3rem;
		margin-top: 1rem;
		width: 80%;
		font-size: 1.6rem;
		justify-content: center;
		max-width: 300px;
	}
`;
