import styled from 'styled-components';
import { netflixLogo } from '../../utils/netflixLogo';
import { netflixBackground } from '../../utils/netflixBackground';
import { LoginForm } from '../components/LoginForm';


export function LoginPage() {
  return (
    <Container>

      <Top>
        <Wrapper>
          <Image src={netflixLogo} alt="Netflix Logo" />
        </Wrapper>
      </Top>

      <Content>
        <LoginForm />
      </Content>
      
    </Container>
  );
}



// STYLES

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${netflixBackground});
  background-size: cover;
  position: relative;
  overflow-y: hidden;
`;

const Top = styled.div`
  @media (max-width: 400px){
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const Wrapper = styled.div`
  padding: 20px 50px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Image = styled.img`
  height: 40px;
  z-index: 20;
  @media (max-width: 399px){
    height: 28px;
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
  @media (max-width: 399px){
    margin-top: 4rem;;
  }
`;
