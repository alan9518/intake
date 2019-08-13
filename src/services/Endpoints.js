/* ==========================================================================
** Endpoints Definition File
** 13/02/2019
** Alan Medina Silva
** ========================================================================== */


// --------------------------------------
// Imports
// --------------------------------------
    import {Config} from '../Config';

// --------------------------------------
// Path Route
// --------------------------------------
    const {spPath} = Config

    // const path = 'http://wsprojectintakenewstg.azurewebsites.net/projectintake.asmx'
    const path = 'https://wsprojectintakenew.azurewebsites.net/projectintake.asmx'

// --------------------------------------
// Create Endpoints Object
// --------------------------------------
    export const Endpoints = {

    /* ==========================================================================
     *  WebService EndPoints
     ========================================================================== */

    /* ==========================================================================
    ** INSERT
    ** ========================================================================== */

        // --------------------------------------
        // Get All Projects Form The PMO
        // --------------------------------------
            getAllProjects : `${path}/getAllProjectList`,

        /** --------------------------------------
        // Get All Projects By Owner
        // @param {created_by <Email>} abc@flex.com
        // --------------------------------------*/
            getProjectsByUser : `${path}/getProjectList`,
            
        /** --------------------------------------
        // Save Requirements
        // @param {op <String>} insertMainTab
        // --------------------------------------*/
            saveRequirements : `${path}?op=insertMainTab`,

        /** --------------------------------------
        // Save BusinessInfo
        // @param {op <String>} insertBussInfo
        // --------------------------------------*/
            saveBusinessInfo : `${path}?op=insertBussInfo`,
        

        /** --------------------------------------
        // Save BusinessInfo
        // @param {op <String>} insertTechEval
        // --------------------------------------*/
            saveTechincalEvaluation : `${path}?op=insertTechEval`,

        /** --------------------------------------
        // Save PMO Evaluation
        // @param {op <String>} insertPMOEval
        // --------------------------------------*/
            savePMOEvaluation : `${path}?op=insertPMOEval`,

        /** --------------------------------------
        // Save ROI Realized
        // @param {op <String>} insertROIReal
        // --------------------------------------*/
            saveROIRealized : `${path}?op=insertROIReal`,


          /** --------------------------------------
        // Save ROI Realized
        // @param {op <String>} insertROIReal
        // --------------------------------------*/
            saveDynatrace : `${path}/setROITrace`,

    /* ==========================================================================
    ** READ
    ** ========================================================================== */

        /** --------------------------------------
        // Get Requirements By ID
        // @param {project_id <String>} 88
        // --------------------------------------*/
            getRequirements : `${path}/getMainTab`,


        /** --------------------------------------
        // Get Requirements Docs By ID
        // @param {project_id <String>} 88
        // --------------------------------------*/
            getRequirementsFiles : `${path}/getProjDocs`,

        
        /** --------------------------------------
        // Get Business By ID
        // @param {project_id <String>} 88
        // --------------------------------------*/
            getBusiness : `${path}/getBussInfo`,

        /** --------------------------------------
        // Get getTechEval By ID
        // @param {project_id <String>} 88
        // --------------------------------------*/
            getTechnical : `${path}/getTechEval`,

        /** --------------------------------------
        // Get PMO Evaluation By ID
        // @param {project_id <String>} 88
        // --------------------------------------*/
            getPMOEvaluation : `${path}/getPMOEval`,

        
         /** --------------------------------------
        // Get PMO Evaluation Docs By ID
        // @param {project_id <String>} 88
        // --------------------------------------*/
            getPMOEvaluationFiles : `${path}/getPMODocs`,


        /** --------------------------------------
        // Get Requirements By ID
        // @param {project_id <String>} 88
        // --------------------------------------*/
            getROIRealized : `${path}/getROIReal`,

        /** --------------------------------------
        // Get Requirements By ID
        // @param {project_id <String>} 88
        // @param {roi_id <String>} 12
        // --------------------------------------*/
            // getROITrace : 'http://wsprojectintakenew.azurewebsites.net/projectintake.asmx/getROITrace?project_id=146&roi_id=12',
            getROITrace : `${path}/getROITrace`,

    /* ==========================================================================
    ** UPDATES
    ** ========================================================================== */

        /** --------------------------------------
        // Update Requirements
        // @param {op <String>} insertMainTab
        // --------------------------------------*/
            updateRequirements : `${path}/updateMainTab`,
        
        /** --------------------------------------
        // Update Business Info
        // @param {op <String>} insertMainTab
        // --------------------------------------*/
            updateBusiness : `${path}/updateBussInfo`,

        /** --------------------------------------
        // Update Business Info
        // @param {op <String>} insertMainTab
        // --------------------------------------*/
            updateTechnical : `${path}/updateTechEval`,

        /** --------------------------------------
        // Update Business Info
        // @param {op <String>} insertMainTab
        // --------------------------------------*/
            updatePMOEvaluation : `${path}/updatePMOEval`,


        /** --------------------------------------
        // Update Business Info
        // @param {op <String>} insertMainTab
        // --------------------------------------*/
            updateROIRealized : `${path}/updateROIReal`,


        

        /** --------------------------------------
        // Upload Files on Requirements Tab
        // @param {project_id <String>} 
        // @param {project_docs <String>} test.pdf,abc.docx
        // @param {last_by <String>} mail@flex.com
        // --------------------------------------*/
            uploadRequirementsFiles : `${path}/setProjDocs`,
            // uploadRequirementsFiles : `${path}/setProjectDocs?project_id=8&project_docs=test.pdf,abc.docx&last_by=abc@flex.co`'



    /* ==========================================================================
     *  SHAREPOINT 
     ========================================================================== */

        /** ---------------------------------------------------
        // Get site Context Info
        // --------------------------------------------------- **/
            getContextInfo : 'https://flextronics365.sharepoint.com/sites/gsd/intake_process/_api/contextinfo',
        
        /** ---------------------------------------------------
        // Get Site PMOS Owners
        // @param {getbyid}
        // --------------------------------------------------- **/
            getSitePMOS : 'https://flextronics365.sharepoint.com/sites/gsd/intake_process/_api/web/sitegroups/getbyid(97)/users',


        /** ---------------------------------------------------
        // Get Project Folder
        // @param ({folderName})
        // @param /Files
        // --------------------------------------------------- **/
            getProjectFolder : "https://flextronics365.sharepoint.com/sites/gsd/intake_process/_api/web/getfolderbyserverrelativeurl",
        
        /** ---------------------------------------------------
        // Crate Folder Library
        // @param {projectID}
        // --------------------------------------------------- **/
            createProjectLibrary : 'https://flextronics365.sharepoint.com/sites/gsd/intake_process/_api/web/folders',


        
        
    }