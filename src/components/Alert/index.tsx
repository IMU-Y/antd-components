import React, { useState } from 'react';
import classNames from "classnames";
import Icon from '../Icon';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
library.add(fas);
export enum AlertType {
  Success = "success",
  Default = "default",
  Warning = "warning",
  Danger = "danger"
}
interface BaseAlertProps {
  /**标题 */
  title: string;
  /**描述 */
  description?: string;
  className?: string;
  /**类型 四种可选 针对四种不同的场景 */
  type?: AlertType;
  /**关闭alert时触发的事件 */
  onClose: () => void;
  /**是否显示关闭图标 */
  closeable: boolean;
}
type NativeDivProps = BaseAlertProps & React.BaseHTMLAttributes<HTMLElement>
export type IAlertProps = Partial<NativeDivProps>;// 改为可选

const Alert: React.FC<IAlertProps> = (props) => {
  const { className, type, title, description, closeable, ...restProps } = props;
  const [isClose, setClose] = useState<boolean>(false);
  const classes = classNames('alert', className, {
    [`alert-${type}`]: type,
    'is-close': isClose,
  });
  const iconClasses = classNames('antd-alert-close', {
    'alert-close': closeable
  })
  const titleClasses = classNames('antd-alert-title', {
    'bold-title': description
  })
  return (
    <div className={classes} {...restProps}>
      <span className={titleClasses}>{title}</span>
      {description && <p className='antd-alert-desc'>{description}</p>}
      <span className={iconClasses} onClick={() => { setClose(true); }}>
        <Icon icon="xmark" />
      </span>
    </div>
  )
}

Alert.defaultProps = {
  type: AlertType.Default,
}

export default Alert;
