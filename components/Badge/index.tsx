import React from 'react';

import Typography from '../Typography';
import { Container } from './style';
import { BadgeProps } from './type';

const colorMap = {
	success: '#00DBB6',
	error: '#E03232',
	warning: '#FFC400',
};

const Badge: React.FC<BadgeProps> = (props: BadgeProps) => {
	const { label, type, style } = props;
	return (
		<Container backgroundColor={colorMap[type]} style={style}>
			<Typography type="l6" shade="strong" style={{ color: colorMap[type] }}>
				{label}
			</Typography>
		</Container>
	);
};

export default Badge;
