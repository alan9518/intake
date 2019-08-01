/* ==========================================================================
** Form Setp 3 Component View Edit Project
** 29/01/2019
** Alan Medina Silva
** ========================================================================== */


// --------------------------------------
// Get Dependences
// --------------------------------------
    import React, { Component, Fragment } from 'react';
    import { withRouter } from 'react-router';
   
    import {Redirect} from 'react-router-dom';
    import {isEqual, isEmpty, uniq} from 'lodash'
    import { FieldsGenerator, AppLoader, SectionHeader, FormBody, FormFooter, AppButton } from '../../../components';
    import PropTypes from 'prop-types';
    import Alert from 'react-s-alert';
    import 'react-s-alert/dist/s-alert-default.css';
    import 'react-s-alert/dist/s-alert-css-effects/slide.css';
    import moment from 'moment';


    const currentUser =  {userName : 'Alan Medina', userEmail : 'alan.medina@flex.com'}


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
                console.log("TCL: TechnicalEvaluation -> constructor -> props", props)
                this.state = {
                    isLoaded: true,
                    responsiveWidth : window.innerWidth,
                    tech_eval_id : props.projectIntake.technicalEvaluation.tech_eval_id || null,
                    Delivery_Team : props.projectIntake.technicalEvaluation.Delivery_Team || {label : "Select a Delivery Team", value : null},
                    Platform_type : props.projectIntake.technicalEvaluation.Platform_type || {label : "Select Plataform Type", value : null},
                    Applications_involved : props.projectIntake.technicalEvaluation.Applications_involved || {label : "Select Applications Involved", value : null},
                    Technology : props.projectIntake.technicalEvaluation.Technology || [],
                    IT_Groups_Required : props.projectIntake.technicalEvaluation.IT_Groups_Required || {label : "Select IT Groups Required", value : null},
                    Estimated_Effort : props.projectIntake.technicalEvaluation.Estimated_Effort || {label : "Select Estimated Effort", value : null},
                    Project_Team_Size : props.projectIntake.technicalEvaluation.Project_Team_Size || {label : "Select Size", value : null},
                    Project_Manager : props.projectIntake.technicalEvaluation.Project_Manager || {label : "Project_Manager", value : null},
                    Target_Start_Date :props.projectIntake.technicalEvaluation.Target_Start_Date || "",
                    Target_Go_Live_Date :props.projectIntake.technicalEvaluation.Target_Go_Live_Date || "",
                    IT_FTE_required :props.projectIntake.technicalEvaluation.IT_FTE_required || "",
                    Approver : props.projectIntake.technicalEvaluation.Approver || {},
                    Approval_Date : moment(this.props.projectIntake.technicalEvaluation.Approval_Date) || null,
                    Approval_Date_Moment : moment(this.props.projectIntake.technicalEvaluation.Approval_Date) || null,  
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
                    checkForErrors: false,
                    techsToRemove : [],
                    resetTechs : false
                   
                }
                this.onChangeSelect =  this.onChangeSelect.bind(this);
                this.onDateChange =  this.onDateChange.bind(this);
                

                this.del = null

                this.formFields =  this.createFormStructure();
                
            }


            // --------------------------------------
            // Create Form Fields to be rendered
            // --------------------------------------
            componentWillMount() {
                

                // this.unregisterLeaveHook = this.props.router.setRouteLeaveHook(this.props.route, this.routerWillLeave.bind(this));
                // this.unregisterLeaveHook = this.props.router.setRouteLeaveHook(_.last(this.props.router.routes), this.routerWillLeave);
            }


            componentDidMount() {


                // this.state
                console.log("TCL: TechnicalEvaluation -> componentDidMount -> this.state", this.state)

                this.setState({
                    tech_eval_id : this.props.projectIntake.technicalEvaluation.tech_eval_id || null,
                    // Delivery_Team : {"label" : this.props.projectIntake.technicalEvaluation.Delivery_Team, "value" :this.props.projectIntake.technicalEvaluation.Delivery_Team } || {label : "Select a Delivery Team", value : null},
                    Delivery_Team : this.createSelectOption(this.props.projectIntake.technicalEvaluation.Delivery_Team) ,
                    Platform_type : this.createSelectOption(this.props.projectIntake.technicalEvaluation.Platform_type) ,
                    Applications_involved : this.createSelectOption(this.props.projectIntake.technicalEvaluation.Applications_involved) ,
                    Technology : this.loadTechnolgies(this.props.projectIntake.technicalEvaluation.Technology) || [],
                    // Technology : this.loadTech(this.props.projectIntake.technicalEvaluation.Technology) || [],
                    IT_Groups_Required : this.createSelectOption(this.props.projectIntake.technicalEvaluation.IT_Groups_Required) || {label : "Select IT Groups Required", value : null},
                    Estimated_Effort : this.createSelectOption(this.props.projectIntake.technicalEvaluation.Estimated_Effort) || {label : "Select Estimated Effort", value : null},
                    Project_Team_Size : this.prefillSelects(this.props.projectIntake.technicalEvaluation.Project_Team_Size) || {label : "Select Size", value : null},
                    // Project_Manager : this.createSelectOption(this.props.projectIntake.technicalEvaluation.Project_Manager) || this.createSelectOption(""),
                    Target_Start_Date_Moment : this.convertStringToMomentObject(this.props.projectIntake.technicalEvaluation.Target_Start_Date) ,
                    Target_Go_Live_Date_Moment : this.convertStringToMomentObject(this.props.projectIntake.technicalEvaluation.Target_Go_Live_Date),
                    // Approver : this.createSelectOption(this.props.projectIntake.technicalEvaluation.Approver) || this.createSelectOption(""),
                    Approval_Date : moment(this.props.projectIntake.technicalEvaluation.Approval_Date) || null,
                    Approval_Date_Moment : this.convertStringToMomentObject(this.props.projectIntake.technicalEvaluation.Approval_Date),
                    isLoaded : true
                })


                // this.formFields =  this.createFormStructure();    


                // this.loadConditionalValues(this.props.projectIntake.technicalEvaluation.Delivery_Team, false)


                


                this.updateSelectsOnComponentLoad(true);

                

            }

        

            // --------------------------------------
            // Save Form Values before the component
            // unloads by the menu navigation
            // --------------------------------------
            componentWillUnmount() {

                
               

                // let data = this.saveFormValues();
                // this.props.saveLocalTechnical(data);
            }


            // --------------------------------------
            // Init People Pickers
            // --------------------------------------
            // componentDidMount() {

            //     window.addEventListener("resize", this.updateContainerDimensions);

            //     // this.context
                

            //     if(this.props.match.params.projectID) {
            //         const id = this.props.match.params.projectID
            //         const requestID = id.substr(id.indexOf('D')+1,id.length);
            //         const pickersWidth = '175px';

            //         if( this.props.updateFromState !== true  ) {
                        
            //             this.props.fetchProjectTechnical(requestID).then(()=> {
                            
                            
            //                 setTimeout(() => {
            //                     window.initializePeoplePicker('peoplePickerApprover',pickersWidth );
            //                     window.initializePeoplePicker('peoplePickerProject_Manager', pickersWidth);
            //                     this.fillPickers();
            //                     this.props.loadedtechnicalEvaluation.technicalEvaluation && this.loadConditionalValues(this.props.loadedtechnicalEvaluation.technicalEvaluation.Delivery_Team, true)

            //                     this.updateSelectsOnComponentLoad();
            //                 }, 0);


                            
            
            //                 // this.setState({
            //                 //     isLoaded : true
            //                 // })
            //             })
			// 		//console.log('TCL: TechnicalEvaluation -> componentDidMount -> this.props', this.props)
                    
            //         }
            //         else {

            //             // Compare this.props with this.state
            //             let stringState =  this.state && JSON.stringify(this.state) || "";
            //             let stringProps =  this.props.technicalEvaluation && JSON.stringify(this.props.technicalEvaluation) || ""

            //             if(stringState !== "" && stringProps !== "") {
            //                 console.log("TCL: TechnicalEvaluation -> componentDidMount -> stringProps", stringProps)
            //                 console.log("TCL: TechnicalEvaluation -> componentDidMount -> stringState", stringState)
            //                 if(stringState === stringProps)
            //                     console.log('props and state are equal')
            //             }


            //             // ? Use Local Redux State as dataSet
            //             console.log("TCL: TechnicalEvaluation -> componentDidMount -> this.props", this.props)

            //             setTimeout(() => {
            //                 this.setState({
            //                     tech_eval_id : this.props.technicalEvaluation.tech_eval_id || null,
            //                     // Delivery_Team : {"label" : this.props.technicalEvaluation.Delivery_Team, "value" :this.props.technicalEvaluation.Delivery_Team } || {label : "Select a Delivery Team", value : null},
            //                     Delivery_Team : this.createSelectOption(this.props.technicalEvaluation.Delivery_Team) || {label : "Select a Delivery Team", value : null},
            //                     Platform_type : this.createSelectOption(this.props.technicalEvaluation.Platform_type) || {label : "Select Plataform Type", value : null},
            //                     Applications_involved : this.createSelectOption(this.props.technicalEvaluation.Applications_involved) || {label : "Select Applications Involved", value : null},
            //                     Technology : this.loadTechnolgies(this.props.technicalEvaluation.Technology) || [],
            //                     // Technology : this.loadTech(this.props.technicalEvaluation.Technology) || [],
            //                     IT_Groups_Required : this.createSelectOption(this.props.technicalEvaluation.IT_Groups_Required) || {label : "Select IT Groups Required", value : null},
            //                     Estimated_Effort : this.createSelectOption(this.props.technicalEvaluation.Estimated_Effort) || {label : "Select Estimated Effort", value : null},
            //                     Project_Team_Size : this.createSelectOption(this.props.technicalEvaluation.Project_Team_Size) || {label : "Select Size", value : null},
            //                     Project_Manager : this.createSelectOption(this.props.technicalEvaluation.Project_Manager) || this.createSelectOption(""),
            //                     Target_Start_Date :this.convertStringToMomentObject(this.props.technicalEvaluation.Target_Start_Date) || moment(),
            //                     Target_Go_Live_Date :this.convertStringToMomentObject(this.props.technicalEvaluation.Target_Go_Live_Date) || moment(),
            //                     IT_FTE_required :this.props.technicalEvaluation.IT_FTE_required || "",
            //                     Approver : this.createSelectOption(this.props.technicalEvaluation.Approver) || this.createSelectOption(""),
            //                     Approval_Date :this.convertStringToMomentObject(this.props.technicalEvaluation.Approval_Date) || moment(),
            //                     Justification_ROI :this.props.technicalEvaluation.Justification_ROI || "",
            //                     Design_Development_Testing_Effort :this.props.technicalEvaluation.Design_Development_Testing_Effort || "",
            //                     Travel_TE :this.props.technicalEvaluation.Travel_TE || "",
            //                     Consulting :this.props.technicalEvaluation.Consulting || "",
            //                     Training :this.props.technicalEvaluation.Training || "",
            //                     Licenses_Cost_per_year :this.props.technicalEvaluation.Licenses_Cost_per_year || "",
            //                     Hardware_leasing :this.props.technicalEvaluation.Hardware_leasing || "",
            //                     Maintenance_Hardware_hours_per_year :this.props.technicalEvaluation.Maintenance_Hardware_hours_per_year || "",
            //                     Maintenance_Salaries_hours_per_year :this.props.technicalEvaluation.Maintenance_Salaries_hours_per_year || "",
            //                     No_of_Sites :this.props.technicalEvaluation.No_of_Sites || "",
            //                     No_of_Active_users :this.props.technicalEvaluation.No_of_Active_users || "",
            //                     // isLoaded : true
            //                 })
            //                 window.initializePeoplePicker('peoplePickerApprover',pickersWidth );
            //                 window.initializePeoplePicker('peoplePickerProject_Manager', pickersWidth);
            //                 this.fillPickers();
                            
            //                 this.loadConditionalValues(this.props.technicalEvaluation.Delivery_Team, true)

            //                 this.updateSelectsOnComponentLoad();
            //             }, 0);

                      
            //         }
            //     }
            // }


            // componentWillReceiveProps = (nextProps)=> {
            //     //console.log('TCL: TechnicalEvaluation -> componentWillReceiveProps -> nextProps', nextProps)

                
            //     if(nextProps.loadedtechnicalEvaluation.technicalEvaluation) { 
            //         if( !isEqual(this.props.technicalEvaluation, nextProps.loadedtechnicalEvaluation.technicalEvaluation)) {
            //             if(this.props.updateFromDB ===  true || this.props.updateFromDB ===  undefined) {

            //                 console.log("TCL: TechnicalEvaluation -> componentWillReceiveProps -> nextProps.loadedtechnicalEvaluation.technicalEvaluation", nextProps.loadedtechnicalEvaluation.technicalEvaluation)
            //                 this.setState({
            //                     tech_eval_id : nextProps.loadedtechnicalEvaluation.tech_eval_id ||  nextProps.loadedtechnicalEvaluation.technicalEvaluation.tech_eval_id ,
            //                     Delivery_Team : {"label" : nextProps.loadedtechnicalEvaluation.Delivery_Team, "value" :nextProps.loadedtechnicalEvaluation.Delivery_Team } || {label : "Select a Delivery Team", value : null},
                                
            //                     Platform_type : this.prefillSelects(nextProps.loadedtechnicalEvaluation.technicalEvaluation.Platform_type) || {label : "Select Plataform Type", value : null},
            //                     Applications_involved : this.prefillSelects(nextProps.loadedtechnicalEvaluation.technicalEvaluation.Applications_involved) || {label : "Select Applications Involved", value : null},
            //                     Technology : this.loadTechnolgies(nextProps.loadedtechnicalEvaluation.technicalEvaluation.Technology) || [],
            //                     // Technology : this.loadTech(nextProps.loadedtechnicalEvaluation.technicalEvaluation.Technology) || [],
            //                     IT_Groups_Required : this.prefillSelects(nextProps.loadedtechnicalEvaluation.technicalEvaluation.IT_Groups_Required) || {label : "Select IT Groups Required", value : null},
            //                     Estimated_Effort : this.prefillSelects(nextProps.loadedtechnicalEvaluation.technicalEvaluation.Estimated_Effort) || {label : "Select Estimated Effort", value : null},
            //                     Project_Team_Size : this.prefillSelects( nextProps.loadedtechnicalEvaluation.technicalEvaluation.Project_Team_Size || nextProps.loadedtechnicalEvaluation.technicalEvaluation.Project_TShirt_Size) || {label : "Select Size", value : null},
            //                     Project_Manager : nextProps.loadedtechnicalEvaluation.technicalEvaluation.Project_Manager || "",
            //                     Target_Start_Date :this.convertStringToMomentObject(nextProps.loadedtechnicalEvaluation.technicalEvaluation.Target_Start_Date) || moment(),
            //                     Target_Go_Live_Date :this.convertStringToMomentObject(nextProps.loadedtechnicalEvaluation.technicalEvaluation.Target_Go_Live_Date) || moment(),
            //                     IT_FTE_required :nextProps.loadedtechnicalEvaluation.technicalEvaluation.IT_FTE_required || "",
            //                     Approver : nextProps.loadedtechnicalEvaluation.technicalEvaluation.Approver || "",
            //                     Approval_Date :this.convertStringToMomentObject(nextProps.loadedtechnicalEvaluation.technicalEvaluation.Approval_Date) || moment(),
            //                     Justification_ROI :nextProps.loadedtechnicalEvaluation.technicalEvaluation.Justification_ROI || "",
            //                     Design_Development_Testing_Effort : nextProps.loadedtechnicalEvaluation.technicalEvaluation.Design_Development_Testing_Effort ||  nextProps.loadedtechnicalEvaluation.technicalEvaluation.DDT_Effort || "",
            //                     Travel_TE :nextProps.loadedtechnicalEvaluation.technicalEvaluation.Travel_TE || "",
            //                     Consulting :nextProps.loadedtechnicalEvaluation.technicalEvaluation.Consulting || "",
            //                     Training :nextProps.loadedtechnicalEvaluation.technicalEvaluation.Training || "",
            //                     Licenses_Cost_per_year :nextProps.loadedtechnicalEvaluation.technicalEvaluation.Licenses_Cost_per_year || "",
            //                     Hardware_leasing :nextProps.loadedtechnicalEvaluation.technicalEvaluation.Hardware_leasing || "",
            //                     Maintenance_Hardware_hours_per_year : nextProps.loadedtechnicalEvaluation.technicalEvaluation.Maintenance_Hardware_hours_per_year || nextProps.loadedtechnicalEvaluation.technicalEvaluation.Maintenance_Hardware || "",
            //                     Maintenance_Salaries_hours_per_year : nextProps.loadedtechnicalEvaluation.technicalEvaluation.Maintenance_Salaries_hours_per_year || nextProps.loadedtechnicalEvaluation.technicalEvaluation.Maintenance_Salaries || "",
            //                     No_of_Sites :nextProps.loadedtechnicalEvaluation.technicalEvaluation.No_of_Sites || "",
            //                     No_of_Active_users :nextProps.loadedtechnicalEvaluation.technicalEvaluation.No_of_Active_users || "",
            //                     // isLoaded : true
            //                 })
            //             }else {
            //                 console.log("TCL: TechnicalEvaluation -> componentWillReceiveProps -> nextProps.loadedtechnicalEvaluation", nextProps.loadedtechnicalEvaluation)
                        

                          
                            
            //                 this.setState({
            //                     tech_eval_id : nextProps.loadedtechnicalEvaluation.technicalEvaluation.tech_eval_id ,
            //                     // Delivery_Team : {"label" : nextProps.loadedtechnicalEvaluation.Delivery_Team, "value" :nextProps.loadedtechnicalEvaluation.Delivery_Team } || {label : "Select a Delivery Team", value : null},
            //                     Delivery_Team : this.createSelectOption(nextProps.loadedtechnicalEvaluation.Delivery_Team) ||  {label : "Select a Delivery Team", value : null},
            //                     Platform_type : this.createSelectOption(nextProps.loadedtechnicalEvaluation.Platform_type) || {label : "Select Plataform Type", value : null},
            //                     Applications_involved : this.createSelectOption(nextProps.loadedtechnicalEvaluation.Applications_involved) || {label : "Select Applications Involved", value : null},
            //                     Technology : this.loadTechnolgies(nextProps.loadedtechnicalEvaluation.Technology) || [],
            //                     // Technology : this.loadTech(nextProps.loadedtechnicalEvaluation.Technology) || [],
            //                     // Technology : nextProps.loadedtechnicalEvaluation.Technology || {label : "Select Technology Used", value : null},
            //                     IT_Groups_Required : this.createSelectOption(nextProps.loadedtechnicalEvaluation.IT_Groups_Required) || {label : "Select IT Groups Required", value : null},
            //                     Estimated_Effort : this.createSelectOption(nextProps.loadedtechnicalEvaluation.Estimated_Effort) || {label : "Select Estimated Effort", value : null},
            //                     Project_Team_Size : this.createSelectOption(nextProps.loadedtechnicalEvaluation.Project_Team_Size) || {label : "Select Size", value : null},
            //                     Project_Manager : nextProps.loadedtechnicalEvaluation.Project_Manager || this.createSelectOption(""),
            //                     Target_Start_Date :this.convertStringToMomentObject(nextProps.loadedtechnicalEvaluation.Target_Start_Date) || moment(),
            //                     Target_Go_Live_Date :this.convertStringToMomentObject(nextProps.loadedtechnicalEvaluation.Target_Go_Live_Date) || moment(),
            //                     IT_FTE_required :nextProps.loadedtechnicalEvaluation.IT_FTE_required || "",
            //                     Approver : nextProps.loadedtechnicalEvaluation.Approver || this.createSelectOption(""),
            //                     Approval_Date :this.convertStringToMomentObject(nextProps.loadedtechnicalEvaluation.Approval_Date) || moment(),
            //                     Justification_ROI :nextProps.loadedtechnicalEvaluation.Justification_ROI || "",
            //                     Design_Development_Testing_Effort :nextProps.loadedtechnicalEvaluation.Design_Development_Testing_Effort || "",
            //                     Travel_TE :nextProps.loadedtechnicalEvaluation.Travel_TE || "",
            //                     Consulting :nextProps.loadedtechnicalEvaluation.Consulting || "",
            //                     Training :nextProps.loadedtechnicalEvaluation.Training || "",
            //                     Licenses_Cost_per_year :nextProps.loadedtechnicalEvaluation.Licenses_Cost_per_year || "",
            //                     Hardware_leasing :nextProps.loadedtechnicalEvaluation.Hardware_leasing || "",
            //                     Maintenance_Hardware_hours_per_year :nextProps.loadedtechnicalEvaluation.Maintenance_Hardware_hours_per_year || "",
            //                     Maintenance_Salaries_hours_per_year :nextProps.loadedtechnicalEvaluation.Maintenance_Salaries_hours_per_year || "",
            //                     No_of_Sites :nextProps.loadedtechnicalEvaluation.No_of_Sites || "",
            //                     No_of_Active_users :nextProps.loadedtechnicalEvaluation.No_of_Active_users || "",
            //                     // isLoaded : true
            //                 })

            //                 this.loadConditionalValues(this.props.technicalEvaluation.Delivery_Team, true)

            //             }
                        
            //         }
            //     }
                
        

            // }


            // --------------------------------------
            // 
            // --------------------------------------
            // componentWillUnmount() {
                
                
            //     console.log("TCL: TechnicalEvaluation -> componentWillUnmount -> this.state", this.state)
                
                
            //     console.log("TCL: TechnicalEvaluation -> componentWillUnmount -> this.props", this.props)

            //     const formData = this.saveFormValues();
                
            //     this.props.saveLocalTechnical(formData);
            // }


            // --------------------------------------
            // Window Resizing
            // --------------------------------------
            updateContainerDimensions = () => {
                let newWidth = window.innerWidth;
                this.setState({responsiveWidth : newWidth});
            }


            // --------------------------------------
            // Fill SIngle Select Wtih DB Data
            // --------------------------------------
        
            prefillSelects(selectData) {
                
                if(selectData === undefined || selectData === null || selectData === "")
                    return {}

                console.log("TCL: TechnicalEvaluation -> prefillSelects -> selectData", selectData)

                if(typeof selectData === 'object' && selectData !== null) {
                    console.log("TCL: TechnicalEvaluation -> prefillSelects -> selectData", selectData)
                    return selectData;
                }

                let selectItem = {}
            
                if(selectData.value) {
                    selectItem = {
                        "label" : this.removeSpecialCharacters(selectData.value),
                        "value" : this.removeSpecialCharacters(selectData.value)
                    }
                }

                else {
                    selectItem = {
                        "label" : this.removeSpecialCharacters(selectData),
                        "value" : this.removeSpecialCharacters(selectData)
                    }
                }

                

                return selectItem;
            }

            // --------------------------------------
            // Create Default Selectio Option
            // --------------------------------------
            createSelectOption(optionValue) {
                console.log("TCL: TechnicalEvaluation -> createSelectOption -> optionValue", optionValue)
                // ? If the value is already an object, return the value
                if(typeof optionValue === 'object' && optionValue !== null)
                  return optionValue;

                // ? Create Object with the values
                const option = {
                    label : this.removeSpecialCharacters(optionValue),
                    value : this.removeSpecialCharacters(optionValue)
                }

                return option;
            }

            // --------------------------------------
            // Load All Sites from array
            // --------------------------------------
            loadTechnolgies(techs) {
                if( techs===undefined || !techs.length)
                    return [];

                if(Array.isArray(techs) === true)
                    return techs;


                const techsArray =  techs.split('||')
                let techsData = [];
                for(let techsCounter = 0; techsCounter<techsArray.length; techsCounter++) {
                    if(techsArray[techsCounter] !== "")
                        techsData.push({'label' : techsArray[techsCounter], 'value' : techsArray[techsCounter]})
                }

                return techsData;
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
                        // "value": this.loadTech( this.props.loadedtechnicalEvaluation.technicalEvaluation.Tec this.state.Technology),
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
                            // {label : "Select Effort", value : ""},
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
                            // {label : "Select Size", value : ""},
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
                        // "wideControl": false
                        "wideControl": this.state.responsiveWidth <=1440 && true,
                    },
                    {
                        "Field_Name": "Approval Date",
                        "Field_State_Name": "Approval_Date",
                        "value": this.state.Approval_Date_Moment,
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
                        // "wideControl": true,
                        "wideControl": this.state.responsiveWidth <=1440 && true,
                        "toolTipText": "Auto pick of Date & Time stamp from the system. It should follow standard time across locations"
                    },
                   
                    {
                        "Field_Name": "Target Start Date",
                        "Field_State_Name": "Target_Start_Date",
                        "value": this.state.Target_Start_Date_Moment,
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
                        "value": this.state.Target_Go_Live_Date_Moment,
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

        

            // --------------------------------------
            // Force Re-render of Selects
            // --------------------------------------
            updateSelectsOnComponentLoad(useState = false) {
                // ?Get Selec Inputs


                if(useState === true && !isEmpty(this.state)) {



                    try {
                        this.formFields.forEach(formItem => {
                            if(formItem.Type === "Combo")  {


                                // console.log("TCL: updateSelectsOnComponentLoad -> this.props.loadedBusinessInformation.businessInformation[formItem.Field_State_Name]", this.props.loadedBusinessInformation.businessInformation[formItem.Field_State_Name])

                                // ? Get element By Id
                                let selElement = document.getElementById(formItem.Field_State_Name);
                                    // console.log("TCL: updateSelectsOnComponentLoad -> selElement", selElement)

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
                                    // if(formItem.Field_State_Name === 'Project_Team_Size')
                                    //     reactSelectInput.innerText = this.props.projectIntake.technicalEvaluation['Project_TShirt_Size']
                                    // else if (formItem.Field_State_Name === 'Delivery_Team')
                                        reactSelectInput.innerText = this.removeSpecialCharacters(this.state[formItem.Field_State_Name])
                                        
                                    
                                }
                            }

                            
                        });
                    }
                    catch (error) {
                        console.log("TCL: updateSelectsOnComponentLoad -> error", error)
                        
                    }
                }   
              
             

              

            }



            // --------------------------------------
            // Remove Special Characters from Strings
            // --------------------------------------
            removeSpecialCharacters(stringToChange) {
                if(stringToChange)
                    return stringToChange.replace(/amp;/g, '')
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
            
            
            
				
                if(control === "Delivery_Team" ) {
                    this.loadConditionalValues(selectedOption.value, false);

                    // this.state.Technology
                    console.log("TCL: TechnicalEvaluation -> onChangeSelect -> this.state.Technology", this.state.Technology)

                    this.setState({
                        // Applications_involved :  {label : "", value : null} ,
                        Technology :  [],
                        techsToRemove : this.state.Technology,
                        // IT_Groups_Required :  {label : "", value : null} ,
                        Delivery_Team : selectedOption,
                        // conditionalTechnologies : [],
                        resetTechs : true
                    })
                }


                else if(control === "Technology") {

                    this.setState({Technology : selectedOption})

                }

                    
                else this.setState({
                    [control] : selectedOption
                })   
            }


            // --------------------------------------
            // Load Conditional Select Values
            // --------------------------------------
            loadConditionalValues(selectedOption, preloadData) {

                let switchOption = selectedOption.value ? selectedOption.value : selectedOption
                console.log("TCL: TechnicalEvaluation -> loadConditionalValues -> switchOption", switchOption)
                
                switch(switchOption) {
                    // ? Data from DB
                    // "Platform Solution - Ben Web´s Org"
                    case "1- Platform Solution - Ben Webs Org" :
                        this.setState({
                            // Technology : {label : "Select Technology Used", value : null},
                            // Applications_involved :  {label : "Select Applications Involved", value : null},
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
                        // ? When loading data from state
                        case "Platform Solution - Ben Web´s Org" :
                            this.setState({
                                // Technology : {label : "Select Technology Used", value : null},
                                // Applications_involved :  {label : "Select Applications Involved", value : null},
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
                        case "2.- Global Ops - Sujit Gopinath´s Org":    
                            this.setState({
                                // Technology : {},
                                // Applications_involved :  {},
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
                        // ? When loading data from state
                        case "Global Ops - Sujit Gopinath´s Org":    
                            this.setState({
                                // Technology : {},
                                // Applications_involved :  {},
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
                        case "3.- GSS & Sales & Quality - Sapan Parikh´s Org" :
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
                        // ? When loading data from state
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
                    case "4.- D&E, WFD and Pulse  Aristoteles Portillo´s Org" :
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
                        
                    this.setState({
                        Applications_involved :  {label : "", value : null} ,
                        Technology :  [] ,
                        IT_Groups_Required :  {label : "", value : null} 
                    })

                    // reset Other Selects
                    let sel1 = document.getElementById('Applications_involved').getElementsByClassName('react-select-wide__single-value')[0];
                        if(sel1) sel1.textContent = "Select Applications Involved";
                        else document.getElementById('Applications_involved').getElementsByClassName('react-select-wide__placeholder')[0].textContent = "Select Applications Involved"

                        let sel2 = document.getElementById('Technology').querySelectorAll('.react-select-wide__multi-value')
                        // document.querySelectorAll('.react-select-wide__multi-value')
                        // sel2.textContent = "Select Technology";
    
                        // if(sel2) {
                        //     for (var paragraph of sel2) {
                        //         paragraph.remove();
                        //     }

                        //     document.getElementById('Technology').querySelectorAll('.react-select-wide__clear-indicator').length > 0 && document.getElementById('Technology').querySelectorAll('.react-select-wide__clear-indicator')[0].remove()
                        // }
                    
                    let sel3 = document.getElementById('IT_Groups_Required').getElementsByClassName('react-select-wide__single-value')[0];
                        if(sel3)  sel3.textContent = "Select IT Groups Required"
                        else document.getElementById('IT_Groups_Required').getElementsByClassName('react-select-wide__placeholder')[0].textContent = "Select IT Groups Required"
                }


            }


            // --------------------------------------
            // Load All Sites from array
            // --------------------------------------
            // loadTech(technology) {
            //     if( technology===undefined || !technology.length)
            //         return [];
            //     const technologyArray = technology.indexOf('||') > -1  ?  technology.split('||')  : [technology];
            //     let technologyData = [];
            //     for(let technologyCounter = 0; technologyCounter<technologyArray.length; technologyCounter++) {
            //         technologyData.push({'label' : technologyArray[technologyCounter], 'value' : technologyArray[technologyCounter]})
            //     }

            //     return technologyData;
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

                if( !document.getElementById(pickerName) )
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
                
                if(this.props.loadedtechnicalEvaluation.technicalEvaluation !== undefined) {
                    const {Approver, Project_Manager} = this.props.loadedtechnicalEvaluation.technicalEvaluation ;

                    if(Approver)
                        window.fillPeoplePicker(Approver, 'Approver');
                    if(Project_Manager)
                        window.fillPeoplePicker(Project_Manager, 'Project_Manager');


                    // Add tabIndex
                    document.getElementById('peoplePickerApprover_TopSpan_EditorInput').tabIndex = 52;
                    
                    document.getElementById('peoplePickerProject_Manager_TopSpan_EditorInput').tabIndex = 53;

                }
                
                  // Add tabIndex
                  document.getElementById('peoplePickerApprover_TopSpan_EditorInput').tabIndex = 52;
                    
                  document.getElementById('peoplePickerProject_Manager_TopSpan_EditorInput').tabIndex = 53;

				

            }

            disablePickers() {
                if (this.props.loadedBusinessInformation.businessInformation !== undefined) {
                    if(this.props.requirementsDefinition.workstage === 'Requested' && this.props.isPMO === false) {
                        window.disablePickers();
                    }
                }

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


        
        /* ==========================================================================
        ** Save Values
        ** ========================================================================== */

            // --------------------------------------
            // Validate Empty PP
            // ! TODO Remove Empty Validation
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
            // Validate Form Inputs
            // --------------------------------------
            validateFormInputs() {
                const fields = this.formFields;

                if(fields.length <= 0)
                    return true

                let errors = fields && fields.map((fieldItem) => {
                    if (fieldItem.Mandatory === true) {

                        // Check PP
                        if (fieldItem.Type === "PeoplePicker") {
                            //console.log('TCL: validateFormInputs -> fieldItem PP', fieldItem)
                            if (this.validatePeoplePicker(fieldItem.Field_State_Name) === true)
                                return false
                            else {
                                return true;
                            }

                        }
                        // Check empty value for text input
                        else if (fieldItem.Type === "Text" || fieldItem.Type === "Decimal" || fieldItem.Type === "Integer") {
                            //console.log(`TCL: validateFormInputs -> fieldItem.value Text->${fieldItem.Field_State_Name}`, fieldItem.value)
                            if (this.state[fieldItem.Field_State_Name] === null || this.state[fieldItem.Field_State_Name] === "") {
                                this.addErrorStatus(fieldItem.Field_State_Name);
                                return true;
                            }
                            else {
                                this.removeErrorStatus(fieldItem.Field_State_Name)
                                return false;
                            }

                        }
                        // Check Combo
                        else if (fieldItem.Type === "Combo" || fieldItem.Type === "DynamicField") {
                            //console.log(`TCL: validateFormInputs -> fieldItem.value Copmbo->${fieldItem.Field_State_Name}`, fieldItem.value)

                            if(fieldItem.Field_State_Name === "IT_Groups_Required" || fieldItem.Field_State_Name ===  "Applications_involved" || fieldItem.Field_State_Name === "Technology") {
                                // if(!fieldItem.value.value) {
                                //     this.addErrorStatus(fieldItem.Field_State_Name);
                                //     this.setState({ [fieldItem.Field_State_Name] : {label : "", value : null} })
                                //     return true;
                                // }
                                // else {
                                //     this.removeErrorStatus(fieldItem.Field_State_Name)
                                //     return false;
                                // }

                                if (this.state[fieldItem.Field_State_Name].value === "" || this.state[fieldItem.Field_State_Name].value === null || this.state[fieldItem.Field_State_Name] === null || this.state[fieldItem.Field_State_Name] === []) {
                                    this.addErrorStatus(fieldItem.Field_State_Name);
                                    return true;
    
                                }
                                else {
                                    this.removeErrorStatus(fieldItem.Field_State_Name)
                                    return false;
                                }
                            }


                        

                            else if (this.state[fieldItem.Field_State_Name].value === "" || this.state[fieldItem.Field_State_Name].value === null || this.state[fieldItem.Field_State_Name] === null || this.state[fieldItem.Field_State_Name] === []) {
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
                const errorsCount = errors.filter(error => { return error === true }).length
                //console.log('TCL: TechnicalEvaluation -> validateFormInputs -> errorsCount', errorsCount)

                return errorsCount > 0 ? false : true

            }



                
            
        

            // --------------------------------------
            // Save Form values
            // --------------------------------------
            saveFormValues() {
                //! const currentUser = window.getCurrentSPUser();
            
                // const projectID = this.props.requirementsDefinition.requirementsDefinition.newProjectID || this.props.loadedtechnicalEvaluation.technicalEvaluation.project_id;
                // const requestID = projectID.substr(projectID.indexOf('D')+1,projectID.length);


                // console.log("TCL: TechnicalEvaluation -> saveFormValues -> this.props.loadedtechnicalEvaluation.technicalEvaluation.Delivery_Team", this.props.loadedtechnicalEvaluation.technicalEvaluation.Delivery_Team)
                let delTeam = null;
                try {

                    console.log("TCL: TechnicalEvaluation -> saveFormValues -> this.del ", this.del )

                    if( this.del )   {
                        delTeam = this.del
                    }
                    

                    if(this.state.Delivery_Team.value === undefined || this.state.Delivery_Team.value === null) 
                        delTeam = this.props.projectIntake.technicalEvaluation.Delivery_Team 
                    else
                        delTeam = this.state.Delivery_Team.value
                }
                catch(error) {
                    delTeam = null;
                }

                const requestID = this.getProjectID();
                const formData = {
                    Project_ID : requestID,
                    tech_eval_id : this.state.tech_eval_id,
                    // Delivery_Team : this.state.Delivery_Team,
                    Delivery_Team : delTeam,
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
            submitFormLocalData = (event) => {
            
                
                // this.props.saveLocalTechnical(formData);

                if(this.validateFormInputs() === false) {
                    this.createErrorAlertTop('Please Fill all the Required Fields');
                    this.setState({checkForErrors : true})
                    return;
                }

                const formData = this.saveFormValues();
                this.props.updateProjectIntakeValues('technical',formData)
                

                // Show Sucess Message 
                this.createSuccessAlert('Data Saved Locally');
                // Redirect User
                    setTimeout(()=>{this.redirectUser();},700);
                // this.redirectUser();
            
            }

            // --------------------------------------
            // Save Values When Returning to Prev Step
            // --------------------------------------   
            submitFormLocalDataReturn = (event) => {

                this.redirectUserPrev();
            }

            // --------------------------------------
            // Save New Technical
            // --------------------------------------
            saveNewTechnicalDB() {
                const formData = this.saveFormValues();
                const nextStep = 'pmo-evaluation';

                // this.props.saveLocalTechnical(formData);
                this.props.saveTechnicalDB(formData).then(()=>{
                    this.createSuccessAlert('Data Saved ');
                    // Check If Action was Success
                    const newTechnicalEvaluationId = this.props.technicalEvaluation.newTechnicalEvaluationId
						
                        
                        // this.props.resetTechnicalState()

                        this.props.saveLocalTechnical(formData);
                        console.log("TCL: saveNewTechnicalDB -> this.props", this.props)


                    // this.setState({sendingData : false}, this.redirectUser(nextStep))

                    this.setState({sendingData : false})
                    // this.setState({sendingData : false})

                    

                })
                .catch((error)=> {
                    console.log("TCL: saveNewTechnicalDB -> error", error)
                    this.createErrorAlert('There was a problem saving the data, please try again ');
						
                    this.setState({sendingData : false},)
                })
            }




            // --------------------------------------
            // Update Current Techincal
            // --------------------------------------
            updateCurrentTechnicalDB = ()=> {
                const formData = this.saveFormValues();
                const nextStep = 'pmo-evaluation';
                // this.props.saveLocalTechnical(formData);
                this.props.updateTechnicalDB(formData).then(()=>{
                
                    this.createSuccessAlert('Data Saved ');
                    // Check If Action was Success
                    // const newTechnicalEvaluationId = this.props.technicalEvaluation.newTechnicalEvaluationId
						
						
                        // this.props.resetTechnicalState()

                        
                        

                    // this.setState({sendingData : false}, this.redirectUser(nextStep))

                    console.log("TCL: TechnicalEvaluation -> updateCurrentTechnicalDB -> formData", formData)

                    this.setState({sendingData : false, Delivery_Team : this.createSelectOption(formData.Delivery_Team)})

                    this.del =  this.createSelectOption(formData.Delivery_Team)

                    this.props.saveLocalTechnical(formData);

                })
                .catch((error)=> {
                    console.log("TCL: updateCurrentTechnicalDB -> error", error)
                    
						
                    this.setState({sendingData : false})
                })
            }




            
            //! --------------------------------------
            //! Submit Form to DB
            //! --------------------------------------
            submitFormDB = () => {

                // Validate Fields

                if(this.validateFormInputs() === false) {
                    this.createErrorAlertTop('Please Fill all the Required Fields');
                    this.setState({checkForErrors : true})
                    return;
                }



                if(this.validateDates(this.state.Approval_Date, this.state.Target_Start_Date, this.state.Target_Go_Live_Date) === false) {

                    return;
                }

                this.setState({sendingData : true})

                // Check if New Technical or Update Current
                const {technicalEvaluation} = this.props.loadedtechnicalEvaluation;

                if(technicalEvaluation) {
                    // Update
                    this.updateCurrentTechnicalDB();
                }
                else {
                    // Create New Technical
                    this.saveNewTechnicalDB();
                }


                // this.updateSelectsOnComponentLoad(true)


                // this.state
                console.log("TCL: submitFormDB -> this.state", this.state)


                // this.formFields = this.createFormStructure();

                this.saveOtherTabs();

                // this.componentDidMount();

            
            }


                // !--------------------------------------
                // ! Save Other Tabs
                // !--------------------------------------
                saveOtherTabs = async () => {
                    // this.props.businessInformation

                    console.log("TCL: saveOtherTabs -> this.props", this.props)
                    console.log("TCL: saveOtherTabs -> this.props.businessInformation", this.props.businessInformation)


                    // let promises = []

                    // ? Save Req Definition
                    if( !isEmpty(this.props.requirementsDefinition) ) {
                        console.log("TCL: saveOtherTabs -> this.props.requirementsDefinition", this.props.requirementsDefinition)
                    
                        this.props.updateRequirementsDB(this.props.requirementsDefinition);
                        let reqFolderURL = `GSD${this.props.requirementsDefinition.Project_id}/RequirementsDefinition`;
                        this.uploadReqFiles(this.props.requirementsDefinition.Project_id, reqFolderURL);
                  
                    }


                    // ? Save Business Information
                    if( !isEmpty(this.props.businessInformation) ) {
                        console.log("TCL: saveOtherTabs -> this.props.businessInformation", this.props.businessInformation)
                        if(this.props.businessInformation.buss_info_id)
                           this.props.updateBusinesInformationDB(this.props.businessInformation)
                        else
                           this.props.saveBusinesInformationDB(this.props.businessInformation)
                    }

                  

                    // ? Save PMO Evaluation
                    if(!isEmpty(this.props.pmoEvaluation)) {
                        if(this.props.pmoEvaluation.pmo_eval_id) {
                           this.props.updatePMOEvaluation(this.props.pmoEvaluation);
                        }
                        else
                           this.props.savePMOEvaluationDB(this.props.pmoEvaluation);
                    }



                    // ? Save Roi Realized


                    if(!isEmpty(this.props.roiRealized)){
                    //    roiRealized not empty && roi.roi has data
                        if(!isEmpty(this.props.roiRealized) && !isEmpty(this.props.roiRealized.roiRealized)) {
                            //? Look for Id to Update
                            if(this.props.roiRealized.roiRealized.roi_real_id) { 
                                this.props.updateROIRealizedDB(this.props.roiRealized);
                            }
                            else
                                this.props.saveROIRealizedDB(this.props.roiRealized, this.props.requirementsDefinition.Project_id);


                            //? look for dynatrace

                            if(!isEmpty(this.props.roiRealized.dynatrace))   
                                this.props.saveDynatraceDB(this.props.roiRealized.dynatrace, this.props.requirementsDefinition.Project_id.id, this.props.roiRealized.roiRealized.roi_real_id)

                        }

                        
                       
                        
                    }




                    // this.componentDidMount();
                }
            



            
            // --------------------------------------
            // Redirect User
            // --------------------------------------
            redirectUser() {
                const {history} = this.props.locationData;
                const id = this.props.locationData.match.params.projectID
                //? const path = '/sites/gsd/intake_process/IntakeProcess/ProjectIntake.aspx';

                const path = '/intake'
                
                history.push(`${path}/project/${id}/pmo-evaluation`);
                
            }

            // --------------------------------------
            // Redirect User to Prev Step
            // --------------------------------------
            
            redirectUserPrev() {
                const {history, location} = this.props.locationData;
                //? const path = '/sites/gsd/intake_process/IntakeProcess/ProjectIntake.aspx';

                const path = '/intake'
                let pathArray = location.pathname.split('/');
                let projectIndex = pathArray[pathArray.length - 2];
				// console.log("TCL: BusinessInformation -> redirectUserPrev -> projectIndex", projectIndex)
                
                history.push(`${path}/project/${projectIndex}/business-information`);
                // history.goBack();
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
                uploadReqFiles (folderName, foldertoUpload, saveOnDB = true) {
                    console.log("TCL: TechnicalEvaluation -> uploadReqFiles -> folderName", folderName)

                    const filesArray = this.props.requirementsDefinition.Project_docs
                    const folderURL = `intakeFiles/${foldertoUpload}`;
                    let filesToUploadDBArray = [];
                  
                    // Iterate Files
                    for(let file of filesArray) {
                        let saveFile = null
                        let fileURL = '';

                        if(!file.name) 
                            saveFile =  this.createMockFile(file )
                        else
                            saveFile = file;
                        
                        // //console.log('TCL: uploadFiles -> file', file)
                        //? Set File URL to Save on DB
                        if(saveFile.name.indexOf('sites/') >= 0) 
                            fileURL = saveFile.name
                        else {
                            // ? Create new URl and the just upload the new file
                            fileURL = `sites/gsd/intake_process/${folderURL}/${saveFile.name}`;
                            window.uploadFilesToFolder(folderURL, saveFile.name, saveFile, filesArray.length);
                        }
                            


                        // console.log("TCL: uploadFiles -> fileURL", fileURL)
                       
                        // if(filesArray.length > 0)
                            
                        
                        
                        filesToUploadDBArray.push(fileURL);
                        // console.log("TCL: uploadFiles -> filesToUploadDBArray", filesToUploadDBArray)
                    }

                   if(saveOnDB === true) 
                    // if(filesToUploadDBArray.length > 0)
                        this.saveFilesonDB(folderName, filesToUploadDBArray)
                    //    }


                    // this.setState({currentMessage : 'Saving Files'})
                    // const filesArray = this.props.requirementsDefinition.Project_docs;
                    

                    // const folderURL = `intakeFiles/${foldertoUpload}`;
                    // let filesToUploadDBArray = [];
                    // if(filesArray.length <= 0)
                    //     return;
                    
                    // // Iterate Files
                    // for(let file of filesArray) {
                    //     let saveFile = null
                    //     let fileURL = '';
                        
                    //     // //console.log('TCL: uploadFiles -> file', file)
                    //     // let fileURL = `sites/gsd/intake_process/IntakeProcess/${folderURL}/${file.name}`;
                    //     // window.uploadFilesToFolder(folderURL,file.name, file, filesArray.length);
                        
                    //     // filesToUploadDBArray.push(fileURL);


                    //     if(!file.name) 
                    //         saveFile =  this.createMockFile(file)
                    //     else
                    //         saveFile = file;
                    
                    // // //console.log('TCL: uploadFiles -> file', file)
                    //     // Set File URL to Save on DB
                    //     if(saveFile.name.indexOf('sites/') >= 0) 
                    //         fileURL = saveFile.name
                    //     else
                    //         fileURL = `sites/gsd/intake_process/IntakeProcess/${folderURL}/${saveFile.name}`;


                    //     window.uploadFilesToFolder(folderURL, saveFile.name, saveFile, filesArray.length);

                    //     filesToUploadDBArray.push(fileURL);
                    // }

                    

                    // if(filesToUploadDBArray.length > 0)
                    //     this.saveFilesonDB(folderName, filesToUploadDBArray)
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
                
                console.log("TCL: checkErrorClass -> value", value)
                console.log("TCL: checkErrorClass -> id", id)
                console.log("TCL: checkErrorClass -> target", target)
               
                if(id) {
                     //? Check for PeopplePicker
                    if(id.indexOf('peoplePicker') >= 0) {
                        let pickerName = id.substring(0, id.indexOf('_EditorInput'))
                        
                        console.log("TCL: checkErrorClass -> pickerName", pickerName)
                    
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
                    else if( (id && this.state[id].value !== "" ) || (id && this.state[id].value !== null ))
                        this.removeErrorStatus(id)

                    //? Check Input Text Fields
                    else if(value.length > 0)
                        this.removeErrorStatus(id)
                
                    //? Puth Back Error Message
                    else  if(this.state.checkForErrors === true)
                        this.addErrorStatus(id)
                }
               
                
            }


            // --------------------------------------
            // Show Error Message
            // --------------------------------------
            createErrorAlert = (message) => {
                Alert.error(message, {
                    position: 'bottom',
                    effect: 'jelly'
                });
            }


            // --------------------------------------
            // Show Sucess Message
            // --------------------------------------
            createSuccessAlert = (message) => {
                Alert.info(message, {
                    position: 'bottom'
                });
            }

        


            // --------------------------------------
            // Render Projects
            // --------------------------------------
            renderTechnicalEvaluation() {
                const {sendingData} = this.state;
                const {isPMO} = this.props;
                // if (isPMO === false ) 
                //     return (<Redirect to={'/'}/>)
                if (! this.props.projectIntake.requirementsDefinition || !this.props.isPMO)  {
                    let currentProject = this.props.locationData.match.params.projectID
                    // return (<Redirect to={`/sites/gsd/intake_process/IntakeProcess/ProjectIntake.aspx/project/${currentProject}/requirement-definition`}/>)
                    window.location.href = `/sites/gsd/intake_process/IntakeProcess/ProjectIntake.aspx/project/${currentProject}/requirement-definition`
                }
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
                
                const {isLoaded} = this.state
                return isLoaded ? this.renderTechnicalEvaluation() : this.renderLoader();
            }
    }

    
// -------------------------------------- 
// Define PropTypes 
// -------------------------------------- 
    TechnicalEvaluation.propTypes = {
        projectIntake : PropTypes.object,
        isPMO : PropTypes.bool,
        locationData : PropTypes.object,
        updateProjectIntakeValue : PropTypes.func
    };

/* ==========================================================================
** Redux Functions
** ========================================================================== */
  



// --------------------------------------
// Export Component
// --------------------------------------
    export default  (TechnicalEvaluation);
    