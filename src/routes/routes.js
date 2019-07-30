/* ==========================================================================
** Routes FIle Definintion
** 28/01/2019
** Alan Medina Silva
** ========================================================================== */

// --------------------------------------
// Get Components
// --------------------------------------
  



    import AllProjectsView from '../views/AllProjects/AllProjects';

    // --------------------------------------
    // Add Project
    // --------------------------------------
    import formHolder from '../layouts/Projects/FormHolder';
    import AddRequirementsDefinition from '../views/AddProject/Requirements/RequirementsDefinition';
    import AddBusinessInformation from '../views/AddProject/Business/BusinessInformation';
    // import AddTechnicalEvaluation from '../views/AddProject/Thecnical/TechnicalEvaluation';
    // import AddPMOEvaluation from '../views/AddProject/PMOEvaluation/PMOEvaluation';
    // import AddROIRealized from '../views/AddProject/ROIRealized/ROIRealized';

    // --------------------------------------
    // Edit Project
    // https://flextronics365.sharepoint.com/sites/gsd/intake_process/IntakeProcess/ProjectIntake.aspx
    // --------------------------------------
    // import editformHolder from '../layouts/Projects/editFormHolder';
    // import EditRequirementsDefinition from '../views/EditProject/Requirements/RequirementsDefinition';
    // import EditBusinessInformation from '../views/EditProject/Business/BusinessInformation';
    // import EditTechnicalEvaluation from '../views/EditProject/Thecnical/TechnicalEvaluation';
    // import EditPMOEvaluation from '../views/EditProject/PMOEvaluation/PMOEvaluation';
    // import EditROIRealized from '../views/EditProject/ROIRealized/ROIRealized';

    // import ProcessEndedView from '../views/ProcessEnded/ProcessEnded';
    // const path = '/sites/gsd/intake_process/IntakeProcess/ProjectIntake.aspx';
    // const path = '/sites/gsd/intake_process/IntakeProcess/ProjectIntake.aspx';
    
    


      
    import {Config} from '../Config';
    const {relativePath, localPath} = Config


// --------------------------------------
// Create JSON Routes Array
// Last Item is the Defualt Redirect
// From Home or / to Catalogue View
// --------------------------------------
    export const appRoutes = [
        {
            path: `${localPath}/intake-projects`,
            exact: true,
            key: 'route-intakeProjects',
            menuTitle: 'All \n Projects',
            component: AllProjectsView
        },

        {
            path: `${localPath}/add-project/`,
            exact: false,
            key: 'route-addProject',
            menuTitle: 'Add \n Project',
            component: formHolder
        },
        // {
        //     path: `${localPath}/proccess-ended/:projId`,
        //     exact: false,
        //     key: 'route-processEnded',
        //     // menuTitle: 'Add \n Project',
        //     component: ProcessEndedView
        // },

        // {
        //     path: `${localPath}/project/:projectID/`,
        //     exact: false,
        //     key: 'route-editProject',
        //     // menuTitle: 'Add \n Project',
        //     component: editformHolder

        // },

        { redirect: true, path: '/', to: `${localPath}/intake-projects`, key: 'indexRedirect-route' },
        { redirect: true, path: '/project/:projectID', to: `/project/:projectID/requirement-definition`, key: 'eidtProjectRedirect-route' },
        { redirect: true, path: `/add-project/`, to: `${localPath}/add-project/requirement-definition`, key: 'addProjectRedirect-route' }
        


    ]






// --------------------------------------
// New Project Routes
// --------------------------------------
    export const newProjectRoutes = [
        {
            path: `${localPath}/intake-projects`,
            exact: true,
            key: 'route-intakeProjects',
            menuTitle: 'All \n Projects',
            component: AllProjectsView,
            allowNormalUser : true,
            
        },
        {
            // path: `/add-project/requirement-definition`,
            path: `${localPath}/add-project/requirement-definition`,
            exact: true,
            key: 'route-addRequirementDefinition',
            menuTitle: 'Requirements \n Definition',
            // component: AddRequirementsDefinition,
            allowNormalUser : true,

        },
        {
            // path: `/add-project/business-information`,
            path: `${localPath}/add-project/business-information`,
            exact: true,
            key: 'route-addBusinessInformation',
            menuTitle: 'Business \n Information',
            // component: AddBusinessInformation,
            allowNormalUser : true,
        },
        {
            // path: `/add-project/technical-evaluation`,
            path: `${localPath}/add-project/technical-evaluation`,
            exact: true,
            key: 'route-addTechnicalEvaluation',
            menuTitle: 'Technical \n Evaluation',
            // component: AddTechnicalEvaluation,
            allowNormalUser : false,
        },
        {
            // path: `/add-project/pmo-evaluation`,
            path: `${localPath}/add-project/pmo-evaluation`,
            exact: true,
            key: 'route-addPmoEvaluation',
            menuTitle: 'PMO \n Evaluation',
            // component: AddPMOEvaluation,
            allowNormalUser : false,
        },
        {
            // path: `/add-project/roi-realized`,
            path: `${localPath}/add-project/roi-realized`,
            exact: true,
            key: 'route-addPoiRealized',
            menuTitle: 'ROI \n Realized',
            // component: AddROIRealized,
            allowNormalUser : false,
        },
        { redirect: true, path: `${localPath}/add-project/`, to: `${localPath}/add-project/requirement-definition`, key: 'addProjectRedirect-route' }
    ]



// --------------------------------------
// Edit Project Rpoutes
// --------------------------------------

// export const editProjectRoutes = [
//     {
//         path: `${localPath}/intake-projects`,
//         exact: true,
//         key: 'route-intakeProjects',
//         menuTitle: 'All \n Projects',
//         component: AllProjectsView,
//         allowNormalUser : true,
        
//     },

//     {
//         path: `${localPath}/project/:projectID/requirement-definition`,
//         exact: true,
//         key: 'route-requirementDefinition',
//         menuTitle: 'Requirements \n Definition',
//         component: EditRequirementsDefinition,
//         allowNormalUser : true,
//         editRoute : true

//     },
//     {
//         // path: `/add-project/business-information`,
//         path: `${localPath}/project/:projectID/business-information`,
//         exact: true,
//         key: 'route-editPusinessInformation',
//         menuTitle: 'Business \n Information',
//         component: EditBusinessInformation,
//         allowNormalUser : true,
//         editRoute : true
//     },
//     {
//         // path: `/edit-project/technical-evaluation`,
//         path: `${localPath}/project/:projectID/technical-evaluation`,
//         exact: true,
//         key: 'route-editPechnicalEvaluation',
//         menuTitle: 'Technical \n Evaluation',
//         component: EditTechnicalEvaluation,
//         EllowNormalUser : false,
//         editRoute : true
//     },
//     {
//         // path: `/edit-project/pmo-evaluation`,
//         path: `${localPath}/project/:projectID/pmo-evaluation`,
//         exact: true,
//         key: 'route-editPmoEvaluation',
//         menuTitle: 'PMO \n Evaluation',
//         component: EditPMOEvaluation,
//         allowNormalUser : false,
//         editRoute : true
//     },
//     {
//         // path: `/edit-project/roi-realized`,
//         path: `${localPath}/project/:projectID/roi-realized`,
//         exact: true,
//         key: 'route-editPoiRealized',
//         menuTitle: 'ROI \n Realized',
//         component: EditROIRealized,
//         allowNormalUser : false,
//         editRoute : true
//     },
//     { redirect: true, path: `${localPath}/project/`, to: `${localPath}/intake-projects`, key: 'editProjectRedirect-route' }
// ]


