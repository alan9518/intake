/* ==========================================================================
** Form Step 5  ROI Realized Add Project 
** 30/01/2019
** Alan Medina Silva
** ========================================================================== */

// --------------------------------------
// Get Dependences
// --------------------------------------
    import React, { Component, Fragment } from 'react';
    import { FieldsGenerator, AppLoader, SectionHeader, FormBody, FormFooter, AppButton } from  '../../../components';
    // import { connect } from 'react-redux';
    // import { compose } from 'redux';
    import { isEmpty } from 'lodash';
    import { withRouter } from 'react-router';
    import {Redirect} from 'react-router-dom';
    // import { 
    //         saveLocalRoiRealized, 
    //         saveROIRealizedDB, 
    //         saveDynatraceDB, 
    //         updateROIRealizedDB, 
    //         resetRequirementsState, 
    //         saveProjectFiles,
    //         resetBusinessState, 
    //         resetTechnicalState, 
    //         resetPMOEvaluationState, 
    //         resetROIRealizedState,
    //         saveRequirementsDB,
    //         updateRequirementsDB,
    //         updateBusinesInformationDB,
    //         saveBusinesInformationDB,
    //         updateTechnicalDB,
    //         saveTechnicalDB,
    //         savePMOEvaluationDB,
    //         updatePMOEvaluation,


    //     } from '../../../actions'
    import PropTypes from 'prop-types';
    import Alert from 'react-s-alert';
    import moment from "moment";


// --------------------------------------
// Create Component Class
// --------------------------------------
    class ROIRealized extends Component {
        
        /* ==========================================================================
        ** Component Setup
        ** ========================================================================== */
            // --------------------------------------
            // Constructor
            // --------------------------------------
            constructor(props) {
                super(props);
                this.state = {
                    isLoaded: false,
                    responsiveWidth : window.innerWidth,
                    sendingData : false,
                    Implementation_Date : moment(props.projectIntake.roiRealized.Implementation_Date ) ||  moment().format("MM/DD/YYYY"),
                    FTE_Saved_per_year : props.projectIntake.roiRealized.FTE_Saved_per_year || "",
                    Hours_saved_per_year : props.projectIntake.roiRealized.Hours_saved_per_year ||  "",
                    Compliance_Ris_cost_that_was_avoided_by_this_application : props.projectIntake.roiRealized.Compliance_Ris_cost_that_was_avoided_by_this_application || "",
                    Risk_Avoidance : props.projectIntake.roiRealized.Compliance_Ris_cost_that_was_avoided_by_this_application || "",
                    Savings_from_Retirement_of_Legacy_application_in_hours_per_year_by_Maintenance_Team :  props.projectIntake.roiRealized.Savings_from_Retirement_of_Legacy_application_in_hours_per_year_by_Maintenance_Team || "",
                    Legacy_System_Infra_and_License_Fee_savings_per_year : props.projectIntake.roiRealized.Legacy_System_Infra_and_License_Fee_savings_per_year || "",
                    Other_Savings : props.projectIntake.roiRealized.Other_Savings ||  "",
                    Design_Developmen_Testing_Effort_hours : props.projectIntake.roiRealized.Design_Developmen_Testing_Effort_hours || "",
                    Travel_TE : props.projectIntake.roiRealized.Travel_TE || "",
                    Consulting : props.projectIntake.roiRealized.Consulting || "",
                    Training : props.projectIntake.roiRealized.Training || "",
                    Licenses_Cost_per_year : props.projectIntake.roiRealized.Licenses_Cost_per_year || "",
                    Hardware_leasing : props.projectIntake.roiRealized.Hardware_leasing || "",
                    Maintenance_Hardware_hours_per_year : props.projectIntake.roiRealized.Maintenance_Hardware_hours_per_year || "",
                    Maintenance_Salaries_hours_per_year : props.projectIntake.roiRealized.Maintenance_Salaries_hours_per_year ||  "",
                    Site_Usage :  "",
                    Usage_Footprint_1_week :  "",
                    Transactions_per_minute_TPM :  "",
                    ROI_Realized_Date :  "",
                    Site_UsageRows : [],
                    Usage_FootprintRows : [],
                    dynatrace : props.projectIntake.roiRealized.dynatrace || [],
                    showDynatrace : props.projectIntake.roiRealized.dynatrace ? true : false
                }
                this.onChangeSelect =  this.onChangeSelect.bind(this);
                this.onDateChange =  this.onDateChange.bind(this);
                this.formFields =  this.createFormStructure();
            }


        


            // --------------------------------------
            // Set Initial Values
            // --------------------------------------
            componentDidMount() {
                window.addEventListener("resize", this.updateContainerDimensions);
            }


            // --------------------------------------
            // Save Form Values before the component
            // unloads by the menu navigation
            // --------------------------------------
            componentWillUnmount() {
                // let formData =  this.saveFormValues(null, null);
                // this.submitFormLocalData(true)
                // this.props.saveLocalRoiRealized(formData);
                window.removeEventListener("resize", this.updateContainerDimensions);
            }


            // --------------------------------------
            // Window Resizing
            // --------------------------------------
            updateContainerDimensions = () => {
                let newWidth = window.innerWidth;
                this.setState({responsiveWidth : newWidth});
            }
        

            // --------------------------------------
            // Crate JSON Data FIelds
            // --------------------------------------
            createFormStructure() {
                const formFields = [
                    {
                        "Field_Name": "Implementation Date",
                        "value": this.state.Implementation_Date,
                        "Field_State_Name": "Implementation_Date",
                        "group" : "firstSection1",
                        "Mandatory": false,
                        "Enabled": true,
                        "Sequence": "69",
                        "Type": "Date",
                        "General_Value": "?",
                        "columns" : 2,
                        "hasToolTip" : true,
                        "toolTipText" : "Date when implementation was completed."
                
                    },
                    {
                        "Field_Name": "FTE Saved per year",
                        "value": this.state.FTE_Saved_per_year,
                        "Field_State_Name": "FTE_Saved_per_year",
                        "group" : "firstSection2",
                        "Mandatory": false,
                        "Enabled": true,
                        "Sequence": "70",
                        "Type": "Integer",
                        "General_Value": "0",
                        "columns" : 2,
                        "hasToolTip" : true,
                        "toolTipText" : "Numbers"
                
                    },
                    {
                        "Field_Name": "Hours saved per year",
                        "value": this.state.Hours_saved_per_year,
                        "Field_State_Name": "Hours_saved_per_year",
                        "group" : "firstSection3",
                        "Mandatory": false,
                        "Enabled": true,
                        "Sequence": "71",
                        "Type": "Integer",
                        "General_Value": "0",
                        "columns" : 2,
                        "hasToolTip" : true,
                        "toolTipText" : "Numbers"
                
                    },
                    {
                        "Field_Name": "Compliance / Risk cost that was avoided by this application.",
                        "value": this.state.Compliance_Ris_cost_that_was_avoided_by_this_application,
                        "Field_State_Name": "Compliance_Ris_cost_that_was_avoided_by_this_application",
                        "group" : "secondSection1",
                        "Mandatory": false,
                        "Enabled": true,
                        "Sequence": "72",
                        "Type": "Decimal",
                        "General_Value": "$",
                        // "columns" : 2,
                        "columns" : this.state.responsiveWidth <= 1440 ? 1 : 2,
                        "hasToolTip" : true,
                        "toolTipText" : "Numbers"
                    },
                    {
                        "Field_Name": "Risk Avoidance",
                        "value": this.state.Risk_Avoidance,
                        "Field_State_Name": "Risk_Avoidance",
                        "group" : "secondSection2",
                        "Mandatory": false,
                        "Enabled": true,
                        "Sequence": "73",
                        "Type": "Decimal",
                        "General_Value": "$",
                        // "columns" : 2,
                        "columns" : this.state.responsiveWidth <= 1440 ? 1 : 2,
                        "hasToolTip" : true,
                        "toolTipText" : "Numbers"
                    },
                    {
                        "Field_Name": "Savings from Retirement of Legacy application in hours per year by Maintenance Team?",
                        "value": this.state.Savings_from_Retirement_of_Legacy_application_in_hours_per_year_by_Maintenance_Team,
                        "Field_State_Name": "Savings_from_Retirement_of_Legacy_application_in_hours_per_year_by_Maintenance_Team",
                        "group" : "thirdSection1",
                        "Mandatory": false,
                        "Enabled": true,
                        "Sequence": "74",
                        "Type": "Decimal",
                        "General_Value": "$",
                        // "columns" : 2,
                        "columns" : this.state.responsiveWidth <= 1440 ? 1 : 2,
                        "hasToolTip" : true,
                        "toolTipText" : "Numbers"
                    },
                    {
                        "Field_Name": "Legacy System Infra and License Fee savings per year?",
                        "value": this.state.Legacy_System_Infra_and_License_Fee_savings_per_year,
                        "Field_State_Name": "Legacy_System_Infra_and_License_Fee_savings_per_year",
                        "group" : "fourthSection1",
                        "Mandatory": false,
                        "Enabled": true,
                        "Sequence": "75",
                        "Type": "Decimal",
                        "General_Value": "$",
                        // "columns" : 2,
                        "columns" : this.state.responsiveWidth <= 1440 ? 1 : 2,
                        "hasToolTip" : true,
                        "toolTipText" : "Numbers"
                    },
                    {
                        "Field_Name": "Other Savings",
                        "value": this.state.Other_Savings,
                        "Field_State_Name": "Other_Savings",
                        "group" : "fourthSection2",
                        "Mandatory": false,
                        "Enabled": true,
                        "Sequence": "76",
                        "Type": "Decimal",
                        "General_Value": "$",
                        // "columns" : 2,
                        "columns" : this.state.responsiveWidth <= 1440 ? 1 : 2,
                        "hasToolTip" : true,
                        "toolTipText" : "Numbers"
                    },
                    {
                        "Field_Name": "Design, Development & Testing Effort (hours)",
                        "value": this.state.Design_Developmen_Testing_Effort_hours,
                        "Field_State_Name": "Design_Developmen_Testing_Effort_hours",
                        "group" : "fifthSection1",
                        "Mandatory": false,
                        "Enabled": true,
                        "Sequence": "77",
                        "Type": "Decimal",
                        "General_Value": "0",
                        "columns" : 2,
                        "hasToolTip" : true,
                        "toolTipText" : "Numbers"
                    },
                    {
                        "Field_Name": "Travel (T&E)",
                        "value": this.state.Travel_TE,
                        "Field_State_Name": "Travel_TE",
                        "group" : "fifthSection2",
                        "Mandatory": false,
                        "Enabled": true,
                        "Sequence": "78",
                        "Type": "Decimal",
                        "General_Value": "$",
                        "columns" : 2,
                        "hasToolTip" : true,
                        "toolTipText" : "Numbers"
                    },
                    {
                        "Field_Name": "Consulting",
                        "value": this.state.Consulting,
                        "Field_State_Name": "Consulting",
                        "group" : "fifthSection3",
                        "Mandatory": false,
                        "Enabled": true,
                        "Sequence": "79",
                        "Type": "Decimal",
                        "General_Value": "$",
                        "columns" : 2,
                        "hasToolTip" : true,
                        "toolTipText" : "Numbers"
                    },
                    {
                        "Field_Name": "Training",
                        "value": this.state.Training,
                        "Field_State_Name": "Training",
                        "group" : "sixthSection1",
                        "Mandatory": false,
                        "Enabled": true,
                        "Sequence": "80",
                        "Type": "Decimal",
                        "General_Value": "$",
                        "columns" : 2,
                        "hasToolTip" : true,
                        "toolTipText" : "Numbers"
                    },
                    {
                        "Field_Name": "Licenses Cost per year",
                        "value": this.state.Licenses_Cost_per_year,
                        "Field_State_Name": "Licenses_Cost_per_year",
                        "group" : "seventhSection1",
                        "Mandatory": false,
                        "Enabled": true,
                        "Sequence": "81",
                        "Type": "Decimal",
                        "General_Value": "$",
                        "columns" : 2,
                        "hasToolTip" : true,
                        "toolTipText" : "Numbers"
                    },
                    {
                        "Field_Name": "Hardware leasing",
                        "value": this.state.Hardware_leasing,
                        "Field_State_Name": "Hardware_leasing",
                        "group" : "seventhSection2",
                        "Mandatory": false,
                        "Enabled": true,
                        "Sequence": "82",
                        "Type": "Decimal",
                        "General_Value": "$",
                        "columns" : 2,
                        "hasToolTip" : true,
                        "toolTipText" : "Numbers"
                    },
                    {
                        "Field_Name": "Maintenance Hardware (hours per year)",
                        "value": this.state.Maintenance_Hardware_hours_per_year,
                        "Field_State_Name": "Maintenance_Hardware_hours_per_year",
                        "group" : "eigthSection1",
                        "Mandatory": false,
                        "Enabled": true,
                        "Sequence": "83",
                        "Type": "Decimal",
                        "General_Value": "0",
                        "columns" : 2,
                        "hasToolTip" : true,
                        "toolTipText" : "Numbers"
                    },
                    {
                        "Field_Name": "Maintenance Salaries (hours per year)",
                        "value": this.state.Maintenance_Salaries_hours_per_year,
                        "Field_State_Name": "Maintenance_Salaries_hours_per_year",
                        "group" : "eigthSection2",
                        "Mandatory": false,
                        "Enabled": true,
                        "Sequence": "84",
                        "Type": "Decimal",
                        "General_Value": "0",
                        "columns" : 2,
                        "hasToolTip" : true,
                        "toolTipText" : "Hours"
                    },
                    {
                        "Field_Name": "Site Usage",
                        "value": this.state.Site_Usage,
                        "Field_State_Name": "Site_Usage",
                        "group" : "ninthSection1",
                        "Mandatory": false,
                        "Enabled": true,
                        "Sequence": "85",
                        "Type": "text",
                        "General_Value": [],
                        "columns" : 2,
                        "wideControl" : true,
                        // "multipleRows" : true,
                        "hasToolTip" : true,
                        "toolTipText" : "Sites where new systems were implemented."
                    },
                    {
                        "Field_Name": "Usage Footprint (1 week)",
                        "value": this.state.Usage_Footprint_1_week,
                        "Field_State_Name": "Usage_Footprint_1_week",
                        "group" : "ninthSection2",
                        "Mandatory": false,
                        "Enabled": true,
                        "Sequence": "86",
                        "Type": "text",
                        "General_Value": [],
                        "columns" : 2,
                        "wideControl" : true,
                        // "multipleRows" : true,
                        "hasToolTip" : true,
                        "toolTipText" : "Numbers"
                    },
                    {
                        "Field_Name": "Transactions per minute (TPM)",
                        "value": this.state.Transactions_per_minute_TPM,
                        "Field_State_Name": "Transactions_per_minute_TPM",
                        "group" : "ninthSection3",
                        "Mandatory": false,
                        "Enabled": true,
                        "Sequence": "87",
                        "Type": "Integer",
                        "General_Value": "?See Notes below",
                        "columns" : 2,
                        "hasToolTip" : true,
                        "toolTipText" : "Numbers"
                    },
                    {
                        "Field_Name": "ROI Realized Date",
                        "value": this.state.ROI_Realized_Date,
                        "Field_State_Name": "ROI_Realized_Date",
                        "group" : "ninthSection4",
                        "Mandatory": false,
                        "Enabled": true,
                        "Sequence": "88",
                        "Type": "Date",
                        "General_Value": "Date Picker",
                        "hasToolTip" : true,
                        "toolTipText" : "Date when ROI realized analysis was completed",
                        "columns" : 2
                    }
                ]

                return formFields;
            }





        /* ==========================================================================
        ** Handle State
        ** ========================================================================== */
            
            // --------------------------------------
            // Control Text Inputs State
            // --------------------------------------
            onChangeInputs = (event) => {
				//console.log('TCL: RequirementsDefinition -> onChangeInputs -> event', event)
                this.setState({
                    [event.target.name]: event.target.value
                })
                
            }

            // --------------------------------------
            // Control Select Inputs
            // --------------------------------------
            // onChangeSelect = (selectedOption) =>{
            onChangeSelect(control, selectedOption) {
                this.setState({
                    [control] : selectedOption
                })   
            }

            
            // --------------------------------------
            // Control Date Inputs
            // TODO : Cnvert to sting Before POST
            // --------------------------------------
            onDateChange = (control, selectedDateString, selectedDate) =>{
                this.setState({
                    [control] : selectedDate
                })   
            }


            // --------------------------------------
            // Show Dynatrace Form && Table
            // --------------------------------------
            addDynatrace = (event) => {
                event.preventDefault();
                this.setState({
                    showDynatrace : true  
                })
            }

            // --------------------------------------
            // Hide Dynatrace Form && Table
            // --------------------------------------
            removeDynatrace = (event) => {
                // event.preventDefault();
                this.setState({
                    showDynatrace : false,
                    dynatrace : []  
                })
            }

            // --------------------------------------
            // Validate Dynatrace Values
            // --------------------------------------
            validateDynatraceInputs(Usage_Footprint_1_week, Site_Usage, Transactions_per_minute_TPM) {
                if(Usage_Footprint_1_week === "") {
                    this.addErrorStatus("Usage_Footprint_1_week");
                    return false;
                }
                if(Site_Usage === "") {
                    this.addErrorStatus("Site_Usage");
                    return false;
                }
                if(Transactions_per_minute_TPM === "") {
                    this.addErrorStatus("Transactions_per_minute_TPM");
                    return false;
                }

                return true;
                
            }

            // --------------------------------------
            // Add Dynatrace Items
            // --------------------------------------
            saveDynatrace = ()=> {
                const {Usage_Footprint_1_week, Site_Usage, Transactions_per_minute_TPM, ROI_Realized_Date, dynatrace} = this.state;


                if(this.validateDynatraceInputs(Usage_Footprint_1_week, Site_Usage, Transactions_per_minute_TPM) === false) {
                    this.createErrorAlert("These values can't be empty");
                    return;
                }

                let dynatraceArray = dynatrace;
                let index =  dynatrace.length + 1

                let dynatraceObject = {index, Usage_Footprint_1_week, Site_Usage, Transactions_per_minute_TPM, ROI_Realized_Date : ROI_Realized_Date || moment() } 
                // let dynatraceArray = [...dynatrace, dynatraceObject];
                dynatraceArray.push(dynatraceObject);
				
                //console.log('TCL: saveDynatrace -> dynatraceObject', dynatraceObject)
                
                //console.log('TCL: saveDynatrace -> dynatraceArray', dynatraceArray)
                // dynatraceArray.push({})
                this.setState({
                    dynatrace : dynatraceArray,
                    Usage_Footprint_1_week : "",
                    Site_Usage : "",
                    Transactions_per_minute_TPM : "",
                    ROI_Realized_Date : "",
                    dynatrac : ""
                })

                //console.log('TCL: saveDynatrace -> this.state', this.state)
            }

            // --------------------------------------
            // Remove Item from Dynatrace Array
            // --------------------------------------
            removeTableItem = (event) => {
                event.preventDefault();
                //console.log('TCL: removeTableItem -> event', event)
                const {target, currentTarget} = event;
				//console.log('TCL: removeTableItem -> target', target.id)
                //console.log('TCL: removeTableItem -> currentTarget', currentTarget.id)
                const index = currentTarget.id
                // const {current}
                const {dynatrace} = this.state;

                const newDynatrace = dynatrace.filter((item)=>{
					//console.log('TCL: removeTableItem -> item', item)
                    return item.index !== parseInt(index)
                })
				//console.log('TCL: removeTableItem -> newDynatrace', newDynatrace)
                this.setState({
                    dynatrace : newDynatrace
                })
                // const newDynatrace = pullAllWith(dynatrace, [{'index' : index}], isEqual)
				// //console.log('TCL: removeTableItem -> newDynatrace', newDynatrace)
            }   
            

        /* ==========================================================================
        ** Save Values
        ** ========================================================================== */

                // --------------------------------------
                // Validate Form Inputs
                // --------------------------------------
                validateFormInputs() {
                    const fields = this.formFields;
                        
                    let errors = fields.map((fieldItem) => {
                        if(fieldItem.Mandatory === true) {

                            // Check PP
                            if(fieldItem.Type === "PeoplePicker") {
                                //console.log('TCL: validateFormInputs -> fieldItem PP', fieldItem)
                                if(this.validatePeoplePicker(fieldItem.Field_State_Name) === true)
                                    return false
                                else {
                                    return true;
                                }

                            }
                            // Check empty value for text input
                            else if(fieldItem.Type === "Text" || fieldItem.Type === "Decimal" || fieldItem.Type === "Integer") {
                                    // Look For Dynatrace Objects
                                    if(fieldItem.Field_State_Name === "Usage_Footprint_1_week" 
                                        || fieldItem.Field_State_Name === "Site_Usage" 
                                        || fieldItem.Field_State_Name === "Transactions_per_minute_TPM" 
                                        || fieldItem.Field_State_Name === "ROI_Realized_Date") {
                                        return false;
                                    }
                                
                                    else if(this.state[fieldItem.Field_State_Name] === null || this.state[fieldItem.Field_State_Name] === "" ) {
                                        
                                        // const {Usage_Footprint_1_week, Site_Usage, Transactions_per_minute_TPM, ROI_Realized_Date, dynatrace} = this.state;
                                        
                                        this.addErrorStatus(fieldItem.Field_State_Name);
                                    return true;
                                }
                                else {
                                    this.removeErrorStatus(fieldItem.Field_State_Name)
                                    return false;
                                } 
                                    
                            }
                            // Check Combo
                            else if(fieldItem.Type === "Combo" || fieldItem.Type === "DynamicField") {
                                //console.log(`TCL: validateFormInputs -> fieldItem.value Copmbo->${fieldItem.Field_State_Name}`, fieldItem.value)
                                if(this.state[fieldItem.Field_State_Name].value === "" || this.state[fieldItem.Field_State_Name].value === null  || this.state[fieldItem.Field_State_Name] === null  || this.state[fieldItem.Field_State_Name] === [])  {
                                    this.addErrorStatus(fieldItem.Field_State_Name);
                                    return true;
                                    // errors.push( {error : true, field : fieldItem.Field_State_Name})
                                }
                                else {
                                    this.removeErrorStatus(fieldItem.Field_State_Name)
                                    return false;
                                } 
                                
                                
                            }
                        }
                    })
                    


                    // Check How Many erros Are
                    const errorsCount = errors.filter(error=>{return error===true}).length
					//console.log('TCL: validateFormInputs -> errorsCount', errorsCount)

                    return errorsCount > 0 ?  false : true
                    
                }

                // --------------------------------------
                // Save Form Values
                // --------------------------------------
                saveFormValues(projectID, newROIID) {
                    // const currentUser = window.getCurrentSPUser();
                    // const projId = this.props.projectID || 'GSD67';
                    // const requestID = projId.substr(projId.indexOf('D')+1,projId.length);

                    const projId = this.props.requirementsDefinition.newProjectID || projectID;
                    let requestID = null
                    
                    if(projId === undefined || projectID === undefined || projectID === null)
                        requestID = null;
                    else
                        requestID = projId.indexOf('D') >= 0 ? projId.substr(projId.indexOf('D')+1,projId.length) : projId;
                    

                    const currentUser = window.getCurrentSPUser();
                    // const projId = this.props.projectID || projectID;
                    // const requestID = projId.substr(projId.indexOf('D')+1,projId.length);
					
                    const formData = {
                        Project_ID : requestID,
                        roi_real_id : newROIID,
                        Implementation_Date : this.state.Implementation_Date || moment(),
                        FTE_Saved_per_year : this.state.FTE_Saved_per_year,
                        Hours_saved_per_year : this.state.Hours_saved_per_year,
                        Compliance_Ris_cost_that_was_avoided_by_this_application : this.state.Compliance_Ris_cost_that_was_avoided_by_this_application,
                        Risk_Avoidance : this.state.Risk_Avoidance,
                        Savings_from_Retirement_of_Legacy_application_in_hours_per_year_by_Maintenance_Team : this.state.Savings_from_Retirement_of_Legacy_application_in_hours_per_year_by_Maintenance_Team,
                        Legacy_System_Infra_and_License_Fee_savings_per_year : this.state.Legacy_System_Infra_and_License_Fee_savings_per_year,
                        Other_Savings : this.state.Other_Savings,
                        Design_Developmen_Testing_Effort_hours : this.state.Design_Developmen_Testing_Effort_hours,
                        Travel_TE : this.state.Travel_TE,
                        Consulting : this.state.Consulting,
                        Training : this.state.Training,
                        Licenses_Cost_per_year : this.state.Licenses_Cost_per_year,
                        Hardware_leasing : this.state.Hardware_leasing,  
                        Maintenance_Hardware_hours_per_year : this.state.Maintenance_Hardware_hours_per_year,
                        Maintenance_Salaries_hours_per_year : this.state.Maintenance_Salaries_hours_per_year,
                        Site_Usage : this.state.Site_Usage,
                        Usage_Footprint_1_week : this.state.Usage_Footprint_1_week,
                        Transactions_per_minute_TPM : this.state.Transactions_per_minute_TPM,
                        ROI_Realized_Date : this.state.ROI_Realized_Date  || moment(),
                        Created_by : currentUser.userEmail,
                        Last_modifed_by : currentUser.userEmail,
                        dynatrace : this.setDynatraceData(this.state.newROIID)
                    }

                    return formData;
                }

                // --------------------------------------
                // Get Dynatrace Values From State
                // --------------------------------------
                setDynatraceData(roiID) {
                    const {dynatrace} = this.state;
					//console.log('TCL: setDynatraceData -> dynatrace', dynatrace)
                    // const {Usage_Footprint_1_week, Site_Usage, Transactions_per_minute_TPM, ROI_Realized_Date} = dynatrace[0];

                    let projId = null
                    if(this.props.requirementsDefinition.newProjectID) {
                        projId = this.props.projectID || this.props.requirementsDefinition.newProjectID;
                    }
                    else    
                        projId = undefined

                     
                    const requestID =  projId !== undefined ? projId.substr(projId.indexOf('D')+1,projId.length) : null;
                    const currentUser = window.getCurrentSPUser();

                    // Iterate Dynatrace Array
                    const data = dynatrace.map((dyna)=> {
                        let dynaObj = {
                            project_id: requestID || null,  
                            roi_real_id: roiID || null,
                            Usage_Footprint_1_week : dyna.Usage_Footprint_1_week, 
                            Site_Usage : dyna.Site_Usage, 
                            Transactions_per_minute_TPM : dyna.Transactions_per_minute_TPM, 
                            ROI_Realized_Date: dyna.ROI_Realized_Date,
                            Created_by : currentUser.userEmail,
                        }

                        return dynaObj;
                    })

                    return data;
                }


                // --------------------------------------
                // Submit Form
                // --------------------------------------
                submitFormLocalData = (redirect) => {
                    const formData =  this.saveFormValues(null, null);

                    this.props.saveLocalRoiRealized(formData);

                    if(redirect) {
                        // Show Sucess Message 
                        this.createSuccessAlert('Data Saved Locally');
                        // Redirect User
                        // setTimeout(()=>{this.redirectUser();},700);
                    }
                
                }


                // --------------------------------------
                // Save NEW ROI
                // --------------------------------------
                saveNewROI = (projectID) => {
                    this.setState({sendingData : true})


                    const formData = this.saveFormValues(projectID, null);
                    this.props.saveLocalRoiRealized(formData);
                    this.props.saveROIRealizedDB(formData).then(()=>{
                        this.createSuccessAlert('Data Saved ');
                        // Redirect User
                        // Check If Action was Success
                        const newRoiRealizedID = this.props.roiRealized.newRoiRealizedID;
                        //console.log('TCL: submitFormDB -> newRoiRealizedID', newRoiRealizedID)


                        // Update Table, insert Dynatrace Data
                        const data =  this.setDynatraceData(newRoiRealizedID);
                        console.log("TCL: saveNewROI -> data", data)

                        let projId = projectID || this.props.requirementsDefinition.
                        this.props.saveDynatraceDB(data, projectID, newRoiRealizedID);
                        

                        // //console.log('TCL: submitFormDB -> newProject', newProjectID)
                        
                        this.setState({ Request_ID : newRoiRealizedID , sendingData : false})

                        this.createSuccessAlert('Data saved successfully ');
                        // setTimeout(()=>{this.redirectUser();},700);
                        
                    })
                    .catch((error)=> {
                        this.createErrorAlert('There was a problem saving the data, please try again ');
						//console.log('TCL: submitFormDB -> error', error)
                        
                    })
                }


                // --------------------------------------   
                // Save Values When Returning to Prev Step
                // --------------------------------------   
                submitFormLocalDataReturn = (event) => {
                    
                    // const formData = this.saveFormValues(null,null);

                    // this.props.saveLocalRoiRealized(formData);
                
                    //console.log('TCL: submitFormLocalData -> formData', formData)

                    this.redirectUserPrev();
                }



                //! --------------------------------------
                //! Submit Form to DB
                //! --------------------------------------
                submitFormDB = () => {

                    const {isPMO} = this.props;

                    // if(!this.props.requirementsDefinition.newProjectID)  {
                    //     this.createErrorAlertTop('You Have to Create First the Requirements Definition');
                    //     this.submitFormLocalData(false);
                    //     return;
                    // }


                    if(isPMO === true && !this.props.requirementsDefinition.newProjectID)  {
                        // this.createErrorAlertTop('You Have to Create First the Requirements Definition');
                        // this.submitFormLocalData(false);
    
                        this.saveOtherTabs(null, true);
                        
                        return;
                    }
                    else if(isPMO === false)
                        return;
                    
                    if(this.validateFormInputs() === false) {
                        this.createErrorAlertTop('Please Fill all the Required Fields');
                        return;
                    }


                    this.setState({sendingData : true})

                    // Check if is new ROI or updated

                    const {roiRealizedSaved, projectID} = this.props;
                    
                    this.saveNewROI(projectID)
                    this.saveOtherTabs(projectID);


                    // if(roiRealizedSaved) {
                        // const newRoiRealizedID = this.props.roiRealized.newRoiRealizedID
						// //console.log('TCL: submitFormDB -> newRoiRealizedID', newRoiRealizedID)
                    // }
                    // else{
                        // this.saveNewROI(projectID)
                    // }


                    // this.setState({sendingData : true})
                    // const formData = this.saveFormValues();
                    // this.props.saveLocalRoiRealized(formData);
                    // this.props.saveROIRealizedDB(formData).then(()=>{
                    //     this.createSuccessAlert('Data Saved ');
                    //     // Redirect User
                    //     // Check If Action was Success
                    //     const newRoiRealizedID = this.props.roiRealized.newRoiRealizedID;
                    //     //console.log('TCL: submitFormDB -> newRoiRealizedID', newRoiRealizedID)


                    //     // Update Table, insert Dynatrace Data
                    //     const data =  this.setDynatraceData(newRoiRealizedID);

                    //     this.props.saveDynatraceDB(data);
                        

                    //     // //console.log('TCL: submitFormDB -> newProject', newProjectID)
                        
                    //     this.setState({ Request_ID : newRoiRealizedID , sendingData : false})
                    //     setTimeout(()=>{this.redirectUser();},700);
                        
                    // })
                    // .catch((error)=> {
                    //     this.createErrorAlert('There was a problem saving the data, please try again ');
					// 	//console.log('TCL: submitFormDB -> error', error)
                        
                    // })
                }


                // !--------------------------------------
                // ! Save Other Tabs
                // !--------------------------------------
                saveOtherTabs = async (projectID, saveROI =  false) => {
                    // this.props.businessInformation

                    console.log("TCL: saveOtherTabs -> this.props", this.props)
                    console.log("TCL: saveOtherTabs -> this.props.businessInformation", this.props.businessInformation)

                    
                    


                    // ? If theres on Project ID, save first Req, then the others
                    if(projectID === null || projectID === undefined) {
                        // ? Save Business Information
                        if( !isEmpty(this.props.requirementsDefinition) ) {
                            this.props.saveRequirementsDB(this.props.requirementsDefinition).then((data)=>{
                                console.log("TCL: TechnicalEvaluation -> saveOtherTabs -> data", data)

                                // ? Create Folder Structure and Upload Files
                                const projectID = this.props.requirementsDefinition.newProjectID;

                                // Remove the GSD from the ID if theres any
                                let id = projectID.indexOf('D') >= 0  ? projectID.substr(projectID.indexOf('D')+1,projectID.length) : projectID;
                                let reqFolderURL = `${projectID}/RequirementsDefinition`;
                                let pmoFolderURL = `${projectID}/PMO`;


                                //! Create Requirements  Folder

                                    window.createFolderStructure('intakeFiles' , reqFolderURL, ()=> {
        
                                        
        
                                        
        
                                        this.uploadReqFiles(projectID, reqFolderURL);
                                        
        
                                        // this.createSuccessAlert('SP Folder Created');
                                        this.createSuccessAlert(`Data Saved,Project ID : ${projectID}`);
        
        
                                        // this.setState({ Request_ID : projectID , sendingData : false})
                                        
                                    }, 
                                        () => {
                                            this.createErrorAlert('There was a problem creating the Requirements Definition Folder, please try again ');
                                            //console.log('fail react')
                                    });
        
                                //! Creaate PMO Folder
                                    window.createFolderStructure('intakeFiles' , pmoFolderURL, ()=> {
                                            //console.log('PMO Creataed')
                                          // //? setTimeout(()=>{this.redirectUser();},700);
                                        }, 
                                            () => {
                                                this.createErrorAlert('There was a problem creating the PMO Folder, please try again ');
                                                //console.log('fail react')
                                        });

                                // ! Save Other Tabs


                                    // ? IF Roi Realized is not created, save it as well

                                    if(saveROI === true) {
                                        const formData =  this.saveFormValues(id);
                                        this.props.saveLocalRoiRealized(formData)
                                         // ? Save Roi Realized
                                        if(!isEmpty(this.props.roiRealized)) {
                                            // ? Look For Roi Relized Data
                                            if(this.props.roiRealized.roiRealized) {
                                            
                                                if(this.props.roiRealized.roiRealized.roi_real_id) {
                                                    this.props.updateROIRealizedDB(this.props.roiRealized)
                                                }
                                                else if(!isEmpty(this.props.roiRealized)){

                                                    // ? Save New ROI
                                                    this.props.saveROIRealizedDB(this.props.roiRealized, id).then((data)=>{
                                                        console.log("TCL: saveOtherTabs -> data", data)
                                                        console.log("TCL: saveOtherTabs -> this.props.roiRealized", this.props.roiRealized)

                                                        // ? Get New ROI ID
                                                        let newRoiRealizedID = this.props.roiRealized.newRoiRealizedID;
                                                    
                                                    if(!isEmpty(this.props.roiRealized.dynatrace))   
                                                        this.props.saveDynatraceDB(this.props.roiRealized.dynatrace, id, newRoiRealizedID)


                                                    }).catch((error)=> {
                                                        console.log("TCL: saveNewROI -> error", error)
                                                        this.createErrorAlert('There was a problem saving the data, please try again ');
                                                        
                                                        
                                                    })
                                                
                                                }
                                            
                                            }

                                        }
                        
                                    }


                                    // ? Save Tehnical Evaluation
                                    if(!isEmpty(this.props.technicalEvaluation)) {
                                        if(this.props.technicalEvaluation.tech_eval_id) {
                                            this.props.updateTechnicalDB(this.props.technicalEvaluation)
                                        }
                                        else
                                        this.props.saveTechnicalDB(this.props.technicalEvaluation, id)
                                    }

                                                
                                    // ? Save Business Information
                                    if( !isEmpty(this.props.businessInformation) ) {
                                        console.log("TCL: saveOtherTabs -> this.props.businessInformation", this.props.businessInformation)
                                        if(this.props.businessInformation.buss_info_id)
                                            this.props.updateBusinesInformationDB(this.props.businessInformation)
                                        else
                                            this.props.saveBusinesInformationDB(this.props.businessInformation, id)
                                    }
                                

                                    // ? Save PMO Evaluation
                                    if(!isEmpty(this.props.pmoEvaluation)) {
                                        if(this.props.pmoEvaluation.pmo_eval_id) {
                                            this.props.updatePMOEvaluation(this.props.pmoEvaluation)
                                        }
                                        else
                                            this.props.savePMOEvaluationDB(this.props.pmoEvaluation, id)
                                    }



                                  



                                    this.setState({sendingData : false})
                                    this.createSuccessAlert('All Tabs were saved')
                                    // this.redirectUser('pmo-evaluation');

                            })
                            .catch((error)=> {
                                console.log("TCL: TechnicalEvaluation -> saveOtherTabs -> error", error)
                                this.createErrorAlert('There was a problem saving the data, please try again ');
                                
                                this.setState({sendingData : false})
                            })
                        }
                    }
                    

                    else {
                        
                    
                        let id = projectID.indexOf('D') >= 0  ? projectID.substr(projectID.indexOf('D')+1,projectID.length) : projectID;


                        // let promises = []

                        // ? Save Business Information
                        if( !isEmpty(this.props.requirementsDefinition) ) {
                            console.log("TCL: saveOtherTabs -> this.props.businessInformation", this.props.businessInformation)

                            // this.validateEmptyRequirements();

                            if(this.props.requirementsDefinition.newProjectID)
                                this.props.updateRequirementsDB(this.props.requirementsDefinition)
                            else
                                this.props.saveRequirementsDB(this.props.requirementsDefinition)
                        }

                        // ? Save Business Information
                        if( !isEmpty(this.props.businessInformation) ) {
                            console.log("TCL: saveOtherTabs -> this.props.businessInformation", this.props.businessInformation)
                            if(this.props.businessInformation.buss_info_id)
                                this.props.updateBusinesInformationDB(this.props.businessInformation)
                            else
                                this.props.saveBusinesInformationDB(this.props.businessInformation, id)
                        }
                            

                        // ? Save PMO Evaluation
                        if(!isEmpty(this.props.pmoEvaluation)) {
                            if(this.props.pmoEvaluation.pmo_eval_id) {
                            this.props.updatePMOEvaluation(this.props.pmoEvaluation)
                            }
                            else
                            this.props.savePMOEvaluationDB(this.props.pmoEvaluation, id)
                        }



                        // ? Save Roi Realized
                        if(!isEmpty(this.props.roiRealized)) {
                            // ? Look For Roi Relized Data
                            if(this.props.roiRealized.roiRealized) {
                                
                                if(this.props.roiRealized.roiRealized.roi_real_id) {
                                    this.props.updateROIRealizedDB(this.props.roiRealized)
                                }
                                else {
                                    // ? Save New ROI
                                    this.props.saveROIRealizedDB(this.props.roiRealized, id).then((data)=>{
                                        console.log("TCL: saveOtherTabs -> data", data)
                                        console.log("TCL: saveOtherTabs -> this.props.roiRealized", this.props.roiRealized)
                                        // ? Get New ROI ID
                                        let newRoiRealizedID = this.props.roiRealized.newRoiRealizedID;
                                        
                                        if(this.props.roiRealized.dynatrace)   
                                            this.props.saveDynatraceDB(this.props.roiRealized.dynatrace, id, newRoiRealizedID)


                                    }).catch((error)=> {
                                        console.log("TCL: saveNewROI -> error", error)
                                        this.createErrorAlert('There was a problem saving the data, please try again ');
                                        
                                        
                                    })
                                    
                                }
                                
                            }

                        


                        }

                    



                    }

                    this.setState({sendingData : false})
                    
                    // this.redirectUser();

                    // this.resetState();
                    
                }


                // --------------------------------------
                // Reset State
                // If PMO, DOnt
                // Normal User, reset Req && Bus
                // --------------------------------------
                resetState() {
                    const {isPMO} = this.props;
                    if(isPMO === false) {
                        this.props.resetRequirementsState(); 
                        this.props.resetBusinessState();
                        this.props.resetTechnicalState();
                        this.props.resetPMOEvaluationState();
                        this.props.resetROIRealizedState();
                        // this.props.rset
                    }
                }

            // --------------------------------------
            // Redirect User
            // --------------------------------------
            redirectUser(newPath) {
                // const {isPMO} = this.props;
                // const step = '/intake-projects'
                // const {history} = this.props;
                // const path = '/sites/gsd/intake_process/IntakeProcess/ProjectIntake.aspx';
                // history.push(`${path}/${step}`);

                if(newPath) {
                    
                    const path = '/sites/gsd/intake_process/IntakeProcess/ProjectIntake.aspx';
                    this.props.history.push(`${path}/${newPath}`);
                }

                // this.resetState();

                

                // window.location.href = 'https://flextronics365.sharepoint.com/sites/gsd/intake_process/IntakeProcess/ProjectIntake.aspx/intake-projects';
            }

            // --------------------------------------
            // Redirect User Prev Page
            // --------------------------------------
            
            redirectUserPrev() {
                const {history} = this.props;
                const path = '/sites/gsd/intake_process/IntakeProcess/ProjectIntake.aspx';
                
                history.push(`${path}/add-project/pmo-evaluation`);
            }


            /* ==========================================================================
            ** Manage Files
            ** ========================================================================== */

                /**  --------------------------------------
                // Call SP Function to Upload File
                // @param {folderName}  GSD126
                // @param {folderToUpload} RequirementsDefinition
                // on Each Child of filesArary
                // --------------------------------------*/
                uploadReqFiles (folderName, foldertoUpload) {
                    this.setState({currentMessage : 'Saving Files'})
                    const filesArray = this.props.requirementsDefinition.Project_docs;
                    

                    const folderURL = `intakeFiles/${foldertoUpload}`;
                    let filesToUploadDBArray = [];
                    if(filesArray.length <= 0)
                        return;
                    
                    // Iterate Files
                    for(let file of filesArray) {
                        let saveFile = null
                        let fileURL = '';
                        
                        // //console.log('TCL: uploadFiles -> file', file)
                        // let fileURL = `sites/gsd/intake_process/IntakeProcess/${folderURL}/${file.name}`;
                        // window.uploadFilesToFolder(folderURL,file.name, file, filesArray.length);
                        
                        // filesToUploadDBArray.push(fileURL);


                        if(!file.name) 
                            saveFile =  this.createMockFile(file)
                        else
                            saveFile = file;
                    
                    // //console.log('TCL: uploadFiles -> file', file)
                        // Set File URL to Save on DB
                        if(saveFile.name.indexOf('sites/') >= 0) 
                            fileURL = saveFile.name
                        else
                            fileURL = `sites/gsd/intake_process/${folderURL}/${saveFile.name}`;


                        window.uploadFilesToFolder(folderURL, saveFile.name, saveFile, filesArray.length);

                        filesToUploadDBArray.push(fileURL);
                    }

                    

                    if(filesToUploadDBArray.length > 0)
                        this.saveFilesonDB(folderName, filesToUploadDBArray)
                }


                
                // --------------------------------------
                // Save Files on DB
                // --------------------------------------
                saveFilesonDB(projectID,filesToUploadDBArray ) {
					//console.log('TCL: saveFilesonDB -> projectID', projectID)
                    //console.log('TCL: saveFilesonDB -> filesToUploadDBArray', filesToUploadDBArray)
                    const id = this.props.requirementsDefinition.newProjectID
                    const requestID = id.substr(id.indexOf('D')+1,id.length);
                    const filesString = filesToUploadDBArray.join(',');
                    const currentUser = window.getCurrentSPUser();

                    // Loomk For Files on SP FOlder
                    this.props.saveProjectFiles(requestID, filesString, currentUser.userEmail).then((data)=>{
                        //console.log('TCL: saveFilesonDB -> data', data);
                        

                    })
                    .catch((error)=> {
						console.log('TCL: saveFilesonDB -> error', error)
                        
                    })
                }


                // --------------------------------------
                // Create Mock Document
                // --------------------------------------
                createMockFile(docName) {
                    let mockFile;
                    let documentArray = docName.split('.');
                    let fileExtension = this.getFileExtension(docName);
                    let fileNameArray = documentArray[0].split('/');
                    let fileName = fileNameArray[fileNameArray.length - 1]
                        
                    mockFile = new File([fileName], docName, { type: fileExtension });
                    return mockFile;
                }

                // --------------------------------------
                // Get Doc Name no Extension
                // --------------------------------------    
                getDocNameNoExtension(docName) {
                    let fileName;
                    let documentArray = docName.split('.');
                    if(documentArray.length > 2)
                    {
                        let fileNameArray = documentArray[2].split('/');
                            fileName = fileNameArray[fileNameArray.length - 1];
                    } 
                    else
                    {
                        let fileNameArray = documentArray[0].split('/');
                            fileName = fileNameArray[fileNameArray.length - 1];
                    }
                    
                    return fileName;

                }
                // --------------------------------------    
                // Get Doc Name no Extension
                // --------------------------------------    
                getFileExtension(docName) {
                    let fileExtension;
                    let documentArray = docName.split('.');
                    if(documentArray.length > 2)
                    {
                        let fileExtensionArray = documentArray[2].split('/');
                            fileExtension = fileExtensionArray[fileExtensionArray.length - 1];
                    } 
                    else
                        fileExtension = documentArray[1];
            
                    return fileExtension;

                }
            



        /* ==========================================================================
        ** Render Methods
        ** ========================================================================== */

            // --------------------------------------
            // Render Loader
            // --------------------------------------
            renderLoader (isTransparent) {
                const container = document.getElementsByClassName('int-formFieldsContainer')[0]
                const containerWidth = isTransparent ? container.clientWidth : null;
                const containerHeight = isTransparent ? container.clientHeight : null;
                return <div> <AppLoader customHeight = { containerHeight || 800} isTransparent = {isTransparent} customWidth = {containerWidth}/> </div>
            }

            
            /** --------------------------------------
            // Renders Section Title
            // @param {title}
            // @returns {COmponent}`
            // -------------------------------------- */
            renderHeaderSection(title) {
                if(title === "Dynatrace") {
                    return (
                        <SectionHeader title = {title}>
                            {/*<SingleButton  buttonText = {"Add"} onClick = {this.addDynatrace} />*/}
                            <button  onClick = {this.addDynatrace} className = "int-singleButton" type = "button"> Add </button>
                            {this.state.showDynatrace && <button  onClick = {this.removeDynatrace} className = "int-singleButton" type = "button"> Remove All </button>}

                        </SectionHeader>)
                    
                }
                else
                    return (<SectionHeader title = {title}/>)
            }

            // --------------------------------------
            // Render Form Fields
            // --------------------------------------
            renderFormFields(group, renderBorder, startPosition) {
                const formFieldsValues =  this.createFormStructure();
                const formData = formFieldsValues.filter((item) => { return item.group === group });
                
                
                return (
                    <FieldsGenerator 
                        fieldsData={formData} 
                        renderBorder={renderBorder} 
                        onChangeInputs = {this.onChangeInputs}
                        onChangeSelect = {this.onChangeSelect}
                        onDateChange = {this.onDateChange}
                        
                    />
                )
            }

            // --------------------------------------
            // Render Form Footer
            // --------------------------------------
            renderFormFooter() {
                return (
                    <FormFooter> 
                        <AppButton buttonText = {'Return'} buttonClass = {'cancelButton'} onClick = {this.submitFormLocalDataReturn}></AppButton>
                        <AppButton buttonText = {'Save'} buttonClass = {'saveButton'} onClick = {this.submitFormDB}></AppButton>
                    </FormFooter>
                )
            }

            // --------------------------------------
            // Show Error Message
            // --------------------------------------
            createErrorAlert = (message) => {
                
                Alert.error(message, {
                    position: 'top',
                    effect : 'slide',
                    timeout : 2000
                });
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
            // Show Sucess Message
            // --------------------------------------
            createSuccessAlert = (message) => {
                
                Alert.info(message, {
                    position: 'top',
                    effect : 'slide',
                    timeout : 2000
                
                });
            }

            // --------------------------------------
            // Create Alert With Confirmation Button
            // --------------------------------------
            // createSuccessAlertWithConfirmation = (message) =>{
            //     return (
            //         <div className={classNames} id={id} style={styles}>
            //             <div className='s-alert-box-inner'>
            //             {message}
            //             </div>
            //             <h3 className="customer">{customFields.customerName}</h3>
            //             <button className="customButton" onClick={this.redirectUser()}>Go to Home Page</button>
            //             <span className='s-alert-close' onClick={handleClose}></span>
            //         </div>
            //     )
            // }


            // --------------------------------------
            // Add Red Border to Control
            // --------------------------------------   
            addErrorStatus = (controlID)=> {
                const control = document.getElementById(controlID);
                control.classList.add('int-errorStatus');
            }


          
            // --------------------------------------
            // Remove Error Status to Control
            // --------------------------------------
            removeErrorStatus = (controlID)=> {
                const control = document.getElementById(controlID);
                control.classList.remove('int-errorStatus');
            }


            // --------------------------------------
            // Dynatrace Table
            // --------------------------------------
            renderDynatraceTable() {
                // const {Usage_Footprint_1_week, Site_Usage, Transactions_per_minute_TPM, ROI_Realized_Date} = this.state;
                const {dynatrace}  = this.state;
                if(dynatrace.length > 0) {
                        return (
                        <div className = "table-responsive-vertical " style = {{width:'100%', marginTop :' 15px'}}>
                            <table className = "int-datatable table table-hover table-mc-light-blue shadow-z-1">
                                <thead>
                                    <tr>
                                        <th style = {{padding: '10px 5px'}}> Site Usage </th>
                                        <th style = {{padding: '10px 5px'}}> Usage Footprint (1 week) </th>
                                        <th style = {{padding: '10px 5px'}}> Transactions per minute (TPM) </th>
                                        <th style = {{padding: '10px 5px'}}> ROI Realized Date </th>
                                        <th style = {{padding: '10px 5px'}}> Remove </th>
                                    </tr>
                                </thead>
                                    <tbody>
                                        {
                                            dynatrace && dynatrace.map((item)=> {
                                                return (
                                                    <tr className = "int-tableRow ">
                                                        <td style = {{padding: '10px 5px'}}>  {item.Site_Usage}  </td> 
                                                        <td style = {{padding: '10px 5px'}}> {item.Usage_Footprint_1_week}</td> 
                                                        <td style = {{padding: '10px 5px'}}> {item.Transactions_per_minute_TPM}</td> 
                                                        <td style = {{padding: '10px 5px'}}>  {moment(item.ROI_Realized_Date).format("DD/MM/YYYY")} </td> 
                                                        <td style = {{padding: '10px 5px'}}>  
                                                            <button type="button" className = "int-singleButtonDanger" onClick = {this.removeTableItem} id = {item.index}>Remove</button>  
                                                        </td>
                                                    </tr>
                                                )
                                            })
                                        }
                                    </tbody>
                            </table>

                        </div>
                    )
                }
                else
                    return null;
            }
    
            // --------------------------------------
            // Render Projects
            // --------------------------------------
            renderROIRealized() {
                const {sendingData, showDynatrace} = this.state;
                const {isPMO} = this.props;
                if (isPMO === false ) 
                return (<Redirect to={'/'}/>)
                const formContainer =  <form>
                                            <div className="int-container">
                                                <div className="int-row">
                                                    {this.renderHeaderSection("Benefits & Savings")}
                                                </div>
                                                

                                                <div className="int-fieldsSection">
                                                    <div className="int-row">
                                                        <div className="int-column ">
                                                            {this.renderFormFields("firstSection1", true)}
                                                        </div>

                                                        <div className="int-column ">
                                                            {this.renderFormFields("firstSection2", true)}
                                                        </div>

                                                        <div className="int-column ">
                                                            {this.renderFormFields("firstSection3", true)}
                                                        </div>

                                                    </div>

                                                    <div className="int-row">
                                                        <div className="int-double-column">
                                                            {this.renderFormFields("secondSection1", true)}
                                                        </div>

                                                        <div className="int-column">
                                                            {this.renderFormFields("secondSection2", true)}
                                                        </div>
                                                    </div>

                                                    <div className="int-row">
                                                        <div className="int-double-column">
                                                            {this.renderFormFields("thirdSection1", true)}
                                                        </div>
                                                    </div>

                                                    <div className="int-row">
                                                        <div className="int-double-column">
                                                            {this.renderFormFields("fourthSection1", true)}
                                                        </div>

                                                        <div className="int-column">
                                                            {this.renderFormFields("fourthSection2", true)}
                                                        </div>
                                                    </div>
                                                </div>


                                                <div className="int-row">
                                                    {this.renderHeaderSection("IT Cost (One Time Charge)")}
                                                </div>

                                                
                                                <div className="int-fieldsSection">

                                                    <div className="int-row">
                                                        <div className="int-column ">
                                                            {this.renderFormFields("fifthSection1", true)}
                                                        </div>

                                                        <div className="int-column ">
                                                            {this.renderFormFields("fifthSection2", true)}
                                                        </div>


                                                    </div>
                                                    
                                                    <div className="int-row">

                                                    
                                                        <div className="int-column ">
                                                            {this.renderFormFields("fifthSection3", true)}
                                                        </div>


                                                        <div className="int-column ">
                                                            {this.renderFormFields("sixthSection1", true)}
                                                        </div>

                                                        

                                                    </div>

                                        
                                                
                                                </div>


                                                <div className="int-row">
                                                        {this.renderHeaderSection("IT Recurring Costs")}
                                                </div>
                                            

                                                <div className="int-fieldsSection">
                                                    <div className="int-row">
                                                        <div className="int-double-column">
                                                            {this.renderFormFields("seventhSection1", true)}
                                                        </div>
                                                        

                                                        <div className="int-double-column">
                                                            {this.renderFormFields("seventhSection2", true)}
                                                        </div>
                                                    </div>
                                                

                                                    <div className="int-row">
                                                        <div className="int-double-column">
                                                            {this.renderFormFields("eigthSection1", true)}
                                                        </div>
                                                        

                                                        <div className="int-double-column">
                                                            {this.renderFormFields("eigthSection2", true)}
                                                        </div>
                                                    </div>
                                                

                                                </div>

                                                
                                            
                                                <div className="int-row">
                                                    {this.renderHeaderSection("Dynatrace")}
                                                    
                                                </div>
                                                {showDynatrace && 

                                                    <div className="int-fieldsSection">
                                                        <div className="int-row">
                                                            <div className="int-double-column ">
                                                                {this.renderFormFields("ninthSection1", true)}
                                                            </div>

                                                            <div className="int-double-column ">
                                                                {this.renderFormFields("ninthSection2", true)}
                                                            </div>

                                                        

                                                        </div>

                                                        <div className="int-row">

                                                            <div className="int-double-column ">
                                                                {this.renderFormFields("ninthSection3", true)}
                                                            </div>


                                                            <div className="int-double-column">
                                                                {this.renderFormFields("ninthSection4", true)}
                                                            </div>
                                                        </div>

                                                        <div className="int-row">
                                                            <button onClick = {this.saveDynatrace} className = "int-singleButton" type = "button">Save Values</button>
                                                        </div>

                                                        <div className="int-row">
                                                            {this.renderDynatraceTable()}
                                                        </div>

                                                    </div>
                                                }

                                            </div>
                                        </form>
                return (
                    <Fragment>
                    
                        <FormBody>
                            {sendingData && this.renderLoader(true)}
                            {formContainer}
                        </FormBody>
                    
                        {this.renderFormFooter()}
                    </Fragment>
                )
            }
            // --------------------------------------
            // Render Component
            // --------------------------------------
            render() {
                return this.renderROIRealized();
            }
    }
// -------------------------------------- 
// Define PropTypes 
// -------------------------------------- 
    ROIRealized.propTypes = {
        props: PropTypes
    };

/* ==========================================================================
** Redux Functions
** ========================================================================== */
    // const mapStateToProps = (state) => {
    //     return {
    //         roiRealized : state.roiRealized,
    //         projectID : state.requirementsDefinition.newProjectID,
    //         pmos : state.sharepoint.pmos,
    //         isPMO : state.sharepoint.isPMO,
    //         roiRealizedSaved : state.roiRealized.roiRealizedSaved,
    //         requirementsDefinition : state.requirementsDefinition,
    //         businessInformation : state.businessInformation,
    //         technicalEvaluation : state.technicalEvaluation,
    //         pmoEvaluation : state.pmoEvaluation,
    //     }
    // }



// --------------------------------------
// Export Component
// --------------------------------------
    export default (ROIRealized);
    // export default compose(withRouter, connect (mapStateToProps, {
    //                                                                 saveLocalRoiRealized, 
    //                                                                 saveROIRealizedDB, 
    //                                                                 saveDynatraceDB, 
    //                                                                 updateROIRealizedDB, 
    //                                                                 saveProjectFiles,
    //                                                                 resetRequirementsState,
    //                                                                 resetBusinessState, 
    //                                                                 resetTechnicalState, 
    //                                                                 resetPMOEvaluationState, 
    //                                                                 resetROIRealizedState,
    //                                                                 saveRequirementsDB,
    //                                                                 updateRequirementsDB,
    //                                                                 updateBusinesInformationDB,
    //                                                                 saveBusinesInformationDB,
    //                                                                 updateTechnicalDB,
    //                                                                 saveTechnicalDB,
    //                                                                 savePMOEvaluationDB,
    //                                                                 updatePMOEvaluation,
    //                                                             })) (ROIRealized);



    