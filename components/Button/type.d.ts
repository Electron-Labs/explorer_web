import React from 'react';

export interface ButtonProps {
  children: React.ReactNode
  onClick?: React.MouseEventHandler<HTMLElement>
  type?: 'primary' | 'secondary' | 'error'
  iconURL?: string,
  altText?: string,
  disable?: boolean,
  style?: React.CSSProperties,
  ref?: React.Ref<HTMLElement> | undefined
  isLoading?: boolean,
}
