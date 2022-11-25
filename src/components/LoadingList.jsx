import { Spinner } from '@chakra-ui/react'
import styled from 'styled-components';

export const LoadingList = () => {
  return (
    <EmptyContainer>
      <EmptyListTitle>			
        <Container>
          <Spinner color='red.500' size= 'lg' />
        </Container>
      </EmptyListTitle>
    </EmptyContainer>
  )
}


// STYLES

const EmptyContainer = styled.div`
 margin-top: 170px; 
 margin-bottom: 190px;
`;

const EmptyListTitle = styled.h3`
	color: white;
	font-size: 20px;
	font-weight: 500;
	margin-left: 3vw;
	margin-bottom: 10px;
	position: relative;
	text-align: center;
`;

const Container = styled.div`
	width: 100%;
	margin-bottom: 30px;
`;

