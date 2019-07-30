/* ==========================================================================
** Search Component
** 04/03/2019
** Alan Medina Silva
** ========================================================================== */

// --------------------------------------
// Get Dependences
// --------------------------------------
    import React from 'react';
    import PropTypes from 'prop-types';
    

// --------------------------------------
// Create Functional Component
// --------------------------------------
    const Search = (props) => {
        const { onChange, } = props;
        return (
            <div className = "int-searchContainer">
                <div class="int-fieldText" style= {{maxWidth : 450}}>
                    <input 
                        type="text" 
                        name = "int-searchInput" 
                        placeholder = "Filter Projects By Name, Owner or Request ID " 
                        onChange = {onChange} 
                        className="int-textInput " 
                        onKeyPress={event => {
                            if (event.key === 'Enter') {
                                event.preventDefault();
                                // onSubmit(props, event);
                            }
                        }}
                        style = {{textAlign : 'left'}}/>
                </div>
            </div>
        )
    }


// --------------------------------------
// Stop Page Reload on Key Enter
// --------------------------------------
    const onSubmit = (props,event) =>{
        // const { onChange, onSubmit } = props;
        props.onSubmit(event);

    }


// -------------------------------------- 
// Define PropTypes 
// -------------------------------------- 
    Search.propTypes = {
        props: PropTypes
    };

// --------------------------------------
// Export Component
// --------------------------------------
    export default Search;  