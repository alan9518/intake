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
  

    // --------------------------------------
    // Edit Project
    // https://flextronics365.sharepoint.com/sites/gsd/intake_process/intake_process_v3/ProjectIntake.aspx
    // --------------------------------------
    import editformHolder from '../layouts/Projects/EditFormHolder';


    import ProcessEndedView from '../views/ProcessEnded/ProcessEnded';
   


      
    import {Config} from '../Config';
    const {relativePath, localPath, spPath} = Config


// --------------------------------------
// Create JSON Routes Array
// Last Item is the Defualt Redirect
// From Home or / to Catalogue View
// --------------------------------------
    export const appRoutes = [
        {
            path: `${relativePath}/intake-projects`,
            exact: true,
            key: 'route-intakeProjects',
            menuTitle: 'All \n Projects',
            component: AllProjectsView
        },

        {
            path: `${relativePath}/add-project/`,
            exact: false,
            key: 'route-addProject',
            menuTitle: 'Add \n Project',
            component: formHolder
        },
        {
            path: `${relativePath}/proccess-ended/:projId`,
            exact: false,
            key: 'route-processEnded',
            // menuTitle: 'Add \n Project',
            component: ProcessEndedView
        },

        {
            path: `${relativePath}/project/:projectID/`,
            exact: false,
            key: 'route-editProject',
            // menuTitle: 'Add \n Project',
            component: editformHolder

        },

        { redirect: true, path: '/', to: `${relativePath}/intake-projects`, key: 'indexRedirect-route' },
        { redirect: true, path: '/project/:projectID', to: `/project/:projectID/requirement-definition`, key: 'eidtProjectRedirect-route' },
        { redirect: true, path: `/add-project/`, to: `${relativePath}/add-project/requirement-definition`, key: 'addProjectRedirect-route' }
        


    ]






// --------------------------------------
// New Project Routes
// --------------------------------------
    export const newProjectRoutes = [
        {
            path: `${relativePath}/intake-projects`,
            exact: true,
            key: 'route-intakeProjects',
            menuTitle: 'All \n Projects',
            component: AllProjectsView,
            allowNormalUser : true,
            
        },
        {
            // path: `/add-project/requirement-definition`,
            path: `${relativePath}/add-project/requirement-definition`,
            exact: false,
            key: 'route-addRequirementDefinition',
            menuTitle: 'Requirements \n Definition',
            // component: AddRequirementsDefinition,
            allowNormalUser : true,

        },
        {
            // path: `/add-project/business-information`,
            path: `${relativePath}/add-project/business-information`,
            exact: true,
            key: 'route-addBusinessInformation',
            menuTitle: 'Business \n Information',
            // component: AddBusinessInformation,
            allowNormalUser : true,
        },
        {
            // path: `/add-project/technical-evaluation`,
            path: `${relativePath}/add-project/technical-evaluation`,
            exact: true,
            key: 'route-addTechnicalEvaluation',
            menuTitle: 'Technical \n Evaluation',
            // component: AddTechnicalEvaluation,
            allowNormalUser : false,
        },
        {
            // path: `/add-project/pmo-evaluation`,
            path: `${relativePath}/add-project/pmo-evaluation`,
            exact: true,
            key: 'route-addPmoEvaluation',
            menuTitle: 'PMO \n Evaluation',
            // component: AddPMOEvaluation,
            allowNormalUser : false,
        },
        {
            // path: `/add-project/roi-realized`,
            path: `${relativePath}/add-project/roi-realized`,
            exact: true,
            key: 'route-addPoiRealized',
            menuTitle: 'ROI \n Realized',
            // component: AddROIRealized,
            allowNormalUser : false,
        },
        { redirect: true, path: `${relativePath}/add-project/`, to: `${relativePath}/add-project/requirement-definition`, key: 'addProjectRedirect-route' }
    ]



// --------------------------------------
// Edit Project Rpoutes
// --------------------------------------

export const editProjectRoutes = [
    {
        path: `${relativePath}/intake-projects`,
        exact: true,
        key: 'route-intakeProjects',
        menuTitle: 'All \n Projects',
        component: AllProjectsView,
        allowNormalUser : true,
        
    },

    {
        path: `${relativePath}/project/:projectID/requirement-definition`,
        exact: true,
        key: 'route-requirementDefinition',
        menuTitle: 'Requirements \n Definition',
        // component: EditRequirementsDefinition,
        allowNormalUser : true,
        editRoute : true

    },
    {
        // path: `/add-project/business-information`,
        path: `${relativePath}/project/:projectID/business-information`,
        exact: true,
        key: 'route-editPusinessInformation',
        menuTitle: 'Business \n Information',
        // component: EditBusinessInformation,
        allowNormalUser : true,
        editRoute : true
    },
    {
        // path: `/edit-project/technical-evaluation`,
        path: `${relativePath}/project/:projectID/technical-evaluation`,
        exact: true,
        key: 'route-editPechnicalEvaluation',
        menuTitle: 'Technical \n Evaluation',
        // component: EditTechnicalEvaluation,
        allowNormalUser : false,
        editRoute : true
    },
    {
        // path: `/edit-project/pmo-evaluation`,
        path: `${relativePath}/project/:projectID/pmo-evaluation`,
        exact: true,
        key: 'route-editPmoEvaluation',
        menuTitle: 'PMO \n Evaluation',
        // component: EditPMOEvaluation,
        allowNormalUser : false,
        editRoute : true
    },
    {
        // path: `/edit-project/roi-realized`,
        path: `${relativePath}/project/:projectID/roi-realized`,
        exact: true,
        key: 'route-editPoiRealized',
        menuTitle: 'ROI \n Realized',
        // component: EditROIRealized,
        allowNormalUser : false,
        editRoute : true
    },
    { redirect: true, path: `${relativePath}/project/`, to: `${relativePath}/intake-projects`, key: 'editProjectRedirect-route' }
]


