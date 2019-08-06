/* ==========================================================================
** Business Information Actions
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


    // --------------------------------------
    // Generate Sites Impacted String
    // --------------------------------------
    const formatSitesImpacted = (sitesArray) => {

        // ? Check if the sites are already in string format
        if(sitesArray.indexOf('||') >= 0)
            return sitesArray

        let sitesArrayString = [];
        for (let site of sitesArray) {
            sitesArrayString.push(site.value);
        }

        const sitesString = sitesArrayString.join('||');
        //console.log('TCL: formatSitesImpacted -> sitesString', sitesString)
        
        return sitesString;
    }






/* ==========================================================================
** Actions Functions
** ========================================================================== */


    
    /** --------------------------------------
    // Save Business on DB
    // @param {formData from Business Information View}
    // @param {projectID from ReqDef when saving other Tabs at the same time}
    // @returns {Action}
    // -------------------------------------- */
    export async function saveBusinesInformationDB(formData, projectID = null)  {
        // "sites_impacted" : "${formData.Sites_Impacted}", 
        const newBusinessData =  `<?xml version='1.0' encoding='utf-8'?>
                                    <soap12:Envelope xmlns:xsi='http://www.w3.org/2001/XMLSchema-instance' xmlns:xsd='http://www.w3.org/2001/XMLSchema' xmlns:soap12='http://www.w3.org/2003/05/soap-envelope'>
                                        <soap12:Body>
                                            <insertBussInfo xmlns='http://tempuri.org/'>
                                                <bussinfo>
                                                    {
                                                        "project_id" : "${projectID !== null ? projectID : formData.Project_ID}", 
                                                        "business_objective" : "${removeSpecialCharacters(formData.Business_Objective)}", 
                                                        "outcomes_objective" : "${removeSpecialCharacters(formData.Outcomes_from_the_Objective)}", 
                                                        "impact" : "${removeSpecialCharacters(formData.Impact)}", 
                                                        "background" : "${removeSpecialCharacters(formData.Background)}", 
                                                        "dependencies" : "${removeSpecialCharacters(formData.Dependencies)}", 
                                                        "constrains" : "${removeSpecialCharacters(formData.Constrains)}", 
                                                        "business_model" : "${formData.Business_Model.value}", 
                                                        "business_lead" : "${formData.Business_lead}", 
                                                        "project_purpose" : "${removeSpecialCharacters(formData.Project_Purpose)}", 
                                                        "project_risks" : "${removeSpecialCharacters(formData.Project_Risks)}", 
                                                        "line_of_business" : "${formData.Line_of_Business.value}", 
                                                        "it_vector" : "${formData.IT_Vector.value}", 
                                                        "rpa" : "${formData.RPA.value}", 
                                                        "region" : "${formData.Region.value}", 
                                                        "sites_impacted" : "${formatSitesImpacted(formData.Sites_Impacted)}",
                                                        "customer" : "${removeSpecialCharacters(formData.Customer.value)}", 
                                                        "requested_by" : "${formData.Requested_by_Customer.value}", 
                                                        "customer_priority" : "${formData.Customer_Priority.value}", 
                                                        "estimated_annual_revenue" : "${formData.Estimated_Annual_Revenue}", 
                                                        "sales_contact" : "${formData.Sales_Contact}", 
                                                        "users_average" : "${formData.Average_number_of_users_for_this_application}", 
                                                        "fte_saved" : "${formData.FTE_Saved_per_year}", 
                                                        "hours_saved" : "${formData.Hours_saved_per_year}", 
                                                        "savings_revenue" : "${formData.Savings_revenue}", 
                                                        "compliance_risk_cost" : "${formData.Compliance_Risk_cost_that_will_be_avoided_by_this_application}", 
                                                        "risk_avoidance" : "${formData.Risk_Avoidance}", 
                                                        "retirement_savings" : "${formData.Savings_from_Retirement_of_Legacy_application_in_hours_per_year_by_Maintenance_Team}", 
                                                        "infra_license_fee_savings" : "${formData.Legacy_System_Infra_and_License_Fee_savings_per_year}", 
                                                        "other_savings" : "${formData.Other_Savings}", 
                                                        "created_by": "${formData.Created_by}",
                                                        "last_modifed_by": "${formData.Last_modifed_by}" 
                                                    }
                                                </bussinfo>
                                            </insertBussInfo>
                                        </soap12:Body>
                                    </soap12:Envelope>`;

        
            try {
                const newBusinessPromise = await fetch(Endpoints.saveBusinessInfo, {
                        method: 'POST',
                        body : newBusinessData,
                        headers: {"Content-Type": "text/xml; charset=utf-8"}
                    });
                //console.log('newBusinessPromise: fetchSitePMOS -> response', newBusinessPromise);
                const newBusinessReponse = await handlePOSTResponse(newBusinessPromise);
                console.log('TCL: saveBusinesInformationDB -> newBusinessReponse', newBusinessReponse)
                

                return newBusinessReponse
                
                // dispatch(addBusiness(newBusinessReponse));
            }
            catch (error) {
                //console.log('TCL: fetchSitePMOS -> error', error);
                throw (error);
            }
        
    }




     /** --------------------------------------
    // Save Business on DB
    // @param {formData from Business Information View}
    // @returns {Action}
    // -------------------------------------- */
    export async function updateBusinesInformationDB(formData)  {
        console.log("TCL: updateBusinesInformationDB -> formData", formData)
        // "sites_impacted" : "${formData.Sites_Impacted}", 
        const updateBusinessData = {
            tab2 : {
                "project_id" : formData.Project_ID, 
                "buss_info_id" : formData.Buss_info_id || formData.buss_info_id,
                "business_objective" : removeSpecialCharacters(formData.Business_Objective), 
                "outcomes_objective" : removeSpecialCharacters(formData.Outcomes_from_the_Objective), 
                "impact" : removeSpecialCharacters(formData.Impact), 
                "background" : removeSpecialCharacters(formData.Background), 
                "dependencies" : removeSpecialCharacters(formData.Dependencies), 
                "constrains" : removeSpecialCharacters(formData.Constrains), 
                "business_model" : formData.Business_Model.value, 
                "business_lead" : formData.Business_lead, 
                "project_purpose" : removeSpecialCharacters(formData.Project_Purpose), 
                "project_risks" : removeSpecialCharacters(formData.Project_Risks), 
                "line_of_business" : formData.Line_of_Business.value, 
                "it_vector" : formData.IT_Vector.value, 
                "rpa" : formData.RPA.value, 
                "region" : formData.Region.value, 
                "sites_impacted" : formatSitesImpacted(formData.Sites_Impacted),
                "customer" : formData.Customer.value, 
                "requested_by" : formData.Requested_by_Customer.value, 
                "customer_priority" : formData.Customer_Priority.value, 
                "estimated_annual_revenue" : formData.Estimated_Annual_Revenue, 
                "sales_contact" : formData.Sales_Contact, 
                "users_average" : formData.Average_number_of_users_for_this_application, 
                "fte_saved" : formData.FTE_Saved_per_year, 
                "hours_saved" : formData.Hours_saved_per_year, 
                "savings_revenue" : formData.Savings_revenue, 
                "compliance_risk_cost" : formData.Compliance_Risk_cost_that_will_be_avoided_by_this_application, 
                "risk_avoidance" : formData.Risk_Avoidance, 
                "retirement_savings" : formData.Savings_from_Retirement_of_Legacy_application_in_hours_per_year_by_Maintenance_Team, 
                "infra_license_fee_savings" : formData.Legacy_System_Infra_and_License_Fee_savings_per_year, 
                "other_savings" : formData.Other_Savings, 
                "workstage" : formData.Workstage,
                "created_by": formData.Created_by,
                "last_modifed_by": formData.Last_modifed_by
            }
        }

        console.log('TCL: updateBusinesInformationDB -> updateBusinessData', updateBusinessData)


            try {
                const updateBusinessPromise = await fetch(Endpoints.updateBusiness, {
                        headers: { "Content-Type": "application/json; charset=utf-8" ,  "Accept": "text/plain"},    
                        method: 'POST',
                        body : JSON.stringify(updateBusinessData),
                        
                    });

                //console.log('updateBusinessPromise: fetchSitePMOS -> response', updateBusinessPromise);
                
                const updateBusinessReponse =  await updateBusinessPromise.text();
				
                //console.log('TCL: saveBusinesInformationDB -> updateBusinessReponse', updateBusinessReponse)
                
                    // window.updateBuss()


                return updateBusinessReponse
                
                // dispatch(addBusiness(updateBusinessReponse));
                // dispatch(updateLocalBusinesInformation(updateBusinessReponse))
            }
            catch (error) {
                //console.log('TCL: fetchSitePMOS -> error', error);
                throw (error);
            }
        
    }

