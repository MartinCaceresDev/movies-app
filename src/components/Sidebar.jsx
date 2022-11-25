import styled from 'styled-components';
import { AiOutlineClose } from 'react-icons/ai';
import  { menuLinks } from '../utils';

export const Sidebar = ({ onMenuClick, menuOpen, handleMenuPage }) => {
  return (
    <SidebarContainer menuOpen={menuOpen} onClick={onMenuClick} id='back'>
      <SidebarContent menuOpen={menuOpen} id='sidebar' >

        <CloseContainer>
          <AiOutlineClose id='closeIcon' onClick={onMenuClick} />
        </CloseContainer>

        {menuLinks.map(link=>(
          <Link key={link} onClick={handleMenuPage}>{link}</Link>
        ))}
        
      </SidebarContent>
    </SidebarContainer>
  )
}



// STYLES

const SidebarContainer = styled.div`
  width: 100%;
  height: 100%;
  background-color: #00000060;
  position: fixed;
  top: 0;
  z-index: 200;
  right: ${({menuOpen})=> menuOpen ? `0` : `-100%` };
`;

const SidebarContent = styled.div`
  position: fixed;
  top: 0;
  right: ${({menuOpen})=> menuOpen ? `0` : `-100%` };
  height: 100vh;
  width: 18rem;
  background-color: #0b0b0b;
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 210;
  transition: all 0.2s ease-in-out;
  padding: 1.2rem;
  padding-top: 2rem;
`;

const CloseContainer = styled.div`
  align-self: flex-end;
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
  height: 1.5rem;
  width: 1.5rem;
  svg {
    height: 100%;
    width: 100%;
  }
`;

const Link = styled.span`
  margin-bottom: 0.5rem;
  cursor: pointer;
  border-bottom: 1px solid #ffffff40;
  display: block;
  width: 80%;
  text-align: center;
  padding-bottom: 0.6rem;
`;