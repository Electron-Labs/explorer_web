/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { Spin, Tooltip, Pagination } from 'antd';
import { useTheme } from '@emotion/react';
import axios from 'axios';
import BigNumber from 'bignumber.js';
import { useRouter } from 'next/router';

import {
	StatusMap, CHAIN_EXPLORER_MAP, CHAIN_ICON_MAP, ChainId, TOKEN_CONTRACTS_ICON_MAP,
} from 'constant';
import { formatTransactionHash, isHexString } from 'utils';
import Typography from '../Typography';
import Badge from '../Badge';
import {
	Container,
	TableHead,
	TableHeadChild,
	TableData,
	StyledTable,
	TableContainer,
	LoaderWrapper,
	AssetWrapper,
	PaginationWrapper,
	TableRow,
} from './style';
import { Transaction } from './type';

const TableHeader = [{
	label: 'Status',
	key: 'status',
	style: { width: '80px' },
}, {
	label: 'Origin Time',
	key: 'sourceTime',
	style: { width: '120px' },
}, {
	label: 'Nonce',
	key: 'nonce',
	style: { width: '60px' },
}, {
	label: 'From',
	key: 'senderAddress',
	style: { width: '100px' },
}, {
	label: 'Source Txn',
	key: 'sourceTx',
	style: { width: '120px' },
}, {
	label: 'To',
	key: 'receiverAddress',
	style: { width: '100px' },
}, {
	label: 'Destination Txn',
	key: 'destinationTx',
	style: { width: '140px' },
}];

const PAGE_SIZE = 10;

const TransactionHistory: React.FC = () => {
	const theme = useTheme();
	const router = useRouter();
	const [currentPage, setCurrentPage] = useState<number>(1);
	const [totalTransactionItems, setTotalTransactionItems] = useState<number>(1);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [transactionList, setTransactionList] = useState<Array<Transaction>>([]);

	const getChain = (address: string) => {
		if (isHexString(address)) {
			return ChainId.ETHEREUM;
		}
		return ChainId.NEAR;
	};

	const formatAmount = (amount: string) => new BigNumber(amount.toString()).dividedBy(
		new BigNumber(10).exponentiatedBy(new BigNumber(6)),
	).toString();

	const fetchData = useCallback(async () => {
		try {
			const response = await axios.get(
				`${process.env.NEXT_PUBLIC_SERVER_URL}/list_transactions/?per_page=${PAGE_SIZE}&page_no=${currentPage - 1}`,
			);
			const list = response.data.transactions.map((item: any) => {
				const sourceChain = getChain(item.senderAddress);
				const destinationChain = getChain(item.receiverAddress);
				const tokenInfo = TOKEN_CONTRACTS_ICON_MAP[item.tokenAddressSource.toLowerCase()];
				return {
					...item,
					sourceChain,
					destinationChain,
					tokenIcon: tokenInfo?.icon,
					tokenName: tokenInfo?.name,
					amount: (+formatAmount(item.amount)).toLocaleString(),
					txSourceUrl: `${CHAIN_EXPLORER_MAP[sourceChain]}/${sourceChain === ChainId.NEAR ? 'transactions' : 'tx'}/${item.sourceTx}`,
					txDestinationUrl: `${CHAIN_EXPLORER_MAP[destinationChain]}/${destinationChain === ChainId.NEAR ? 'transactions' : 'tx'}/${item.destinationTx}`,
					senderExplorerUrl: `${CHAIN_EXPLORER_MAP[sourceChain]}/address/${item.senderAddress}`,
					receiverExplorerUrl: `${CHAIN_EXPLORER_MAP[destinationChain]}/address/${item.receiverAddress}`,
				};
			});
			setTransactionList(list);
			setTotalTransactionItems(response.data.total_transactions_count);
			setIsLoading(false);
		} catch (err) {
			setIsLoading(false);
			setTransactionList([]);
		}
	}, [currentPage]);

	useEffect(() => {
		setIsLoading(true);
		fetchData();
	}, [fetchData]);

	const formatTimestamp = (timestamp: string) => {
		const dateTime = new Date(timestamp).toUTCString();
		const timePattern = /(?:[01]?[0-9]|2[0-3]):[0-5]?[0-9]?/;
		const utcTime = dateTime?.match(timePattern);
		return {
			date: utcTime ? dateTime.split(utcTime[0])[0] : '',
			time: utcTime,
		};
	};

	const handlePagination = (page: number) => {
		setCurrentPage(page);
	};

	const navigateUrl = (url: string) => (event: React.SyntheticEvent) => {
		event?.stopPropagation();
		window.open(url, '_blank');
	};

	return (
		<>
			<Typography shade="strong" type="l2" style={{ marginBottom: '48px' }}>
				Transaction Explorer
			</Typography>
			<Container>
				<div style={{ paddingLeft: '24px', marginBottom: '16px' }}>
					<Typography shade="strong" type="l4" style={{ color: theme.text.secondary }}>
						Recent Transactions
					</Typography>
				</div>
				<TableContainer>
					<StyledTable>
						<TableHead>
							<tr>
								{TableHeader.map((item: { key: string, label: string, style: object}) => (
									<TableHeadChild
										key={item.key}
										style={item.style}
									>
										<Typography
											type="l4"
											shade="medium"
											style={{ ...item.style, color: theme.text.secondary }}
										>
											{item.label}
										</Typography>
									</TableHeadChild>

								))}
							</tr>
						</TableHead>
						<tbody>
							{!isLoading && (
								transactionList.map((item) => (
									<TableRow
										key={item.sourceTx}
										onClick={(event: React.SyntheticEvent) => {
											event.stopPropagation();
											router.push(`/?nonce=${item.nonce}&source=${item.sourceChain.toLowerCase()}`);
										}}
									>
										<TableData>
											<Badge label={item.status} type={StatusMap[item.status.toLowerCase()]} />
										</TableData>
										<TableData>
											<Typography
												type="l5"
												shade="strong"
											>
												{formatTimestamp(item.sourceTime).date}
											</Typography>
											<Typography
												type="l6"
												shade="medium"
												style={{ color: theme.text.secondary }}
											>
												{formatTimestamp(item.sourceTime).time}
												{' '}
												UTC
											</Typography>
										</TableData>
										<TableData>
											<Typography
												type="l5"
												shade="medium"
											>
												{item.nonce}
											</Typography>
										</TableData>
										<TableData>
											<div
												style={{
													display: 'flex',
													alignItems: 'center',
													gridGap: '8px',
												}}
											>
												<Image
													src={CHAIN_ICON_MAP[item.sourceChain].url}
													alt={CHAIN_ICON_MAP[item.sourceChain].alt}
													height={24}
													width={24}
												/>
												<div onClick={navigateUrl(item.senderExplorerUrl)} tabIndex={0} role="button">
													<Typography
														type="l5"
														shade="strong"
														style={{ color: theme.text.active }}
													>
														<Tooltip title={item.senderAddress} placement="bottom">
															{formatTransactionHash(item.senderAddress)}
														</Tooltip>
													</Typography>
												</div>
											</div>
										</TableData>
										<TableData>
											<AssetWrapper>
												<Image
													src={item.tokenIcon?.url}
													alt={item.tokenIcon?.alt}
													height={24}
													width={24}
												/>
												<div style={{
													lineHeight: '18px', whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden',
												}}
												>
													<Typography
														type="l5"
														shade="medium"
														style={{ whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}
													>
														{item.amount}
														{' '}
														{item.tokenName}
													</Typography>
													<Tooltip title={item.sourceTx} placement="bottom">
														<div onClick={navigateUrl(item.txSourceUrl)} tabIndex={0} role="button">
															<Typography
																type="l5"
																shade="medium"
																style={{ color: theme.text.active }}
															>
																{formatTransactionHash(item.sourceTx)}
															</Typography>
														</div>
													</Tooltip>
												</div>
											</AssetWrapper>
										</TableData>
										<TableData>
											<div
												style={{
													display: 'flex',
													alignItems: 'center',
													gridGap: '8px',
												}}
											>
												<Image
													src={CHAIN_ICON_MAP[item.destinationChain].url}
													alt={CHAIN_ICON_MAP[item.destinationChain].alt}
													height={24}
													width={24}
												/>
												<div onClick={navigateUrl(item.receiverExplorerUrl)} tabIndex={0} role="button">
													<Typography
														type="l5"
														shade="strong"
														style={{ color: theme.text.active }}
													>
														<Tooltip title={item.receiverAddress} placement="bottom">
															{formatTransactionHash(item.receiverAddress)}
														</Tooltip>
													</Typography>
												</div>
											</div>
										</TableData>
										<TableData>
											<AssetWrapper>
												<Image
													src={item.tokenIcon?.url}
													alt={item.tokenIcon?.alt}
													height={24}
													width={24}
												/>
												<div style={{
													lineHeight: '18px', whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden',
												}}
												>
													<Typography
														type="l5"
														shade="medium"
														style={{ whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}
													>
														{item.amount}
														{' '}
														{item.tokenName}
													</Typography>
													<Tooltip title={item.destinationTx} placement="bottom">
														<div onClick={navigateUrl(item.txDestinationUrl)} tabIndex={0} role="button">
															<Typography
																type="l5"
																shade="medium"
																style={{ color: theme.text.active }}
															>
																{formatTransactionHash(item.destinationTx)}
															</Typography>
														</div>
													</Tooltip>
												</div>
											</AssetWrapper>
										</TableData>
									</TableRow>
								))
							)}
							{isLoading && (
								<tr>
									<td colSpan={7}>
										<LoaderWrapper>
											<Spin />
										</LoaderWrapper>
									</td>

								</tr>
							)}
							{!transactionList?.length && !isLoading && (
								<tr>
									<td colSpan={7}>
										<LoaderWrapper>
											<Typography
												type="l4"
												shade="strong"
												style={{ color: theme.text.secondary }}
											>
												No records found
											</Typography>
										</LoaderWrapper>
									</td>
								</tr>
							)}
						</tbody>
					</StyledTable>
				</TableContainer>
				<PaginationWrapper>
					<Pagination
						defaultCurrent={1}
						current={currentPage}
						total={totalTransactionItems}
						pageSize={PAGE_SIZE}
						onChange={handlePagination}
					/>
				</PaginationWrapper>
			</Container>
		</>
	);
};

export default TransactionHistory;
