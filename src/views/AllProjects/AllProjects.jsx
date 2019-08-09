/* ==========================================================================
** Projects Holder Parent Component
** Main Form Screen, Controls the Other Views
** 28/01/2019
** Alan Medina Silva
** ========================================================================== */


// --------------------------------------
// Get Dependences
// --------------------------------------
    import React, { Component, Fragment } from 'react';
    import PropTypes from 'prop-types';
    import { Header, FormBody, AppButton, ProjectLink, NavBar, DataTable, AppLoader, ListPagination , Search } from '../../components';
    import form_icon from '../../assets/img/form_icon.png';
    import {appRoutes} from '../../routes/routes';
    import {Endpoints} from '../../services/Endpoints';
    import axios from 'axios';


    const currentUser = window.getCurrentSPUser();

// --------------------------------------
// Create Component Class
// --------------------------------------
    class Home extends Component {
        
        /* ==========================================================================
        ** Component Setup
        ** ========================================================================== */

            // --------------------------------------
            // Constructor
            // --------------------------------------
            constructor(props) {
                super(props);
                this.state = {
                    tableData : [],
                    tableFiltered : false,
                    isLoaded: false,
                    currentPage : 1,
                    numberOfPages : 0,
                    numberPerPage : 4,
                    currentFilter : '',
                }

                this.allProjects = [];
            }
        
            // --------------------------------------
            // Set Initial Values
            // Get all projects
            // --------------------------------------
            componentDidMount() {
                // this.props
                console.log("TCL: Home -> componentDidMount -> this.props", this.props)
                this.loadAPI();
            }


            componentWillReceiveProps(nextProps) {
                console.log("TCL: Home -> componentWillReceiveProps -> nextProps", nextProps)
                
            }


            // --------------------------------------
            // Set Number of Pages
            // --------------------------------------
            setNumberOfPages (dataSize) {
                const {numberPerPage}= this.state;
                return Math.ceil(dataSize / numberPerPage)
            }


            // --------------------------------------
            // Set New Page
            // --------------------------------------

            onSetPage = (value)=> {
				//console.log('TCL: Home -> onSetPage -> event', value)
                const {allProjects} = this.props;

                const initialRange =  value;
                const limit = initialRange * (0+10) + 10;
				//console.log('TCL: Home -> onSetPage -> limit', limit)

                const newProjectView =  allProjects.filter((project, index = (limit - 10))=> {
					
                    return (index < limit)
                })

                //console.log('TCL: Home -> newProjectView -> newProjectView', newProjectView)

            }


        /* ==========================================================================
        ** Handle API Requests
        ** ========================================================================== */

            // --------------------------------------
            // Handle all Requests
            // --------------------------------------
            async loadAPI() {
               
                try {
                    // ? Get Projects. Check if user is PMO
                    const userProjectsPromise = await localStorage.getItem('isUserPMO') === "true" ?  this.fetchProjects() : this.fetchProjectsByUser()

                    // const userProjects =  await userProjectsPromise.data;


                    const [userProjects] = await Promise.all([userProjectsPromise]);


                    console.log("TCL: Home -> loadAPI -> userProjects", userProjects)

                    this.setState({
                        tableData : userProjects.data, 
                        numberOfPages : this.setNumberOfPages(userProjects.data.length),  
                        isLoaded : true
                    })

                    // ? Save a copy of all projects

                    this.allProjects = userProjects.data;
                }

                catch(error) {
                    console.log("TCL: Home -> loadAPI -> error", error)
                    
                    this.setState({
                        tableData : [], 
                        numberOfPages :0,
                        isLoaded : true
                    })

                }

                
            }



            // --------------------------------------
            // Get all Projects
            // --------------------------------------
            fetchProjects = async ()=> {

                return axios.get(Endpoints.getAllProjects);  
            }

            // --------------------------------------
            // Get Projects By User
            // --------------------------------------
            fetchProjectsByUser = () => {
                // const currentUser = window.getCurrentSPUser();

                // const currentUser = {userEmail : 'alan.medina@flex.com'}
                
                const params = {created_by : currentUser.userEmail}

                return axios.get(Endpoints.getProjectsByUser, {params});
             
            }
    

        /* ==========================================================================
        ** Handle State
        ** ========================================================================== */


            // --------------------------------------
            // Load the Data
            // --------------------------------------
            loadList(newPage) {
                const {numberPerPage,  tableFiltered, filteredTable}  = this.state;
                // const allProjects = this.allProjects;
                const begin = ((newPage - 1) * numberPerPage);
                const end = begin + numberPerPage;
            
                const pageList =  tableFiltered === true ? filteredTable.slice(begin, end) : this.allProjects.slice(begin, end);
				console.log("TCL: Home -> loadList -> allProjects", this.allProjects)
                console.log('TCL: Home -> loadList -> pageList', pageList)
                
                return pageList;

            }
            

            
            // --------------------------------------
            // Change to Next Page
            // --------------------------------------
            nextPage = () => {
                const {currentPage} = this.state;
                let newPage =  currentPage + 1;
                const newList =  this.loadList(newPage);
                this.setState((prevState, props) => ({
                    currentPage : newPage,
                    tableData : newList,
                    
                }));
                
            }

            // --------------------------------------
            // Change to Prev Page
            // --------------------------------------
            previousPage = () => {
                const {currentPage} = this.state;
                let newPage =  currentPage - 1;
                const newList =  this.loadList(newPage);
                this.setState((prevState, props) => ({
                    currentPage : newPage,
                    tableData : newList
                }));

                
            }

            // --------------------------------------
            // Change to First Page
            // --------------------------------------
            firstPage = () => {
                
                let newPage =  1;
                const newList =  this.loadList(newPage);
                this.setState((prevState, props) => ({
                    currentPage : newPage,
                    tableData : newList
                }));
                
            }

            

            // --------------------------------------
            // Change First Page
            // --------------------------------------
            lastPage = () => {
                const {numberOfPages} = this.state;
                let newPage = numberOfPages;
                const newList =  this.loadList(newPage);
                this.setState((prevState, props) => ({
                    currentPage : newPage,
                    tableData : newList
                }));
                
            }

            // --------------------------------------
            // On CHange for FIlter
            // --------------------------------------
            onChange = (event)=> {
               
                const filterValue =  String(event.target.value) ;
                const filteredProjects = this.allProjects.filter((project)=>{
					
                    return (
                            // project.project_id.indexOf(filterValue) > -1  ||
                            (project.project_name.toLowerCase().indexOf(filterValue.toLowerCase())) > -1  ||
                            (project.request_owner.toLowerCase().indexOf(filterValue.toLowerCase())) > -1 ||
                            (project.request_id.toLowerCase().indexOf(filterValue.toLowerCase())) > -1 ||
                            (project.workstage.toLowerCase().indexOf(filterValue.toLowerCase())) > -1
                    )   
                });

                console.log("TCL: Home -> onChange -> filteredProjects", filteredProjects)

                this.setState({
                    tableData : filterValue === '' ? this.allProjects : filteredProjects,
                    filteredTable :  filterValue === '' ? this.allProjects : filteredProjects,
					tableFiltered : filteredProjects.length > 0 ? true : false,
                    numberOfPages : this.setNumberOfPages(filteredProjects.length),
                    currentPage : 1
                    
                })
            }


            onSubmitFilter  = (event)=> {
                event.preventDefault();
                //console.log('TCL: Home -> onChange -> event', event)
                const filterValue =  String(event.target.value) ;
				console.log("TCL: Home -> onSubmitFilter -> filterValue", filterValue)
            
                const filteredProjects = this.allProjects.filter((project)=>{
					
                    return (
                            // project.project_id.indexOf(filterValue) > -1  ||
                            project.project_name.toLowerCase() ===   filterValue.toLowerCase() || 
                            project.request_owner.toLowerCase() ===   filterValue.toLowerCase() ||
                            project.request_id.toLowerCase() ===   filterValue.toLowerCase() ||
                            project.workstage.toLowerCase() ===   filterValue.toLowerCase()
                    )   
                });

                console.log("TCL: Home -> onChange -> filteredProjects", filteredProjects)

                this.setState({
                    tableData : filterValue === '' ? this.allProjects : filteredProjects,
                    filteredTable :  filterValue === '' ? this.allProjects : filteredProjects,
					tableFiltered : filteredProjects.length > 0 ? true : false,
                    numberOfPages : this.setNumberOfPages(filteredProjects.length),
                    currentPage : 1
                    
                })
            }


            
    
        /* ==========================================================================
        ** Render Methods
        ** ========================================================================== */

            // --------------------------------------
            // Render Loader
            // --------------------------------------
            renderLoader () {
                return <div> <AppLoader customHeight = {400}/> </div>
            }

            // --------------------------------------
            // Render Navigation
            // --------------------------------------
            renderNavigation() {
                // const activeRoute = newProjectRoutes[0];
                return <NavBar routes = {appRoutes} isRoute = {true}/>
            }




            // --------------------------------------
            // Render Form Header
            // --------------------------------------
            renderformHeader() {
                // const title =  'Global Shared \n Development';
                const title =  'Global Shared Development';
                return <Header title = {title}/>
            }

            // --------------------------------------
            // Render Search Filter
            // --------------------------------------
            renderSearchFilter() {
                return (
                    <Fragment>
                        <div className="int-container">
                            <div className="int-row">
                                <div className="int-column ">
                                    { this.state.tableData.length > 0 && <Search onChange = {this.onChange} onSubmit = {this.onSubmitFilter}/>}
                                </div>
                            </div>
                        </div>

                    </Fragment>
                )
                
            }
        

            // --------------------------------------
            // Render Header Section
            // --------------------------------------
            renderHeaderSection() {
                return (
                    <Fragment>
                        <div className="int-container">
                            

                            <div className="int-row">
                                <div className="int-double-column ">
                                    <div className="int-headerSection1">
                                        <div className="int-iconHolder">
                                            <img src={form_icon} alt="" style ={{maxWidth:75}} />
                                        </div>

                                        <div className="int-titleSection">
                                            <h2 className="int-subHeader"> Dashboard </h2>
                                        </div>
                                    </div>
                                </div>

                            </div>
                            
                        </div>

                    </Fragment>
                )
            }


            // --------------------------------------
            // Render Projects Table
            // --------------------------------------
            renderProjectsTableContainer () {
                
                // const {allProjects} = this.props;
                const {tableData} = this.state;
                console.log("TCL: Home -> renderProjectsTableContainer -> tableData", tableData)
                return (
                    <div className="int-container">
                        
                        <div className="int-row">
                            <div className="int-column" style = {{width:'100%', marginBottom:50}}>

                            {
                                tableData.length > 0 ? this.renderProjectsTable(): <h1>You dont have any projects</h1> 
                            }
                            
                            </div>
                        </div>
                        
                    </div>
                )

            }


            renderPagination() {
                const {currentPage, numberOfPages,numberPerPage , tableData} = this.state;
                return   <ListPagination
                        projectsCount={tableData.length}
                        currentPage={currentPage}
                        numberOfPages = {numberOfPages}
                        itemsPerPage = {numberPerPage}
                        onSetPage={this.onSetPage} 
                        nextPage =  {this.nextPage}
                        previousPage = {this.previousPage}
                        firstPage = {this.firstPage}
                        lastPage = {this.lastPage}
                    />
            }


            renderProjectsTable() {
                const { isLoaded} = this.state;
                
                return isLoaded  === false ? this.renderLoader() : this.renderTableWithPagination()
                
            }


            renderTableWithPagination() {
                const {numberPerPage , tableData, currentPage, numberOfPages} = this.state;
				// //console.log('TCL: Home -> renderTableWithPagination -> currentPage', currentPage)
				// //console.log('TCL: Home -> renderTableWithPagination -> numberOfPages', numberOfPages)
				// //console.log('TCL: Home -> renderTableWithPagination -> tableData', tableData)
                return (
                    <Fragment>
                        <DataTable tableData = {tableData || []} currentPage = {0} itemsPerPage = {numberPerPage}/> 
                        <ListPagination
                            projectsCount={tableData.length}
                            currentPage={currentPage}
                            numberOfPages = {numberOfPages}
                            itemsPerPage = {numberPerPage}
                            onSetPage={this.onSetPage} 
                            nextPage =  {this.nextPage}
                            previousPage = {this.previousPage}
                            firstPage = {this.firstPage}
                            lastPage = {this.lastPage}
                        />
                    </Fragment>
                )
            }


            // --------------------------------------
            // Render Table Body
            // --------------------------------------
            renderProjects() {
                
                const {isLoaded, createNewProject} = this.state;

                

				
                return (
                        <FormBody>

                            {this.renderHeaderSection()}

                            {this.renderSearchFilter()}

                            { !isLoaded ?  this.renderLoader() : this.renderProjectsTableContainer() }


                            <ProjectLink route = {"add-project"}>
                                <AppButton buttonText = {'Add Project'} buttonClass = {'continueButton'} ></AppButton>
                            </ProjectLink>
                            
                        </FormBody>
                );

            }



            // --------------------------------------
            // Render Projects
            // --------------------------------------
            renderHome() {
                const {isLoaded} = this.state;

            

                return (
                    <Fragment>
                        {this.renderNavigation()}
                        <div className="int-projectsContainer">
                            
                            <div className="int-formContainer int-shadow">

                                {this.renderformHeader()}
                                {  isLoaded ?  this.renderProjects() : this.renderLoader(true)}
                                
                                
                            </div>

                        </div>
                    </Fragment>
                    )
            }

            // --------------------------------------
            // Render Component
            // --------------------------------------
            render() {
                
                return this.renderHome();
                
            }
    }

// -------------------------------------- 
// Define PropTypes 
// -------------------------------------- 
    // Home.propTypes = {
    //     props: PropTypes
    // };




// --------------------------------------
// Export Component
// --------------------------------------
    // export default  connect (mapStateToProps, {fetchProjects, fetchProjectsByUser,resetRequirementsState, resetBusinessState, resetPMOEvaluationState, resetROIRealizedState, resetTechnicalState})  (Home);
    export default (Home)