import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import { Icons } from '@/constant/images';
import Button from './index';

describe('<Button />', () => {
	test('renders component without errors', () => {
		expect(() => render(<Button>buttonText</Button>)).not.toThrowError();
	});

	test('render component with icon', () => {
		const buttonProps = {
			iconURL: Icons.ALERT.url,
			altText: Icons.ALERT.alt,
			style: {},
		};
		const buttonText = 'button';
		render(<Button {...buttonProps}>{buttonText}</Button>);
		const button = screen.getByText(buttonText);
		expect(button).toBeInTheDocument();
	});

	test('fire button click event', () => {
		const mockClick = jest.fn();
		const buttonText = 'button';
		render(<Button onClick={mockClick}>{buttonText}</Button>);
		const button = screen.getByText(buttonText);
		expect(() => fireEvent.click(button)).not.toThrowError();
		expect(mockClick).toBeCalledTimes(1);
	});

	test('check disabled button', () => {
		const buttonText = 'button';
		render(<Button disable>{buttonText}</Button>);
		expect(screen.getByText(buttonText).closest('button')).toBeDisabled();
	});
});
