import { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';
import { useAuthContext } from '../AuthProvider';
import { getLastEmail } from '../../utils'


export const LoginForm = () => {

  const { login, loginError } = useAuthContext();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailMessage, setEmailMessage] = useState(false);
  const [passwordMessage, setPasswordMessage] = useState(false);

  const emailRef = useRef();
  const passwordRef = useRef();
  const emailLabelRef = useRef();
  const passwordLabelRef = useRef();

  const invalidBorders = () => {
    emailRef.current.style.borderBottom = emailMessage ? '2px solid #FFA00A' : 'none';
    passwordRef.current.style.borderBottom = passwordMessage ? '2px solid #FFA00A' : 'none';
  }

  useEffect(() => {
    invalidBorders();
  }, [emailMessage, passwordMessage]);

  const updateLabels = (e) => {
    if ((e?.type === 'blur' && e.target.id === 'email' && !email) || (e?.type === 'focus' && e.target.id === 'email')) {
      setEmailMessage(false);
    }
    if ((e?.type === 'focus' && e.target.id === 'email') || (e?.type === 'focus' && e.target.id === 'password')) {
      setPasswordMessage(false);
    }
  }

  useEffect(() => {
    setEmail(getLastEmail());
  }, []);

  useEffect(() => {
    updateLabels();
  }, [email])

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (email && password) {
        setEmailMessage(false);
        setPasswordMessage(false);
        await login(email, password);
      } else if (!email) {
        setEmailMessage(true);
      } else if (!password) {
        setEmailMessage(false);
        setPasswordMessage(true);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>

      <h1>Sign In</h1>

      {loginError
        && (<Error>
          <p>Sorry, email or password are incorrect.
            Please try again or <Link to='/register'>create a new account</Link>.
          </p>
        </Error>
        )
      }

      <InputContainer email={email}>
        <Input
          id='email'
          ref={emailRef}
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          onFocus={updateLabels}
          onBlur={updateLabels}
          autoComplete='off'
        />
        <label ref={emailLabelRef} htmlFor='email'>Email</label>

        {emailMessage && <span>Enter a valid email address</span>}

      </InputContainer>

      <InputContainer password={password}>
        <Input
          id='password'
          ref={passwordRef}
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          onFocus={updateLabels}
          onBlur={updateLabels}
        />
        <label ref={passwordLabelRef} htmlFor='password'>Password</label>

        {passwordMessage && <span>Password is required!</span>}

      </InputContainer>

      <Button type='submit'>Sign In</Button>

      <Span>New to Netflix? <Link to='/register'>Sign up now.</Link></Span>

      <Captcha>
        This page is protected by Google reCAPTCHA to ensure you're not a bot. <a href='#'>Learn more</a>.
      </Captcha>
    </Form>
  )
}



// STYLES

const Form = styled.form`
  width: 400px;
  padding: 3.5rem;
  border-radius: 0.7rem;
  background-color: #000000c5;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  h1 {
    font-size: 1.5rem;
    font-weight: 500;
    margin-bottom: 2rem;
    @media (max-width: 400px){
      margin-bottom: 0.6rem;
    }
  }
  @media (max-width: 400px){
    width: 100%;
    padding: 3.4rem 1rem;
  }
  @media (max-width: 399px) and (max-height: 500px){
    padding-top: 2rem;
  }
`;

const InputContainer = styled.div`
	position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 1rem;

  label {
    position: absolute;
    color: #a7a5a5;
    top: 1rem;
    left: 1rem;
    transition: all 0.1s;
  }

  input:focus + label {
    top: 0.2rem;
    font: 0.7rem bold;
  }

  ${({ email, password }) => (email || password) && css`
		input:not(:placeholder-shown) + label {
      top: 0.2rem;
      font: 0.7rem bold;
    }
	`}

  span {
    color: #FFA00A;
    position: relative;
    left: 0.5rem;
    font-size: 0.8rem;
  }
`;

const Input = styled.input`
  border-radius: 5px;
  background-color: #333333;
  color: white;
  padding: 1rem;
  padding-top: 1.6rem;
  margin-bottom: 0.4rem;
  outline: none;
  height: 3.3rem;
  font-size: 1rem;
  border: none;
  width: 100%;
  &:invalid {
    border-bottom: orange;
  }
  `;

const Error = styled.div`
  background-color: #e87c03;
  color: white;
  padding: 0.8rem 1.2rem;
  border-radius: 0.3rem;
  margin-top: 1rem;
  margin-bottom: 0.7rem;
  a {
    color: currentColor;
  }
`;

const Button = styled.button`
  border-radius: 5px;
  background-color: #E50914;
  color: white;
  border: none;
  font-size: 18px;
  font-weight: 500;
  cursor: pointer;
  margin: 1.5rem 0 3rem;
  padding: 0.8rem;
  @media (max-width: 399px) and (max-height: 500px){
    margin: 1.5rem 0 1.5rem;
  }
`;

const Span = styled.span`
  color: #d3d3d399;
  margin-bottom: 1.5rem;
  line-height: 1.3;
  a {
    color: white;
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }
  @media (max-width: 399px) and (max-height: 500px){
    margin-bottom: 1rem;
  }
`;

const Captcha = styled(Span)`
  font-size: 0.8rem;
  a {
    color: blue;
  }
`;
