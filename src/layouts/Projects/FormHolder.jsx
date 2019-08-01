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
    import {  NavBar, Header, FormBody, AppButton} from '../../components';
    import {  Switch, Route, Link, Redirect } from "react-router-dom";
    // import { connect } from 'react-redux';
    import { withRouter } from 'react-router';
    // import { fetchSitePMOS } from '../../actions'
    import { newProjectRoutes } from '../../routes/routes';
    import '../styles.css'
    import Alert from 'react-s-alert';
    import 'react-s-alert/dist/s-alert-default.css';
    import 'react-s-alert/dist/s-alert-css-effects/slide.css';
    import {Config} from '../../Config';
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
            savedLocally : false,
            savedonDB : false
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
            savedLocally : false,
            savedonDB : false
            
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
            No_of_Active_users : null,
            savedLocally : false,
            savedonDB : false
        },
        pmoEvaluation : {
            Expected_total_ROI : null,
            Expected_IRR : null,
            ROI_Category : null,
            WorkID_PlanView_FlexPM_SN_Ticket : null,
            Documents : null,
            savedLocally : false,
            savedonDB : false
        },
        roiRealized : {
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
            savedLocally : false,
            savedonDB : false
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
            this.setState({isLoaded : true});
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

            updateProjectIntakeValues(objectToChange,  newValues , extraValues = null, savedonDB = false) {
                console.log("TCL: formHolder -> updateProjectIntakeValues -> newValues", newValues)
                console.log("TCL: formHolder -> updateProjectIntakeValues -> currentView", objectToChange)


                  // ? Set Requirements Definition
                if(objectToChange === 'requirements') {

                    let requirementsDefinition = {
                       
                        project_id: newValues.Project_id || null ,
                        created_by: newValues.Created_by ,
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
                        savedLocally : true,
                        savedonDB : savedonDB
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
                        savedLocally : true,
                        savedonDB : savedonDB
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
                        savedLocally : true,
                        savedonDB : savedonDB
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
                        savedLocally : true,
                        savedonDB : savedonDB
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
                        savedLocally : true,
                        savedonDB : savedonDB
                    }

                    // ? Assign New Values to DataSet
                    projectIntake.roiRealized = Object.assign({}, projectIntake.roiRealized, roiRealized)
                    console.log("TCL: formHolder -> updateProjectIntakeValues -> projectIntake", projectIntake)


                    
                  
                }

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
                return <NavBar routes = {navigationRoutes} activeRoute = {0}/>
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
                            path = {`${localPath}/intake-projects`}
                            exact =  {true}
                            key =  'route-intakeProjects'
                            ref = 'route-intakeProjects'
                            render={(props) => <AllProjectsView projectIntake = {projectIntake}  isPMO = {isPMO} locationData = {this.props}  />}
                        />


                        <Route
                            path = {`${localPath}/add-project/requirement-definition`}
                            key =  'route-addRequirementDefinition'
                            ref = 'route-addRequirementDefinition'
                            render={(props) => <AddRequirementsDefinition projectIntake = {projectIntake}  isPMO = {isPMO} locationData = {this.props} updateProjectIntakeValues = {this.updateProjectIntakeValues} />}
                        />

                        <Route
                            path = {`${localPath}/add-project/business-information`}
                            key =  'route-addBusinessInformation'
                            ref = 'route-addBusinessInformation'
                            render={(props) => <AddBusinessInformation projectIntake = {projectIntake} isPMO = {isPMO} locationData = {this.props} updateProjectIntakeValues = {this.updateProjectIntakeValues} />}
                        />

                        <Route
                            path = {`${localPath}/add-project/technical-evaluation`}
                            key =  'route-addTechnicalEvaluation'
                            ref = 'route-addTechnicalEvaluation'
                            render={(props) => <AddTechnicalEvaluation projectIntake = {projectIntake}  isPMO = {isPMO} locationData = {this.props} updateProjectIntakeValues = {this.updateProjectIntakeValues} />}
                        />


                        <Route
                            path = {`${localPath}/add-project/pmo-evaluation`}
                            key =  'route-addPmoEvaluation'
                            ref = 'route-addPmoEvaluation'
                            render={(props) => <AddPMOEvaluation projectIntake = {projectIntake} isPMO = {isPMO} locationData = {this.props} updateProjectIntakeValues = {this.updateProjectIntakeValues} />}
                        />


                        <Route
                            path = {`${localPath}/add-project/roi-realized`}
                            key =  'route-addRoiRealized'
                            ref = 'route-addRoiRealized'
                            render={(props) => <AddROIRealized projectIntake = {projectIntake} isPMO = {isPMO} locationData = {this.props} updateProjectIntakeValues = {this.updateProjectIntakeValues} />}
                        />


                        <Redirect from = {`${localPath}/add-project/`} to = {`${localPath}/add-project/requirement-definition`} ></Redirect>


                    </Switch>
            
                );


            
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