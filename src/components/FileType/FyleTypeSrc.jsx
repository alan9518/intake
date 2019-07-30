/* ==========================================================================
 * File Type Icon Soure for The Dropzone Component 
 * 28/08/2018
 * Alan Medina Silva
 ========================================================================== */



// --------------------------------------
// Import Dependences
// -------------------------------------- 
import React, { Component } from 'react';
import PropTypes from 'prop-types'

// --------------------------------------
// Component Class
// --------------------------------------
class FileTypeSrc extends Component {

    // --------------------------------------
    // Constructor
    // --------------------------------------
    constructor(props) {
        super(props);
        this.host = 'https://flextronics365.sharepoint.com/sites/project_intake/ProjectIntake/assets/File-Icons';
        this.imageViewer = 'https://flextronics365.sharepoint.com/sites/project_intake/_layouts/15/Lightbox.aspx?url'
    }


    // --------------------------------------
    // Click Event
    // Open File with Sharepoint Modal
    // --------------------------------------    
    // openFileLightbox = (fileLink) => (event) => {
    //     if (!fileLink)
    //         return;
    //     window.openDialog(fileLink, 'Documents Viewer')
    // }

    // --------------------------------------
    // Set the File Type for the Preview
    // --------------------------------------
    setImageType(fileExtension, fileLink) {
        if(fileExtension === "jpg" || fileExtension === "png" || fileExtension === "jpeg" || fileExtension === "gif")
            return fileLink;
        else
            return null;
    }



    // --------------------------------------
    // Render Images
    // --------------------------------------
    renderImages(fileExtension, fileName, fileLink) {

        let imageSrc = this.setImageType(fileExtension, fileLink) ||  `${this.host}/${fileExtension}.png` ;

        return (
            <div className="pti-iconClickContainer" onClick={this.openFileLightbox(fileLink)}>
                <img
                    src = {imageSrc}
                    alt={`${fileExtension}`}
                    className="pti-fileIcon"
                />

                <span className="pti-fileName"> {fileName} </span>
            </div>
        )
    }



    // --------------------------------------
    // Render Documents
    // --------------------------------------
    renderDocuments(fileExtension, fileName, fileLink) {
        return (
            <a href = {fileLink} className="pti-iconClickContainer" target="_blank">
                <img
                    src={`${this.host}/${fileExtension}.png`}
                    alt={`${fileName}`}
                    className="pti-fileIcon"
                />

                <span className="pti-fileName"> {fileName} </span>
            </a>
        )
    }

    // --------------------------------------
    // Render Component
    // --------------------------------------
    render() {
        const { fileExtension, fileName, fileLink, isDocument } = this.props;

        return (
            <React.Fragment>

                <div className="pti-fileIconContainer" >

                    {isDocument === true ? this.renderDocuments(fileExtension, fileName, fileLink) : this.renderImages(fileExtension, fileName, fileLink)}

                </div>

            </React.Fragment>
        )
    }

}


// --------------------------------------
// Component Props
// --------------------------------------
    FileTypeSrc.proptypes = {
        fileExtension: PropTypes.string,
        fileName: PropTypes.string
    }

// --------------------------------------
// Export Component 
// --------------------------------------
    export default FileTypeSrc;



