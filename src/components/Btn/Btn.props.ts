import { ButtonHTMLAttributes, DetailedHTMLProps, ReactNode } from 'react';

export interface BtnProps
  extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  children: ReactNode;
  appearence: 'primary' | 'ghost';
  arrow?: 'rigtht' | 'down' | 'none';
}
