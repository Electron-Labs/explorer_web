import React from 'react';
import { useTheme } from '@emotion/react';

import {
	Default, h1Variant, h2Variant, h3Variant,
	h4Variant, h5Variant, h6Variant, xLargeVariant, largeVariant,
} from './style';
import { TypographyProps } from './type';

const variantsMap = {
	xl: xLargeVariant,
	l: largeVariant,
	l1: h1Variant,
	l2: h2Variant,
	l3: h3Variant,
	l4: h4Variant,
	l5: h5Variant,
	l6: h6Variant,
};

const fontWeightMap = {
	strong: 600,
	medium: 400,
	light: 200,
};

const Typography: React.FC<TypographyProps> = (props: TypographyProps) => {
	const theme = useTheme();
	const {
		type, shade, colorType, children, style,
	} = props;
	const Component = type ? variantsMap[type] : Default;
	const fontWeight = shade ? fontWeightMap[shade] : fontWeightMap.light;
	let color;
	if (colorType === 'error') {
		color = theme.error;
	} else {
		color = colorType ? theme.text[colorType] : theme.text.primary;
	}
	return (
		<Component
			color={color}
			fontWeight={fontWeight}
			style={{ ...style }}
		>
			{children}
		</Component>
	);
};

export default Typography;
