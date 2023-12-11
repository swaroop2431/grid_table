import {useState, useEffect} from 'react';
import subjectData from './subjects.json'

function TableTwo({ selectedRowData }) {

  const [selectedSubject, setSelectedSubject] = useState('');
  const [rows, setRows] = useState([])
  const [count, setCount] = useState(1)


  useEffect(() => {
    setRows([]);
    setCount(1);
  }, [selectedRowData]);


  const handleSubjectChange = (event) =>{
    setSelectedSubject(event.target.value);
  }

  const handleEducationChange = (e, index) =>{
    const {value} = e.target;
    const updatedRows = [...rows]
    updatedRows[index].Education = value
    updatedRows[index].Subject = subjectData[value]
    setRows(updatedRows)
  
  }

  
  const handleAddRow = () =>{
    const newRow = {
      SNo: `${selectedRowData.SNo}.${count}`,
      Name: '',
      Gender: '',
      MobileNo: '',
      Email: '',
      Education: '',
      Subject: ''
    }
    setRows([...rows, newRow])
    setCount(count+1)
  }

  const handleDeleteRow = () => {
    if (rows.length > 0) {
      const updatedRows = [...rows];
      updatedRows.pop();
      setRows(updatedRows);
      setCount(count - 1);
    }
  };


  const handleSaveData = () => {
    if(selectedRowData){
      console.log(rows)
      const saveData = JSON.stringify(rows);
      localStorage.setItem(`${selectedRowData.SNo}`, saveData)
    }
  };

  const handleInputChange = (e, index, field) => {
    const { value } = e.target;
    const updatedRows = [...rows];
    updatedRows[index][field] = value;
    setRows(updatedRows);

    const updatedSelectedRowData = {
      ...selectedRowData,
      [field]: value
    }
    localStorage.setItem(`${selectedRowData.SNo}`, JSON.stringify(updatedSelectedRowData));
  };

  
  return (
    <div>
      <table className='table__two'>
        <thead>
          <tr>
            <th>S.No</th>
            <th>Name</th>
            <th>Gender</th>
            <th>Mobile No</th>
            <th>Email</th>
            <th>Education</th>
            <th>Subjects</th>
          </tr>
        </thead>
        <tbody>
          {selectedRowData && (
            <tr key={selectedRowData.SNo}>
              <td>{selectedRowData.SNo}</td>
              <td>{selectedRowData.Name}</td>
              <td>{selectedRowData.Gender}</td>
              <td>{selectedRowData.MobileNo}</td>
              <td>{selectedRowData.Email}</td>
              <td>
                <select onChange={handleSubjectChange} value={selectedSubject}>
                  <option value="" selected disabled>Select</option>
                  {Object.keys(subjectData).map((key) => (
                    <option value={subjectData[key]} key={key}>{key}</option>
                  ))}
                </select>
              </td>
              <td>{selectedSubject}</td>
            </tr>
          )}
          {rows.map((row, i) =>(
            <tr key={i}>
              <td>{row.SNo}</td>
              <td><input type="text" value={row.Name} onChange={(e) => handleInputChange(e, i, 'Name')} /></td>              
              <td><input type="text" value={row.Gender} onChange={(e) => handleInputChange(e, i, 'Gender')} /></td>              
              <td><input type="text" value={row.MobileNo} onChange={(e) => handleInputChange(e, i, 'MobileNo')} /></td>              
              <td><input type="text" value={row.Email} onChange={(e) => handleInputChange(e, i, 'Email')} /></td>              
              <td>
                <select onChange={(e) => handleEducationChange(e, i)}>
                  <option value="" selected disabled>Select</option>
                  {Object.keys(subjectData)
                          .map((education, index) => (
                            <option key={index} value={education}>{education}</option>
                          ))}
                </select>
              </td>
              <td>{row.Subject}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {selectedRowData && (
          <>
            <div>
              <button onClick={handleAddRow}>Add Row</button>
            </div>
            <div>
            <button onClick={handleDeleteRow}>Delete Row</button>
            </div>
            <div>
              <button onClick={handleSaveData}>Save Data</button>
            </div>
          </>
      )}
    </div>
  );
}

export default TableTwo;





