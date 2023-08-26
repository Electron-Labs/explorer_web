import styled from '@emotion/styled';

export const ImageWrapper = styled.div<{ color?: string, fillColor?: string }>`
	& > div > div {
		display: flex;
	}
	& > div > div > svg > path {
		color: ${(props) => props.color || props.theme.text.primary};
		stroke: ${(props) => props.color || props.theme.text.primary};
		fill: ${(props) => props.color};
	}
	& > div > div > svg > rect {
		color: ${(props) => props.color || props.theme.text.primary};
		stroke: ${(props) => props.color || props.theme.text.primary};
		fill: ${(props) => props.color};
	}
`;
