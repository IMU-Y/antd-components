import React, { FC } from 'react';
import { ThemeProps } from '../Icon';
export interface IProgressProps {
  // 百分比数字
  percent: number;
  strokeHeight?: number;
  /**是否显示数值 */
  showText?: boolean;
  styles?: React.CSSProperties;
  // 主题样式
  theme?: ThemeProps;
}

const Progress: FC<IProgressProps> = (props) => {
  const { percent, strokeHeight, showText, styles, theme } = props;
  return (
    <div className="antd-progress-bar" style={styles}>
      <div className="antd-progress-bar-outer" style={{ height: `${strokeHeight}px` }}>
        <div
          className={`antd-progress-bar-inner color-${theme}`}
          style={{ width: `${percent}%` }}
        >
          {showText && <span className="inner-text">{`${percent}%`}</span>}
        </div>
      </div>
    </div>
  )
}

Progress.defaultProps = {
  strokeHeight: 13,
  showText: true,
  theme: "primary",
}
export default Progress;
