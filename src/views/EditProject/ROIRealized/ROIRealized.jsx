/* ==========================================================================
** Form Step 5  ROI Realized Edit Project
** 30/01/2019
** Alan Medina Silva
** ========================================================================== */

// --------------------------------------
// Get Dependences
// --------------------------------------
    import React, { Component, Fragment } from 'react';
    import { FieldsGenerator, AppLoader, SectionHeader, FormBody, FormFooter, AppButton } from '../../../components';
    import { withRouter } from 'react-router';
    import {Redirect} from 'react-router-dom';
    import { isEqual , isEmpty} from 'lodash';
    import PropTypes from 'prop-types';
    import Alert from 'react-s-alert';
    import 'react-s-alert/dist/s-alert-default.css';
    import 'react-s-alert/dist/s-alert-css-effects/slide.css';
    import moment from "moment";

    import { 
        saveRequirementsDB, 
        saveBusinesInformationDB, 
        saveTechnicalDB,
        savePMOEvaluationDB,
        saveROIRealizedDB, 
        saveDynatraceDB,
        updateRequirementsDB,
        updateBusinesInformationDB,
        updateTechnicalDB,
        updatePMOEvaluation,
        updateROIRealizedDB
    } from '../../../actions';


    const currentUser =  {userName : 'Alan Medina', userEmail : 'alan.medina@flex.com'}


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

                console.log("TCL: constructor -> props.projectIntake.roiRealized.Implementation_Date", props.projectIntake.roiRealized.Implementation_Date)
                this.state = {
                    isLoaded: false,
                    requestID : 0,
                    responsiveWidth : window.innerWidth,
                    sendingData : false,
                    roi_real_id : props.projectIntake.roiRealized.roi_real_id || null,
                    Implementation_Date : props.projectIntake.roiRealized.Implementation_Date ||  moment(),
                    Implementation_Date_Moment : moment(props.projectIntake.roiRealized.Implementation_Date) || moment(),
                    
                    FTE_Saved_per_year : props.projectIntake.roiRealized.FTE_Saved_per_year,
                    Hours_saved_per_year : props.projectIntake.roiRealized.Hours_saved_per_year,
                    Compliance_Ris_cost_that_was_avoided_by_this_application : props.projectIntake.roiRealized.Compliance_Ris_cost_that_was_avoided_by_this_application,
                    Risk_Avoidance : props.projectIntake.roiRealized.Risk_Avoidance,
                    Savings_from_Retirement_of_Legacy_application_in_hours_per_year_by_Maintenance_Team : props.projectIntake.roiRealized.Savings_from_Retirement_of_Legacy_application_in_hours_per_year_by_Maintenance_Team,
                    Legacy_System_Infra_and_License_Fee_savings_per_year : props.projectIntake.roiRealized.Legacy_System_Infra_and_License_Fee_savings_per_year,
                    Other_Savings : props.projectIntake.roiRealized.Other_Savings,
                    Design_Developmen_Testing_Effort_hours : props.projectIntake.roiRealized.Design_Developmen_Testing_Effort_hours,
                    Travel_TE : props.projectIntake.roiRealized.Travel_TE,
                    Consulting : props.projectIntake.roiRealized.Consulting_roi,
                    Training : props.projectIntake.roiRealized.Training,
                    Licenses_Cost_per_year : props.projectIntake.roiRealized.Licenses_Cost_per_year,
                    Hardware_leasing : props.projectIntake.roiRealized.Hardware_leasing,
                    Maintenance_Hardware_hours_per_year : props.projectIntake.roiRealized.Maintenance_Hardware_hours_per_year,
                    Maintenance_Salaries_hours_per_year : props.projectIntake.roiRealized.Maintenance_Salaries_hours_per_year,
                    Site_Usage : props.projectIntake.roiRealized.Site_Usage,
                    Usage_Footprint_1_week : props.projectIntake.roiRealized.Usage_Footprint_1_week,
                    Transactions_per_minute_TPM : props.projectIntake.roiRealized.Transactions_per_minute_TPM,
                    ROI_Realized_Date_Moment : moment(),
                    Site_UsageRows : [],
                    Usage_FootprintRows : [],
                    dynatrace : props.projectIntake.roiRealized.dynatrace || [],
                    showDynatrace : props.projectIntake.roiRealized.showDynatrace || false,
                    keepState : false,
                    isSavedOnDB : false
                }
                this.onChangeSelect =  this.onChangeSelect.bind(this);
                this.onDateChange =  this.onDateChange.bind(this);
                this.formFields =  this.createFormStructure();
            }



            // --------------------------------------
            // Create Form Fields to be rendered
            // --------------------------------------
           

            componentDidMount() {
                
                console.log("TCL: componentDidMount -> this.state", this.state)
                
                console.log("TCL: componentDidMount -> this.props", this.props)

                let implementationDate = this.props.projectIntake.roiRealized.Implementation_Date || moment();
                let implementationDateObj = this.props.projectIntake.roiRealized.Implementation_Date !== null ? moment(this.props.projectIntake.roiRealized.Implementation_Date)  : moment()

                this.setState({
                    roi_real_id : this.props.projectIntake.roiRealized.roi_real_id || null,
                    Implementation_Date : implementationDate,
                    Implementation_Date_Moment :implementationDateObj,
                    FTE_Saved_per_year : this.props.projectIntake.roiRealized.FTE_Saved_per_year,
                    Hours_saved_per_year : this.props.projectIntake.roiRealized.Hours_saved_per_year,
                    Compliance_Ris_cost_that_was_avoided_by_this_application : this.props.projectIntake.roiRealized.Compliance_Ris_cost_that_was_avoided_by_this_application,
                    Risk_Avoidance : this.props.projectIntake.roiRealized.Risk_Avoidance,
                    Savings_from_Retirement_of_Legacy_application_in_hours_per_year_by_Maintenance_Team : this.props.projectIntake.roiRealized.Savings_from_Retirement_of_Legacy_application_in_hours_per_year_by_Maintenance_Team,
                    Legacy_System_Infra_and_License_Fee_savings_per_year : this.props.projectIntake.roiRealized.Legacy_System_Infra_and_License_Fee_savings_per_year,
                    Other_Savings : this.props.projectIntake.roiRealized.Other_Savings,
                    Design_Developmen_Testing_Effort_hours : this.props.projectIntake.roiRealized.Design_Developmen_Testing_Effort_hours,
                    Travel_TE : this.props.projectIntake.roiRealized.Travel_TE,
                    Consulting : this.props.projectIntake.roiRealized.Consulting,
                    Training : this.props.projectIntake.roiRealized.Training,
                    Licenses_Cost_per_year : this.props.projectIntake.roiRealized.Licenses_Cost_per_year,
                    Hardware_leasing : this.props.projectIntake.roiRealized.Hardware_leasing,
                    Maintenance_Hardware_hours_per_year : this.props.projectIntake.roiRealized.Maintenance_Hardware_hours_per_year,
                    Maintenance_Salaries_hours_per_year : this.props.projectIntake.roiRealized.Maintenance_Salaries_hours_per_year,
                    Site_Usage : this.props.projectIntake.roiRealized.Site_Usage,
                    Usage_Footprint_1_week : this.props.projectIntake.roiRealized.Usage_Footprint_1_week,
                    Transactions_per_minute_TPM : this.props.projectIntake.roiRealized.Transactions_per_minute_TPM,
                    ROI_Realized_Date_Moment : moment(),
                    Site_UsageRows : [],
                    Usage_FootprintRows : [],
                    dynatrace : this.props.projectIntake.roiRealized.dynatrace || [],
                    showDynatrace : this.props.projectIntake.roiRealized.showDynatrace || false,
                    
                    
                    isLoaded : true
                })


                

            }



            // --------------------------------------
            // Save Form Values before the component
            // unloads by the menu navigation
            // --------------------------------------
            componentWillUnmount() {
                // let formData =  this.saveFormValues();
                // this.props.saveLocalRoiRealized(formData);
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


                try {
                    const formFields = [
                        {
                            "Field_Name": "Implementation Date",
                            "value": this.state.Implementation_Date_Moment,
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
                            "value": this.state.ROI_Realized_Date_Moment,
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

                catch(error) {
                    console.log("TCL: createFormStructure -> error", error)
                    
                }
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
            // Get ID from URL
            // --------------------------------------
            getProjectID() {
                const {projectID} = this.props.locationData.match.params;
                const requestID = projectID.substr(projectID.indexOf('D')+1,projectID.length);

                return requestID
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
                // const index = currentTarget.id


                const buttonIndex = target.id || currentTarget.id
                // const {current}
                const {dynatrace} = this.state;

                const newDynatrace = dynatrace.filter((item, index)=>{
					console.log('TCL: removeTableItem -> item', item)
                    // return item.index !== parseInt(index)

                    return index !== parseInt(buttonIndex)
                })
				//console.log('TCL: removeTableItem -> newDynatrace', newDynatrace)
                this.setState({
                    dynatrace : newDynatrace
                })
                // const newDynatrace = pullAllWith(dynatrace, [{'index' : index}], isEqual)
				// //console.log('TCL: removeTableItem -> newDynatrace', newDynatrace)
            }   


        


            // --------------------------------------
            // Convert String to Moment Object
            // --------------------------------------
            convertStringToMomentObject(date) {
                console.log("TCL: TechnicalEvaluation -> convertStringToMomentObject -> date", date)
                let dateObj = new Date(date);
                let momentObj = moment(dateObj);
                let dateFormat = moment(dateObj).format("DD/MM/YYYY");
				console.log('TCL: RequirementsDefinition -> convertStringToMomentObject -> dateFormat', dateFormat)
                console.log('TCL: RequirementsDefinition -> convertStringToMomentObject -> momentObj', momentObj)
                
                return momentObj;
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

                            // Check empty value for text input
                        if(fieldItem.Type === "Text" || fieldItem.Type === "Decimal" || fieldItem.Type === "Integer") {
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
                saveFormValues() {
                    //! const currentUser = window.getCurrentSPUser();
                    // const projId = this.props.projectID || this.props.requirementsDefinition.newProjectID;
                    // const requestID = projId.substr(projId.indexOf('D')+1,projId.length);

                    const requestID = this.getProjectID();
                    
                    
                    const formData = {
                        Project_ID : requestID,
                        roi_real_id : this.state.roi_real_id,
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
                        dynatrace : this.setDynatraceData(this.state.roi_real_id)
                    }

                    return formData;
                }

                // --------------------------------------
                // Get Dynatrace Values From State
                // --------------------------------------
                setDynatraceData(roiID) {
                    const {dynatrace} = this.state;
					

                    const requestID = this.getProjectID();
                    //! const currentUser = window.getCurrentSPUser();

                    // Iterate Dynatrace Array
                    const data = dynatrace.map((dyna)=> {
                        let dynaObj = {
                            project_id: requestID,  
                            roi_real_id: roiID,
                            Usage_Footprint_1_week : dyna.Usage_Footprint_1_week || dyna.usage_footprint, 
                            Site_Usage : dyna.Site_Usage || dyna.site_usage , 
                            Transactions_per_minute_TPM : dyna.Transactions_per_minute_TPM || dyna.tpm, 
                            ROI_Realized_Date: dyna.ROI_Realized_Date || dyna.roi_date,
                            Created_by : currentUser.userEmail,
                        }

                        return dynaObj;
                    })

                    return data;
                }


                // --------------------------------------
                // Submit Form
                // --------------------------------------
                submitFormLocalData = (exitFromMenu =  false) => {
                    
                    // if(this.validateFormInputs() === false) {
                    //     this.createErrorAlertTop('Please Fill all the Required Fields');
                    //     this.setState({checkForErrors: true})
                    //     return;
                    // }
    
                    this.renderLoader(true);
    
                    const formData = this.saveFormValues();

    
                    if(this.state.isSavedOnDB === true)
                        this.props.updateProjectIntakeValues('roiRealized',formData, null, true)
                    else
                        this.props.updateProjectIntakeValues('roiRealized',formData)
    
                    if(exitFromMenu !== true) {
                        this.createSuccessAlert('Data Saved Locally');
                        this.redirectUser();
                    }
                }

                // --------------------------------------
                // Save NEW ROI
                // --------------------------------------
                saveNewROI = () => {
                    // this.setState({sendingData : true})
                    const formData = this.saveFormValues();
                    this.props.saveLocalRoiRealized(formData);
                    this.props.saveROIRealizedDB(formData).then(()=>{
                        this.createSuccessAlert('Data Saved ');
                        // Redirect User
                        // Check If Action was Success
                        const newRoiRealizedID = this.props.roiRealized.newRoiRealizedID;
                        //console.log('TCL: submitFormDB -> newRoiRealizedID', newRoiRealizedID)


                        // Update Table, insert Dynatrace Data
                        const data =  this.setDynatraceData(newRoiRealizedID);

                        this.props.saveDynatraceDB(data);
                        

                        // //console.log('TCL: submitFormDB -> newProject', newProjectID)
                        
                        this.setState({ Request_ID : newRoiRealizedID , sendingData : false, })
                        // setTimeout(()=>{this.redirectUser();},700);
                        
                    })
                    .catch((error)=> {
                        console.log("TCL: saveNewROI -> error", error)
                        this.createErrorAlert('There was a problem saving the data, please try again ');
						
                        
                    })
                }


                // --------------------------------------
                // Update ROIRealized DB
                // --------------------------------------
                updateROIRealizedDB = ()=> {
                    const formData = this.saveFormValues();

                    updateROIRealizedDB(formData).then(()=>{

                        this.createSuccessAlert('Data Saved ');
                        // Redirect User
                        // Check If Action was Success

                        const newRoiRealizedID = this.props.projectIntake.roiRealized.roi_real_id;
                        console.log("TCL: updateROIRealizedDB -> newRoiRealizedID", newRoiRealizedID)
                        


                        // Update Table, insert Dynatrace Data
                        const data =  this.setDynatraceData(newRoiRealizedID);

                        saveDynatraceDB(data);


                        this.props.updateProjectIntakeValues('roiRealized',formData, null, true)
           
                        
                        // this.setState({ Request_ID : newRoiRealizedID , sendingData : false,  isSavedOnDB : true})
                        
                


                    })
                    .catch((error)=> {
                        this.createErrorAlert('There was a problem saving the data, please try again ');
						//console.log('TCL: submitFormDB -> error', error)
                        this.setState({sendingData : false},)
                    })
                }

                // !--------------------------------------
                // !Submit Form to DB
                // !--------------------------------------
                submitFormDB = () => {

                    this.setState({sendingData : true, })

                    // Check if is Update or New ROI

                    // const {roiRealized} =  this.props.loadedROIRealized;

                    // ? Check whetther to update or create new ROI 
                    const {roi_real_id} = this.props.projectIntake.roiRealized;
                    const {projectID} = this.props.locationData.match.params;

                    if(roi_real_id) {
                        // Update Current ROI
                        this.updateROIRealizedDB();
                    }
                    else {
                        // Create New ROI
                        this.saveNewROI();
                    }


                    this.saveOtherTabs(projectID);

                    this.setState({ sendingData : false})

                    

                }

                // !--------------------------------------
                // ! Save Other Tabs
                // !--------------------------------------
                saveOtherTabs = async (projectID) => {
                    // this.props.businessInformation

                    console.log("TCL: saveOtherTabs -> this.props", this.props)

                    const {requirementsDefinition, businessInformation, technicalEvaluation, pmoEvaluation, roiRealized} = this.props.projectIntake;
                    const id = projectID.indexOf('D') >= 0  ? projectID.substr(projectID.indexOf('D')+1,projectID.length) : projectID;

                    try {

                        
                        // ? Save Req Definition
                        if( !isEmpty(requirementsDefinition) && requirementsDefinition.SavedLocally === true) {
                            

                            // this.validateEmptyRequirements();

                            if(requirementsDefinition.Project_id) {
                                updateRequirementsDB(requirementsDefinition);
                                let reqFolderURL = `${requirementsDefinition.Request_ID}/RequirementsDefinition`;
                                this.uploadReqFiles(requirementsDefinition.Request_ID, reqFolderURL);
                            }
                                
                            else
                                saveRequirementsDB(requirementsDefinition)



                            this.props.updateProjectIntakeValues('requirements',requirementsDefinition, null, true)

                        }


                        // ? Save Business Information
                        if( !isEmpty(businessInformation) && businessInformation.SavedLocally === true) {

                            console.log("TCL: saveOtherTabs -> businessInformation", businessInformation)
                            
                            // businessInformation.Project_id = id;
                            
                            if(businessInformation.Buss_info_id)
                                updateBusinesInformationDB(businessInformation, id).then((newBusinesId) => {
                                    console.log("TCL: saveOtherTabs -> newBusinesId", newBusinesId)
                                    // businessInformation.Buss_info_id = newBusinesId
                                }).catch((error) => {console.log("TCL: saveOtherTabs -> error", error)})
                            else {
                                saveBusinesInformationDB(businessInformation, id).then((newBusinesId) => {
                                    console.log("TCL: saveOtherTabs -> newBusinesId", newBusinesId)
                                    businessInformation.Buss_info_id = newBusinesId
                                }).catch((error) => {console.log("TCL: saveOtherTabs -> error", error)})
                                
                            }  

                            // ? Update Props
                            this.props.updateProjectIntakeValues('business',businessInformation, null, true)
                                
                    
                            
                        }

                        // ? Save Tehnical Evaluation
                        if(!isEmpty(technicalEvaluation) && technicalEvaluation.SavedLocally === true) {
                            if(technicalEvaluation.Tech_eval_id) {
                                updateTechnicalDB(technicalEvaluation)
                            }
                            else
                                saveTechnicalDB(technicalEvaluation, id).then((newTechId) => {
                                    console.log("TCL: saveOtherTabs -> newTechId", newTechId)
                                    technicalEvaluation.Tech_eval_id = newTechId
                                }).catch((error) => {console.log("TCL: saveOtherTabs -> error", error)})

                            // ? Update Props
                            this.props.updateProjectIntakeValues('technical',technicalEvaluation, null, true)
                        }
                        

                     


                        // ? Save PMO Evaluation
                        if(!isEmpty(pmoEvaluation) && pmoEvaluation.SavedLocally === true) {
                            if(pmoEvaluation.Pmo_eval_id) {
                                updatePMOEvaluation(pmoEvaluation)
                            }
                            else
                                savePMOEvaluationDB(pmoEvaluation, id).then((newPmoId) => {
                                    console.log("TCL: saveOtherTabs -> newPmoId", newPmoId)
                                    pmoEvaluation.Pmo_eval_id = newPmoId
                                }).catch((error) => {console.log("TCL: saveOtherTabs -> error", error)})

                            // ? Update Props
                            this.props.updateProjectIntakeValues('pmoEval',pmoEvaluation, null, true)
                        }





                        console.log("TCL: pmoEvaluation", pmoEvaluation)
                        console.log("TCL: technicalEvaluation", technicalEvaluation)
                        console.log("TCL: businessInformation", businessInformation)

                    }   
                    catch(error) {
                        console.log("TCL: error", error)
                        this.createErrorAlert('An error ocurred while saving the data, please try again');
                        
                    }



                    
                }


                // --------------------------------------
                // Redirect User
                // --------------------------------------
                redirectUser() {
                    // const {isPMO} = this.props;
                    // const step = '/intake-projects'
                    // const {history} = this.props;
                    // const path = '/sites/gsd/intake_process/IntakeProcess/ProjectIntake.aspx';
                    // history.push(`${path}/${step}`);

                    window.location.href = 'https://flextronics365.sharepoint.com/sites/gsd/intake_process/IntakeProcess/ProjectIntake.aspx/intake-projects';
                }


                // --------------------------------------
                // Redirect User to Prev Step
                // --------------------------------------
                
                redirectUserPrev =() => {
                    const {history,location} = this.props.locationData;
                    //? const path = '/sites/gsd/intake_process/IntakeProcess/ProjectIntake.aspx';

                    const path = '/intake';

                    let pathArray = location.pathname.split('/');
                    let projectIndex = pathArray[pathArray.length - 2];
                    console.log("TCL: BusinessInformation -> redirectUserPrev -> projectIndex", projectIndex)
                    
                    history.push(`${path}/project/${projectIndex}/pmo-evaluation`);
                    
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
                    const id = this.props.requirementsDefinition.Project_id;
                    const requestID = id.indexOf('D') >= 0 ? id.substr(id.indexOf('D')+1,id.length) : id;
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
            // Window Resizing
            // --------------------------------------
            updateContainerDimensions = () => {
                let newWidth = window.innerWidth;
                this.setState({responsiveWidth : newWidth});
            }


            
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
                // const formFieldsValues =  this.formFields;
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
                        <AppButton buttonText = {'Return'} buttonClass = {'cancelButton'} onClick = {this.redirectUserPrev}></AppButton>
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
            // Diiffrent Names on DB and Local
            // Use ||
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
                                            dynatrace && dynatrace.map((item, index)=> {

                                                // {moment(item.ROI_Realized_Date).format("DD/MM/YYYY")  || moment(item.roi_date).format("DD/MM/YYYY") } </td> 
                                                let fDate = item.ROI_Realized_Date && (item.ROI_Realized_Date).format("DD/MM/YYYY")
                                                console.log("TCL: renderDynatraceTable -> fDate ROI_", fDate)
                                                let fDate2 = item.roi_date &&  moment(item.roi_date).format("DD/MM/YYYY")
                                                console.log("TCL: renderDynatraceTable -> fDate2 roi_", fDate2)

                                                // <td style = {{padding: '10px 5px'}}>  {moment(item.ROI_Realized_Date).format("DD/MM/YYYY")  || moment(item.roi_date).format("DD/MM/YYYY") } </td> 


                                                // Set Roi Trace Date
                                                let roiTraceDate = null
                                                if(item.ROI_Realized_Date)
                                                    roiTraceDate = (item.ROI_Realized_Date).format("DD/MM/YYYY")
                                                else if (item.roi_date)
                                                    roiTraceDate =  moment(item.roi_date).format("DD/MM/YYYY")
                                                
                                                if(item.site_usage !== "" ) {
                                                    return (
                                                        <tr className = "int-tableRow ">
                                                            <td style = {{padding: '10px 5px'}}>  {item.Site_Usage || item.site_usage }  </td> 
                                                            <td style = {{padding: '10px 5px'}}> {item.Usage_Footprint_1_week || item.usage_footprint}</td> 
                                                            <td style = {{padding: '10px 5px'}}> {item.Transactions_per_minute_TPM || item.tpm}</td> 
                                                            <td style = {{padding: '10px 5px'}}>  {roiTraceDate} </td> 
                                                            <td style = {{padding: '10px 5px'}}>  
                                                                <button type="button" className = "int-singleButtonDanger" onClick = {this.removeTableItem} id = {item.index || index}>Remove</button>  
                                                            </td>
                                                        </tr>
                                                    )
                                                }
                                                else
                                                    return null
                                               
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
                // if (isPMO === false ) 
                // return (<Redirect to={'/'}/>)


                // if (!this.props.projectIntake.requirementsDefinition || !this.props.isPMO)  {
                //     let currentProject = this.props.locationData.match.params.projectID
                //     window.location.href = `sites/gsd/intake_process/IntakeProcess/ProjectIntake.aspx/project/${currentProject}/requirement-definition`
                //     return null;
                //     // return (<Redirect to={`sites/gsd/intake_process/IntakeProcess/ProjectIntake.aspx/project/${currentProject}/requirement-definition`}/>)
                // }

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
                const {isLoaded} = this.state;
                return isLoaded ? this.renderROIRealized() : this.renderLoader();
            }
    }
// -------------------------------------- 
// Define PropTypes 
// -------------------------------------- 
    ROIRealized.propTypes = {
        props: PropTypes
    };



// --------------------------------------
// Export Component
// --------------------------------------
    export default  (ROIRealized);
   