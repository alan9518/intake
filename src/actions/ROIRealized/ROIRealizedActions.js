/* ==========================================================================
** ROI Realized Actions
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
    
        return  moment(dateToFormat).format("DD/MM/YYYY")  
    }


    // --------------------------------------
    // Remove & from values
    // --------------------------------------
    const removeSpecialCharacters = (stringToFormat) => {        
        if(stringToFormat ===  null || stringToFormat === "")
            return "";

        let newString = stringToFormat.replace(/&/g, '&amp;');    
        return newString;
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



    /** --------------------------------------
     * Iterate Data and Create new Arary
    // @param {form Data []
    // @returns {new Data []}
    // -------------------------------------- */
    function createDynatraceData(formData,  projectID = null, newRoiRealizedID = null) {

        const dynatraceData = formData.map((data)=>{
            // if(data.project_id === null)
            let newData = {
                "project_id": parseInt( projectID !== null ? projectID : data.project_id ),
                "roi_real_id": parseInt(newRoiRealizedID !== null ? newRoiRealizedID :  data.roi_real_id),
                "site_usage":  data.Usage_Footprint_1_week ? removeSpecialCharacters(data.Usage_Footprint_1_week) : removeSpecialCharacters(data.site_usage) ,
                "usage_footprint": data.Site_Usage ?  removeSpecialCharacters(data.Site_Usage) : removeSpecialCharacters(data.usage_footprint),
                "tpm": data.Transactions_per_minute_TPM ? removeSpecialCharacters(data.Transactions_per_minute_TPM) : removeSpecialCharacters(data.tpm),
                "roi_date": data.ROI_Realized_Date ? formatDate(data.ROI_Realized_Date) : formatDate(data.roi_date),
                "created_by": data.Created_by
            }
            return newData;
        })

        return dynatraceData
    }


/* ==========================================================================
** Actions Functions
** ========================================================================== */


/** --------------------------------------
    // Save Requirements on DB
    // @param {formData from RequirementsDefinition View}
    // @returns {Action}
    // -------------------------------------- */

    export async function saveROIRealizedDB(formData, projectID = null) {

        const newROIRealizedData = `<?xml version='1.0' encoding='utf-8'?>
                                    <soap12:Envelope xmlns:xsi='http://www.w3.org/2001/XMLSchema-instance' xmlns:xsd='http://www.w3.org/2001/XMLSchema' xmlns:soap12='http://www.w3.org/2003/05/soap-envelope'>
                                        <soap12:Body>
                                            <insertROIReal xmlns='http://tempuri.org/'>
                                                <roireal>
                                                    {
                                                        "project_id" : "${ projectID !== null ? projectID : formData.Project_ID}", 
                                                        "Implementation_Date" : "${formatDate(formData.Implementation_Date)}",
                                                        "FTE_Saved" : "${formData.FTE_Saved_per_year}",
                                                        "Hours_saved" : "${formData.Hours_saved_per_year}",
                                                        "compliance_risk_cost_roi" : "${formData.Compliance_Ris_cost_that_was_avoided_by_this_application}",
                                                        "risk_avoidance_roi" : "${formData.Risk_Avoidance}",
                                                        "retirement_savings_roi" :"${formData.Savings_from_Retirement_of_Legacy_application_in_hours_per_year_by_Maintenance_Team}",
                                                        "infra_license_fee_savings_roi" : "${formData.Legacy_System_Infra_and_License_Fee_savings_per_year}",
                                                        "Other_Savings_roi" : "${formData.Other_Savings}",
                                                        "DDT_Effort_roi" : "${formData.Design_Developmen_Testing_Effort_hours}",
                                                        "Travel_TE_roi" : "${formData.Travel_TE}",
                                                        "Consulting_roi" : "${formData.Consulting}",
                                                        "Training_roi" : "${formData.Training}",
                                                        "Licenses_Cost_per_year_roi" : "${formData.Licenses_Cost_per_year}",
                                                        "Hardware_leasing_roi" : "${formData.Hardware_leasing}",
                                                        "Maintenance_Hardware_roi" : "${formData.Maintenance_Hardware_hours_per_year}",
                                                        "Maintenance_Salaries_roi" : "${formData.Maintenance_Salaries_hours_per_year}",
                                                        "Site_Usage" : "${formData.Site_Usage}",
                                                        "Usage_Footprint_week" : "${formData.Usage_Footprint_1_week}",
                                                        "Transactions_per_minute" : "${formData.Transactions_per_minute_TPM}",
                                                        "ROI_Realized_Date" : "${moment().format("DD/MM/YYYY")}",
                                                        "created_by": "${formData.Created_by}",
                                                        "last_modifed_by": "${formData.Last_modifed_by}"
                                                    }
                                                </roireal>
                                            </insertROIReal>
                                        </soap12:Body>
                                    </soap12:Envelope>`;
                        
        
            try {
                const newROIRealizedPromise = await fetch(Endpoints.saveROIRealized, {
                        method: 'POST',
                        body : newROIRealizedData,
                        headers: {"Content-Type": "text/xml; charset=utf-8"}
                    });
                //console.log('TCL: fetchSitePMOS -> response', newROIRealizedPromise);
                const newROIRealizedReponse = await handlePOSTResponse(newROIRealizedPromise);
                console.log('TCL: saveRequirementsDB -> newROIRealizedReponse', newROIRealizedReponse)
                

                return newROIRealizedReponse

                // dispatch(addROIRealized(newROIRealizedReponse));
            }
            catch (error) {
                //console.log('TCL: fetchSitePMOS -> error', error);
                throw (error);
            }
        
    }


    /** --------------------------------------
    // upload Requirements on DB
    // @param {formData from RequirementsDefinition View}
    // @returns {Action}
    // -------------------------------------- */
    export async function updateROIRealizedDB(formData) {
        //console.log('TCL: updateROURealizedDB -> formData', formData)
        
        const updateROIRealizedData = {
            tab5 : {
                "project_id": formData.Project_ID ? parseInt(formData.Project_ID) : parseInt(formData.project_id),
                "roi_real_id" : formData.Roi_real_id || formData.roi_real_id,
                "Implementation_Date" : formatDate(formData.Implementation_Date),
                "FTE_Saved" : formData.FTE_Saved_per_year ? formData.FTE_Saved_per_year : formData.FTE_Saved,
                "Hours_saved" : formData.Hours_saved_per_year ? formData.Hours_saved_per_year : formData.Hours_saved,
                "compliance_risk_cost_roi" : formData.Compliance_Ris_cost_that_was_avoided_by_this_application ? formData.Compliance_Ris_cost_that_was_avoided_by_this_application : formData.compliance_risk_cost_roi,
                "risk_avoidance_roi" : formData.Risk_Avoidance ? formData.Risk_Avoidance : formData.risk_avoidance_roi,
                "retirement_savings_roi" : formData.Savings_from_Retirement_of_Legacy_application_in_hours_per_year_by_Maintenance_Team ? formData.Savings_from_Retirement_of_Legacy_application_in_hours_per_year_by_Maintenance_Team : formData.retirement_savings_roi,
                "infra_license_fee_savings_roi" : formData.Legacy_System_Infra_and_License_Fee_savings_per_year ? formData.Legacy_System_Infra_and_License_Fee_savings_per_year : formData.infra_license_fee_savings_roi,
                "Other_Savings_roi" : formData.Other_Savings ? formData.Other_Savings : formData.Other_Savings_roi,
                "DDT_Effort_roi" : formData.Design_Developmen_Testing_Effort_hours ? formData.Design_Developmen_Testing_Effort_hours : formData.DDT_Effort_roi,
                "Travel_TE_roi" : formData.Travel_TE ? formData.Travel_TE : formData.Travel_TE_roi ,
                "Consulting_roi" : formData.Consulting ? formData.Consulting : formData.Consulting_roi,
                "Training_roi" : formData.Training ? formData.Training : formData.Training_roi,
                "Licenses_Cost_per_year_roi" : formData.Licenses_Cost_per_year ? formData.Licenses_Cost_per_year : formData.Licenses_Cost_per_year_roi,
                "Hardware_leasing_roi" : formData.Hardware_leasing ? formData.Hardware_leasing : formData.Hardware_leasing_roi,
                "Maintenance_Hardware_roi" : formData.Maintenance_Hardware_hours_per_year ? formData.Maintenance_Hardware_hours_per_year : formData.Maintenance_Hardware_roi ,
                "Maintenance_Salaries_roi" : formData.Maintenance_Salaries_hours_per_year ? formData.Maintenance_Salaries_hours_per_year : formData.Maintenance_Salaries_roi,
                "Site_Usage" : formData.Site_Usage,
                "Usage_Footprint_week" : null ,
                "Transactions_per_minute" : null ,
                "ROI_Realized_Date" : formatDate(new Date()) ,
                "last_modifed_by" : formData.Last_modifed_by,
            }
        }

        //console.log('TCL: updateROIRealizedDB -> updateROIRealizedData', updateROIRealizedData)

        
            try {
                const updateROIRealizedPromise = await fetch(Endpoints.updateROIRealized, {
                        headers: { "Content-Type": "application/json; charset=utf-8" ,  "Accept": "text/plain"},
                        method: 'POST',
                        body : JSON.stringify(updateROIRealizedData)
                })

                const updateROIRealizedResponse =  await updateROIRealizedPromise.text();
				console.log('TCL: updateROIRealizedsDB -> updateROIRealizedResponse', updateROIRealizedResponse)
                // dispatch(updateROIRealized(updateROIRealizedData));

                return updateROIRealizedResponse;

            }
            catch (error) {
				//console.log('TCL: catch -> error', error)
                throw (error);
            }

        

    }


    /** --------------------------------------
    // Upload Dynatrace
    // @param {formData from RequirementsDefinition View}
    // @returns {Action}
    // -------------------------------------- */
    export async function saveDynatraceDB(formData, projectID = null, newRoiRealizedID = null) {
        
        const saveDynatraceObject =  createDynatraceData(formData, projectID, newRoiRealizedID);

        const saveDynatraceData = {
            roitrac : saveDynatraceObject
        }

        
            try {
                const saveDynatracePromise = await fetch(Endpoints.saveDynatrace, {
                        headers: { "Content-Type": "application/json; charset=utf-8" ,  "Accept": "text/plain"},
                        method: 'POST',
                        body : JSON.stringify(saveDynatraceData)
                })

                const saveDynatraceResponse =  await saveDynatracePromise.text();
                console.log('TCL: saveDynatracesDB -> saveDynatraceResponse', saveDynatraceResponse)
                
                return saveDynatraceResponse
                // dispatch(addROIRealized(updateROIRealizedData));

            }
            catch (error) {
				//console.log('TCL: catch -> error', error)
                throw (error);
            }

        

        
    }   