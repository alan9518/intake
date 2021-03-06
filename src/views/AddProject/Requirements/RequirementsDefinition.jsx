/* ==========================================================================
** Tab 1 Of Form Handle the Requirement Definition Add Project
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
   
    import { isEmpty } from 'lodash';
    import { withRouter } from 'react-router';
   
    import Alert from 'react-s-alert';
    import 'react-s-alert/dist/s-alert-default.css';
    import 'react-s-alert/dist/s-alert-css-effects/slide.css';
    import moment from 'moment';
    import axios from 'axios';

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
            updateROIRealizedDB,
            saveProjectFiles
    } from '../../../actions';


    const currentUser = window.getCurrentSPUser();

    // const currentUser = {userEmail : 'alan.medina@flex.com', userName : 'alan medina'}


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
                this.state = {
                    isLoaded: false,
                    responsiveWidth : window.innerWidth,
                    sendingData : false,
                    currentMessage : 'Saving Values',
                    Date_Submitted : props.projectIntake.requirementsDefinition.Date_Submitted || moment().format("MM/DD/YYYY"),  
                    Request_Owner : props.projectIntake.requirementsDefinition.Request_Owner || currentUser.userEmail,  
                    Request_ID : props.projectIntake.requirementsDefinition.Request_ID || props.projectIntake.requirementsDefinition.Project_id || '',  
                    Workstage : props.projectIntake.requirementsDefinition.Workstage || {"label" : "1 - New" , "value": "New" },  
                    Project_Name :props.projectIntake.requirementsDefinition.Project_Name || "",  
                    Description : props.projectIntake.requirementsDefinition.Description || "", 
                    Expected_Start_Date : props.projectIntake.requirementsDefinition.Expected_Start_Date || null,  
                    Expected_Completion_Date : props.projectIntake.requirementsDefinition.Expected_Completion_Date || null,   
                    Expected_Start_Date_Moment : props.projectIntake.requirementsDefinition.Expected_Start_Date || null,  
                    Expected_Completion_Date_Moment : props.projectIntake.requirementsDefinition.Expected_Completion_Date || null,   
                    Deadline_Justification : props.projectIntake.requirementsDefinition.Deadline_Justification || "",     
                    Project_Type : props.projectIntake.requirementsDefinition.Project_Type || {label : "Project Type", value : ""},    
                    Project_Documents : props.projectIntake.requirementsDefinition.Project_Documents ||  [],  
                    hasErrors : false,
                    isShowingModal : false,
                    buttonDisabled : false,
                    errors: {},
                    checkForErrors : false,
                    isSavedOnDB : false
                }

                
                this.onChangeSelect =  this.onChangeSelect.bind(this);
                this.onDateChange =  this.onDateChange.bind(this);
                this.preloadFiles =  this.preloadFiles.bind(this);
                // this.checkErrorClass = this.checkErrorClass.bind(this);
                this.filesArray =  props.projectIntake.requirementsDefinition.Project_Documents ||  [];
                this.formFields =  this.createFormStructure();
            }

            // --------------------------------------
            // Set Initial Values
            // --------------------------------------
            componentDidMount() {
                window.addEventListener("resize", this.updateContainerDimensions);
                this.setState({
                    isLoaded : true
                })
            }


      



            // --------------------------------------
            // Save Form Values before the component
            // unloads by the menu navigation
            // --------------------------------------
            componentWillUnmount() {
                this.submitFormLocalData(true)
                
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
            // Enable/Disable Workstage Control
            // --------------------------------------
            checkControlEnabled() {
                const {isPMO} = this.props;
                let enabled = isPMO ? true : false;

                return enabled;
            }


           
            // --------------------------------------
            // Crate JSON Data FIelds
            // --------------------------------------
            createFormStructure() {
                const formFields = [
                    {
                        "Field_Name": "Date Submitted",
                        "value": this.state.Date_Submitted,
                        "Field_State_Name": "Date_Submitted",
                        "group": "firstHalf1",
                        "Mandatory": false,
                        "Enabled": false,
                        
                        "Type": "text",
                        "General_Value": "Today",
                        // "columns" : 2,
                        "columns" : this.state.responsiveWidth <= 768 ? 1 : 2,
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
                        // "columns" : 2
                        "columns" : this.state.responsiveWidth <= 768 ? 1 : 2,
                    },
                    {
                        "Field_Name": "Request ID",
                        "value": this.setRequestIDValue(this.state.Request_ID),
                        "Field_State_Name": "Request_ID",
                        "group": "firstHalf2",
                        "Mandatory": false,
                        "Enabled": false,
                        
                        "Type": "text",
                        "General_Value": "0000001",
                        // "columns" : 2,
                        "columns" : this.state.responsiveWidth <= 768 ? 1 : 2,
                        "small_input" : true
                    },
                    {
                        "Field_Name": "Workstage",
                        "value": this.state.Workstage,
                        "Field_State_Name": "Workstage",
                        "group": "firstHalf2",
                        "Mandatory": false,
                        // "Enabled": this.checkControlEnabled(),
                        "Enabled" : false,
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
                        // "columns" : 2,
                        "columns" : this.state.responsiveWidth <= 768 ? 1 : 2,
                        "allowFilter" : false
                    },
                    
                    {
                        "Field_Name": "Project Name",
                        "value": this.state.Project_Name,
                        "Field_State_Name": "Project_Name",
                        "group": "second",
                        "Mandatory": true,
                        "Enabled": true,
                        "Sequence": "1",
                        "Type": "Text",
                        "General_Value": "Open Text",
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
                        "Enabled": true,
                        "Sequence": "3",
                        "Type": "Text",
                        "General_Value": "Open Text",
                        "columns" : 1,
                        "isTextArea" : true,
                        "hasToolTip" : true,
                        "toolTipText" : "Detailed description of this project "
                    },
                    {
                        "Field_Name": "Expected Start Date",
                        "value": this.state.Expected_Start_Date,
                        "Field_State_Name": "Expected_Start_Date",
                        "group": "third",
                        "Mandatory": "No",
                        "Enabled": true,
                        "Sequence": "2",
                        "Type": "Date",
                        "General_Value": "Date Picker",
                        // "columns" : 2,
                        "columns" : this.state.responsiveWidth <= 768 ? 1 : 2,
                        "hasToolTip" : true,
                        "toolTipText" : "Timeline for Start of this project "
                    },
                    {
                        "Field_Name": "Expected Completion Date",
                        "value": this.state.Expected_Completion_Date,
                        "Field_State_Name": "Expected_Completion_Date",
                        "group": "third",
                        "Mandatory": "No",
                        "Enabled": true,
                        "Sequence": "4",
                        "Type": "Date",
                        "General_Value": "Date Picker",
                        // "columns" : 2,
                        "columns" : this.state.responsiveWidth <= 768 ? 1 : 2,
                        "hasToolTip" : true,
                        "toolTipText" : "Timeline for End of this project"
                    },
                    {
                        "Field_Name": "Deadline Justification",
                        "value": this.state.Deadline_Justification,
                        "Field_State_Name": "Deadline_Justification",
                        "group": "third",
                        "Mandatory": true,
                        "Enabled": true,
                        "Sequence": "5",
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
                        "Enabled": true,
                        "Sequence": "6",
                        "Type": "Combo",
                        "General_Value": [
                            {"label" :"1.- New Application Development" , "value": "New Application Development" },
                            {"label": "2.- Replacement of Existing Application" , "value": "Replacement of Existing Application" },
                            {"label": "3.- Enhancement of Existing Application" , "value": "Enhancement of Existing Application" },
                            {"label": "4.- Reports Development", "value": "Reports Development" },
                            {"label": "5.- Platform Standardization" , "value": "Platform Standardization" }
                        ],
                        "columns" : 1 ,
                        "hasToolTip" : true,
                        "extraWideControl" : true,
                        "toolTipText" : "Pick from the drop-down ",
                        "allowFilter" : false
                    },
                    {
                        "Field_Name": "Project Documents",
                        "value": this.state.Project_Documents,
                        "Field_State_Name": "Project_Documents",
                        "group": "fifth",
                        "Mandatory": false,
                        "Enabled": true,
                        "Sequence": "7",
                        "Type": "filesPicker",
                        "General_Value": "Attachements",
                        "columns" : 1,
                        "hasToolTip" : true,
                        "toolTipText" : "Attach project related documents and presentations"
                    }
                ]

                return formFields;
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



            /* ==========================================================================
            ** FIle Manager Fuctions
            ** ========================================================================== */


                // --------------------------------------
                // Handle Add File to Dropzone
                // --------------------------------------
                handleFileAdded = (file) => {
            
                    this.filesArray.push(file);
                    if( file.type.indexOf('image/') < 0 )
                    {
                        this.createPreviewImageDropzone(null, file);
                    }
                }


                // --------------------------------------
                // Handle Remove Fxile to Dropzone
                // --------------------------------------
                handleFileRemoved = (file) => {

                    let removedfileName = file.name;
                    let newFilesarray = [];
                    this.filesArray.map((file) => {
                        // if(file.indexOf())
                        if (file.name.indexOf(removedfileName) < 0) {
                            newFilesarray.push(file)
                        }
                    })
        
                    this.filesArray = newFilesarray;


                }


            
                // --------------------------------------
                // Preload Dropzone FIles
                // --------------------------------------

                preloadFiles = (dropzone)=> {
                    // const {Project_Documents} = this.props.requirementsDefinition;

                    const Project_Documents = this.filesArray;

                    if (Project_Documents === null || Project_Documents === undefined || Project_Documents[0] === "")
                        return;

                    Project_Documents.map((mockDoc, index) => {
                        // let mockFile = this.props.fieldValues.ProjectImage;
                        dropzone.options.addedfile = mockDoc;
                        dropzone.emit("addedfile", mockDoc);
                        dropzone.emit("thumbnail", mockDoc, mockDoc.dataURL);
                        dropzone.emit("complete", mockDoc);
                        // Set width and height
                        if( mockDoc.type.indexOf('image/') < 0 )
                        {
                            this.createPreviewImageDropzone(index, mockDoc);
                        }
                        else
                        {
                            let imageContainer = document.getElementsByClassName('dz-image')[index];
                            let image = imageContainer.childNodes[0];
                                image.style.width = "120px";
                                image.style.height = "120px";
                        }
                        
                    });
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
                    let fileExtension = "";
                    if(fileType !== "")
                        fileExtension =  fileType.split('/')[1]
                    else       
                        fileExtension =  fileName.split('.')[1]
                    let iconSrc = `https://flextronics365.sharepoint.com/sites/project_intake/ProjectIntake/assets/File-Icons/${fileExtension}.png`;

                    return iconSrc;
                }

                /**  --------------------------------------
                // Call SP Function to Upload File
                // @param {folderName}  GSD126
                // @param {folderToUpload} RequirementsDefinition
                // on Each Child of filesArary
                // --------------------------------------*/
                uploadFiles (folderName, foldertoUpload) {
                    
                    const {filesArray} = this;
                    

                    const folderURL = `intakeFiles/${foldertoUpload}`;
                    let filesToUploadDBArray = [];
                    if(filesArray.length <= 0)
                        return;
                    
                    // Iterate Files
                    for(let file of filesArray) {
                        
                        let fileURL = `sites/gsd/intake_process/${folderURL}/${file.name}`;
                        window.uploadFilesToFolder(folderURL,file.name, file, filesArray.length);
                        
                        filesToUploadDBArray.push(fileURL);
                    }

                    if(filesToUploadDBArray.length > 0)
                        this.saveFilesonDB(folderName, filesToUploadDBArray)
                }


                // --------------------------------------
                // Save Files on DB
                // --------------------------------------
                saveFilesonDB(projectID,filesToUploadDBArray ) {
					
                    const id = projectID || this.props.projectIntake.requirementsDefinition.Request_ID;
                    const requestID = id.substr(id.indexOf('GSD')+3,id.length);
                    const filesString = filesToUploadDBArray.join(',');
                    // const currentUser = window.getCurrentSPUser();

                    // Loomk For Files on SP FOlder
                        saveProjectFiles(requestID, filesString, currentUser.userEmail).then((data)=>{
                        

                    })
                    .catch((error)=> {
						console.log('TCL: saveFilesonDB -> error', error)
                        
                    })
                }



                /**  --------------------------------------
                // Call SP Function to Upload File
                // @param {folderName}  GSD126
                // @param {folderToUpload} RequirementsDefinition
                // on Each Child of filesArray
                // --------------------------------------*/
                uploadPMOFiles (foldertoUpload, folderName) {
                  

                    // const folderURL = `intakeFiles/${foldertoUpload}`;

                    let projectFolder = foldertoUpload.indexOf('GSD')>= 0 ? foldertoUpload : `GSD${foldertoUpload}`

                    const folderURL = `intakeFiles/${projectFolder}/PMO`;

                    // let filesToUploadDBArray = [];
                   
                    const filesArray = this.props.projectIntake.pmoEvaluation.Documents
                     if(filesArray ) {
                         // ? Iterate Files
                            for(let file of filesArray) {
                                let saveFile = null
                                let fileURL = '';

                                if(!file.name) 
                                    saveFile =  this.createMockFile(file )
                                else
                                    saveFile = file;
                                
                                //? Set File URL to Save on DB
                                if(saveFile.name.indexOf('sites/') >= 0) 
                                    fileURL = saveFile.name
                                else {
                                    // ? Create new URl and the just upload the new file
                                    // ? Dont save here. Thats on the Update Method
                                    fileURL = `sites/gsd/intake_process/${folderURL}/${saveFile.name}`;
                                    window.uploadFilesToFolder(folderURL, saveFile.name, saveFile, filesArray.length);
                                }


                                
                                
                                    
                            }
                     }
                     else
                        return

                   
                    
                 
                }





        /* ==========================================================================
        ** Save Values
        ** ========================================================================== */

                
                // --------------------------------------
                // Validate Form
                // --------------------------------------
                validateFormInputs() {
                    const fields = this.formFields;

                    const errors = fields.map((fieldItem) => {
                        
                        if (fieldItem.Mandatory === true) {
    
                        
                            // Check empty value for text input
                            if (fieldItem.Type === "Text" || fieldItem.Type === "Decimal" || fieldItem.Type === "Integer") {
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
                                if (this.state[fieldItem.Field_State_Name].value === "" || this.state[fieldItem.Field_State_Name].value === null || this.state[fieldItem.Field_State_Name] === null || this.state[fieldItem.Field_State_Name] === []) {
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
    
                    return errorsCount > 0 ? false : true
    
                }
    

                // --------------------------------------
                // Save Form Values
                // --------------------------------------
                saveFormValues (projectID = null) { 
                    //? const currentUser = window.getCurrentSPUser();

                    const projId = this.props.projectIntake.requirementsDefinition.Request_ID || projectID;
                    let requestID = null
                    
                    if(projId === undefined || projectID === undefined || projectID === null) {

                        if(this.props.projectIntake.requirementsDefinition.SavedOnDB === true || this.props.projectIntake.requirementsDefinition.Project_id ) {
                            let id = this.props.projectIntake.requirementsDefinition.Project_id 
                            requestID = id.indexOf('GSD') >= 0 ?  id.substr(id.indexOf('GSD')+3,id.length) : id;    

                        }
                        else
                            requestID = null;
                    }
                        
                    else
                        requestID = projId.substr(projId.indexOf('GSD')+3,projId.length);    



                    
                    const formData = {
                        Project_id : requestID,
                        Project_Name : this.state.Project_Name,
                        Description : this.state.Description,
                        Project_Type : this.state.Project_Type,
                        Date_submitted : moment().format("DD/MM/YYYY") ,
                        Request_Owner : this.state.Request_Owner,
                        Workstage : this.state.Workstage,   
                        Expected_Start_Date : this.state.Expected_Start_Date || moment(),
                        Expected_Completion_Date : this.state.Expected_Completion_Date || moment(),
                        Deadline_Justification : this.state.Deadline_Justification,
                        Project_docs : this.filesArray || [],
                        Project_Documents : this.filesArray || this.state.Project_Documents || [],
                        Created_by : currentUser.userEmail,
                        Last_modifed_by : currentUser.userEmail

                        
                    }


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
                    if(exitFromMenu !== true) {

                        if(this.validateDates(this.state.Expected_Start_Date, this.state.Expected_Completion_Date) === false) {
                    
                            return;
                        }
    
                        if(this.validateFormInputs() === false) {
                            this.createErrorAlertTop('Please Fill all the Required Fields');
                            this.setState({checkForErrors: true})
                            return;
                        }

                        this.createSuccessAlert('Data Saved Locally');
                        this.redirectUser();
                    }

                    const formData = this.saveFormValues();
                    
                    if(this.state.isSavedOnDB === true)
                        this.props.updateProjectIntakeValues('requirements',formData, null, true)
                    else
                        this.props.updateProjectIntakeValues('requirements',formData)


                    // this.redirectUser();

                }


                // --------------------------------------
                // Save New Project
                // --------------------------------------
                saveNewProjectDB = ()=> {
                    
                    const formData = this.saveFormValues(null);
                    // let {requirementsDefinition} = this.props.projectIntakeprojectIntake
                    // ? Save Requirements on DB From Actions File
                    //   saveRequirementsDB(formData)

                    saveRequirementsDB(formData).then((newProjectID)=>{

                        // const newProjectID = this.props.requirementsDefinition.newProjectID
                        let reqFolderURL = `${newProjectID}/RequirementsDefinition`;
                        let pmoFolderURL = `${newProjectID}/PMO`;
                        


                        // ? Update Project Intake Object with New ID
                        formData.Project_id = newProjectID
                        

                        
                        // requirementsDefinition =  Object.assign({}, this.props.projectIntake.requirementsDefinition, requirementsDefinition)
                        // ? object to update, newData, extraValues (files), saveValuesonDB
                        this.setState({Request_ID : newProjectID})
                        this.props.updateProjectIntakeValues('requirements',formData, null, true)


                        // !Create Project Folder

                            

                            window.createFolderStructure('intakeFiles' , reqFolderURL, ()=> {

                             

                                this.uploadFiles(newProjectID, reqFolderURL);
                                

                                this.createSuccessAlert(`Data Saved,Project ID : ${newProjectID}`);


                                this.setState({ Request_ID : newProjectID , sendingData : false})
                                
                            }, 
                                () => {
                                    this.createErrorAlert('There was a problem creating the Folder, please try again ');
                            });

                            // Creaate PMO Folder
                            window.createFolderStructure('intakeFiles' , pmoFolderURL, ()=> {
                                // setTimeout(()=>{this.redirectUser();},700);
                            }, 
                                () => {
                                    this.createErrorAlert('There was a problem creating the Folder, please try again ');
                            });


                        // ? Update All Tabs
                            this.setState({isSavedOnDB : true})

                            this.saveOtherTabs(newProjectID);


                            

                        // ? Send Email Update
                            this.props.sendEmailUpdate(newProjectID).then((repsonse) => {
                                console.log("TCL: submitFormDB -> repsonse", repsonse)
                                
                            })


                            this.setState({sendingData : false})
                            

                        
                        

                        
                      
                        
                        
                        
                    })
                    .catch((error) => { console.log("TCL: saveNewProjectDB -> error", error); this.setState({sendingData : false})})
                    
                }



                // --------------------------------------
                // Update Current Project
                // --------------------------------------
                updateCurrentProjectDB = (currentProjectID) =>{
                    const formData = this.saveFormValues(currentProjectID);
                    
                    //? Update Requirements
                    updateRequirementsDB(formData).then(()=>{

                        let folderNameID = currentProjectID.indexOf('GSD') >= 0 ?  currentProjectID : `GSD${currentProjectID}`
                        let reqFolderURL = `${folderNameID}/RequirementsDefinition`;
                       
                        
                        
                        
                        this.uploadFiles(folderNameID, reqFolderURL);


                        

                        // Rename Files Based on Project ID

                        // Create Projectt Folder

                        

                        

                        this.createSuccessAlert('Data Updated ');

                        

                        this.saveOtherTabs(currentProjectID);


                        this.props.updateProjectIntakeValues('requirements',formData, null, true)


                        // ? Send Email Update
                        this.props.sendEmailUpdate(currentProjectID).then((response) => {
                                console.log("TCL: submitFormDB -> response", response)

                        })

                        this.setState({ Request_ID : currentProjectID , sendingData : false})
                       
                        
                        
                    })
                    .catch((error)=> {
                        console.log("TCL: updateCurrentProjectDB -> error", error)
                        this.createErrorAlert('There was a problem saving the data, please try again ' + error);
                        // this.setState({sendingData : false})}
                        
                    })
                    
                }



                // !--------------------------------------
                // ! Submit Form to DB
                // !--------------------------------------
                submitFormDB = () => {

                    //? Validate Dates
                     
                    if(this.validateDates(this.state.Expected_Start_Date, this.state.Expected_Completion_Date) === false) {
                        
                        return;
                    }

                    if(this.validateFormInputs() === false) {
                        this.createErrorAlertTop('Please Fill all the Required Fields');
                        this.setState({checkForErrors: true})
                        return;
                    }
                    
                    
                    this.setState({sendingData : true})
                    
                    //? Check if is an insert or an update

                    const {requirementsDefinition} = this.props.projectIntake;


                    if(requirementsDefinition.SavedOnDB === true || requirementsDefinition.Project_id !== null ||  requirementsDefinition.Request_ID !== null ) {
                        // Update Project
                        // Get Current Project ID
                        const newProjectID = requirementsDefinition.Project_id
                        this.updateCurrentProjectDB(newProjectID);
                        this.setState({checkForErrors: false})
                    }
                    else {
                        // Save New Project
                        this.saveNewProjectDB();
                    }     



                   
                    
                }


                // !--------------------------------------
                // ! Save Other Tabs
                // !--------------------------------------
                saveOtherTabs = (projectID) => {

                    // Remove the GSD from the ID if theres any
                    const id = projectID.indexOf('GSD') >= 0  ? projectID.substr(projectID.indexOf('GSD')+3,projectID.length) : projectID;


                    
                    const {businessInformation, technicalEvaluation, pmoEvaluation, roiRealized} = this.props.projectIntake;
                   

                    

                    try {
                            // ? Save Business Information
                            if( !isEmpty(businessInformation) && businessInformation.SavedLocally === true ) {

                                
                                
                                if(businessInformation.Buss_info_id || businessInformation.buss_info_id) 
                                    updateBusinesInformationDB(businessInformation, id).then((data) => {
                                         // ? Update Props
                                        this.props.updateProjectIntakeValues('business',businessInformation, null, true)
                                    })
                                else {
                                    saveBusinesInformationDB(businessInformation, id).then((newBusinesId) => {
                                        businessInformation.Buss_info_id = newBusinesId

                                        // ? Update Props
                                        this.props.updateProjectIntakeValues('business',businessInformation, null, true)

                                    }).catch((error) => {console.log("TCL: saveOtherTabs -> error", error)})
                                    
                                }  

                               
                                    
                        
                                
                            }

                            // ? Save Tehnical Evaluation
                            if(!isEmpty(technicalEvaluation) && technicalEvaluation.SavedLocally === true) {
                                if(technicalEvaluation.Tech_eval_id || technicalEvaluation.tech_eval_id) {
                                    updateTechnicalDB(technicalEvaluation, id).then((data) => {
                                        // ? Update Props
                                        this.props.updateProjectIntakeValues('technical',technicalEvaluation, null, true)
                                    })
                                }
                                else
                                    saveTechnicalDB(technicalEvaluation, id).then((newTechId) => {
                                        technicalEvaluation.Tech_eval_id = newTechId

                                        // ? Update Props
                                        this.props.updateProjectIntakeValues('technical',technicalEvaluation, null, true)

                                    }).catch((error) => {console.log("TCL: saveOtherTabs -> error", error)})

                               
                            }
                            

                            // ? Save PMO Evaluation
                            if(!isEmpty(pmoEvaluation) && pmoEvaluation.SavedLocally === true) {
                                if(pmoEvaluation.Pmo_eval_id || pmoEvaluation.pmo_eval_id) {
                                    pmoEvaluation.Project_ID = id
                                    
                                    updatePMOEvaluation(pmoEvaluation, id).then((data)=> {

                                        let reqFolderURL = `${id}/PMO`;
                                        this.uploadPMOFiles(id, reqFolderURL)

                                        // ? Update Props
                                        this.props.updateProjectIntakeValues('pmoEval',pmoEvaluation, null, true)
                                    })
                                }
                                else
                                    savePMOEvaluationDB(pmoEvaluation, id).then((newPmoId) => {
                                        pmoEvaluation.Pmo_eval_id = newPmoId

                                        let reqFolderURL = `${id}/PMO`;
                                    
                                        this.uploadPMOFiles(id, reqFolderURL)

                                         // ? Update Props
                                        this.props.updateProjectIntakeValues('pmoEval',pmoEvaluation, null, true)

                                    }).catch((error) => {console.log("TCL: saveOtherTabs -> error", error)})

                               
                            }



                        // ? Save Roi Realized

                        if(!isEmpty(roiRealized) && roiRealized.SavedLocally === true) {
                            // ? Look For Roi Relized Data
                            if(roiRealized.Roi_real_id || roiRealized.roi_real_id) {
                                updateROIRealizedDB(roiRealized, id).then((roiID) => {
                                    roiRealized.Roi_real_id = roiID
                                    // ? Look for Dynatrace
                                    if(!isEmpty (roiRealized.dynatrace))
                                        saveDynatraceDB(roiRealized.dynatrace, id,  roiID)


                                    // ? Update Props
                                    this.props.updateProjectIntakeValues('roiRealized',roiRealized, roiRealized.dynatrace, true)

                                })
                            }
                             else
                                saveROIRealizedDB(roiRealized, id).then((roiID) => {
                                    roiRealized.Roi_real_id = roiID
                                     // ? Look for Dynatrace
                                    if(!isEmpty (roiRealized.dynatrace))
                                        saveDynatraceDB(roiRealized.dynatrace, id,  roiID)

                                    // ? Update Props
                                    this.props.updateProjectIntakeValues('roiRealized',roiRealized, roiRealized.dynatrace, true)

                                })

                           
                           
                           


                        }



                     

                    }   
                    catch(error) {
                        console.log("TCL: error", error)
                        this.createErrorAlert('An error ocurred while saving the data, please try again');
                        
                    }

                  

                
                    this.setState({sendingData : false}, this.redirectUser())

                    
                }



                // --------------------------------------
                // validate Form selects
                // --------------------------------------
                // validateFormSelects() {
                //     const {Workstage, Project_Type} = this.state;
                // }


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
                const path = '/sites/gsd/intake_process/IntakeProcess/ProjectIntake.aspx';

                //const path = '/intake'
                
                history.push(`${path}/add-project/business-information`);
            }

            // --------------------------------------
            // Redirect User to HomePage
            // --------------------------------------
            cancelRequirementsDefinition = () => {
                const {history} = this.props.locationData;
                const path = '/sites/gsd/intake_process/IntakeProcess/ProjectIntake.aspx';

                this.props.resetProjectIntake();

                //const path = '/intake'

                history.push(`${path}/intake-projects/`);
            }

        /* ==========================================================================
        ** Render Methods
        ** ========================================================================== */


            // --------------------------------------
            // Set Request ID Value
            // Check if ID has GSD
            // --------------------------------------
            setRequestIDValue(request_id) {
                if (!request_id || request_id === '')
                    return ''

                let request = request_id.indexOf('GSD') >= 0 ? request_id : `GSD${request_id}`;

                return request
            }


            // --------------------------------------
            // Render Loader
            // --------------------------------------
            renderLoader (isTransparent) {

                const {currentMessage} = this.state

                const container = document.getElementsByClassName('int-formFieldsContainer')[0]
                const containerWidth = isTransparent ? container.clientWidth : null;
                const containerHeight = isTransparent ? container.clientHeight : null;
                return <div> <AppLoader customHeight = { containerHeight || 800} isTransparent = {isTransparent} customWidth = {containerWidth}  message = {currentMessage}/> </div>
            }




            

            // --------------------------------------
            // Form Header
            // --------------------------------------
            renderHeaderSection() {
                const containerClass =  this.state.responsiveWidth <= 768 ? 'int-row' : 'int-column ';
                return (
                    <Fragment>
                        <div className="int-container">
                            

                            <div className="int-row">
                                {/*<div className="int-double-column ">*/}
                                <div className = {containerClass}>
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
                const formFieldsValues =  this.createFormStructure();
                const formData = formFieldsValues.filter((item) => { return item.group === group });
                
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
                        blockFileZone = {false}
                        showFileManager = {true}
                        checkErrorClass = {this.checkErrorClass}
                    />
                )
            }

            // --------------------------------------
            // Render Form Footer
            // --------------------------------------
            renderformFooter() {
                // const { Workstage} = this.state;
                // let buttonDisabled =  false ;
                // if(Workstage === 'Requested' && this.props.isPMO === false)
                //     buttonDisabled = false;
                // else    
                //     buttonDisabled = true;

                return (
                    
                    <FormFooter> 
                    
                        <AppButton 
                            buttonText = {'Cancel'} 
                            buttonClass = {'cancelButton'}
                            onClick = {this.cancelRequirementsDefinition}
                            disabled = {false}>
                        </AppButton>
                        <AppButton 
                            buttonText = {'Save'} 
                            buttonClass = {'saveButton'}  
                            onClick = {this.submitFormDB} 
                            disabled = {false} 
                            buttonName = {'save'}>
                        </AppButton>
                        <AppButton buttonText = {'Continue'} buttonClass = {'continueButton'} onClick = {this.submitFormLocalData} disabled = {false} buttonName = {'Continue'}></AppButton>
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
            renderRequirementsDefinition() {
                const {isShowingModal, hasErrors, sendingData} = this.state;
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
    // RequirementsDefinition.propTypes = {
    //     requirementsDefinition: PropTypes.object.isRequired
    // };




// --------------------------------------
// Export Component
// --------------------------------------
    export default  (RequirementsDefinition);
   