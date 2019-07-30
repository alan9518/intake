/* ==========================================================================
** Custom DataTable Component
** Using https://github.com/sean-ww/react-redux-datatable
** 13/02/2019
** Alan Medina Silva
** ========================================================================== */

// --------------------------------------
// Get Dependences
// --------------------------------------
    import React, { Component, Fragment } from 'react';
    import {startCase} from "lodash";
    import {CustomTableItem, ProjectLink} from '../index'
    import './styles.css';
    import ReactPaginate from 'react-paginate';
    import PropTypes from 'prop-types';


// --------------------------------------
// Create Component Class
// --------------------------------------
    class DataTable extends Component {

        /* ==========================================================================
        ** Component Setup
        ** ========================================================================== */
            // --------------------------------------
            // Constructor
            // --------------------------------------
            constructor(props) {
                super(props);
                this.state = {
                    isLoaded: false,
                }
            }


            // --------------------------------------
            // Set Initial Values
            // --------------------------------------
            componentDidMount() {
                this.setState({
                    isLoaded : true
                })
            }


        /* ==========================================================================
        ** Handle State
        ** ========================================================================== */    
            handlePageClick =(event)=> {
			    //console.log('TCL: DataTable -> handlePageClick -> event', event)

            }


        /* ==========================================================================
        ** Render Methods
        ** ========================================================================== */

            
            // --------------------------------------
            // Iterate Rows 
            // --------------------------------------
            formatColumnName = (columnName) => {
                    
                let nameWithRemovedChar =  columnName.replace('_', " ");
                let columnHeader = startCase(nameWithRemovedChar);
                return columnHeader
            }

            // --------------------------------------
            // Format Date
            // --------------------------------------
            formatDate = (dateToFormat) =>{
                const newDate =  new Date(dateToFormat);
                return newDate.toDateString()
            }

            // --------------------------------------
            // Render Table
            // --------------------------------------
            renderTable(tableHeaders, tableRows) {
                const {itemsPerPage} = this.props;
                return(
                    <div className="table-responsive-vertical ">
                    <table className="int-datatable  table table-hover table-mc-light-blue shadow-z-1 int-datatableFullHeight">
                        <thead>
                            <tr>
                                {
                                    tableHeaders && tableHeaders.map((header) => {
                                        return (
                                            <th> {this.formatColumnName(header)}  </th>
                                        )
                                    })
                                }
                            </tr>
                        </thead>
                        <tbody>
        
                            {
                                tableRows && tableRows.map((row, index) => {
                                    
                                    return (
                                        index < itemsPerPage &&
                                            <tr className = {index % 2 === 0 ? 'int-tableRow int-rowStripped' : 'int-tableRow'}>
                                                <td data-title = {this.formatColumnName(tableHeaders[0])} className = "int-linkText">  
                                                    <ProjectLink route = {`project/${row.request_id}/requirement-definition`}> {row.request_id}  </ProjectLink> 
                                                </td>
                                                <td data-title = {this.formatColumnName(tableHeaders[1])} > {row.request_owner}  </td>
                                                <td data-title = {this.formatColumnName(tableHeaders[2])} > {this.formatDate(row.date_submitted)}  </td>
                                                <td data-title = {this.formatColumnName(tableHeaders[3])}> {row.project_name}  </td>
                                                <td data-title = {this.formatColumnName(tableHeaders[4])}> {row.project_type}  </td>
                                                <td data-title = {this.formatColumnName(tableHeaders[5])}> <CustomTableItem textValue = {row.workstage}/>  </td>
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
            // Render Pagination
            // --------------------------------------
            renderPagination (pageCount) {
                return (
                    <div className="int-paginationContainer">
                        <div className="int-leftArrowContainer"> Prev </div>  

                        <div className="int-counterContainer">
                            Page 1 of {pageCount}
                        </div>  

                        <div className="int-rightArrowContainer"> Next </div>  
                    </div>
                );
            }


            // --------------------------------------
            // Render Projects
            // --------------------------------------
            renderDataTable() {
                const { tableData } = this.props;
                const pageCount = tableData.length;
                let itemsPerPage = Math.ceil(pageCount / 6);
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
            
                return (
                    <Fragment>
                        {this.renderTable(tableHeaders, tableRows)}
                        {/*this.renderPagination(itemsPerPage)*/}
                    </Fragment>
                )
            }



            // --------------------------------------
            // Render Component
            // --------------------------------------
            render() {
                return this.renderDataTable();
            }
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
