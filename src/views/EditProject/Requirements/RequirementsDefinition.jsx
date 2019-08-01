/* ==========================================================================
** Tab 1 Of Form Handle the Requirement Definition 
** Edit Project
** 28/01/2019
** Alan Medina Silva
** ========================================================================== */

// --------------------------------------
// Get Dependences
// --------------------------------------
    import React, { Component, Fragment } from 'react';
    import PropTypes from 'prop-types';
    import form_icon from '../../../assets/img/form_icon.png';
    import { FieldsGenerator, AppLoader, FormFooter, AppButton, FormBody } from '../../../components';
  
    import { isEqual , isEmpty} from 'lodash';
    import { withRouter } from 'react-router';
  
    import Alert from 'react-s-alert';
    import 'react-s-alert/dist/s-alert-default.css';
    import 'react-s-alert/dist/s-alert-css-effects/slide.css';
    import moment from 'moment';
    


    const currentUser =  {userName : 'Alan Medina', userEmail : 'alan.medina@flex.com'}


// --------------------------------------
// Create Component Class
// --------------------------------------
    class RequirementsDefinition extends Component {


        /* ==========================================================================
        ** Component Setup
        ** ========================================================================== */

            // --------------------------------------
            // Constructor
            // --------------------------------------
            constructor(props) {
                super(props);
                // //console.log('TCL: RequirementsDefinition -> constructor -> props.loadedRequirements', props)
                //? const currentUser = window.getCurrentSPUser();

                // const currentUser =  {userName : 'Alan Medina', userEmail : 'alan.medina@flex.com'}
                const projectID = props.projectIntake.requirementsDefinition.newProjectID || props.projectIntake.requirementsDefinition.Request_ID;
                console.log("TCL: RequirementsDefinition -> constructor -> props", props)
				
                this.state = {
                    isLoaded: false,
                    sendingData : false,
                    currentMessage : 'Saving Values',
                    Date_Submitted : moment(props.projectIntake.requirementsDefinition.Date_Submitted) || null,  
                    Request_Owner : props.projectIntake.requirementsDefinition.Request_Owner || currentUser.userName,  
                    Request_ID : projectID || '',  
                    Workstage : props.projectIntake.requirementsDefinition.Workstage || {"label" : "1 - New" , "value": "New" },  
                    Project_Name :props.projectIntake.requirementsDefinition.Project_Name || "",  
                    Description : props.projectIntake.requirementsDefinition.Description || "", 
                    Expected_Start_Date : moment(props.projectIntake.requirementsDefinition.Expected_Start_Date) || null,  
                    Expected_Completion_Date : moment(props.projectIntake.requirementsDefinition.Expected_Completion_Date) || null,   
                    Expected_Start_Date_Moment : moment(props.projectIntake.requirementsDefinition.Expected_Start_Date) || null,  
                    Expected_Completion_Date_Moment : props.projectIntake.requirementsDefinition.Expected_Completion_Date || null,   
                    Deadline_Justification : props.projectIntake.requirementsDefinition.Deadline_Justification || "",     
                    Project_Type : props.projectIntake.requirementsDefinition.Project_Type || {label : "Project Type", value : null},    
                    Project_Documents : props.projectIntake.requirementsDefinition.Project_Documents ||  [],  
                    spFiles : props.projectIntake.requirementsDefinition.SPFiles || [],
                    hasErrors : false,
                    isShowingModal : false,
                    buttonDisabled : false,
                    usersCanEdit : true,
                    showFileManager : false,
                    checkForErrors : false,
                    redirectUser : false,
                    newFilesCancelled : false,
                    fileRemoved : false,
                    dataSavedOnDB : false

                }
                this.onChangeSelect =  this.onChangeSelect.bind(this);
                this.onDateChange =  this.onDateChange.bind(this);
                this.preloadFiles =  this.preloadFiles.bind(this);
                this.filesArray = [];
                this.originalFiles = [];
                // this.filesArray =  this.props.requirementsDefinition.project_docs || this.props.requirementsDefinition.Project_docs ||  [];
                // this.filesArray =  this.props.requirementsDefinition.project_docs[0] === "" ? [] : props.requirementsDefinition.project_docs ;
				//console.log('TCL: RequirementsDefinition -> constructor -> this.props.requirementsDefinition.project_docs', this.props.requirementsDefinition.project_docs)
                

            }



          


            // --------------------------------------
            // Save Form Values before the component
            // unloads by the menu navigation
            // --------------------------------------
            componentWillUnmount() {
                
                this.submitFormLocalData(true)
                // this.props.saveLocalRequirements(formData);
            }



            componentDidMount() {

              

                this.setState({
                    Expected_Start_Date : moment(this.props.projectIntake.requirementsDefinition.Expected_Start_Date )|| moment(),  
                    Expected_Completion_Date : moment(this.props.projectIntake.requirementsDefinition.Expected_Completion_Date) || moment(),   
                    Expected_Start_Date_Moment : this.convertStringToMomentObject(this.props.projectIntake.requirementsDefinition.Expected_Start_Date) || moment(),  
                    Expected_Completion_Date_Moment : this.convertStringToMomentObject(this.props.projectIntake.requirementsDefinition.Expected_Completion_Date) || moment(),   
                    Project_Type : this.createSelectOption(this.props.projectIntake.requirementsDefinition.Project_Type),
                    Workstage : this.createSelectOption(this.props.projectIntake.requirementsDefinition.Workstage),
                    isLoaded : true
                })

                this.formFields =  this.createFormStructure();
            }

                   
                
            




              // --------------------------------------
            // Set Initial Values
            // Look For Project ID
            // --------------------------------------
            // componentDidMount() {
            //     if(this.props.match.params.projectID) {
            //         const id = this.props.match.params.projectID
                    
            //         const requestID = id.substr(id.indexOf('D')+1,id.length);

                    
            //         // this.props.fetchProjectFiles(id, 'RequirementsDefinition')
                        
                    
            //         // if(!this.props.requirementsDefinition.requirementsDefinition) {
            //         if(this.props.updateFromState !== true ) {
            //             this.props.fetchProjectRequirements(requestID)

            //             this.props.fetchProjectFiles(id, 'RequirementsDefinition')


                        
                        

            //             // this.formFields =  this.createFormStructure();
                        
            //         }
            //         else {
            //             // ? Use Local Redux State as dataSet
            //             // console.log("TCL: RequirementsDefinition -> componentDidMount -> this.props", this.props.requirementsDefinition)
            //             // console.log("TCL: componentDidMount -> this.props.requirementsDefinition", this.props.requirementsDefinition)


            //             this.setState({
            //                 Date_Submitted : this.formatDate(this.props.requirementsDefinition.Date_submitted) ,  
            //                 Date_Submitted_Moment : this.convertStringToMomentObject(this.props.requirementsDefinition.Date_submitted) || moment(),  
            //                 Request_Owner : this.props.requirementsDefinition.Request_Owner ,  
            //                 Request_ID : this.props.requirementsDefinition.request_id ||  this.props.requirementsDefinition.Project_id,  
            //                 // Workstage : {label : this.props.requirementsDefinition.workstage, value : this.props.requirementsDefinition.workstage},  
            //                 // Workstage : {label : this.props.loadedRequirements.requirementsDefinition.workstage, value : this.props.loadedRequirements.requirementsDefinition.workstage},  
            //                 Workstage : this.createSelectOption(this.props.requirementsDefinition.Workstage),
            //                 Project_Name :this.props.requirementsDefinition.Project_Name ,  
            //                 Description : this.props.requirementsDefinition.Description , 
            //                 Expected_Start_Date : moment(this.props.requirementsDefinition.Expected_Start_Date )|| moment(),  
            //                 Expected_Completion_Date : moment(this.props.requirementsDefinition.Expected_Completion_Date) || moment(),   
            //                 Expected_Start_Date_Moment : this.convertStringToMomentObject(this.props.requirementsDefinition.Expected_Start_Date) || moment(),  
            //                 Expected_Completion_Date_Moment : this.convertStringToMomentObject(this.props.requirementsDefinition.Expected_Completion_Date) || moment(),   
            //                 Deadline_Justification : this.props.requirementsDefinition.Deadline_Justification || "",     
            //                 // Project_Type : {label : this.props.requirementsDefinition.Project_Type, value : this.props.requirementsDefinition.Project_Type},    
            //                 Project_Type : this.createSelectOption(this.props.requirementsDefinition.Project_Type),
            //                 Project_Documents : this.props.requirementsDefinition.Project_docs ||  [],  
            //                 // usersCanEdit : usersCanEdit,
            //                 sendingData : false,
            //                 redirectUser : false,
            //                 dataSavedOnDB : false
            //                 // showFileManager : this.props.requirementsDefinition.requirementsDefinition.project_docs.length > 0 ? true : false
            //             })
            //             this.filesArray =  this.props.requirementsDefinition.Project_docs ;


            //             this.formFields =  this.createFormStructure();
            //         }

                   
            //     }
            // }



            // --------------------------------------
            // Update Props & State
            // --------------------------------------
            // componentWillReceiveProps = (nextProps) => {
				
            //     console.log('TCL: RequirementsDefinition -> componentWillReceiveProps -> nextProps', nextProps)

            //     console.log("TCL: RequirementsDefinition -> componentWillReceiveProps -> this.props", this.props)
            //     // this.props.loadedRequirements.requirementsDefinition
                
			// 	// nextProps.loadedRequirements.requirementsDefinition
			// 	//console.log('TCL: RequirementsDefinition -> componentWillReceiveProps -> nextProps.loadedRequirements.requirementsDefinition', nextProps.loadedRequirements)
            //     const currentUser = window.getCurrentSPUser();
            //     let usersCanEdit = true;

            //     if( !isEqual(this.props.requirementsDefinition, nextProps.loadedRequirements.requirementsDefinition)) {
            //         console.log("TCL: componentWillReceiveProps -> nextProps.loadedRequirements.requirementsDefinition", nextProps.loadedRequirements.requirementsDefinition)
            //         console.log("TCL: componentWillReceiveProps -> this.props.requirementsDefinition", this.props.requirementsDefinition)
            //         console.log("TCL: RequirementsDefinition -> componentWillReceiveProps -> this.props.", this.props)

            //         if(nextProps.loadedRequirements.requirementsDefinition) {
                    

            //             if(this.props.updateFromDB ===  true || this.props.updateFromDB ===  undefined) {


            //                 if(this.state.dataSavedOnDB === true) {
            //                     // if(prevProps.pmoEvalFiles.length) 
            //                     const id = this.props.match.params.projectID
            //                     this.props.fetchProjectFiles(id, 'RequirementsDefinition').then((data)=> {
            //                         // this.props.requirementsFiles
            //                         console.log("TCL: RequirementsDefinition -> componentWillReceiveProps -> this.props.requirementsFiles", this.props.requirementsFiles)
                                    
            //                     })

            //                     this.setState({dataSavedOnDB : false})
                                
            //                 }
                    

            //                 this.setState({
            //                             Date_Submitted : this.formatDate(nextProps.loadedRequirements.requirementsDefinition.date_submitted) || '',  
            //                             // Date_Submitted_Moment : this.convertStringToMomentObject(nextProps.loadedRequirements.requirementsDefinition.date_submitted) || moment(),  
            //                             Request_Owner : nextProps.loadedRequirements.requirementsDefinition.request_owner || '',  
            //                             Request_ID : nextProps.loadedRequirements.requirementsDefinition.request_id || '',  
            //                             Workstage : {label : nextProps.loadedRequirements.requirementsDefinition.workstage, value : nextProps.loadedRequirements.requirementsDefinition.workstage} || {"label" : "1 - New" , "value": "New" },  
            //                             Project_Name :nextProps.loadedRequirements.requirementsDefinition.project_name || "",  
            //                             Description : nextProps.loadedRequirements.requirementsDefinition.description || "", 
            //                             Expected_Start_Date : moment(nextProps.loadedRequirements.requirementsDefinition.expectedstart_date )|| moment(),  
            //                             Expected_Completion_Date : moment(nextProps.loadedRequirements.requirementsDefinition.expected_completion_date) || moment(),   
            //                             Expected_Start_Date_Moment : this.convertStringToMomentObject(nextProps.loadedRequirements.requirementsDefinition.expectedstart_date) || moment(),  
            //                             Expected_Completion_Date_Moment : this.convertStringToMomentObject(nextProps.loadedRequirements.requirementsDefinition.expected_completion_date) || moment(),   
            //                             Deadline_Justification : nextProps.loadedRequirements.requirementsDefinition.deadline_justification || "",     
            //                             Project_Type : {label : nextProps.loadedRequirements.requirementsDefinition.project_type, value : nextProps.loadedRequirements.requirementsDefinition.project_type} || {label : "Project Type", value : null},    
            //                             Project_Documents : nextProps.loadedRequirements.requirementsDefinition.project_docs ||  [],  
            //                             spFiles : this.props.requirementsFiles,
            //                             sendingData : false,
            //                             // showFileManager : nextProps.loadedRequirements.requirementsDefinition.project_docs.length > 0 ? true : false
            //                         })

            //                         // this.filesArray = nextProps.loadedRequirements.requirementsDefinition.project_docs || [];
            //                         this.filesArray =  nextProps.loadedRequirements.requirementsDefinition.project_docs[0] === "" ? [] : nextProps.loadedRequirements.requirementsDefinition.project_docs ;

            //                         // this.originalFiles = nextProps.loadedRequirements.requirementsDefinition.project_docs[0] === "" ? [] : nextProps.loadedRequirements.requirementsDefinition.project_docs ;
            //                         //console.log('TCL: RequirementsDefinition -> componentWillReceiveProps -> PRoject TYpe', {label : nextProps.loadedRequirements.requirementsDefinition.project_type, value : nextProps.loadedRequirements.requirementsDefinition.project_type} )

            //                         this.originalFiles =  nextProps.loadedRequirements.requirementsDefinition.project_docs|| [];
                            
            //             }
                    
            //             else {

            //                 let workstage = '';
            //                 if( nextProps.loadedRequirements.requirementsDefinition.workstage && nextProps.loadedRequirements.requirementsDefinition.workstage  != "")
            //                     workstage =  {label : nextProps.loadedRequirements.requirementsDefinition.workstage, value : nextProps.loadedRequirements.requirementsDefinition.workstage}
            //                 else if(!isEmpty(nextProps.loadedRequirements.Workstage)) 
            //                     workstage =  {label : nextProps.loadedRequirements.Workstage.label, value : nextProps.loadedRequirements.Workstage.value}
            //                 else
            //                     workstage = ''


            //                 let docs = [];
            //                 if( nextProps.loadedRequirements.Project_docs )
            //                     docs = nextProps.loadedRequirements.Project_docs 
            //                 else if(nextProps.loadedRequirements.requirementsDefinition.project_docs) 
            //                     docs = nextProps.loadedRequirements.requirementsDefinition.project_docs
            //                 else
            //                     docs = []
                            
            //                 this.originalFiles =  docs;

                          

                            
            //                 if(this.state.dataSavedOnDB === true) {
            //                     // if(prevProps.pmoEvalFiles.length) 
            //                     const id = this.props.match.params.projectID
            //                     this.props.fetchProjectFiles(id, 'RequirementsDefinition').then((data)=> {
            //                         // this.props.requirementsFiles
            //                         console.log("TCL: RequirementsDefinition -> componentWillReceiveProps -> this.props.requirementsFiles", this.props.requirementsFiles)
                                    
            //                     })

            //                     this.setState({dataSavedOnDB : false})
                                
            //                 }

            //                 this.setState({
            //                     Date_Submitted : this.formatDate(nextProps.loadedRequirements.Date_submitted) || '',  
            //                     Date_Submitted_Moment : this.convertStringToMomentObject(nextProps.loadedRequirements.Date_submitted) || moment(),  
            //                     Request_Owner : nextProps.loadedRequirements.Request_Owner || '',  
            //                     Request_ID : nextProps.loadedRequirements.Project_id || '',  
            //                     Workstage : workstage !== '' ? workstage : {"label" : "1 - New" , "value": "New" },  
            //                     Project_Name :nextProps.loadedRequirements.Project_Name || "",  
            //                     Description : nextProps.loadedRequirements.Description || "", 
            //                     Expected_Start_Date : moment(nextProps.loadedRequirements.Expected_Start_Date )|| moment(),  
            //                     Expected_Completion_Date : moment(nextProps.loadedRequirements.Expected_Completion_Date) || moment(),   
            //                     Expected_Start_Date_Moment : this.convertStringToMomentObject(nextProps.loadedRequirements.Expected_Start_Date) || moment(),  
            //                     Expected_Completion_Date_Moment : this.convertStringToMomentObject(nextProps.loadedRequirements.Expected_Completion_Date) || moment(),   
            //                     Deadline_Justification : nextProps.loadedRequirements.Deadline_Justification || "",     
            //                     Project_Type : nextProps.loadedRequirements.Project_Type ||  {label : nextProps.loadedRequirements.requirementsDefinition.project_type, value : nextProps.loadedRequirements.requirementsDefinition.project_type} || {label : "Project Type", value : null},    
            //                     Project_Documents : docs,
            //                     spFiles : nextProps.requirementsFiles,
            //                     sendingData : false,
            //                     // showFileManager : nextProps.loadedRequirements.requirementsDefinition.project_docs.length > 0 ? true : false
            //                 })

            //                     // this.filesArray = nextProps.loadedRequirements.requirementsDefinition.project_docs || [];
            //                     // this.filesArray =  nextProps.loadedRequirements.requirementsDefinition.project_docs[0] === "" ? [] : nextProps.loadedRequirements.requirementsDefinition.project_docs ;
            //                     this.filesArray =  docs[0] === "" ? [] : docs
            //                     this.originalFiles = docs;

            //                     //console.log('TCL: RequirementsDefinition -> componentWillReceiveProps -> PRoject TYpe', {label : nextProps.loadedRequirements.requirementsDefinition.project_type, value : nextProps.loadedRequirements.requirementsDefinition.project_type} )
                    
            //             }
                        
                    
            //         }
            //     }
            // }



            // shouldComponentUpdate = () => {
            //     return false
            // }



          

            // --------------------------------------
            // Convert String to Moment Object
            // --------------------------------------
            convertStringToMomentObject(date) {
                let dateObj = new Date(date);
                let momentObj = moment(dateObj);
                let dateFormat = moment(dateObj).format("DD/MM/YYYY");
				//console.log('TCL: RequirementsDefinition -> convertStringToMomentObject -> dateFormat', dateFormat)
                //console.log('TCL: RequirementsDefinition -> convertStringToMomentObject -> momentObj', momentObj)
                
                return momentObj;
            }

            // --------------------------------------
            // Format Request Date
            // --------------------------------------
            formatDate = (dateToFormat) => {
                
                let d = new Date(dateToFormat);
                let month = String(d.getMonth() + 1);
                let day = String(d.getDate());
                const year = String(d.getFullYear());
                if (month.length < 2) month = '0' + month;
                if (day.length < 2) day = '0' + day;
                return `${day}/${month}/${year}`;
            }






            // --------------------------------------
            // Crate JSON Data FIelds
            // --------------------------------------
            createFormStructure() {
                // this.props.loadedRequirements.requirementsDefinition
                let usersCanEdit = false;
                if(this.state.Workstage.value === "Requested" && this.props.isPMO === false)
                    usersCanEdit = false;
                else
                    usersCanEdit = true;

            

               
                const formFields = [
                    {
                        "Field_Name": "Date Submitted",
                        "value": this.setDateSubmittedValue(this.state.Date_Submitted),
                        "Field_State_Name": "Date_Submitted",
                        "group": "firstHalf1",
                        "Mandatory": false,
                        "Enabled": false,
                        
                        "Type": "text",
                        "General_Value": "Today",
                        "columns" : 2,
                        "small_input" : true
                    },
                    {
                        "Field_Name": "Request Owner",
                        "value": this.state.Request_Owner,
                        "Field_State_Name": "Request_Owner",
                        "group": "firstHalf1",
                        "Mandatory": false,
                        "Enabled": false,
                        
                        "Type": "Text",
                        "General_Value": "Usedidin Active Directory",
                        "columns" : 2
                    },
                    {
                        "Field_Name": "Request ID",
                        "value": this.state.Request_ID,
                        "Field_State_Name": "Request_ID",
                        "group": "firstHalf2",
                        "Mandatory": false,
                        "Enabled": false,
                        
                        "Type": "text",
                        "General_Value": "0000001",
                        "columns" : 2,
                        "small_input" : true
                    },
                    {
                        "Field_Name": "Workstage",
                        "value": this.state.Workstage || this.props.projectIntake.requirementsDefinition.Workstage ,
                        "Field_State_Name": "Workstage",
                        "group": "firstHalf2",
                        "Mandatory": false,
                        "Enabled": this.checkControlEnabled(),
                        "Sequence": "1",
                        "Type": "Combo",
                        "General_Value": [
                            {"label" : "1 - New" , "value": "New" },
                            {"label" : "2 - Requested" , "value": "Requested" },
                            {"label" : "3 - FG0 Preparation" , "value": "FG0 Preparation" },
                            {"label" : "4 - FG0 Approved" , "value": "FG0 Approved" },
                            {"label" : "5 - FG0 Rejected" , "value": "FG0 Rejected" },
                            {"label" : "6 - Active" , "value": "Active" },
                            {"label" : "7 - Implemented" , "value": "Implemented" },
                            {"label" : "8 - Ready For ROI Realized" , "value": "Ready For ROI Realized" },
                            {"label" : "9 - Closed" , "value": "Closed" },
                            {"label" : "10 - On Hold" , "value": "On Hold" },
                            {"label" : "11 - Cancelled" , "value": "Cancelled" },
                            {"label" : "12 - Deferred" , "value": "Deferred" }
                        ],
                        "columns" : 2,
                        "allowFilter" : false,
                        // "extraWideControl" : true
                    },
                    
                    {
                        "Field_Name": "Project Name",
                        "value": this.state.Project_Name,
                        "Field_State_Name": "Project_Name",
                        "group": "second",
                        "Mandatory": true,
                        "Enabled": usersCanEdit,
                        "Sequence": "2",
                        "Type": "Text",
                        "General_Value": "Text",
                        "columns" : 1,
                        "hasToolTip" : true,
                        "toolTipText"  : "Name of the Project from the requestor"
                    },
                    {
                        "Field_Name": "Description",
                        "value": this.state.Description,
                        "Field_State_Name": "Description",
                        "group": "second",
                        "Mandatory": true,
                        "Enabled": usersCanEdit,
                        "Sequence": "4",
                        "Type": "Text",
                        "General_Value": "Text",
                        "columns" : 1,
                        "isTextArea" : true,
                        "hasToolTip" : true,
                        "toolTipText" : "Detailed description of this project "
                    },
                    {
                        "Field_Name": "Expected Start Date",
                        "value": this.state.Expected_Start_Date_Moment,
                        "Field_State_Name": "Expected_Start_Date",
                        "group": "third",
                        "Mandatory": false,
                        "Enabled": usersCanEdit,
                        "Sequence": "3",
                        "Type": "Date",
                        "General_Value": "Date Picker",
                        "columns" : 2,
                        "hasToolTip" : true,
                        "toolTipText" : "Timeline for Start of this project "
                    },
                    {
                        "Field_Name": "Expected Completion Date",
                        "value": this.state.Expected_Completion_Date_Moment,
                        "Field_State_Name": "Expected_Completion_Date",
                        "group": "third",
                        "Mandatory": false,
                        "Enabled": usersCanEdit,
                        "Sequence": "5",
                        "Type": "Date",
                        "General_Value": "Date Picker",
                        "columns" : 2,
                        "hasToolTip" : true,
                        "toolTipText" : "Timeline for End of this project"
                    },
                    {
                        "Field_Name": "Deadline Justification",
                        "value": this.state.Deadline_Justification,
                        "Field_State_Name": "Deadline_Justification",
                        "group": "third",
                        "Mandatory": true,
                        "Enabled": usersCanEdit,
                        "Sequence": "6",
                        "Type": "Text",
                        "General_Value": "Open Text",
                        "columns" : 1,
                        "isTextArea" : true,
                        "hasToolTip" : true,
                        "toolTipText" : "Reasons for the completion timeline "
                    },
                    {
                        "Field_Name": "Project Type",
                        "value": this.state.Project_Type,
                        "Field_State_Name": "Project_Type",
                        "group": "fourth",
                        "Mandatory": true,
                        "Enabled": usersCanEdit,
                        "Sequence": "7",
                        "Type": "Combo",
                        "General_Value": [
                            {"label" :"1.- New Application Development" , "value": "New Application Development" },
                            {"label": "2.- Replacement of Existing Application" , "value": "Replacement of Existing Application" },
                            {"label": "3.- Enhancement of Existing Application" , "value": "Enhancement of Existing Application" },
                            {"label": "4.- Reports Development", "value": "Reports Development" },
                            {"label": "5.- Platform Standardization" , "value": "Platform Standardization" }
                        ],
                        // "columns" : 2 ,
                        "columns" : 1 ,
                        "hasToolTip" : true,
                        "toolTipText" : "Pick from the drop-down ",
                        "allowFilter" : false,
                        "extraWideControl" : true,
                    },
                    {
                        "Field_Name": "ProjectDocuments",
                        "value": this.state.Project_Documents,
                        "Field_State_Name": "Project_Documents",
                        "group": "fifth",
                        "Mandatory": false,
                        "Enabled": usersCanEdit,
                        "Sequence": "8",
                        "Type": "filesPicker",
                        "General_Value": this.state.Project_Documents,
                        "spDocs" : this.state.spFiles || [],
                        "columns" : 1,
                        "hasToolTip" : true,
                        "toolTipText" : "Attach project related documents and presentations",
                        "addFiles" : true
                    }
                ]

                return formFields;
            }


            // --------------------------------------
            // Enable/Disable Workstage Control
            // --------------------------------------
            checkControlEnabled() {
                const {isPMO} = this.props;
                let enabled = isPMO ? true : false;

                return enabled;
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



            setDateSubmittedValue(date) {
                
               
                if(!date)
                    return ''

                if(date === 'NaN/NaN/NaN')
                    return this.props.projectIntake.requirementsDefinition.Date_submitted
                else
                    // return 'date'
                    return moment(date).format("DD/MM/YYYY");
            }


            
        /* ==========================================================================
        ** Handle State
        ** ========================================================================== */

            // --------------------------------------
            // Handle Modal Clicks
            // --------------------------------------
            showModal = () => {
                this.setState({ isShown: true }, () => {
                    this.closeButton.focus();
                    this.toggleScrollLock();
                });
            };
            
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
                this.setState({
                    [control] : selectedOption
                })   
            }

            // --------------------------------------
            // Control Date Inputs
            // TODO : Cnvert to sting Before POST
            // --------------------------------------
            onDateChange = (control, selectedDateString, selectedDate) =>{
				//console.log('TCL: onDateChange -> selectedDateString', selectedDateString)
				
                this.setState({
                    [control] : selectedDate
                })   
                
            }

            // --------------------------------------
            // Validate Dates
            // Exp Completed Date higher to the start dates
            // --------------------------------------
            validateDates(startDate, endDate) {
                
                startDate === null ? startDate = moment() : startDate = startDate;
                endDate === null ? endDate = moment() : endDate = endDate;

                if(startDate === null && endDate ===  null) {
                    this.createErrorAlertTop("The Dates can't be the same value");
                    return false    
                }

                if ((moment(startDate).isSame(endDate) === true) ) {
                    this.createErrorAlertTop("The Dates can't be the same value");
                    return false
                }
                else if(moment(startDate).isBefore(endDate)=== false) {
                    this.createErrorAlertTop("The Completion Date can't be before the Start Date");
                    return false;
                }
                else
                    return true
                
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
            ** FIle Manager Fuctions
            ** ========================================================================== */


                // --------------------------------------
                // Handle Add File to Dropzone
                // --------------------------------------
                handleFileAdded = (file) => {
                    // let files = [];
                    if(this.filesArray[0] === "")
                        this.filesArray = [];

                    this.filesArray.push(file);
                    this.setState({Project_Documents : this.filesArray});
                    //console.log('files array', this.filesArray);
                    if( file.type.indexOf('image/') < 0 )
                    // if( type !== "png" || type !== "jpg" || type !== "jpeg" || type !== "gif" )
                    {
                        this.createPreviewImageDropzone(null, file);
                    }
                }


                // --------------------------------------
                // Handle Remove Fxile to Dropzone
                // "sites/gsd/intake_process/intakeFiles/GSD00272/RequirementsDefinition/sites/gsd/intake_process/intakeFiles/GSD00272/RequirementsDefinition/sites/gsd/intakeFiles/GSD00272/RequirementsDefinition/sites/gsd/intakeFiles/GSD00272/RequirementsDefinition/Transition Status Items2.xlsx"
                // "sites/gsd/intake_process/intakeFiles/GSD00272/RequirementsDefinition/sites/gsd/intake_process/intakeFiles/GSD00272/RequirementsDefinition/sites/gsd/intakeFiles/GSD00272/RequirementsDefinition/sites/gsd/intakeFiles/GSD00272/RequirementsDefinition/Transition Status Items2.xlsx"
                // --------------------------------------
                handleFileRemoved = (file) => {
               

                    let newFilesarray = this.state.Project_Documents.filter((delFile) => {
                        // console.log("TCL: handleFileRemoved -> delFile", delFile)

                        // if(file.name === delFile.name)  {
                        //     console.log("TCL: handleFileRemoved -> file equal", file)
                        //     console.log("TCL: handleFileRemoved -> delFile equal", delFile)
                            
                        // }

                        return file.name !==  delFile.name
                        
                    })
                    // console.log("TCL: handleFileRemoved -> newFilesarray", newFilesarray)

                    this.setState({Project_Documents : newFilesarray, fileRemoved : true})
                    this.filesArray = newFilesarray



                    // "sites/gsd/intake_process/intakeFiles/GSD00272/RequirementsDefinition/sites/gsd/intake_process/intakeFiles/GSD00272/RequirementsDefinition/sites/gsd/intakeFiles/GSD00272/RequirementsDefinition/logo.png"
                    // "sites/gsd/intake_process/intakeFiles/GSD00272/RequirementsDefinition/sites/gsd/intake_process/intakeFiles/GSD00272/RequirementsDefinition/sites/gsd/intakeFiles/GSD00272/RequirementsDefinition/logo.png"


                }


            
                // --------------------------------------
                // Preload Dropzone FIles
                // --------------------------------------

                preloadFiles = (dropzone)=> {
                    // const {project_docs} = this.props.loadedRequirements.requirementsDefinition;
                    let mockFile = null;
                    const project_docs = this.filesArray

                    // Check IF has Values, or an empty string, in yes reset array
                    if (project_docs === null || project_docs === undefined || project_docs[0] === "") {
                        this.filesArray = [];
                        return;
                    }
                        

                    let mockFiles = project_docs.map((mockDoc, index) => {

                            // mockFile = this.createMockFile(mockDoc)

                        // Check if is the List from the DB or the New One
                            if (mockDoc.previewElement)
                                mockFile = mockDoc;
                            else
                                mockFile = this.createMockFile(mockDoc);
                            
                        let mockFileImage = ''
                            
                        //console.log('TCL: preloadFiles -> mockFile', mockFile)
                                

                        // let mockFile = this.props.fieldValues.ProjectImage;
                        dropzone.options.addedfile = mockFile;
                        dropzone.emit("addedfile", mockFile);

                        if(mockFile.dataURL)
                            mockFileImage = mockFile.dataURL
                        else if (mockFile.name.indexOf('sites')>=0)
                            mockFileImage = `https://flextronics365.sharepoint.com/${mockFile.name}`

                        dropzone.emit("thumbnail", mockFile, mockFileImage);
                        dropzone.emit("complete", mockFile);

                        //console.log('mockFile', mockFile);
                        dropzone.files.push(mockFile);
						// this.filesArray = dropzone.files;


                        // Set width and height of Thumbnail

                        
                        //? Set Preview of of files that are not images
                        let type = mockDoc.TypeDocument || mockFile.type
                        // if( type.indexOf('image/') < 0 )
                        if( type !== "png" || type !== "jpg" || type !== "jpeg" || type !== "gif" )
                        {
                            this.createPreviewImageDropzone(index, mockFile);
                        }
                        else
                        {
                            let imageContainer = document.getElementsByClassName('dz-image')[index];
                            let image = imageContainer.childNodes[0];
                                image.style.width = "120px";
                                image.style.height = "120px";
                                if(mockFile.dataURL)
                                    image.src =  mockFile.dataURL ;
                                else
                                    image.src = mockFileImage
                                    // image.src = mockDoc.urlDocument || mockFile.name ;
                        }
                    

                        // Set File Name
                        let nameContainer = document.getElementsByClassName('dz-filename')[index];
                        let docNameText =  this.getDocNameNoExtension(mockFile.urlDocument || mockFile.name);
                            nameContainer.innerHTML = docNameText;


                    

                        return mockFile;
                        
                    });
                    // console.log("TCL: preloadFiles -> mockFiles", mockFiles)
                    


                    this.filesArray = mockFiles;
                    this.setState({Project_Documents : mockFiles})
                    
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




                // --------------------------------------
                // Remove Spported File Type Icons
                // --------------------------------------
                removeElements = (elms) => {
                    [...elms].forEach(el => el.remove());
                }



                // --------------------------------------
                // Create Prev Image 
                // --------------------------------------        
                createPreviewImageDropzone(index, file) {

                    let imageContainer = null
                    if(index !== null)
                        imageContainer = document.getElementsByClassName('dz-image')[index];
                    else
                        imageContainer = document.getElementsByClassName('dz-image')[this.filesArray.length - 1];
                        
                    
                
                    //console.log('TCL: createPreviewImageDropzone -> imageContainer', imageContainer)
                    
                    let image = imageContainer.childNodes[0];
                    let imageSrc = this.getFileIconDropzone(file.type , file.name);
                        image.style.width = "120px";
                        image.style.height = "120px";
                        image.src = imageSrc;
                }


                // --------------------------------------
                // Set File Icon for Dropzone Prev
                // --------------------------------------
                getFileIconDropzone(fileType, fileName) {

                    if(fileType === 'png' || fileType === 'jpg' || fileType === 'gif' ){
                        if(fileName.indexOf('sites') >= 0) 
                        return `https://flextronics365.sharepoint.com/${fileName}`;
                    }


                    let fileExtension = "";
                    if(fileType !== "")
                        fileExtension =  fileType.split('/')[1] || fileType
                    else       
                        fileExtension =  fileName.split('.')[1]
                    let iconSrc = `https://flextronics365.sharepoint.com/sites/project_intake/ProjectIntake/assets/File-Icons/${fileExtension}.png`;
                    //console.log('iconSrc', iconSrc);

                    return iconSrc;
                }

              

                 /**  --------------------------------------
                // Call SP Function to Upload File
                // @param {folderName}  GSD126
                // @param {folderToUpload} RequirementsDefinition
                // on Each Child of filesArary
                // --------------------------------------*/
                uploadFiles (folderName, foldertoUpload, filesArray, saveOnDB = true) {
                    // this.setState({currentMessage : 'Saving Files'}) 
                    // const {filesArray} = this;

                    // this.props.sharepoint
                    // console.log("TCL: uploadFiles -> this.props.sharepoint", this.props.sharepoint)
                    
                    
                    

                    const folderURL = `intakeFiles/${foldertoUpload}`;
                    let filesToUploadDBArray = [];
                    // if(filesArray.length <= 0)
                    //     return;
                    
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
                    
                }

                // --------------------------------------
                // Save Files on DB
                // --------------------------------------
                saveFilesonDB(folderName,filesToUploadDBArray ) {
					//console.log('TCL: saveFilesonDB -> folderName', folderName)
                    //console.log('TCL: saveFilesonDB -> filesToUploadDBArray', filesToUploadDBArray)
                    // const id = this.props.requirementsDefinition.newProjectID
                    // 

                    const {projectID} = this.props.match.params;
                    const requestID = projectID.substr(projectID.indexOf('D')+1,projectID.length);
                    const filesString = filesToUploadDBArray.join(',');
                    const currentUser = window.getCurrentSPUser();

                    // Loomk For Files on SP FOlder
                    this.props.saveProjectFiles(requestID, filesString, currentUser.userEmail).then((data)=>{
                        console.log('TCL: saveFilesonDB -> data', data);
                        

                    })
                    .catch((error)=> {
						console.log('TCL: saveFilesonDB -> error', error)
                        
                    })


                    
                }




        /* ==========================================================================
        ** Save Values
        ** ========================================================================== */

              

                // --------------------------------------
                // Validate Form Inputs
                // --------------------------------------
                validateFormInputs() {
                    const fields = this.formFields !== undefined ? this.formFields : this.createFormStructure();
                    
                    
                    let errors = fields.map((fieldItem) => {
                        if(fieldItem.Mandatory === true) {
                            // Check empty value for text input
                            if(fieldItem.Type === "Text" || fieldItem.Type === "Decimal" || fieldItem.Type === "Integer") {
                                
                                    // console.log("TCL: validateFormInputs -> fieldItem", fieldItem)
                                    // console.log("TCL: validateFormInputs -> state item", this.state[fieldItem.Field_State_Name])
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
                    const errorsCount = errors.filter(error=>{return error===true}).length
					//console.log('TCL: validateFormInputs -> errorsCount', errorsCount)

                    return errorsCount > 0 ?  false : true
                    
                }




                // --------------------------------------
                // Save Form Values
                // --------------------------------------
                saveFormValues () { 
                    //! const currentUser = window.getCurrentSPUser();
                    // const startDate = this.state.Expected_Start_Date || moment();
                    // const completionDate = this.state.Expected_Completion_Date || moment();

                    //console.log('TCL: saveFormValues -> startDate',  moment(startDate).format("DD/MM/YYYY")  )
                    //console.log('TCL: saveFormValues -> completionDate', moment(completionDate).format("DD/MM/YYYY"))
                    
                    // if()

                    this.filesArray = this.state.Project_Documents;

                    // const projId = this.props.projectIntake.requirementsDefinition ? this.props.projectIntake.requirementsDefinition.Request_ID : this.props.loadedRequirements.Project_id
                    const projId = this.props.projectIntake.requirementsDefinition.Request_ID 
                    const requestID =  projId.indexOf('D') >= 0 ?  projId.substr(projId.indexOf('D')+1,projId.length) : projId;


                    console.log("TCL: RequirementsDefinition -> saveFormValues -> this.originalFiles", this.originalFiles)

                    // ?Filter Docs
                    // let docsToSave = [];
                    // if(this.state.newFilesCancelled === true &)
                    //     docsToSave = this.originalFiles
                    
                    // else
                    //     docsToSave = this.state.Project_Documents

                    const formData = {
						
                        Project_id : requestID,
                        Project_Name : this.state.Project_Name,
                        Description : this.state.Description,
                        Project_Type : this.state.Project_Type,
                        Date_submitted : moment().format("DD/MM/YYYY"),
                        Request_Owner : this.state.Request_Owner,
                        Workstage : this.state.Workstage,   
                        Expected_Start_Date : this.state.Expected_Start_Date || moment(),
                        Expected_Completion_Date : this.state.Expected_Completion_Date || moment(),
                        Deadline_Justification : this.state.Deadline_Justification,
                        // Project_docs : this.filesArray || [],
                        Project_docs : this.state.Project_Documents || [],
                        Created_by : currentUser.userEmail,
                        Last_modifed_by : currentUser.userEmail

                        
                    }

                    console.log("TCL: saveFormValues -> formData", formData)


                    this.setState({
                        Project_Name :formData.Project_Name,
                        Description :formData.Description,
                        Project_Type :formData.Project_Type,
                        Date_submitted : formData.Date_submitted,
                        Request_Owner :formData.Request_Owner,
                        Workstage :formData.Workstage,   
                        Expected_Start_Date : formData.Expected_Start_Date || moment(),
                        Expected_Completion_Date : formData.Expected_Completion_Date || moment(),
                        Deadline_Justification :formData.Deadline_Justification,
                        Project_docs : this.filesArray || [],
                        // Created_by : currentUser.userEmail,
                        // Last_modifed_by : currentUser.userEmail,
                        showFileManager : false
                    })

                    

                    // //console.log('New Date ', this.formatDate())

                    return formData;

                }

                // --------------------------------------
                // Formart Date
                // --------------------------------------
                
                formatDate = (dateToFormat) => {
                    let d = new Date(dateToFormat);
                    let month = String(d.getMonth() + 1);
                    let day = String(d.getDate());
                    const year = String(d.getFullYear());
                    if (month.length < 2) month = '0' + month;
                    if (day.length < 2) day = '0' + day;
                    return `${day}/${month}/${year}`;
                }


                // --------------------------------------
                // Submit Form
                // --------------------------------------
                submitFormLocalData = (exitFromMenu =  false) => {

                   
                    
                    if(this.validateFormInputs() === false) {
                        this.createErrorAlertTop('Please Fill all the Required Fields');
                        this.setState({checkForErrors: true})
                        return;
                    }

                    this.renderLoader(true);

                    const formData = this.saveFormValues();

                    this.props.updateProjectIntakeValues('requirements',formData)

                    if(exitFromMenu !== true) {
                        this.createSuccessAlert('Data Saved Locally');
                        this.redirectUser();
                    }
                       


				
                }

                // !--------------------------------------
                // ! Submit Form to DB
                // !--------------------------------------
                submitFormDB = () => {

                    if(this.validateFormInputs() === false) {
                        this.createErrorAlertTop('Please Fill all the Required Fields');
                        this.setState({checkForErrors: true})
                        return;
                    }
                    

                    this.setState({sendingData : true})
                    const formData = this.saveFormValues();
                    const {filesArray} = this;
					//console.log('TCL: submitFormDB -> filesArray', filesArray)
                    // this.props.saveLocalRequirements(formData);
                    

                    //? Save Requirements
                    this.props.updateRequirementsDB(formData).then(()=>{
                        const newProjectID = this.props.requirementsDefinition.newProjectID

                        const {projectID} = this.props.match.params;
                        let reqFolderURL = `${projectID}/RequirementsDefinition`;
                        

                        this.createSuccessAlert('Data Updated ');


                        

                        // this.setState({ Request_ID : newProjectID , sendingData : false})

                        // ?Rename Files Based on Project ID

                        // ?Create Projectt Folder

                        

                        
                        this.uploadFiles(projectID, reqFolderURL, filesArray);

                        this.setState({dataSavedOnDB : true})

                        // this.props.resetRequirementsState();

                        // this.setState({})


                        this.props.saveLocalRequirements(formData);



                        this.saveOtherTabs();


                        this.setState({ Request_ID : newProjectID , sendingData : false, checkForErrors: false, showFileManager : false, dataSavedOnDB : true})


                        // this.redirectUser();

                        // this.componentDidMount();

                        
                        // this.setState(this.state)
                        
                        
                        
                    })
                    .catch((error)=> {
                        console.log("TCL: submitFormDB -> error", error)
                        this.createErrorAlert('There was a problem saving the data, please try again ');
						//console.log('TCL: submitFormDB -> error', error)
                        
                    })
                    
                }




                // !--------------------------------------
                // ! Save Other Tabs
                // !--------------------------------------
                saveOtherTabs = async () => {
                    // this.props.businessInformation

                    console.log("TCL: saveOtherTabs -> this.props", this.props)
                    console.log("TCL: saveOtherTabs -> this.props.businessInformation", this.props.businessInformation)


                    // let promises = []


                    this.validateObjectValues(this.props.businessInformation)

                    // ? Save Business Information
                    if( !isEmpty(this.props.businessInformation) ) {
                        console.log("TCL: saveOtherTabs -> this.props.businessInformation", this.props.businessInformation)
                        if(this.props.businessInformation.buss_info_id)
                           this.props.updateBusinesInformationDB(this.props.businessInformation)
                        else
                           this.props.saveBusinesInformationDB(this.props.businessInformation)
                    }

                    // ? Save Tehnical Evaluation
                    if(!isEmpty(this.props.technicalEvaluation)) {
                        if(this.props.technicalEvaluation.tech_eval_id) {
                           this.props.updateTechnicalDB(this.props.technicalEvaluation)
                        }
                        else
                           this.props.saveTechnicalDB(this.props.technicalEvaluation)
                    }
                        

                    // ? Save PMO Evaluation
                    if(!isEmpty(this.props.pmoEvaluation)) {
                        if(this.props.pmoEvaluation.pmo_eval_id) {
                           this.props.updatePMOEvaluation(this.props.pmoEvaluation)
                        }
                        else
                           this.props.savePMOEvaluationDB(this.props.pmoEvaluation)
                    }



                    // ? Save Roi Realized
                    if(!isEmpty(this.props.roiRealized)) {
                        // ? Look For Roi Relized Data
                        if(!isEmpty(this.props.roiRealized.roiRealized)) {
                            
                            if(this.props.roiRealized.roiRealized.roi_real_id) {
                               this.props.updateROIRealizedDB(this.props.roiRealized)
                            }
                            else
                               this.props.saveROIRealizedDB(this.props.roiRealized)
                        }

                        // ? Look for Dynatrace
                        if(!isEmpty (this.props.roiRealized.dynatrace))
                           this.props.saveDynatraceDB(this.props.roiRealized.dynatrace)
                        
                        else if(this.props.roiRealized.dynatraceData)   
                            this.props.saveDynatraceDB(this.props.roiRealized.dynatrace)


                    }
                   
                        
                        
                        
                  
 
                    // this.resetState();


                    
                }


                validateObjectValues(object) {

                    for (var property in object) {
                        console.log("TCL: validateObjectValues -> property", property)
                        if (object.hasOwnProperty(property)) {
                            console.log("TCL: validateObjectValues -> property", property)
                            // do stuff
                        }
                    }

                }

            





                // ?--------------------------------------
                // ? Upload Files to SP 
                // ? And update add / show files State
                // ?--------------------------------------
                uploadFilesToSPWithoutSavingDB = (event)=> {
                    console.log("TCL: RequirementsDefinition -> uploadFilesToSPWithoutSavingDB -> event", event)

                    const {Project_Documents} = this.state;

                  

                    // this.setState({showFileManager : !showFileManager})

                    //! Cancel Last changes

                    if(event.target.textContent == 'Discard Changes') {

                        let orignaldocs = []

                        if(this.state.fileRemoved === false) {
                             // ?Filter Object type File
                             orignaldocs = Project_Documents.filter((file)=>{return !file.upload})
                             console.log("TCL: RequirementsDefinition -> uploadFilesToSPWithoutSavingDB -> orignaldocs", orignaldocs)
                        }
                        else {
                            orignaldocs =  this.originalFiles;
                            console.log("TCL: RequirementsDefinition -> uploadFilesToSPWithoutSavingDB -> orignaldocs", orignaldocs)
                        }
                            
                           


                        // let orignaldocs2 = Project_Documents.filter((file)=>{return file.upload === undefined || file.upload === null})
                        //     console.log("TCL: RequirementsDefinition -> uploadFilesToSPWithoutSavingDB -> orignaldocs2", orignaldocs2)


                        this.setState({
                            showFileManager : false,
                            Project_Documents : orignaldocs,
                            newFilesCancelled : true
                        })


                        // this.setState({ state: this.state });

                        // this.props.resetRequirementsState();
                    }

                    else
                        this.setState({showFileManager : true, newFilesCancelled : false})

                   
                }
            


              


    
                // --------------------------------------
                // Check Empty Values based on input type
                // --------------------------------------
                checkInputValue(inputValue) {
                    if(inputValue === "" || inputValue === null)
                        return false
                    else
                        return true;
                }



            // --------------------------------------
            // Redirect User
            // --------------------------------------
            redirectUser() {
                const {history} = this.props.locationData;
                const id = this.props.locationData.match.params.projectID
                // const path = '/sites/gsd/intake_process/IntakeProcess/ProjectIntake.aspx';

                const path = '/intake'
                
                history.push(`${path}/project/${id}/business-information`);
            }


            cancelRequirementsDefinition = () => {
                const {history} = this.props.locationData;
                const path = '/sites/gsd/intake_process/IntakeProcess/ProjectIntake.aspx';
                history.push(`${path}/intake-projects/`);
            }


        /* ==========================================================================
        ** Render Methods
        ** ========================================================================== */


            // --------------------------------------
            // Render Loader
            // --------------------------------------
            renderLoader (isTransparent) {

                const {currentMessage} = this.state
				//console.log('TCL: renderLoader -> currentMessage', currentMessage)

                const container = document.getElementsByClassName('int-formFieldsContainer')[0]
                const containerWidth = isTransparent ?  container && container.clientWidth : null;
                const containerHeight = isTransparent ? container && container.clientHeight : null;
                return <div> <AppLoader customHeight = { containerHeight || 800} isTransparent = {isTransparent} customWidth = {containerWidth}  message = {currentMessage}/> </div>
            }




            

            // --------------------------------------
            // Form Header
            // --------------------------------------
            renderHeaderSection() {
                return (
                    <Fragment>
                        <div className="int-container">
                            

                            <div className="int-row">
                                {/*<div className="int-double-column ">*/}
                                <div className="int-column ">
                                    <div className="int-headerSection1">
                                        <div className="int-iconHolder">
                                            <img src={form_icon} alt="" />
                                        </div>

                                        <div className="int-titleSection">
                                            <h2 className="int-subHeader"> Intake Form </h2>
                                            <p>Please fill out the form</p>
                                            <p>Hover for field description</p>
                                            <p> <span className="int-blueText int-spaceIcon">*</span>    Mandatory Fields </p>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="int-column">{this.renderFormFields("firstHalf1", false, 0)}</div>

                                <div className="int-column">{this.renderFormFields("firstHalf2", false, 1)}</div>

                            </div>
                            
                        </div>

                    </Fragment>
                )
            }



            // --------------------------------------
            // Render Form Fields
            // --------------------------------------
            renderFormFields(group, renderBorder, startPosition) {

                // this.state
                

                // const ProjectID = this.props.match.params.projectID;

                // const {}

                const formFieldsValues =  this.createFormStructure();
                const formData = formFieldsValues.filter((item) => { return item.group === group });
                let blockFileZone = false
                let blockInputs = false;
                
                
                if(this.state.Workstage.value === 'Requested' && this.props.isPMO === false) {
                    blockFileZone = this.filesArray.length > 0 ? true : false;
                    blockInputs = true;
                }   
                else    
                    blockInputs = false;
                    

                let showFileManager = this.filesArray.length > 0 ? true : false;
                
				// console.log("TCL: renderFormFields -> this.filesArray", this.filesArray)
                return (
                    <FieldsGenerator 
                        fieldsData={formData} 
                        renderBorder={renderBorder} 
                        onChangeInputs = {this.onChangeInputs}
                        onChangeSelect = {this.onChangeSelect}
                        onDateChange = {this.onDateChange}
                        preloadFiles = {this.preloadFiles}
                        onFileAdded = {this.handleFileAdded}
                        onFileRemoved = {this.handleFileRemoved}
                        blockFileZone = {blockFileZone}
                        showFileManager = {this.state.showFileManager}
                        currentProject = {this.props.projectIntake.requirementsDefinition.Request_ID}
                        currentView = {'RequirementsDefinition'}
                        checkErrorClass = {this.checkErrorClass}
                    />
                )
            }

            // --------------------------------------
            // Render Form Footer
            // --------------------------------------
            renderformFooter() {
                // const {buttonDisabled} = this.state;
                const { Workstage } = this.state;
                let buttonDisabled =  false ;
                if(Workstage.value === 'Requested' && this.props.isPMO === false)
                    buttonDisabled = true;
                else    
                    buttonDisabled = false;
                return (
                    <FormFooter> 
                        <AppButton buttonText = {'Cancel'} buttonClass = {'cancelButton'} disabled = {false} onClick = {this.cancelRequirementsDefinition}></AppButton>

                        <AppButton buttonText = {'Save'} buttonClass = {'saveButton'}  onClick = {this.submitFormDB} disabled = {buttonDisabled}></AppButton>
                        <AppButton buttonText = {'Continue'} buttonClass = {'continueButton'} onClick = {this.submitFormLocalData} disabled = {buttonDisabled}></AppButton>
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
                //? Check Input Text Fields
                if(event.target.value.length > 0)
                    this.removeErrorStatus(target.id)
                //? Check Select Inputs Fields
                else if(this.state[event.target.id].value !== "" )
                    this.removeErrorStatus(target.id)
                //? Puth Back Error Message
                else  if(this.state.checkForErrors === true)
                    this.addErrorStatus(target.id)
                
            }


        

            // --------------------------------------
            // Render Projects
            //isShowingModal && this.createErrorAlert('Please Fill the Required Inputs')
            // --------------------------------------
            renderRequirementsDefinition(requirements) {
				//console.log('TCL: renderRequirementsDefinition -> requirements', requirements)
                const {isShowingModal, hasErrors, sendingData} = this.state;
                console.log("TCL: RequirementsDefinition -> renderRequirementsDefinition -> this.state", this.state)
                // this.createErrorAlert('The name is already on Use. Please a type a different one');
                const formContainer =  <form ref={form => this.formEl = form}  >
                                            <div className="int-container">
                                                <div className="int-row">
                                                    {this.renderHeaderSection()}
                                                </div>
                                                <div className="int-bottomSeparator"></div>

                                                <div className="int-row">
                                                    <div className="int-column ">
                                                        <div className="int-fieldsContainer">
                                                            {this.renderFormFields("second", true,2)}
                                                        </div>
                                                    </div>
                                                    <div className="int-col-separator"></div>

                                                    <div className="int-column">
                                                        <div className="int-fieldsContainer">
                                                            {this.renderFormFields("third",true,3)}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="int-bottomSeparator"></div>

                                                <div className="int-row">
                                                    <div className="int-column ">
                                                        {this.renderFormFields("fourth",true,4)}
                                                    </div>

                                                    <div className="int-column ">

                                                        <button 
                                                            onClick = {this.uploadFilesToSPWithoutSavingDB} 
                                                            className = "int-singleButton" 
                                                            type = "button">
                                                            {this.state.showFileManager === false ? 'Manage Files' : 'Discard Changes'}
                                                        </button>
                                                        <div className="int-row">
                                                          
                                                        </div>
                                                        {this.renderFormFields("fifth",true,5)}
                                                    </div>
                                                </div>
                                            </div>
                                        </form>
                return (
                    <Fragment>
                        <FormBody >
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
                return isLoaded ? this.renderRequirementsDefinition() : this.renderLoader();
            }
    }

// -------------------------------------- 
// Define PropTypes 
// -------------------------------------- 
    RequirementsDefinition.propTypes = {
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
    export default (RequirementsDefinition);
    