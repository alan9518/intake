/* ==========================================================================
 * File Type Icon Containers 
 * 02/08/2018
 * Alan Medina Silva
 ========================================================================== */



// --------------------------------------
// Import Dependences
// -------------------------------------- 
    import React, { Component } from 'react';
    import axios from 'axios';
    import { Endpoints } from '../../services/Endpoints';
    import PropTypes from 'prop-types'

// --------------------------------------
// Component Class
// --------------------------------------
    class FileType extends Component {


        /* ==========================================================================
        ** Component Setup
        ** ========================================================================== */

            // --------------------------------------
            // Constructor
            // --------------------------------------
            constructor(props) {
                super(props);
                this.host = 'https://flextronics365.sharepoint.com/sites/project_intake/ProjectIntake/assets/File-Icons';
                this.imageViewer = 'https://flextronics365.sharepoint.com/sites/intake_process/IntakeProcess/_layouts/15/Lightbox.aspx?url';
                this.baseUrl = 'https://flextronics365.sharepoint.com'
                // this.state = {
                //     sharepointDocs : [],
                //     isLoaded : false
                // }
            }


          


        /* ==========================================================================
        ** Handle State
        ** ========================================================================== */


            // --------------------------------------
            // Click Event
            // Open File with Sharepoint Modal
            // --------------------------------------    
            openFileLightbox = (fileLink) => (event) => {
                
                if (!fileLink || fileLink === '')
                    return;

                if(fileLink.indexOf('/sites') < 0 )
                    window.openDialog(`${this.baseUrl}/${fileLink}`, 'Documents Viewer')
                else
                    window.openDialog(`${this.baseUrl}${fileLink}`, 'Documents Viewer')

                // Apply Styles to Image
                // document.getElementsByClassName('ms-dlgFrame');
            }

            // --------------------------------------
            // Set the File Type for the Preview
            // fileLink already comes with / at 0
            // --------------------------------------
            setImageType(fileExtension, fileLink, dataURL) {
                if(dataURL !== null)
                    return dataURL;
                else if(fileExtension === "jpg" || fileExtension === "png" || fileExtension === "jpeg" || fileExtension === "gif")
                    return fileLink;
                else
                    return null;
            }


            // --------------------------------------
            // Merge Docs with sharepoint Data
            // --------------------------------------
            formatDocLink(currentLink, fileName) {

                // ?Check if theres a link from a new File on SP
                if(!currentLink) {
                    let spFile = this.props.spDocs.filter((spDoc)=> {
                        if((spDoc.Name).toLowerCase() === fileName  )
                            return spDoc
                    })[0]
                    
                    

                    if(spFile && spFile.LinkingUri) return  spFile.LinkingUri
                    
                    else if (spFile && spFile.ServerRelativeUrl) return  spFile.ServerRelativeUrl

                    else return ""
                }
                
                
                

                if(currentLink.length <= 0)
                    return ""
                    
                if(currentLink.indexOf('sites/')) {
                    let linkArray = currentLink.split('sites/');
                    let formatedLink = `/sites/${linkArray[linkArray.length-1]}`

                    return formatedLink

                }
                else return currentLink


            }



            // --------------------------------------
            // Remove URL from fileName
            // --------------------------------------
            formatFileName(fileName) {
                
                if(fileName.indexOf('sites') >= 0) {
                    let newNameArray =  fileName.split('/');
                    let newName = newNameArray[newNameArray.length - 1]

                    return newName
                }

                else
                    return fileName

            }
            

        /* ==========================================================================
        ** API Connection
        ** ========================================================================== */

            // --------------------------------------
            // Add Link To Visualize Files
            // current VIew
            // RequirementsDefinition = requirements
            // PMO = pmo
            // --------------------------------------`
            // async getFileslinkAxios(currentProject , currentView = 'RequirementsDefinition') {
            //     let folderURL = `intakeFiles/${currentProject}/${currentView}`
            //     let serviceUrl = `${Endpoints.getProjectFolder}('${folderURL}')/Files?$expand=LinkingUri`
            //     return axios.get(serviceUrl)
               
            // }


        /* ==========================================================================
        ** Render Methods
        ** ========================================================================== */


            // --------------------------------------
            // Render Images
            // --------------------------------------
            renderImages(fileExtension, fileName, fileLink) {

                // this.state.sharepointDocs
               
                let fileOpenLink = fileLink;
                
                if(fileLink === "" && fileName !== "" && fileName.indexOf('sites')>=0  )
                    fileOpenLink = `/${fileName}.${fileExtension}`

                else if (fileLink === null || fileLink === undefined )
                    fileOpenLink = ''

                
               


                let imageSrc = fileOpenLink !== null ? fileOpenLink : `${this.host}/${fileExtension}.png`

                if(imageSrc.indexOf('/sites') < 0)
                    imageSrc = `/${imageSrc}`


                return (
                            
                    <div className="xpl-iconClickContainer" onClick={ this.openFileLightbox(fileOpenLink)}>
                                {
                                    <img
                                        src = {imageSrc}
                                        alt={fileName}
                                        className="xpl-fileIcon"
                                    />
                                }
        
                                <span className="xpl-fileName"> {this.formatFileName(fileName)} </span>
                        </div>
                )


            
               
            }

            

            // --------------------------------------
            // Render Documents
            // --------------------------------------
            renderDocuments(fileExtension, fileName, fileLink, linkingUri) {
                let documentLink = "";

                if(fileExtension == 'doc' || fileExtension === 'docx' || fileExtension === 'ppt' || fileExtension === 'pptx' || fileExtension === 'xls' || fileExtension === 'xlsx' || fileExtension === 'xslx'  || fileExtension === 'csv'   )
                    documentLink = linkingUri

                

                //? Check for txt files
                else if(fileLink !== "" && fileExtension === 'txt')
                    documentLink = fileLink;
                // ? Other Files
                else if((linkingUri === ""  && fileLink !== "" ) || (linkingUri === null  && fileLink !== "" )  ) {
                    documentLink = fileLink
                }
                // ? Theres no Linking URI
                else if(linkingUri === "" || linkingUri === null) {
                        documentLink = fileLink
                }
                else if (fileLink === null || fileLink === undefined )
                    documentLink = ''
                else
                    documentLink = fileLink

                
                let fileNameToCompareSP = (`${fileName}.${fileExtension}`).toLowerCase();
              
                documentLink = this.formatDocLink(documentLink,fileNameToCompareSP )
                

                if(documentLink.indexOf('/sites') < 0)
                    documentLink = `/${documentLink}`

              
                    // documentLink = this.formatDocLink(`${fileName}`);

                // let documentLink =  fileLink !== "" ? fileLink : this.formatDocLink(`${fileName}`);

                if(documentLink !== '') {
                      
                    return (
                            
                            <a href = {documentLink} className="xpl-iconClickContainer" target="_blank" rel="noopener noreferrer">
                                {
                                    <img
                                        src={`${this.host}/${fileExtension}.png`}
                                        alt={`${fileName}`}
                                        className="xpl-fileIcon"
                                    />
                                }
                                <span className="xpl-fileName"> { this.formatFileName(fileName)} </span>
                            </a>
                    )
                }

                else {
                    return (
                    
                        <div  className="xpl-iconClickContainer">
                            {
                                <img
                                    src={`${this.host}/${fileExtension}.png`}
                                    alt={`${fileName}`}
                                    className="xpl-fileIcon"
                                />
                            }
                            <span className="xpl-fileName"> { this.formatFileName(fileName)} </span>
                        </div>
                    )
    
                }
                      
             
              
            }


            renderFiles() {
                const { fileExtension, fileName, fileLink,  dataURL} = this.props;
                let isDocument = fileExtension === "jpg" || fileExtension === "png" || fileExtension === "jpeg" || fileExtension === "gif" ? false : true

               

                return   (  
                    <React.Fragment>


                        <div className="xpl-fileIconContainer" >

                            {
                                isDocument === true 
                                    ? this.renderDocuments(fileExtension, fileName, fileLink, dataURL) 
                                    : this.renderImages(fileExtension, fileName, fileLink)
                            }
                            

                        </div>

                    </React.Fragment>
                )
            }



            // --------------------------------------
            // Render Component
            // --------------------------------------
            render() {

                return  this.renderFiles()
                
            //     const { isLoaded, sharepointDocs } = this.state;
               
            //     if( sharepointDocs.length <= 0 )
            //         return null;
            //         // return <span> No Files Saved  </span>

            //     return (

            //         isLoaded === true  ? this.renderFiles() : <span> Loading File ...  </span>
   
            //     )
            }

    }


// --------------------------------------
// Component Props
// --------------------------------------
    // FileType.proptypes = {
    //     fileExtension: PropTypes.string,
    //     fileName: PropTypes.string
    // }

// --------------------------------------
// Export Component 
// --------------------------------------
    export default FileType;



