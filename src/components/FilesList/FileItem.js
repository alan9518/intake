/* ==========================================================================
** File Item List Component
** 22/05/2019
** Alan Medina Silva
** ========================================================================== */


// --------------------------------------
// Get Dependences
// --------------------------------------
    import React from 'react';
    import PropTypes from 'prop-types';


// --------------------------------------
// Split File URL to get the Name
// --------------------------------------
    const getFileName = (fileURL) => {
        let fileArray = null;
        let fileName = null;
        if(fileURL.indexOf('sites') >=0 ) {

            fileArray =  fileURL.split('/');
            fileName = fileArray[fileArray.length - 1];


        }
        else
            fileName = 'fileName';

        return fileName
    }

// --------------------------------------
// Create Functional Component
// --------------------------------------
    const FileItem = (props) => {
        const {fileURL} = props;
        return (
            <div className = "int-fileListItem">
                <span> {getFileName(fileURL)} </span>
            </div>
        )
    }


// -------------------------------------- 
// Define PropTypes 
// -------------------------------------- 
    FileItem.propTypes = {
        props: PropTypes
    };



// --------------------------------------
// Export Component
// --------------------------------------
    export default FileItem;