import React, { AnchorHTMLAttributes, ButtonHTMLAttributes } from 'react';
import classnames from "classnames";

export enum ButtonSize {
  Large = 'lg',
  Small = 'sm',
}
export enum ButtonType {
  Primary = 'primary',
  Default = 'default',
  Danger = 'danger',
  Link = 'link',
}
interface BaseButtonProps {
  className?: string;
  disabled?: boolean;
  size?: ButtonSize;
  btnType?: ButtonType;
  children?: React.ReactNode;
  href?: string;
}
type NativeButtonProps = BaseButtonProps & ButtonHTMLAttributes<HTMLElement>;
type AnchorButtonProps = BaseButtonProps & AnchorHTMLAttributes<HTMLElement>;
export type IButtonProps = Partial<NativeButtonProps & AnchorButtonProps>;

const Button: React.FC<IButtonProps> = (props) => {
  const { btnType, disabled, size, children, href, className, ...restProps } = props;
  const classes = classnames('btn', className, {
    [`btn-${btnType}`]: btnType,
    [`btn-${size}`]: size,
    'disabled': (btnType === ButtonType.Link) && disabled,
  });
  if (btnType === ButtonType.Link && href) {
    return (
      <a className={classes} href={href} {...restProps}>{children}</a>
    )
  } else {
    return (
      <button className={classes} disabled={disabled} {...restProps}>{children}</button>
    )
  }
}

Button.defaultProps = {
  disabled: false,
  btnType: ButtonType.Default,
}

export default Button;
