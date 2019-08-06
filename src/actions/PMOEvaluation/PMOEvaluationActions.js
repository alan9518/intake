/* ==========================================================================
** PMOEvaluation Definitions Actions
** 02/08/2019
** Alan Medina Silva
** ========================================================================== */

// --------------------------------------
// Get Dependences
// --------------------------------------
    import axios from 'axios';
    import { Endpoints } from '../../services/Endpoints';




/* ==========================================================================
** Local Functions
** ========================================================================== */

    
    // --------------------------------------
    // Split Data to Get New Project ID
    // --------------------------------------
    const formatXMLReponse = (response) => {
        const splitResponse = response.split(']');
        const projectIDText = splitResponse[0].split(':')[1];
        return projectIDText;        
    }


    // --------------------------------------
    // Remove & from values
    // --------------------------------------
    const removeSpecialCharacters = (stringToFormat) => {
        
        if(stringToFormat ===  null || stringToFormat === "")
            return "";

        let newString = stringToFormat.replace(/&/g, '&amp;')
        
        return newString;
        
    }


    // --------------------------------------
    // Get Files Array
    // --------------------------------------
    const getFilesNamesArray = (Project_ID, filesArray)=> {
        console.log("TCL: getFilesNamesArray -> Project_ID", Project_ID)

        if(filesArray === [] || filesArray.length <= 0)
            return '';

        
        const filesNamesArray = filesArray.map((file) => {
            console.log("TCL: getFilesNamesArray -> file", file)    
            if(file.name && file.accepted === true) {
                let fileURL = `sites/gsd/intake_process/intakeFiles/GSD${Project_ID}/PMO`;
                return `${fileURL}/${file.name}` 
            }
                
            else   
                return file.name || file
        });
        
        console.log('TCL: getFilesNamesArray -> filesNamesArray', filesNamesArray)
        let filesString  = (filesNamesArray).join(',');

        console.log("TCL: getFilesNamesArray -> filesString", filesString)
        return filesString.replace(/'/g, '');

        // return (filesNamesArray).join();
    }


    // --------------------------------------
    // Handle POST Response
    // --------------------------------------
    async function handlePOSTResponse(response) {
        //console.log('TCL: handlePOSTResponse -> response', response)
        if (response.ok) {
            const responseText = await response.text()
			//console.log('TCL: handlePOSTResponse -> responseText', responseText)
            const projectID = formatXMLReponse(responseText);
            return projectID;
            // return response.text();
        } else {
            let error = new Error(response.statusText);
            error.response = response;
        throw error;
        }
    }


/* ==========================================================================
** Actions Functions
** ========================================================================== */



    /** --------------------------------------
    // Save Data on DB 
    // @param {formData from PMOEvaluationDefinition View}
    // @returns {Action}
    // "Documents":["${getFilesNamesArray(formData.Project_ID, formData.Documents)}"],
    // -------------------------------------- */
    export async function savePMOEvaluationDB(formData, projectID = null) {

        let dbFiles = formData.Documents.length <= 0 ? '' :  `'${getFilesNamesArray(formData.Project_ID, formData.Documents)}'`
        const newPMOEvaluationtData = `<?xml version='1.0' encoding='utf-8'?>
		
                                        <soap12:Envelope xmlns:xsi='http://www.w3.org/2001/XMLSchema-instance' xmlns:xsd='http://www.w3.org/2001/XMLSchema' xmlns:soap12='http://www.w3.org/2003/05/soap-envelope'>
                                            <soap12:Body>
                                                <insertPMOEval xmlns='http://tempuri.org/'>
                                                    <pmoeval>
                                                        {
                                                            "project_id": "${ projectID !== null ? projectID : formData.Project_ID}", 
                                                            "Expected_total_ROI": "${formData.Expected_total_ROI}",
                                                            "Expected_IRR": "${formData.Expected_IRR}",
                                                            "ROI_Category": "${formData.ROI_Category.value}",
                                                            "WorkID": "${removeSpecialCharacters(formData.WorkID_PlanView_FlexPM_SN_Ticket)}",
                                                            "Documents":[${dbFiles}],
                                                            "created_by": "${formData.Created_by}",
                                                            "last_modifed_by": "${formData.Last_modifed_by}"
                                                        }
                                                    </pmoeval>
                                                </insertPMOEval>
                                            </soap12:Body>
                                        </soap12:Envelope>`;

        //console.log('TCL: savePMOEvaluationDB -> newPMOEvaluationtData', newPMOEvaluationtData);


        
            try {
                const newPMOEvaluationPromise = await fetch(Endpoints.savePMOEvaluation, {
                        method: 'POST',
                        body : newPMOEvaluationtData,
                        headers: {"Content-Type": "text/xml; charset=utf-8"}
                    });
                //console.log('TCL: fetchSitePMOS -> response', newPMOEvaluationPromise);
                const newPMOEvaluationReponse = await handlePOSTResponse(newPMOEvaluationPromise);
                console.log('TCL: savePMOEvaluationDB -> newPMOEvaluationReponse', newPMOEvaluationReponse)

                return newPMOEvaluationReponse;

                // dispatch(addPMOEvaluation(newPMOEvaluationReponse));
            }
            catch (error) {
                //console.log('TCL: fetchSitePMOS -> error', error);
                throw (error);
            }
        
    }



    /** --------------------------------------
    // Update Data on DB 
    // @param {formData from PMOEvaluationDefinition View}
    // @returns {Action}
    // "Documents": [`"${getFilesNamesArray(formData.Project_ID, formData.Documents)}"`],
    // "Documents": [`${getFilesNamesArray(formData.Project_ID, formData.Documents)}`],
    // -------------------------------------- */
    export async function updatePMOEvaluation(formData, id = null) {
        
        let dbFiles = formData.Documents.length <= 0 ? '' :  `${getFilesNamesArray(formData.Project_ID, formData.Documents)}`
        const updatePMOEvaluationData = {
            tab4 : {
                "project_id": parseInt(formData.Project_ID) || id,
                "pmo_eval_id" : formData.Pmo_eval_id || formData.pmo_eval_id,
                "Expected_total_ROI": formData.Expected_total_ROI,
                "Expected_IRR": formData.Expected_IRR,
                "ROI_Category": formData.ROI_Category.value,
                "WorkID": removeSpecialCharacters(formData.WorkID_PlanView_FlexPM_SN_Ticket),
                "Documents":[`${dbFiles}`],
                "last_modifed_by": formData.Last_modifed_by || 'alan.medina@flex.com'
            }
        }

        //console.log('TCL: updatePMOEvaluation -> updatePMOEvaluationData', updatePMOEvaluationData)

        

            try {
                const updatePMOEvaluationPromise = await fetch(Endpoints.updatePMOEvaluation, {
                        headers: { "Content-Type": "application/json; charset=utf-8" ,  "Accept": "text/plain"},
                        method: 'POST',
                        body : JSON.stringify(updatePMOEvaluationData)
                })

                const updatePMOEvaluationResponse =  await updatePMOEvaluationPromise.text();
                console.log('TCL: updatePMOEvaluationsDB -> updatePMOEvaluationResponse', updatePMOEvaluationResponse)
                
                return updatePMOEvaluationResponse;

                // dispatch(updatePMOEvaluations(updatePMOEvaluationData));

            }
            catch (error) {
                //console.log('TCL: fetchSitePMOS -> error', error);
                throw (error);
            }
        
    }
