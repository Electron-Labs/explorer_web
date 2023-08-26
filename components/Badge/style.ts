import styled from '@emotion/styled';

export const Container = styled.div<{ backgroundColor: string}>`
	border: ${(props) => `2px solid ${props.backgroundColor}`};
	padding: 4px 12px;
	border-radius: 8px;
	display: flex;
	justify-content: center;
	align-items: center;
`;
