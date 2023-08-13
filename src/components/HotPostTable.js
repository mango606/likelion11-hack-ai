import React from 'react';

const HotPostTable = props => {
  const { headersName, children } = props;

  return (
    <table className="hot-table">
      <thead>
        <tr>
          {
            headersName.map((item, index) => {
              return (
                <td className="hot-table-header-column" key={index}>{ item }</td>
              )
            })
          }
        </tr>
      </thead>
      <tbody>
        {
          children
        }
      </tbody>
    </table>
  )
}

export default HotPostTable;