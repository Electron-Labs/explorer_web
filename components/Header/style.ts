import styled from '@emotion/styled';

export const Container = styled.header`
	background: ${(props) => props.theme.background.base};
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 16px 36px;
	@media(max-width: 576px) {
		padding: 16px;
	}
`;

export const SettingWrapper = styled.div`
	border-radius: 12px;
	padding: 4px 12px;
	background: ${(props) => props.theme.background.card};
	height: 100%;
	display: flex;
	align-items: center;
`;

export const ButtonWrapper = styled.div`
	display: flex;
	height: 100%;
	grid-gap: 24px;
	align-items: center;
`;
