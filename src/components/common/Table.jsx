import React from 'react';
import '../../assets/styles/Common.css';

/**
 * Komponentii Table data agarsiisuuf.
 * @param {object} props
 * @param {Array<{header: string, accessor: string}>} props.columns - Mata duree tarree
 * @param {Array<object>} props.data - Data agarsiifamu
 */
const Table = ({ columns, data }) => {
  return (
    <div className="table-wrapper">
      <table className="table">
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={col.accessor}>{col.header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {columns.map((col) => (
                <td key={col.accessor}>{row[col.accessor]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;