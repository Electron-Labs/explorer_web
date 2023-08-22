export interface SwitchNetworkProps {
	isModalVisible: boolean
	handleModalVisibility: MouseEvent<HTMLElement, MouseEvent>
}

export interface HeaderProps {
	toggleTheme: MouseEvent<HTMLElement, MouseEvent>
	currentTheme: string
}
