/* ==========================================================================
** Technical Evaluation Actions
** 02/08/2019
** Alan Medina Silva
** ========================================================================== */

// --------------------------------------
// Get Dependences
// --------------------------------------
    import axios from 'axios';
    import { Endpoints } from '../../services/Endpoints';
    import moment from 'moment';

/* ==========================================================================
** Local Functions
** ========================================================================== */

    
    // --------------------------------------
    // Formart Date
    // --------------------------------------            
    const formatDate = (dateToFormat) => {
    
        console.log("TCL: formatDate -> dateToFormat", dateToFormat)
        console.log("TCL: formatDate ->  empty date",  moment().format("DD/MM/YYYY"))

        if(!dateToFormat ||  dateToFormat === "")
            return moment().format("DD/MM/YYYY") 
            

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
    // Generate Sites Impacted String
    // --------------------------------------
    const formatMultipleSelectValues = (arrayValues) => {
        let arrayValuesString = [];
        for (let arrayValue of arrayValues) {
            if( arrayValue !== undefined ||  arrayValue !== null  ) {
                if(arrayValue.value ||  arrayValue.value !== "" )
                    arrayValuesString.push(arrayValue.value);
            }
            
        }

        const valuesString = arrayValuesString.join('||');
		//console.log('TCL: formatSitesImpacted -> valuesString', valuesString)
        
        
        return valuesString;
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
        // Save Technical Evaluation on DB
        // @param {formData from Techinical Evaluation View}
        // @returns {Action}
        // -------------------------------------- */
        export async function saveTechnicalDB(formData,  projectID = null) {
            //console.log('TCL: saveTechnicalDB -> formData', formData)
            // "Delivery_Team" : "${formData.Delivery_Team.value}",
            // "Delivery_Team" : "${removeSpecialCharacters(formData.Delivery_Team.value)}",


            // "15/07/2019"



            // "Target_Start_Date": "${formatDate(formData.Target_Start_Date)}",
            // "Target_Go_Live_Date": "${formatDate(formData.Target_Go_Live_Date)}",
            // "Approval_Date" :  "${formatDate(formData.Approval_Date)}",

            const newTechnicalData =  `<?xml version='1.0' encoding='utf-8'?>
            
                                            <soap12:Envelope xmlns:xsi='http://www.w3.org/2001/XMLSchema-instance' xmlns:xsd='http://www.w3.org/2001/XMLSchema' xmlns:soap12='http://www.w3.org/2003/05/soap-envelope'>
                                                <soap12:Body>
                                                    <insertTechEval xmlns='http://tempuri.org/'>
                                                        <techeval>
                                                            {
                                                                "project_id" : "${ projectID !== null ? projectID : formData.Project_ID}", 
                                                                "Delivery_Team" : "${formData.Delivery_Team.value === undefined ? removeSpecialCharacters(formData.Delivery_Team) : removeSpecialCharacters(formData.Delivery_Team.value )}",
                                                                "Platform_type" : "${removeSpecialCharacters(formData.Platform_type.value)}",
                                                                "Applications_involved" : "${removeSpecialCharacters(formData.Applications_involved.value)}",
                                                                "Technology" : "${formatMultipleSelectValues(formData.Technology)}",
                                                                "IT_Groups_Required" : "${removeSpecialCharacters(formData.IT_Groups_Required.value)}",
                                                                "Estimated_Effort" : "${formData.Estimated_Effort.value}",
                                                                "Project_TShirt_Size" : "${formData.Project_Team_Size.value}",
                                                                "Project_Manager" : "${formData.Project_Manager}",
                                                                "Target_Start_Date": "${formatDate(formData.Target_Start_Date)}",
                                                                "Target_Go_Live_Date": "${formatDate(formData.Target_Go_Live_Date)}",
                                                                "IT_FTE_required" : "${formData.IT_FTE_required}",
                                                                "Approver" : "${formData.Approver}",
                                                                "Approval_Date" :  "${formatDate(formData.Approval_Date)}",
                                                                "Justification_ROI" : "${removeSpecialCharacters(formData.Justification_ROI)}",
                                                                "DDT_Effort" :"${formData.Design_Development_Testing_Effort}",
                                                                "Travel_TE" : "${formData.Travel_TE}",
                                                                "Consulting" : "${formData.Consulting}",
                                                                "Training" : "${formData.Training}",
                                                                "Licenses_Cost_per_year" : "${formData.Licenses_Cost_per_year}",
                                                                "Hardware_leasing" : "${formData.Hardware_leasing}",
                                                                "Maintenance_Hardware" : "${formData.Maintenance_Hardware_hours_per_year}",
                                                                "Maintenance_Salaries" : "${formData.Maintenance_Salaries_hours_per_year}",
                                                                "No_of_Sites" : "${formData.No_of_Sites}",
                                                                "No_of_Active_users" : "${formData.No_of_Active_users}",
                                                                "created_by": "${formData.Created_by}",
                                                                "last_modifed_by": "${formData.Last_modifed_by}" 
                                                            }
                                                        </techeval>
                                                    </insertTechEval>
                                                </soap12:Body>
                                            </soap12:Envelope>`;

            


            
                try {

                    const newTechnicalPromise = await fetch(Endpoints.saveTechincalEvaluation, {
                        method: 'POST',
                        body : newTechnicalData,
                        headers: {"Content-Type": "text/xml; charset=utf-8; charset=utf-8"}
                    });

                    const newTechnicalReponse = await handlePOSTResponse(newTechnicalPromise);
                    console.log('TCL: saveRequirementsDB -> newTechnicalReponse', newTechnicalReponse)

                    return newTechnicalReponse;

                    // dispatch(addTechnical(newTechnicalReponse));
                }
                catch (error) {
                    //console.log('TCL: fetchSitePMOS -> error', error);
                    throw (error);
                }
            
        }




         /** --------------------------------------
        // Save Technical Evaluation on DB
        // @param {formData from Techinical Evaluation View}
        // @returns {Action}
        // -------------------------------------- */
        export async function updateTechnicalDB(formData, id = null) {
            //console.log('TCL: formData', formData)

            const updateTechnicalData = {
                tab3 :{
                    "project_id" : formData.Project_id || formData.Project_ID || id || null,
                    "tech_eval_id" : formData.Tech_eval_id || formData.tech_eval_id,
                    "Delivery_Team" : formData.Delivery_Team.value === undefined ? removeSpecialCharacters(formData.Delivery_Team) : removeSpecialCharacters(formData.Delivery_Team.value ),
                    "Platform_type" : removeSpecialCharacters(formData.Platform_type.value),
                    "Applications_involved" : removeSpecialCharacters(formData.Applications_involved.value),
                    "Technology" : formatMultipleSelectValues(formData.Technology),
                    "IT_Groups_Required" : removeSpecialCharacters(formData.IT_Groups_Required.value),
                    "Estimated_Effort" : formData.Estimated_Effort.value,
                    "Project_TShirt_Size" : formData.Project_Team_Size.value,
                    "Project_Manager" : formData.Project_Manager,
                    "Target_Start_Date" : formatDate(formData.Target_Start_Date),
                    "Target_Go_Live_Date" : formatDate(formData.Target_Go_Live_Date),
                    "IT_FTE_required" : formData.IT_FTE_required,
                    "Approver" : formData.Approver,
                    "Approval_Date" : formatDate(formData.Approval_Date),
                    "Justification_ROI" : removeSpecialCharacters(formData.Justification_ROI),
                    "DDT_Effort" : formData.Design_Development_Testing_Effort,
                    "Travel_TE" : formData.Travel_TE,
                    "Consulting" : formData.Consulting,
                    "Training" : formData.Training,
                    "Licenses_Cost_per_year" : formData.Licenses_Cost_per_year,
                    "Hardware_leasing" : formData.Hardware_leasing,
                    "Maintenance_Hardware" : formData.Maintenance_Hardware_hours_per_year,
                    "Maintenance_Salaries" : formData.Maintenance_Salaries_hours_per_year,
                    "No_of_Sites" : formData.No_of_Sites,
                    "No_of_Active_users" : formData.No_of_Active_users,
                    "last_modifed_by" : formData.Last_modifed_by || 'alan.medina@flex.com'
                }

            }

            //console.log('TCL: updateTechnicalDB -> updateTechnicalData', updateTechnicalData)
            
                try {
                    const updateTechnicalPromise = await fetch(Endpoints.updateTechnical, {
                            headers: { "Content-Type": "application/json; charset=utf-8" ,  "Accept": "text/plain"},
                            method: 'POST',
                            body : JSON.stringify(updateTechnicalData)
                    })

                    const updateTechnicalResponse =  await updateTechnicalPromise.text();
                    console.log('TCL: updateTechnicalsDB -> updateTechnicalResponse', updateTechnicalResponse)

                    return updateTechnicalResponse;

                    // dispatch(updateTechnical(updateTechnicalData));

                }
                catch (error) {
                    //console.log('TCL: fetchSitePMOS -> error', error);
                    throw (error);
                }

            
        }
        
