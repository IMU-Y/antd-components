import React, { useState, ChangeEvent, ReactElement, useEffect, KeyboardEvent, useRef } from 'react';
import classNames from 'classnames';
import Input, { InputProps } from '../Input';
import Transition from '../Transition';
import Icon from '../Icon';
import useClickOutside from '../../hooks/useClickOutside';
import useDebounce from '../../hooks/useDebounce';

// 使用泛型定义下拉数据结构
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type DataSourceType<T = any> = T & { value: string }
// 继承属性中二者有重复属性，忽略掉父属性
export interface IInputSelectProps extends Omit<InputProps, 'onSelect'> {
  /**根据input中的值获取下拉框中的值 */
  fetchDropdownList: (input: string) => DataSourceType[] | Promise<DataSourceType[]>;
  /**用户自定义下拉项渲染模板 */
  renderOption?: (item: DataSourceType) => ReactElement;
  onSelect?: (item: DataSourceType) => void;
}

const InputSelect: React.FC<IInputSelectProps> = (props) => {
  const { fetchDropdownList, onSelect, renderOption, ...restProps } = props;
  const [inputValue, setInputValue] = useState<string>("");
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const [dropdownList, setDropdownList] = useState<DataSourceType[]>([]);
  const [highlightIndex, setHighlightIndex] = useState<number>(-1);
  const [loading, setLoading] = useState<boolean>(false);
  const componentRef = useRef<HTMLDivElement>(null);
  const triggerSearch = useRef(false);
  const debouncedValue = useDebounce(inputValue, 300);
  useClickOutside(componentRef, () => {
    setShowDropdown(false);
  });
  // 点击item选中下拉项时调用
  const handleSelectedItem = (item: DataSourceType, index: number) => {
    setHighlightIndex(index);
    setInputValue(item.value);
    setShowDropdown(false);
    if (onSelect) {
      onSelect(item);
    }
    triggerSearch.current = false;
  }
  const renderDropdownItem = (item: DataSourceType) => {
    return renderOption ? renderOption(item) : item.value;
  }
  const getData = () => {
    if (triggerSearch.current && debouncedValue) {
      const res = fetchDropdownList(debouncedValue);
      if (res instanceof Promise) {
        try {
          setLoading(true);
          res.then(data => {
            setDropdownList(data);
            if (data.length > 0) {
              setShowDropdown(true);
            }
          })
        } finally {
          setLoading(false);
        }
      } else {
        setDropdownList(res);
        if (res.length > 0) {
          setShowDropdown(true);
        }
      }
      setHighlightIndex(-1);
    }
  }
  // 输入框中的值发生变化时调用
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    triggerSearch.current = true;
  }
  // 键盘事件
  const handleKeydown = (e: KeyboardEvent<HTMLInputElement>) => {
    switch (e.keyCode) {
      // 回车
      case 13:
        if (dropdownList[highlightIndex]) {
          handleSelectedItem(dropdownList[highlightIndex], highlightIndex);
        }
        break;
      // 上
      case 38:
        setHighlightIndex(highlightIndex - 1);
        break;
      // 下
      case 40:
        setHighlightIndex(highlightIndex + 1);
        break;
      // esc
      case 27:
        setShowDropdown(false)
        break;
      default:
        break;
    }
  }
  useEffect(() => {
    getData();
  }, [debouncedValue, fetchDropdownList]);

  const generateDropdown = () => {
    return (
      <Transition
        in={showDropdown}
        animation="zoom-in-top"
        timeout={300}
      >
        <ul className='antd-dropdown-list'>
          {loading &&
            <div className="suggstions-loading-icon">
              <Icon icon="spinner" spin />
            </div>
          }
          {!loading && dropdownList?.map((item, index) => {
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
    <div className='antd-input-select' ref={componentRef}>
      <Input value={inputValue} {...restProps} onChange={handleChange} onKeyDown={handleKeydown}></Input>
      {generateDropdown()}
    </div>
  )
}

export default InputSelect;
