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
    // import formHolder from '../layouts/Projects/FormHolder';
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
                            path = {`${localPath}/add-project/requirement-definition`}
                            key =  'route-addRequirementDefinition'
                            ref = 'route-addRequirementDefinition'
                            render={(props) => <AddRequirementsDefinition projectIntake = {projectIntake}  isPMO = {isPMO}/>}
                        />

                        <Route
                            path = {`${localPath}/add-project/business-information`}
                            key =  'route-addBusinessInformation'
                            ref = 'route-addBusinessInformation'
                            render={(props) => <AddBusinessInformation projectIntake = {projectIntake} isPMO = {isPMO} />}
                        />

                        <Route
                            path = {`${localPath}/add-project/technical-evaluation`}
                            key =  'route-addTechnicalEvaluation'
                            ref = 'route-addTechnicalEvaluation'
                            render={(props) => <AddTechnicalEvaluation projectIntake = {projectIntake}  isPMO = {isPMO} />}
                        />


                        <Route
                            path = {`${localPath}/add-project/pmo-evaluation`}
                            key =  'route-addPmoEvaluation'
                            ref = 'route-addPmoEvaluation'
                            render={(props) => <AddPMOEvaluation projectIntake = {projectIntake} isPMO = {isPMO} />}
                        />


                        <Route
                            path = {`${localPath}/add-project/roi-realized`}
                            key =  'route-addRoiRealized'
                            ref = 'route-addRoiRealized'
                            render={(props) => <AddROIRealized projectIntake = {projectIntake} isPMO = {isPMO} />}
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