/* ==========================================================================
** Projects Holder Parent Component
** Main Form Screen, Controls the Other Views
** 28/01/2019
** Alan Medina Silva
** ========================================================================== */


// --------------------------------------
// Get Dependences
// --------------------------------------
    import React, { Component, Fragment } from 'react';
    import PropTypes from 'prop-types';
    import {  NavBar, Header, FormBody,  AppLoader} from '../../components';
    import {  Switch, Route, Link, Redirect, BrowserRouter } from "react-router-dom";
    
    
    import { editProjectRoutes } from '../../routes/routes';
    import { withRouter } from 'react-router';
    import {Endpoints} from '../../services/Endpoints'
    import axios from 'axios';
    import Alert from 'react-s-alert';
    import 'react-s-alert/dist/s-alert-default.css';
    import 'react-s-alert/dist/s-alert-css-effects/slide.css';
    import {Config} from '../../Config';
    import moment from "moment";
    import '../styles.css'


    // --------------------------------------
    // Edit Project
    // https://flextronics365.sharepoint.com/sites/gsd/intake_process/IntakeProcess/ProjectIntake.aspx
    // --------------------------------------


    import AllProjectsView from '../../views/AllProjects/AllProjects';
    import EditRequirementsDefinition from '../../views/EditProject/Requirements/RequirementsDefinition';
    import EditBusinessInformation from '../../views/EditProject/Business/BusinessInformation';
    import EditTechnicalEvaluation from '../../views/EditProject/Thecnical/TechnicalEvaluation';
    import EditPMOEvaluation from '../../views/EditProject/PMOEvaluation/PMOEvaluation';
    import EditROIRealized from '../../views/EditProject/ROIRealized/ROIRealized';

    const {relativePath, localPath} = Config


    //! --------------------------------------
    //! Create Global Objects to keep track 
    //! of the state
    //! --------------------------------------
    let projectIntake = {
        requirementsDefinition : {
            Date_Submitted : null,
            Request_Owner : null,
            Request_ID : null,  
            Workstage : null,
            Project_Name : null,
            Description : null,
            Expected_Start_Date : null,
            Expected_Completion_Date : null,
            Expected_Start_Date_Moment : null,
            Expected_Completion_Date_Moment : null,
            Deadline_Justification : null,
            Project_Type : null,
            Project_Documents : null,
            SPFiles : null
        },

        businessInformation : {

            Business_Objective : null ,
            Outcomes_from_the_Objective : null ,
            Impact : null ,
            Background : null ,
            Dependencies : null ,
            Constrains : null ,
            Business_Model : null ,
            Business_lead : null ,
            Project_Purpose : null ,
            Project_Risks : null ,
            Line_of_Business : null ,
            IT_Vector : null ,
            RPA : null ,
            Region : null ,           
            Sites_Impacted : null ,
            Customer : null ,
            Requested_by_Customer : null ,
            Customer_Priority : null ,
            Estimated_Annual_Revenue : null ,
            Sales_Contact : null ,
            Average_number_of_users_for_this_application : null ,
            FTE_Saved_per_year : null ,
            Hours_saved_per_year : null ,
            Savings_revenue : null ,
            Compliance_Risk_cost_that_will_be_avoided_by_this_application : null ,
            Risk_Avoidance : null ,
            Savings_from_Retirement_of_Legacy_application_in_hours_per_year_by_Maintenance_Team : null ,
            Legacy_System_Infra_and_License_Fee_savings_per_year : null ,
            Other_Savings : null ,
            conditionalSites : [],
            
        },

        technicalEvaluation : {
            Delivery_Team : null,
            Platform_type : null,
            Applications_involved : null,
            Technology : null,
            IT_Groups_Required : null,
            Estimated_Effort : null,
            Project_Team_Size : null,
            Project_Manager : null,
            Target_Start_Date : null,
            Target_Go_Live_Date : null,
            IT_FTE_required : null,
            Approver : null,
            Approval_Date : null,
            Justification_ROI : null,
            Design_Development_Testing_Effort : null,
            Travel_TE : null,
            Consulting : null,
            Training : null,
            Licenses_Cost_per_year : null,
            Hardware_leasing : null,
            Maintenance_Hardware_hours_per_year : null,
            Maintenance_Salaries_hours_per_year : null,
            No_of_Sites : null,
            No_of_Active_users : null
        },
        pmoEvaluation : {
            Expected_total_ROI : null,
            Expected_IRR : null,
            ROI_Category : null,
            WorkID_PlanView_FlexPM_SN_Ticket : null,
            Documents : null,
        },
        roiRealized : {
            Implementation_Date :  null,
            FTE_Saved_per_year : null,
            Hours_saved_per_year : null,
            Compliance_Ris_cost_that_was_avoided_by_this_application : null,
            Risk_Avoidance : null,
            Savings_from_Retirement_of_Legacy_application_in_hours_per_year_by_Maintenance_Team : null,
            Legacy_System_Infra_and_License_Fee_savings_per_year : null,
            Other_Savings : null,
            Design_Developmen_Testing_Effort_hours : null,
            Travel_TE : null,
            Consulting : null,
            Training : null,
            Licenses_Cost_per_year : null,
            Hardware_leasing : null,
            Maintenance_Hardware_hours_per_year : null,
            Maintenance_Salaries_hours_per_year : null,
            Site_Usage : null,
            Usage_Footprint_1_week : null,
            Transactions_per_minute_TPM : null,
            ROI_Realized_Date :  null,
            Site_UsageRows : null,
            Usage_FootprintRows : null,
            dynatrace : null,
            showDynatrace : null,
        }
    
    }


// --------------------------------------
// Create Component Class
// --------------------------------------
    class formHolder extends Component {
        /* ==========================================================================
        ** Component Setup
        ** ========================================================================== */

        // --------------------------------------
            // Constructor
            // --------------------------------------
            constructor(props) {
                super(props);
                this.state = {
                    currentView : 'requirement-definition',
                    isLoaded: false,
                }
                
            }
        
        // --------------------------------------
        // Set Initial Values
        // --------------------------------------
        componentDidMount() {
            // const pmos = this.props.sharepoint;
            // this.setState({isLoaded : true});

            this.loadAPI();

        }


        /* ==========================================================================
        ** Load API
        ** ========================================================================== */

            // ?--------------------------------------
            // ? Load All The Project Data
            // ?--------------------------------------
            async loadAPI () {
                // this.props
                console.log("TCL: formHolder -> loadAPI -> this.props", this.props)
                const {projectID} = this.props.match.params;

                const requestID = projectID.substr(projectID.indexOf('D')+1,projectID.length);

                console.log("TCL: formHolder -> loadAPI -> projectID", requestID)


                const getReqPromise = this.handleGetRequestsForData('requirements', requestID)
                const getBussPromise = this.handleGetRequestsForData('business', requestID)
                const getTechPromise = this.handleGetRequestsForData('technical', requestID)
                const getPmoPromise = this.handleGetRequestsForData('pmoEval', requestID)
                const getRoiPromise = this.handleGetRequestsForData('roiRealized', requestID)
                

                const [reqData, businessData, techData, pmoData, roiData] = await Promise.all([getReqPromise, getBussPromise, getTechPromise, getPmoPromise, getRoiPromise]);


                
                console.log("TCL: formHolder -> loadAPI -> roiData", roiData)
                console.log("TCL: formHolder -> loadAPI -> pmoData", pmoData)
                console.log("TCL: formHolder -> loadAPI -> techData", techData)
                console.log("TCL: formHolder -> loadAPI -> businessData", businessData)
                console.log("TCL: formHolder -> loadAPI -> reqData", reqData)


                // ? Check Empty Values and Set New Object Values

                if(reqData.data.length > 0) {
                    this.setDataSourceValuesFromDB('requirements', reqData.data[0], true , projectID)
                    
                }
                    
                if(businessData.data.length > 0)
                    this.setDataSourceValuesFromDB('business', businessData.data[0], true)
                if(techData.data.length > 0)
                    this.setDataSourceValuesFromDB('technical', techData.data[0], true)
                if(pmoData.data.length > 0) {
                    this.setDataSourceValuesFromDB('pmoEval', pmoData.data[0], true, projectID)
                    
                }
                   
                if(roiData.data.length > 0)  {
                    

                    let roiDataObject = roiData.data[0];
                    let roiID = roiDataObject.roi_real_id;

                    // ? Get ROI Dynatrace
                    // ? Combine RoI Data && Dynatrace

                    

                    this.getProjectDynatrace(requestID, roiID).then((result) => {
                    
                    
                        console.log("TCL: formHolder -> loadAPI -> result", result)

                        
                        const roiDataDyna = result.data;
                        this.setDataSourceValuesFromDB('roiRealized', roiDataObject, true, requestID, roiDataDyna)

                        this.setState({isLoaded : true});

                    })
                    .catch((error) => {
                        console.log("TCL: formHolder -> loadAPI -> error", error)

                        this.setDataSourceValuesFromDB('roiRealized', roiDataObject, true, requestID, null)

                        
                    })


                    

                  


                    // this.setDataSourceValuesFromDB('roiRealizedDynatrace', roiDataDyna.data[0], true)
                    
                }
                else
                    this.setState({isLoaded : true});
                    
                    
                
                
                // this.setState({isLoaded : true});



                
            }




            // ?--------------------------------------
            // ? Manage GET requests
            // ?--------------------------------------
            async handleGetRequestsForData(viewToLoad, projectID) {
                // ? Define Endpoint 
                let serviceURL = '';
                const params = {project_id : projectID};
                switch (viewToLoad) {
                        case  'requirements' : serviceURL = Endpoints.getRequirements;
                            break;
                        case  'requirementsFiles' : serviceURL = Endpoints.getRequirementsFiles;
                            break;
                       
                        case  'business' : serviceURL =  Endpoints.getBusiness;
                            break;

                        case  'technical' : serviceURL =  Endpoints.getTechnical;
                            break;

                        case  'pmoEval' : serviceURL =  Endpoints.getPMOEvaluation;
                            break;
                        
                        case  'pmoEvalFiles' : serviceURL =  Endpoints.getPMOEvaluationFiles;
                            break;

                        case  'roiRealized' : serviceURL =  Endpoints.getROIRealized;
                            break;

                        case  'roiRealizedDynatrace' : serviceURL =  Endpoints.getROIRealized;
                            break;
                        default : serviceURL = ''
                }


                

                
                return axios.get(serviceURL, {params});

            }



            // ?--------------------------------------
            // ? GET Current Project Files FROM SP
            // ?--------------------------------------
            async getSharepointFilesByProject(currentProject , folderName) {
                let folderURL = `intakeFiles/${currentProject}/${folderName}`
                let serviceUrl = `${Endpoints.getProjectFolder}('${folderURL}')/Files?$expand=LinkingUri`;
                let projectFiles = [];
                console.log("TCL: fetchProjectFiles -> serviceUrl", serviceUrl)

                 axios.get(serviceUrl).then((reponse) => {
                    projectFiles =  reponse.data.value

                    return projectFiles

                 }).catch((error) => {
                    console.log("TCL: formHolder -> getSharepointFilesByProject -> error", error)
                    projectFiles = []

                    return projectFiles;

                 })




            }



            // ?--------------------------------------
            // ? Get Roi Realized Dynatrace
            // ?--------------------------------------
            getProjectDynatrace(projectID, roiID) {
                const params = {project_id : projectID, roi_id : roiID};

                console.log("TCL: formHolder -> getProjectDynatrace -> params", params)
                return axios.get(Endpoints.getROITrace, {params})
            }



        /* ==========================================================================
        ** Handle State
        ** ========================================================================== */


            // ?--------------------------------------
            // ? Set New Values of ProjectIntake 
            // ? DataSource Object
            // ?--------------------------------------
            setDataSourceValuesFromDB (objectToChange, newValues, comesFromDB, projectID = '', extraValues = []) {
                // ? Set Requirements Definition
                if(objectToChange === 'requirements') {

                    let requirementsDefinition = {
                        PMOEval : newValues.PMOEval,
                        ROIReal : newValues.ROIReal,
                        TechEval: newValues.TechEval,
                        business_info: newValues.business_info,
                        project_id: newValues.project_id ,

                        Date_Submitted : newValues.date_submitted,
                        Request_Owner : newValues.request_owner,
                        Request_ID : newValues.request_id,  
                        Workstage : newValues.workstage,
                        Project_Name : newValues.project_name,
                        Description : newValues.description,
                        Expected_Start_Date : newValues.expectedstart_date,
                        Expected_Completion_Date : newValues.expected_completion_date,
                        
                        Deadline_Justification : newValues.deadline_justification,
                        Project_Type : newValues.project_type,
                        Project_Documents : newValues.project_docs,
                        SPFiles : [],
                        Created_by: newValues.created_by || newValues.Created_by ,
                        Created_date: newValues.created_date,
                        Last_modifed_by: newValues.last_modifed_by || newValues.Last_modifed_by ,
                        Last_modifed_date: newValues.last_modifed_date,
                        // SavedLocally : true
                        // this.getSharepointFilesByProject(projectID, 'requirementsDefinition')
                    }     
                    
                    // ? Assign New Values to DataSet
                    projectIntake.requirementsDefinition = Object.assign({}, projectIntake.requirementsDefinition, requirementsDefinition)
                    

                }

                // ? Set Business Information
                if (objectToChange === 'business') {
                    let businessInformation = {
                        Buss_info_id : newValues.buss_info_id,
                        Project_id : newValues.project_id || newValues.Project_id,
                        Business_Objective : newValues.business_objective ,
                        Outcomes_from_the_Objective : newValues.outcomes_objective,
                        Impact : newValues.impact ,
                        Background : newValues.background ,
                        Dependencies : newValues.dependencies ,
                        Constrains : newValues.constrains ,
                        Business_Model : newValues.business_model ,
                        Business_lead : newValues.business_lead ,
                        Project_Purpose : newValues.project_purpose ,
                        Project_Risks : newValues.project_risks ,
                        Line_of_Business : newValues.line_of_business ,
                        IT_Vector : newValues.it_vector ,
                        RPA : newValues.rpa ,
                        Region : newValues.region ,           
                        Sites_Impacted : newValues.sites_impacted ,
                        Customer : newValues.customer ,
                        Requested_by_Customer : newValues.requested_by ,
                        Customer_Priority : newValues.customer_priority ,
                        Estimated_Annual_Revenue : newValues.estimated_annual_revenue ,
                        Sales_Contact : newValues.sales_contact ,
                        Average_number_of_users_for_this_application : newValues.users_average ,
                        FTE_Saved_per_year : newValues.fte_saved ,
                        Hours_saved_per_year : newValues.hours_saved ,
                        Savings_revenue : newValues.savings_revenue ,
                        Compliance_Risk_cost_that_will_be_avoided_by_this_application : newValues.compliance_risk_cost ,
                        Risk_Avoidance : newValues.risk_avoidance ,
                        Savings_from_Retirement_of_Legacy_application_in_hours_per_year_by_Maintenance_Team : newValues.retirement_savings ,
                        Legacy_System_Infra_and_License_Fee_savings_per_year : newValues.infra_license_fee_savings ,
                        Other_Savings : newValues.other_savings ,
                        conditionalSites : [],
                        Workstage :  projectIntake.requirementsDefinition.Workstage ?  projectIntake.requirementsDefinition.Workstage : null,
                        Created_by: newValues.created_by || newValues.Created_by ,
                        Created_date: newValues.created_date,
                        Last_modifed_by: newValues.last_modifed_by || newValues.Last_modifed_by ,
                        Last_modifed_date: newValues.last_modifed_date,
                        // SavedLocally : true
                    }

                     // ? Assign New Values to DataSet
                     projectIntake.businessInformation = Object.assign({}, projectIntake.businessInformation, businessInformation)
                }


                // ? Set Technical Evaluation
                if(objectToChange === 'technical') {
                    let technicalEvaluation = {
                        project_id: newValues.project_id,
                        tech_eval_id: newValues.tech_eval_id,
                        Delivery_Team : newValues.Delivery_Team,
                        Platform_type : newValues.Platform_type,
                        Applications_involved : newValues.Applications_involved,
                        Technology : newValues.Technology,
                        IT_Groups_Required : newValues.IT_Groups_Required,
                        Estimated_Effort : newValues.Estimated_Effort,
                        Project_Team_Size : newValues.Project_TShirt_Size,
                        Project_Manager : newValues.Project_Manager,
                        Target_Start_Date : newValues.Target_Start_Date,
                        Target_Go_Live_Date : newValues.Target_Go_Live_Date,
                        IT_FTE_required : newValues.IT_FTE_required,
                        Approver : newValues.Approver,
                        Approval_Date : newValues.Approval_Date,
                        Justification_ROI : newValues.Justification_ROI,
                        Design_Development_Testing_Effort : newValues.DDT_Effort,
                        Travel_TE : newValues.Travel_TE,
                        Consulting : newValues.Consulting,
                        Training : newValues.Training,
                        Licenses_Cost_per_year : newValues.Licenses_Cost_per_year,
                        Hardware_leasing : newValues.Hardware_leasing,
                        Maintenance_Hardware_hours_per_year : newValues.Maintenance_Hardware,
                        Maintenance_Salaries_hours_per_year : newValues.Maintenance_Salaries,
                        No_of_Sites : newValues.No_of_Sites,
                        No_of_Active_users : newValues.No_of_Active_users,
                        Created_by: newValues.created_by || newValues.Created_by ,
                        Created_date: newValues.created_date,
                        Last_modifed_by: newValues.last_modifed_by || newValues.Last_modifed_by ,
                        Last_modifed_date: newValues.last_modifed_date,
                        // SavedLocally : true
                        
                    }

                    // ? Assign New Values to DataSet
                    projectIntake.technicalEvaluation = Object.assign({}, projectIntake.technicalEvaluation, technicalEvaluation)
                }

                // ? Set PMO Evaluation Data
                if(objectToChange === 'pmoEval') {
                    let pmoEvaluation = {
                        pmo_eval_id: newValues.pmo_eval_id,
                        project_id: newValues.project_id,
                        Expected_total_ROI : newValues.Expected_total_ROI,
                        Expected_IRR : newValues.Expected_IRR,
                        ROI_Category : newValues.ROI_Category,
                        WorkID_PlanView_FlexPM_SN_Ticket : newValues.WorkID,
                        Documents : newValues.Documents,
                        Created_by: newValues.created_by || newValues.Created_by ,
                        Created_date: newValues.created_date,
                        Last_modifed_by: newValues.last_modifed_by || newValues.Last_modifed_by ,
                        Last_modifed_date: newValues.last_modifed_date,
                        // SavedLocally : true
                        //?sharepointFiles : this.getSharepointFilesByProject(projectID, 'PMO')
                    }

                    // ? Assign New Values to DataSet
                    projectIntake.pmoEvaluation = Object.assign({}, projectIntake.pmoEvaluation, pmoEvaluation)
                }


                // ? Set Roi Realized Data
                if(objectToChange === 'roiRealized') {

                    console.log("TCL: formHolder -> setDataSourceValuesFromDB -> extraValues", extraValues)

                    let roiRealized = {
                        roi_real_id: newValues.roi_real_id,
                        Implementation_Date : newValues.Implementation_Date  ,
                        FTE_Saved_per_year : newValues.FTE_Saved,
                        Hours_saved_per_year : newValues.Hours_saved,
                        Compliance_Ris_cost_that_was_avoided_by_this_application : newValues.compliance_risk_cost_roi,
                        Risk_Avoidance : newValues.risk_avoidance_roi,
                        Savings_from_Retirement_of_Legacy_application_in_hours_per_year_by_Maintenance_Team : newValues.retirement_savings_roi,
                        Legacy_System_Infra_and_License_Fee_savings_per_year : newValues.infra_license_fee_savings_roi,
                        Other_Savings : newValues.Other_Savings_roi,
                        Design_Developmen_Testing_Effort_hours : newValues.DDT_Effort_roi,
                        Travel_TE : newValues.Travel_TE_roi,
                        Consulting : newValues.Consulting_roi,
                        Training : newValues.Training_roi,
                        Licenses_Cost_per_year : newValues.Licenses_Cost_per_year_roi,
                        Hardware_leasing : newValues.Hardware_leasing_roi,
                        Maintenance_Hardware_hours_per_year : newValues.Maintenance_Hardware_roi,
                        Maintenance_Salaries_hours_per_year : newValues.Maintenance_Salaries_roi,
                        Site_Usage : newValues.Site_Usage,
                        Usage_Footprint_1_week : newValues.Usage_Footprint_week,
                        Transactions_per_minute_TPM : newValues.Transactions_per_minute,
                        ROI_Realized_Date :  newValues.ROI_Realized_Date,
                        Site_UsageRows : newValues.Site_Usage,
                        Usage_FootprintRows : newValues.Usage_Footprint_week,
                        dynatrace : extraValues !== null ? extraValues : [],
                        Created_by: newValues.created_by || newValues.Created_by ,
                        Created_date: newValues.created_date,
                        Last_modifed_by: newValues.last_modifed_by || newValues.Last_modifed_by ,
                        Last_modifed_date: newValues.last_modifed_date,
                        showDynatrace : extraValues !== null && extraValues.length > 0 ? true : false,
                        // SavedLocally : true
                    }

                    // ? Assign New Values to DataSet
                    projectIntake.roiRealized = Object.assign({}, projectIntake.roiRealized, roiRealized)


                    
                  
                }

               
                

              
            }




            // ?--------------------------------------
            // ? Update ProjectIntake Object 
            // ? With New Values
            // ?--------------------------------------

            updateProjectIntakeValues(objectToChange,  newValues , extraValues = null, savedonDB = false) {
                console.log("TCL: formHolder -> updateProjectIntakeValues -> newValues", newValues)
                console.log("TCL: formHolder -> updateProjectIntakeValues -> currentView", objectToChange)


                  // ? Set Requirements Definition
                if(objectToChange === 'requirements') {

                    let requirementsDefinition = {
                       
                        project_id: newValues.Project_id || null ,
                        created_by: newValues.Created_by ||  newValues.Created_by ,
                        Date_Submitted : newValues.Date_submitted,
                        Request_Owner : newValues.Request_Owner,
                        Request_ID :  newValues.Project_id || null,  
                        Workstage : newValues.Workstage,
                        Project_Name : newValues.Project_Name,
                        Description : newValues.Description,
                        Expected_Start_Date : newValues.Expected_Start_Date,
                        Expected_Completion_Date : newValues.Expected_Completion_Date,
                        Deadline_Justification : newValues.Deadline_Justification,
                        Project_Type : newValues.Project_Type,
                        Project_Documents : newValues.Project_docs,
                        SPFiles : newValues.SPFiles || [],
                        SavedLocally : true,
                        savedOnDB : savedonDB,
                        Created_by: newValues.created_by || newValues.Created_by ,
                        Created_date: newValues.created_date,
                        Last_modifed_by: newValues.last_modifed_by || newValues.Last_modifed_by ,
                        Last_modifed_date: newValues.last_modifed_date,
                        // this.getSharepointFilesByProject(projectID, 'requirementsDefinition')
                    }     
                    
                    // ? Assign New Values to DataSet
                    projectIntake.requirementsDefinition = Object.assign({}, projectIntake.requirementsDefinition, requirementsDefinition)
                    console.log("TCL: formHolder -> updateProjectIntakeValues -> projectIntake", projectIntake)
                    

                }
                


                // ? Set Business Information
                if(objectToChange === 'business') {

                    let businessInformation = {
                        project_id: newValues.Project_id || null ,
                        Business_Objective : newValues.Business_Objective,
                        Outcomes_from_the_Objective : newValues.Outcomes_from_the_Objective,
                        Impact : newValues.Impact,
                        Background : newValues.Background,
                        Dependencies : newValues.Dependencies ,
                        Constrains : newValues.Constrains,
                        Business_Model : newValues.Business_Model,
                        Business_lead : newValues.Business_lead,  
                        Project_Purpose : newValues.Project_Purpose,
                        Project_Risks : newValues.Project_Risks,
                        Line_of_Business : newValues.Line_of_Business,
                        IT_Vector : newValues.IT_Vector,
                        RPA : newValues.RPA,
                        Region : newValues.Region,
                        Sites_Impacted : newValues.Sites_Impacted,
                        Customer : newValues.Customer,
                        Requested_by_Customer : newValues.Requested_by_Customer ,
                        Customer_Priority : newValues.Customer_Priority,
                        Estimated_Annual_Revenue : newValues.Estimated_Annual_Revenue,
                        Sales_Contact : newValues.Sales_Contact,
                        Average_number_of_users_for_this_application : newValues.Average_number_of_users_for_this_application,
                        FTE_Saved_per_year : newValues.FTE_Saved_per_year,
                        Hours_saved_per_year : newValues.Hours_saved_per_year,
                        Savings_revenue : newValues.Savings_revenue,
                        Compliance_Risk_cost_that_will_be_avoided_by_this_application : newValues.Compliance_Risk_cost_that_will_be_avoided_by_this_application,
                        Risk_Avoidance : newValues.Risk_Avoidance,
                        Savings_from_Retirement_of_Legacy_application_in_hours_per_year_by_Maintenance_Team : newValues.Savings_from_Retirement_of_Legacy_application_in_hours_per_year_by_Maintenance_Team,
                        Legacy_System_Infra_and_License_Fee_savings_per_year : newValues.Legacy_System_Infra_and_License_Fee_savings_per_year,
                        Other_Savings : newValues.Other_Savings,
                        SavedLocally : true,
                        savedOnDB : savedonDB,
                        Created_by: newValues.created_by || newValues.Created_by ,
                        Created_date: newValues.created_date,
                        Last_modifed_by: newValues.last_modifed_by || newValues.Last_modifed_by ,
                        Last_modifed_date: newValues.last_modifed_date,
                    }

                      // ? Assign New Values to DataSet
                      projectIntake.businessInformation = Object.assign({}, projectIntake.businessInformation, businessInformation)
                      console.log("TCL: formHolder -> updateProjectIntakeValues -> projectIntake", projectIntake)

                }


                // ? Set Technical Evaluation
                if(objectToChange === 'technical') {
                    let technicalEvaluation = {
                        Delivery_Team : newValues.Delivery_Team ,
                        Platform_type : newValues.Platform_type ,
                        Applications_involved : newValues.Applications_involved ,
                        Technology : newValues.Technology,
                        IT_Groups_Required : newValues.IT_Groups_Required ,
                        Estimated_Effort : newValues.Estimated_Effort ,
                        Project_Team_Size : newValues.Project_Team_Size ,
                        Project_Manager : newValues.Project_Manager ,
                        Target_Start_Date :newValues.Target_Start_Date,
                        Target_Go_Live_Date :newValues.Target_Go_Live_Date,
                        IT_FTE_required :newValues.IT_FTE_required,
                        Approver : newValues.Approver,
                        Approval_Date :newValues.Approval_Date,
                        Justification_ROI :newValues.Justification_ROI,
                        Design_Development_Testing_Effort :newValues.Design_Development_Testing_Effort,
                        Travel_TE :newValues.Travel_TE,
                        Consulting :newValues.Consulting,
                        Training :newValues.Training,
                        Licenses_Cost_per_year :newValues.Licenses_Cost_per_year,
                        Hardware_leasing :newValues.Hardware_leasing,
                        Maintenance_Hardware_hours_per_year :newValues.Maintenance_Hardware_hours_per_year,
                        Maintenance_Salaries_hours_per_year :newValues.Maintenance_Salaries_hours_per_year,
                        No_of_Sites :newValues.No_of_Sites,
                        No_of_Active_users :newValues.No_of_Active_users,
                        SavedLocally : true,
                        savedOnDB : savedonDB,
                        Created_by: newValues.created_by || newValues.Created_by ,
                        Created_date: newValues.created_date,
                        Last_modifed_by: newValues.last_modifed_by || newValues.Last_modifed_by ,
                        Last_modifed_date: newValues.last_modifed_date,
                    }

                      // ? Assign New Values to DataSet
                      projectIntake.technicalEvaluation = Object.assign({}, projectIntake.technicalEvaluation, technicalEvaluation)
                      console.log("TCL: formHolder -> updateProjectIntakeValues -> projectIntake", projectIntake)
                }


                 // ? Set PMO Evaluation Data
                if(objectToChange === 'pmoEval') {
                    let pmoEvaluation = {
                        Expected_total_ROI : newValues.Expected_total_ROI,
                        Expected_IRR : newValues.Expected_IRR,
                        ROI_Category : newValues.ROI_Category,
                        WorkID_PlanView_FlexPM_SN_Ticket : newValues.WorkID_PlanView_FlexPM_SN_Ticket,
                        Documents : newValues.Documents,
                        SavedLocally : true,
                        savedOnDB : savedonDB,
                        Created_by: newValues.created_by || newValues.Created_by ,
                        Created_date: newValues.created_date,
                        Last_modifed_by: newValues.last_modifed_by || newValues.Last_modifed_by ,
                        Last_modifed_date: newValues.last_modifed_date,
                        // sharepointFiles : this.getSharepointFilesByProject(projectID, 'PMO')
                    }

                    // ? Assign New Values to DataSet
                    projectIntake.pmoEvaluation = Object.assign({}, projectIntake.pmoEvaluation, pmoEvaluation)
                    console.log("TCL: formHolder -> updateProjectIntakeValues -> projectIntake", projectIntake)
                }


                // ? Set Roi Realized Data
                if(objectToChange === 'roiRealized') {

                    console.log("TCL: formHolder -> setDataSourceValuesFromDB -> extraValues", extraValues)

                    let roiRealized = {
                        Implementation_Date : newValues.Implementation_Date,
                        FTE_Saved_per_year : newValues.FTE_Saved_per_year,
                        Hours_saved_per_year : newValues.Hours_saved_per_year,
                        Compliance_Ris_cost_that_was_avoided_by_this_application : newValues.Compliance_Ris_cost_that_was_avoided_by_this_application,
                        Risk_Avoidance : newValues.Compliance_Ris_cost_that_was_avoided_by_this_application,
                        Savings_from_Retirement_of_Legacy_application_in_hours_per_year_by_Maintenance_Team :  newValues.Savings_from_Retirement_of_Legacy_application_in_hours_per_year_by_Maintenance_Team,
                        Legacy_System_Infra_and_License_Fee_savings_per_year : newValues.Legacy_System_Infra_and_License_Fee_savings_per_year,
                        Other_Savings : newValues.Other_Savings,
                        Design_Developmen_Testing_Effort_hours : newValues.Design_Developmen_Testing_Effort_hours,
                        Travel_TE : newValues.Travel_TE,
                        Consulting : newValues.Consulting,
                        Training : newValues.Training,
                        Licenses_Cost_per_year : newValues.Licenses_Cost_per_year,
                        Hardware_leasing : newValues.Hardware_leasing,
                        Maintenance_Hardware_hours_per_year : newValues.Maintenance_Hardware_hours_per_year,
                        Maintenance_Salaries_hours_per_year : newValues.Maintenance_Salaries_hours_per_year,
                        dynatrace : newValues.dynatrace ,
                        showDynatrace : newValues.showDynatrace,
                        SavedLocally : true,
                        savedOnDB : savedonDB,
                        Created_by: newValues.created_by || newValues.Created_by ,
                        Created_date: newValues.created_date,
                        Last_modifed_by: newValues.last_modifed_by || newValues.Last_modifed_by ,
                        Last_modifed_date: newValues.last_modifed_date,
                    }

                    // ? Assign New Values to DataSet
                    projectIntake.roiRealized = Object.assign({}, projectIntake.roiRealized, roiRealized)
                    console.log("TCL: formHolder -> updateProjectIntakeValues -> projectIntake", projectIntake)


                    
                  
                }

            }








            // --------------------------------------
            // Set Enabled Routes based on User role
            // --------------------------------------
            enableNavigationRoutes() {
                const isPMO = localStorage.getItem('isUserPMO');
                
                const routesWithState = editProjectRoutes.map((route)=> {
                  
                    if(route.allowNormalUser ===  true) 
                        route.disabled = false
                    else {
                        if(isPMO === "true")  
                            route.disabled = false
                        else
                            route.disabled = true
                    }
                        

                    return route;
                })


                return routesWithState;
                
            }



        /* ==========================================================================
        ** Render Methods
        ** ========================================================================== */


            // --------------------------------------
            // Render Navigation
            // --------------------------------------
            renderNavigation() {
                // const activeRoute = editProjectRoutes[0];
                const navigationRoutes = this.enableNavigationRoutes();
                const id = this.props.match.params.projectID
                return <NavBar routes = {navigationRoutes} activeRoute = {0} currentProjectID = {id}/>
            }


            // --------------------------------------
            // Render Form Header
            // --------------------------------------
            renderformHeader() {
                // const title =  'Global Shared \n Development';
                const title =  'Global Shared Development';
                return <Header title = {title}/>
            }

            // --------------------------------------
            // Render Form Body
            // --------------------------------------
            renderformBody() {
                // const {currentProjectID} = this.props;
                console.log("TCL: formHolder -> renderformBody -> this.props", this.props)


                // return <span> Edit Content  </span>

                
                // //console.log('TCL: formHolder -> renderformBody -> currentProjectID', currentProjectID)
                
                const isPMO = localStorage.getItem('isUserPMO') === "true" ? true  : false

                return (
                        
                   
                        <Switch>

                            <Route
                                path = {`${localPath}/intake-projects`}
                                exact =  {true}
                                key =  'route-intakeProjects'
                                ref = 'route-intakeProjects'
                                render={(props) => <AllProjectsView projectIntake = {projectIntake}  isPMO = {isPMO} locationData = {this.props}  />}
                            />



                            <Route
                                path = {`${localPath}/project/:projectID/requirement-definition`}
                                exact =  {true}
                                key =  'route-editRequirementDefinition'
                                ref = 'route-editRequirementDefinition'
                                render={(props) => <EditRequirementsDefinition 
                                                        projectIntake = {projectIntake}  
                                                        isPMO = {isPMO}
                                                        locationData = {this.props} 
                                                        updateProjectIntakeValues = {this.updateProjectIntakeValues}
                                                    />
                                        }
                            />

                              <Route
                                 path = {`${localPath}/project/:projectID/business-information`}
                                 exact =  {true}
                                 key =  'route-editBusinessInformation'
                                 ref = 'route-editBusinessInformation'
                                 render={(props) => <EditBusinessInformation projectIntake = {projectIntake} isPMO = {isPMO} locationData = {this.props} updateProjectIntakeValues = {this.updateProjectIntakeValues}/>}
                             />

                        
                             
                             <Route
                                 path = {`${localPath}/project/:projectID/technical-evaluation`}
                                 exact =  {true}
                                 key =  'route-editTechnicalEvaluation'
                                 ref = 'route-editTechnicalEvaluation'
                                 render={(props) => <EditTechnicalEvaluation projectIntake = {projectIntake}  isPMO = {isPMO} locationData = {this.props} updateProjectIntakeValues = {this.updateProjectIntakeValues}/>}
                             />

                        
                            <Route
                                path = {`${localPath}/project/:projectID/pmo-evaluation`}
                                exact =  {true}
                                key =  'route-editPmoEvaluation'
                                ref = 'route-editPmoEvaluation'
                                render={(props) => <EditPMOEvaluation projectIntake = {projectIntake} isPMO = {isPMO} locationData = {this.props} updateProjectIntakeValues = {this.updateProjectIntakeValues}/>}
                            />

                            
                            <Route
                                path = {`${localPath}/project/:projectID/roi-realized`}
                                exact =  {true}
                                key =  'route-editRoiRealized'
                                ref = 'route-editRoiRealized'
                                render={(props) => <EditROIRealized projectIntake = {projectIntake} isPMO = {isPMO} locationData = {this.props} updateProjectIntakeValues = {this.updateProjectIntakeValues}/>}
                            />


                           <Redirect from = {`${localPath}/project/:projectID/`} to = {`${localPath}/project/:projectID/requirement-definition`} ></Redirect> 

                        </Switch>
                   
                  
            
            );

            }


             // --------------------------------------
            // Render Loader
            // --------------------------------------
            renderLoader (isTransparent) {

                // const {currentMessage} = this.state
				//console.log('TCL: renderLoader -> currentMessage', currentMessage)

                const container = document.getElementsByClassName('int-formFieldsContainer')[0]
                const containerWidth = isTransparent ?  container && container.clientWidth : null;
                const containerHeight = isTransparent ? container && container.clientHeight : null;
                return <div> <AppLoader customHeight = { containerHeight || 800} isTransparent = {isTransparent} customWidth = {containerWidth}  /> </div>
            }



            // --------------------------------------
            // Render Projects
            // --------------------------------------
            renderformHolder() {
                return (
                        <Fragment>
                            {this.renderNavigation()}
                            <div className="int-projectsContainer">
                                
                                <div className="int-formContainer int-shadow">

                                    {this.renderformHeader()}
                                    {/* Load Here the Current Form Tab Component*/}
                                    {this.renderformBody()}
                                    <Alert stack={{limit: 1}}  timeout={2000} />

                                    
                                </div>

                            </div>
                        </Fragment>
                    )
            }

            // --------------------------------------
            // Render Component
            // --------------------------------------
            render() {
                const {isLoaded} = this.state;
                return isLoaded ? this.renderformHolder() : this.renderLoader();
            }
    }



// -------------------------------------- 
// Define PropTypes 
// -------------------------------------- 
    formHolder.propTypes = {
        props: PropTypes
    };




/* ==========================================================================
** Redux Functions
** ========================================================================== */
    // const mapStateToProps = (state) => {
    // //console.log('TCL: mapStateToProps -> state', state)
    //     return {
    //         pmos : state.sharepoint,
    //         pmosData:state.sharepoint.pmos,
    //         isPMO : state.sharepoint.isPMO,
    //         isLoaded : state.sharepoint.pmosLoaded,
    //         // currentProjectID : state.requirementsDefinition.requirementsDefinition.request_id
    //     }
    // }





// --------------------------------------
// Export Component
// --------------------------------------
    export default (formHolder);
    // export default  withRouter (connect(mapStateToProps, {fetchSitePMOS}) (formHolder));