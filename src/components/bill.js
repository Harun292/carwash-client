import React from 'react';

import PropTypes from 'prop-types';

const Bill = ({
    programs,
    price,
    date
}) => {
  return (
    
    <tr>
      <td className='column1 pointer'>{programs}</td>
      <td className='column2 pointer'>{price}</td>
      <td className='column2 pointer'>{date}</td>
    </tr>
  );
};

Bill.propTypes = {
    programs:PropTypes.string,
    price:PropTypes.number,
    date:PropTypes.string
};

export default Bill;
