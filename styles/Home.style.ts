import styled from '@emotion/styled';

export const Wrapper = styled.div`
  display: grid;
  grid-template-rows: 88px auto;
  height: 100vh;
  overflow-y: auto;
  @media (max-width: 768px) {
		grid-template-rows: 88px auto max-content;
	}
`;

export const BackgroundContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: ${({ theme }) => `linear-gradient(0deg, ${theme.background.base} 50%, ${theme.background.shadow})`};
  padding: 24px 0px;
  @media (max-width: 768px) {
		padding: 24px 0px 92px 0px;
	}
`;
