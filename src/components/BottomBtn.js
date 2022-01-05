/*
 * @Descripttion: 
 * @Author: shendan
 * @Date: 2021-11-24 11:31:19
 * @LastEditors: shendan
 * @LastEditTime: 2021-11-24 11:49:22
 */
import React from 'react'
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const BottomBtn = ({ text, colorClass, icon, onBtnClick }) => (
  <button
    type="button"
    className={`btn btn-block no-border ${colorClass}`}
    onClick={onBtnClick}
    style={{width: '100%'}}
  >
    <FontAwesomeIcon
      className="mr-2"
      size="lg"
      icon={icon}
    />
    {text}
  </button>
)

BottomBtn.propTypes = {
  text: PropTypes.string,
  colorClass: PropTypes.string,
  icon: PropTypes.element.isRequired,
  onBtnClick: PropTypes.func
}

BottomBtn.defaultProps = {
  text: '新建'
}

export default BottomBtn