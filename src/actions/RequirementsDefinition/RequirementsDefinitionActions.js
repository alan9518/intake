/* ==========================================================================
** DB Connnection Actoins File
** 02/08/2019
** Alan Medina Silva
** ========================================================================== */

    // --------------------------------------
    // Imports
    // --------------------------------------
    import axios from 'axios';
    import {Endpoints} from '../../services/Endpoints';
    import moment from 'moment';



/* ==========================================================================
** Local Functions
** ========================================================================== */

    // --------------------------------------
    // Formart Date
    // --------------------------------------            
    const formatDate = (dateToFormat) => {
    
        return  moment(dateToFormat).format("DD/MM/YYYY")  
    }

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
        let newString = stringToFormat.replace(/&/g, '&amp;')
        return newString;        
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
** Requiremenst Definition Acttions
** ========================================================================== */

        
    /** --------------------------------------
    // Save Requirements on DB
    // @param {formData from RequirementsDefinition View}
    // @returns {Action}
    // -------------------------------------- */
    export async function saveRequirementsDB(formData) {
    console.log("TCL: saveRequirementsDB -> formData", formData)

        const newRequirementData = `<?xml version='1.0' encoding='utf-8'?>
        
                                    <soap12:Envelope xmlns:xsi='http://www.w3.org/2001/XMLSchema-instance' xmlns:xsd='http://www.w3.org/2001/XMLSchema' xmlns:soap12='http://www.w3.org/2003/05/soap-envelope'>
                                        <soap12:Body>
                                            <insertMainTab xmlns='http://tempuri.org/'>
                                                <maintab>
                                                    {
                                                        "project_name": "${removeSpecialCharacters(formData.Project_Name)}", 
                                                        "description": "${removeSpecialCharacters(formData.Description)}",
                                                        "project_type": "${formData.Project_Type.value}",
                                                        "Date_submitted": "${formData.Date_submitted || moment().format("DD/MM/YYYY")}",
                                                        "request_owner": "${formData.Request_Owner}",
                                                        "workstage": "${formData.Workstage.value}",
                                                        "expectedstart_date": "${formatDate(formData.Expected_Start_Date)}",
                                                        "expected_completion_date": "${formatDate(formData.Expected_completion_date)}",
                                                        "deadline_justification": "${removeSpecialCharacters(formData.Deadline_Justification)}",
                                                        "project_docs": [],
                                                        "created_by": "${formData.Created_by}",
                                                        "last_modifed_by": "${formData.Last_modifed_by}"
                                                    }
                                                </maintab>
                                            </insertMainTab>
                                        </soap12:Body>
                                    </soap12:Envelope>`;


            console.log("TCL: saveRequirementsDB -> newRequirementData", newRequirementData)
                        
        
            try {
                const newRequirementPromise = await fetch(Endpoints.saveRequirements, {
                        method: 'POST',
                        body : newRequirementData,
                        headers: {"Content-Type": "text/xml; charset=utf-8"}
                    });
                //console.log('TCL: fetchSitePMOS -> response', newRequirementPromise);
                const newRequirementReponse = await handlePOSTResponse(newRequirementPromise);
				console.log('TCL: saveRequirementsDB -> newRequirementReponse', newRequirementReponse)
                // dispatch(addRequirements(newRequirementReponse));



                return newRequirementReponse

            }
            catch (error) {
                //console.log('TCL: fetchSitePMOS -> error', error);
                throw (error);
            }
        
    }



    /** --------------------------------------
    // Save Requirements on DB
    // @param {formData from RequirementsDefinition View}
    // @returns {Action}
    // --------------------------------------*/
    export async function updateRequirementsDB(formData) {

        let projectID = formData.Project_id || formData.Request_ID
            projectID = projectID.indexOf('D') >= 0  ? projectID.substr(projectID.indexOf('D')+1,projectID.length) : projectID;

        const updateRequirementData =  {
            tab1: { 
                // "project_id": formData.Project_id || formData.newProjectID,
                "project_id": projectID,
                "project_name": removeSpecialCharacters(formData.Project_Name),
                "description":  removeSpecialCharacters(formData.Description),
                "project_type": formData.Project_Type.value,
                "date_submitted": formData.Date_submitted,
                "request_owner": formData.Request_Owner,
                "workstage": formData.Workstage.value,
                "expectedstart_date":  formatDate(formData.Expected_Start_Date) ,
                "expected_completion_date": formData.Expected_completion_date ? formatDate(formData.Expected_completion_date) : formatDate(formData.Expected_Completion_Date),
                "deadline_justification": removeSpecialCharacters(formData.Deadline_Justification),
                "last_modifed_by":formData.Last_modifed_by
            }
        }

        //console.log('TCL: updateRequirementsDB -> params', updateRequirementData)

        // "Accept": "JSON"
        

            try {
                const updateRequirementPromise = await fetch(Endpoints.updateRequirements, {
                        headers: { "Content-Type": "application/json; charset=utf-8" ,  "Accept": "text/plain"},
                        method: 'POST',
                        // body : (updateRequirementData)
                        body : JSON.stringify(updateRequirementData)
                })

                const updateRequirementResponse =  await updateRequirementPromise.text();
                console.log('TCL: updateRequirementsDB -> updateRequirementResponse', updateRequirementResponse)

                return updateRequirementResponse;


                // dispatch(updateRequirements(updateRequirementData));

            }
            catch (error) {
                //console.log('TCL: fetchSitePMOS -> error', error);
                throw (error);
            }


        


        
    }












    