/* ==========================================================================
** Form Step 4 
** 30/01/2019
** Alan Medina Silva
** ========================================================================== */


// --------------------------------------
// Get Dependences
// --------------------------------------
    import React, { Component, Fragment } from 'react';
    import { withRouter } from 'react-router';
    import {Redirect} from 'react-router-dom';
    import { isEqual , isEmpty} from 'lodash'
    import { FieldsGenerator, AppLoader, FormBody, FormFooter, AppButton  } from '../../../components';
    import Alert from 'react-s-alert';
    import 'react-s-alert/dist/s-alert-default.css';
    import 'react-s-alert/dist/s-alert-css-effects/slide.css';
    import PropTypes from 'prop-types';


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
                    sendingData : false,
                    pmo_eval_id : props.projectIntake.pmoEvaluation.pmo_eval_id || null,
                    Expected_total_ROI : props.projectIntake.pmoEvaluation.Expected_total_ROI || "",
                    Expected_IRR : props.projectIntake.pmoEvaluation.Expected_IRR || "",
                    ROI_Category : props.projectIntake.pmoEvaluation.ROI_Category || {label : "Select Category", value : null}, 
                    WorkID_PlanView_FlexPM_SN_Ticket : props.projectIntake.pmoEvaluation.WorkID_PlanView_FlexPM_SN_Ticket || "",
                    // Project_Documents : props.requirementsDefinition.Project_Documents ||  [],  
                    Documents : props.projectIntake.pmoEvaluation.Documents || [],
                    spFiles : [],
                    showFileManager : false,
                    checkForErrors : false,
                    dataSavedOnDB : false
                }
                this.project_Documents =  props.projectIntake.pmoEvaluation.Documents || [];
                this.originalFiles = [];
                this.onChangeSelect =  this.onChangeSelect.bind(this);
                this.onDateChange =  this.onDateChange.bind(this);
                this.preloadFiles =  this.preloadFiles.bind(this);
                
            }


            // --------------------------------------
            // Create Form Fields to be rendered
            // --------------------------------------
            componentWillMount() {
                this.formFields =  this.createFormStructure();
            }



            componentDidMount() {
                this.setState({
                    ROI_Category : this.createSelectOption(this.props.projectIntake.pmoEvaluation.ROI_Category) || this.createSelectOption("") ,
                    isLoaded : true
                })
            }



            // --------------------------------------
            // Save Form Values before the component
            // unloads by the menu navigation
            // --------------------------------------
            componentWillUnmount() {
                // let data = this.saveFormValues();
                // this.props.saveLocalPMOEvaluation(data);
            }


            // --------------------------------------
            // Set Initial Values
            // --------------------------------------
            // componentDidMount() {
            //     if(this.props.match.params.projectID) {
            //         const id = this.props.match.params.projectID
            //         const requestID = id.substr(id.indexOf('D')+1,id.length);


            //         if(this.props.updateFromState !== true ) {
            //             this.props.fetchProjectPMOEvaluation(requestID)
            //             this.props.fetchProjectFiles(id, 'PMO')
            //             // this.updateSelectsOnComponentLoad();
            //         }
            //         else {

            //             // let docs = 

            //             let docs = [];
            //             if( this.props.pmoEvaluation.Documents )
            //                 docs = this.props.pmoEvaluation.Documents[0] === "" ? [] : this.props.pmoEvaluation.Documents
            //             else if(this.props.loadedPMOEvaluation.pmoEvaluation.Documents) 
            //                     docs = this.props.loadedPMOEvaluation.pmoEvaluation.Documents[0]  === "" ? [] :  this.props.loadedPMOEvaluation.pmoEvaluation.Documents
            //             else
            //                 docs = []


            //             this.setState({
            //                 Expected_total_ROI : this.props.pmoEvaluation.Expected_total_ROI || "",
            //                 pmo_eval_id : this.props.pmoEvaluation.pmo_eval_id,
            //                 Expected_IRR : this.props.pmoEvaluation.Expected_IRR || "",
            //                 ROI_Category : this.createSelectOption(this.props.pmoEvaluation.ROI_Category) || this.createSelectOption("") ,
            //                 WorkID_PlanView_FlexPM_SN_Ticket : this.props.pmoEvaluation.WorkID_PlanView_FlexPM_SN_Ticket || "",
            //                 Documents : docs ,
            //                 // Documents : this.props.pmoEvaluation.Documents[0] === "" ? [] : this.props.loadedPMOEvaluation.pmoEvaluation.Documents,
            //                 // Documents : this.props.pmoEvaluation.Documents || this.props.loadedPMOEvaluation.pmoEvaluation.Documents || [],
            //                 spFiles : this.props.pmoEvalFiles || [],
            //                 sendingData : false,
            //                 dataSavedOnDB : false
                            
            //             })

            //             this.Project_Documents = docs
            //             this.updateSelectsOnComponentLoad(this.props.pmoEvaluation.ROI_Category);
            //         }

			// 		//console.log('TCL: componentDidMount -> this.props', this.props)
            //     }
            // }
            // ROI_Category
            // ROI_Category


            // --------------------------------------
            // Update Props & State
            // --------------------------------------
            // componentWillReceiveProps = (nextProps) => { 
            //     //console.log('TCL: componentWillReceiveProps -> nextProps', nextProps)


            //     // this.props
            //     console.log("TCL: componentWillReceiveProps -> this.props", this.props)
            //     if(nextProps.loadedPMOEvaluation.pmoEvaluation) {
            //         if( !isEqual(this.props.pmoEvaluation, nextProps.loadedPMOEvaluation.pmoEvaluation)) {
            //             console.log("TCL: componentWillReceiveProps -> this.props.updateFromDB", this.props.updateFromDB)
            //             if(this.props.updateFromDB === true || this.props.updateFromDB === undefined) {
            //                 this.setState({
            //                     Expected_total_ROI : nextProps.pmoEvaluation.pmoEvaluation.Expected_total_ROI || "",
            //                     pmo_eval_id : nextProps.pmoEvaluation.pmoEvaluation.pmo_eval_id,
            //                     Expected_IRR : nextProps.pmoEvaluation.pmoEvaluation.Expected_IRR || "",
            //                     ROI_Category : this.createSelectOption(nextProps.pmoEvaluation.pmoEvaluation.ROI_Category) || this.createSelectOption("") ,
            //                     WorkID_PlanView_FlexPM_SN_Ticket : nextProps.pmoEvaluation.pmoEvaluation.WorkID || "",
            //                     Documents : nextProps.pmoEvaluation.pmoEvaluation.Documents[0] === "" ? [] : nextProps.loadedPMOEvaluation.pmoEvaluation.Documents,
            //                     spFiles : this.props.pmoEvalFiles || [],
            //                     sendingData : false
            //                 })

            //                 this.project_Documents = nextProps.pmoEvaluation.Documents
            //                 this.originalFiles = nextProps.pmoEvaluation.pmoEvaluation.Documents[0] === "" ? [] : nextProps.loadedPMOEvaluation.pmoEvaluation.Documents;
            //                 this.updateSelectsOnComponentLoad(nextProps.pmoEvaluation.pmoEvaluation.ROI_Category);
            //             }
            //             else {

            //                 let docs = [];
            //                     // if( this.props.pmoEvaluation.Documents )
            //                     //     docs = this.props.pmoEvaluation.Documents[0] === "" ? [] : this.props.pmoEvaluation.Documents
            //                     // else 
            //                     if(nextProps.loadedPMOEvaluation.Documents) 
            //                         docs = nextProps.loadedPMOEvaluation.Documents[0]  === "" ? [] :  nextProps.loadedPMOEvaluation.Documents
            //                     else
            //                         docs = []


            //                     // if(!(this.props.pmoEvaluation.Documents.length === docs.length)) {
            //                     //     console.log("TCL: componentWillReceiveProps -> this.props", this.props)
                                    
            //                     // }

                               
            //                     console.log("TCL: componentWillReceiveProps -> nextProps.pmoEvalFiles", nextProps.pmoEvalFiles)


            //                     if(this.state.dataSavedOnDB === true) {
            //                         // if(prevProps.pmoEvalFiles.length) 
            //                         const id = this.props.match.params.projectID
            //                         this.props.fetchProjectFiles(id, 'PMO').then((data)=> {
            //                             console.log("TCL: componentDidUpdate -> data", data)
            //                             // console.log("TCL: componentDidUpdate -> prevProps", prevProps)
            //                             console.log("TCL: componentDidUpdate -> this.props.pmoEvalFiles", this.props.pmoEvalFiles)
            //                         })

            //                         this.setState({dataSavedOnDB : false})
            //                     }

    
            //                     this.setState({
            //                         Expected_total_ROI : nextProps.loadedPMOEvaluation.Expected_total_ROI || "",
            //                         pmo_eval_id : nextProps.loadedPMOEvaluation.pmoEvaluation.pmo_eval_id,
            //                         Expected_IRR : nextProps.loadedPMOEvaluation.Expected_IRR || "",
            //                         ROI_Category : this.createSelectOption(nextProps.loadedPMOEvaluation.ROI_Category) || this.createSelectOption("") ,
            //                         WorkID_PlanView_FlexPM_SN_Ticket : nextProps.loadedPMOEvaluation.WorkID_PlanView_FlexPM_SN_Ticket || "",
            //                         // Documents : nextProps.loadedPMOEvaluation.pmoEvaluation.Documents[0] === "" ? [] : nextProps.loadedPMOEvaluation.pmoEvaluation.Documents,
            //                         Documents : docs,
            //                         spFiles : nextProps.pmoEvalFiles,
                                    
            //                         sendingData : false
            //                     })
    
            //                     this.project_Documents = docs
            //                     // this.
            //                     this.updateSelectsOnComponentLoad(nextProps.loadedPMOEvaluation.ROI_Category);

                           

                          
                        
            //             }
            //         }

            //         // this.project_Documents =  nextProps.loadedPMOEvaluation.pmoEvaluation.Documents[0] === "" ? [] : nextProps.loadedPMOEvaluation.pmoEvaluation.Documents;

                    

                    
            //     }

            // }








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
            // Create JSON Data FIelds
            // --------------------------------------
            createFormStructure() {

                console.log("TCL: createFormStructure -> this.props.pmoEvalFiles", this.props.pmoEvalFiles)

                
                console.log("TCL: createFormStructure -> this.state", this.state)

                try {
                    const formFields = [
                        {
                            "Field_Name": "Expected total ROI",
                            "Field_State_Name": "Expected_total_ROI",
                            "value": this.state.Expected_total_ROI,
                            "group": "firstCol1",
                            "Mandatory": true,
                            "Enabled": true,
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
                            "Enabled": true,
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
                            "Enabled": true,
                            "Sequence": "66",
                            "Type": "Combo",
                            "General_Value": [
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
                            "Enabled": true,
                            "Sequence": "67",
                            "Type": "Text",
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
                            "Enabled": true,
                            "Sequence": "68",
                            "Type": "filesPicker",
                            "General_Value": this.state.Documents,
                            "spDocs" : this.props.pmoEvalFiles || [],
                            
                            "hasToolTip" : true,
                            "toolTipText" : "Attach ROI Excel Spread Sheet document ",
                            "columns" : 1
                        }
                    ]
    
                    return formFields;
                }
                catch(error) {
                    console.log("TCL: createFormStructure -> error", error)
                    
                }
            }





            
            // --------------------------------------
            // Force Re-render of Selects
            // --------------------------------------
            updateSelectsOnComponentLoad(selectValue) {
                console.log("TCL: updateSelectsOnComponentLoad -> selectValue", selectValue)
                // ?Get Selec Inputs
              
                // if(selectValue) {
                //     let selElement = document.getElementById('ROI_Category');
                //         console.log("TCL: updateSelectsOnComponentLoad -> selElement", selElement)

                //     let reactSelectInput = selElement.querySelector('.react-select-wide__placeholder');
                //     if(reactSelectInput === null)
                //         reactSelectInput = selElement.querySelector('.react-select-wide__single-value')

                //     reactSelectInput.innerText = selectValue

                // }
               
                

                if(this.props.loadedPMOEvaluation) {
                        
                    
                    console.log("TCL: updateSelectsOnComponentLoad -> this.state", this.state)
                    try {
                        this.formFields.forEach(formItem => {
                            if(formItem.Type === "Combo")  {


                                // console.log("TCL: updateSelectsOnComponentLoad -> this.props.loadedBusinessInformation.businessInformation[formItem.Field_State_Name]", this.props.loadedBusinessInformation.businessInformation[formItem.Field_State_Name])

                                // ? Get element By Id
                                let selElement = document.getElementById(formItem.Field_State_Name);
                                    console.log("TCL: updateSelectsOnComponentLoad -> selElement", selElement)

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
                                    
                                

                                // let propsName =  formItem.Field_State_Name.toLocaleLowerCase()
                                
                                console.log("TCL: updateSelectsOnComponentLoad -> reactSelectInput", reactSelectInput)

                                if(reactSelectInput) {
                                    
                                    // let value = this.props.loadedPMOEvaluation.pmoEvaluation[formItem.Field_State_Name] || this.props.loadedPMOEvaluation[formItem.Field_State_Name]
                                    // console.log("TCL: updateSelectsOnComponentLoad -> this.props.loadedPMOEvaluation", this.props.loadedPMOEvaluation[formItem.Field_State_Name])
                                    // console.log("TCL: updateSelectsOnComponentLoad -> this.props.loadedPMOEvaluation.pmoEvaluation", this.props.loadedPMOEvaluation.pmoEvaluation[formItem.Field_State_Name])
                                    // console.log("TCL: updateSelectsOnComponentLoad -> value", value)

                                    // if(selectValue)

                                    // reactSelectInput.innerText = this.props.loadedPMOEvaluation.pmoEvaluation[formItem.Field_State_Name]

                                    if(selectValue.label)
                                        reactSelectInput.innerText = selectValue.label
                                    else
                                        reactSelectInput.innerText = selectValue
                                    
                                    
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
                const {projectID} = this.props.match.params;
                const requestID = projectID.substr(projectID.indexOf('D')+1,projectID.length);

                return requestID
            }



            /* ==========================================================================
            ** FIle Manager Fuctions
            ** ========================================================================== */

            
                // --------------------------------------
                // Handle Add File to Dropzone
                // --------------------------------------
                handleFileAdded = (file) => {
                    let { Documents} =  this.state;
                    // if( Documents[0] === "" )

                    Documents.push(file);

                    this.setState({Documents})
                    this.project_Documents = Documents;
                    
                    if( file.type.indexOf('image/') < 0 )
                        this.createPreviewImageDropzone(null, file);
                        // this.createPreviewImageDropzone(( Documents.length - 1), file);
                    
                   
                }


                // --------------------------------------
                // Handle Remove Fxile to Dropzone
                // --------------------------------------
                handleFileRemoved = (file) => {
                    let {Documents} =  this.state;
                    // let removedfileName = file.name;
                    let newproject_Documents = [];
                   
                    newproject_Documents = Documents.filter((fileToDelete)=> {
                        if(!fileToDelete.name) 
                            return fileToDelete !== fileToDelete.name
                        else
                            return file.name !== fileToDelete.name
                    })

                    this.setState({Documents: newproject_Documents})
                    this.project_Documents = newproject_Documents;
                }

              

                

                // --------------------------------------
                // Preload Files on Dropzone
                // --------------------------------------
                preloadFiles = (dropzone)=> {
                    // const {project_docs} = this.props.loadedRequirements.requirementsDefinition;
                    let mockFile = null;
                    // const project_docs = this.project_Documents
                    const project_docs = this.state.Documents;
                    

                    // Check IF has Values, or an empty string, in yes reset array
                    if (project_docs === null || project_docs === undefined || project_docs[0] === "") {
                        // this.project_Documents = [];
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
						// this.project_Documents = dropzone.files;


                        // Set width and height of Thumbnail
                        
                        //? Set Preview of of files that are not images
                        // if( type.indexOf('image/') < 0 )
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

                    this.project_Documents = mockFiles;
                    this.setState({Documents : mockFiles})
                }

                
                // --------------------------------------
                // Create Mock Document
                // --------------------------------------
                createMockFile(docName, docType = "") {
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
                        fileName = docName;
            
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
                createPreviewImageDropzone(index = null, file) {
                    console.log("TCL: createPreviewImageDropzone -> file", file)

                    let imageContainer = null
                    if(index !== null)
                        imageContainer = document.getElementsByClassName('dz-image')[index];
                    else if(this.project_Documents.length > 0)
                        imageContainer = document.getElementsByClassName('dz-image')[this.project_Documents.length - 1];
                    else
                        imageContainer = document.getElementsByClassName('dz-image')
                        
                        
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

                    // if(fileType === 'png' || fileType === 'jpg' || fileType === 'gif' ){
                    //     if(fileName.indexOf('sites') >= 0) 
                    //     return `https://flextronics365.sharepoint.com/${fileName}`;
                    // }
                    
                    // let fileExtension = "";
                    // let iconSrc = "";
                    // if(fileName.indexOf('sites/') >= 0) {
                    //     fileExtension =  fileType;
                    //     iconSrc = `/${fileName}`;
                    // }
                    // else if(fileType !== "") {
                    //     fileExtension =  fileType.split('/')[1]
                    //     iconSrc = `https://flextronics365.sharepoint.com/sites/project_intake/ProjectIntake/assets/File-Icons/${fileExtension}.png`;
                    // }
                      
                    // else {
                    //     fileExtension =  fileName.split('.')[1]
                    //     iconSrc = `https://flextronics365.sharepoint.com/sites/project_intake/ProjectIntake/assets/File-Icons/${fileExtension}.png`;
                    
                    // }
                       
                    // //console.log('iconSrc', iconSrc);

                    // return iconSrc;
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
                // on Each Child of filesArray
                // --------------------------------------*/
                uploadFiles (foldertoUpload, filesArray) {
                    // this.setState({currentMessage : 'Saving Files'})
                    // const {Documents} = this.state;
                    
                    // console.log("TCL: uploadFiles -> Documents", Documents)
                    // const folderURL = `https://flextronics365.sharepoint.com/sites/gsd/intake_process/intakeFiles/${folderName}`
                    // const folderURL = `${Endpoints.getProjectFolder}('intakeFiles/${folderName}')/Files`
                    // const folderURL = `intakeFiles/RequirementsDefinition/${folderName}`;




                    const folderURL = `intakeFiles/${foldertoUpload}`;
                    let filesToUploadDBArray = [];
                   


                     if(filesArray ) {
                         // ? Iterate Files
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


                                
                                // filesToUploadDBArray.push(fileURL);
                                    
                            }
                     }

                   
                    
                 
                }




                // --------------------------------------
                // Save Form Values
                // --------------------------------------
                saveFormValues() {
                    const currentUser = window.getCurrentSPUser();
                    // const projId = this.props.projectID || 'GSD67';
                    // const requestID = projId.substr(projId.indexOf('D')+1,projId.length);

                    const {Documents} = this.state;
                    console.log("TCL: saveFormValues -> this", this)
                    console.log("TCL: saveFormValues -> Documents", Documents)

                    const requestID =  this.getProjectID();
                    const formData = {
                        Project_ID : requestID,
                        pmo_eval_id : this.state.pmo_eval_id,
                        Expected_total_ROI : this.state.Expected_total_ROI ,
                        Expected_IRR : this.state.Expected_IRR ,
                        ROI_Category : this.state.ROI_Category ,
                        WorkID_PlanView_FlexPM_SN_Ticket : this.state.WorkID_PlanView_FlexPM_SN_Ticket ,
                        Documents :  Documents || this.project_Documents  || [],
                        Created_by : currentUser.userEmail,
                        Last_modifed_by : currentUser.userEmail
                    } 


                    // this.setState({
                    //     Expected_total_ROI : formData.Expected_total_ROI,
                    //     // pmo_eval_id : nextProps.pmoEvaluation.pmoEvaluation.pmo_eval_id,
                    //     Expected_IRR : nextProps.pmoEvaluation.pmoEvaluation.Expected_IRR || "",
                    //     // ROI_Category : this.createSelectOption(nextProps.pmoEvaluation.pmoEvaluation.ROI_Category) || this.createSelectOption("") ,
                    //     WorkID_PlanView_FlexPM_SN_Ticket : formData.WorkID_PlanView_FlexPM_SN_Ticket,
                    //     // Documents : nextProps.pmoEvaluation.pmoEvaluation.Documents[0] === "" ? [] : nextProps.loadedPMOEvaluation.pmoEvaluation.Documents,
                    //     sendingData : false
                    // })
            

                    //console.log('TCL: saveFormValues -> formData', formData)
                    return formData;
					
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

       
            
                // --------------------------------------
                // Submit Form
                // --------------------------------------
                submitFormLocalData = (event) => {
                    // const formData =  this.saveFormValues();

                      // Validate Empty Fields
                    if(this.validateFormInputs() === false) {
                        this.createErrorAlertTop('Please Fill all the Required Fields');
                        return;
                    }

                    // this.props.saveLocalPMOEvaluation(formData);
                    this.setState({showFileManager : false})
                    // // Show Sucess Message 
                    this.createSuccessAlert('Data Saved Locally');

                    this.redirectUser();
                    // Redirect User
                        // setTimeout(()=>{this.redirectUser();},700);
                }


                // --------------------------------------
                // New PMO
                // --------------------------------------
                saveNewPMOEvaluation = ()=> {
                    const formData = this.saveFormValues();
                    //console.log('TCL: submitFormDB -> formData', formData)
                    // Update State
                    this.props.saveLocalPMOEvaluation(formData);
                    // Save on DB
                    this.props.savePMOEvaluationDB(formData).then(()=>{
                        this.createSuccessAlert('Data Saved ');
                        // Redirect User

                        // Check If Action was Success
                        const newPMOEvaluationID = this.props.pmoEvaluation.newPMOEvaluationID
                        const {projectID} = this.props.match.params;
                        const pmoFolderURL = `${projectID}/PMO`;


                        // Upload Files to Sharepoint
                        this.project_Documents.length > 0 && this.uploadFiles(pmoFolderURL)
                        // this.uploadFiles(pmoFolderURL)
                        

                        this.saveOtherTabs();
						
                        
                        
                        this.setState({ Request_ID : newPMOEvaluationID , sendingData : false, dataSavedOnDB : true});

                        // setTimeout(()=>{this.redirectUser();},700);

                        
                        
                    })
                    .catch((error)=> {
                        console.log("TCL: saveNewPMOEvaluation -> error", error)
                        this.createErrorAlert('There was a problem saving the data, please try again ');
						//console.log('TCL: submitFormDB -> error', error)
                        
                    })
                }

                // --------------------------------------
                // Update PMO Evaluattion
                // --------------------------------------
                updateCurrentPMOEvaluation = ()=> {
                    // const projID =this.props.requirementsDefinition.newProjectID;
                    const formData = this.saveFormValues();
                    //console.log('TCL: submitFormDB -> formData', formData)
				    // //console.log('TCL: updateCurrentPMOEvaluation -> currentPMOID', currentPMOID)
                    this.props.updatePMOEvaluation(formData).then(()=>{
                        this.createSuccessAlert('Data Saved ');
                        // Redirect User
                        // Check If Action was Success
                        
                        const {projectID} = this.props.match.params;
                        const pmoFolderURL = `${projectID}/PMO`;
                        const newPMOEvaluationID = this.props.pmoEvaluation.newPMOEvaluationID

                        // Upload Files to Sharepoint
                        // this.project_Documents.length > 0 && this.uploadFiles(pmoFolderURL)
                        this.uploadFiles(pmoFolderURL, formData.Documents)
                        
                        
                        //console.log('TCL: submitFormDB -> newPMOEvaluationID', newPMOEvaluationID)

                        // this.props.resetPMOEvaluationState();

                        this.props.saveLocalPMOEvaluation(formData)
                        
                        

                        this.saveOtherTabs();

                        this.setState({ Request_ID : newPMOEvaluationID , sendingData : false, showFileManager : false, dataSavedOnDB : true})
                        
                    })
                    .catch((error)=> {
                        console.log("TCL: updateCurrentPMOEvaluation -> error", error)
                        this.createErrorAlert('There was a problem saving the data, please try again ');
						//console.log('TCL: submitFormDB -> error', error)
                        
                    })
                }
               


                //! --------------------------------------
                //! Submit Form to DB
                //! --------------------------------------
                submitFormDB = () => {

                    // Validate Empty Fields
                    if(this.validateFormInputs() === false) {
                        this.createErrorAlertTop('Please Fill all the Required Fields');
                        return;
                    }

                    this.setState({sendingData : true})

                    // Check if is New PMO Eval or Update Current
                    const {pmoEvaluation} = this.props.loadedPMOEvaluation;

                    if(pmoEvaluation) {
                        // Update Current
                        this.updateCurrentPMOEvaluation();
                    }
                    else {
                        // Create new PMO Evaluation
                        this.saveNewPMOEvaluation();
                    }


                    this.setState({showFileManager : false})


                    // this.componentDidMount();

                    // this.setState({state:this.state})


                   
                        

                    
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



            // // --------------------------------------
            // // Redirect User
            // // --------------------------------------
            // redirectUser() {
            //     const {history} = this.props;
            //     const path = '/sites/gsd/intake_process/IntakeProcess/ProjectIntake.aspx';
                
            //     history.push(`${path}/add-project/roi-realized`);
            // }

            // --------------------------------------
            // Redirect User
            // --------------------------------------
            redirectUser() {
                const {history} = this.props;
                const id = this.props.match.params.projectID
                const path = '/sites/gsd/intake_process/IntakeProcess/ProjectIntake.aspx';
                
                history.push(`${path}/project/${id}/roi-realized`);
                
            }

             // --------------------------------------
            // Redirect User to Prev Step
            // --------------------------------------
            
            redirectUserPrev =() => {
                const {history} = this.props;
                const path = '/sites/gsd/intake_process/IntakeProcess/ProjectIntake.aspx';
                let pathArray = this.props.location.pathname.split('/');
                let projectIndex = pathArray[pathArray.length - 2];
				console.log("TCL: BusinessInformation -> redirectUserPrev -> projectIndex", projectIndex)
                
                history.push(`${path}/project/${projectIndex}/technical-evaluation`);
                // history.goBack();
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
                    this.setState({currentMessage : 'Saving Files'})
                    const filesArray = this.props.requirementsDefinition.Project_docs;
                    

                    const folderURL = `intakeFiles/${foldertoUpload}`;
                    let filesToUploadDBArray = [];
                    // if(filesArray.length <= 0)
                    //     return;
                    
                    // Iterate Files
                    for(let file of filesArray) {
                        let saveFile = null
                        let fileURL = '';
                        
                    
                        if(!file.name) 
                            saveFile =  this.createMockFile(file)
                        else
                            saveFile = file;
                    
                        if(saveFile.name.indexOf('sites/') >= 0) 
                            fileURL = saveFile.name
                        else {
                            // ? Create new URl and the just upload the new file
                            fileURL = `sites/gsd/intake_process/${folderURL}/${saveFile.name}`;
                            window.uploadFilesToFolder(folderURL, saveFile.name, saveFile, filesArray.length);
                        }

                        // window.uploadFilesToFolder(folderURL, saveFile.name, saveFile, filesArray.length);

                        filesToUploadDBArray.push(fileURL);
                    }

                    

                    
                        this.saveFilesonDB(folderName, filesToUploadDBArray)
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
                const ProjectID = this.props.locationData.match.params.projectID;
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
                        showFileManager = {this.state.showFileManager}
                        currentProject = {ProjectID}
                        currentView = {'PMO'}
                        // checkErrorClass = {this.checkErrorClass}
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
            // Render Projects
            // --------------------------------------
            renderPMOEvaluation() {
                const {sendingData} = this.state;
                if (! this.props.projectIntake.requirementsDefinition || !this.props.isPMO)  {
                    let currentProject = this.props.locationData.match.params.projectID
                    window.location.href = `sites/gsd/intake_process/IntakeProcess/ProjectIntake.aspx/project/${currentProject}/requirement-definition`
                    return null;
                    // return (<Redirect to={`sites/gsd/intake_process/IntakeProcess/ProjectIntake.aspx/project/${currentProject}/requirement-definition`}/>)
                }
                    
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
                                                        <button 
                                                            onClick = {this.uploadFilesToSPWithoutSavingDB} 
                                                            className = "int-singleButton" 
                                                            type = "button">
                                                            {this.state.showFileManager === false ? 'Manage Files' : 'Discard Changes'}
                                                        </button>
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
                // const {isLoaded} = this.props.loadedPMOEvaluation
                // let showComponent =  false;
				// // console.log("TCL: render -> isLoaded", isLoaded)
                // console.log("TCL: render -> this.props.", this.props)
                
                // if(isLoaded === undefined && this.props.loadedPMOEvaluation) {
                //     showComponent = true
                //     return showComponent ? this.renderPMOEvaluation()  : this.renderLoader();
                // }
                // else

                const {isLoaded} = this.state;

                return isLoaded ? this.renderPMOEvaluation()  : this.renderLoader();
                    

                
                // return this.renderPMOEvaluation();
            }
    }


// -------------------------------------- 
// Define PropTypes 
// -------------------------------------- 
    PMOEvaluation.propTypes = {
        props: PropTypes
    };





// --------------------------------------
// Export Component
// --------------------------------------
    export default (PMOEvaluation);
   