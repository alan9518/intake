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
    const {filesData, currentProject,currentView, spDocs} = props;
    console.log("TCL: FilesList -> filesData", filesData)
    console.log("TCL: FilesList -> spDocs", spDocs)
    let documentArray;
    let fileExtensionArray;
    let fileExtension;
    let fileNameArray;
    let fileName;
    let isDocument = false;
    let urlDocument = null

    // ? Check type of elemnts inside filesDataArray
    let stringfilesData = JSON.stringify(filesData)
        console.log("TCL: FilesList -> stringfilesData", stringfilesData)


    if(stringfilesData.indexOf('previewElement') >= 0) {
         // ? Render files that come on objectFormat

         return (
            <div className = "int-fileListContainer">
                <h4> Files  </h4>
                <div>
                    {
                        // ? Iterate DB Files, without checking
                        filesData && filesData.map((dbFile)=> {
                            //? File Added But no saved
                            if(dbFile.upload) {

                                // accepted: true
                                // lastModified: 1559936976717
                                // lastModifiedDate: Fri Jun 07 2019 14:49:36 GMT-0500 (hora de verano central) {}
                                // name: "Estado de cuenta (2).pdf"
                                // previewElement: div.dz-preview.dz-file-preview
                                // previewTemplate: div.dz-preview.dz-file-preview
                                // size: 1306790
                                // status: "queued"
                                // type: "application/pdf"
                                // upload: {uuid: "a2b79aa6-ed1c-436b-bc92-0a15c9ee894c", progress: 0, total: 1306790, bytesSent: 0, filename: "Estado de cuenta (2).pdf", …}
                                // webkitRelativePath: ""
                                // _removeLink: a.dz-remove

                                documentArray = dbFile.name.split('.');
                                fileExtension = documentArray.length > 0 ? documentArray[documentArray.length - 1] : dbFile.type
                                fileName = documentArray.length > 0 ? documentArray[0] : dbFile.name
                                urlDocument = null


                            }


                            // ? Files already on the DB
                            else if(dbFile.name ) {
                                // nameToSplit =  dbFile.name;
                                documentArray = dbFile.name.split('.');
                                fileExtension = documentArray.length > 0 ? documentArray[documentArray.length - 1] : dbFile.type
                                fileName = documentArray.length > 0 ? documentArray[0] : dbFile.name


                              


                                if(fileName.indexOf('sites')>= 0) {
                                    let fileNameArray = fileName.split('/')
                                    fileName = fileNameArray[fileNameArray.length - 1];
                                }
                                    

                                urlDocument = dbFile.name.indexOf('sites')>=0  ? dbFile.name : '';

                                  //? Check if file is Office Doc
                                if(dbFile.type == 'doc' || dbFile.type == 'docx' || dbFile.type == 'ppt' || dbFile.type == 'pptx' || dbFile.type == 'xsl' || dbFile.type == 'xslx'  || dbFile.type == 'csv'  ) {
                                    // ? Get Sp Doc
                                    let spDoc = spDocs.filter((spFile)=> {
                                        if(`/${dbFile.name}` === spFile.ServerRelativeUrl)
                                            return spFile
                                        // "/sites/gsd/intake_process/intakeFiles/GSD00337/PMO/test.docx"
                                        // name: "sites/gsd/intake_process/intakeFiles/GSD00337/PMO/test.docx"

                                    })[0]

                                   if(spDoc) {
                                    urlDocument = spDoc.LinkingUri;
                                    fileName = spDoc.Name;
                                   }
                                }
                            }
                                



                            // ? Return FILe

                            return (
                                <React.Fragment>
                                    {
                                        <div className = "xpl-fileRow">
                                            <FileType
                                                fileExtension={fileExtension.toLowerCase()}
                                                fileName={fileName}
                                                fileLink={urlDocument}
                                                spDocs = {spDocs}
                                                dataURL={urlDocument}
                                                currentView = {currentView} currentProject = {currentProject}
                                            />
                                        </div>
    
                                    }
                                </React.Fragment>
                            )

                        })
                    }
                </div>

            </div>
        )

    }

    else {
        

    // ? Render Files that come on string format

        return (
            <div className = "int-fileListContainer">
                <h4> Files  </h4>
                <div>
                    {
                        // ? Iterate Sharepoint Files to look for a match between the SP FIles and DB
                        filesData && filesData.length > 0 ?
                            spDocs.map((spDoc) => {
                                console.log("TCL: FilesList -> spDoc", spDoc)
                                //? Check if spdoc is in relative URL
                                try {
                                    // let relURl = spDoc.ServerRelativeUrl ? spDoc.ServerRelativeUrl : 
                                    let relURl = spDoc.ServerRelativeUrl.replace('/sites', 'sites');
                                    if(filesData.includes(relURl)) {
                                        // ? Item Matches

                                        let currentDoc = filesData[filesData.indexOf(relURl)];
                                        documentArray =    currentDoc.split('/');
                                        console.log("TCL: FilesList -> documentArray", documentArray)
                                    
                                        fileExtensionArray = (documentArray[documentArray.length - 1]).split('.');
                                        fileExtension =  fileExtensionArray[fileExtensionArray.length -1];
                                        
                                        fileName = documentArray[documentArray.length - 1]
            
                                        // urlDocument = `/${doc}`;
                                        // nameToSplit = doc;


                                        return (
                                            <React.Fragment>
                                                {
                                                    <div className = "xpl-fileRow">
                                                        <FileType
                                                            fileExtension={fileExtension.toLowerCase()}
                                                            fileName={fileName}
                                                            fileLink={spDoc.ServerRelativeUrl}
                                                            spDocs = {spDocs}
                                                            dataURL={spDoc.LinkingUri}
                                                            currentView = {currentView} currentProject = {currentProject}
                                                        />
                                                    </div>
                
                                                }
                                            </React.Fragment>
                                        )
                
                                    }
                                }
                                catch(error) {
                                    console.log("TCL: FilesList -> error", error)

                                    // ? DB File could be Obect type instead of string
                                    
                                }
                            })
                        :
                        <h5> No Files </h5>

                    }
                </div>

            </div>
        )
    }


   


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