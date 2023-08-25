import React from 'react';

export interface TypographyProps {
  children: React.ReactNode
  type?: 'xl' | 'l' | 'l1' | 'l2' | 'l3' | 'l4' | 'l5' | 'l6' | 'l7'
  shade?: 'strong' | 'medium' | 'light'
  colorType?: 'primary' | 'secondary' | 'tertiary' | 'active' | 'error'
  style?: React.CSSProperties
  onClick?: Function,
}
