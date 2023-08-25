import styled from '@emotion/styled';
import { Button } from 'antd';

export const StyledButton = styled(Button)`
  position: relative;
  width: 168px;
  height: 48px;
  border-radius: 14px;
  font-size: 12px;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: initial;
  line-height: 16px;
  grid-gap: 8px;
  border: none;
  &:hover {
    opacity: 0.7;
  }
  &:active {
    color: #fff;
  }
  &:focus {
    color: #fff;
  }
`;
