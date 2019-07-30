// --------------------------------------
// Get Dependences
// --------------------------------------
import React from 'react';
import PropTypes from 'prop-types';
import {startCase} from "lodash";
import {CustomTableItem, ProjectLink} from '../../components'
import './styles.css';




// --------------------------------------
// Iterate Rows 
// --------------------------------------
const formatColumnName = (columnName) => {
        
    let nameWithRemovedChar =  columnName.replace('_', " ");
    let columnHeader = startCase(nameWithRemovedChar);
    return columnHeader
}

// --------------------------------------
// Format Date
// --------------------------------------
const formatDate = (dateToFormat) =>{
    const newDate =  new Date(dateToFormat)
    // //console.log('TCL: formatDate -> newDate', newDate)
    // //console.log('TCL: formatDate -> newDate', newDate.toDateString())


    return newDate.toDateString()
}

// --------------------------------------
// Create Functional Component
// --------------------------------------
const DataTable = (props) => {

    const { tableData } = props;
    // Filter to Get Only Table Values
    const tableRows = tableData.map((tableItem) => {


        return {
            request_id: tableItem.request_id,
            request_owner: tableItem.request_owner,
            date_submitted: tableItem.date_submitted,
            project_name: tableItem.project_name,
            project_type: tableItem.project_type,
            workstage: tableItem.workstage,
        }

    })

    const tableHeaderItem = tableRows[0];
    const tableHeaders = tableHeaderItem.length !== null && Object.keys(tableHeaderItem);
    



    // --------------------------------------
    // Render Table
    // --------------------------------------

    return (
        <div className="table-responsive-vertical ">
            <table className="int-datatable table table-hover table-mc-light-blue shadow-z-1">
                <thead>
                    <tr>
                        {
                            tableHeaders.map((header) => {
                                return (
                                    <th> {formatColumnName(header)}  </th>
                                )
                            })
                        }
                    </tr>
                </thead>
                <tbody>

                    {
                        tableRows.map((row, index) => {
                            
                            return (
                                    <tr className = {index % 2 === 0 ? 'int-tableRow int-rowStripped' : 'int-tableRow'}>
                                        <td data-title = {formatColumnName(tableHeaders[0])} className = "int-linkText">  
                                            <ProjectLink route = {`project/${row.request_id}`}> {row.request_id}  </ProjectLink> 
                                        </td>
                                        <td data-title = {formatColumnName(tableHeaders[1])} > {row.request_owner}  </td>
                                        <td data-title = {formatColumnName(tableHeaders[2])} > {formatDate(row.date_submitted)}  </td>
                                        <td data-title = {formatColumnName(tableHeaders[3])}> {row.project_name}  </td>
                                        <td data-title = {formatColumnName(tableHeaders[4])}> {row.project_type}  </td>
                                        <td data-title = {formatColumnName(tableHeaders[5])}> <CustomTableItem textValue = {row.workstage}/>  </td>
                                    </tr>
                                
                                
                            )
                        })
                    }

                </tbody>
            </table>
        </div>
    )
}



// -------------------------------------- 
// Define PropTypes 
// -------------------------------------- 
DataTable.propTypes = {
    props: PropTypes
};


// --------------------------------------
// Export Component
// --------------------------------------
export default DataTable;