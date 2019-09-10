/* ==========================================================================
** DB Connnection Actoins File
** 02/08/2019
** Alan Medina Silva
** ========================================================================== */

    // --------------------------------------
    // Imports
    // --------------------------------------
    
    import {Endpoints} from '../../services/Endpoints';
    import moment from 'moment';
    import axios from 'axios';

    const currentUser = window.getCurrentSPUser();



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

        if(!stringToFormat)
            return 

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
                                                        "Date_submitted": "${formatDate(formData.Date_submitted) || moment().format("DD/MM/YYYY")}",
                                                        "request_owner": "${formData.Request_Owner}",
                                                        "workstage": "${formData.Workstage.value}",
                                                        "expectedstart_date": "${formatDate(formData.Expected_Start_Date)}",
                                                        "expected_completion_date": "${formatDate(formData.Expected_completion_date)}",
                                                        "deadline_justification": "${removeSpecialCharacters(formData.Deadline_Justification)}",
                                                        "project_docs": [],
                                                        "created_by": "${ currentUser.userEmail ||  formData.created_by || formData.Created_by }",
                                                        "last_modifed_by": "${ currentUser.userEmail || formData.last_modifed_by || formData.created_by ||  formData.Created_by  }"
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
    export async function updateRequirementsDB(formData, id = null) {

        let projectID = formData.Request_ID || formData.Project_id || id
            console.log("TCL: updateRequirementsDB -> projectID", projectID)
        let Request_ID = projectID.indexOf('GSD') >= 0  ? projectID.substr(projectID.indexOf('GSD')+3,projectID.length) : projectID;
        console.log("TCL: updateRequirementsDB -> Request_ID", Request_ID)

        const updateRequirementData =  {
            tab1: { 
                // "project_id": formData.Project_id || formData.newProjectID,
                "project_id": Request_ID,
                "project_name": removeSpecialCharacters(formData.Project_Name),
                "description":  removeSpecialCharacters(formData.Description),
                "project_type": formData.Project_Type.value,
                "date_submitted": formData.Date_Submitted || formData.Date_submitted,
                "request_owner": formData.Request_Owner,
                "workstage": formData.Workstage.value,
                "expectedstart_date":  formatDate(formData.Expected_Start_Date) ,
                "expected_completion_date": formData.Expected_completion_date ? formatDate(formData.Expected_completion_date) : formatDate(formData.Expected_Completion_Date),
                "deadline_justification": removeSpecialCharacters(formData.Deadline_Justification),
                "last_modifed_by":  currentUser.userEmail ||  formData.Last_modifed_by 
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

                const updateRequirementResponse = await handlePOSTResponse(updateRequirementPromise);
                // const updateRequirementResponse =  await updateRequirementPromise.text();
                console.log('TCL: updateRequirementsDB -> updateRequirementResponse', updateRequirementResponse)

                return updateRequirementResponse;


                // dispatch(updateRequirements(updateRequirementData));

            }
            catch (error) {
                //console.log('TCL: fetchSitePMOS -> error', error);
                throw (error);
            }


        


        
    }





    /** --------------------------------------
    // Save Files
    // @param {formData from RequirementsDefinition View}
    // @returns {Action}
    // --------------------------------------*/

    export async function saveProjectFiles(projectID, docs, currentUser) {
        let project_id = projectID.indexOf('GSD') >= 0 ? projectID.substr(projectID.indexOf('GSD')+3,projectID.length) : projectID;
        const params = {project_id :project_id, project_docs : docs, last_by: currentUser}
       
            try {
                // const uploadDocsPromise = await axios.post(Endpoints.uploadRequirementsFiles, {params});
                const uploadDocsPromise =  await fetch(Endpoints.uploadRequirementsFiles, {
                        method: 'POST',
                        body : JSON.stringify(params),
                        headers: {"Content-Type": "application/json; charset=utf-8"}
                });
                const uploadDocsResponse = await uploadDocsPromise.data;

                return uploadDocsResponse
				//console.log('TCL: saveProjectFiles -> uploadDocsResponse', uploadDocsResponse)

            }
            catch (error) {
				//console.log('TCL: catch -> error', error)
                
                throw (error);
            }
        
    }


    
    /** --------------------------------------
    // Get Files From Sharepoint after 
    // The project is updated 
    // Or Created
    // @param {formData from RequirementsDefinition View}
    // @returns {Action}
    // --------------------------------------*/

    export async function getSharepointReqFiles(currentProject , folderName = 'RequirementsDefinition') {

        let projectIDFolder = currentProject.indexOf('GSD') >= 0 ? currentProject : `GSD${currentProject}`
        console.log("TCL: formHolder -> getSharepointFilesByProject -> projectIDFolder", projectIDFolder)

        let folderURL = `intakeFiles/${projectIDFolder}/${folderName}`
        let serviceUrl = `${Endpoints.getProjectFolder}('${folderURL}')/Files?$expand=LinkingUri`;
        // let projectFiles = [];
        console.log("TCL: fetchProjectFiles -> serviceUrl", serviceUrl)

     
        try {
            // const reqFilesPromise = await fetch(serviceUrl, {
            //         headers: { "Content-Type": "application/json; charset=utf-8" ,  "Accept": "text/plain"},
            //         method: 'GET',
            //         // body : (updateRequirementData)
            //         // body : JSON.stringify(updateRequirementData)
            // })

            // const reqFilesData = await handlePOSTResponse(reqFilesPromise);
            // // const reqFilesData =  await reqFilesPromise.text();
            // console.log('TCL: updateRequirementsDB -> reqFilesData', reqFilesData)

            // return reqFilesData;


            // const reqFilesPromise = await axios.get(serviceUrl);
            // const reqFilesData =  await reqFilesPromise.data.value
            // console.log("TCL: getSharepointReqFiles -> reqFilesData", reqFilesData)


            // return reqFilesData

            return axios.get(serviceUrl);

            // dispatch(updateRequirements(updateRequirementData));

        }
        catch (error) {
            //console.log('TCL: fetchSitePMOS -> error', error);
            throw (error);
        }
        
    }









    