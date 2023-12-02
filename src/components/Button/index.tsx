import React, { AnchorHTMLAttributes, ButtonHTMLAttributes } from 'react';
import classnames from "classnames";
interface BaseButtonProps {
  className?: string;
  /**
    * 设置 Button 的禁用
  */
  disabled?: boolean;
  /**
    * 设置 Button 的大小
  */
  size?: 'lg' | 'sm';
  /**
    * 设置 Button 的类型
  */
  btnType?: 'primary' | 'default' | 'danger' | 'link';
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
    'disabled': (btnType === 'link') && disabled,
  });
  if (btnType === 'link' && href) {
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
  btnType: 'default',
}

export default Button;
