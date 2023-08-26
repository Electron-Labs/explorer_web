import React from 'react';
import { ReactSVG } from 'react-svg';

import { SvgImageProps } from './type';
import { ImageWrapper } from './style';

const SvgImage: React.FC<SvgImageProps> = (props: SvgImageProps) => {
	const {
		src, style, onClick, color, fillColor,
	} = props;
	return (
		<ImageWrapper color={color} fillColor={fillColor}>
			<ReactSVG
				src={src}
				style={style}
				onClick={onClick}
			/>
		</ImageWrapper>
	);
};

export default SvgImage;
