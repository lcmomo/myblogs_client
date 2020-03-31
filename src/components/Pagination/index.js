import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Pagination } from 'antd'
 function WebPagination({ total, current, onChange, pageSize, windowWidth }) {
  return (
    <div className='app-pagination'>
       <Pagination
        hideOnSinglePage
        current={current}
        onChange={onChange}
        total={total}
        pageSize={pageSize}
        simple={windowWidth < 736}
      />
    </div>
  )
}

WebPagination.propTypes = {
  total: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
  current: PropTypes.number.isRequired,
  pageSize: PropTypes.number
}

WebPagination.defaultProps = {
  pageSize: 10
}

export default connect(({init}) => ({
  windowWidth: init.windowWidth
}))(WebPagination)