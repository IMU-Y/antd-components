import React, { useState, ChangeEvent, ReactElement, useEffect } from 'react';
import classNames from 'classnames';
import Input, { InputProps } from '../Input';
import Transition from '../Transition';

// 使用泛型定义下拉数据结构
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type DataSourceType<T = any> = T & { value: string }
// 继承属性中二者有重复属性，忽略掉父属性
export interface IInputSelectProps extends Omit<InputProps, 'onSelect'> {
  /**根据input中的值获取下拉框中的值 */
  fetchDropdownList: (input: string) => DataSourceType[];
  /**用户自定义下拉项渲染模板 */
  renderOption?: (item: DataSourceType) => ReactElement;
  onSelect?: (item: DataSourceType) => void;
}

const InputSelect: React.FC<IInputSelectProps> = (props) => {
  const { fetchDropdownList, onSelect, renderOption, ...restProps } = props;
  const [inputValue, setInputValue] = useState<string>("");
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const [dropdownList, setDropdownList] = useState<DataSourceType[]>();
  const [highlightIndex, setHighlightIndex] = useState<number>(-1);

  // 点击item选中下拉项时调用
  const handleSelectedItem = (item: DataSourceType, index: number) => {
    setHighlightIndex(index);
    setInputValue(item.value);
    setShowDropdown(false);
    if (onSelect) {
      onSelect(item)
    }
  }
  const renderDropdownItem = (item: DataSourceType) => {
    return renderOption ? renderOption(item) : item.value;
  }
  const getData = (input = inputValue) => {
    const res = fetchDropdownList(input);
    if (res.length > 0) {
      setShowDropdown(true);
    }
    setDropdownList(res);
    setHighlightIndex(-1);
  }
  // 输入框中的值发生变化时调用
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    getData(e.target.value);
  }
  useEffect(() => {
    getData();
  }, [fetchDropdownList]);

  const generateDropdown = () => {
    return (
      <Transition
        in={showDropdown}
        animation="zoom-in-top"
        timeout={300}
      >
        <ul className='antd-dropdown-list'>
          {dropdownList?.map((item, index) => {
            const cnames = classNames('antd-dropdown-item', {
              'is-active': index === highlightIndex
            })
            return (
              <li key={index} className={cnames} onClick={() => { handleSelectedItem(item, index) }}>
                {renderDropdownItem(item)}
              </li>
            )
          })}
        </ul>
      </Transition>
    )
  }
  return (
    <div className='antd-input-select'>
      <Input value={inputValue} {...restProps} onChange={handleChange} ></Input>
      {generateDropdown()}
    </div>
  )
}

export default InputSelect;
