/* ==========================================================================
** Form Step 4 
** 30/01/2019
** Alan Medina Silva
** ========================================================================== */


// --------------------------------------
// Get Dependences
// --------------------------------------
    import React, { Component, Fragment } from 'react';
    import { Redirect } from 'react-router-dom';
    import { isEmpty } from 'lodash';
    import { withRouter } from 'react-router';
    import { FieldsGenerator, AppLoader, FormBody, FormFooter, AppButton  } from '../../../components';
    import Alert from 'react-s-alert';
    import 'react-s-alert/dist/s-alert-default.css';
    import 'react-s-alert/dist/s-alert-css-effects/slide.css';
    import PropTypes from 'prop-types';


    import { 
        saveRequirementsDB, 
        saveBusinesInformationDB, 
        saveTechnicalDB,
        savePMOEvaluationDB,
        saveROIRealizedDB, 
        saveDynatraceDB,
        saveProjectFiles,
        updateRequirementsDB,
        updateBusinesInformationDB,
        updateTechnicalDB,
        updatePMOEvaluation,
        updateROIRealizedDB
    } from '../../../actions';


    // const currentUser = {userEmail : 'alan.medina@flex.com', userName : 'alan medina'};
    const currentUser = window.getCurrentSPUser();


// --------------------------------------
// Create Component Class
// --------------------------------------
    class PMOEvaluation extends Component {

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
                    Expected_total_ROI : props.projectIntake.pmoEvaluation.Expected_total_ROI || "",
                    Expected_IRR : props.projectIntake.pmoEvaluation.Expected_IRR || "",
                    ROI_Category : props.projectIntake.pmoEvaluation.ROI_Category || {label : "Select Category", value : ""}, 
                    WorkID_PlanView_FlexPM_SN_Ticket : props.projectIntake.pmoEvaluation.WorkID_PlanView_FlexPM_SN_Ticket || "",
                    Documents : props.projectIntake.pmoEvaluation.Documents || [],
                    checkForErrors : false
                }
                this.project_Documents =  props.projectIntake.pmoEvaluation.Documents || [];
                this.onChangeSelect =  this.onChangeSelect.bind(this);
                this.onDateChange =  this.onDateChange.bind(this);
                this.preloadFiles =  this.preloadFiles.bind(this);
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
                // let formData =  this.saveFormValues();
                // // this.submitFormLocalData(true)
                // this.props.saveLocalPMOEvaluation(formData);
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
            // Create JSON Data FIelds
            // --------------------------------------
            createFormStructure() {
                const formFields = [
                    {
                        "Field_Name": "Expected total ROI",
                        "Field_State_Name": "Expected_total_ROI",
                        "value": this.state.Expected_total_ROI,
                        "group": "firstCol1",
                        "Mandatory": true,
                        "Enabled": this.checkControlEnabled(),
                        "Sequence": "64",
                        "Type": "Decimal",
                        "General_Value": "$",
                        "hasToolTip" : true,
                        "toolTipText" : "ROI Calculation in Excel Spread Sheet format",
                        "columns" : 2
                    },
                    {
                        "Field_Name": "Expected IRR",
                        "Field_State_Name": "Expected_IRR",
                        "value": this.state.Expected_IRR,
                        "group": "firstCol2",
                        "Mandatory": true,
                        "Enabled": this.checkControlEnabled(),
                        "Sequence": "65",
                        "Type": "Decimal",
                        "General_Value": "$",
                        "hasToolTip" : true,
                        "toolTipText" : "IRR Calculation in Excel Spread Sheet format ",
                        "columns" : 2
                        
                    },
                    {
                        "Field_Name": "ROI Category",
                        "Field_State_Name": "ROI_Category",
                        "value": this.state.ROI_Category,
                        "group": "firstCol3",
                        "Mandatory": true,
                        "Enabled": this.checkControlEnabled(),
                        "Sequence": "66",
                        "Type": "Combo",
                        "General_Value": [
                            // {"label" : "Select Category", "value" : ""},
                            {"label" : "Revenue - New", "value" : "Revenue - New"},
                            {"label" : "Revenue - Sustaining", "value" : "Revenue - Sustaining"},
                            {"label" : "Cost Savings", "value" : "Cost Savings"},
                            {"label" : "Cost Avoidance - Compliance", "value" : "Cost Avoidance - Compliance"},
                            {"label" : "Process Improvement / Time /FTE savings (soft savings)", "value" : "Process Improvement / Time /FTE savings (soft savings)"},
                            {"label" : "HeadCountReduction", "value" : "HeadCountReduction"},
                            {"label" : "Strategy", "value" : "Strategy"},
                            {"label" : "Management Requirement", "value" : "Management Requirement"},
                            {"label" : "IT Internal", "value" : "IT Internal"},
                            {"label" : "Customer Requirement", "value" : "Customer Requirement"},
                            {"label" : "Platform Development", "value" : "Platform Development"},
                            {"label" : "R&D (POCs, Training, Conferences, etc.)", "value" : "R&D (POCs, Training, Conferences, etc.)"}
                        ],
                        "hasToolTip" : true,
                        "toolTipText" : "Pick from drop-down ",
                        "columns" : 2,
                        "wideControl" : true
                    },
                    {
                        "Field_Name": "WorkID(PlanView,FlexPM, SN Ticket)",
                        "Field_State_Name": "WorkID_PlanView_FlexPM_SN_Ticket",
                        "value": this.state.WorkID_PlanView_FlexPM_SN_Ticket,
                        "group": "secondCol1",
                        "Mandatory": true,
                        "Enabled": this.checkControlEnabled(),
                        "Sequence": "67",
                        "Type": "Text 15",
                        "General_Value": "Data Picker",
                        "hasToolTip" : true,
                        "toolTipText" : "Project ID ",
                        "columns" : 2
                    },
                    {
                        "Field_Name": "Documents",
                        "Field_State_Name": "Documents",
                        "value": this.state.Documents,
                        "group": "secondCol2",
                        "Mandatory": false,
                        "Enabled": this.checkControlEnabled(),
                        "Sequence": "68",
                        "Type": "filesPicker",
                        "General_Value": this.state.Documents,
                        "hasToolTip" : true,
                        "toolTipText" : "Attach ROI Excel Spread Sheet document ",
                        "columns" : 1
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


            /* ==========================================================================
            ** FIle Manager Fuctions
            ** ========================================================================== */

            
                // --------------------------------------
                // Handle Add File to Dropzone
                // --------------------------------------
                handleFileAdded = (file) => {

                    this.project_Documents.push(file);
                    if( file.type.indexOf('image/') < 0 )
                    {
                        this.createPreviewImageDropzone(null, file);
                    }

                    const {name} = this.project_Documents;
					//console.log('TCL: handleFileAdded -> name', name)

                }


                // --------------------------------------
                // Handle Remove Fxile to Dropzone
                // --------------------------------------
                handleFileRemoved = (file) => {

                    let removedfileName = file.name;
                    let newFilesarray = [];
                    this.project_Documents.map((file) => {
                        // if(file.indexOf())
                        if (file.name.indexOf(removedfileName) < 0) {
                            newFilesarray.push(file)
                        }
                    })
        
                    this.project_Documents = newFilesarray;
                }



                
                // --------------------------------------
                // Preload Dropzone FIles
                // --------------------------------------
                preloadFiles = (dropzone) => {
                    
                    const {Documents} = this.state;
                    const project_docs = this.project_Documents
                    let mockFile = null;

                    if(Documents === null || Documents.length <= 0) {
                        this.project_Documents = [];
                        return;
                    }
                        
                    
                    // Remove Supported Files Icons
                        // this.removeElements( document.querySelectorAll(".filepicker-file-icon") );

                    // Iterate Props Files to Render Icons
                        // for(let projectDoc of Documents) {
                        //     let index = 0;
                        //     // Add The file Data to Dropzone Object
                        //         dropzone.options.addedfile = projectDoc;
                        //         dropzone.emit("addedfile", projectDoc);
                        //         dropzone.emit("thumbnail", projectDoc, projectDoc.dataURL);
                        //         dropzone.emit("complete", projectDoc);
                        //     // Set Image For Docs
                        //         if( projectDoc.type.indexOf('image/') < 0 )
                        //         {
                        //             this.createPreviewImageDropzone(index, projectDoc);
                        //         }
                        //         else
                        //         {
                        //             console.log("TCL: preloadFiles -> index", index)
                        //             let imageContainer = document.getElementsByClassName('dz-image')[index];
                        //             console.log("TCL: preloadFiles -> imageContainer", imageContainer)
                                    
                        //             let image = imageContainer.childNodes[0];
                        //                 image.style.width = "120px";
                        //                 image.style.height = "120px";
                        //         }
                                
                        //     index++;
                        // }



                        let mockFiles = project_docs.map((mockDoc, index) => {

                            mockFile = typeof mockDoc === 'string' ?  this.createMockFile(mockDoc) : mockDoc

                            console.log("TCL: preloadFiles -> mockFile", mockFile)
                        // Check if is the List from the DB or the New One
                            if (mockDoc.urlDocument && mockDoc.TypeDocument)
                                mockDoc = this.createMockFile(mockDoc.urlDocument, mockDoc.TypeDocument);
                            else if(!mockDoc.name)
                                mockDoc = this.createMockFile(mockDoc)
                            else
                                mockFile = mockDoc; 

                        // let mockFile = this.props.fieldValues.ProjectImage;
                        dropzone.options.addedfile = mockFile;
                        dropzone.emit("addedfile", mockFile);
                        dropzone.emit("thumbnail", mockFile, mockFile.dataURL);
                        dropzone.emit("complete", mockFile);

                        //console.log('mockFile', mockFile);
                        dropzone.files.push(mockFile);


                        // Set width and height of Thumbnail
                        let type = mockDoc.TypeDocument || mockFile.type
                        // Set Preview of of files that are not images
                        if( type.indexOf('image/') < 0 )
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
                                    image.src = mockDoc.urlDocument || mockFile.name ;
                        }
                    

                        // Set File Name
                        let nameContainer = document.getElementsByClassName('dz-filename')[index];
                        let docNameText =  this.getDocNameNoExtension(mockFile.urlDocument || mockFile.name);
                            nameContainer.innerHTML = docNameText;


                     return mockFile
                        
                    });

                    console.log("TCL: preloadFiles -> mockFiles", mockFiles)
                    this.project_Documents = mockFiles;
                    this.setState({Documents : mockFiles})
                }


                // --------------------------------------
                // Remove Spported File Type Icons
                // --------------------------------------
                removeElements = (elms) => {
                    [...elms].forEach(el => el.remove());
                }

                // --------------------------------------
                // Get Doc Name no Extension
                // --------------------------------------    
                getDocNameNoExtension(docName) {
                    let fileName;
                    let documentArray = docName !== '' ? docName.split('.') : [];

                    if(documentArray.length <= 0)
                        return ''

                    if(documentArray.length > 2)
                    {
                        let fileNameArray = documentArray[2].split('/');
                            fileName = fileNameArray[fileNameArray.length - 1];
                    } 
                    else
                        fileName = docName;
            
                    return fileName;

                }


                // --------------------------------------
                // Create Mock Document
                // --------------------------------------
                createMockFile(docName, docType) {
                    let mockFile;
                    let documentArray = docName.split('.');
                    let fileExtension = this.getFileExtension(docName);
                    let fileNameArray = documentArray[0].split('/');
                    let fileName = fileNameArray[fileNameArray.length - 1]
                        
                    mockFile = new File([fileName], docName, { type: fileExtension });
                    return mockFile;
                    
                }



                // --------------------------------------
                // Create Prev Image 
                // --------------------------------------        
                createPreviewImageDropzone(index, file) {
                    console.log("TCL: createPreviewImageDropzone -> index", index)
                    let imageContainer = null
                    // if(index !== null)
                    //     imageContainer = document.getElementsByClassName('dz-image')[index];
                    // else
                    //     imageContainer = document.getElementsByClassName('dz-image')[this.project_Documents.length - 1];

                    // if(index !== null)
                    //     imageContainer = document.getElementsByClassName('dz-image')[index];
                    // else if(this.project_Documents.length > 0)
                    //     imageContainer = document.getElementsByClassName('dz-image')[this.project_Documents.length - 1];
                    // else
                    //     imageContainer = document.getElementsByClassName('dz-image')

                    if(index !== null)
                        imageContainer = document.getElementsByClassName('dz-image')[index];
                    else
                        imageContainer = document.getElementsByClassName('dz-image')[this.project_Documents.length - 1]
                        
                    console.log("TCL: createPreviewImageDropzone -> imageContainer", imageContainer)

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
                    //console.log('iconSrc', iconSrc);

                    return iconSrc;
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

                /**  --------------------------------------
                // Call SP Function to Upload File
                // @param {folderName}  GSD126
                // @param {folderToUpload} RequirementsDefinition
                // on Each Child of filesArary
                // --------------------------------------*/
                uploadFiles (foldertoUpload) {

                    let folderName = foldertoUpload.indexOf('GSD')>= 0 ? foldertoUpload : `GSD${foldertoUpload}`
                    
                    const {project_Documents} = this;

                    if(project_Documents.length <= 0) 
                        return;
                    
                 

                    const folderURL = `intakeFiles/${folderName}`;
                    let filesToUploadDBArray = [];
                    if(project_Documents.length <= 0)
                        return;
                    
                    // Iterate Files
                    for(let file of project_Documents) {
                        
                        //console.log('TCL: uploadFiles -> file', file)
                        // let fileURL = `sites/gsd/${folderURL}/${file.name}`;
                        let fileURL = `sites/gsd/intake_process/${folderURL}/${file.name}`;
                        window.uploadFilesToFolder(folderURL,file.name, file, project_Documents.length);
                        
                        filesToUploadDBArray.push(fileURL);
                    }


                    // this.saveFilesonDB(foldertoUpload, filesToUploadDBArray)
                }


                // --------------------------------------
                // Save Files on DB
                // --------------------------------------
                saveFilesonDB(folderName,filesToUploadDBArray ) {
                
                    console.log("TCL: saveFilesonDB -> folderName", folderName)                    
                    console.log("TCL: saveFilesonDB -> filesToUploadDBArray", filesToUploadDBArray)
				

                    // const {projectID} = this.props.match.params;
                    const requestID =  this.props.projectIntake.requirementsDefinition.Project_id ||  this.props.projectIntake.requirementsDefinition.Request_ID
                    // const requestID = projectID.substr(projectID.indexOf('GSD')+3,projectID.length);
                    const filesString = filesToUploadDBArray.join(',');
                    // const currentUser = window.getCurrentSPUser();

                    // Loomk For Files on SP FOlder
                    saveProjectFiles(requestID, filesString, currentUser.userEmail).then((data)=>{
                        console.log('TCL: saveFilesonDB -> data', data);
                        

                    })
                    .catch((error)=> {
						console.log('TCL: saveFilesonDB -> error', error)
                        
                    })
                }




                // --------------------------------------
                // Save Form Values
                // --------------------------------------
                saveFormValues(projectID, newProjectID) {
                    // ! const currentUser = window.getCurrentSPUser();

                    // const projId = this.props.projectID || this.props.requirementsDefinition.newProjectID;
                    // const projId =  'GSD127';
                    // const requestID = projId.substr(projId.indexOf('GSD')+3,projId.length);

                    const projId = this.props.projectIntake.requirementsDefinition.Request_ID || projectID;
                    let requestID = null
                    
                    if(projId === undefined || projId === null )
                        requestID = null;
                    else if(projectID === null && newProjectID === null) 
                        requestID = this.props.projectIntake.requirementsDefinition.Request_ID || null
                    else
                        requestID = projId.indexOf('GSD') >= 0 ? projId.substr(projId.indexOf('GSD')+3,projId.length) : projId;    
                    
                    //console.log('TCL: saveFormValues -> this.project_Documents', this.project_Documents)

                    const formData = {
                        Project_ID : requestID,
                        pmo_eval_id : this.props.projectIntake.pmoEvaluation.newPMOEvaluationID || null,
                        Expected_total_ROI : this.state.Expected_total_ROI ,
                        Expected_IRR : this.state.Expected_IRR ,
                        ROI_Category : this.state.ROI_Category ,
                        WorkID_PlanView_FlexPM_SN_Ticket : this.state.WorkID_PlanView_FlexPM_SN_Ticket ,
                        Documents : this.project_Documents || [],
                        Created_by : currentUser.userEmail,
                        Last_modifed_by : currentUser.userEmail
                    } 

                    //console.log('TCL: saveFormValues -> formData', formData)
                    return formData;
					
                }


            
                // --------------------------------------
                // Submit Form
                // --------------------------------------
                submitFormLocalData = (redirect) => {
                    

                    // this.props.saveLocalPMOEvaluation(formData);
                    
                    if(redirect) {

                        const formData =  this.saveFormValues();

                        this.props.updateProjectIntakeValues('pmoEval',formData)



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
                // submitFormLocalDataReturn = (event) => {
                //     this.redirectUserPrev();
                // }

                

                // --------------------------------------
                // Save Values When Returning to Prev Step
                // --------------------------------------   
                submitFormLocalDataReturn = (event) => {
                    
                    // const formData = this.saveFormValues(null,null);

                    // this.props.saveLocalPMOEvaluation(formData);
                
                    //console.log('TCL: submitFormLocalData -> formData', formData)

                    this.redirectUserPrev();
                }


                // --------------------------------------
                // New PMO
                // --------------------------------------
                saveNewPMOEvaluation = (id) => {
                    const formData = this.saveFormValues(null);
                    
                  
                    //? Save on DB
                    savePMOEvaluationDB(formData, id).then((newPMOEvaluationID)=>{
                        this.createSuccessAlert('Data Saved ');
                        // Redirect User

                        // Check If Action was Success
                        
                        const projId = this.props.projectIntake.requirementsDefinition.Project_id || this.props.projectIntake.requirementsDefinition.Request_ID ;
                        let folderNameID = projId.indexOf('GSD') >= 0 ?  projId : `GSD${projId}`
                        const pmoFolderURL = `${folderNameID}/PMO`;

                        //? Upload Files to Sharepoint
                        this.uploadFiles(pmoFolderURL)

                        // ? Update Props
                        
                        formData.Pmo_eval_id = newPMOEvaluationID
                      
                        this.props.updateProjectIntakeValues('pmoEval',formData, null, true)
						
                        this.saveOtherTabs(projId);
                        
                        this.setState({ Request_ID : newPMOEvaluationID , sendingData : false});

                        // setTimeout(()=>{this.redirectUser();},700);
                        
                    })
                    .catch((error)=> {
                        console.log("TCL: saveNewPMOEvaluation -> error", error)
                        this.createErrorAlert('There was a problem saving the data, please try again ');
						
                        
                    })
                    
                }


                // --------------------------------------
                // Update PMO Evaluattion
                // --------------------------------------
                updateCurrentPMOEvaluation = (currentPMOID)=> {
                    const projID =this.props.requirementsDefinition.newProjectID;
                    const formData = this.saveFormValues(currentPMOID);
                    
				    //console.log('TCL: updateCurrentPMOEvaluation -> currentPMOID', currentPMOID)
                    updatePMOEvaluation(formData).then(()=>{
                        this.createSuccessAlert('Data Saved ');
                        // Redirect User
                        // Check If Action was Success
                        
                        const projId = this.props.projectID || this.props.requirementsDefinition.newProjectID;
                        const pmoFolderURL = `${projId}/PMO`;
                        const newPMOEvaluationID = this.props.pmoEvaluation.newPMOEvaluationID

                        // Upload Files to Sharepoint
                        this.project_Documents.length > 0 && this.uploadFiles(pmoFolderURL)
                        
                        
                        
                        
                        
                        // this.setState({ Request_ID : newPMOEvaluationID , sendingData : false}, this.redirectUser())

                        this.setState({ Request_ID : newPMOEvaluationID , sendingData : false})
                        
                    })
                    .catch((error)=> {
                        this.createErrorAlert('There was a problem saving the data, please try again ');
                        
                        console.log("TCL: updateCurrentPMOEvaluation -> error", error)
                        
                    })
                    
                }


                //! --------------------------------------
                //! Submit Form to DB
                //! --------------------------------------
                submitFormDB = () => {
                    
                    const {isPMO} = this.props;

                    // Validate Empty Fields
                    if(this.validateFormInputs() === false) {
                        this.createErrorAlertTop('Please Fill all the Required Fields');
                        this.setState({checkForErrors: true})
                        return;
                    }
                    

                    this.setState({sendingData : true})
                    //? Check that Requirements Definition is Saved
                    //? If is not saved, Then Save Requ
                    //? Get Project ID
                    //? Save Business Info
                    //? Save Technical
                    // ? Save PMO

                    let reqSaved = false
                    if (this.props.projectIntake.requirementsDefinition.SavedOnDB === false || !this.props.projectIntake.requirementsDefinition.Project_id)
                        reqSaved = false;

                    else if (this.props.projectIntake.requirementsDefinition.Project_id)
                        reqSaved = true
                    else
                        reqSaved = true


                    if(isPMO === true && !reqSaved)  {

                        this.saveOtherTabs(null, true);
                        
                        return;
                    }

                    else if(isPMO === false)
                        return;

                   

                    const { Project_id, Request_ID } = this.props.projectIntake.requirementsDefinition;
                

                    const pmoEvalSaved = this.props.projectIntake.pmoEvaluation.Pmo_eval_id
					
                    


                    if(pmoEvalSaved) {
                        // Update Project
                        // Get Current Project ID
                        // const newPMOEvaluationID = this.props.projectIntake.pmoEvaluation.Pmo_eval_id
						
                        this.updateCurrentPMOEvaluation(pmoEvalSaved);
                    }
                    else {
                        // Save New Project
                        // this.saveNewProjectDB();
                        this.saveNewPMOEvaluation(Project_id);
                        
                    }     
                    
                    this.setState({checkForErrors: false})

                  
                        

                    
                }


            // !--------------------------------------
            // ! Save Other Tabs
            // !--------------------------------------
            saveOtherTabs = async (projectID, saveEval =  false) => {
                // this.props.businessInformation

                console.log("TCL: saveOtherTabs -> this.props", this.props)
                

                
                const {requirementsDefinition, businessInformation, technicalEvaluation, pmoEvaluation, roiRealized} = this.props.projectIntake;
                


                // ? If theres on Project ID, save first Req, then the others
                if(projectID === null || projectID === undefined) {
                    // ? Save Business Information
                    if( !isEmpty(requirementsDefinition) ) {
                        
                        // ? Save New Project
                        saveRequirementsDB(requirementsDefinition).then((newProjectID)=>{
                            console.log("TCL: TechnicalEvaluation -> saveOtherTabs -> newProjectID", newProjectID)


                            // ? Create Folder Structure and Upload Files
                            const projectID = newProjectID || requirementsDefinition.Request_ID;
                            // const id = projectID.indexOf('GSD') >= 0  ? projectID.substr(projectID.indexOf('GSD')+3,projectID.length) : projectID;
    
                            // Remove the GSD from the ID if theres any
                            let id = projectID.indexOf('GSD') >= 0  ? projectID.substr(projectID.indexOf('GSD')+3,projectID.length) : projectID;
                            let reqFolderURL = `${projectID}/RequirementsDefinition`;
                            let pmoFolderURL = `${projectID}/PMO`;
    
                            requirementsDefinition.Project_id = newProjectID;

                                
                            this.props.updateProjectIntakeValues('requirements',requirementsDefinition, null, true)

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
                                    console.log('PMO Creataed')

                                      
                                      const projId = this.props.projectIntake.requirementsDefinition.Project_id || this.props.projectIntake.requirementsDefinition.Request_ID
                                      const pmoFolderURL = `${projId}/PMO`;
                                      // Upload Files to Sharepoint
                                      this.uploadFiles(pmoFolderURL)
                                    }, 
                                        () => {
                                            this.createErrorAlert('There was a problem creating the PMO Folder, please try again ');
                                            //console.log('fail react')
                                    });

                            // ! Save Other Tabs


                                // ? IF PMO Evaluation is not created, save it as well

                                if(saveEval === true) {
                                    // ? Save PMO Evaluation

                                     
                                        // if(!isEmpty(this.props.technicalEvaluation)) {
                                            const formData = this.saveFormValues(id);
                                            // this.props.saveLocalTechnical(formData);
                                            // this.props.saveTechnicalDB(this.props.technicalEvaluation, id)

                                            savePMOEvaluationDB(formData, id).then((newPmoEvalID) => {
                                                console.log("TCL: saveOtherTabs -> newPmoEvalID", newPmoEvalID)
                                                pmoEvaluation.Pmo_eval_id = newPmoEvalID
                                            }).catch((error) => {console.log("TCL: saveOtherTabs -> error", error)})
        
                                        // ? Update Props
                                            this.props.updateProjectIntakeValues('pmoEval',pmoEvaluation, null, true)
                                        // }


                                    
                    
                                }

                                            
                                // ? Save Business Information
                                if( !isEmpty(businessInformation) && businessInformation.SavedLocally === true ) {

                                    console.log("TCL: saveOtherTabs -> businessInformation", businessInformation)
                                    
                                    
                                    if(businessInformation.Buss_info_id)
                                        updateBusinesInformationDB(businessInformation, id).then(()=> {
                                            // ? Update Props
                                            this.props.updateProjectIntakeValues('business',businessInformation, null, true)
                                        })
                                    else {
                                        saveBusinesInformationDB(businessInformation, id).then((newBusinesId) => {
                                            console.log("TCL: saveOtherTabs -> newBusinesId", newBusinesId)
                                            businessInformation.Buss_info_id = newBusinesId

                                            // ? Update Props
                                            this.props.updateProjectIntakeValues('business',businessInformation, null, true)
                                        }).catch((error) => {console.log("TCL: saveOtherTabs -> error", error)})
                                        
                                    }  
    
                                   
                                        
                            
                                    
                                }

                                // ? Save Tehnical Evaluation
                            if(!isEmpty(technicalEvaluation) && technicalEvaluation.SavedLocally === true) {
                                if(technicalEvaluation.Tech_eval_id) {
                                    updateTechnicalDB(technicalEvaluation, id).then(()=> {
                                        // ? Update Props
                                        this.props.updateProjectIntakeValues('technical',technicalEvaluation, null, true)
                                    })
                                }
                                else
                                    saveTechnicalDB(technicalEvaluation, id).then((newTechId) => {
                                        console.log("TCL: saveOtherTabs -> newTechId", newTechId)
                                        technicalEvaluation.Tech_eval_id = newTechId

                                        // ? Update Props
                                        this.props.updateProjectIntakeValues('technical',technicalEvaluation, null, true)

                                    }).catch((error) => {console.log("TCL: saveOtherTabs -> error", error)})

                              
                            }
                            

                                


                                // ? Save Roi Realized
                                if(!isEmpty(roiRealized) && roiRealized.SavedLocally === true) {
                                    // ? Look For Roi Relized Data
                                    if(roiRealized.Roi_real_id) {
                                        updateROIRealizedDB(roiRealized, id).then((roiID) => {
                                            console.log("TCL: roiID", roiID)
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
                                            console.log("TCL: roiID", roiID)
                                            roiRealized.Roi_real_id = roiID
                                            // ? Look for Dynatrace
                                            if(!isEmpty (roiRealized.dynatrace))
                                                saveDynatraceDB(roiRealized.dynatrace, id,  roiID)

                                             // ? Update Props
                                            this.props.updateProjectIntakeValues('roiRealized',roiRealized, roiRealized.dynatrace, true)
        
                                        })
        
                                   
                                   
                                   
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
                    try {

                        let id = projectID.indexOf('GSD') >= 0  ? projectID.substr(projectID.indexOf('GSD')+3,projectID.length) : projectID;
                            
                        // ? Save Req Definition
                        if( !isEmpty(requirementsDefinition) && requirementsDefinition.SavedLocally === true) {
                            

                            // this.validateEmptyRequirements();

                            if(requirementsDefinition.Project_id || requirementsDefinition.project_id) {
                                updateRequirementsDB(requirementsDefinition, id).then(()=> {
                                     // ? Update Props
                                    this.props.updateProjectIntakeValues('requirements',requirementsDefinition, null, true)
                                });
                                let folderNameID = requirementsDefinition.Request_ID.indexOf('GSD') >= 0 ?  requirementsDefinition.Request_ID : `GSD${requirementsDefinition.Request_ID}`
                                let reqFolderURL = `${folderNameID}/RequirementsDefinition`;
                                this.uploadReqFiles(requirementsDefinition.Request_ID, reqFolderURL);
                            }
                                
                            else
                                saveRequirementsDB(requirementsDefinition).then((newRequirementsID) => {
                                    requirementsDefinition.Project_id = newRequirementsID;
                                    let reqFolderURL = `${newRequirementsID}/RequirementsDefinition`;
                                    this.uploadReqFiles(requirementsDefinition.newProjectID, reqFolderURL);
                                     // ? Update Props
                                    this.props.updateProjectIntakeValues('requirements',requirementsDefinition, null, true)
                                })



                            

                        }


                        // ? Save Business Information
                        if( !isEmpty(businessInformation) && businessInformation.SavedLocally === true) {

                            console.log("TCL: saveOtherTabs -> businessInformation", businessInformation)
                            
                             // ?Get Workstage From Requirements Definiion
                             businessInformation.Workstage = businessInformation.Workstage || requirementsDefinition.Workstage;
                             console.log("TCL: businessInformation", businessInformation)
                            
                            if(businessInformation.Buss_info_id ||  businessInformation.buss_info_id )
                                updateBusinesInformationDB(businessInformation, id).then((newBusinesId) => {
                                    console.log("TCL: saveOtherTabs -> newBusinesId", newBusinesId)

                                     // ? Update Props
                                    this.props.updateProjectIntakeValues('business',businessInformation, null, true)
                                    
                                }).catch((error) => {console.log("TCL: saveOtherTabs -> error", error)})
                            else {
                                saveBusinesInformationDB(businessInformation, id).then((newBusinesId) => {
                                    console.log("TCL: saveOtherTabs -> newBusinesId", newBusinesId)
                                    businessInformation.Buss_info_id = newBusinesId

                                     // ? Update Props
                                    this.props.updateProjectIntakeValues('business',businessInformation, null, true)

                                }).catch((error) => {console.log("TCL: saveOtherTabs -> error", error)})
                                
                            }  

                           
                                
                    
                            
                        }

                        // ? Save Tehnical Evaluation
                        if(!isEmpty(technicalEvaluation) && technicalEvaluation.SavedLocally === true) {
                            if(technicalEvaluation.Tech_eval_id || technicalEvaluation.tech_eval_id) {
                                updateTechnicalDB(technicalEvaluation, id).then(()=>{
                                    // ? Update Props
                                    this.props.updateProjectIntakeValues('technical',technicalEvaluation, null, true)
                                })
                            }
                            else
                                saveTechnicalDB(technicalEvaluation, id).then((newTechId) => {
                                    console.log("TCL: saveOtherTabs -> newTechId", newTechId)
                                    technicalEvaluation.Tech_eval_id = newTechId

                                    // ? Update Props
                                    this.props.updateProjectIntakeValues('technical',technicalEvaluation, null, true)

                                }).catch((error) => {console.log("TCL: saveOtherTabs -> error", error)})

                            
                        }
                        

                    


                        // ? Save Roi Realized

                        if(!isEmpty(roiRealized) && roiRealized.SavedLocally === true) {
                            // ? Look For Roi Relized Data
                            if(roiRealized.Roi_real_id || roiRealized.roi_real_id) {
                                updateROIRealizedDB(roiRealized, id).then((roiID) => {
                                    console.log("TCL: roiID", roiID)
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
                                    console.log("TCL: roiID", roiID)
                                    roiRealized.Roi_real_id = roiID
                                    // ? Look for Dynatrace
                                    if(!isEmpty (roiRealized.dynatrace))
                                        saveDynatraceDB(roiRealized.dynatrace, id,  roiID)

                                     // ? Update Props
                                    this.props.updateProjectIntakeValues('roiRealized',roiRealized, roiRealized.dynatrace, true)

                                })

                        
                           
                        


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

                this.setState({sendingData : false})
                
                // this.redirectUser();

                // this.resetState();
                
            }


            // --------------------------------------
            // Redirect User
            // --------------------------------------
            redirectUser() {
                const {history} = this.props.locationData;
                const path = '/sites/gsd/intake_process/intake_process_v3/ProjectIntake.aspx';

                //const path = '/intake';
                
                history.push(`${path}/add-project/roi-realized`);
            }

            // --------------------------------------
            // Redirect User to Prev Step
            // --------------------------------------
            
            redirectUserPrev() {
                const {history, location} = this.props.locationData;
                const path = '/sites/gsd/intake_process/intake_process_v3/ProjectIntake.aspx';

                //const path = '/intake';

                let pathArray = location.pathname.split('/');
                let projectIndex = pathArray[pathArray.length - 2];
				console.log("TCL: BusinessInformation -> redirectUserPrev -> projectIndex", projectIndex)
                
                history.push(`${path}/add-project/technical-evaluation`);
                
            }


            /* ==========================================================================
            ** Manage Files Requirements
            ** ========================================================================== */

                /**  --------------------------------------
                // Call SP Function to Upload File
                // @param {folderName}  GSD126
                // @param {folderToUpload} RequirementsDefinition
                // on Each Child of filesArary
                // --------------------------------------*/
                uploadReqFiles (folderName, foldertoUpload) {
                    
                    const filesArray = this.props.projectIntake.requirementsDefinition.Project_Documents;
                    

                    const folderURL = `intakeFiles/${foldertoUpload}`;
                    let filesToUploadDBArray = [];
                    if(filesArray.length <= 0)
                        return;
                    
                    // Iterate Files
                    for(let file of filesArray) {
                        let saveFile = null
                        let fileURL = '';
                        
                       


                        if(!file.name) 
                            saveFile =  this.createMockFile(file)
                        else
                            saveFile = file;
                    
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


                
                // // --------------------------------------
                // // Save Files on DB
                // // --------------------------------------
                // saveFilesonDB(projectID,filesToUploadDBArray ) {
				// 	//console.log('TCL: saveFilesonDB -> projectID', projectID)
                //     //console.log('TCL: saveFilesonDB -> filesToUploadDBArray', filesToUploadDBArray)
                //     const id = this.props.requirementsDefinition.newProjectID
                //     const requestID = id.substr(id.indexOf('GSD')+3,id.length);
                //     const filesString = filesToUploadDBArray.join(',');
                //     const currentUser = window.getCurrentSPUser();

                //     // Loomk For Files on SP FOlder
                //     this.props.saveProjectFiles(requestID, filesString, currentUser.userEmail).then((data)=>{
                //         //console.log('TCL: saveFilesonDB -> data', data);
                        

                //     })
                //     .catch((error)=> {
				// 		console.log('TCL: saveFilesonDB -> error', error)
                        
                //     })
                // }


                // // --------------------------------------
                // // Create Mock Document
                // // --------------------------------------
                // createMockFile(docName) {
                //     let mockFile;
                //     let documentArray = docName.split('.');
                //     let fileExtension = this.getFileExtension(docName);
                //     let fileNameArray = documentArray[0].split('/');
                //     let fileName = fileNameArray[fileNameArray.length - 1]
                        
                //     mockFile = new File([fileName], docName, { type: fileExtension });
                //     return mockFile;
                // }

                // // --------------------------------------
                // // Get Doc Name no Extension
                // // --------------------------------------    
                // getDocNameNoExtension(docName) {
                //     let fileName;
                //     let documentArray = docName.split('.');
                //     if(documentArray.length > 2)
                //     {
                //         let fileNameArray = documentArray[2].split('/');
                //             fileName = fileNameArray[fileNameArray.length - 1];
                //     } 
                //     else
                //     {
                //         let fileNameArray = documentArray[0].split('/');
                //             fileName = fileNameArray[fileNameArray.length - 1];
                //     }
                    
                //     return fileName;

                // }
                // // --------------------------------------    
                // // Get Doc Name no Extension
                // // --------------------------------------    
                // getFileExtension(docName) {
                //     let fileExtension;
                //     let documentArray = docName.split('.');
                //     if(documentArray.length > 2)
                //     {
                //         let fileExtensionArray = documentArray[2].split('/');
                //             fileExtension = fileExtensionArray[fileExtensionArray.length - 1];
                //     } 
                //     else
                //         fileExtension = documentArray[1];
            
                //     return fileExtension;

                // }
            

           

            
            


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
                        preloadFiles = {this.preloadFiles}
                        onFileAdded = {this.handleFileAdded}
                        onFileRemoved = {this.handleFileRemoved}
                        checkErrorClass = {this.checkErrorClass}
                        showFileManager = {true}
                        
                    />
                )
            }

            // --------------------------------------
            // Render Form Footer
            // --------------------------------------
            renderFormFooter() {
                return (
                    <FormFooter> 
                        <AppButton buttonText = {'Return'} buttonClass = {'cancelButton'} onClick = {this.submitFormLocalDataReturn} ></AppButton>
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
            // --------------------------------------
            renderPMOEvaluation() {
                const {sendingData} = this.state;
                const {isPMO} = this.props;
                if (isPMO === false ) 
                return (<Redirect to={'/'}/>)
                const formContainer =  <form>
                                        <div className="int-container">
                                            <div className="int-fieldsSection">
                                                <div className="int-row">
                                                    <div className="int-column ">
                                                        {this.renderFormFields("firstCol1", true)}
                                                    </div>

                                                    <div className="int-column ">
                                                        {this.renderFormFields("firstCol2", true)}
                                                    </div>


                                                </div>

                                                <div className="int-row">
                                                    
                                                    <div className="int-column ">
                                                        {this.renderFormFields("firstCol3", true)}
                                                    </div>

                                                    <div className="int-column">
                                                        {this.renderFormFields("secondCol1", true)}
                                                    </div>
                                                    
                                                    
                                                </div>

                                                <div className="int-row">
                                                    <div className="int-column">
                                                        {this.renderFormFields("secondCol2", true)}
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
                        {this.renderFormFooter()}
                    </Fragment>
                )
            }


            // --------------------------------------
            // Render Component
            // --------------------------------------
            render() {
                
                return this.renderPMOEvaluation();
            }
    }


// -------------------------------------- 
// Define PropTypes 
// -------------------------------------- 
    PMOEvaluation.propTypes = {
        projectIntake : PropTypes.object,
        isPMO : PropTypes.bool,
        locationData : PropTypes.object,
        updateProjectIntakeValues : PropTypes.func
    };





// --------------------------------------
// Export Component
// --------------------------------------
    export default  (PMOEvaluation);
   