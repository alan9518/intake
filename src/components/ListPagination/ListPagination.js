/* ==========================================================================
** Pagination Component
** 28/02/2019
** Alan Medina Silva
** ========================================================================== */
    import React from 'react';
    import {PaginationButton} from '../../components';


// --------------------------------------
// Create Layuot Component
// --------------------------------------
const ListPagination = (props) => {
    const {projectsCount, itemsPerPage, currentPage, numberOfPages,  nextPage, previousPage, firstPage, lastPage } = props;
	//console.log('TCL: ListPagination -> props', props)
    // if (projectsCount <= itemsPerPage) {
    //     return null;
    // }


    // --------------------------------------
    // Render Component
    // --------------------------------------


    return (
        <nav>
            <ul className="int-pagination">
                <li className = "int-page-item" onClick = {firstPage}> <PaginationButton  buttonClass = "page-link" name = "first"   buttonIcon = {'fas fa-angle-double-left'} /> </li>
                { currentPage > 1 && <li className = "int-page-item" onClick = {previousPage} >  <PaginationButton  buttonClass = "page-link" name = "previous"  buttonIcon = {'fas fa-angle-left'} />  </li>}

                <li className = "int-page-item">  Page {currentPage} of {numberOfPages}  </li>

                {   currentPage < numberOfPages && <li className = "int-page-item" onClick = {nextPage}> <PaginationButton  buttonClass = "page-link" name = "next"   buttonIcon = {'fas fa-angle-right'} />  </li> }
                <li className = "int-page-item" onClick = {lastPage}> <PaginationButton  buttonClass = "page-link" name = "last"   buttonIcon = {'fas fa-angle-double-right'} /> </li>
            </ul>
        </nav>
    )


};


// --------------------------------------
// Export Component
// --------------------------------------
    export default ListPagination;