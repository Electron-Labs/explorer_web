import styled from '@emotion/styled';

export const Container = styled.div`
  font-family: Inter;
`;

export const Default = styled.span`
  font-weight: ${(props : {fontWeight: number}) => props.fontWeight};
  color: ${(props) => props.color};
`;

export const xLargeVariant = styled.h1`
  font-size: 48px;
  font-weight: ${(props : {fontWeight: number}) => props.fontWeight};
  color: ${(props) => props.color};
`;

export const largeVariant = styled.h1`
  font-size: 36px;
  font-weight: ${(props : {fontWeight: number}) => props.fontWeight};
  color: ${(props) => props.color};
`;

export const h1Variant = styled.h1`
  font-size: 32px;
  font-weight: ${(props : {fontWeight: number}) => props.fontWeight};
  color: ${(props) => props.color};
`;

export const h2Variant = styled.h2`
  font-size: 24px;
  font-weight: ${(props : {fontWeight: number}) => props.fontWeight};
  color: ${(props) => props.color};
`;

export const h3Variant = styled.h3`
  font-size: 18px;
  font-weight: ${(props : {fontWeight: number}) => props.fontWeight};
  color: ${(props) => props.color};
`;

export const h4Variant = styled.h4`
  font-size: 16px;
  font-weight: ${(props : {fontWeight: number}) => props.fontWeight};
  color: ${(props) => props.color};
`;

export const h5Variant = styled.h5`
  font-size: 14px;
  font-weight: ${(props : {fontWeight: number}) => props.fontWeight};
  color: ${(props) => props.color};
`;

export const h6Variant = styled.h6`
  font-size: 12px;
  font-weight: ${(props : {fontWeight: number}) => props.fontWeight};
  color: ${(props) => props.color};
`;
