import styled from '@emotion/styled';

export const Container = styled.div`
	width: 1200px;
`;

export const Header = styled.div`
	display: flex;
	align-items: center;
	grid-gap: 24px;
`;

export const DetailWrapper = styled.div`
	background: ${(props) => props.theme.background.card};
	border-radius: 8px;
	padding: 36px;
	width: 100%;
	margin-top: 24px
`;

export const AssetWrapper = styled.div`
	display: flex;
	align-items: center;
	grid-gap: 8px;
`;

export const Grid = styled.div`
	display: grid;
	grid-template-columns: 240px auto;
	grid-gap: 24px;
`;

export const LoaderWrapper = styled.div`
	text-align: center;
	padding: 48px 0px;
`;
