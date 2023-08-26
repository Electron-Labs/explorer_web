import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import axios from 'axios';
import { Divider, Tooltip, Spin } from 'antd';
import { useTheme } from '@emotion/react';
import BigNumber from 'bignumber.js';

import { Icons } from 'constant/images';
import { isHexString } from 'utils';
import {
	StatusMap, CHAIN_EXPLORER_MAP, ChainId, TOKEN_CONTRACTS_ICON_MAP, CHAIN_ICON_MAP,
} from 'constant';
import Typography from '../Typography';
import Badge from '../Badge';
import {
	Container, Header, DetailWrapper, AssetWrapper, Grid, LoaderWrapper,
} from './style';
import { Transaction } from './type';

const TransactionDetail: React.FC = () => {
	const theme = useTheme();
	const router = useRouter();
	const [transactionDetail, setTransactionDetail] = useState<Transaction | null>();
	const [isLoading, setIsLoading] = useState(false);

	const formatAmount = (amount: string) => new BigNumber(amount.toString()).dividedBy(
		new BigNumber(10).exponentiatedBy(new BigNumber(6)),
	).toString();

	const getChain = (address: string) => {
		if (isHexString(address)) {
			return ChainId.ETHEREUM;
		}
		return ChainId.NEAR;
	};

	useEffect(() => {
		const fetchData = async () => {
			try {
				const { query } = router;
				const response = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/transaction/?nonce=${query.nonce}&source=${query.source}`);
				console.log(response.data);
				const sourceChain = getChain(response.data.senderAddress);
				const destinationChain = getChain(response.data.receiverAddress);
				const tokenInfo = TOKEN_CONTRACTS_ICON_MAP[response.data.tokenAddressSource.toLowerCase()];
				setTransactionDetail({
					...response.data,
					sourceChain,
					destinationChain,
					tokenIcon: tokenInfo?.icon,
					tokenName: tokenInfo?.name,
					amount: (+formatAmount(response.data.amount)).toLocaleString(),
				});
				setIsLoading(false);
			} catch {
				setTransactionDetail(null);
				setIsLoading(false);
			}
		};
		setIsLoading(true);
		fetchData();
	}, [router]);

	const formatTimestamp = (timestamp: string) => {
		const dateTime = new Date(timestamp).toUTCString();
		const timePattern = /(?:[01]?[0-9]|2[0-3]):[0-5]?[0-9]?/;
		const utcTime = dateTime?.match(timePattern);
		return {
			date: utcTime ? dateTime.split(utcTime[0])[0] : '',
			time: `${utcTime} UTC`,
		};
	};

	const formatElapsedTime = (timestamp: number | undefined) => {
		if (!timestamp) {
			return '0 s';
		}
		let timeString = '';
		let stringAddCounter = 0;
		const days = Math.floor(timestamp / (1000 * 3600 * 24));
		const hours = Math.floor(timestamp / (1000 * 3600)) - days * 24;
		const minutes = Math.floor(timestamp / (1000 * 60)) - (hours * 60 + days * 24 * 60);
		const seconds = Math.floor(timestamp / (1000)) - (
			minutes * 60 + hours * 3600 + days * 24 * 3600
		);
		if (days > 0 && stringAddCounter < 2) {
			timeString = timeString.concat(days ? `${days} days ` : '');
			stringAddCounter += 1;
		}
		if (hours > 0 && stringAddCounter < 2) {
			timeString = timeString.concat(hours ? `${hours} hr ` : '');
			stringAddCounter += 1;
		}
		if (minutes > 0 && stringAddCounter < 2) {
			timeString = timeString.concat(minutes ? `${minutes} mins ` : '');
			stringAddCounter += 1;
		}
		if (seconds > 0 && stringAddCounter < 2) {
			timeString = timeString.concat(seconds ? `${seconds} sec ` : '');
			stringAddCounter += 1;
		}
		return `${timeString}`;
	};

	const timeDifference = (start: string, end: string) => {
		const startTimestamp = new Date(start).getTime();
		const endTimestamp = new Date(end).getTime();
		return endTimestamp - startTimestamp;
	};

	const handleCopy = (text: string) => {
		window.navigator.clipboard.writeText(text);
	};

	const handleBack = () => {
		router.push('/');
	};

	return (
		<Container>
			<Header>
				<Image
					src={Icons.BACK.url}
					alt={Icons.BACK.alt}
					height={18}
					width={18}
					onClick={handleBack}
					style={{ cursor: 'pointer' }}
				/>
				<Typography shade="strong" type="l1">
					Transaction Details
					{' '}
					{transactionDetail?.nonce
						? ` | #${transactionDetail.nonce}` : ''}
				</Typography>
			</Header>
			<DetailWrapper>
				{
					transactionDetail && !isLoading && (
						<>
							<Grid>
								<Typography shade="medium">
									Status:
								</Typography>
								<Badge
									label={transactionDetail.status}
									type={StatusMap[transactionDetail.status.toLowerCase()]}
									style={{ width: '92px' }}
								/>
								<Typography shade="medium">
									Nonce:
								</Typography>
								<Typography shade="medium">
									{transactionDetail.nonce}
								</Typography>
								<Typography shade="medium">
									Confirmed in:
								</Typography>
								<Typography shade="medium">
									{formatElapsedTime(
										timeDifference(
											transactionDetail.sourceTime,
											transactionDetail.destinationTime,
										),
									)}
								</Typography>
							</Grid>
							<Divider style={{ background: theme.text.secondary }} />
							<Typography type="l5" shade="strong" style={{ marginBottom: '24px' }}>
								SOURCE
							</Typography>
							<Grid>
								<Typography shade="medium">
									Timestamp:
								</Typography>
								<div style={{ display: 'flex', alignItems: 'center', gridGap: '4px' }}>
									<Typography shade="medium">
										{formatElapsedTime(
											timeDifference(
												transactionDetail.sourceTime,
												new Date().toString(),
											),
										)}
										{' ago'}
												&nbsp;
												&nbsp;
									</Typography>
									<Typography shade="medium">
										{formatTimestamp(transactionDetail.sourceTime).date}
									</Typography>
									<Typography shade="medium" type="l5" style={{ color: theme.text.secondary }}>
										{formatTimestamp(transactionDetail.sourceTime).time}
									</Typography>
								</div>
								<Typography shade="medium">
									Chain:
								</Typography>
								<div
									style={{
										display: 'flex',
										alignItems: 'center',
										gridGap: '8px',
									}}
								>
									<Image
										src={CHAIN_ICON_MAP[transactionDetail.sourceChain].url}
										alt={CHAIN_ICON_MAP[transactionDetail.sourceChain].alt}
										height={24}
										width={24}
									/>
									<Typography>
										{transactionDetail.sourceChain}
									</Typography>
								</div>
								<Typography shade="medium">
									Sender:
								</Typography>
								<Typography
									shade="medium"
									style={{
										display: 'flex',
										alignItems: 'center',
										gridGap: '8px',
										color: theme.text.active,
									}}
								>
									{transactionDetail.senderAddress}
									<Tooltip title="Copy" placement="bottom">
										<Image
											src={Icons.COPY.url}
											alt={Icons.COPY.alt}
											height={18}
											width={18}
											style={{ cursor: 'pointer' }}
											onClick={() => handleCopy(transactionDetail.senderAddress)}
										/>
									</Tooltip>
								</Typography>
								<Typography shade="medium">
									Asset:
								</Typography>
								<AssetWrapper>
									<Image
										src={transactionDetail.tokenIcon?.url}
										alt={transactionDetail.tokenIcon?.alt}
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
											{transactionDetail.amount}
											{' '}
											{transactionDetail.tokenName}
										</Typography>
									</div>
								</AssetWrapper>
								<Typography shade="medium">
									Transaction Hash:
								</Typography>
								<Typography
									shade="medium"
									style={{
										display: 'flex',
										alignItems: 'center',
										gridGap: '8px',
										color: theme.text.active,
									}}
								>
									<a href={`${CHAIN_EXPLORER_MAP[transactionDetail.sourceChain]}/${transactionDetail.sourceTx}`} target="_blank">
										{transactionDetail.sourceTx}
									</a>
									<Tooltip title="Copy" placement="bottom">
										<Image
											src={Icons.COPY.url}
											alt={Icons.COPY.alt}
											height={18}
											width={18}
											style={{ cursor: 'pointer' }}
											onClick={() => handleCopy(transactionDetail.sourceTx)}
										/>
									</Tooltip>
								</Typography>
							</Grid>
							<Divider style={{ background: theme.text.secondary }} />
							<Typography type="l5" shade="strong" style={{ marginBottom: '24px' }}>
								DESTINATION
							</Typography>
							<Grid>
								<Typography shade="medium">
									Timestamp:
								</Typography>
								<div style={{ display: 'flex', alignItems: 'center', gridGap: '4px' }}>
									<Typography shade="medium">
										{formatElapsedTime(
											timeDifference(
												transactionDetail.destinationTime,
												new Date().toString(),
											),
										)}
										{' ago'}
												&nbsp;
												&nbsp;
									</Typography>
									<Typography shade="medium">
										{formatTimestamp(transactionDetail.destinationTime).date}
									</Typography>
									<Typography shade="medium" type="l5" style={{ color: theme.text.secondary }}>
										{formatTimestamp(transactionDetail.destinationTime).time}
									</Typography>
								</div>
								<Typography shade="medium">
									Chain:
								</Typography>
								<div
									style={{
										display: 'flex',
										alignItems: 'center',
										gridGap: '8px',
									}}
								>
									<Image
										src={CHAIN_ICON_MAP[transactionDetail.destinationChain].url}
										alt={CHAIN_ICON_MAP[transactionDetail.destinationChain].alt}
										height={24}
										width={24}
									/>
									<Typography>
										{transactionDetail.destinationChain}
									</Typography>
								</div>
								<Typography shade="medium">
									Receiver:
								</Typography>
								<Typography
									shade="medium"
									style={{
										display: 'flex',
										alignItems: 'center',
										gridGap: '8px',
										color: theme.text.active,
									}}
								>
									{transactionDetail.receiverAddress}
									<Tooltip title="Copy" placement="bottom">
										<Image
											src={Icons.COPY.url}
											alt={Icons.COPY.alt}
											height={18}
											width={18}
											style={{ cursor: 'pointer' }}
											onClick={() => handleCopy(transactionDetail.receiverAddress)}
										/>
									</Tooltip>
								</Typography>
								<Typography shade="medium">
									Asset:
								</Typography>
								<AssetWrapper>
									<Image
										src={transactionDetail.tokenIcon?.url}
										alt={transactionDetail.tokenIcon?.alt}
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
											{transactionDetail.amount}
											{' '}
											{transactionDetail.tokenName}
										</Typography>
									</div>
								</AssetWrapper>
								<Typography shade="medium">
									Transaction Hash:
								</Typography>
								<Typography
									shade="medium"
									style={{
										display: 'flex',
										alignItems: 'center',
										gridGap: '8px',
										color: theme.text.active,
									}}
								>
									<a href={`${CHAIN_EXPLORER_MAP[transactionDetail.destinationChain]}/${transactionDetail.destinationTx}`} target="_blank">
										{transactionDetail.destinationTx}
									</a>
									<Tooltip title="Copy" placement="bottom">
										<Image
											src={Icons.COPY.url}
											alt={Icons.COPY.alt}
											height={18}
											width={18}
											style={{ cursor: 'pointer' }}
											onClick={() => handleCopy(transactionDetail.destinationTx)}
										/>
									</Tooltip>
								</Typography>
							</Grid>
						</>
					)
				}
				{ !transactionDetail && !isLoading
					&& (
						<div style={{ textAlign: 'center' }}>
							<Typography shade="strong" style={{ color: theme.text.secondary }}>No data</Typography>
						</div>
					)}
				{
					isLoading && (
						<LoaderWrapper>
							<Spin />
						</LoaderWrapper>
					)
				}
			</DetailWrapper>
		</Container>
	);
};

export default TransactionDetail;