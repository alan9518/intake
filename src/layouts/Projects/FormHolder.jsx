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
    import {  NavBar, Header} from '../../components';
    import {  Switch, Route, Link, Redirect } from "react-router-dom";
    import {Endpoints} from '../../services/Endpoints'
    import { newProjectRoutes } from '../../routes/routes';
    import '../styles.css'
    import Alert from 'react-s-alert';
    import 'react-s-alert/dist/s-alert-default.css';
    import 'react-s-alert/dist/s-alert-css-effects/slide.css';
    import {Config} from '../../Config';

    import {saveRequirementsDB} from '../../actions';
    import axios from 'axios';
    import moment from "moment";

    

    // --------------------------------------
    // Add Project Views 
    // --------------------------------------
    import AllProjectsView from '../../views/AllProjects/AllProjects';
    import AddRequirementsDefinition from '../../views/AddProject/Requirements/RequirementsDefinition';
    import AddBusinessInformation from '../../views/AddProject/Business/BusinessInformation';
    import AddTechnicalEvaluation from '../../views/AddProject/Thecnical/TechnicalEvaluation';
    import AddPMOEvaluation from '../../views/AddProject/PMOEvaluation/PMOEvaluation';
    import AddROIRealized from '../../views/AddProject/ROIRealized/ROIRealized';



    
    const {relativePath, localPath} = Config

    //! --------------------------------------
    //! Create Global Objects to keep track 
    //! of the state
    //! --------------------------------------
    let projectIntake = {
        requirementsDefinition : {
            Project_id : null,
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
            SavedLocally : false,
            SavedOnDB : false
        },

        businessInformation : {
            Buss_info_id : null,
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
            SavedLocally : false,
            SavedOnDB : false
            
        },

        technicalEvaluation : {
            Tech_eval_id : null,
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
            No_of_Active_users : null,
            SavedLocally : false,
            SavedOnDB : false
        },
        pmoEvaluation : {
            Pmo_eval_id : null,
            Expected_total_ROI : null,
            Expected_IRR : null,
            ROI_Category : null,
            WorkID_PlanView_FlexPM_SN_Ticket : null,
            Documents : null,
            SavedLocally : false,
            SavedOnDB : false
        },
        roiRealized : {
            Roi_real_id : null,
            Implementation_Date :   moment().format("MM/DD/YYYY") || null,
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
            SavedLocally : false,
            SavedOnDB : false
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
                    resetForm : false
                }

               
            
            }
        
            // --------------------------------------
            // Set Initial Values
            // --------------------------------------
            componentDidMount() {
                // const pmos = this.props.sharepoint;


                this.resetProjectIntake()
                this.setState({isLoaded : true});

                
                console.log("TCL: formHolder -> componentDidMount -> this.props.resetProjectIntake", this.props.resetProjectIntake)


                
                console.log("TCL: formHolder -> componentDidMount -> this.props", this.props)



                // this.setState({resetForm : true})

            }



            // ?--------------------------------------
            // ? Reset ProjectIntake Object when 
            // ? User Goes to all Projects View
            // ?--------------------------------------
            componentWillReceiveProps(nextProps) {
                console.log("TCL: formHolder -> componentWillReceiveProps -> nextProps", nextProps)

                

                if(this.props.location.pathname === '/intake/add-project/') {
                    if(projectIntake.requirementsDefinition.SavedLocally === true || projectIntake.requirementsDefinition.SavedOnDB === false ) {
                        // ? Reset Object
                        console.log("TCL: formHolder -> componentWillReceiveProps -> Reset Object")
                        this.resetProjectIntake()
                        this.setState({isLoaded : true});
                    }
                }
                else 
                    this.setState({isLoaded : true});
                
            }




        /* ==========================================================================
        ** API Connection
        ** ========================================================================== */

                
            // ?--------------------------------------
            // ? Send Email Update with the last changes
            // ? By Session
            // ?--------------------------------------
            sendEmailUpdate = async (projectID) =>{  
                const params = {project_id : projectID};

                console.log("TCL: formHolder -> getProjectDynatrace -> params", params)
                return axios.get(Endpoints.sendEmailUpdate, {params})
            }

         
        /* ==========================================================================
        ** Handle State
        ** ========================================================================== */


            // --------------------------------------
            // Set Enabled Routes based on User role
            // --------------------------------------
            enableNavigationRoutes() {
                // const {isPMO} = this.props;

                const isPMO = localStorage.getItem('isUserPMO') === "true" ? true  : false

                const routesWithState = newProjectRoutes.map((route)=> {
                    if(route.allowNormalUser) 
                        route.disabled = false
                    else {
                        if(isPMO)  
                            route.disabled = false
                        else
                            route.disabled = true
                    }
                        

                    return route;
                })

                return routesWithState;
            }



            // ?--------------------------------------
            // ? Update ProjectIntake Object 
            // ? With New Values
            // ?--------------------------------------

            updateProjectIntakeValues(objectToChange,  newValues , extraValues = null, savedonDB = false, savedLocally = true) {
                console.log("TCL: formHolder -> updateProjectIntakeValues -> newValues", newValues)
                console.log("TCL: formHolder -> updateProjectIntakeValues -> currentView", objectToChange)


                  // ? Set Requirements Definition
                if(objectToChange === 'requirements') {

                    let requirementsDefinition = {
                       
                        Project_id: newValues.Project_id || newValues.Project_ID  ||null ,
                        created_by: newValues.Created_by ,
                        Date_Submitted : newValues.Date_submitted,
                        Request_Owner : newValues.Request_Owner,
                        Request_ID :  newValues.Project_id || newValues.Project_ID  ||null ,
                        Workstage : newValues.Workstage,
                        Project_Name : newValues.Project_Name,
                        Description : newValues.Description,
                        Expected_Start_Date : newValues.Expected_Start_Date,
                        Expected_Completion_Date : newValues.Expected_Completion_Date,
                        Deadline_Justification : newValues.Deadline_Justification,
                        Project_Type : newValues.Project_Type,
                        Project_Documents : newValues.Project_docs || newValues.Project_Documents,
                        SPFiles : newValues.SPFiles || [],
                        SavedLocally : savedLocally,
                        SavedOnDB : savedonDB
                        // this.getSharepointFilesByProject(projectID, 'requirementsDefinition')
                    }     
                    
                    // ? Assign New Values to DataSet
                    projectIntake.requirementsDefinition = Object.assign({}, projectIntake.requirementsDefinition, requirementsDefinition)
                    console.log("TCL: formHolder -> updateProjectIntakeValues -> projectIntake", projectIntake)
                    

                }
                


                // ? Set Business Information
                if(objectToChange === 'business') {

                    let businessInformation = {
                        Project_id: newValues.Project_id || newValues.Project_ID  ||null ,
                        Buss_info_id : newValues.buss_info_id || newValues.Buss_info_id || null,
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
                        SavedLocally : savedLocally,
                        SavedOnDB : savedonDB
                    }

                      // ? Assign New Values to DataSet
                      projectIntake.businessInformation = Object.assign({}, projectIntake.businessInformation, businessInformation)
                      console.log("TCL: formHolder -> updateProjectIntakeValues -> projectIntake", projectIntake)

                }


                // ? Set Technical Evaluation
                if(objectToChange === 'technical') {
                    let technicalEvaluation = {
                        Tech_eval_id : newValues.Tech_eval_id || newValues.tech_eval_id || null,
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
                        SavedLocally : savedLocally,
                        SavedOnDB : savedonDB
                    }

                      // ? Assign New Values to DataSet
                      projectIntake.technicalEvaluation = Object.assign({}, projectIntake.technicalEvaluation, technicalEvaluation)
                      console.log("TCL: formHolder -> updateProjectIntakeValues -> projectIntake", projectIntake)
                }


                 // ? Set PMO Evaluation Data
                if(objectToChange === 'pmoEval') {
                    let pmoEvaluation = {
                        Pmo_eval_id : newValues.Pmo_eval_id ||  newValues.pmo_eval_id || null,
                        Expected_total_ROI : newValues.Expected_total_ROI,
                        Expected_IRR : newValues.Expected_IRR,
                        ROI_Category : newValues.ROI_Category,
                        WorkID_PlanView_FlexPM_SN_Ticket : newValues.WorkID_PlanView_FlexPM_SN_Ticket,
                        Documents : newValues.Documents,
                        SavedLocally : savedLocally,
                        SavedOnDB : savedonDB
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
                        Roi_real_id : newValues.roi_real_id || newValues.Roi_real_id || null,
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
                        SavedLocally : savedLocally,
                        SavedOnDB : savedonDB
                    }

                    // ? Assign New Values to DataSet
                    projectIntake.roiRealized = Object.assign({}, projectIntake.roiRealized, roiRealized)
                    console.log("TCL: formHolder -> updateProjectIntakeValues -> projectIntake", projectIntake)


                    
                  
                }

            }



            
            // ?--------------------------------------
            // ? Reset Project Intake state
            // ?--------------------------------------
            resetProjectIntake() {
                console.log('reset State');
                projectIntake = {
                    requirementsDefinition : {
                        Project_id : null,
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
                        SavedLocally : false,
                        SavedOnDB : false
                    },
            
                    businessInformation : {
                        Buss_info_id : null,
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
                        SavedLocally : false,
                        SavedOnDB : false
                        
                    },
            
                    technicalEvaluation : {
                        Tech_eval_id : null,
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
                        No_of_Active_users : null,
                         SavedLocally : false,
                        SavedOnDB : false
                    },
                    pmoEvaluation : {
                        Pmo_eval_id : null,
                        Expected_total_ROI : null,
                        Expected_IRR : null,
                        ROI_Category : null,
                        WorkID_PlanView_FlexPM_SN_Ticket : null,
                        Documents : null,
                         SavedLocally : false,
                        SavedOnDB : false
                    },
                    roiRealized : {
                        Roi_real_id : null,
                        Implementation_Date :   moment().format("MM/DD/YYYY") || null,
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
                        SavedLocally : false,
                        SavedOnDB : false
                    }
                
                }
                console.log("TCL: formHolder -> resetProjectIntake -> projectIntake", projectIntake)
            }



              
            // ?--------------------------------------
            // ? Validate Data Before Leving Route
            // ?--------------------------------------
            onNavItemClick = (nextRoute) => {
                console.log("TCL: formHolder -> onNavItemClick -> nextRoute", nextRoute)

                // let routeNameArray = route.split('/')
                // let tabRouteName = routeNameArray[routeNameArray.length-1];

                let currentRouteArray = window.location.pathname.split('/')
                let currentRoute = currentRouteArray[currentRouteArray.length-1];

                if(nextRoute === '/sites/gsd/intake_process/intake_process_v3/ProjectIntake.aspx/intake-projects') {
                    this.redirectUser(nextRoute)
                    // return;
                }

                let isValid = this.validateEmptyTabs(currentRoute);

                if(isValid ===  true) 
                    this.redirectUser(nextRoute)
                    // console.log('allow redirect');
                else
                    this.createErrorAlertTop("Please fill all the required Fields");

            }



            
            // ?--------------------------------------
            // ? Validate Empty Fields before Route Chage
            // ? Check For empty Required Fields, 
            // ? using regular JS Form Control
            // ? Allow/block Route Button
            // ? Update Child status
            // ?--------------------------------------
            validateEmptyTabs(tabName) {
                let errorsCount = 0
                switch(tabName) {
                    case 'requirement-definition' : 
                                const requiredFieldsReq = ['Project_Name', 'Description' , 'Deadline_Justification', 'Project_Type']
                                errorsCount = 0;
                                for (let field of requiredFieldsReq) {
                                    
                                    // ? Add Error
                                    if(document.getElementById(field).value === "")  {
                                        errorsCount++;
                                        this.addErrorStatus(field)
                                    }

                                    else if (field === 'Project_Type') {
                                        let sel = document.getElementById(field)
                                        let selectInput = sel.getElementsByClassName('react-select-extra-wide__single-value')[0].textContent
                                        // console.log("TCL: formHolder -> validateEmptyTabs -> sel.getElementsByClassName('react-select-extra-wide__single-value')[0].textContent", sel.getElementsByClassName('react-select-extra-wide__single-value')[0].textContent)
                                        // ? Add Error
                                        if ( selectInput === "" || selectInput === 'Project Type'){
                                            
                                            errorsCount++;
                                            this.addErrorStatus(field)
                                        }
                                        else {
                                            errorsCount = errorsCount === 0 ? 0 : errorsCount--;
                                            this.removeErrorStatus(field)
                                        }
                                    }

                                    // ? Remove Error
                                    else {
                                        errorsCount = errorsCount === 0 ? 0 : errorsCount--;
                                        this.removeErrorStatus(field)
                                    }
                                }
                    break;

                    case 'business-information' :   
                        const requiredFieldsBus = [
                                'Business_Objective', 
                                'Outcomes_from_the_Objective' , 
                                'Project_Purpose', 
                                'Line_of_Business',
                                'Business_lead',
                                'Sales_Contact',
                                'IT_Vector',
                                'RPA',
                                'Region',
                                // 'Sites_Impacted',
                                'Customer',
                                'Requested_by_Customer',
                                'Customer_Priority',
                                'Estimated_Annual_Revenue',
                            ]
                        errorsCount = 0;

                        for (let field of requiredFieldsBus) {
                                    
                            console.log(field)


                            
                            // ? Look For People Pickers
                            if (field === 'Business_lead' || field === 'Sales_Contact') {
                                if(!document.getElementById(`peoplePicker${field}_TopSpan_HiddenInput`))
                                    return true
            
                                if (document.getElementById(`peoplePicker${field}_TopSpan_HiddenInput`).value === "[]" || document.getElementById(`peoplePicker${field}_TopSpan_HiddenInput`).value === "") {
                                    errorsCount++;
                                    document.getElementById(`peoplePicker${field}_TopSpan`).style = 'border: 1px solid #e76c90 !important';
                                }
                                else {
                                    document.getElementById(`peoplePicker${field}_TopSpan`).style = 'border: 1px solid #ced4da !important';
                                    errorsCount = errorsCount === 0 ? 0 : errorsCount--;
                                }
                            }   
                           
                            // ?Look For Select Fields
                            else if (document.getElementById(field).className.indexOf('react-select-container') >= 0 ) {
                                let sel = document.getElementById(field)
                                let selectInput = null;

                                console.log('sel class' , sel.getElementsByClassName('react-select-extra-wide__single-value'))
                                console.log('sel class' , sel.getElementsByClassName('react-select-extra-wide__single-value').length)

                                if( sel.getElementsByClassName('react-select-extra-wide__single-value').length > 0 )
                                    selectInput = sel.getElementsByClassName('react-select-extra-wide__single-value')[0].textContent

                                else if(sel.getElementsByClassName('react-select__single-value').length > 0)
                                    selectInput = sel.getElementsByClassName('react-select__single-value')[0].textContent
                                
                                else if(sel.getElementsByClassName('react-select-wide__control').length  > 0)
                                    selectInput = sel.getElementsByClassName('react-select-wide__control')[0].textContent

                                // ? Add Error
                                if ( selectInput === "" || selectInput.indexOf('Select') >= 0){
                                    
                                    errorsCount++;
                                    this.addErrorStatus(field)
                                }
                                else {
                                    errorsCount = errorsCount === 0 ? 0 : errorsCount--;
                                    this.removeErrorStatus(field)
                                }
                            }



                            // ? Look For Text Inputs
                            else  if(document.getElementById(field).value === "")  {
                                errorsCount++;
                                this.addErrorStatus(field)
                            }

                            // ? Remove Error
                            else {
                                errorsCount = errorsCount === 0 ? 0 : errorsCount--;
                                this.removeErrorStatus(field)
                            }
                        }
                    break;

                    case 'technical-evaluation' :
                            const requiredFieldsTech = [
                                'Delivery_Team', 
                                'Platform_type' , 
                                'Applications_involved', 
                                'Technology',
                                'IT_Groups_Required',
                                'Estimated_Effort',
                                'Project_Team_Size',
                                'IT_FTE_required',
                                'Approver',
                                'Project_Manager',
                                'Justification_ROI',
                                'Design_Development_Testing_Effort'
                            ]
                            errorsCount = 0;


                            for (let field of requiredFieldsTech) {
                                    
                                console.log(field)
    
    
                                
                                // ? Look For People Pickers
                                if (field === 'Approver' || field === 'Project_Manager') {
                                    if(!document.getElementById(`peoplePicker${field}_TopSpan_HiddenInput`))
                                        return true
                
                                    if (document.getElementById(`peoplePicker${field}_TopSpan_HiddenInput`).value === "[]" || document.getElementById(`peoplePicker${field}_TopSpan_HiddenInput`).value === "") {
                                        errorsCount++;
                                        document.getElementById(`peoplePicker${field}_TopSpan`).style = 'border: 1px solid #e76c90 !important';
                                    }
                                    else {
                                        document.getElementById(`peoplePicker${field}_TopSpan`).style = 'border: 1px solid #ced4da !important';
                                        errorsCount = errorsCount === 0 ? 0 : errorsCount--;
                                    }
                                }   
                               
                                // ?Look For Select Fields
                                else if (document.getElementById(field).className.indexOf('react-select-container') >= 0 ) {
                                    let sel = document.getElementById(field)
                                    let selectInput = null;
    
                                    console.log('sel class' , sel.getElementsByClassName('react-select-extra-wide__single-value'))
                                    console.log('sel class' , sel.getElementsByClassName('react-select-extra-wide__single-value').length)
    
                                    if( sel.getElementsByClassName('react-select-extra-wide__single-value').length > 0 )
                                        selectInput = sel.getElementsByClassName('react-select-extra-wide__single-value')[0].textContent
    
                                    else if(sel.getElementsByClassName('react-select__single-value').length > 0)
                                        selectInput = sel.getElementsByClassName('react-select__single-value')[0].textContent
                                    
                                    else if(sel.getElementsByClassName('react-select-wide__control').length  > 0) {
                                        if(sel.getElementsByClassName('react-select-wide__control').length  > 0)
                                            selectInput = sel.getElementsByClassName('react-select-wide__control')[0].textContent
                                        else if (sel.getElementsByClassName('react-select-wide__value-container react-select-wide__value-container--is-multi').length  > 0)
                                            selectInput = sel.getElementsByClassName('react-select-wide__placeholder')[0].textContent
                                    }
                                        

                                    else if(sel.getElementsByClassName('react-select-wide__control').length  > 0)
                                        selectInput = sel.getElementsByClassName('react-select-wide__control')[0].textContent
    
                                    // ? Add Error
                                    if ( selectInput === "" || selectInput.indexOf('Select') >= 0){
                                        
                                        errorsCount++;
                                        this.addErrorStatus(field)
                                    }
                                    else {
                                        errorsCount = errorsCount === 0 ? 0 : errorsCount--;
                                        this.removeErrorStatus(field)
                                    }
                                }
    
    
    
                                // ? Look For Text Inputs
                                else  if(document.getElementById(field).value === "")  {
                                    errorsCount++;
                                    this.addErrorStatus(field)
                                }
    
                                // ? Remove Error
                                else {
                                    errorsCount = errorsCount === 0 ? 0 : errorsCount--;
                                    this.removeErrorStatus(field)
                                }
                            }
                    break;

                    case 'pmo-evaluation' :
                            const requiredFieldsPMO = [
                                'Expected_total_ROI', 
                                'Expected_IRR' , 
                                'ROI_Category', 
                                'WorkID_PlanView_FlexPM_SN_Ticket'
                            ]
                        errorsCount = 0;

                        for (let field of requiredFieldsPMO) {
                                    
                            console.log(field)


                            
                          
                           
                            // ?Look For Select Fields
                            if (document.getElementById(field).className.indexOf('react-select-container') >= 0 ) {
                                let sel = document.getElementById(field)
                                let selectInput = null;

                                console.log('sel class' , sel.getElementsByClassName('react-select-extra-wide__single-value'))
                                console.log('sel class' , sel.getElementsByClassName('react-select-extra-wide__single-value').length)

                                if( sel.getElementsByClassName('react-select-extra-wide__single-value').length > 0 )
                                    selectInput = sel.getElementsByClassName('react-select-extra-wide__single-value')[0].textContent

                                else if(sel.getElementsByClassName('react-select__single-value').length > 0)
                                    selectInput = sel.getElementsByClassName('react-select__single-value')[0].textContent
                                
                                else if(sel.getElementsByClassName('react-select-wide__control').length  > 0)
                                    selectInput = sel.getElementsByClassName('react-select-wide__control')[0].textContent

                                // ? Add Error
                                if ( selectInput === "" || selectInput.indexOf('Select') >= 0){
                                    
                                    errorsCount++;
                                    this.addErrorStatus(field)
                                }
                                else {
                                    errorsCount = errorsCount === 0 ? 0 : errorsCount--;
                                    this.removeErrorStatus(field)
                                }
                            }



                            // ? Look For Text Inputs
                            else  if(document.getElementById(field).value === "")  {
                                errorsCount++;
                                this.addErrorStatus(field)
                            }

                            // ? Remove Error
                            else {
                                errorsCount = errorsCount === 0 ? 0 : errorsCount--;
                                this.removeErrorStatus(field)
                            }
                        }
                    break;

                    default  : return true
                        
                }


                return errorsCount > 0 ?  false : true
            }



            
            // ?--------------------------------------
            // ? Redirect User
            // ?--------------------------------------
            redirectUser(redirectPath) {
                const {history, location} = this.props;
                if(location.pathname === redirectPath)
                    return;
                
                history.push(redirectPath);
            }


        /* ==========================================================================
        ** Render Methods
        ** ========================================================================== */


            // --------------------------------------
            // Render Navigation
            // --------------------------------------
            renderNavigation() {
                // const activeRoute = newProjectRoutes[0];
                const navigationRoutes = this.enableNavigationRoutes();

                let currentRoute = window.location.pathname;

                return <NavBar routes = {navigationRoutes} activeRoute = {currentRoute} onItemClick = {this.onNavItemClick} renderLinks = {false}/>
            }



            // --------------------------------------
            // Add Red Border to Control
            // --------------------------------------   
            addErrorStatus = (controlID)=> {
                const control =  document.getElementById(controlID) ? document.getElementById(controlID) : null;
                if(control)
                    control.classList.add('int-errorStatus');
                else
                    return;
            }

            // --------------------------------------
            // Remove Error Status to Control
            // --------------------------------------
            removeErrorStatus = (controlID)=> {
                const control =  document.getElementById(controlID) ? document.getElementById(controlID) : null;
                if(control)
                    control.classList.remove('int-errorStatus')
                else
                    return;
                
            }




            // --------------------------------------
            // Top Alert
            // --------------------------------------
            createErrorAlertTop= (message) => {
                Alert.error(message, {
                    position: 'top',
                    effect : 'slide',
                    timeout: 2000
                });
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

                const isPMO = localStorage.getItem('isUserPMO') === "true" ? true  : false

                return (
                    
                    <Switch>


                        <Route
                            path = {`${relativePath}/intake-projects`}
                            exact =  {true}
                            key =  'route-intakeProjects'
                            ref = 'route-intakeProjects'
                            render={(props) => <AllProjectsView 
                                                        projectIntake = {projectIntake}  
                                                        isPMO = {isPMO} 
                                                        locationData = {this.props} 
                                                        resetProjectIntake = {this.resetProjectIntake} 
                                                />}
                        />


                        <Route
                            path = {`${relativePath}/add-project/requirement-definition`}
                            key =  'route-addRequirementDefinition'
                            ref = 'route-addRequirementDefinition'
                            render={(props) => <AddRequirementsDefinition 
                                                    projectIntake = {projectIntake}  
                                                    isPMO = {isPMO} 
                                                    locationData = {this.props} 
                                                    updateProjectIntakeValues = {this.updateProjectIntakeValues} 
                                                    createRequirements = {this.createRequirements}
                                                    resetProjectIntake = {this.resetProjectIntake}
                                                    sendEmailUpdate = {this.sendEmailUpdate}
                                                />
                                    }
                        />

                        <Route
                            path = {`${relativePath}/add-project/business-information`}
                            key =  'route-addBusinessInformation'
                            ref = 'route-addBusinessInformation'
                            render={(props) => <AddBusinessInformation 
                                                        projectIntake = {projectIntake}
                                                        isPMO = {isPMO} 
                                                        resetForm = {this.state.resetForm} 
                                                        locationData = {this.props} 
                                                        updateProjectIntakeValues = {this.updateProjectIntakeValues} 
                                                        sendEmailUpdate = {this.sendEmailUpdate}
                                                />
                                    }
                        />

                        <Route
                            path = {`${relativePath}/add-project/technical-evaluation`}
                            key =  'route-addTechnicalEvaluation'
                            ref = 'route-addTechnicalEvaluation'
                            render={(props) => <AddTechnicalEvaluation 
                                                            projectIntake = {projectIntake}  
                                                            isPMO = {isPMO} 
                                                            resetForm = {this.state.resetForm} 
                                                            locationData = {this.props} 
                                                            updateProjectIntakeValues = {this.updateProjectIntakeValues}
                                                            sendEmailUpdate = {this.sendEmailUpdate} 
                                                />
                                    }
                        />


                        <Route
                            path = {`${relativePath}/add-project/pmo-evaluation`}
                            key =  'route-addPmoEvaluation'
                            ref = 'route-addPmoEvaluation'
                            render={(props) => <AddPMOEvaluation 
                                                            projectIntake = {projectIntake} 
                                                            isPMO = {isPMO} 
                                                            resetForm = {this.state.resetForm} 
                                                            locationData = {this.props} 
                                                            updateProjectIntakeValues = {this.updateProjectIntakeValues}
                                                            sendEmailUpdate = {this.sendEmailUpdate} 
                                                />
                                    }
                        />


                        <Route
                            path = {`${relativePath}/add-project/roi-realized`}
                            key =  'route-addRoiRealized'
                            ref = 'route-addRoiRealized'
                            render={(props) => <AddROIRealized 
                                                            projectIntake = {projectIntake} 
                                                            isPMO = {isPMO} 
                                                            resetForm = {this.state.resetForm} 
                                                            locationData = {this.props} 
                                                            updateProjectIntakeValues = {this.updateProjectIntakeValues}
                                                            sendEmailUpdate = {this.sendEmailUpdate} 
                                                />
                                    }
                        />


                        <Redirect from = {`${relativePath}/add-project/`} to = {`${relativePath}/add-project/requirement-definition`} ></Redirect>


                    </Switch>
            
                );


            
            }

          
            // --------------------------------------
            // Render Projects
            // --------------------------------------
            renderformHolder() {
                let showPrompt = true
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
                return isLoaded && this.renderformHolder();
            }
    }



// -------------------------------------- 
// Define PropTypes 
// -------------------------------------- 
    // formHolder.propTypes = {
    //     props: PropTypes
    // };




/* ==========================================================================
** Redux Functions
** ========================================================================== */
// const mapStateToProps = (state) => {
//     //console.log('TCL: mapStateToProps -> state', state)
//     return {
//         pmos : state.sharepoint,
//         pmosData:state.sharepoint.pmos,
//         isPMO : state.sharepoint.isPMO,
//         isLoaded : state.sharepoint.pmosLoaded
//     }
// }





// --------------------------------------
// Export Component
// --------------------------------------
    // export default  withRouter (connect(mapStateToProps, {fetchSitePMOS}) (formHolder));
    export default  (formHolder);