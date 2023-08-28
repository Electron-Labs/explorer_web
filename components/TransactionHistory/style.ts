import styled from '@emotion/styled';

export const Container = styled.div`
	background: ${(props) => props.theme.background.card};
	border-radius: 28px;
	padding: 36px 24px;
`;

export const TableContainer = styled.div`
	width: 100%;
	height: 100%;
	text-align: left;
	overflow-y: auto;
	position: relative;
`;

export const TableRow = styled.tr`
	cursor: pointer;
	&:hover {
		background: ${(props) => props.theme.background.base};
	}
`;

export const StyledTable = styled.table`
	width: 1400px;
	border-spacing: 0px;
`;

export const TableHead = styled.thead`
	height: 72px;
`;

export const TableHeadChild = styled.th`
	padding: 18px 24px;
`;

export const TableData = styled.td`
	padding: 18px 24px;
	height: 48px;
`;

export const ButtonContainer = styled.div`
	background: #353B41;
	box-shadow: 0px -0.65378px 15.6907px rgba(0, 0, 0, 0.25);
	border-radius: 8px;
	padding: 8px 12px;
	display: flex;
	align-items: center;
	margin-top: 24px;
	width: fit-content;
	margin-bottom: 24px;
	& .ant-switch-checked {
		background-color: #586AF5 !important;
	}
	& .ant-switch-checked:focus {
		box-shadow: none;
	}
`;

export const LoaderWrapper = styled.div`
	text-align: center;
	padding: 48px 0px;
`;

export const TransactionHashWrapper = styled.div`
	display: flex;
	grid-gap: 8px;
	align-items: center;
`;

export const AssetWrapper = styled.div`
	display: grid;
	grid-template-columns: auto 1fr;
	grid-gap: 8px;
`;

export const PaginationWrapper = styled.div`
	text-align: center;
	margin-top: 12px;
	& .ant-pagination > li > button {
		border: 1px solid #29313D !important;
		color: ${(props) => props.theme.text.primary};
	}
	& .ant-pagination > li > button:hover {
		border-color: #000;
	}
	& .ant-pagination-item {
		color: ${(props) => props.theme.text.primary};
		border: 1px solid #29313D;
	}
	& .ant-pagination-item-active {
		background: transparent;
		border: 1px solid #1677ff;
	}
	& .ant-pagination-item-active > a {
		color: #1677ff !important;
	}
	& .ant-pagination-item > a {
		color: ${(props) => props.theme.text.primary};
	}
`;
