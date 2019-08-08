/* ==========================================================================
** Form Setp 3 Component View Add Project
** 29/01/2019
** Alan Medina Silva
** ========================================================================== */


// --------------------------------------
// Get Dependences
// --------------------------------------
    import React, { Component, Fragment } from 'react';
    import { withRouter } from 'react-router';
    import {Redirect} from 'react-router-dom';
    import { FieldsGenerator, AppLoader, SectionHeader, FormBody, FormFooter, AppButton } from '../../../components';
    import { isEmpty } from 'lodash';
    import PropTypes from 'prop-types';
    import Alert from 'react-s-alert';
    import 'react-s-alert/dist/s-alert-default.css';
    import 'react-s-alert/dist/s-alert-css-effects/slide.css';
    import moment from 'moment';

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

    const currentUser = {userEmail : 'alan.medina@flex.com', userName : 'alan medina'};


// --------------------------------------
// Create Component Class
// --------------------------------------
    class TechnicalEvaluation extends Component {

        /* ==========================================================================
        ** Component Setup
        ** ========================================================================== */
    
            // --------------------------------------
            // Constructor
            // --------------------------------------
            constructor(props) {
                super(props);
                this.state = {
                    isLoaded: true,
                    responsiveWidth : window.innerWidth,
                    Delivery_Team : props.projectIntake.technicalEvaluation.Delivery_Team || {label : "Select a Delivery Team", value : ''},
                    Platform_type : props.projectIntake.technicalEvaluation.Platform_type || {label : "Select Plataform Type", value : ''},
                    Applications_involved : props.projectIntake.technicalEvaluation.Applications_involved || {label : "Select Applications Involved", value : ''},
                    Technology : props.projectIntake.technicalEvaluation.Technology || [],
                    IT_Groups_Required : props.projectIntake.technicalEvaluation.IT_Groups_Required || {label : "Select IT Groups Required", value : ''},
                    Estimated_Effort : props.projectIntake.technicalEvaluation.Estimated_Effort || {label : "Select Estimated Effort", value : ''},
                    Project_Team_Size : props.projectIntake.technicalEvaluation.Project_Team_Size || {label : "Select Size", value : ''},
                    Project_Manager : props.projectIntake.technicalEvaluation.Project_Manager || {label : "Project_Manager", value : ''},
                    Target_Start_Date :props.projectIntake.technicalEvaluation.Target_Start_Date || null,
                    Target_Go_Live_Date :props.projectIntake.technicalEvaluation.Target_Go_Live_Date || null,
                    IT_FTE_required :props.projectIntake.technicalEvaluation.IT_FTE_required || "",
                    Approver : props.projectIntake.technicalEvaluation.Approver || {},
                    Approval_Date :props.projectIntake.technicalEvaluation.Approval_Date || null,
                    Justification_ROI :props.projectIntake.technicalEvaluation.Justification_ROI || "",
                    Design_Development_Testing_Effort :props.projectIntake.technicalEvaluation.Design_Development_Testing_Effort || "",
                    Travel_TE :props.projectIntake.technicalEvaluation.Travel_TE || "",
                    Consulting :props.projectIntake.technicalEvaluation.Consulting || "",
                    Training :props.projectIntake.technicalEvaluation.Training || "",
                    Licenses_Cost_per_year :props.projectIntake.technicalEvaluation.Licenses_Cost_per_year || "",
                    Hardware_leasing :props.projectIntake.technicalEvaluation.Hardware_leasing || "",
                    Maintenance_Hardware_hours_per_year :props.projectIntake.technicalEvaluation.Maintenance_Hardware_hours_per_year || "",
                    Maintenance_Salaries_hours_per_year :props.projectIntake.technicalEvaluation.Maintenance_Salaries_hours_per_year || "",
                    No_of_Sites :props.projectIntake.technicalEvaluation.No_of_Sites || "",
                    No_of_Active_users :props.projectIntake.technicalEvaluation.No_of_Active_users || "",
                    conditionalApplications : [],
                    checkForErrors: false
                }
                this.onChangeSelect =  this.onChangeSelect.bind(this);
                this.onDateChange =  this.onDateChange.bind(this);
                this.formFields =  this.createFormStructure();
            }

            // --------------------------------------
            // Init People Pickers
            // --------------------------------------
            componentDidMount() {
                const pickersWidth = '175px';
                window.addEventListener("resize", this.updateContainerDimensions);
                //! setTimeout(() => {
                //!     window.initializePeoplePicker('peoplePickerApprover',pickersWidth );
                //!     window.initializePeoplePicker('peoplePickerProject_Manager', pickersWidth);
                //!     this.fillPickers();
                //! }, 0);

                this.setState({
                    isLoaded : true
                })
        
            }


            // --------------------------------------
            // Save Form Values before the component
            // unloads by the menu navigation
            // --------------------------------------
            componentWillUnmount() {
                // let formData =  this.saveFormValues();
                // this.submitFormLocalData(true)
                // this.props.saveLocalTechnical(formData);
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
                        "Field_Name": "Delivery Team",
                        "Field_State_Name": "Delivery_Team",
                        "value": this.state.Delivery_Team,
                        "group": "firstHalf1",
                        "Mandatory": true,
                        "Enabled": true,
                        "Sequence": "41",
                        "Type": "Combo",
                        "General_Value": [
                            {
                                "label": "1- Platform Solution - Ben Web´s Org",
                                "value": "Platform Solution - Ben Web´s Org"
                            },
                            {
                                "label": "2.- Global Ops - Sujit Gopinath´s Org",
                                "value": "Global Ops - Sujit Gopinath´s Org"
                            },
                            {
                                "label": "3.- GSS & Sales & Quality - Sapan Parikh´s Org",
                                "value": "GSS & Sales & Quality - Sapan Parikh´s Org"
                            },
                            {
                                "label": "4.- D&E, WFD and Pulse  Aristoteles Portillo´s Org",
                                "value": "D&E, WFD and Pulse  Aristoteles Portillo´s Org"
                            }
                        ],
                        "columns":  this.state.responsiveWidth <=1440 ? 1 : 2,
                        "hasToolTip": true,
                        "wideControl": true,
                        "toolTipText": "Pick from the drop-down, who will handle this project"
                    },
                    {
                        "Field_Name": "Platform type",
                        "Field_State_Name": "Platform_type",
                        "value": this.state.Platform_type,
                        "group": "firstHalf2",
                        "Mandatory": true,
                        "Enabled": true,
                        "Sequence": "42",
                        "Type": "Combo",
                        "General_Value": [
                            {
                                "label": "1.- Web Based On-Premise",
                                "value": "Web Based On-Premise"
                            },
                            {
                                "label": "2.- Web Base On-Cloud",
                                "value": "Web Base On-Cloud"
                            },
                            {
                                "label": "3.- Mobile App",
                                "value": "Mobile App"
                            },
                            {
                                "label": "4.- Web & Mobile",
                                "value": "Web & Mobile"
                            },
                            {
                                "label": "5.- Reports and Dashboards",
                                "value": "Reports and Dashboards"
                            },
                            {
                                "label": "6.- Desktop",
                                "value": "Desktop"
                            },
                            {
                                "label": "7.- Integration",
                                "value": "Integration"
                            },
                            {
                                "label": "8.- Desktop Application",
                                "value": "Desktop Application"
                            }
                        ],
                        "columns":  this.state.responsiveWidth <=1440 ? 1 : 2,
                        "hasToolTip": true,
                        "wideControl": true,
                        "toolTipText": "Pick from the drop-down, technology/Platform",
                        "allowFilter" : true
                    },
                    {
                        "Field_Name": "Applications involved",
                        "Field_State_Name": "Applications_involved",
                        "value": this.state.Applications_involved,
                        "group": "first3column1",
                        "Mandatory": true,
                        "Enabled": true,
                        "Sequence": "43",
                        "Type": "Combo",
                        "General_Value": this.state.conditionalApplications,
                        "columns": 2,
                        "hasToolTip": true,
                        "wideControl": true,
                        "toolTipText": "Pick from the drop-down, applications involved",
                        "allowFilter" : true
                    },
                    {
                        "Field_Name": "Technology",
                        "Field_State_Name": "Technology",
                        "value": this.state.Technology,
                        "group": "first3column2",
                        "Mandatory": true,
                        "Enabled": true,
                        "Sequence": "44",
                        "Type": "DynamicField",
                        "General_Value": this.state.conditionalTechnologies,
                        "columns": 2,
                        "hasToolTip": true,
                        "toolTipText": "Pick from the drop-down, technology/Platform",
                        "wideControl": true,
                        "allowFilter" : true
                    },
                    {
                        "Field_Name": "IT Groups Required",
                        "Field_State_Name": "IT_Groups_Required",
                        "value": this.state.IT_Groups_Required,
                        "group": "first3column3",
                        "Mandatory": true,
                        "Enabled": true,
                        "Sequence": "45",
                        "Type": "Combo",
                        "General_Value": this.state.conditionalIT_Groups_Required,
                        "columns": 2,
                        "hasToolTip": true,
                        "toolTipText": "Autopick from the drop-down",
                        "wideControl": true,
                        "allowFilter" : true
                    },
                    {
                        "Field_Name": "Estimated Effort",
                        "Field_State_Name": "Estimated_Effort",
                        "value": this.state.Estimated_Effort,
                        "group": "second3column1",
                        "Mandatory": true,
                        "Enabled": true,
                        "Sequence": "46",
                        "Type": "Combo",
                        "General_Value": [
                            // {
                            //     "label": "Select Effort",
                            //     "value": ""
                            // },
                            {
                                "label": "High",
                                "value": "High"
                            },
                            {
                                "label": "Medium",
                                "value": "Medium"
                            },
                            {
                                "label": "Low",
                                "value": "Low"
                            }
                        ],
                        // "columns": 2,
                        "columns" :  this.state.responsiveWidth <=1440 ? 1 : 2,
                        "hasToolTip": true,
                        "toolTipText": "Effort involved by the delivery team",
                        "wideControl": this.state.responsiveWidth <=1440 && true,
                    },
                    {
                        "Field_Name": "Project Team Size",
                        "Field_State_Name": "Project_Team_Size",
                        "value": this.state.Project_Team_Size,
                        "group": "second3column2",
                        "Mandatory": true,
                        "Enabled": true,
                        "Sequence": "47",
                        "Type": "Combo",
                        "General_Value": [
                            // {
                            //     "label": "Select Size",
                            //     "value": ""
                            // },
                            {
                                "label": "High",
                                "value": "High"
                            },
                            {
                                "label": "Medium",
                                "value": "Medium"
                            },
                            {
                                "label": "Low",
                                "value": "Low"
                            }
                        ],
                        // "columns": 2,
                        "columns" :  this.state.responsiveWidth <=1440 ? 1 : 2,
                        "hasToolTip": true,
                        "toolTipText": "Size of the project base on effort",
                        "wideControl": this.state.responsiveWidth <=1440 && true,
                    },
                    {
                        "Field_Name": "Approval Date",
                        "Field_State_Name": "Approval_Date",
                        "value": this.state.Approval_Date,
                        // "group": "fourth3column2",
                        "group": "second3column3",
                        "Mandatory": true,
                        "Enabled": true,
                        "Sequence": "48",
                        "Type": "Date",
                        "General_Value": "Date Picker",
                        // "columns": 2,
                        "columns" :  this.state.responsiveWidth <=1440 ? 1 : 2,
                        "hasToolTip": true,
                        "wideControl": this.state.responsiveWidth <=1440 && true,
                        "toolTipText": "Auto pick of Date & Time stamp from the system. It should follow standard time across locations"
                    },
                    {
                        "Field_Name": "Target Start Date",
                        "Field_State_Name": "Target_Start_Date",
                        "value": this.state.Target_Start_Date,
                        "group": "third3column1",
                        "Mandatory": true,
                        "Enabled": true,
                        "Sequence": "49",
                        "Type": "Date",
                        "General_Value": "Date Picker",
                        // "columns": 2,
                        "columns" :  this.state.responsiveWidth <=1440 ? 1 : 2,
                        "hasToolTip": true,
                        "wideControl": this.state.responsiveWidth <=1440 && true,
                        "toolTipText": "Project Start Date"
                    },
                    {
                        "Field_Name": "Target Go Live Date",
                        "Field_State_Name": "Target_Go_Live_Date",
                        "value": this.state.Target_Go_Live_Date,
                        "group": "third3column2",
                        "Mandatory": true,
                        "Enabled": true,
                        "Sequence": "50",
                        "Type": "Date",
                        "General_Value": "Date Picker",
                        // "columns": 2,
                        "columns" :  this.state.responsiveWidth <=1440 ? 1 : 2,
                        "hasToolTip": true,
                        "wideControl": this.state.responsiveWidth <=1440 && true,
                        "toolTipText": "Project Go Live Date"
                    },
                    {
                        "Field_Name": "IT FTE required",
                        "Field_State_Name": "IT_FTE_required",
                        "value": this.state.IT_FTE_required,
                        "group": "third3column3",
                        "Mandatory": true,
                        "Enabled": true,
                        "Sequence": "51",
                        "Type": "Integer",
                        "General_Value": "Numeric",
                        // "columns": 2,
                        "columns" :  this.state.responsiveWidth <=1440 ? 1 : 2,
                        "hasToolTip": true,
                        "toolTipText": "Number of FTEs involved with the project",
                        "wideControl": false
                    },
                    {
                        "Field_Name": "Approver",
                        "Field_State_Name": "Approver",
                        "value": this.state.Approver,
                        "group": "fourth3column1",
                        "Mandatory": true,
                        "Enabled": true,
                        "Sequence": "52",
                        "Type": "PeoplePicker",
                        "General_Value": [],
                        "columns": 1,
                        "hasToolTip": true,
                        "wideControl": true,
                        "toolTipText": "Approver name of the project"
                    },
                    {
                        "Field_Name": "Project Manager",
                        "Field_State_Name": "Project_Manager",
                        "value": this.state.Project_Manager,
                        "group": "fourth3column2",
                        // "group": "second3column3",
                        "Mandatory": true,
                        "Enabled": true,
                        "Sequence": "53",
                        "Type": "PeoplePicker",
                        "General_Value": [],
                        "columns": 1,
                        "hasToolTip": true,
                        "toolTipText": "Name of the project manager",
                        "wideControl": false
                    },
                   
                    {
                        "Field_Name": "Justification/ROI (reason why we took up this project)",
                        "Field_State_Name": "Justification_ROI",
                        "value": this.state.Justification_ROI,
                        "group": "fifth3column",
                        "Mandatory": true,
                        "Enabled": true,
                        "Sequence": "54",
                        "Type": "Text 150",
                        "max_Length": 150,
                        "General_Value": "Open Text",
                        "isTextArea": true,
                        "columns": 1,
                        "hasToolTip": true,
                        "wideControl": true,
                        "toolTipText": "Justification for acceptance of this project"
                    },
                    {
                        "Field_Name": "Design, Development & Testing Effort (hours)",
                        "Field_State_Name": "Design_Development_Testing_Effort",
                        "value": this.state.Design_Development_Testing_Effort,
                        "group": "sixth3column1",
                        "Mandatory": true,
                        "Enabled": true,
                        "Sequence": "55",
                        "Type": "Decimal",
                        "General_Value": "0",
                        "columns": 2,
                        "hasToolTip": true,
                        "toolTipText": "Hours",
                        "wideControl": false
                    },
                    {
                        "Field_Name": "Travel (T&E)",
                        "Field_State_Name": "Travel_TE",
                        "value": this.state.Travel_TE,
                        "group": "sixth3column2",
                        "Mandatory": false,
                        "Enabled": true,
                        "Sequence": "56",
                        "Type": "Decimal",
                        "General_Value": "$",
                        "columns": 2,
                        "hasToolTip": true,
                        "toolTipText": "Numbers",
                        "wideControl": false
                    },
                    {
                        "Field_Name": "Consulting",
                        "Field_State_Name": "Consulting",
                        "value": this.state.Consulting,
                        "group": "sixth3column3",
                        "Mandatory": false,
                        "Enabled": true,
                        "Sequence": "57",
                        "Type": "Decimal",
                        "General_Value": "$",
                        "columns": 2,
                        "hasToolTip": true,
                        "toolTipText": "Numbers",
                        "wideControl": false
                    },
                    {
                        "Field_Name": "Training",
                        "Field_State_Name": "Training",
                        "value": this.state.Training,
                        "group": "sixth3column4",
                        "Mandatory": false,
                        "Enabled": true,
                        "Sequence": "58",
                        "Type": "Decimal",
                        "General_Value": "$",
                        "columns": 2,
                        "hasToolTip": true,
                        "toolTipText": "Numbers",
                        "wideControl": false
                    },
                    {
                        "Field_Name": "Licenses Cost per year",
                        "Field_State_Name": "Licenses_Cost_per_year",
                        "value": this.state.Licenses_Cost_per_year,
                        "group": "twocolumn1",
                        "Mandatory": false,
                        "Enabled": true,
                        "Sequence": "59",
                        "Type": "Decimal",
                        "General_Value": "$",
                        "columns": 2,
                        "hasToolTip": true,
                        "toolTipText": "Numbers",
                        "wideControl": false
                    },
                    {
                        "Field_Name": "Hardware leasing",
                        "Field_State_Name": "Hardware_leasing",
                        "value": this.state.Hardware_leasing,
                        "group": "twocolumn2",
                        "Mandatory": false,
                        "Enabled": true,
                        "Sequence": "60",
                        "Type": "Decimal",
                        "General_Value": "$",
                        "columns": 2,
                        "hasToolTip": true,
                        "toolTipText": "Numbers",
                        "wideControl": false
                    },
                    {
                        "Field_Name": "Maintenance Hardware (hours per year)",
                        "Field_State_Name": "Maintenance_Hardware_hours_per_year",
                        "value": this.state.Maintenance_Hardware_hours_per_year,
                        "group": "twocolumn3",
                        "Mandatory": false,
                        "Enabled": true,
                        "Sequence": "61",
                        "Type": "Decimal",
                        "General_Value": "0",
                        "columns": 2,
                        "hasToolTip": true,
                        "toolTipText": "Hours",
                        "wideControl": false
                    },
                    {
                        "Field_Name": "Maintenance Salaries (hours per year)",
                        "Field_State_Name": "Maintenance_Salaries_hours_per_year",
                        "value": this.state.Maintenance_Salaries_hours_per_year,
                        "group": "twocolumn4",
                        "Mandatory": false,
                        "Enabled": true,
                        "Sequence": "62",
                        "Type": "Decimal",
                        "General_Value": "0",
                        "columns": 2,
                        "hasToolTip": true,
                        "toolTipText": "Hours",
                        "wideControl": false
                    },
                    {
                        "Field_Name": "No of Sites",
                        "Field_State_Name": "No_of_Sites",
                        "value": this.state.No_of_Sites,
                        "group": "two2column1",
                        "Mandatory": false,
                        "Enabled": true,
                        "Sequence": "63",
                        "Type": "Integer",
                        "General_Value": "?",
                        "columns": 2,
                        "hasToolTip": true,
                        "toolTipText": "Number of sites where already is implemented.",
                        "wideControl": false
                    },
                    {
                        "Field_Name": "No of Active users",
                        "Field_State_Name": "No_of_Active_users",
                        "value": this.state.No_of_Active_users,
                        "group": "two2column2",
                        "Mandatory": false,
                        "Enabled": true,
                        "Sequence": "64",
                        "Type": "Integer",
                        "General_Value": "?",
                        "columns": 2,
                        "hasToolTip": true,
                        "toolTipText": "Number of active users using system. ",
                        "wideControl": false
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
				
                this.setState({
                    [event.target.name]: event.target.value
                })
                
            }

            // --------------------------------------
            // Control Select Inputs
            // Look For Conditional Selects
            // --------------------------------------
            
            onChangeSelect(control, selectedOption) {
				
                if(control === "Delivery_Team" )
                    this.loadConditionalValues(selectedOption.value);
                
                this.setState({
                    [control] : selectedOption
                })   
            }



            // --------------------------------------
            // Load Conditional Select Values
            // --------------------------------------
            loadConditionalValues(selectedOption, preloadData = false) {
                
                switch(selectedOption) {
                    // ? Data from DB
                    // "Platform Solution - Ben Web´s Org"
                    case "Platform Solution - Ben Web´s Org" :
                        this.setState({
                            Technology : [],
                            Applications_involved :  {label : "Select Applications Involved", value : null},
                            conditionalApplications : [
                                // {"label" : "Select Application", "value" : ""},
                                {"label" : "Sharepoint", "value" : "Sharepoint"} ,
                                {"label" : "Corporate Marketing", "value" : 'Corporate Marketing'} ,
                                {"label" : "Mobile Apps", "value" : "Mobile Apps"} ,
                                {"label" : "Medical Quality", "value" : "Medical Quality"} ,
                                {"label" : "UX/UI", "value" : "UX/UI"} 
                            ],
                            conditionalTechnologies : [
                                // {label : "Select Technology", "value" : ""},
                                {"label" : ".Net", "value" : ".Net"} ,
                                {"label" : "C#", "value" : 'C#'} ,
                                {"label" : "JavaScript", "value" : "JavaScript"} ,
                                {"label" : "SQL", "value" : "SQL"} ,
                                
                            ],
                            conditionalIT_Groups_Required : [
                                // {"label" : "Select IT Group", "value" : ""},
                                {"label" : "Web solutions and enablement", "value" : "Web solutions and enablement"} ,
                                {"label" : "Brand and Identity", "value" : 'Brand and Identity'} ,
                                {"label" : "Mobile", "value" : "Mobile"} ,
                                {"label" : "UX-UI", "value" : "UX-UI"}  
                            ]

                        })
                        break;
                        // ? Data from DB
                        case "Global Ops - Sujit Gopinath´s Org":    
                            this.setState({
                                Technology : [],
                                Applications_involved :  {},
                                conditionalApplications : [
                                    // {"label" : "Select Application", "value" : ""},
                                    {"label" : "Corporate IT", "value" : "Corporate IT"} ,
                                    {"label" : "eDHR", "value" : "eDHR"} ,
                                    {"label" : "FlexFlow Custom Reports", "value" : "FlexFlow Custom Reports"} ,
                                    {"label" : "FlexXR", "value" : "FlexXR"} ,
                                    {"label" : "FTS", "value" : "FTS"} ,
                                    {"label" : "GBS Support", "value" : "GBS Support"} ,
                                    {"label" : "GPSC Apps", "value" : "GPSC Apps"} ,
                                    {"label" : "Ingrex", "value" : "Ingrex"} ,
                                    {"label" : "Platform Development & DevOps", "value" : "Platform Development & DevOps"} ,
                                    {"label" : "Rubicon", "value" : "Rubicon"} ,
                                    {"label" : "Site Specific Application", "value" : "Site Specific Application"} ,
                                    {"label" : "Other", "value" : "Other"} 
                                ],
                                conditionalTechnologies : [
                                    // {"label" : "Select Technology", "value" : ""},
                                    {"label" : ".Net", "value" : ".Net"} ,
                                    {"label" : "Java", "value" : "Java"} ,
                                    {"label" : "SQL", "value" : "SQL"} ,
                                    {"label" : "SSRS", "value" : "SSRS"} ,
                                    {"label" : "SSIS", "value" : "SSIS"} ,
                                    {"label" : "Mongo DB", "value" : "Mongo DB"} ,
                                    {"label" : "ELK Stack", "value" : "ELK Stack"} ,
                                    {"label" : "JavaScript", "value" : "JavaScript"} ,
                                    {"label" : "HTML5", "value" : "HTML5"} ,
                                    {"label" : "Angular", "value" : "Angular"} ,
                                    {"label" : "Mobile platforms", "value" : "Mobile platforms"} ,
                                    {"label" : "SAP", "value" : "SAP"},
                                    {"label" : "Sharepoint", "value" : "Sharepoint"},
                                ],
                                
                                conditionalIT_Groups_Required : [
                                
                                    // {"label" : "Select IT Group", "value" : ""},
                                    {"label" : "Advanced Analytics", "value" : "Advanced Analytics"} ,
                                    {"label" : "Customer IT", "value" : "Customer IT"} ,
                                    {"label" : "Database Administrators", "value" : "Database Administrators"} ,
                                    {"label" : "Network Administrators", "value" : "Network Administrators"} ,
                                    {"label" : "F5 Administrators", "value" : "F5 Administrators"} ,
                                    {"label" : "Wintel", "value" : "Wintel"} ,
                                    {"label" : "Linux", "value" : "Linux"} ,
                                    {"label" : "FlexPulse", "value" : "FlexPulse"} ,
                                    {"label" : "Systems Architecture", "value" : "Systems Architecture"} ,
                                    {"label" : "Development", "value" : "Development"} ,
                                    {"label" : "Site IT", "value" : "Site IT"} ,
                                    {"label" : "GI", "value" : "GI"} ,
                                    {"label" : "PMO – Americas", "value" : "PMO – Americas"} ,
                                    {"label" : "PMO", "value" : "PMO"} ,
                                    {"label" : "GAS", "value" : "GAS"} ,
                                    
                                    
                                ]
                            });
                            
                        break;
                        // ? Data from DB
                        case "GSS & Sales & Quality - Sapan Parikh´s Org" :
                            this.setState({
                                // Technology : {},
                                // Applications_involved :  {},
                                conditionalApplications : [
                                    // {"label" : "Select Application", "value" : ""},
                                    {"label" : "Apttus", "value" : "Apttus"} ,
                                    {"label" : "Epicenter", "value" : 'Epicenter'} ,
                                    {"label" : "Flexlink 2.0", "value" : "Flexlink 2.0"} ,
                                    {"label" : "FlexQ Medical", "value" : "FlexQ Medical"} ,
                                    {"label" : "MES", "value" : "MES"} ,
                                    {"label" : "Orion Cloud", "value" : "Orion Cloud"} ,
                                    {"label" : "QUALfx", "value" : "QUALfx"},
                                    {"label" : "SFDC Services", "value" : "SFDC Services"}, 
                                    {"label" : "TDMS", "value" : "TDMS"}, 
                                    {"label" : "FlexPulse Action Tracker", "value" : "FlexPulse Action Tracker"}, 
                                    {"label" : "SUgarCRM", "value" : "SUgarCRM"}, 
                                    {"label" : "P2P Notifications", "value" : "P2P Notifications"}, 
                                    {"label" : "Factory Quality", "value" : "Factory Quality"}, 
                                    {"label" : "Other", "value" : "Other"},
                                    {"label" : "Command Center", "value" : 'Command Center'}
                                    
                                ],
                                conditionalTechnologies : [
                                    // {"label" : "Select Technology", "value" : ""},
                                    {"label" : "Nucleus", "value" : "Nucleus"} ,
                                    {"label" : "Orion", "value" : 'Orion'} ,
                                    {"label" : ".NET", "value" : ".NET"} ,
                                    {"label" : "Java", "value" : "Java"} ,
                                    {"label" : "Sharepoint", "value" : "Sharepoint"} ,
                                    {"label" : "Mobile", "value" : "Mobile"} ,
                                    {"label" : "SNC", "value" : "SNC"},
                                    {"label" : "Unity Framework", "value" : "Unity Framework"} ,
                                    {"label" : "MuleSoft", "value" : "MuleSoft"}, 
                                    {"label" : "SQL", "value" : "SQL"}, 
                                    {"label" : "Azure SQL", "value" : "Azure SQL"}, 
                                    {"label" : "Angular JS", "value" : "Angular JS"}, 
                                    {"label" : "SFDC", "value" : "SFDC"}, 
                                    {"label" : "Sugar CRM", "value" : "Sugar CRM"}, 
                                ],
                                conditionalIT_Groups_Required : [
                                    // {"label ": "Select IT Group", "value" : ""},
                                    {"label" : "Sales, Services & Legal Platform", "value" : "Sales, Services & Legal Platform"} ,
                                    {"label" : "SQA", "value" : "SQA"} ,
                                    {"label" : "Net Development", "value" : "Net Development"} ,
                                ]
                            })
                            break;
                       
                    // ? Data from DB
                    case "D&E, WFD and Pulse  Aristoteles Portillo´s Org" :
                        this.setState({
                                // Technology : {},
                                // Applications_involved :  {},
                                conditionalApplications : [
                                    {"label" : "aPriori", "value" : "aPriori"} ,
                                    {"label" : "BOM Processing and Management", "value" : 'BOM Processing and Management'} ,
                                    {"label" : "CMT - Commercial Management Tracker", "value" : 'CMT - Commercial Management Tracker'} ,
                                    {"label" : "Customer Setup", "value" : 'Customer Setup'} ,
                                    {"label" : "Elementum", "value" : 'Elementum'} ,
                                    {"label" : "Flex Escalation Tool", "value" : 'Flex Escalation Tool'} ,
                                    {"label" : "Flex Q Medical", "value" : 'Flex Q Medical'} ,
                                    {"label" : "PLanView", "value" : 'PLanView'} ,
                                    {"label" : "QUALfx", "value" : 'QUALfx'} ,
                                    {"label" : "TDMS", "value" : 'TDMS'} ,
                                    {"label" : "Workforce Design", "value" : 'Workforce Design'} ,
                                    {"label" : "RFQ", "value" : 'RFQ'} ,
                                    {"label" : "FlexPulse Action Tracker", "value" : 'FlexPulse Action Tracker'} ,
                                    {"label" : "FLexware", "value" : 'FLexware'} ,
                                    {"label" : "Computer Integrated Manufacturing", "value" : 'Computer Integrated Manufacturing'} ,
                                    {"label" : "Checkmarx Vulnerabilities Remediation", "value" : 'Checkmarx Vulnerabilities Remediation'} ,
                                    {"label" : "Cisco Services Material Request Portal", "value" : 'Cisco Services Material Request Portal'} ,
                                    {"label" : "Jigsaw", "value" : 'Jigsaw'} ,
                                    {"label" : "Equator", "value" : 'Equator'} ,
                                    {"label" : "Libre", "value" : 'Libre'} ,
                                    {"label" : "WFD", "value" : 'WFD'} ,
                                    {"label" : "Other", "value" : 'Other'}
                                    
                                ],
                                conditionalTechnologies : [
                                    // {"label" : "Select Technology", "value" : ""},
                                    {"label" : "Java", "value" : "Java"} ,
                                    {"label" : ".NET", "value" : ".NET"} ,
                                    {"label" : "SQL", "value" : "SQL"}, 
                                    {"label" : "Mongo DB", "value" : "Mongo DB"}, 
                                    {"label" : "Sharepoint", "value" : "Sharepoint"} ,
                                    {"label" : "JavaScript", "value" : "JavaScript"}, 
                                    {"label" : "HTML5", "value" : "HTML5"}, 
                                    {"label" : "CSS3", "value" : "CSS3"}, 
                                    {"label" : "Cielo", "value" : "Cielo"}, 
                                    {"label" : "Single Page App (.Net, SQL, AngularJS, WebAPI)", "value" : "Single Page App (.Net, SQL, AngularJS, WebAPI)"}, 
                                    {"label" : "Traditional Web App (.Net, SQL, ASP.Net, MVC", "value" : "Traditional Web App (.Net, SQL, ASP.Net, MVC"}, 
                                    {"label" : "Microservice (.Net Core, WebAPI, SQL/NoSQL)", "value" : "Microservice (.Net Core, WebAPI, SQL/NoSQL)"}, 
                                    {"label" : "Mobile", "value" : "Mobile"}, 
                                    {"label" : "AWS", "value" : "AWS"}, 
                                    {"label" : "ELK Stack", "value" : "ELK Stack"}, 
                                    {"label" : "Other / New Technology", "value" : "Other / New Technology"}, 
                                    {"label" : "Azure", "value" : "Azure"}, 
                                    
                                
                                ],
                                conditionalIT_Groups_Required : [
                                    // {"label" : "Select IT Group", "value" : ""},
                                    {"label" : "Java", "value" : "Java"} ,
                                    {"label" : ".NET", "value" : ".NET"} ,
                                    {"label" : "Advanced Analytics", "value" : "Advanced Analytics"} ,
                                    {"label" : "Database Administrators", "value" : "Database Administrators"} ,
                                    {"label" : "Network Administrators", "value" : "Network Administrators"} ,
                                    {"label" : "F5 Administrators", "value" : "F5 Administrators"} ,
                                    {"label" : "Wintel", "value" : "Wintel"} ,
                                    {"label" : "Linux", "value" : "Linux"} ,
                                    {"label" : "FlexPulse", "value" : "FlexPulse"} ,
                                    {"label" : "Systems Architecture", "value" : "Systems Architecture"} ,
                                    {"label" : "Development", "value" : "Development"} ,
                                    {"label" : "Azure", "value" : "Azure"} ,
                                    
                                ]
                            })
                        break;
                    
                   
                    default : this.setState({conditionalApplications : []}); 
                }


                if(preloadData === false) {
                    // this.props
                    // console.log("TCL: TechnicalEvaluation -> loadConditionalValues -> this.props", this.props)
                    // this.setState({
                    //     Technology : this.createSelectOption(this.props.loadedtechnicalEvaluation.technicalEvaluation.Technology),
                    //     Applications_involved :  this.createSelectOption(this.props.loadedtechnicalEvaluation.technicalEvaluation.Applications_involved)
                    // })

                //     // this.setState({
                      
                }

                
                        
                    this.setState({
                        Applications_involved : null,
                        Technology : [],
                        IT_Groups_Required : null
                    })

                    // reset Other Selects
                    let sel1 = document.getElementById('Applications_involved').getElementsByClassName('react-select-wide__single-value')[0];
                    if(sel1)
                        sel1.textContent = "Select Applications Involved";

                        // let sel2 = document.getElementById('Technology').querySelectorAll('.react-select-wide__multi-value')
                        // document.querySelectorAll('.react-select-wide__multi-value')
                        // sel2.textContent = "Select Technology";
    
                        // if(sel2) {
                        //     for (var paragraph of sel2) {
                        //         paragraph.remove();
                        //     }

                        //     document.getElementById('Technology').querySelectorAll('.react-select-wide__clear-indicator').length > 0 && document.getElementById('Technology').querySelectorAll('.react-select-wide__clear-indicator')[0].remove()
                        // }
                    
                    let sel3 = document.getElementById('IT_Groups_Required').getElementsByClassName('react-select-wide__single-value')[0];
                        if(sel3) sel3.textContent = "Select IT Groups Required"
                


            }


            // --------------------------------------
            // Load Conditional Select Values
            // --------------------------------------
            
            // loadConditionalValues(selectedOption) {
                
            //     switch(selectedOption) {
            //         case "1- PlatformSolution - Ben Webs Org" :
            //             this.setState({
            //                 // Technology : {label : "Select Technology Used", value : null},
            //                 // Technology : null,
            //                 // Applications_involved :  {label : "Select Applications Involved", value : null},
            //                 // Applications_involved :  null,
            //                 conditionalApplications : [
            //                     {"label" : "Select Application", "value" : ""},
            //                     {"label" : "Sharepoint", "value" : "Sharepoint"} ,
            //                     {"label" : "Corporate Marketing", "value" : 'Corporate Marketing'} ,
            //                     {"label" : "Mobile Apps", "value" : "Mobile Apps"} ,
            //                     {"label" : "Medical Quality", "value" : "Medical Quality"} ,
            //                     {"label" : "UX/UI", "value" : "UX/UI"} 
            //                 ],
            //                 conditionalTechnologies : [
            //                     {label : "Select Technology", "value" : ""},
            //                     {"label" : ".Net", "value" : ".Net"} ,
            //                     {"label" : "C#", "value" : 'C#'} ,
            //                     {"label" : "JavaScript", "value" : "JavaScript"} ,
            //                     {"label" : "SQL", "value" : "SQL"} ,
                                
            //                 ],
            //                 conditionalIT_Groups_Required : [
            //                     {"label" : "Select IT Group", "value" : ""},
            //                     {"label" : "Web solutions and enablement", "value" : "Web solutions and enablement"} ,
            //                     {"label" : "Brand and Identity", "value" : 'Brand and Identity'} ,
            //                     {"label" : "Mobile", "value" : "Mobile"} ,
            //                     {"label" : "UX-UI", "value" : "UX-UI"} 
            //                 ]

            //             })
            //             break;
            //         case "2.- Global Ops - Sujit Gopinath´s Org":    
            //             this.setState({
            //                 // Technology : {},
            //                 // Applications_involved :  {},
            //                 conditionalApplications : [
            //                     {"label" : "Select Application", "value" : ""},
            //                     {"label" : "Corporate IT", "value" : "Corporate IT"} ,
            //                     {"label" : "eDHR", "value" : "eDHR"} ,
            //                     {"label" : "FlexFlow Custom Reports", "value" : "FlexFlow Custom Reports"} ,
            //                     {"label" : "FlexXR", "value" : "FlexXR"} ,
            //                     {"label" : "FTS", "value" : "FTS"} ,
            //                     {"label" : "GBS Support", "value" : "GBS Support"} ,
            //                     {"label" : "GPSC Apps", "value" : "GPSC Apps"} ,
            //                     {"label" : "Ingrex", "value" : "Ingrex"} ,
            //                     {"label" : "Platform Development & DevOps", "value" : "Platform Development & DevOps"} ,
            //                     {"label" : "Rubicon", "value" : "Rubicon"} ,
            //                     {"label" : "Site Specific Application", "value" : "Site Specific Application"} ,
            //                     {"label" : "Other", "value" : "Other"} 
            //                 ],
            //                 conditionalTechnologies : [
            //                     // {"label" : "Select Technology", "value" : ""},
            //                     {"label" : ".Net", "value" : ".Net"} ,
            //                     {"label" : "Java", "value" : "Java"} ,
            //                     {"label" : "SQL", "value" : "SQL"} ,
            //                     {"label" : "SSRS", "value" : "SSRS"} ,
            //                     {"label" : "SSIS", "value" : "SSIS"} ,
            //                     {"label" : "Mongo DB", "value" : "Mongo DB"} ,
            //                     {"label" : "ELK Stack", "value" : "ELK Stack"} ,
            //                     {"label" : "JavaScript", "value" : "JavaScript"} ,
            //                     {"label" : "HTML5", "value" : "HTML5"} ,
            //                     {"label" : "Angular", "value" : "Angular"} ,
            //                     {"label" : "Mobile platforms", "value" : "Mobile platforms"} ,
            //                     {"label" : "SAP", "value" : "SAP"},
            //                     {"label" : "Sharepoint", "value" : "Sharepoint"},
            //                 ],
                            
            //                 conditionalIT_Groups_Required : [
                            
            //                     {"label" : "Select IT Group", "value" : ""},
            //                     {"label" : "Advanced Analytics", "value" : "Advanced Analytics"} ,
            //                     {"label" : "Customer IT", "value" : "Customer IT"} ,
            //                     {"label" : "Database Administrators", "value" : "Database Administrators"} ,
            //                     {"label" : "Network Administrators", "value" : "Network Administrators"} ,
            //                     {"label" : "F5 Administrators", "value" : "F5 Administrators"} ,
            //                     {"label" : "Wintel", "value" : "Wintel"} ,
            //                     {"label" : "Linux", "value" : "Linux"} ,
            //                     {"label" : "FlexPulse", "value" : "FlexPulse"} ,
            //                     {"label" : "Systems Architecture", "value" : "Systems Architecture"} ,
            //                     {"label" : "Development", "value" : "Development"} ,
            //                     {"label" : "Site IT", "value" : "Site IT"} ,
            //                     {"label" : "GI", "value" : "GI"} ,
            //                     {"label" : "PMO – Americas", "value" : "PMO – Americas"} ,
            //                     {"label" : "PMO", "value" : "PMO"} ,
            //                     {"label" : "GAS", "value" : "GAS"} ,
                                
                                
            //                 ]
            //             });
            //             break;
            //         case "3.- GSS & Sales & Quality - Sapan Parikh´s Org" :
            //             this.setState({
            //                 // Technology : {},
            //                 // Applications_involved :  {},
            //                 conditionalApplications : [
            //                     {"label" : "Select Application", "value" : ""},
            //                     {"label" : "Apttus", "value" : "Apttus"} ,
            //                     {"label" : "Epicenter", "value" : 'Epicenter'} ,
            //                     {"label" : "Flexlink 2.0", "value" : "Flexlink 2.0"} ,
            //                     {"label" : "FlexQ Medical", "value" : "FlexQ Medical"} ,
            //                     {"label" : "MES", "value" : "MES"} ,
            //                     {"label" : "Orion Cloud", "value" : "Orion Cloud"} ,
            //                     {"label" : "QUALfx", "value" : "QUALfx"},
            //                     {"label" : "SFDC Services", "value" : "SFDC Services"}, 
            //                     {"label" : "TDMS", "value" : "TDMS"}, 
            //                     {"label" : "FlexPulse Action Tracker", "value" : "FlexPulse Action Tracker"}, 
            //                     {"label" : "SUgarCRM", "value" : "SUgarCRM"}, 
            //                     {"label" : "P2P Notifications", "value" : "P2P Notifications"}, 
            //                     {"label" : "Factory Quality", "value" : "Factory Quality"}, 
            //                     {"label" : "Other", "value" : "Other"},
            //                     {"label" : "Command Center", "value" : 'Command Center'}
                                
            //                 ],
            //                 conditionalTechnologies : [
            //                     {"label" : "Select Technology", "value" : ""},
            //                     {"label" : "Nucleus", "value" : "Nucleus"} ,
            //                     {"label" : "Orion", "value" : 'Orion'} ,
            //                     {"label" : ".NET", "value" : ".NET"} ,
            //                     {"label" : "Java", "value" : "Java"} ,
            //                     {"label" : "Sharepoint", "value" : "Sharepoint"} ,
            //                     {"label" : "Mobile", "value" : "Mobile"} ,
            //                     {"label" : "SNC", "value" : "SNC"},
            //                     {"label" : "Unity Framework", "value" : "Unity Framework"} ,
            //                     {"label" : "MuleSoft", "value" : "MuleSoft"}, 
            //                     {"label" : "SQL", "value" : "SQL"}, 
            //                     {"label" : "Azure SQL", "value" : "Azure SQL"}, 
            //                     {"label" : "Angular JS", "value" : "Angular JS"}, 
            //                     {"label" : "SFDC", "value" : "SFDC"}, 
            //                     {"label" : "Sugar CRM", "value" : "Sugar CRM"}, 
            //                 ],
            //                 conditionalIT_Groups_Required : [
            //                     {"label ": "Select IT Group", "value" : ""},
            //                     {"label" : "Sales, Services & Legal Platform", "value" : "Sales, Services & Legal Platform"} ,
            //                     {"label" : "SQA", "value" : "SQA"} ,
            //                     {"label" : "Net Development", "value" : "Net Development"} ,
            //                 ]
            //             })
            //             break;
            //         case "4.- D&E, WFD and Pulse  Aristoteles Portillo´s Org" :
            //             this.setState({
            //                 Technology : {},
            //                 Applications_involved :  {},
            //                 conditionalApplications : [
            //                     {"label" : "aPriori", "value" : "aPriori"} ,
            //                     {"label" : "BOM Processing and Management", "value" : 'BOM Processing and Management'} ,
            //                     {"label" : "CMT - Commercial Management Tracker", "value" : 'CMT - Commercial Management Tracker'} ,
            //                     {"label" : "Customer Setup", "value" : 'Customer Setup'} ,
            //                     {"label" : "Elementum", "value" : 'Elementum'} ,
            //                     {"label" : "Flex Escalation Tool", "value" : 'Flex Escalation Tool'} ,
            //                     {"label" : "Flex Q Medical", "value" : 'Flex Q Medical'} ,
            //                     {"label" : "PLanView", "value" : 'PLanView'} ,
            //                     {"label" : "QUALfx", "value" : 'QUALfx'} ,
            //                     {"label" : "TDMS", "value" : 'TDMS'} ,
            //                     {"label" : "Workforce Design", "value" : 'Workforce Design'} ,
            //                     {"label" : "RFQ", "value" : 'RFQ'} ,
            //                     {"label" : "FlexPulse Action Tracker", "value" : 'FlexPulse Action Tracker'} ,
            //                     {"label" : "FLexware", "value" : 'FLexware'} ,
            //                     {"label" : "Computer Integrated Manufacturing", "value" : 'Computer Integrated Manufacturing'} ,
            //                     {"label" : "Checkmarx Vulnerabilities Remediation", "value" : 'Checkmarx Vulnerabilities Remediation'} ,
            //                     {"label" : "Cisco Services Material Request Portal", "value" : 'Cisco Services Material Request Portal'} ,
            //                     {"label" : "Jigsaw", "value" : 'Jigsaw'} ,
            //                     {"label" : "Equator", "value" : 'Equator'} ,
            //                     {"label" : "Libre", "value" : 'Libre'} ,
            //                     {"label" : "WFD", "value" : 'WFD'} ,
            //                     {"label" : "Other", "value" : 'Other'}
                                
            //                 ],
            //                 conditionalTechnologies : [
            //                     {"label" : "Select Technology", "value" : ""},
            //                     {"label" : "Java", "value" : "Java"} ,
            //                     {"label" : ".NET", "value" : ".NET"} ,
            //                     {"label" : "SQL", "value" : "SQL"}, 
            //                     {"label" : "Mongo DB", "value" : "Mongo DB"}, 
            //                     {"label" : "Sharepoint", "value" : "Sharepoint"} ,
            //                     {"label" : "JavaScript", "value" : "JavaScript"}, 
            //                     {"label" : "HTML5", "value" : "HTML5"}, 
            //                     {"label" : "CSS3", "value" : "CSS3"}, 
            //                     {"label" : "Cielo", "value" : "Cielo"}, 
            //                     {"label" : "Single Page App (.Net, SQL, AngularJS, WebAPI)", "value" : "Single Page App (.Net, SQL, AngularJS, WebAPI)"}, 
            //                     {"label" : "Traditional Web App (.Net, SQL, ASP.Net, MVC", "value" : "Traditional Web App (.Net, SQL, ASP.Net, MVC"}, 
            //                     {"label" : "Microservice (.Net Core, WebAPI, SQL/NoSQL)", "value" : "Microservice (.Net Core, WebAPI, SQL/NoSQL)"}, 
            //                     {"label" : "Mobile", "value" : "Mobile"}, 
            //                     {"label" : "AWS", "value" : "AWS"}, 
            //                     {"label" : "ELK Stack", "value" : "ELK Stack"}, 
            //                     {"label" : "Other / New Technology", "value" : "Other / New Technology"}, 
            //                     {"label" : "Azure", "value" : "Azure"}, 
                                
                               
            //                 ],
            //                 conditionalIT_Groups_Required : [
            //                     {"label" : "Select IT Group", "value" : ""},
            //                     {"label" : "Java", "value" : "Java"} ,
            //                     {"label" : ".NET", "value" : ".NET"} ,
            //                     {"label" : "Advanced Analytics", "value" : "Advanced Analytics"} ,
            //                     {"label" : "Database Administrators", "value" : "Database Administrators"} ,
            //                     {"label" : "Network Administrators", "value" : "Network Administrators"} ,
            //                     {"label" : "F5 Administrators", "value" : "F5 Administrators"} ,
            //                     {"label" : "Wintel", "value" : "Wintel"} ,
            //                     {"label" : "Linux", "value" : "Linux"} ,
            //                     {"label" : "FlexPulse", "value" : "FlexPulse"} ,
            //                     {"label" : "Systems Architecture", "value" : "Systems Architecture"} ,
            //                     {"label" : "Development", "value" : "Development"} ,
            //                     {"label" : "Azure", "value" : "Azure"} ,

                                
            //                 ]
            //             })
            //             break;
                   
            //         default : this.setState({conditionalApplications : []}); 
            //     }


            //     this.setState({
            //         Applications_involved : null,
            //         Technology : null,
            //         IT_Groups_Required : null
            //     })



            //     // reset Other Selects
            //     let sel1 = document.getElementById('Applications_involved').getElementsByClassName('react-select-wide__single-value')[0];
            //         sel1.textContent = "Select Applications Involved";


            //     let sel2 = document.getElementById('Technology').querySelectorAll('.react-select-wide__multi-value')
                    

            //         if(sel2) {
            //             for (var paragraph of sel2) {
            //                 paragraph.remove();
            //               }

            //             // document.getElementById('Technology').querySelectorAll('.react-select-wide__clear-indicator')[0].remove()

            //             document.getElementById('Technology').querySelectorAll('.react-select-wide__clear-indicator').length > 0 && document.getElementById('Technology').querySelectorAll('.react-select-wide__clear-indicator')[0].remove()

            //         }


            //     let sel3 = document.getElementById('IT_Groups_Required').getElementsByClassName('react-select-wide__single-value')[0];
            //         sel3.textContent = "Select IT Groups Required"

                    
            // }
            
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
            // Get Data From People Picker
            // peoplePickerBusiness_lead_TopSpan_HiddenInput
            // --------------------------------------
            getPeoplePickerData(peoplePicker) {
                const pickerName = `peoplePicker${peoplePicker}_TopSpan_HiddenInput`;

                if( !document.getElementById(pickerName)) 
                    return null;

                const pickerValue = document.getElementById(pickerName).value || "";
                if(pickerValue === "" || pickerValue === "[]" || pickerValue === [] ) 
                    return null;
                else
                {
                    const picker = JSON.parse(pickerValue) || {};
                    return picker[0].Description;
                }
                
				
                // const picker = JSON.parse(document.getElementById(pickerName).value);
                
            }

            // --------------------------------------
            // Validate Value of PP to be an object
            // --------------------------------------
            validateValueofPicker(pickerValue) {
                let resolvedArray = JSON.parse(pickerValue);
                return resolvedArray[0].IsResolved;
            }


            // --------------------------------------
            // Load Default PeoplePicker Value
            // --------------------------------------
            fillPickers() {
                const {Approver, Project_Manager} = this.props.technicalEvaluation;
				//console.log('TCL: TechnicalEvaluation -> fillPickers -> this.props.technicalEvaluation', this.props.technicalEvaluation)

                if(Approver)
                    window.fillPeoplePicker(Approver, 'Approver');
                if(Project_Manager)
                    window.fillPeoplePicker(Project_Manager, 'Project_Manager');


                // Add tabIndex
                 document.getElementById('peoplePickerApprover_TopSpan_EditorInput').tabIndex = 52;
                 document.getElementById('peoplePickerProject_Manager_TopSpan_EditorInput').tabIndex = 53;
            }


        /* ==========================================================================
        ** Save Values
        ** ========================================================================== */

                // --------------------------------------
                // Validate Empty PP
                // --------------------------------------
                validatePeoplePicker(pickerName) {
                    let isValid = true;

                    // TODO : Remove this
                    if (!document.getElementById(`peoplePicker${pickerName}_TopSpan_HiddenInput`))
                        return true
                    
                    if (document.getElementById(`peoplePicker${pickerName}_TopSpan_HiddenInput`).value === "[]" || document.getElementById(`peoplePicker${pickerName}_TopSpan_HiddenInput`).value === "") {
                        isValid = false;
                        document.getElementById(`peoplePicker${pickerName}_TopSpan`).style = 'border: 1px solid #e76c90 !important';
                        
                    }
                    else {
                        document.getElementById(`peoplePicker${pickerName}_TopSpan`).style = 'border: 1px solid #ced4da !important';
                        
                        isValid = true
                    }

                    return isValid;


                }

                // --------------------------------------
                // Validate Dates
                // Exp Completed Date higher to the start dates
                // --------------------------------------
                validateDates(date1, date2, date3) {

                    date1 === null ? date1 = moment() : date1 = date1;
                    date2 === null ? date2 = moment() : date2 = date2;
                    date3 === null ? date3 = moment() : date3 = date3;
                    
                    if(date1 === null && date2 ===  null || date1 === null && date3 === null || date2 === null && date3 === null) {
                        this.createErrorAlertTop("The Dates can't be the same value");
                        return false    
                    }
                    
                    //console.log("TCL: validateDates -> moment(date1).isSame(date2)", moment(date1).isSame(date2))
                    //console.log("TCL: validateDates -> moment(date1)", moment(date1))
                    //console.log("TCL: validateDates -> moment(date1)", moment(date2))
                    //console.log("TCL: validateDates -> moment(date1)", moment(date3))

                    //console.log("TCL: validateDates -> (moment(date1).isSame(date3) === true)", (moment(date1).isSame(date3) === true))

                    
                    if ((moment(date1).isSame(date2) === true) || (moment(date1).isSame(date3) === true) || (moment(date2).isSame(date3) === true)) {
						
						
                        this.createErrorAlertTop("The Dates can't be the same value");
                        return false
                    }
                    // Check GoLive Date be after approval or Start Date
                    else if(moment(date3).isBefore(date1) === true) {
                        this.createErrorAlertTop("The GoLive Date can't be before the Approval Date");
                        return false;
                    }
                    else if(moment(date3).isBefore(date2) === true) {
                        this.createErrorAlertTop("The GoLive Date can't be before the Start Date");
                        return false;
                    }
                    else
                        return true
                    
                }

                
            
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
                                //console.log(`TCL: validateFormInputs -> fieldItem.value Text->${fieldItem.Field_State_Name}`, fieldItem.value)
                                    if(this.state[fieldItem.Field_State_Name] === null || this.state[fieldItem.Field_State_Name] === "" ) {
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
                                if(this.state[fieldItem.Field_State_Name] === null || this.state[fieldItem.Field_State_Name].value === "" || this.state[fieldItem.Field_State_Name].value === null  || this.state[fieldItem.Field_State_Name] === null  || this.state[fieldItem.Field_State_Name] === [])  {
                                    this.addErrorStatus(fieldItem.Field_State_Name);
                                    return true;
                                    
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
					//console.log('TCL: TechnicalEvaluation -> validateFormInputs -> errorsCount', errorsCount)

                    return errorsCount > 0 ?  false : true
                    
                }




            // --------------------------------------
            // Save Form values
            // --------------------------------------
            saveFormValues(projectID = null, newTechnicalEvaluationId = null) {
                // const currentUser = window.getCurrentSPUser();
                // const projId = this.props.projectID || 'GSD67';
                // const requestID = projId.substr(projId.indexOf('D')+1,projId.length);

                // ! const currentUser = window.getCurrentSPUser();
                const projId = this.props.projectIntake.requirementsDefinition.Request_ID || projectID;

                let requestID = null
                    
                if(projId === undefined)
                    requestID = null;
                else if(projectID === null && newTechnicalEvaluationId === null) 
                    requestID =  this.props.projectIntake.requirementsDefinition.Request_ID  || null
                else
                    requestID = projId.indexOf('D') >= 0 ? projId.substr(projId.indexOf('D')+1,projId.length) : projId;    
                
                // const requestID = projId.substr(projId.indexOf('D')+1,projId.length);
                
                //console.log('TCL: TechnicalEvaluation -> saveFormValues -> requestID', requestID)
                
                const formData = {
                    Project_ID : requestID,
                    tech_eval_id : newTechnicalEvaluationId,
                    Delivery_Team : this.state.Delivery_Team,
                    Platform_type : this.state.Platform_type,
                    Applications_involved : this.state.Applications_involved,
                    Technology : this.state.Technology,
                    IT_Groups_Required : this.state.IT_Groups_Required,
                    Estimated_Effort : this.state.Estimated_Effort,
                    Project_Team_Size : this.state.Project_Team_Size,
                    Project_Manager : this.getPeoplePickerData('Project_Manager') || '',
                    Target_Start_Date: this.state.Target_Start_Date || moment(),
                    Target_Go_Live_Date: this.state.Target_Go_Live_Date || moment(),
                    IT_FTE_required : this.state.IT_FTE_required,
                    Approver : this.getPeoplePickerData('Approver') || '',
                    Approval_Date : this.state.Approval_Date || moment(),
                    Justification_ROI : this.state.Justification_ROI,
                    Design_Development_Testing_Effort : this.state.Design_Development_Testing_Effort,
                    Travel_TE : this.state.Travel_TE,
                    Consulting : this.state.Consulting,
                    Training : this.state.Training,
                    Licenses_Cost_per_year : this.state.Licenses_Cost_per_year,
                    Hardware_leasing : this.state.Hardware_leasing,
                    Maintenance_Hardware_hours_per_year : this.state.Maintenance_Hardware_hours_per_year,
                    Maintenance_Salaries_hours_per_year : this.state.Maintenance_Salaries_hours_per_year,
                    No_of_Sites : this.state.No_of_Sites,
                    No_of_Active_users : this.state.No_of_Active_users,
                    Created_by : currentUser.userEmail,
                    Last_modifed_by : currentUser.userEmail
                }
                //console.log('TCL: TechnicalEvaluation -> saveFormValues -> formData', formData)
                return formData;
				
            }


            // --------------------------------------
            // Submit Form
            // --------------------------------------
            submitFormLocalData = (redirectNextStep = true) => {
            
              

                // this.props.saveLocalTechnical(formData);

                //! if(this.validateFormInputs() === false) {
                //!     this.createErrorAlertTop('Please Fill all the Required Fields');
                //!     this.setState({checkForErrors: true})
                //!     return;
                //! }

                if(redirectNextStep !== false) {


                    const formData = this.saveFormValues();

                    this.props.updateProjectIntakeValues('technical',formData)

                    // Show Sucess Message 
                    this.createSuccessAlert('Data Saved Locally');
                    // Redirect User
                    // setTimeout(()=>{this.redirectUser();},700);
                    this.redirectUser();
                }
                
            
            }

            // --------------------------------------
            // Save Values When Returning to Prev Step
            // --------------------------------------   
            submitFormLocalDataReturn = (event) => {

                // const formData = this.saveFormValues(null,null);

                // this.props.saveLocalTechnical(formData);
            
                //console.log('TCL: submitFormLocalData -> formData', formData)

                this.redirectUserPrev();
            }

            // --------------------------------------
            // Save New Technical
            // --------------------------------------
            saveNewTechnicalDB(projectID) {
                const formData = this.saveFormValues(projectID,null);
                const nextStep = 'pmo-evaluation';

                // this.props.saveLocalTechnical(formData);
                saveTechnicalDB(formData).then((newTechId)=>{
                    console.log("TCL: saveNewTechnicalDB -> newTechId", newTechId)
                    this.createSuccessAlert('Data Saved ');
                    // Check If Action was Success
                    // const newTechnicalEvaluationId = this.props.pro.newTechnicalEvaluationId

                    formData.Tech_eval_id = newTechId
                        
                    // ? Update Props
                    this.props.updateProjectIntakeValues('technical',formData, null, true)


                    this.saveOtherTabs(projectID)

                    this.setState({sendingData : false})

                })
                .catch((error)=> {
                    this.createErrorAlert('There was a problem saving the data, please try again ');
                    this.setState({sendingData : false},)
                })
            }


            // --------------------------------------
            // Update Current Technical
            // --------------------------------------
            updateCurrentTechnicalDB(projectID, newTechnicalEvaluationId) {
			    //console.log('TCL: updateCurrentTechnicalDB -> newTechnicalEvaluationId', newTechnicalEvaluationId)
                //console.log('TCL: updateCurrentTechnicalDB -> projectID', projectID);

                const nextStep = 'pmo-evaluation';
                const formData = this.saveFormValues(projectID,newTechnicalEvaluationId);

                updateTechnicalDB(formData).then((techID)=>{
                    console.log("TCL: updateCurrentTechnicalDB -> techID", techID)
                    this.createSuccessAlert('Data Updated ');
                    // Check If Action was Success
                    // const newTechnicalEvaluationId = this.props.technicalEvaluation.newTechnicalEvaluationId
                    
                    

                    // ? Update Props
                    this.props.updateProjectIntakeValues('technical',formData, null, true)
                    
                    this.setState({sendingData : false}, this.redirectUser(nextStep))
                    
                })
                .catch((error)=> {
                    this.createErrorAlert('There was a problem saving the data, please try again ');
                    this.setState({sendingData : false},)
                })



            }


            
            // ! --------------------------------------
            // ! Submit Form to DB
            // ! --------------------------------------
            submitFormDB = () => {

                const {isPMO} = this.props;

                //? Check that Requirements Definition is Saved
                //? If is not saved, Then Save Requ
                //? Get Project ID
                //? Save Business Info
                //? Save Technical

                let reqSaved = false
                if (this.props.projectIntake.requirementsDefinition.isSavedOnDB === false || !this.props.projectIntake.requirementsDefinition.Project_id)
                    reqSaved = false;
                else if (this.props.projectIntake.requirementsDefinition.Project_id)
                    reqSaved = true
                else
                    reqSaved = true

                if(isPMO === true && !reqSaved)  {
                    // this.createErrorAlertTop('You Have to Create First the Requirements Definition');
                    // this.submitFormLocalData(false);

                    

                    this.saveOtherTabs(null, true);
                    
                    return;
                }
                else if(isPMO === false)
                    return;
                


                if(this.validateFormInputs() === false) {
                    this.createErrorAlertTop('Please Fill all the Required Fields');
                    this.setState({checkForErrors : true})
                    return;
                }


                if(this.validateDates(this.state.Approval_Date, this.state.Target_Start_Date, this.state.Target_Go_Live_Date) === false) {
                        
                    return;
                }

                // Check if is New Technical Or Update

                this.setState({sendingData : true})


                // const {requirementsDefinition} = this.props;
                const { Project_id } = this.props.projectIntake.requirementsDefinition;
                

                const technicalEvaluationSaved = this.props.projectIntake.technicalEvaluation.Tech_eval_id


                if(technicalEvaluationSaved) {
                    // Update Project
                    // Get Current Project ID
                    const newTechnicalEvaluationId = this.props.projectIntake.technicalEvaluation.Tech_eval_id
					//console.log('TCL: submitFormDB -> newTechnicalEvaluationId', newTechnicalEvaluationId)
                    
                    this.updateCurrentTechnicalDB(Project_id, newTechnicalEvaluationId);
                }
                else {
                    // Save New Project
                    this.saveNewTechnicalDB(Project_id);

                }     


                


            }


            // !--------------------------------------
            // ! Save Other Tabs
            // !--------------------------------------
                saveOtherTabs = async (projectID, saveTech =  false) => {
                    // this.props.businessInformation

                    console.log("TCL: saveOtherTabs -> this.props", this.props)
                    

                    
                    const {requirementsDefinition, businessInformation, technicalEvaluation, pmoEvaluation, roiRealized} = this.props.projectIntake;
                    


                    // ? If theres on Project ID, save first Req, then the others
                    if(projectID === null || projectID === undefined) {
                        // ? Save Business Information
                        if( !isEmpty(requirementsDefinition) && requirementsDefinition.SavedLocally === true) {

                            // ? Save New Project
                            saveRequirementsDB(requirementsDefinition).then((newProjectID)=>{
                                console.log("TCL: TechnicalEvaluation -> saveOtherTabs -> newProjectID", newProjectID)
                                

                                // ? Create Folder Structure and Upload Files
                                const projectID = newProjectID || requirementsDefinition.Request_ID;
    
                                // Remove the GSD from the ID if theres any
                                let id = projectID.indexOf('D') >= 0  ? projectID.substr(projectID.indexOf('D')+1,projectID.length) : projectID;
                                let reqFolderURL = `${projectID}/RequirementsDefinition`;
                                let pmoFolderURL = `${projectID}/PMO`;

                                requirementsDefinition.Project_id = newProjectID;

                                
                                this.props.updateProjectIntakeValues('requirements',requirementsDefinition, null, true)
    
    
                                //! Create Requirements  Folder
    
                                    // window.createFolderStructure('intakeFiles' , reqFolderURL, ()=> {
        
                                    //     // window.uploadFilesToFolder(projectID, filesArray)
        
                                        
        
                                    //     this.uploadReqFiles(projectID, reqFolderURL);
                                        
        
                                    //     // this.createSuccessAlert('SP Folder Created');
                                    //     this.createSuccessAlert(`Data Saved,Project ID : ${projectID}`);
        
        
                                    //     // this.setState({ Request_ID : projectID , sendingData : false})
                                        
                                    // }, 
                                    //     () => {
                                    //         this.createErrorAlert('There was a problem creating the Requirements Definition Folder, please try again ');
                                    //         //console.log('fail react')
                                    // });
        
                                //! Creaate PMO Folder
                                    // window.createFolderStructure('intakeFiles' , pmoFolderURL, ()=> {
                                        //     //console.log('PMO Creataed')
                                        //   // //? setTimeout(()=>{this.redirectUser();},700);
                                        // }, 
                                        //     () => {
                                        //         this.createErrorAlert('There was a problem creating the PMO Folder, please try again ');
                                        //         //console.log('fail react')
                                        // });
    
                                // ! Save Other Tabs


                                    // ? IF Technical Evaluation is not created, save it as well

                                    if(saveTech === true) {
                                        // ? Save Tehnical Evaluation
                                        // if(!isEmpty(this.props.technicalEvaluation)) {
                                             const formData = this.saveFormValues(id);
                                            // this.props.saveLocalTechnical(formData);
                                            // this.props.saveTechnicalDB(this.props.technicalEvaluation, id)

                                            saveTechnicalDB(formData, id).then((newTechId) => {
                                                console.log("TCL: saveOtherTabs -> newTechId", newTechId)
                                                technicalEvaluation.Tech_eval_id = newTechId
                                            }).catch((error) => {console.log("TCL: saveOtherTabs -> error", error)})
        
                                        // ? Update Props
                                            this.props.updateProjectIntakeValues('technical',technicalEvaluation, null, true)
                                        // }
                        
                                    }

                                                
                                    // ? Save Business Information
                                    if( !isEmpty(businessInformation) && businessInformation.SavedLocally === true ) {

                                        console.log("TCL: saveOtherTabs -> businessInformation", businessInformation)
                                        
                                        
                                        if(businessInformation.Buss_info_id)
                                            updateBusinesInformationDB(businessInformation)
                                        else {
                                            saveBusinesInformationDB(businessInformation, id).then((newBusinesId) => {
                                                console.log("TCL: saveOtherTabs -> newBusinesId", newBusinesId)
                                                businessInformation.Buss_info_id = newBusinesId
                                            }).catch((error) => {console.log("TCL: saveOtherTabs -> error", error)})
                                            
                                        }  
        
                                        // ? Update Props
                                        this.props.updateProjectIntakeValues('business',businessInformation, null, true)
                                            
                                
                                        
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



                                    // ? Save Roi Realized
                                    if(!isEmpty(roiRealized) && roiRealized.SavedLocally === true) {
                                        // ? Look For Roi Relized Data
                                        if(roiRealized.Roi_real_id) {
                                           updateROIRealizedDB(roiRealized)
                                        }
                                         else
                                            saveROIRealizedDB(roiRealized, id).then((roiID) => {
                                                console.log("TCL: roiID", roiID)
                                                roiRealized.Roi_real_id = roiID
                                                 // ? Look for Dynatrace
                                                if(!isEmpty (roiRealized.dynatrace))
                                                    saveDynatraceDB(roiRealized.dynatrace, id,  roiID)
            
                                            })
            
                                       
                                        // ? Update Props
                                        this.props.updateProjectIntakeValues('roiRealized',roiRealized, roiRealized.dynatrace, true)
                                       
                                    }



                                    this.setState({sendingData : false})
                                    this.createSuccessAlert('All Tabs were saved')
                                    this.redirectUser('pmo-evaluation');
    
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

                        // ? Save Req Definition
                        if( !isEmpty(requirementsDefinition) && requirementsDefinition.SavedLocally === true) {
                            

                            // this.validateEmptyRequirements();

                            if(requirementsDefinition.Project_id || requirementsDefinition.project_id) {
                                updateRequirementsDB(requirementsDefinition, id);
                                let reqFolderURL = `${requirementsDefinition.Request_ID}/RequirementsDefinition`;
                                //? this.uploadReqFiles(requirementsDefinition.Request_ID, reqFolderURL);
                            }
                                
                            else
                                saveRequirementsDB(requirementsDefinition).then((newRequirementsID) => {
                                    console.log("TCL: newRequirementsID", newRequirementsID)
                                    requirementsDefinition.Project_id = newRequirementsID;
                                    let reqFolderURL = `${newRequirementsID}/RequirementsDefinition`;
                                    //? this.uploadReqFiles(requirementsDefinition.newProjectID, reqFolderURL);
                                })



                            this.props.updateProjectIntakeValues('requirements',requirementsDefinition, null, true)

                        }



                        // ? Save Business Information
                        if( !isEmpty(businessInformation) && businessInformation.SavedLocally === true ) {

                            console.log("TCL: saveOtherTabs -> businessInformation", businessInformation)
                            
                            
                            if(businessInformation.Buss_info_id)
                                updateBusinesInformationDB(businessInformation)
                            else {
                                saveBusinesInformationDB(businessInformation, id).then((newBusinesId) => {
                                    console.log("TCL: saveOtherTabs -> newBusinesId", newBusinesId)
                                    businessInformation.Buss_info_id = newBusinesId
                                }).catch((error) => {console.log("TCL: saveOtherTabs -> error", error)})
                                
                            }  

                            // ? Update Props
                            this.props.updateProjectIntakeValues('business',businessInformation, null, true)
                                
                    
                            
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



                        // ? Save Roi Realized
                        if(!isEmpty(roiRealized) && roiRealized.SavedLocally === true) {
                            // ? Look For Roi Relized Data
                            if(roiRealized.Roi_real_id) {
                               updateROIRealizedDB(roiRealized).then((roiID) => {
                                console.log("TCL: roiID", roiID)
                                    roiRealized.Roi_real_id = roiID
                                    // ? Look for Dynatrace
                                    if(!isEmpty (roiRealized.dynatrace))
                                        saveDynatraceDB(roiRealized.dynatrace, id,  roiID)

                                })
                            }
                             else
                                saveROIRealizedDB(roiRealized, id).then((roiID) => {
                                    console.log("TCL: roiID", roiID)
                                    roiRealized.Roi_real_id = roiID
                                     // ? Look for Dynatrace
                                    if(!isEmpty (roiRealized.dynatrace))
                                        saveDynatraceDB(roiRealized.dynatrace, id,  roiID)

                                })

                           
                            // ? Update Props
                            this.props.updateProjectIntakeValues('roiRealized',roiRealized, roiRealized.dynatrace, true)
                           
                        }

                      



                    }

                    this.setState({sendingData : false})
                    
                    // this.redirectUser();

                    // this.resetState();
                    
                }

            
            



            
            // --------------------------------------
            // Redirect User
            // --------------------------------------
            redirectUser() {
                const {history} = this.props.locationData;
                // const path = '/sites/gsd/intake_process/IntakeProcess/ProjectIntake.aspx';

                const path = '/intake';
                
                history.push(`${path}/add-project/pmo-evaluation`);
            }


            // --------------------------------------
            // Redirect User Prev Step
            // --------------------------------------

            redirectUserPrev() {
                const {history} = this.props.locationData;
                // const path = '/sites/gsd/intake_process/IntakeProcess/ProjectIntake.aspx';

                const path = '/intake';
                
                history.push(`${path}/add-project/business-information`);
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
                    const filesArray = this.props.projectIntake.requirementsDefinition.Project_docs;
                    

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
            // @returns {COmponent}
            // -------------------------------------- */
            renderHeaderSection(title) {
                return (
                    <SectionHeader title = {title}/>
                )
            }

            // --------------------------------------
            // Render Form Fields
            // --------------------------------------
            renderFormFields(group, renderBorder) {
                const formFieldsValues = this.createFormStructure();
                const formData = formFieldsValues.filter((item) => { return item.group === group });
				return (
                    <FieldsGenerator 
                        fieldsData={formData} 
                        renderBorder={renderBorder} 
                        onChangeInputs = {this.onChangeInputs}
                        onChangeSelect = {this.onChangeSelect}
                        onDateChange = {this.onDateChange}
                        checkErrorClass = {this.checkErrorClass}
                    />
                )
            }

            // --------------------------------------
            // Render Form Footer
            // --------------------------------------
            renderformFooter() {
                return (
                    <FormFooter> 
                        <AppButton buttonText = {'Return'} buttonClass = {'cancelButton'} onClick = {this.submitFormLocalDataReturn}></AppButton>
                        <AppButton buttonText = {'Save'} buttonClass = {'saveButton'} onClick = {this.submitFormDB}></AppButton>
                        <AppButton buttonText = {'Continue'} buttonClass = {'continueButton'} onClick = {this.submitFormLocalData}></AppButton>
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
            // Look IF input has error class
            // And remove it or keept it
            // --------------------------------------
            checkErrorClass = (event)=> {
                const {target} = event;
                const {id, value} = target;
                
                // console.log("TCL: checkErrorClass -> value", value)
                // console.log("TCL: checkErrorClass -> id", id)
                // console.log("TCL: checkErrorClass -> target", target)
               
                //? Check for PeopplePicker
                if(id.indexOf('peoplePicker') >= 0) {
                    let pickerName = id.substring(0, id.indexOf('_EditorInput'))
                    
                    // console.log("TCL: checkErrorClass -> pickerName", pickerName)
                   
                  if(this.state.checkForErrors ===  true) {
                    if (document.getElementById(`${pickerName}_HiddenInput`).value === "[]" || document.getElementById(`${pickerName}_HiddenInput`).value === "") 
                        document.getElementById(pickerName).style = 'border: 1px solid #e76c90 !important';
                    

                    else 
                        // document.getElementById(pickerName).style = 'border: 1px solid #ced4da !important';
                        document.getElementById(pickerName).style = 'border: none !important';
                  }
                        
                    
    
                    // let stateName = id.substr('')
                }

                

                 //? Check Select Inputs Fields
                else if((this.state.checkForErrors === true && this.state[id].value !== "" ) || (this.state.checkForErrors === true &&  this.state[id].value !== null) )
                    this.removeErrorStatus(id)

                //? Check Input Text Fields
                else if(value.length > 0)
                    this.removeErrorStatus(id)
               
                //? Puth Back Error Message
                else  if(this.state.checkForErrors === true)
                    this.addErrorStatus(id)
                
            }


        


            // --------------------------------------
            // Render Projects
            // --------------------------------------
            renderTechnicalEvaluation() {
                const {sendingData} = this.state;
                const {isPMO} = this.props;
                if (isPMO === false ) 
                    return (<Redirect to={'/'}/>)


                const formContainer =  <form ref={form => this.formTechnical = form}>
                                            <div className="int-container">
                                                    <div className="int-row">
                                                        {this.renderHeaderSection("IT Team Information")}
                                                    </div>
                                                    

                                                    <div className="int-fieldsSection">
                                                        <div className="int-row">
                                                            <div className="int-column ">
                                                                {this.renderFormFields("firstHalf1", true)}
                                                            </div>

                                                            <div className="int-column ">
                                                                {this.renderFormFields("firstHalf2", true)}
                                                            </div>

                                                        </div>

                                                        <div className="int-row">
                                                            <div className="int-column">
                                                                {this.renderFormFields("first3column1", true)}
                                                            </div>

                                                            <div className="int-column">
                                                                {this.renderFormFields("first3column2", true)}
                                                            </div>

                                                            

                                                            
                                                        </div>
                                                    </div>

                                                    <div className="int-row">
                                                        <div className="int-column">
                                                            {this.renderFormFields("first3column3", true)}
                                                        </div>

                                                        {this.state.responsiveWidth > 1440 &&  <div className="int-column"></div>}
                                                        
                                                        
                                                    </div>


                                                    <div className="int-row">
                                                        {this.renderHeaderSection("IT Effort")}
                                                    </div>

                                                    
                                                    <div className="int-fieldsSection">
                                                        <div className="int-row">
                                                            <div className="int-column">
                                                                {this.renderFormFields("second3column1", true)}
                                                            </div>

                                                            <div className="int-column">
                                                                {this.renderFormFields("second3column2", true)}
                                                            </div>

                                                            <div className="int-column">
                                                                {this.renderFormFields("second3column3", true)}
                                                            </div>

                                                            
                                                        </div>
                                                        

                                                        <div className="int-row">
                                                            <div className="int-column">
                                                                {this.renderFormFields("third3column1", true)}
                                                            </div>

                                                            <div className="int-column">
                                                                {this.renderFormFields("third3column2", true)}
                                                            </div>

                                                            <div className="int-column">
                                                                {this.renderFormFields("third3column3", true)}
                                                            </div>
                                                        </div>

                                                        <div className="int-row">
                                                            <div className="int-column">
                                                                {this.renderFormFields("fourth3column1", true)}
                                                            </div>

                                                            <div className="int-column">
                                                                {this.renderFormFields("fourth3column2", true)}
                                                            </div>

                                                        </div>

                                                        <div className="int-row">
                                                            <div className="int-column">
                                                                {this.renderFormFields("fifth3column", true)}
                                                            </div>
                                                        </div>
                                                    
                                                    </div>


                                                    <div className="int-row">
                                                            {this.renderHeaderSection("IT Cost (one Time Charge)")}
                                                    </div>
                                                

                                                    <div className="int-fieldsSection">
                                                        <div className="int-row">
                                                            <div className="int-column">
                                                                {this.renderFormFields("sixth3column1", true)}
                                                            </div>

                                                            <div className="int-column">
                                                                {this.renderFormFields("sixth3column2", true)}
                                                            </div>

                                                        </div>

                                                        <div className="int-row">
                                                            <div className="int-column">
                                                                {this.renderFormFields("sixth3column3", true)}
                                                            </div>

                                                            <div className="int-column">
                                                                {this.renderFormFields("sixth3column4", true)}
                                                            </div>
                                                        </div>

                                                    

                                                    </div>

                                                    
                                                    <div className="int-row">
                                                            {this.renderHeaderSection("IT Cost (Recurring Costs)")}
                                                    </div>
                                                
                                                    <div className="int-fieldsSection">
                                                        
                                                        <div className="int-row">
                                                            <div className="int-column">
                                                                {this.renderFormFields("twocolumn1", true)}
                                                            </div>

                                                            <div className="int-column">
                                                                {this.renderFormFields("twocolumn2", true)}
                                                            </div>
                                                        </div>

                                                        
                                                        <div className="int-row">
                                                            <div className="int-column">
                                                                {this.renderFormFields("twocolumn3", true)}
                                                            </div>

                                                            <div className="int-column">
                                                                {this.renderFormFields("twocolumn4", true)}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    
                                                    <div className="int-row">
                                                        {this.renderHeaderSection("Current Statistics (If is in Production)")}
                                                    </div>

                                                    <div className="int-fieldsSection">
                                                        <div className="int-row">
                                                            <div className="int-column">
                                                                {this.renderFormFields("two2column1", true)}
                                                            </div>

                                                            <div className="int-column">
                                                                {this.renderFormFields("two2column2", true)}
                                                            </div>
                                                        </div>
                                                    </div>


                                                </div>
                                        </form>
                return (
                    <Fragment>
                    
                        <FormBody>
                            {sendingData && this.renderLoader(true)}
                            {formContainer}
                        </FormBody>
        
                        {this.renderformFooter()}
                    </Fragment>
                )

            }


            // --------------------------------------
            // Render Component
            // --------------------------------------
            render() {
                const {isLoaded} = this.state;
                return isLoaded ? this.renderTechnicalEvaluation() : this.renderLoader();
            }
    }

    
// -------------------------------------- 
// Define PropTypes 
// -------------------------------------- 
    TechnicalEvaluation.propTypes = {
        props: PropTypes
    };





// --------------------------------------
// Export Component
// --------------------------------------
    export default (TechnicalEvaluation);
    