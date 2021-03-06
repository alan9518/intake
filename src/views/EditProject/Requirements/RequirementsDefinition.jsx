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

    import { Prompt  } from 'react-router-dom';
  
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
        saveProjectFiles,
        getSharepointReqFiles,
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
    class RequirementsDefinition extends Component {


        /* ==========================================================================
        ** Component Setup
        ** ========================================================================== */

            // --------------------------------------
            // Constructor
            // --------------------------------------
            constructor(props) {
                super(props);
               
                const projectID = props.projectIntake.requirementsDefinition.Project_id || props.projectIntake.requirementsDefinition.Request_ID;
				
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
                    Expected_Completion_Date : moment(props.projectIntake.requirementsDefinition.Expected_Completion_Date).format("DD/MM/YYYY") || null,   
                    Expected_Start_Date_Moment : moment(props.projectIntake.requirementsDefinition.Expected_Start_Date).format("DD/MM/YYYY") || null,  
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
                    isSavedOnDB : false

                }
                this.onChangeSelect =  this.onChangeSelect.bind(this);
                this.onDateChange =  this.onDateChange.bind(this);
                this.preloadFiles =  this.preloadFiles.bind(this);
                this.filesArray = [];
                this.originalFiles = [];
             
            }



          


            // --------------------------------------
            // Save Form Values before the component
            // unloads by the menu navigation
            // --------------------------------------
            componentWillUnmount() {
                
                this.submitFormLocalData(true)
            }



            componentDidMount() {

               
                
              

                this.setState({
                    Expected_Start_Date : moment(this.props.projectIntake.requirementsDefinition.Expected_Start_Date )|| moment(),  
                    Expected_Completion_Date : moment(this.props.projectIntake.requirementsDefinition.Expected_Completion_Date) || moment(),   
                    Expected_Start_Date_Moment : this.convertStringToMomentObject(this.props.projectIntake.requirementsDefinition.Expected_Start_Date) || moment(),  
                    Expected_Completion_Date_Moment : this.convertStringToMomentObject(this.props.projectIntake.requirementsDefinition.Expected_Completion_Date) || moment(),   
                    Project_Type : this.createSelectOption(this.props.projectIntake.requirementsDefinition.Project_Type),
                    Workstage : this.createSelectOption(this.props.projectIntake.requirementsDefinition.Workstage),
                    spFiles : this.props.projectIntake.requirementsDefinition.SPFiles,
                    isLoaded : true
                })

                this.filesArray = this.props.projectIntake.requirementsDefinition.Project_Documents

                this.formFields =  this.createFormStructure();
            }

                   
                
            



            






         


          

            // --------------------------------------
            // Convert String to Moment Object
            // --------------------------------------
            convertStringToMomentObject(date) {
                let dateObj = new Date(date);

                let momentObj = moment(dateObj);


                
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
                let usersCanEdit = false;
                if(this.state.Workstage.value === "Requested" && this.props.isPMO === false)
                    usersCanEdit = false;
                else if(this.state.Workstage.value !== "Requested" && this.props.isPMO === false)
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
                        "value": this.setRequestIDValue(this.props.projectIntake.requirementsDefinition.Request_ID || this.state.Request_ID),
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
                
               let newDate = this.props.projectIntake.requirementsDefinition.Date_submitted  || '';
                if(!date)
                    return ''

                if(date === 'NaN/NaN/NaN')
                    newDate = this.props.projectIntake.requirementsDefinition.Date_submitted


                else if(date._isValid === false)
                    newDate = this.props.projectIntake.requirementsDefinition.Date_submitted || date._i
                else
                    // return 'date'
                    newDate =  moment(date).format("DD/MM/YYYY") || this.props.projectIntake.requirementsDefinition.Date_submitted;
                    

                return newDate;

                
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
                    if( file.type.indexOf('image/') < 0 )
                    // if( type !== "png" || type !== "jpg" || type !== "jpeg" || type !== "gif" )
                    {
                        this.createPreviewImageDropzone(null, file);
                    }
                }


                // --------------------------------------
                // Handle Remove Fxile to Dropzone
                // --------------------------------------
                handleFileRemoved = (file) => {
               

                    let newFilesarray = this.state.Project_Documents.filter((delFile) => {
                       
                        return file.name !==  delFile.name
                        
                    })

                    this.setState({Project_Documents : newFilesarray, fileRemoved : true})
                    this.filesArray = newFilesarray



                    


                }


            
                // --------------------------------------
                // Preload Dropzone FIles
                // --------------------------------------

                preloadFiles = (dropzone)=> {
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
                            
                                

                        dropzone.options.addedfile = mockFile;
                        dropzone.emit("addedfile", mockFile);

                        if(mockFile.dataURL)
                            mockFileImage = mockFile.dataURL
                        else if (mockFile.name.indexOf('sites')>=0)
                            mockFileImage = `https://flextronics365.sharepoint.com/${mockFile.name}`

                        dropzone.emit("thumbnail", mockFile, mockFileImage);
                        dropzone.emit("complete", mockFile);

                        dropzone.files.push(mockFile);


                        

                        
                        //? Set Preview of of files that are not images
                        let type = mockDoc.TypeDocument || mockFile.type
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

                    return iconSrc;
                }

              

                 /**  --------------------------------------
                // Call SP Function to Upload File
                // @param {folderName}  GSD126
                // @param {folderToUpload} RequirementsDefinition
                // on Each Child of filesArary
                // --------------------------------------*/
                uploadFiles (folderName, foldertoUpload, filesArray, saveOnDB = true) {
                  
                    

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
                        
                        //? Set File URL to Save on DB
                        if(saveFile.name.indexOf('sites/') >= 0) 
                            fileURL = saveFile.name
                        else {
                            // ? Create new URl and the just upload the new file
                            fileURL = `sites/gsd/intake_process/${folderURL}/${saveFile.name}`;
                            window.uploadFilesToFolder(folderURL, saveFile.name, saveFile, filesArray.length, this.props.updateSPFiles(folderName) );
                        }
                            


                   
                        
                        filesToUploadDBArray.push(fileURL);
                    }

                   if(saveOnDB === true) 
                        this.saveFilesonDB(folderName, filesToUploadDBArray)


                    
                }

                // --------------------------------------
                // Save Files on DB
                // --------------------------------------
                saveFilesonDB(folderName,filesToUploadDBArray ) {
				

                    const {projectID} = this.props.locationData.match.params;


                    const id = projectID || this.props.projectIntake.requirementsDefinition.Request_ID || this.props.projectIntake.requirementsDefinition.Project_id ;
                    const requestID = id.substr(id.indexOf('GSD')+3,id.length);
                    const filesString = filesToUploadDBArray.join(',');

                    //? Look For Files on SP FOlder
                    saveProjectFiles(requestID, filesString, currentUser.userEmail).then((data)=>{
                        console.log('TCL: saveFilesonDB -> data', data);
                        

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
                  


                    let projectFolder = foldertoUpload.indexOf('GSD')>= 0 ? foldertoUpload : `GSD${foldertoUpload}`

                    const folderURL = `intakeFiles/${projectFolder}/PMO`;

                   
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
                // Validate Form Inputs
                // --------------------------------------
                validateFormInputs() {
                    const fields = this.formFields !== undefined ? this.formFields : this.createFormStructure();
                    
                    
                    let errors = fields.map((fieldItem) => {
                        if(fieldItem.Mandatory === true) {
                            // Check empty value for text input
                            if(fieldItem.Type === "Text" || fieldItem.Type === "Decimal" || fieldItem.Type === "Integer") {
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
                                if(this.state[fieldItem.Field_State_Name].value === "" || this.state[fieldItem.Field_State_Name].value === null  || this.state[fieldItem.Field_State_Name] === null  || this.state[fieldItem.Field_State_Name] === [])  {
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

                    return errorsCount > 0 ?  false : true
                    
                }




                // --------------------------------------
                // Save Form Values
                // --------------------------------------
                saveFormValues () { 
                   

                    this.filesArray = this.state.Project_Documents;

                    const projId = (this.props.projectIntake.requirementsDefinition.Request_ID ).toString()
                    const requestID =  projId.indexOf('GSD') >= 0 ?  projId.substr(projId.indexOf('GSD')+3,projId.length) : projId;



                 
                    const formData = {
						
                        Project_id : requestID,
                        Project_Name : this.state.Project_Name,
                        Description : this.state.Description,
                        Project_Type : this.state.Project_Type,
                        Date_submitted : this.state.Date_Submitted || this.props.projectIntake.requirementsDefinition.Date_Submitted || moment().format("DD/MM/YYYY"),
                        Request_Owner : this.state.Request_Owner,
                        Workstage : this.state.Workstage,   
                        Expected_Start_Date : this.state.Expected_Start_Date || moment(),
                        Expected_Completion_Date : this.state.Expected_Completion_Date || moment(),
                        Deadline_Justification : this.state.Deadline_Justification,
                        SPFiles : this.state.spFiles,
                        Project_docs : this.state.Project_Documents || [],
                        Created_by : currentUser.userEmail,
                        Last_modifed_by : currentUser.userEmail

                        
                    }



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
                        showFileManager : false
                    })

                    


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

                    if(this.state.isSavedOnDB === true)
                        this.props.updateProjectIntakeValues('requirements',formData, null, true)
                    else
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

                    
                    if(this.validateDates(this.state.Expected_Start_Date, this.state.Expected_Completion_Date) === false) {
                        return;
                    }


                    if(this.validateFormInputs() === false) {
                        this.createErrorAlertTop('Please Fill all the Required Fields');
                        this.setState({checkForErrors: true})
                        return;
                    }
                    

                    this.setState({sendingData : true})
                    const formData = this.saveFormValues();
                    const {filesArray} = this;
                    let spFiles = [];
				

                    //? Save Requirements
                    updateRequirementsDB(formData).then(()=>{
                        const {Project_id, Request_ID} = this.props.projectIntake.requirementsDefinition;

                        const {projectID} = this.props.locationData.match.params;
                        let reqFolderURL = `${projectID}/RequirementsDefinition`;
                        

                        this.createSuccessAlert('Data Updated ');


                        

                       

                        // ?Rename Files Based on Project ID

                        // ?Create Projectt Folder

                        

                        
                        this.uploadFiles(projectID, reqFolderURL, filesArray);



                        this.props.updateProjectIntakeValues('requirements',formData, null, true)



                        this.saveOtherTabs(projectID);



                        // ? Send Email Update
                        this.props.sendEmailUpdate(projectID).then((repsonse) => {
                            console.log("TCL: submitFormDB -> repsonse", repsonse)
                            
                        })
                      
                        

                      

                        this.setState({ Request_ID : Request_ID , sendingData : false, checkForErrors: false, showFileManager : false, isSavedOnDB : true})





    
                        
                    })
                    .catch((error)=> {
                        console.log("TCL: submitFormDB -> error", error)
                        this.createErrorAlert('There was a problem saving the data, please try again ');
						
                    })


                  
                     
                    
                }




                // !--------------------------------------
                // ! Save Other Tabs
                // !--------------------------------------
                saveOtherTabs = async (projectID) => {
              
                    const id = projectID.indexOf('GSD') >= 0  ? projectID.substr(projectID.indexOf('GSD')+3,projectID.length) : projectID;
                    const {businessInformation, technicalEvaluation, pmoEvaluation, roiRealized} = this.props.projectIntake;
                   
                    

                    try {
                        // ? Save Business Information
                        if( !isEmpty(businessInformation) && businessInformation.SavedLocally === true) {

                      
                            
                            if(businessInformation.Buss_info_id || businessInformation.buss_info_id )
                                updateBusinesInformationDB(businessInformation, id).then((newBusinesId) => {
                                    // businessInformation.Buss_info_id = newBusinesId
                                }).catch((error) => {console.log("TCL: saveOtherTabs -> error", error)})
                            else {
                                saveBusinesInformationDB(businessInformation, id).then((newBusinesId) => {
                                    businessInformation.Buss_info_id = newBusinesId
                                }).catch((error) => {console.log("TCL: saveOtherTabs -> error", error)})
                                
                            }  

                            // ? Update Props
                            this.props.updateProjectIntakeValues('business',businessInformation, null, true)
                                
                    
                            
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
                                }).catch((error) => {console.log("TCL: saveOtherTabs -> error", error)})

                            // ? Update Props
                            this.props.updateProjectIntakeValues('technical',technicalEvaluation, null, true)
                        }
                        

                        // ? Save PMO Evaluation
                        if(!isEmpty(pmoEvaluation) && pmoEvaluation.SavedLocally === true) {
                            if(pmoEvaluation.Pmo_eval_id || pmoEvaluation.pmo_eval_id) {
                                updatePMOEvaluation(pmoEvaluation, id)
                                let reqFolderURL = `${id}/PMO`;
                                this.uploadPMOFiles(id, reqFolderURL)

                            }
                            else
                                savePMOEvaluationDB(pmoEvaluation, id).then((newPmoId) => {
                                    pmoEvaluation.Pmo_eval_id = newPmoId
                                    let reqFolderURL = `${id}/PMO`;
                                    
                                    this.uploadPMOFiles(id, reqFolderURL)

                                }).catch((error) => {console.log("TCL: saveOtherTabs -> error", error)})

                            // ? Update Props
                            this.props.updateProjectIntakeValues('pmoEval',pmoEvaluation, null, true)
                        }



                        // ? Save Roi Realized

                        if(!isEmpty(roiRealized) && roiRealized.SavedLocally === true) {
                            // ? Look For Roi Relized Data
                            if(roiRealized.Roi_real_id || roiRealized.roi_real_id ) {
                                updateROIRealizedDB(roiRealized, id).then((roiID) => {
                                    roiRealized.Roi_real_id = roiID
                                    // ? Look for Dynatrace
                                    if(!isEmpty (roiRealized.dynatrace))
                                        saveDynatraceDB(roiRealized.dynatrace, id,  roiID)

                                })
                            }
                            else {
                                saveROIRealizedDB(roiRealized, id).then((roiID) => {
                                    roiRealized.Roi_real_id = roiID
                                    // ? Look for Dynatrace
                                    if(!isEmpty (roiRealized.dynatrace))
                                        saveDynatraceDB(roiRealized.dynatrace, id,  roiID)

                                })

                            }
                                
                        
                            // ? Update Props
                            this.props.updateProjectIntakeValues('roiRealized',roiRealized, roiRealized.dynatrace, true)
                        


                        }


                    }   
                    catch(error) {
                        console.log("TCL: error", error)
                        this.createErrorAlert('An error ocurred while saving the data, please try again');
                        
                    }



                    
                }


          
            





                // ?--------------------------------------
                // ? Upload Files to SP 
                // ? And update add / show files State
                // ?--------------------------------------
                uploadFilesToSPWithoutSavingDB = (event)=> {

                    const {Project_Documents} = this.state;

                  


                    //! Cancel Last changes

                    if(event.target.textContent === 'Discard Changes') {

                        let orignaldocs = []

                        if(this.state.fileRemoved === false) {
                             // ?Filter Object type File
                             orignaldocs = Project_Documents.filter((file)=>{return !file.upload})
                             console.log("TCL: RequirementsDefinition -> uploadFilesToSPWithoutSavingDB -> orignaldocs", orignaldocs)
                        }
                        else {
                            // orignaldocs =  this.originalFiles;
                            orignaldocs = this.props.projectIntake.requirementsDefinition.Project_Documents
                            console.log("TCL: RequirementsDefinition -> uploadFilesToSPWithoutSavingDB -> orignaldocs", orignaldocs)
                        }


                            
                           
                        this.setState({
                            showFileManager : false,
                            Project_Documents : orignaldocs,
                            newFilesCancelled : true
                        })

                        this.filesArray = orignaldocs

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
                const path = '/sites/gsd/intake_process/IntakeProcess/ProjectIntake.aspx';

                //const path = '/intake'
                
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
            // Set Request ID Value
            // Check if ID has GSD
            // --------------------------------------
            setRequestIDValue(request_id) {
                if (!request_id || request_id === '')
                    return ''

                

                let request = (request_id).toString().indexOf('GSD') >= 0 ? request_id : `GSD${request_id.toString()}`;

                return request
            }



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
                    

                // let showFileManager = this.filesArray.length > 0 ? true : false;
                
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
            renderRequirementsDefinition(requirements) {
				//console.log('TCL: renderRequirementsDefinition -> requirements', requirements)
                const {isShowingModal, hasErrors, sendingData} = this.state;
                const {location, match} = this.props.locationData;
                const {projectID} = match.params
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
    