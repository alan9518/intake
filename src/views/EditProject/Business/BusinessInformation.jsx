/* ==========================================================================
** Form Setp 2 Component View Edit Edit Project
** 29/01/2019
** Alan Medina Silva
** ========================================================================== */


// --------------------------------------
// Get Dependences
// --------------------------------------
    import React, { Component, Fragment } from 'react';
    import CustomerValues from '../../../LocalData/customerValues.json'
    import PropTypes from 'prop-types';
    import { withRouter, Redirect } from 'react-router';
    import { isEqual , isEmpty} from 'lodash'
    import Alert from 'react-s-alert';
    import 'react-s-alert/dist/s-alert-default.css';
    import 'react-s-alert/dist/s-alert-css-effects/slide.css';
 
    import { FieldsGenerator, AppLoader, SectionHeader, FormBody, FormFooter, AppButton } from '../../../components';

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


    // const currentUser =  {userName : 'Alan Medina', userEmail : 'alan.medina@flex.com'}

    const currentUser = window.getCurrentSPUser();

// --------------------------------------
// Create Component Class
// --------------------------------------
    class BusinessInformation extends Component {

        /* ==========================================================================
        ** Component Setup
        ** ========================================================================== */
    
            // --------------------------------------
            // Constructor
            // --------------------------------------
            constructor(props) {
                super(props);
                console.log("TCL: BusinessInformation -> constructor -> props", props)
                //console.log('TCL: constructor -> props.businessInformation.Business_lead', props.businessInformation.Business_lead)
                this.state = {
                    isLoaded: false,
                    responsiveWidth : window.innerWidth,
                    showSitesImpacted : false,
                    sendingData : false,
                    buss_info_id : props.projectIntake.businessInformation.buss_info_id || props.projectIntake.businessInformation.Buss_info_id || null,
                    Business_Objective : props.projectIntake.businessInformation.Business_Objective || "",
                    Outcomes_from_the_Objective : props.projectIntake.businessInformation.Outcomes_from_the_Objective || "",
                    Impact : props.projectIntake.businessInformation.Impact || "",
                    Background : props.projectIntake.businessInformation.Background ||  "",
                    Dependencies : props.projectIntake.businessInformation.Dependencies || "" ,
                    Constrains : props.projectIntake.businessInformation.Constrains ||  "",
                    Business_Model : props.projectIntake.businessInformation.Business_Model || {},
                    
                    Business_lead : props.projectIntake.businessInformation.Business_lead ||  {},  
                    Project_Purpose : props.projectIntake.businessInformation.Project_Purpose ||  "",
                    Project_Risks : props.projectIntake.businessInformation.Project_Risks ||  "",
                    
                    Line_of_Business : props.projectIntake.businessInformation.Line_of_Business ||  {
                        "label": "Select Line of Business",
                        "value": null
                    },
                    IT_Vector : props.projectIntake.businessInformation.IT_Vector ||    {
                        "label": "Select IT Vector",
                        "value": null
                    },
                    RPA : props.projectIntake.businessInformation.RPA || {
                        "label": "Select RPA",
                        "value": null
                    },
                    Region : props.projectIntake.businessInformation.Region || {
                        "label": "Select Region",
                        "value": null
                    },
                    Sites_Impacted : props.projectIntake.businessInformation.Sites_Impacted || [],
                    // Sites_Impacted : this.loadImpactedSites(props.projectIntake.businessInformation.Sites_Impacted) || [],
                    Customer : props.projectIntake.businessInformation.Customer || {},
                    Requested_by_Customer : props.projectIntake.businessInformation.Requested_by_Customer  || {},
                    Customer_Priority : props.projectIntake.businessInformation.Customer_Priority || {},
                    Estimated_Annual_Revenue : props.projectIntake.businessInformation.Estimated_Annual_Revenue ||  "",
                    Sales_Contact : props.projectIntake.businessInformation.Sales_Contact ||  "",
                    Average_number_of_users_for_this_application : props.projectIntake.businessInformation.Average_number_of_users_for_this_application ||  "",
                    FTE_Saved_per_year : props.projectIntake.businessInformation.FTE_Saved_per_year ||  "",
                    Hours_saved_per_year : props.projectIntake.businessInformation.Hours_saved_per_year ||  "",
                    Savings_revenue : props.projectIntake.businessInformation.Savings_revenue ||  "",
                    Compliance_Risk_cost_that_will_be_avoided_by_this_application : props.projectIntake.businessInformation.Compliance_Risk_cost_that_will_be_avoided_by_this_application ||  "",
                    Risk_Avoidance : props.projectIntake.businessInformation.Risk_Avoidance ||  "",
                    Savings_from_Retirement_of_Legacy_application_in_hours_per_year_by_Maintenance_Team : props.projectIntake.businessInformation.Savings_from_Retirement_of_Legacy_application_in_hours_per_year_by_Maintenance_Team ||  "",
                    Legacy_System_Infra_and_License_Fee_savings_per_year : props.projectIntake.businessInformation.Legacy_System_Infra_and_License_Fee_savings_per_year ||  "",
                    Other_Savings : props.projectIntake.businessInformation.Other_Savings ||  "",
                    // conditionalSites : this.loadImpactedSites(props.businessInformation.Sites_Impacted) || [],
                    // conditionalSites :  [],
                    checkForErrors : false,
                    isLoadedLocal : false
                }

                // this.loadImpactedSites(props.businessInformation.Sites_Impacted)
                this.onChangeSelect =  this.onChangeSelect.bind(this);
                this.onDateChange =  this.onDateChange.bind(this);
                // this.conditionalSites = this.loadConditionalValues()
                
            }

            
           


            componentDidMount() {
                const pickersWidth = '175px';
                setTimeout(() => {
                    
                    window.initializePeoplePicker('peoplePickerBusiness_lead', pickersWidth, 19);
                    window.initializePeoplePicker('peoplePickerSales_Contact', pickersWidth, 31);
                    this.fillPickers();
                 
                   if(this.state.Sites_Impacted.length > 0)
                       this.setState({showSitesImpacted : true})
                   
               }, 0);


               this.setState({
                Business_Model : this.createSelectOption(this.props.projectIntake.businessInformation.Business_Model) || this.createSelectOption(""),
                Line_of_Business : this.createSelectOption(this.props.projectIntake.businessInformation.Line_of_Business)  || this.createSelectOption(""),
                IT_Vector : this.createSelectOption(this.props.projectIntake.businessInformation.IT_Vector) || this.createSelectOption(""),
                RPA : this.createSelectOption(this.props.projectIntake.businessInformation.RPA)  || this.createSelectOption(""),
                Region : this.createSelectOption(this.props.projectIntake.businessInformation.Region)  || this.createSelectOption(""),
                Customer : this.createSelectOption(this.props.projectIntake.businessInformation.Customer) || this.createSelectOption(""),
                Requested_by_Customer : this.createSelectOption(this.props.projectIntake.businessInformation.Requested_by_Customer)  || this.createSelectOption(""),
                Customer_Priority : this.createSelectOption(this.props.projectIntake.businessInformation.Customer_Priority)  || this.createSelectOption("") ,
                isLoaded : true
            })

               

                this.formFields =  this.createFormStructure();

                this.loadConditionalValues(this.props.projectIntake.businessInformation.Region);


            }


            // --------------------------------------
            // Save Form Values before the component
            // unloads by the menu navigation
            // --------------------------------------
            componentWillUnmount() {
                
                // this.submitFormLocalData(true)

                // this.props.updateLocalBusinesInformation(data);
                
            }




                        
                     
                   

          
            

            

          
            // --------------------------------------
            // Window Resizing
            // --------------------------------------
            updateContainerDimensions = () => {
                let newWidth = window.innerWidth;
                this.setState({responsiveWidth : newWidth});
            }

            // --------------------------------------
            // Load All Sites from array
            // --------------------------------------
            loadImpactedSites(sites) {
                if( sites===undefined || !sites.length)
                    return [];

                if(Array.isArray(sites) === true)
                    return sites;


                const sitesArray =  sites.split('||')
                let sitesData = [];
                for(let sitesCounter = 0; sitesCounter<sitesArray.length; sitesCounter++) {
                    if(sitesArray[sitesCounter] !== "")
                        sitesData.push({'label' : sitesArray[sitesCounter], 'value' : sitesArray[sitesCounter]})
                }

                return sitesData;
            }


             // --------------------------------------
            // Fill SIngle Select Wtih DB Data
            // --------------------------------------
        
            prefillSelects(selectData) {
                
                if(selectData === undefined || selectData === null || selectData === "")
                    return {}

                // console.log("TCL: TechnicalEvaluation -> prefillSelects -> selectData", selectData)

                if(typeof selectData === 'object' && selectData !== null) {
                    // console.log("TCL: TechnicalEvaluation -> prefillSelects -> selectData", selectData)
                    return selectData;
                }

                let selectItem = {}
            
                if(selectData.value) {
                    selectItem = {
                        "label" : selectData.value,
                        "value" : selectData.value
                    }
                }

                else {
                    selectItem = {
                        "label" : selectData,
                        "value" : selectData
                    }
                }

                

                return selectItem;
            }


            // --------------------------------------
            // Create Default Selectio Option
            // --------------------------------------
            createSelectOption(optionValue) {
                // ? If the value is already an object, return the value
                if(typeof optionValue === 'object' && optionValue !== null)
                    return optionValue;

                // ? Create Object with the values

                const option = {
                    label : optionValue,
                    value : optionValue
                }

                return option;
            }


            // --------------------------------------
            // Create JSON Data Fields
            // --------------------------------------
            createFormStructure() {
                let usersCanEdit = false;
                let workstage = '';
                try {
                    // let workstage 

                    if(this.props.projectIntake.requirementsDefinition) {
                        if(this.props.projectIntake.requirementsDefinition.Workstage.value)
                            workstage = this.props.projectIntake.requirementsDefinition.Workstage.value
                        else if(this.props.projectIntake.requirementsDefinition.Workstage)
                            workstage = this.props.projectIntake.requirementsDefinition.Workstage
                        else
                            workstage = ''

                        
                        if(workstage === "Requested" && this.props.isPMO === false)
                            usersCanEdit = false;
                        else
                            usersCanEdit = true;
                            
                    }



                    
                    // if(this.props.requirementsDefinition.Workstage.value === "Requested" && this.props.isPMO === false)
                    //     usersCanEdit = false;
                    // else
                    //     usersCanEdit = true;
                }
                catch(error) {
                    // this.redirectUserPrev();
                }


                let sites_ImpactedValue = null ;
                // let condSites = null;
                
                if(!this.state.Sites_Impacted && this.props.projectIntake.businessInformation) {
                    // if()
                    sites_ImpactedValue = this.loadImpactedSites(this.props.projectIntake.businessInformation.Sites_Impacted)
                    // this.loadConditionalValues(this.props.businessInformation.businessInformation.region)
                }
                    
                else if(this.state.Sites_Impacted) {
                    sites_ImpactedValue = this.loadImpactedSites(this.state.Sites_Impacted)
                    // this.loadConditionalValues(this.state.Region.value)
                }
                    
                else {
                    // condSites = [];
                    sites_ImpactedValue = [];
                }


                    

                const formFields =
                [
                    {
                        "Field_Name": "Business Objective",
                        "value": this.state.Business_Objective,
                        "Field_State_Name": "Business_Objective",
                        "group": "firstHalf1",
                        "Mandatory": true,
                        "Enabled": usersCanEdit,
                        "Sequence": "12",
                        "Type": "Text",
                        // "General_Value": "Text",
                        "isTextArea" : true,
                        "max_Length" : 150,
                        "General_Value": "Text",
                        "columns" : 1,
                        "hasToolTip" : true,
                        "toolTipText" : "Objective of this project "
                    },
                    {
                        "Field_Name": "Outcomes from the Objective",
                        "value": this.state.Outcomes_from_the_Objective,
                        "Field_State_Name": "Outcomes_from_the_Objective",
                        "group": "firstHalf2",
                        "Mandatory": true,
                        "Enabled": usersCanEdit,
                        "Sequence": "13",
                        "Type": "Text",
                        "isTextArea" : true,
                        "max_Length" : 150,
                        "General_Value": "Text",
                        "columns" : 1,
                        "hasToolTip" : true,
                        "toolTipText" : "Yields and results expected from this project"
                    },
                    {
                        "Field_Name": "Impact",
                        "value": this.state.Impact,
                        "Field_State_Name": "Impact",
                        "group": "firstHalf1",
                        "Mandatory": false,
                        "Enabled": usersCanEdit,
                        "Sequence": "14",
                        "Type": "Text",
                        "isTextArea" : true,
                        "max_Length" : 150,
                        "General_Value": "Text",
                        "columns" : 1,
                        "hasToolTip" : true,
                        "toolTipText" : "Project Impact"
                    },
                    {
                        "Field_Name": "Background",
                        "value": this.state.Background,
                        "Field_State_Name": "Background",
                        "group": "firstHalf2",
                        "Mandatory": false,
                        "Enabled": usersCanEdit,
                        "Sequence": "15",
                        "Type": "Text",
                        "isTextArea" : true,
                        "max_Length" : 150,
                        "General_Value": "Text",
                        "columns" : 1,
                        "hasToolTip" : true,
                        "toolTipText" : "About the project in detail"
                    },
                    {
                        "Field_Name": "Dependencies",
                        "value": this.state.Dependencies,
                        "Field_State_Name": "Dependencies",
                        "group": "firstHalf1",
                        "Mandatory": false,
                        "Enabled": usersCanEdit,
                        "Sequence": "16",
                        "Type": "Text",
                        "isTextArea" : true,
                        "max_Length" : 150,
                        "General_Value": "Text",
                        "columns" : 1,
                        "hasToolTip" : true,
                        "toolTipText" : "Dependencies of this project"
                    },
                    {
                        "Field_Name": "Constrains",
                        "value": this.state.Constrains,
                        "Field_State_Name": "Constrains",
                        "group": "firstHalf2",
                        "Mandatory": false,
                        "Enabled": usersCanEdit,
                        "Sequence": "17",
                        "Type": "Text",
                        "isTextArea" : true,
                        "max_Length" : 150,
                        "General_Value": "Text",
                        "columns" : 1,
                        "hasToolTip" : true,
                        "toolTipText" : "Constraints of this project"
                    },
                    {
                        "Field_Name": "Business Model",
                        "value": this.state.Business_Model,
                        "Field_State_Name": "Business_Model",
                        "group": "firstHalf1",
                        "Mandatory": false,
                        "Enabled": usersCanEdit,
                        "Sequence": "18",
                        "Type": "Combo",
                        "General_Value": [
                            
                            {   
                                "label": "1- ASP (Auth Service Partner)",
                                "value": "ASP (Auth Service Partner)"
                            },
                            {
                                "label": "2 - Automation",
                                "value": "Automation"
                            },
                            {
                                "label": "3 - BTO/BTS",
                                "value": "BTO/BTS"
                            },
                            {
                                "label": "4 - CTO",
                                "value": "CTO"
                            },
                            {
                                "label": "5 - Direct Fulfilment",
                                "value": "Direct Fulfilment"
                            },
                            {
                                "label": "6 - DOF",
                                "value": "DOF"
                            },
                            {
                                "label": "7 - e-Commerce",
                                "value": "e-Commerce"
                            },
                            {
                                "label": "8 -IntegratonServices",
                                "value": "IntegratonServices"
                            },
                            {
                                "label": "9 - Reverse Logistics",
                                "value": "Reverse Logistics"
                            },
                            {
                                "label": "10 - RMA",
                                "value": "RMA"
                            },
                            {
                                "label": "11 - Sketch to Scale and Other",
                                "value": "Sketch to Scale and Other"
                            },
                            {
                                "label": "12 - SPL (Spare Parts Logistics)",
                                "value": "SPL (Spare Parts Logistics)"
                            },
                            {
                                "label": "13 - Other",
                                "value": "Other"
                            }
                        ],
                        // "columns" : 2,
                        "columns" : 1,
                        "hasToolTip" : true,
                        "allowFilter" : true,
                        "toolTipText" : "Detailed business model for user understanding ",
                        "extraWideControl" : true
                    },
                    {
                        "Field_Name": "Business lead",
                        "value": this.state.Business_lead,
                        "Field_State_Name": "Business_lead",
                        "group": "firstHalf2",
                        "Mandatory": true,
                        "Enabled": usersCanEdit,
                        "Sequence": "19",
                        "Type": "PeoplePicker",
                        "General_Value": [],
                        "columns" : 1,
                        "hasToolTip" : true,
                        "toolTipText" : "Name of the Business Lead (Autopick from employee)",
                        // "wideControl" : true
                    },
                    {
                        "Field_Name": "Project Purpose",
                        "value": this.state.Project_Purpose,
                        "Field_State_Name": "Project_Purpose",
                        "group": "secondHalf1",
                        "Mandatory": true,
                        "Enabled": usersCanEdit,
                        "Sequence": "20",
                        "Type": "Text",
                        "isTextArea" : true,
                        "max_Length" : 150,
                        "General_Value": "Text",
                        "columns" : 1,
                        "hasToolTip" : true,
                        "toolTipText" : "Purpose of this project for the organization"
                    },
                    {
                        "Field_Name": "Project Risks",
                        "value": this.state.Project_Risks,
                        "Field_State_Name": "Project_Risks",
                        // "group": "secondHalf2",
                        "group": this.state.responsiveWidth <= 1440 ? "secondHalf1" : "secondHalf2",
                        "Mandatory": false,
                        "Enabled": usersCanEdit,
                        "Sequence": "21",
                        "Type": "Text",
                        "isTextArea" : true,
                        "max_Length" : 150,
                        "General_Value": "Text",
                        "columns" : 1,
                        "hasToolTip" : true,
                        "toolTipText" : "Specify the project risks"
                    },
                    {
                        "Field_Name": "Line of Business",
                        "value": this.state.Line_of_Business,
                        "Field_State_Name": "Line_of_Business",
                        "group": "secondHalf1",
                        "Mandatory": true,
                        "Enabled": usersCanEdit,
                        "Sequence": "22",
                        "Type": "Combo",
                        "General_Value": [
                            {
                                "label": "1.- New Ventures - CTG (Britt)",
                                "value": "New Ventures - CTG (Britt)"
                            },
                            {
                                "label": "2.- New Ventures - GOPS (Barbier)",
                                "value": "New Ventures - GOPS (Barbier)"
                            },
                            {
                                "label": "3.- New Ventures -HRS Med (Humphries)",
                                "value": "New Ventures -HRS Med (Humphries)"
                            },
                            {
                                "label": "4.- FIS - CEC (Britt)",
                                "value": "FIS - CEC (Britt)"
                            },
                            {
                                "label": "5.- FIS - Components (Britt)",
                                "value": "FIS - Components (Britt)"
                            },
                            {
                                "label": "6.- FIS - CTG (Britt)",
                                "value": "FIS - CTG (Britt)"
                            },
                            {
                                "label": "7.- FIS - GSS (Britt)",
                                "value": "FIS - GSS (Britt)"
                            },
                            {
                                "label": "8.- FIS - Industrial (Britt)",
                                "value": "FIS - Industrial (Britt)"
                            },
                            {
                                "label": "9.- FIS - Power (Britt)",
                                "value": "FIS - Power (Britt)"
                            },
                            {
                                "label": "10.- Flex Building Group (Hopkins)",
                                "value": "Flex Building Group (Hopkins)"
                            },
                            {
                                "label": "11.- HRS - AGM (Humphries)",
                                "value": "HRS - AGM (Humphries)"
                            },
                            {
                                "label": "12.- HRS - Automotive (Humphries)",
                                "value": "HRS - Automotive (Humphries)"
                            },
                            {
                                "label": "13.- HRS - DE&I (Humphries)",
                                "value": "HRS - DE&I (Humphries)"
                            },
                            {
                                "label": "14.- HRS - Health Solutions (Humphries)",
                                "value": "HRS - Health Solutions (Humphries)"
                            },
                            {
                                "label": "15.- HRS - Mechanicals (Humphries)",
                                "value": "HRS - Mechanicals (Humphries)"
                            },
                            {
                                "label": "16.- HRS - Mirror Controls International (Humphries)",
                                "value": "HRS - Mirror Controls International (Humphries)"
                            },
                            {
                                "label": "17.- HRS - Precision Plastics Group (Humphries)",
                                "value": "HRS - Precision Plastics Group (Humphries)"
                            },
                            {
                                "label": "18.- IDE8 (Shaibel)",
                                "value": "IDE8 (Shaibel)"
                            },
                            {
                                "label": "19.- Mech Asia (Zebe)",
                                "value": "Mech Asia (Zebe)"
                            },
                            {
                                "label": "20.-Multek (Lize)",
                                "value": "Multek (Lize)"
                            },
                            {
                                "label": "21.- Segment - Other",
                                "value": "Segment - Other"
                            },
                            {
                                "label": "22.- Corp Management (Advaithi)",
                                "value": "Corp Management (Advaithi)"
                            },
                            {
                                "label": "23.- Ethics & Compliance (Wolf)",
                                "value": "Ethics & Compliance (Wolf)"
                            },
                            {
                                "label": "24.- Facilities (Baldassari)",
                                "value": "Facilities (Baldassari)"
                            },
                            {
                                "label": "25.- Finance (Collier)",
                                "value": "Finance (Collier)"
                            },
                            {
                                "label": "26.- Global Ops (Bechor & Tan)",
                                "value": "Global Ops (Bechor & Tan)"
                            },
                            {
                                "label": "27.- Global Ops EQE (Doiron)",
                                "value": "Global Ops EQE (Doiron)"
                            },
                            {
                                "label": "28.- Global Ops EQE GBSE (Doiron)",
                                "value": "Global Ops EQE GBSE (Doiron)"
                            },
                            {
                                "label": "29.- Global Ops FB (Barbier)",
                                "value": "Global Ops FB (Barbier)"
                            },
                            {
                                "label": "30.- Global Ops TM (Mannion)",
                                "value": "Global Ops TM (Mannion)"
                            },
                            {
                                "label": "31.- Global Ops TR (Rodrig)",
                                "value": "Global Ops TR (Rodrig)"
                            },
                            {
                                "label": "32.- Global Procurement (Linton)",
                                "value": "Global Procurement (Linton)"
                            },
                            {
                                "label": "33.- Global Procurement Logistics (Linton)",
                                "value": "Global Procurement Logistics (Linton)"
                            },
                            {
                                "label": "34.- Global Procurement Mgmt (Linton)",
                                "value": "Global Procurement Mgmt (Linton)"
                            },
                            {
                                "label": "35.- Global Procurement Planning (Linton)",
                                "value": "Global Procurement Planning (Linton)"
                            },
                            {
                                "label": "36.- Innovative Technology (Humphries)",
                                "value": "Innovative Technology (Humphries)"
                            },
                            {
                                "label": "37.- IT (Shahin)",
                                "value": "IT (Shahin)"
                            },
                            {
                                "label": "38.- Legal (Offer)",
                                "value": "Legal (Offer)"
                            },
                            {
                                "label": "39.- Legal Brand Protecion & Security (Offer)",
                                "value": "Legal Brand Protecion & Security (Offer)"
                            },
                            {
                                "label": "40.- Marketing (Holman)",
                                "value": "Marketing (Holman)"
                            },
                            {
                                "label": "41.- PAR (Baldassari)",
                                "value": "PAR (Baldassari)"
                            }
                        ],
                        "columns" : 2,
                        "hasToolTip" : true,
                        "toolTipText" : "Pick from the drop-down",
                        "allowFilter" : true,
                        "wideControl" : true
                    },
                    {
                        "Field_Name": "IT Vector",
                        "value": this.state.IT_Vector,
                        "Field_State_Name": "IT_Vector",
                         // "group": "secondHalf2",
                        "group": this.state.responsiveWidth <= 1440 ? "secondHalf1" : "secondHalf2",
                        "Mandatory": true,
                        "Enabled": usersCanEdit,
                        "Sequence": "23",
                        "Type": "Combo",
                        "General_Value": [
                            // {
                            //     "label": "Select IT Vector",
                            //     "value": ""
                            // },
                            {
                                "label": "1 - Strengthen and leverage our ecosystems",
                                "value": "Strengthen and leverage our ecosystems"
                            },
                            {
                                "label": "2 - Optimize sketch-to-scale performance",
                                "value": "Optimize sketch-to-scale performance"
                            },
                            {
                                "label": "3 - Enhance operational capabilities",
                                "value": "Enhance operational capabilities"
                            },
                            {
                                "label": "4 - Engage global workforce",
                                "value": "Engage global workforce"
                            },
                            {
                                "label": "5 - Upgrade customer engagement model",
                                "value": "Upgrade customer engagement model"
                            },
                            {
                                "label": "6 - Drive superior cost performance",
                                "value": "Drive superior cost performance"
                            },
                            {
                                "label": "7 - Execute on core compliance",
                                "value": "Execute on core compliance"
                            }
                        ],
                        "columns" : 2,
                        "hasToolTip" : true,
                        "toolTipText" : "Click me to Open Details",
                        "wideControl": true
                    },
                    {
                        "Field_Name": "RPA?",
                        "value": this.state.RPA,
                        "Field_State_Name": "RPA",
                        "group": "secondHalf1",
                        "Mandatory": true,
                        "Enabled": usersCanEdit,
                        "Sequence": "24",
                        "Type": "Combo",
                        "General_Value": [
                            // {
                            //     "label": "Select RPA",
                            //     "value": ""
                            // },
                            {"label" :"Yes" , "value": "yes" },
                            {"label" :"No" , "value": "no" }
                        ],
                        "columns" : 2,
                        "hasToolTip" : true,
                        "toolTipText" : "Indicate if it is a project related to a Robot Process Automation.",
                        "allowFilter" : false
                    },
                    {
                        "Field_Name": "Region",
                        "value": this.state.Region,
                        "Field_State_Name": "Region",
                        // "group": "secondHalf2",
                        "group": this.state.responsiveWidth <= 1440 ? "secondHalf1" : "secondHalf2",
                        // "group": "secondHalf1",
                        "Mandatory": true,
                        "Enabled": usersCanEdit,
                        "Sequence": "25",
                        "Type": "Combo",
                        "General_Value": [
                            {
                                "label": "Americas",
                                "value": "Americas"
                            },
                            {
                                "label": "EMEA",
                                "value": "EMEA"
                            },
                            {
                                "label": "Asia",
                                "value": "Asia"
                            },
                            // {
                            //     "label": "Global",
                            //     "value": "Global"
                            // }
                        ],
                        "columns" : 2,
                        "hasToolTip" : true,
                        "toolTipText" : "Autopick from the drop-down. Flex region where this project will be implemented.",
                        "allowFilter" : false
                    },
                    {
                        "Field_Name": "Sites Impacted",
                        "value":  sites_ImpactedValue,
                        // "value":  this.state.Sites_Impacted,
                        "Field_State_Name": "Sites_Impacted",
                        // "group": "secondHalf1",
                        "group": this.state.responsiveWidth <= 1440 ? "secondHalf1" : "secondHalf2",
                        // "group": "secondHalf2",
                        "Mandatory": true,
                        "Enabled": usersCanEdit,
                        "Sequence": "26",
                        "Type": "DynamicField",
                        "General_Value": this.state.conditionalSites,
                        
                        // "General_Value" : condSites,
                        // "visible" : this.state.showSitesImpacted,
                        "visible" : true,
                        "columns" : 2,
                        "isMulti" : true,
                        "hasToolTip" : true,
                        "toolTipText" : "Sites impacted for this project implementation",
                        "extraWideControl":true,
                        "allowFilter" : true
                    },
                    {
                        "Field_Name": "Customer",
                        "value": this.state.Customer,
                        "Field_State_Name": "Customer",
                        "group": "third1",
                        "Mandatory": true,
                        "Enabled": usersCanEdit,
                        "Sequence": "27",
                        "Type": "Combo",
                        "General_Value": CustomerValues,
                        "columns" : 2,
                        "hasToolTip" : true,
                        "toolTipText" : "Customers names involved for this project",
                        "wideControl":true,
                        "allowFilter" : true
                    },
                    {
                        "Field_Name": "Requested by Customer?",
                        "value": this.state.Requested_by_Customer,
                        "Field_State_Name": "Requested_by_Customer",
                        "group": "third2",
                        "Mandatory": true,
                        "Enabled": usersCanEdit,
                        "Sequence": "28",
                        "Type": "Combo",
                        "General_Value": [
                            // {
                            //     "label": "Select Request",
                            //     "value": ""
                            // },
                            {"label" :"Yes" , "value": "yes" },
                            {"label" :"No" , "value": "no" }
                        ],
                        // "columns" : 2,
                        "columns" : this.state.responsiveWidth <=1440 ? 1 : 2,
                        "extraWideControl":false,
                        "hasToolTip" : true,
                        "toolTipText" : "Indicates if this requirement was requested by customer."
                    },
                    {
                        "Field_Name": "Customer Priority",
                        "value": this.state.Customer_Priority,
                        "Field_State_Name": "Customer_Priority",
                        "group": "third3",
                        "Mandatory": true,
                        "Enabled": usersCanEdit,
                        "Sequence": "29",
                        "Type": "Combo",
                        "General_Value": [
                            // {
                            //     "label": "Select Priority",
                            //     "value": ""
                            // },
                            {"label" :"High" , "value": "High" },
                            {"label" :"Medium" , "value": "Medium" },
                            {"label" :"Low" , "value": "Low" }
                        ],
                        // "columns" : 2,
                        "columns" : this.state.responsiveWidth <=1440 ? 2 : 1,
                        "hasToolTip" : true,
                        "toolTipText" : "Pick from drop-down.",
                        "allowFilter" : false,
                        "extraWideControl":true
                    },
                    {
                        "Field_Name": "Estimated Annual Revenue (EAR)",
                        "value": this.state.Estimated_Annual_Revenue,
                        "Field_State_Name": "Estimated_Annual_Revenue",
                        "group": "fourthHalf1",
                        "Mandatory": true,
                        "Enabled": usersCanEdit,
                        "Sequence": "30",
                        "Type": "Decimal",
                        "General_Value": "$",
                        // "columns" : 2,
                        "columns" : this.state.responsiveWidth <=1440 ? 1 : 2,
                        "hasToolTip" : true,
                        "toolTipText" : "Revenue from the project"
                    },
                    {
                        "Field_Name": "Sales Contact",
                        "value": this.state.Sales_Contact,
                        "Field_State_Name": "Sales_Contact",
                        "group": "fourthHalf2",
                        "Mandatory": true,
                        "Enabled": usersCanEdit,
                        "Sequence": "31",
                        "Type": "PeoplePicker",
                        "General_Value": [],
                        // "columns" : 1,
                        "columns" : this.state.responsiveWidth <=1440 ? 1 : 2,
                        "hasToolTip" : true,
                        "toolTipText" : "Contact Person Details"
                    },
                    {
                        "Field_Name": "Average number of users for this application",
                        "value": this.state.Average_number_of_users_for_this_application,
                        "Field_State_Name": "Average_number_of_users_for_this_application",
                        "group": "fourthHalf1",
                        "Mandatory": false,
                        "Enabled": usersCanEdit,
                        "Sequence": "32",
                        "Type": "Integer",
                        "General_Value": "$",
                        // "columns" : 2,
                        "columns" : this.state.responsiveWidth <=1440 ? 1 : 2,
                        "hasToolTip" : true,
                        "toolTipText" : "Number of application users"
                    },
                    {
                        "Field_Name": "FTE Saved per year",
                        "value": this.state.FTE_Saved_per_year,
                        "Field_State_Name": "FTE_Saved_per_year",
                        "group": "fourthHalf2",
                        "Mandatory": false,
                        "Enabled": usersCanEdit,
                        "Sequence": "33",
                        "Type": "Decimal",
                        "General_Value": "0",
                        // "columns" : 2,
                        "columns" : this.state.responsiveWidth <=1440 ? 1 : 2,
                        "hasToolTip" : true,
                        "toolTipText" : "Number of saved persons when implementation is completed."
                    },
                    {
                        "Field_Name": "Hours saved per year",
                        "value": this.state.Hours_saved_per_year,
                        "Field_State_Name": "Hours_saved_per_year",
                        "group": "fourthHalf1",
                        "Mandatory": false,
                        "Enabled": usersCanEdit,
                        "Sequence": "34",
                        "Type": "Integer",
                        "General_Value": "0",
                        // "columns" : 2,
                        "columns" : this.state.responsiveWidth <=1440 ? 1 : 2,
                        "hasToolTip" : true,
                        "toolTipText" : "Number of saved hours of process when implementation is completed."
                    },
                    {
                        "Field_Name": "Savings revenue",
                        "value": this.state.Savings_revenue,
                        "Field_State_Name": "Savings_revenue",
                        "group": "fourthHalf2",
                        "Mandatory": false,
                        "Enabled": usersCanEdit,
                        "Sequence": "35",
                        "Type": "Decimal",
                        "General_Value": "$",
                        // "columns" : 2,
                        "columns" : this.state.responsiveWidth <=1440 ? 1 : 2,
                        "hasToolTip" : true,
                        "toolTipText" : "Savings once implementation completed. "
                    },
                    {
                        "Field_Name": "Compliance / Risk cost that will be avoided by this application.",
                        "value": this.state.Compliance_Risk_cost_that_will_be_avoided_by_this_application,
                        "Field_State_Name": "Compliance_Risk_cost_that_will_be_avoided_by_this_application",
                        "group": "fourthHalf1",
                        "Mandatory": false,
                        "Enabled": usersCanEdit,
                        "Sequence": "36",
                        "Type": "Decimal",
                        "General_Value": "$",
                        // "columns" : 2,
                        "columns" : this.state.responsiveWidth <=1440 ? 1 : 2,
                        "hasToolTip" : true,
                        "toolTipText" : "Numbers"
                    },
                    {
                        "Field_Name": "Risk Avoidance",
                        "value": this.state.Risk_Avoidance,
                        "Field_State_Name": "Risk_Avoidance",
                        "group": "fourthHalf2",
                        "Mandatory": false,
                        "Enabled": usersCanEdit,
                        "Sequence": "37",
                        "Type": "Decimal",
                        "General_Value": "$",
                        // "columns" : 2,
                        "columns" : this.state.responsiveWidth <=1440 ? 1 : 2,
                        "hasToolTip" : true,
                        "toolTipText" : "Numbers"
                    },
                    {
                        "Field_Name": "Savings from Retirement of Legacy application in hours per year by Maintenance Team ?",
                        "value": this.state.Savings_from_Retirement_of_Legacy_application_in_hours_per_year_by_Maintenance_Team,
                        "Field_State_Name": "Savings_from_Retirement_of_Legacy_application_in_hours_per_year_by_Maintenance_Team",
                        "group": "fourthHalf1",
                        "Mandatory": false,
                        "Enabled": usersCanEdit,
                        "Sequence": "38",
                        "Type": "Decimal",
                        "General_Value": "$",
                        // "columns" : 2,
                        "columns" : this.state.responsiveWidth <=1440 ? 1 : 2,
                        "hasToolTip" : true,
                        "toolTipText" : "Numbers"
                    },
                    {
                        "Field_Name": "Legacy System Infra and License Fee savings per year ?",
                        "value": this.state.Legacy_System_Infra_and_License_Fee_savings_per_year,
                        "Field_State_Name": "Legacy_System_Infra_and_License_Fee_savings_per_year",
                        "group": "fourthHalf2",
                        "Mandatory": false,
                        "Enabled": usersCanEdit,
                        "Sequence": "39",
                        "Type": "Decimal",
                        "General_Value": "$",
                        // "columns" : 2,
                        "columns" : this.state.responsiveWidth <=1440 ? 1 : 2,
                        "hasToolTip" : true,
                        "toolTipText" : "Numbers"
                    },
                    {
                        "Field_Name": "Other Savings",
                        "value": this.state.Other_Savings,
                        "Field_State_Name": "Other_Savings",
                        "group": "fourthHalf2",
                        "Mandatory": false,
                        "Enabled": usersCanEdit,
                        "Sequence": "40",
                        "Type": "Decimal",
                        "General_Value": "$",
                        // "columns" : 2,
                        "columns" : this.state.responsiveWidth <=1440 ? 1 : 2,
                        "hasToolTip" : true,
                        "toolTipText" : "Numbers"
                    }
                ]

                return formFields;
            }



            // --------------------------------------
            // Force Re-render of Selects
            // --------------------------------------
            updateSelectsOnComponentLoad() {
                // ?Get Selec Inputs


             
              
               
                // console.log(this.newMethod(), this.props)

                if(this.props.loadedBusinessInformation.businessInformation) {
                        
                    try {
                        this.formFields && this.formFields.forEach(formItem => {
                            if(formItem.Type === "Combo")  {


                                

                                // ? Get element By Id
                                let selElement = document.getElementById(formItem.Field_State_Name);
                                    

                                let reactSelectInput = null;

                                if(formItem.extraWideControl) {
                                    reactSelectInput = selElement.querySelector('.react-select-extra-wide__placeholder');
                                    if(reactSelectInput === null)
                                        reactSelectInput = selElement.querySelector('.react-select-extra-wide__single-value')
                                }
                                   
                                else if(formItem.wideControl) {
                                    reactSelectInput = selElement.querySelector('.react-select-wide__placeholder');
                                    if(reactSelectInput === null)
                                        reactSelectInput = selElement.querySelector('.react-select-wide__single-value')
                                }
                                    
                                else {

                                    reactSelectInput = selElement.querySelector('.react-select__placeholder');
                                    if(reactSelectInput === null)
                                        reactSelectInput = selElement.querySelector('.react-select__single-value')
                                }
                                    
                                

                                let propsName =  formItem.Field_State_Name.toLocaleLowerCase()
                                
                                

                                if(reactSelectInput) {
                                    if(propsName === 'requested_by_customer')
                                        reactSelectInput.innerText = this.props.loadedBusinessInformation.businessInformation['requested_by']
                                    else
                                        reactSelectInput.innerText = this.props.loadedBusinessInformation.businessInformation[propsName]
                                    
                                }
                            }

                           
                        });
                    }
                    catch (error) {
                    console.log("TCL: updateSelectsOnComponentLoad -> error", error)
                        
                    }
                }

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
            // --------------------------------------
            // onChangeSelect = (selectedOption) =>{
            onChangeSelect(control, selectedOption) {
				
                if(control === "Region" ) {
                    this.state.showSitesImpacted === false && this.setState({showSitesImpacted : true});
                    this.loadConditionalValues(selectedOption.value);
                }
                    
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
            // Get Data From People Picker
            // peoplePickerBusiness_lead_TopSpan_HiddenInput
            // --------------------------------------
            getPeoplePickerData(peoplePicker) {
              try {
                const pickerName = `peoplePicker${peoplePicker}_TopSpan_HiddenInput`
                if( !document.getElementById(pickerName) )
                    return null;

                const pickerValue = document.getElementById(pickerName).value;
                if(pickerValue === "" || pickerValue === "[]" || pickerValue === [] ) 
                    return null;
                else
                {
                    const picker = JSON.parse(pickerValue) || {};
                    return picker[0].Description;
                }
                
              }
              catch(error) {
                console.log("TCL: getPeoplePickerData -> error", error)
                  
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
               try {
                    if (this.props.projectIntake.businessInformation !== undefined) {
                        const {Business_lead, Sales_Contact} = this.props.projectIntake.businessInformation;
                    
                        if(Business_lead)
                            window.fillPeoplePicker(Business_lead, 'Business_lead');
                        if(Sales_Contact)
                            window.fillPeoplePicker(Sales_Contact, 'Sales_Contact');
                    }

                    // Add Tab Index
                    if ( document.getElementById('peoplePickerBusiness_lead_TopSpan_EditorInput') )
                        document.getElementById('peoplePickerBusiness_lead_TopSpan_EditorInput').tabIndex = 19;
                        
                    if (document.getElementById('peoplePickerSales_Contact_TopSpan_EditorInput'))
                        document.getElementById('peoplePickerSales_Contact_TopSpan_EditorInput').tabIndex = 31;
               }
               catch(error) {
                    console.log("TCL: fillPickers -> error", error)
                   
               }
                
            }


            disablePickers() {
                if (this.props.projectIntake.businessInformation !== undefined) {
                    if(this.props.requirementsDefinition.workstage === 'Requested' && this.props.isPMO === false) {
                        window.disablePickers();
                    }
                }

            }

            // --------------------------------------
            // Validate Empty People Pickers
            // TODO Remove empty pp validation
            // --------------------------------------
            validatePeoplePicker(pickerName) {
                let isValid = true;

                if(!document.getElementById(`peoplePicker${pickerName}_TopSpan_HiddenInput`))
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
            // Reset State
            // If PMO, DOnt
            // Normal User, reset Req && Bus
            // --------------------------------------
            resetState() {
              
                this.props.resetRequirementsState(); 
                this.props.resetBusinessState();
                this.props.resetTechnicalState();
                this.props.resetPMOEvaluationState();
                this.props.resetROIRealizedState();
  
            }


        /* ==========================================================================
        ** Save Values
        ** ========================================================================== */


                // --------------------------------------
                // Validate Form Inputs
                // --------------------------------------
                validateFormInputs() {
                    const fields = this.formFields;
                    
                    if(!fields || fields.length <= 0 )
                        return;

                    let errors = fields && fields.map((fieldItem) => {
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
                    const errorsCount = errors && errors.filter(error=>{return error===true}).length
					//console.log('TCL: validateFormInputs -> errorsCount', errorsCount)

                    return errorsCount > 0 ?  false : true
                    
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
                // Save Form Values
                // --------------------------------------
                saveFormValues (projectID = null) {
                    console.log("TCL: BusinessInformation -> saveFormValues -> projectID", projectID)
                    //! const currentUser = window.getCurrentSPUser();


                    // requestID = projId.substr(projId.indexOf('D')+1,projId.length);    
                    // const projId = this.props.requirementsDefinition.newProjectID || projectID;
                    

                    // const requestID = this.props.projectID || this.getProjectID();
                    // const requestID = projId.substr(projId.indexOf('D')+1,projId.length);


                    
                    // this.props.projectIntake.requirementsDefinition
                    console.log("TCL: BusinessInformation -> saveFormValues -> this.props.projectIntake.requirementsDefinition", this.props.projectIntake.requirementsDefinition)
                            
                    // }

                    let reqWorkstage = ''
                    try {

                        // if( this.props.requirementsDefinition !== undefined ||  !isEmpty(this.props.requirementsDefinition))
                        //     reqWorkstage =  this.props.requirementsDefiniton.Workstage.value || this.props..requirementsDefinition.workstage

                        if(this.props.projectIntake.requirementsDefinition) {
                        

                            if(this.props.projectIntake.requirementsDefinition &&  this.props.projectIntake.requirementsDefinition.Workstage !== "")
                                reqWorkstage =  reqWorkstage = this.props.projectIntake.requirementsDefinition.Workstage  
                            else if(this.props.projectIntake.requirementsDefinition.Workstage.value)
                                reqWorkstage = this.props.requirementsDefinition.Workstage.value
                             else
                                reqWorkstage = ' '
                        }
                       
                    }
                    catch(error) {
                    console.log("TCL: BusinessInformation -> //componentDidMount -> error", error)
                        
                        reqWorkstage = ''
                    }
                    

                    

                    console.log("TCL: saveFormValues -> reqWorkstage", reqWorkstage)

                    const requestID = this.getProjectID();
                    const businessID = this.state.buss_info_id || this.props.projectIntake.businessInformation.Buss_info_id || this.props.projectIntake.businessInformation.buss_info_id
                    console.log("TCL: BusinessInformation -> //componentDidMount -> businessID", businessID)

                    // const { Workstage } = this.props.projectIntake.requirementsDefinition
                    
                    
                    


                    const formData = {
                        Project_ID : requestID,
                        buss_info_id : businessID,
                        Business_Objective :  this.state.Business_Objective,
                        Outcomes_from_the_Objective :  this.state.Outcomes_from_the_Objective,
                        Impact :  this.state.Impact,
                        Background :  this.state.Background,
                        Dependencies :  this.state.Dependencies,
                        Constrains :  this.state.Constrains,
                        Business_Model :  this.state.Business_Model,
                        Business_lead :  this.getPeoplePickerData('Business_lead') || 'alan.medina@flex.com',
                        Project_Purpose :  this.state.Project_Purpose,
                        Project_Risks :  this.state.Project_Risks,
                        Line_of_Business :  this.state.Line_of_Business,
                        IT_Vector :  this.state.IT_Vector,
                        RPA :  this.state.RPA,
                        Region :  this.state.Region,
                        Sites_Impacted :  this.state.Sites_Impacted,
                        Customer :  this.state.Customer,
                        Requested_by_Customer :  this.state.Requested_by_Customer,
                        Customer_Priority :  this.state.Customer_Priority,
                        Estimated_Annual_Revenue :  this.state.Estimated_Annual_Revenue,
                        Sales_Contact :  this.getPeoplePickerData('Sales_Contact') || 'alan.medina@flex.com',
                        Average_number_of_users_for_this_application :  this.state.Average_number_of_users_for_this_application,
                        FTE_Saved_per_year :  this.state.FTE_Saved_per_year,
                        Hours_saved_per_year :  this.state.Hours_saved_per_year,
                        Savings_revenue :  this.state.Savings_revenue,
                        Compliance_Risk_cost_that_will_be_avoided_by_this_application :  this.state.Compliance_Risk_cost_that_will_be_avoided_by_this_application,
                        Risk_Avoidance :  this.state.Risk_Avoidance,
                        Savings_from_Retirement_of_Legacy_application_in_hours_per_year_by_Maintenance_Team :  this.state.Savings_from_Retirement_of_Legacy_application_in_hours_per_year_by_Maintenance_Team,
                        Legacy_System_Infra_and_License_Fee_savings_per_year :  this.state.Legacy_System_Infra_and_License_Fee_savings_per_year,
                        Other_Savings :  this.state.Other_Savings,
                        Created_by : currentUser.userEmail,
                        Workstage : reqWorkstage === 'New' ? 'Requested' : reqWorkstage,
                        
                        Last_modifed_by : currentUser.userEmail
                    }
                    console.log("TCL: BusinessInformation -> //componentDidMount -> formData", formData)

                    return formData;
                }
                


                // --------------------------------------
                // Submit Form
                // --------------------------------------
                submitFormLocalData = (exitFromMenu =  false) => {
                  
                    if(this.state.sendingData === true)
                        return;

                    
                    if(this.validateFormInputs() === false) {
                        this.createErrorAlertTop('Please Fill all the Required Fields');
                        this.setState({checkForErrors: true})
                        return;
                    };


                    const formData = this.saveFormValues();
                    this.props.updateProjectIntakeValues('business',formData)
                    
                    
					
                    
                    //? Show Sucess Message if 
                        

                        if(exitFromMenu !== true) {
                            this.createSuccessAlert('Data Saved Locally');
                            this.redirectUser();
                        }

                       
                }


                // --------------------------------------
                // Save Values When Returning to Prev Step
                // --------------------------------------   
                submitFormLocalDataReturn = (event) => {
                    // const prevStep = '/add-project/requirement-definition';
                    // const formData = this.saveFormValues();

                    // this.props.saveLocalBusiness(formData);
                
                    //console.log('TCL: submitFormLocalData -> formData', formData)

                    if(this.state.sendingData === true)
                        return;

                    this.redirectUserPrev();
                }



                // --------------------------------------
                // Update Current Busines
                // --------------------------------------
                updateCurrentBusiness = () => {
                    const formData = this.saveFormValues();
                    
                    console.log("TCL: BusinessInformation -> updateCurrentBusiness -> formData before", formData)

                    updateBusinesInformationDB(formData).then(()=>{
                        console.log("TCL: BusinessInformation -> updateCurrentBusiness -> formData after", formData)
                        this.createSuccessAlert('Data Updated ');
                        // Check If Action was Success
                        // const response = this.props.businessInformation.businessInformationId;
						
                        
                        
                        // this.setState({sendingData : false}, this.redirectUser())

                        this.setState({sendingData : false})


                        // this.props.resetBusinessState();

                        // this.props.updateLocalBusinesInformation(formData);

                         // ? Update Props
                         this.props.updateProjectIntakeValues('business',formData, null, true)
                                
                        
                    })
                    .catch((error)=> {
                    console.log("TCL: updateCurrentBusiness -> error", error)
                        this.createErrorAlert('There was a problem saving the data, please try again ');
						
                        this.setState({sendingData : false},)
                    })
                }


                // --------------------------------------
                // Create New Business 
                // --------------------------------------
                saveNewBusinessDB = (isRequirementViewSaved, requirementsDefinition) => {
                    
                    // Look if Requirements Were Saved

                    if(isRequirementViewSaved === false) {


                        let reqToSave = null;

                        // ? Set New Workstage Value
                        if(requirementsDefinition.Workstage === 'New' || requirementsDefinition.Workstage.value === 'New' ) {
                               // ? Change Workstage from Req Object
                               reqToSave = Object.assign({},requirementsDefinition , {
                                Workstage : {"label" : "2 - Requested" , "value": "Requested" }
                            }) 
                        }
                        else
                            reqToSave = requirementsDefinition



                        saveRequirementsDB(reqToSave).then((newRequirementsID)=>{

                            console.log("TCL: BusinessInformation -> saveNewBusinessDB -> newRequirementsID", newRequirementsID)
                        
                            // Check If Action was Success
                                // Get Project ID and Then Save Second Tab

                                const formData = this.saveFormValues();
                                    // const newProjectID = this.props.requirementsDefinition.newProjectID
                                    
                                    // ? Save Business

                                    saveBusinesInformationDB(formData).then(()=>{
                                        this.createSuccessAlert('Data Saved ');
                                        // Check If Action was Success
                                        // const response = this.props.businessInformation.businessInformationId;
                                        
                                        

                                        this.props.updateProjectIntakeValues('business',formData, null, true)

                                        this.setState({sendingData : false})
                                        this.setState({sendingData : false}, this.redirectUser())


                                        // this.props.resetBusinessState();

                                        // ? Update Req Props
                                        let reqWithID = Object.assign({}, reqToSave , {
                                            Project_id : newRequirementsID.indexOf('D') >= 0 ?  newRequirementsID.substr(newRequirementsID.indexOf('D')+1,newRequirementsID.length) : newRequirementsID ,
                                            Request_ID : newRequirementsID,
                                            updateWorkstage : true
                                        }) 
                                        this.props.updateProjectIntakeValues('requirements',reqWithID, null, true)

                                        
                                        
                                    })
                                    .catch((error)=> {
                                        console.log("TCL: saveNewBusinessDB -> error", error)
                                        this.createErrorAlert('There was a problem saving the data, please try again ');
                                        
                                        this.setState({sendingData : false},)
                                    })
                            })
                            .catch((error)=> {
                            console.log("TCL: error", error)
                                this.createErrorAlert('There was a problem saving the data, please try again ');
                                
                                this.setState({sendingData : false})
                            })
                    }
                    else {
                        //? Just Save Business Info
                        const formData = this.saveFormValues();
                        // const projectID = this.props.requirementsDefinition.newProjectID;
                        
                        

                        saveBusinesInformationDB(formData).then((newBusinessID)=>{

                            //? Check If Action was Success
                            
                            console.log("TCL: BusinessInformation -> saveNewBusinessDB -> newBusinessID", newBusinessID)

                            formData.buss_info_id = newBusinessID;
                            
                            
                            this.props.updateProjectIntakeValues('business',formData, null, true)


                            this.createSuccessAlert('Data Saved ');
                            
                            
                            this.setState({sendingData : false}, this.redirectUser())



                            
                            
                        })
                        .catch((error)=> {
                            this.createErrorAlert('There was a problem saving the data, please try again ');
                            
                            this.setState({sendingData : false},)
                        })
                    }

                    

                }


                // --------------------------------------
                // Submit Form to DB
                // --------------------------------------
                submitFormDB = (event) => {

                    if(this.state.sendingData === true)
                        return;

                    // Validate Empty Fields
                    if(this.validateFormInputs() === false) {
                        this.createErrorAlertTop('Please Fill all the Required Fields');
                        this.setState({checkForErrors: true})
                        return;
                    }
                    

                    this.setState({sendingData : true})

                    // Check if is Update or New Business

                    const { Buss_info_id, buss_info_id } = this.props.projectIntake.businessInformation;
                    const {requirementsDefinition} = this.props.projectIntake;
                    const { savedOnDB } = requirementsDefinition;
                    const { projectID } = this.props.locationData.match.params;

                    if(Buss_info_id || buss_info_id || this.state.isSavedonDB === true) {
						
                        // ? Update Current Business
                        
                        this.updateCurrentBusiness();
                        // this.setState({checkForErrors: false})
                    }
                    else {
                        
                        //? Add New Business
                        this.saveNewBusinessDB(savedOnDB, requirementsDefinition);
                        this.setState({checkForErrors: false})
                    }

                    this.saveOtherTabs(projectID);


                  
                }

                // !--------------------------------------
                // ! Save Other Tabs
                // !--------------------------------------
                saveOtherTabs = async (projectID) => {


                    const {requirementsDefinition, technicalEvaluation, pmoEvaluation, roiRealized} = this.props.projectIntake;
                    const id = projectID.indexOf('D') >= 0  ? projectID.substr(projectID.indexOf('D')+1,projectID.length) : projectID;


                        // let promises = []

                        // ? Save Req Definition
                        if( !isEmpty(requirementsDefinition) && requirementsDefinition.SavedLocally === true) {
                        

                                // this.validateEmptyRequirements();

                                if(requirementsDefinition.Project_id || requirementsDefinition.project_id) {
                                    updateRequirementsDB(requirementsDefinition, id);
                                    let reqFolderURL = `${requirementsDefinition.newProjectID}/RequirementsDefinition`;
                                    //? this.uploadReqFiles(requirementsDefinition.newProjectID, reqFolderURL);
                                }

                                else 
                                    saveRequirementsDB(requirementsDefinition).then((newRequirementsID) => {
                                        requirementsDefinition.Project_id = newRequirementsID;
                                        let reqFolderURL = `${newRequirementsID}/RequirementsDefinition`;
                                        //? this.uploadReqFiles(requirementsDefinition.newProjectID, reqFolderURL);
                                    })



                                this.props.updateProjectIntakeValues('requirements',requirementsDefinition, null, true)

                        }


                          // ? Save Tehnical Evaluation
                          if(!isEmpty(technicalEvaluation) && technicalEvaluation.SavedLocally === true) {
                            if(technicalEvaluation.Tech_eval_id || technicalEvaluation.tech_eval_id) {
                                updateTechnicalDB(technicalEvaluation, id)
                            }
                            else
                                saveTechnicalDB(technicalEvaluation, id).then((newTechId) => {
                                    console.log("TCL: saveOtherTabs -> newTechId", newTechId)
                                    technicalEvaluation.Tech_eval_id = newTechId
                                    technicalEvaluation.tech_eval_id = newTechId
                                }).catch((error) => {console.log("TCL: saveOtherTabs -> error", error)})

                            // ? Update Props
                            this.props.updateProjectIntakeValues('technical',technicalEvaluation, null, true)
                        }

                        

                        // ? Save PMO Evaluation
                        if(!isEmpty(pmoEvaluation) && pmoEvaluation.SavedLocally === true) {
                                if(pmoEvaluation.Pmo_eval_id || pmoEvaluation.pmo_eval_id  ) {
                                    updatePMOEvaluation(pmoEvaluation)
                                }
                                else
                                    savePMOEvaluationDB(pmoEvaluation, id).then((newPmoId) => {
                                        console.log("TCL: saveOtherTabs -> newPmoId", newPmoId)
                                        pmoEvaluation.Pmo_eval_id = newPmoId
                                        pmoEvaluation.pmo_eval_id = newPmoId
                                    }).catch((error) => {console.log("TCL: saveOtherTabs -> error", error)})

                                // ? Update Props
                                this.props.updateProjectIntakeValues('pmoEval',pmoEvaluation, null, true)
                        }



                        // ? Save Roi Realized
                        if(!isEmpty(roiRealized) && roiRealized.SavedLocally === true) {
                                // ? Look For Roi Relized Data
                                if(roiRealized.Roi_real_id || roiRealized.roi_real_id ) {
                                   updateROIRealizedDB(roiRealized, id).then((roiID) => {
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

            
            // --------------------------------------
            // Redirect User
            // --------------------------------------
            redirectUser() {
                const {isPMO} = this.props;
                // const {history} = this.props;
                const id = this.props.locationData.match.params.projectID
                const nextStep = isPMO ? 'technical-evaluation' : 'proccess-ended';
                // const path =  '/sites/gsd/intake_process/intake_process_v3/ProjectIntake.aspx';

                const path = '/sites/gsd/intake_process/intake_process_v3/ProjectIntake.aspx';

                //const path = '/intake'
                
                this.props.locationData.history.push(`${path}/project/${id}/${nextStep}`);
                
                // history.push(`${path}/${nextStep}`);
				console.log("TCL: BusinessInformation -> redirectUser -> redirect ", `${path}/${nextStep}`)
            }

            // --------------------------------------
            // Redirect User to Prev Step
            // --------------------------------------
            
            redirectUserPrev() {
                const {history, location} =   this.props.locationData;
                const path = '/sites/gsd/intake_process/intake_process_v3/ProjectIntake.aspx';

                //const path = '/intake'
                
                let pathArray = location.pathname.split('/');
                let projectIndex = pathArray[pathArray.length - 2];
				
                
                history.push(`${path}/project/${projectIndex}/requirement-definition`);
                
            }



            // --------------------------------------
            // Load Conditional Values
            // --------------------------------------
            loadConditionalValues(selectedOption) {
                console.log("TCL: loadConditionalValues -> selectedOption", selectedOption)

                if(!selectedOption)
                    return;

                switch(selectedOption) {
                    case "Americas" :
                        this.setState({
                            // Sites_Impacted : {label : "Sites Impacted", value : null},
                            conditionalSites : [
                                {
                                    "label": "Aguascalientes, Mexico",
                                    "value": "Aguascalientes, Mexico"
                                },
                                {
                                    "label": "Alajuela, Costa Rica",
                                    "value": "Alajuela, Costa Rica"
                                },
                                {
                                    "label": "Asheville, USA",
                                    "value": "Asheville, USA"
                                },
                                {
                                    "label": "Atlanta, USA",
                                    "value": "Atlanta, USA"
                                },
                                {
                                    "label": "Austin, USA",
                                    "value": "Austin, USA"
                                },
                                {
                                    "label": "Baltimore, USA",
                                    "value": "Baltimore, USA"
                                },
                                {
                                    "label": "Boston, USA",
                                    "value": "Boston, USA"
                                },
                                {
                                    "label": "Bothell, USA",
                                    "value": "Bothell, USA"
                                },
                                {
                                    "label": "Buffalo Grove, USA",
                                    "value": "Buffalo Grove, USA"
                                },
                                {
                                    "label": "Burlington, Canada",
                                    "value": "Burlington, Canada"
                                },
                                {
                                    "label": "Charlotte, USA",
                                    "value": "Charlotte, USA"
                                },
                                {
                                    "label": "Columbia, USA",
                                    "value": "Columbia, USA"
                                },
                                {
                                    "label": "Coopersville, USA",
                                    "value": "Coopersville, USA"
                                },
                                {
                                    "label": "Creedmoor, USA",
                                    "value": "Creedmoor, USA"
                                },
                                {
                                    "label": "Dallas, USA",
                                    "value": "Dallas, USA"
                                },
                                {
                                    "label": "El Paso, USA",
                                    "value": "El Paso, USA"
                                },
                                {
                                    "label": "Farmington Hills, USA",
                                    "value": "Farmington Hills, USA"
                                },
                                {
                                    "label": "Fremont, USA",
                                    "value": "Fremont, USA"
                                },
                                {
                                    "label": "Guadalajara North, Mexico",
                                    "value": "Guadalajara North, Mexico"
                                },
                                {
                                    "label": "Guadalajara South, Mexico",
                                    "value": "Guadalajara South, Mexico"
                                },
                                {
                                    "label": "Hollis, USA",
                                    "value": "Hollis, USA"
                                },
                                {
                                    "label": "Irving, USA",
                                    "value": "Irving, USA"
                                },
                                {
                                    "label": "Jaguariúna, Brazil",
                                    "value": "Jaguariúna, Brazil"
                                },
                                {
                                    "label": "Juarez, Mexico",
                                    "value": "Juarez, Mexico"
                                },
                                {
                                    "label": "Kanata, Canada",
                                    "value": "Kanata, Canada"
                                },
                                {
                                    "label": "Lexington, USA",
                                    "value": "Lexington, USA"
                                },
                                {
                                    "label": "Louisville, USA",
                                    "value": "Louisville, USA"
                                },
                                {
                                    "label": "Manaus, Brazil",
                                    "value": "Manaus, Brazil"
                                },
                                {
                                    "label": "Manchester, USA",
                                    "value": "Manchester, USA"
                                },
                                {
                                    "label": "Markham, Canada",
                                    "value": "Markham, Canada"
                                },
                                {
                                    "label": "Memphis, USA",
                                    "value": "Memphis, USA"
                                },
                                {
                                    "label": "Milpitas, USA",
                                    "value": "Milpitas, USA"
                                },
                                {
                                    "label": "Morgan Hill, USA",
                                    "value": "Morgan Hill, USA"
                                },
                                {
                                    "label": "Morrisville, USA",
                                    "value": "Morrisville, USA"
                                },
                                {
                                    "label": "Mountain View, USA",
                                    "value": "Mountain View, USA"
                                },
                                {
                                    "label": "New Market, Canada",
                                    "value": "New Market, Canada"
                                },
                                {
                                    "label": "New York, USA",
                                    "value": "New York, USA"
                                },
                                {
                                    "label": "Norcross, USA",
                                    "value": "Norcross, USA"
                                },
                                {
                                    "label": "Northfield, USA",
                                    "value": "Northfield, USA"
                                },
                                {
                                    "label": "Ottawa, Canada",
                                    "value": "Ottawa, Canada"
                                },
                                {
                                    "label": "Plano, USA",
                                    "value": "Plano, USA"
                                },
                                {
                                    "label": "Queretaro, Mexico",
                                    "value": "Queretaro, Mexico"
                                },
                                {
                                    "label": "Raleigh, USA",
                                    "value": "Raleigh, USA"
                                },
                                {
                                    "label": "Reynosa, Mexico",
                                    "value": "Reynosa, Mexico"
                                },
                                {
                                    "label": "San Carlos, USA",
                                    "value": "San Carlos, USA"
                                },
                                {
                                    "label": "San Jose, USA",
                                    "value": "San Jose, USA"
                                },
                                {
                                    "label": "San Luis Rio Colorado, Mexico",
                                    "value": "San Luis Rio Colorado, Mexico"
                                },
                                {
                                    "label": "San Luis, Mexico",
                                    "value": "San Luis, Mexico"
                                },
                                {
                                    "label": "Sorocaba, Brazil",
                                    "value": "Sorocaba, Brazil"
                                },
                                {
                                    "label": "Sterling Heights, USA",
                                    "value": "Sterling Heights, USA"
                                },
                                {
                                    "label": "Tempe, USA",
                                    "value": "Tempe, USA"
                                },
                                {
                                    "label": "Tijuana, Mexico",
                                    "value": "Tijuana, Mexico"
                                },
                                {
                                    "label": "Toronto, Canada",
                                    "value": "Toronto, Canada"
                                },
                                {
                                    "label": "Troy, USA",
                                    "value": "Troy, USA"
                                },
                                {
                                    "label": "Valencia, USA",
                                    "value": "Valencia, USA"
                                },
                                {
                                    "label": "Vancouver, Canada",
                                    "value": "Vancouver, Canada"
                                }
                            ]
                        });
                        break;
                    case "Asia" :
                        this.setState({
                            // Sites_Impacted : {label : "Sites Impacted", value : null},
                            conditionalSites : [
                                {
                                    "label": "Auckland, New Zealand",
                                    "value": "Auckland, New Zealand"
                                },
                                {
                                    "label": "Bangalore, India",
                                    "value": "Bangalore, India"
                                },
                                {
                                    "label": "Batam, Indonesia",
                                    "value": "Batam, Indonesia"
                                },
                                {
                                    "label": "Binhai, China",
                                    "value": "Binhai, China"
                                },
                                {
                                    "label": "Bundang-gu, South Korea",
                                    "value": "Bundang-gu, South Korea"
                                },
                                {
                                    "label": "Cebu, Philippines",
                                    "value": "Cebu, Philippines"
                                },
                                {
                                    "label": "Changi, Singapore",
                                    "value": "Changi, Singapore"
                                },
                                {
                                    "label": "Changning, China",
                                    "value": "Changning, China"
                                },
                                {
                                    "label": "Changsha, China",
                                    "value": "Changsha, China"
                                },
                                {
                                    "label": "Chengdu, China",
                                    "value": "Chengdu, China"
                                },
                                {
                                    "label": "Chennai, India",
                                    "value": "Chennai, India"
                                },
                                {
                                    "label": "Chitoor, India",
                                    "value": "Chitoor, India"
                                },
                                {
                                    "label": "Delhi, India",
                                    "value": "Delhi, India"
                                },
                                {
                                    "label": "Dongguan, China",
                                    "value": "Dongguan, China"
                                },
                                {
                                    "label": "GanZhou, China",
                                    "value": "GanZhou, China"
                                },
                                {
                                    "label": "Guangdong, China",
                                    "value": "Guangdong, China"
                                },
                                {
                                    "label": "Gushu, China",
                                    "value": "Gushu, China"
                                },
                                {
                                    "label": "Haidian, China",
                                    "value": "Haidian, China"
                                },
                                {
                                    "label": "Hong Kong, China",
                                    "value": "Hong Kong, China"
                                },
                                {
                                    "label": "Huang Tian, China",
                                    "value": "Huang Tian, China"
                                },
                                {
                                    "label": "Hunan, China",
                                    "value": "Hunan, China"
                                },
                                {
                                    "label": "Hyderabad, India",
                                    "value": "Hyderabad, India"
                                },
                                {
                                    "label": "Ibaraki, Japan",
                                    "value": "Ibaraki, Japan"
                                },
                                {
                                    "label": "Jiangsu, China",
                                    "value": "Jiangsu, China"
                                },
                                {
                                    "label": "Johor Bahru, Malaysia",
                                    "value": "Johor Bahru, Malaysia"
                                },
                                {
                                    "label": "Joo Koon, Singapore",
                                    "value": "Joo Koon, Singapore"
                                },
                                {
                                    "label": "Kallang, Singapore",
                                    "value": "Kallang, Singapore"
                                },
                                {
                                    "label": "Kulai, Malaysia",
                                    "value": "Kulai, Malaysia"
                                },
                                {
                                    "label": "Kunshan, China",
                                    "value": "Kunshan, China"
                                },
                                {
                                    "label": "Manila, Philippines",
                                    "value": "Manila, Philippines"
                                },
                                {
                                    "label": "Mumbai, India",
                                    "value": "Mumbai, India"
                                },
                                {
                                    "label": "Nanjing, China",
                                    "value": "Nanjing, China"
                                },
                                {
                                    "label": "Penang, Malaysia",
                                    "value": "Penang, Malaysia"
                                },
                                {
                                    "label": "Poonamallee, India",
                                    "value": "Poonamallee, India"
                                },
                                {
                                    "label": "PTP, Malaysia",
                                    "value": "PTP, Malaysia"
                                },
                                {
                                    "label": "Pudong, China",
                                    "value": "Pudong, China"
                                },
                                {
                                    "label": "Senai, Malaysia",
                                    "value": "Senai, Malaysia"
                                },
                                {
                                    "label": "Seoul, South Korea",
                                    "value": "Seoul, South Korea"
                                },
                                {
                                    "label": "Shanghai, China",
                                    "value": "Shanghai, China"
                                },
                                {
                                    "label": "Shenzhen, China",
                                    "value": "Shenzhen, China"
                                },
                                {
                                    "label": "Simpang Ampat, Malaysia",
                                    "value": "Simpang Ampat, Malaysia"
                                },
                                {
                                    "label": "Singapore, Singapore",
                                    "value": "Singapore, Singapore"
                                },
                                {
                                    "label": "Skudai, Malaysia",
                                    "value": "Skudai, Malaysia"
                                },
                                {
                                    "label": "Southbank, Australia",
                                    "value": "Southbank, Australia"
                                },
                                {
                                    "label": "Sriperumbudur, India",
                                    "value": "Sriperumbudur, India"
                                },
                                {
                                    "label": "Suzhou, China",
                                    "value": "Suzhou, China"
                                },
                                {
                                    "label": "Sydney, Australia",
                                    "value": "Sydney, Australia"
                                },
                                {
                                    "label": "Tada, India",
                                    "value": "Tada, India"
                                },
                                {
                                    "label": "Taipei, Taiwan",
                                    "value": "Taipei, Taiwan"
                                },
                                {
                                    "label": "Tianjin, China",
                                    "value": "Tianjin, China"
                                },
                                {
                                    "label": "Tokyo, Japan",
                                    "value": "Tokyo, Japan"
                                },
                                {
                                    "label": "Tsuen Wan, Hong Kong",
                                    "value": "Tsuen Wan, Hong Kong"
                                },
                                {
                                    "label": "Visakhapatnam, India",
                                    "value": "Visakhapatnam, India"
                                },
                                {
                                    "label": "Wuzhong, China",
                                    "value": "Wuzhong, China"
                                },
                                {
                                    "label": "Zhuhai, China",
                                    "value": "Zhuhai, China"
                                },
                                {
                                    "label": "Vancouver, Canada",
                                    "value": "Vancouver, Canada"
                                }
                            ]
                        })
                        break;
                    case "EMEA" : 
                        this.setState({
                            // Sites_Impacted : {label : "Sites Impacted", value : null},
                            conditionalSites : [
                                    {
                                        "label": "Aarhus, Denmark",
                                        "value": "Aarhus, Denmark"
                                    },
                                    {
                                        "label": "Althofen, Austria",
                                        "value": "Althofen, Austria"
                                    },
                                    {
                                        "label": "Arad, Israel",
                                        "value": "Arad, Israel"
                                    },
                                    {
                                        "label": "Barcelona, Spain",
                                        "value": "Barcelona, Spain"
                                    },
                                    {
                                        "label": "Brno, Czech Republic",
                                        "value": "Brno, Czech Republic"
                                    },
                                    {
                                        "label": "Budapest, Hungary",
                                        "value": "Budapest, Hungary"
                                    },
                                    {
                                        "label": "Cork, Ireland",
                                        "value": "Cork, Ireland"
                                    },
                                    {
                                        "label": "Corlu, Turkey",
                                        "value": "Corlu, Turkey"
                                    },
                                    {
                                        "label": "Dubai, UAE",
                                        "value": "Dubai, UAE"
                                    },
                                    {
                                        "label": "Dublin, Ireland",
                                        "value": "Dublin, Ireland"
                                    },
                                    {
                                        "label": "Gebze , Turkey",
                                        "value": "Gebze , Turkey"
                                    },
                                    {
                                        "label": "Geldermalsen, Netherlands",
                                        "value": "Geldermalsen, Netherlands"
                                    },
                                    {
                                        "label": "Gyal, Hungary",
                                        "value": "Gyal, Hungary"
                                    },
                                    {
                                        "label": "Hagglingen, Switzerland",
                                        "value": "Hagglingen, Switzerland"
                                    },
                                    {
                                        "label": "Haifa, Israel",
                                        "value": "Haifa, Israel"
                                    },
                                    {
                                        "label": "Hartberg, Austria",
                                        "value": "Hartberg, Austria"
                                    },
                                    {
                                        "label": "Holyhill, Ireland",
                                        "value": "Holyhill, Ireland"
                                    },
                                    {
                                        "label": "Hoogeveen, Netherlands",
                                        "value": "Hoogeveen, Netherlands"
                                    },
                                    {
                                        "label": "Istanbul, Turkey",
                                        "value": "Istanbul, Turkey"
                                    },
                                    {
                                        "label": "Kalmar, Sweden",
                                        "value": "Kalmar, Sweden"
                                    },
                                    {
                                        "label": "Karlskrona, Sweden",
                                        "value": "Karlskrona, Sweden"
                                    },
                                    {
                                        "label": "Kyiv,Ukraine",
                                        "value": "Kyiv,Ukraine"
                                    },
                                    {
                                        "label": "Limerick, Ireland",
                                        "value": "Limerick, Ireland"
                                    },
                                    {
                                        "label": "Linkoping, Sweden",
                                        "value": "Linkoping, Sweden"
                                    },
                                    {
                                        "label": "Linwood, UK",
                                        "value": "Linwood, UK"
                                    },
                                    {
                                        "label": "Lodz, Poland",
                                        "value": "Lodz, Poland"
                                    },
                                    {
                                        "label": "Lutterworth, UK",
                                        "value": "Lutterworth, UK"
                                    },
                                    {
                                        "label": "Madrid,Spain",
                                        "value": "Madrid,Spain"
                                    },
                                    {
                                        "label": "Manchester, UK",
                                        "value": "Manchester, UK"
                                    },
                                    {
                                        "label": "Manorhamilton, Ireland",
                                        "value": "Manorhamilton, Ireland"
                                    },
                                    {
                                        "label": "Migdal Haemek, Israel",
                                        "value": "Migdal Haemek, Israel"
                                    },
                                    {
                                        "label": "Milan, Italy",
                                        "value": "Milan, Italy"
                                    },
                                    {
                                        "label": "Monza, Italy",
                                        "value": "Monza, Italy"
                                    },
                                    {
                                        "label": "Mukachevo, Ukraine",
                                        "value": "Mukachevo, Ukraine"
                                    },
                                    {
                                        "label": "Ofakim, Israel",
                                        "value": "Ofakim, Israel"
                                    },
                                    {
                                        "label": "Pamplona, Spain",
                                        "value": "Pamplona, Spain"
                                    },
                                    {
                                        "label": "Pardubice, Czech Republic",
                                        "value": "Pardubice, Czech Republic"
                                    },
                                    {
                                        "label": "Paty, Hungary",
                                        "value": "Paty, Hungary"
                                    },
                                    {
                                        "label": "Pecs, Hungary",
                                        "value": "Pecs, Hungary"
                                    },
                                    {
                                        "label": "Petach-Tikva, Israel",
                                        "value": "Petach-Tikva, Israel"
                                    },
                                    {
                                        "label": "Raheen, Ireland",
                                        "value": "Raheen, Ireland"
                                    },
                                    {
                                        "label": "Ronneby, Sweden",
                                        "value": "Ronneby, Sweden"
                                    },
                                    {
                                        "label": "Rotterdam, Netherlands",
                                        "value": "Rotterdam, Netherlands"
                                    },
                                    {
                                        "label": "Sarvar, Hungary",
                                        "value": "Sarvar, Hungary"
                                    },
                                    {
                                        "label": "Somaglia, Italy",
                                        "value": "Somaglia, Italy"
                                    },
                                    {
                                        "label": "Sonderborg, Denmark",
                                        "value": "Sonderborg, Denmark"
                                    },
                                    {
                                        "label": "Stuttgart, Germany",
                                        "value": "Stuttgart, Germany"
                                    },
                                    {
                                        "label": "Swindon, UK",
                                        "value": "Swindon, UK"
                                    },
                                    {
                                        "label": "Tab, Hungary",
                                        "value": "Tab, Hungary"
                                    },
                                    {
                                        "label": "Tczew, Poland",
                                        "value": "Tczew, Poland"
                                    },
                                    {
                                        "label": "Timisoara, Romania",
                                        "value": "Timisoara, Romania"
                                    },
                                    {
                                        "label": "Tirat Carmel, Israel",
                                        "value": "Tirat Carmel, Israel"
                                    },
                                    {
                                        "label": "Treviso, Italy",
                                        "value": "Treviso, Italy"
                                    },
                                    {
                                        "label": "Trieste, Italy",
                                        "value": "Trieste, Italy"
                                    },
                                    {
                                        "label": "Venray, Netherlands",
                                        "value": "Venray, Netherlands"
                                    },
                                    {
                                        "label": "Vienna, Austria",
                                        "value": "Vienna, Austria"
                                    },
                                    {
                                        "label": "Warrington, UK",
                                        "value": "Warrington, UK"
                                    },
                                    {
                                        "label": "Willton, Ireland",
                                        "value": "Willton, Ireland"
                                    },
                                    {
                                        "label": "Woerden, Netherlands",
                                        "value": "Woerden, Netherlands"
                                    },
                                    {
                                        "label": "Yavne, Israel",
                                        "value": "Yavne, Israel"
                                    },
                                    {
                                        "label": "Zalaegerszeg, Hungary",
                                        "value": "Zalaegerszeg, Hungary"
                                    },
                                    {
                                        "label": "Zurich, Switzerland",
                                        "value": "Zurich, Switzerland"
                                    }

                            ]
                        });
                        break;
                    default :  return (  
                        [
                            {
                                "label": "Aguascalientes, Mexico",
                                "value": "Aguascalientes, Mexico"
                            },
                            {
                                "label": "Alajuela, Costa Rica",
                                "value": "Alajuela, Costa Rica"
                            },
                            {
                                "label": "Asheville, USA",
                                "value": "Asheville, USA"
                            },
                            {
                                "label": "Atlanta, USA",
                                "value": "Atlanta, USA"
                            },
                            {
                                "label": "Austin, USA",
                                "value": "Austin, USA"
                            },
                            {
                                "label": "Baltimore, USA",
                                "value": "Baltimore, USA"
                            },
                            {
                                "label": "Boston, USA",
                                "value": "Boston, USA"
                            },
                            {
                                "label": "Bothell, USA",
                                "value": "Bothell, USA"
                            },
                            {
                                "label": "Buffalo Grove, USA",
                                "value": "Buffalo Grove, USA"
                            },
                            {
                                "label": "Burlington, Canada",
                                "value": "Burlington, Canada"
                            },
                            {
                                "label": "Charlotte, USA",
                                "value": "Charlotte, USA"
                            },
                            {
                                "label": "Columbia, USA",
                                "value": "Columbia, USA"
                            },
                            {
                                "label": "Coopersville, USA",
                                "value": "Coopersville, USA"
                            },
                            {
                                "label": "Creedmoor, USA",
                                "value": "Creedmoor, USA"
                            },
                            {
                                "label": "Dallas, USA",
                                "value": "Dallas, USA"
                            },
                            {
                                "label": "El Paso, USA",
                                "value": "El Paso, USA"
                            },
                            {
                                "label": "Farmington Hills, USA",
                                "value": "Farmington Hills, USA"
                            },
                            {
                                "label": "Fremont, USA",
                                "value": "Fremont, USA"
                            },
                            {
                                "label": "Guadalajara North, Mexico",
                                "value": "Guadalajara North, Mexico"
                            },
                            {
                                "label": "Guadalajara South, Mexico",
                                "value": "Guadalajara South, Mexico"
                            },
                            {
                                "label": "Hollis, USA",
                                "value": "Hollis, USA"
                            },
                            {
                                "label": "Irving, USA",
                                "value": "Irving, USA"
                            },
                            {
                                "label": "Jaguariúna, Brazil",
                                "value": "Jaguariúna, Brazil"
                            },
                            {
                                "label": "Juarez, Mexico",
                                "value": "Juarez, Mexico"
                            },
                            {
                                "label": "Kanata, Canada",
                                "value": "Kanata, Canada"
                            },
                            {
                                "label": "Lexington, USA",
                                "value": "Lexington, USA"
                            },
                            {
                                "label": "Louisville, USA",
                                "value": "Louisville, USA"
                            },
                            {
                                "label": "Manaus, Brazil",
                                "value": "Manaus, Brazil"
                            },
                            {
                                "label": "Manchester, USA",
                                "value": "Manchester, USA"
                            },
                            {
                                "label": "Markham, Canada",
                                "value": "Markham, Canada"
                            },
                            {
                                "label": "Memphis, USA",
                                "value": "Memphis, USA"
                            },
                            {
                                "label": "Milpitas, USA",
                                "value": "Milpitas, USA"
                            },
                            {
                                "label": "Morgan Hill, USA",
                                "value": "Morgan Hill, USA"
                            },
                            {
                                "label": "Morrisville, USA",
                                "value": "Morrisville, USA"
                            },
                            {
                                "label": "Mountain View, USA",
                                "value": "Mountain View, USA"
                            },
                            {
                                "label": "New Market, Canada",
                                "value": "New Market, Canada"
                            },
                            {
                                "label": "New York, USA",
                                "value": "New York, USA"
                            },
                            {
                                "label": "Norcross, USA",
                                "value": "Norcross, USA"
                            },
                            {
                                "label": "Northfield, USA",
                                "value": "Northfield, USA"
                            },
                            {
                                "label": "Ottawa, Canada",
                                "value": "Ottawa, Canada"
                            },
                            {
                                "label": "Plano, USA",
                                "value": "Plano, USA"
                            },
                            {
                                "label": "Queretaro, Mexico",
                                "value": "Queretaro, Mexico"
                            },
                            {
                                "label": "Raleigh, USA",
                                "value": "Raleigh, USA"
                            },
                            {
                                "label": "Reynosa, Mexico",
                                "value": "Reynosa, Mexico"
                            },
                            {
                                "label": "San Carlos, USA",
                                "value": "San Carlos, USA"
                            },
                            {
                                "label": "San Jose, USA",
                                "value": "San Jose, USA"
                            },
                            {
                                "label": "San Luis Rio Colorado, Mexico",
                                "value": "San Luis Rio Colorado, Mexico"
                            },
                            {
                                "label": "San Luis, Mexico",
                                "value": "San Luis, Mexico"
                            },
                            {
                                "label": "Sorocaba, Brazil",
                                "value": "Sorocaba, Brazil"
                            },
                            {
                                "label": "Sterling Heights, USA",
                                "value": "Sterling Heights, USA"
                            },
                            {
                                "label": "Tempe, USA",
                                "value": "Tempe, USA"
                            },
                            {
                                "label": "Tijuana, Mexico",
                                "value": "Tijuana, Mexico"
                            },
                            {
                                "label": "Toronto, Canada",
                                "value": "Toronto, Canada"
                            },
                            {
                                "label": "Troy, USA",
                                "value": "Troy, USA"
                            },
                            {
                                "label": "Valencia, USA",
                                "value": "Valencia, USA"
                            },
                            {
                                "label": "Vancouver, Canada",
                                "value": "Vancouver, Canada"
                            }
                        ] 
                    )
                
                }

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
                const formFieldsValues =  this.createFormStructure();

                
                
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
            renderFormFooter() {
                const {isPMO} = this.props;
                let buttonDisabled =  false ;
                let workstage = '';
                try {
                    // const {workstage} = this.props.requirementsDefinition.requirementsDefinition;

                    if(this.props.requirementsDefinition) {
                        if(this.props.requirementsDefinition.requirementsDefinition &&  this.props.requirementsDefinition.requirementsDefinition.workstage !== "")
                            workstage =  this.props.requirementsDefinition.requirementsDefinition.workstage  
                        else if(this.props.requirementsDefinition.Workstage)
                            workstage = this.props.requirementsDefinition.Workstage.value
                        else
                            workstage = ''
                       
    
                            
                    }
    
                    

                        console.log("TCL: BusinessInformation -> renderFormFooter -> this.props", this.props)
                        // const { Workstage} = this.props.requirementsDefinition.requirementsDefinition;
                        
                    
                        if(workstage === 'Requested' && this.props.isPMO === false)
                        
                            buttonDisabled = true;
                        else    
                            buttonDisabled = false;
                    
                }
                catch(error) {
                    console.log("TCL: renderFormFooter -> error", error)
                    
                    
                    // this.redirectUserPrev();

                    // if(this.props.isPMO === false)
                    //     buttonDisabled = true;
                }
                return (
                    <FormFooter> 
                        <AppButton buttonText = {'Return'} buttonClass = {'cancelButton'} onClick =  {this.submitFormLocalDataReturn}></AppButton>
                        <AppButton buttonText = {'Save'} buttonClass = {'saveButton'} onClick = {this.submitFormDB} disabled = {buttonDisabled}></AppButton>
                        {
                            isPMO 
                            ? <AppButton buttonText = {'Continue'} buttonClass = {'continueButton'} onClick = {this.submitFormLocalData}></AppButton>
                            : <AppButton buttonText = {'Submit'} buttonClass = {'continueButton'} onClick = {this.submitFormDB} disabled = {buttonDisabled}></AppButton>
                        }
                        
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
                    position: 'bottom',
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
                console.log("TCL: BusinessInformation -> checkErrorClass -> event", event)
                const {target} = event;
                const {id, value} = target;
                console.log("TCL: BusinessInformation -> checkErrorClass -> target", target)
                
                if(this.state.checkForErrors === true) {

                
                    //? Check for PeopplePicker
                    if(id.indexOf('peoplePicker') >= 0) {
                        let pickerName = id.substring(0, id.indexOf('_EditorInput'))
                        
                    
                        if(this.state.checkForErrors ===  true) {
                            if (document.getElementById(`${pickerName}_HiddenInput`).value === "[]" || document.getElementById(`${pickerName}_HiddenInput`).value === "") 
                                document.getElementById(pickerName).style = 'border: 1px solid #e76c90 !important';
                            

                            else 
                                // document.getElementById(pickerName).style = 'border: 1px solid #ced4da !important';
                                document.getElementById(pickerName).style = 'border: none !important';
                        }
                                
                        
        
                        // let stateName = id.substr('')
                    }

                    // ? Text Area, input[text, number]
                    else if (  ( target.classList[1] ===  'int-validate' && target.type === 'textarea') 
                            || ( target.classList[1] ===  'int-validate' && target.type === 'number' )
                            ) {
                        if(value.length > 0 ||  value !== ""  )
                            this.removeErrorStatus(id)
                        else
                            this.addErrorStatus(id)
                    }

                    
                
                    //? Check Select Inputs Fields
                    else if(this.state[id].value !== "" )
                        this.removeErrorStatus(id)
                    //? Puth Back Error Message
                    // else  if(this.state.checkForErrors === true)
                    //     this.addErrorStatus(id)
                }
                    
            }



            // --------------------------------------
            // Render Projects
            // --------------------------------------
            renderBusinessInformation() {
                const {sendingData} = this.state;
                // const {isLoaded} = this.props.loadedBusinessInformation;

                let workstage = '';
                
                console.log("TCL: renderBusinessInformation -> this.props", this.props)
                
                console.log("TCL: renderBusinessInformation -> this.props.requirementsDefinition", this.props.projectIntake.requirementsDefinition)
                


                // ? Look for the workstage
                if(this.props.projectIntake.requirementsDefinition) {
                    if(this.props.projectIntake.requirementsDefinition &&  this.props.projectIntake.requirementsDefinition.Workstage !== "")
                        workstage =  this.props.projectIntake.requirementsDefinition.Workstage  
                    else if(this.props.projectIntake.requirementsDefinition.Workstage.value)
                        workstage = this.props.requirementsDefinition.Workstage.value
                    else
                        workstage = ''
                   

                        
                }

                // if(workstage === '') {
                //     let currentProject = this.props.locationData.match.params.projectID
                //     // return (<Redirect to={`/sites/gsd/intake_process/intake_process_v3/ProjectIntake.aspx/project/${currentProject}/requirement-definition`}/>)
                //     window.location.href = `/sites/gsd/intake_process/intake_process_v3/ProjectIntake.aspx/project/${currentProject}/requirement-definition`
                //     // this.props.locationData.history.push(`sites/gsd/intake_process/IntakeProcess/ProjectIntake.aspx/project/${currentProject}/requirement-definition`);
                // }
                    


               

				//console.log('TCL: renderBusinessInformation -> isLoaded', isLoaded)
                const formContainer =  <form ref={form => this.formBusiness = form}>
                                
                                            <div className="int-container">
                                                <div className="int-row">
                                                    {this.renderHeaderSection("High Level Data")}
                                                </div>
                                                

                                                <div className="int-row">
                                                    <div className="int-column ">
                                                        <div className="int-fieldsContainer">
                                                            {this.renderFormFields("firstHalf1", true)}
                                                        </div>
                                                    </div>

                                                    <div className="int-column ">
                                                        <div className="int-fieldsContainer">
                                                            {this.renderFormFields("firstHalf2", true)}
                                                        </div>
                                                    </div>

                                                </div>

                                                <div className="int-row">
                                                    {this.renderHeaderSection("Project Information")}
                                                </div>


                                                
                                                <div className="int-row">
                                                    <div className="int-column ">
                                                        <div className="int-fieldsContainer">
                                                            {this.renderFormFields("secondHalf1", true)}
                                                        </div>
                                                    </div>

                                                    {this.state.responsiveWidth >= 1441 &&
                                                        <div className="int-column ">
                                                           <div className="int-fieldsContainer">
                                                               {this.renderFormFields("secondHalf2", true)}
                                                           </div>
                                                       </div>
                                                    }

                                                </div>

                                                <div className="int-row">
                                                    {this.renderHeaderSection("Customer Data")}
                                                </div>

                                                <div className="int-row">   
                                                    <div className="int-column">
                                                            {this.renderFormFields("third1", true)}
                                                    </div>

                                                    <div className="int-column">
                                                        {this.renderFormFields("third2", true)}
                                                    </div>

                                                    

                                                </div>

                                                <div className="int-row">
                                                    <div className="int-column">
                                                        {this.renderFormFields("third3", true)}
                                                    </div>
                                                    {this.state.responsiveWidth > 1440 &&  <div className="int-column"></div>}
                                                    
                                                </div>


                                                <div className="int-row">
                                                    {this.renderHeaderSection("Benefits & Savings")}
                                                </div>


                                                <div className="int-row">
                                                    <div className="int-column ">
                                                        <div className="int-fieldsContainer" style = {{marginBottom:'auto'}}>
                                                            {this.renderFormFields("fourthHalf1", true)}
                                                        </div>
                                                    </div>

                                                    <div className="int-column ">
                                                        <div className="int-fieldsContainer">
                                                            {this.renderFormFields("fourthHalf2", true)}
                                                        </div>
                                                    </div>

                                                </div>



                                            </div>

                                        </form>


                //!Check if the Sites Impacted select has values
                // let sitesSelect = document.getElementsByClassName('react-select-extra-wide__placeholder') ;
                // if(sitesSelect && this.props.businessInformation.businessInformation) {
                //     console.log("TCL: renderBusinessInformation -> sitesSelect", sitesSelect)
                //     // this.state.Sites_Impacted
                //     console.log("TCL: renderBusinessInformation -> this.state.Sites_Impacted", this.state.Sites_Impacted)
                //     // setTimeout


                //     console.log("TCL: renderBusinessInformation -> sites_impacted", this.props.businessInformation.businessInformation.sites_impacted)

                //     // if(this.state.Sites_Impacted.length <= 0)
                //     //     this.setState({ Sites_Impacted : this.loadImpactedSites(this.props.businessInformation.businessInformation.sites_impacted) })
                        

                // }
                
                return (
                    <Fragment>
                        <FormBody>
                            {sendingData && this.renderLoader(true)}

                        { !this.props.projectIntake.requirementsDefinition && this.redirectUserPrev() }
                            
                        { /*this.props.requirementsDefinition && formContainer */}
                        { formContainer }
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
                return isLoaded ? this.renderBusinessInformation() : this.renderLoader();
            
                    
            }
    }


// -------------------------------------- 
// Define PropTypes 
// -------------------------------------- 
    BusinessInformation.propTypes = {
        projectIntake : PropTypes.object,
        isPMO : PropTypes.bool,
        locationData : PropTypes.object,
        updateProjectIntakeValues : PropTypes.func
    };




// --------------------------------------
// Export Component
// --------------------------------------
    export default  (BusinessInformation);
   