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
            getAllProjects : 'https://wsprojectintakenew.azurewebsites.net/projectintake.asmx/getAllProjectList',

        /** --------------------------------------
        // Get All Projects By Owner
        // @param {created_by <Email>} abc@flex.com
        // --------------------------------------*/
            getProjectsByUser : 'https://wsprojectintakenew.azurewebsites.net/projectintake.asmx/getProjectList',
            
        /** --------------------------------------
        // Save Requirements
        // @param {op <String>} insertMainTab
        // --------------------------------------*/
            saveRequirements : 'https://wsprojectintakenew.azurewebsites.net/projectintake.asmx?op=insertMainTab',

        /** --------------------------------------
        // Save BusinessInfo
        // @param {op <String>} insertBussInfo
        // --------------------------------------*/
            saveBusinessInfo : 'https://wsprojectintakenew.azurewebsites.net/projectintake.asmx?op=insertBussInfo',
        

        /** --------------------------------------
        // Save BusinessInfo
        // @param {op <String>} insertTechEval
        // --------------------------------------*/
            saveTechincalEvaluation : 'https://wsprojectintakenew.azurewebsites.net/projectintake.asmx?op=insertTechEval',

        /** --------------------------------------
        // Save PMO Evaluation
        // @param {op <String>} insertPMOEval
        // --------------------------------------*/
            savePMOEvaluation : 'https://wsprojectintakenew.azurewebsites.net/projectintake.asmx?op=insertPMOEval',

        /** --------------------------------------
        // Save ROI Realized
        // @param {op <String>} insertROIReal
        // --------------------------------------*/
            saveROIRealized : 'https://wsprojectintakenew.azurewebsites.net/projectintake.asmx?op=insertROIReal',


          /** --------------------------------------
        // Save ROI Realized
        // @param {op <String>} insertROIReal
        // --------------------------------------*/
            saveDynatrace : 'https://wsprojectintakenew.azurewebsites.net/projectintake.asmx/setROITrace',

    /* ==========================================================================
    ** READ
    ** ========================================================================== */

        /** --------------------------------------
        // Get Requirements By ID
        // @param {project_id <String>} 88
        // --------------------------------------*/
            getRequirements : 'https://wsprojectintakenew.azurewebsites.net/projectintake.asmx/getMainTab',


        /** --------------------------------------
        // Get Requirements Docs By ID
        // @param {project_id <String>} 88
        // --------------------------------------*/
            getRequirementsFiles : 'https://wsprojectintakenew.azurewebsites.net/projectintake.asmx/getProjDocs',

        
        /** --------------------------------------
        // Get Business By ID
        // @param {project_id <String>} 88
        // --------------------------------------*/
            getBusiness : 'https://wsprojectintakenew.azurewebsites.net/projectintake.asmx/getBussInfo',

        /** --------------------------------------
        // Get getTechEval By ID
        // @param {project_id <String>} 88
        // --------------------------------------*/
            getTechnical : 'https://wsprojectintakenew.azurewebsites.net/projectintake.asmx/getTechEval',

        /** --------------------------------------
        // Get PMO Evaluation By ID
        // @param {project_id <String>} 88
        // --------------------------------------*/
            getPMOEvaluation : 'https://wsprojectintakenew.azurewebsites.net/projectintake.asmx/getPMOEval',

        
         /** --------------------------------------
        // Get PMO Evaluation Docs By ID
        // @param {project_id <String>} 88
        // --------------------------------------*/
            getPMOEvaluationFiles : 'https://wsprojectintakenew.azurewebsites.net/projectintake.asmx/getPMODocs',


        /** --------------------------------------
        // Get Requirements By ID
        // @param {project_id <String>} 88
        // --------------------------------------*/
            getROIRealized : 'https://wsprojectintakenew.azurewebsites.net/projectintake.asmx/getROIReal',

        /** --------------------------------------
        // Get Requirements By ID
        // @param {project_id <String>} 88
        // @param {roi_id <String>} 12
        // --------------------------------------*/
            // getROITrace : 'http://wsprojectintakenew.azurewebsites.net/projectintake.asmx/getROITrace?project_id=146&roi_id=12',
            getROITrace : 'https://wsprojectintakenew.azurewebsites.net/projectintake.asmx/getROITrace',

    /* ==========================================================================
    ** UPDATES
    ** ========================================================================== */

        /** --------------------------------------
        // Update Requirements
        // @param {op <String>} insertMainTab
        // --------------------------------------*/
            updateRequirements : 'https://wsprojectintakenew.azurewebsites.net/projectintake.asmx/updateMainTab',
        
        /** --------------------------------------
        // Update Business Info
        // @param {op <String>} insertMainTab
        // --------------------------------------*/
            updateBusiness : 'https://wsprojectintakenew.azurewebsites.net/projectintake.asmx/updateBussInfo',

        /** --------------------------------------
        // Update Business Info
        // @param {op <String>} insertMainTab
        // --------------------------------------*/
            updateTechnical : 'https://wsprojectintakenew.azurewebsites.net/projectintake.asmx/updateTechEval',

        /** --------------------------------------
        // Update Business Info
        // @param {op <String>} insertMainTab
        // --------------------------------------*/
            updatePMOEvaluation : 'https://wsprojectintakenew.azurewebsites.net/projectintake.asmx/updatePMOEval',


        /** --------------------------------------
        // Update Business Info
        // @param {op <String>} insertMainTab
        // --------------------------------------*/
            updateROIRealized : 'https://wsprojectintakenew.azurewebsites.net/projectintake.asmx/updateROIReal',


        

        /** --------------------------------------
        // Upload Files on Requirements Tab
        // @param {project_id <String>} 
        // @param {project_docs <String>} test.pdf,abc.docx
        // @param {last_by <String>} mail@flex.com
        // --------------------------------------*/
            uploadRequirementsFiles : 'https://wsprojectintakenew.azurewebsites.net/projectintake.asmx/setProjDocs',
            // uploadRequirementsFiles : 'https://wsprojectintakenew.azurewebsites.net/projectintake.asmx/setProjectDocs?project_id=8&project_docs=test.pdf,abc.docx&last_by=abc@flex.com'



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