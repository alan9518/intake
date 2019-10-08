/* ==========================================================================
** Files List Component
** Preview / Delete Files
** 20/05/2019
** Alan Medina Silva
** ========================================================================== */

// --------------------------------------
// Get Dependences
// --------------------------------------
import React from 'react';
import {FileType} from '../index'
import PropTypes from 'prop-types';
import './styles.css'


// --------------------------------------
// Create Functional Component
// --------------------------------------
const FilesList = (props) => {
    const {filesData, currentProject,currentView} = props;
    let documentArray;
    let fileExtensionArray;
    let fileExtension;
    let fileNameArray;
    let fileName;
    let isDocument = false;
    let urlDocument = null
    return (
        <div className = "int-fileListContainer">
            <h4> Files  </h4>
           <div>
                {
                    filesData && filesData.length > 0 
                    ? filesData.map((doc) => {

                        if(doc.name ) {
                            documentArray = doc.name.split('.');
                            fileExtension = documentArray.length > 0 ? documentArray[documentArray.length - 1] : doc.type
                            fileName = documentArray.length > 0 ? documentArray[0] : doc.name
                            urlDocument = '';
                        }
                            
                        else {



                            documentArray = doc.split('/');
                        
                            fileExtensionArray = (documentArray[documentArray.length - 1]).split('.');
                            fileExtension =  fileExtensionArray[fileExtensionArray.length -1];
                            
                            fileName = documentArray[documentArray.length - 1]

                            urlDocument = `/${doc}`;
                           
                        }
                            
                        

                        
                  
                        return (
                            <React.Fragment>
                                {
                                    <div className = "xpl-fileRow">
                                        <FileType
                                            fileExtension={fileExtension.toLowerCase()}
                                            fileName={fileName}
                                            fileLink={urlDocument}
                                            // isDocument={isDocument}
                                            dataURL={null}
                                            currentView = {currentView} currentProject = {currentProject}
                                            key = {fileName}
                                        />
                                    </div>

                                }
                            </React.Fragment>
                        )


                    })
                :
                <h5> No Files </h5>
            }
           </div>

        </div>
    )
}


// -------------------------------------- 
// Define PropTypes 
// <FileType
// fileExtension={fileExtension}
// fileName={fileName}
// fileLink={doc.uriLink || doc.urlDocument}
// isDocument={isDocument}
// dataURL={null}
// />
// -------------------------------------- 
FilesList.propTypes = {
    props: PropTypes
};


// --------------------------------------
// Export Component
// --------------------------------------
export default FilesList;