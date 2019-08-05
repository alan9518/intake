/* ==========================================================================
** Get and Import all Actions
** 02/08/2019
** Alan Medina Silva
** ========================================================================== */





//? --------------------------------------
//? Get actions
//? --------------------------------------

        
    import { saveRequirementsDB, updateRequirementsDB } from './RequirementsDefinition/RequirementsDefinitionActions'

    import { saveBusinesInformationDB,updateBusinesInformationDB } from './BusinessInformation/BusinessInformationActions';

    import { saveTechnicalDB, updateTechnicalDB} from './TechnicalEvaluation/TechnicalEvaluationActions';

    import  {savePMOEvaluationDB, updatePMOEvaluation} from './PMOEvaluation/PMOEvaluationActions';

    import {saveROIRealizedDB, saveDynatraceDB, updateROIRealizedDB} from './ROIRealized/ROIRealizedActions';

    // import {fetchSitePMOS, findProjectFolder, createProjectLibray, fetchProjectFiles} from './sharepoint/SharepointActions';



//? --------------------------------------
//? Export Actions
//? --------------------------------------
    export {
        // --------------------------------------
        // New Values
        // --------------------------------------
        saveRequirementsDB,
        saveBusinesInformationDB,
        saveTechnicalDB,
        savePMOEvaluationDB,
        saveROIRealizedDB, 
        saveDynatraceDB,

        // --------------------------------------
        // Update Values
        // --------------------------------------
        updateRequirementsDB,
        updateBusinesInformationDB,
        updateTechnicalDB,
        updatePMOEvaluation,
        updateROIRealizedDB
    }