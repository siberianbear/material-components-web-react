// The MIT License
//
// Copyright (c) 2018 Google, Inc.
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.
import * as React from 'react';
import * as classnames from 'classnames';

export interface ListItemTextProps {
  tabbableOnListItemFocus?: boolean,
  tabIndex?: number,
  className?: string,
  primaryText?: React.ReactNode,
  secondaryText?: React.ReactNode,
  childrenTabIndex?: number
};

const ListItemText:React.FunctionComponent<ListItemTextProps> = ({
  /* eslint-disable react/prop-types */
  primaryText = '',
  secondaryText ='',
  tabbableOnListItemFocus = false,
  tabIndex = -1,
  className = '',
  /* eslint-enable react/prop-types */
  ...otherProps
}) => {
  const renderText = (text, className) => {
    if (typeof text === 'string') {
      return (
        <span
          className={className}
          tabIndex={tabbableOnListItemFocus ? tabIndex : -1}
        >
          {text}
        </span>
      );
    }
    const {className: textClassName, ...otherProps} = text.props;
    const props = Object.assign(
      {
        className: classnames(className, textClassName),
      },
      ...otherProps
    );
    return React.cloneElement(text, props);
  };

  if (!secondaryText) {
    return renderText(
      primaryText,
      classnames('mdc-list-item__text', className)
    );
  }

  return (
    <span
      className={classnames('mdc-list-item__text', className)}
      tabIndex={tabbableOnListItemFocus ? tabIndex : -1}
      {...otherProps}
    >
      {renderText(primaryText, 'mdc-list-item__primary-text')}
      {renderText(secondaryText, 'mdc-list-item__secondary-text')}
    </span>
  );
};

export default ListItemText;