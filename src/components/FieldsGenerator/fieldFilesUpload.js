/* ==========================================================================
** File Managaer Holder
** 30/01/2019
** Alan Medina Silva
** ========================================================================== */

// --------------------------------------
// Get Dependences
// --------------------------------------
    import React from 'react';
    import ReactTooltip from 'react-tooltip';
    import PropTypes from 'prop-types';
    import { FilesManager, ToolTip, FilesList, FilesList2 } from '../../components';

// --------------------------------------
// Create Functional Component
// --------------------------------------
    const fieldFilesUpload = (props) => {

        const { renderBorder, onFileRemoved, onFileAdded, preloadFiles, blockFileZone, showFileManager , currentView,currentProject} = props;
        const { Field_Name, Mandatory, columns,  hasToolTip, toolTipText, Sequence, Enabled,  General_Value, spDocs } = props.data;
        const labelBorderClassName = renderBorder === true ? 'int-fieldLabel bordered' : 'int-fieldLabel';
        

        return (
            <div className={columns === 2 ? 'int-fieldItemContainerRow' : 'int-fieldItemContainerColumn'} >
                <label htmlFor="" className={labelBorderClassName}> 
                    {Field_Name}   
                    {columns === 1 && hasToolTip === true &&  <ToolTip tipText = {toolTipText}/>}  
                    <ReactTooltip className='extraClass' delayHide={1000} effect='solid'/>
                </label>
                
                <div className="int-filesContainer" tabIndex = {Sequence}>
                    {Mandatory && <span className = "int-blueText int-fileMandatory"> * </span>   }

                    {
                        showFileManager === true 
                        ? <FilesManager onFileRemoved = {onFileRemoved}  onFileAdded = {onFileAdded} preloadFiles = {preloadFiles} disabled = {!Enabled}/>
                        : <FilesList2 filesData = {General_Value} currentView = {currentView} currentProject = {currentProject} spDocs = {spDocs}/>
                    }

                        


               {
                 /*  blockFileZone === false 
                   ?
                               
                        <FilesManager onFileRemoved = {onFileRemoved}  onFileAdded = {onFileAdded} preloadFiles = {preloadFiles} disabled = {!Enabled}/>
                        
                    : showFileManager === false ?
                        <FilesList/>
                    
                        : <FilesManager onFileRemoved = {onFileRemoved}  onFileAdded = {onFileAdded} preloadFiles = {preloadFiles} disabled = {!Enabled}/>
                */
               
                // <FilesList filesData = {General_Value}/>
               }
               
                
               </div>

            { columns === 2 && hasToolTip === true &&  <ToolTip tipText = {toolTipText}/>}
            </div>
        )
    }


// -------------------------------------- 
// Define PropTypes 
//*<h2 style = {{padding:20}}> No Files Added  </h2>}
// -------------------------------------- 
    fieldFilesUpload.propTypes = {
        props: PropTypes
    };



// --------------------------------------
// Export Component
// --------------------------------------
    export default fieldFilesUpload;