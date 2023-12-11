import React, {useState} from 'react';
import data from './student.json'; 
import './TableOne.css'
import TableTwo from './TableTwo'

function TableOne() {

    const [selectedRow, setSelectedRow] = useState(null)

    const handleRowClick = (sNo) =>{
        setSelectedRow(sNo)
    }

  return (
    <div style={{display: 'flex'}}>
        <div className='table__container'>
            <table className='table__one'>
                <thead>
                    <tr>
                        <th>S.No</th>
                        <th>Name</th>
                        <th>Gender</th>
                    </tr>
                </thead>
                <tbody>
                    {data.students.map((student) => (
                        <tr key={student.SNo} onClick={() => handleRowClick(student.SNo)} style={{cursor: 'pointer'}}>
                            <td>{student.SNo}</td>
                            <td>{student.Name}</td>
                            <td>{student.Gender}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        <div className="table__container">
            <TableTwo
                selectedRowData={
                        selectedRow ? data.students.find((student) => student.SNo === selectedRow) : null
                }
            />
        </div>
    </div>
  );
}

export default TableOne;


