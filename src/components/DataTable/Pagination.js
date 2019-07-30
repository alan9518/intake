/* ==========================================================================
** Pagination Component Layout
** 25/02/2019
** Alan Medina Silva
** ========================================================================== */

// --------------------------------------
// Get Dependences
// --------------------------------------
    import React from 'react';
    import PropTypes from 'prop-types';
    import ReactPaginate from 'react-paginate';


// --------------------------------------
// Create Functional Component
// --------------------------------------
    const Pagination = (props) => {

        const {maxItems, itemsPerPage} = props;




        return (
            <div className = "int=-paginationContainer" >

                <ReactPaginate
                    previousLabel={'previous'}
                    nextLabel={'next'}
                    breakLabel={'...'}
                    breakClassName={'break-me'}
                    pageCount={this.state.pageCount}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
                    onPageChange={this.handlePageClick}
                    containerClassName={'pagination'}
                    subContainerClassName={'pages pagination'}
                    activeClassName={'active'}
                />


            </div>
        )
    }
// -------------------------------------- 
// Define PropTypes 
// -------------------------------------- 
Pagination.propTypes = {
    props: PropTypes
};
// --------------------------------------
// Export Component
// --------------------------------------
export default Pagination;