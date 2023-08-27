import styled from '@emotion/styled';

export const Wrapper = styled.div`
  display: grid;
  grid-template-rows: 88px auto;
  height: 100vh;
`;

export const BackgroundContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: ${({ theme }) => `linear-gradient(0deg, ${theme.background.base} 50%, ${theme.background.shadow})`};
  padding: 24px;
  overflow-x: auto;
`;

export const MainContainer = styled.main`
  @media (max-width: 1450px) {
    width: 100%;
    overflow: auto;
  }
`;
