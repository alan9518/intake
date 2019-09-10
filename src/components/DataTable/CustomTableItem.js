/* ==========================================================================
** Custom DatTable Item Component
** 18/02/2019
** Alan Medina Silva
** ========================================================================== */

// --------------------------------------
// Get Dependences
// --------------------------------------
    import React from 'react';
    import PropTypes from 'prop-types';
    
    import {find} from 'lodash';


// ?--------------------------------------
// ? COLORS
// ? #37BC9B = Mint
// ? #3BAFDA = AQUA
// ? #E9573F = Bittersweet
// ? #DA4453 = Grapefruit
// ? #3BAFDA = AQUA
// ? #3BAFDA = AQUA
// ? #3BAFDA = AQUA
// ? #3BAFDA = AQUA
// ?--------------------------------------


// --------------------------------------
// Cell Styles Define Background Color
// --------------------------------------

    const setBackgroundColor = (statusName) => {
        const statusArray = [
            {status : "New" , color: "#808080" },
            {status : "Requested" , color: "#808080" },
            {status : "FG0 Preparation" , color: "#808080" },
            {status : 'FG0 Approved', color : '#37BC9B'},
            {status : "FG0 Rejected" , color: "#d23338" },
            {status : "Active" , color: "#00ff00" },
            {status : "Implemented" , color: "#002060" },
            {status : "Ready For ROI Realized" , color: "#0070c0" },
            {status : "Closed" , color: "#00b0f0" },    
            {status : 'Not Started', color : '#00b0f0'},
            {status : 'In Progress', color : '#f8c20a'},
            {status : 'Completed', color : '#81bc00'},
            {status : 'On Hold', color : '#c00000'},
            {status : 'Cancelled', color : '#000'},
            {status : "Deferred" , color: "#ffff00" }
        ]

        try {
            let currentColor = find(statusArray, (statusItem)=> {return statusItem.status === statusName})
            return currentColor.color
        }
        catch (error) {
			//console.log('TCL: setBackgroundColor -> error', error)
            let currentColor = "#f8c20a"
            return currentColor.color

        }

        
        
        

    }


// --------------------------------------
// Create Functional Component
// --------------------------------------
const CustomTableItem = (props) => {
    const {textValue} = props;
    const tableCellStyleColor = setBackgroundColor(textValue);
    return (
        <div className = "int-tableColorHolder"  style={{backgroundColor: tableCellStyleColor}}>

            {textValue}

        </div>
    )
}


// -------------------------------------- 
// Define PropTypes 
// -------------------------------------- 
    CustomTableItem.propTypes = {
        props: PropTypes
    };


// --------------------------------------
// Export Component
// --------------------------------------
export default CustomTableItem;