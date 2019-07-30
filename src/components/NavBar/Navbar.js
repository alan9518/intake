/* ==========================================================================
** Header Navigation Component Layout
** 28/01/2019
** Alan Medina Silva
** ========================================================================== */

// --------------------------------------
// Get Dependences
// --------------------------------------
    import React from 'react';
    import PropTypes from 'prop-types';
    import {NavItem} from '../../components';
    import './styles.css';


// --------------------------------------
// Check if is route to edit or new
// --------------------------------------
    const setProjectRoute = (route, currentProjectID)=> {
        if(route.editRoute === true) {
            let projectEditRoute = route.path.replace(':projectID', currentProjectID)
			//console.log('TCL: setProjectRoute -> projectEditRoute', projectEditRoute)

            return projectEditRoute;
        }
        else
            return route.path;
    }

// --------------------------------------
// Create Functional Component
// --------------------------------------
    const Navbar = (props) => {
        const {routes, activeRoute, currentProjectID} = props;
        console.log("TCL: Navbar -> routes", routes)
        return (
            <div className = "int-navigationContainer">
                <ul class="int-navList">
                    {
                        routes && routes.map((route, index)=> {
                            return route.menuTitle &&  (<NavItem 
                                                            title = {route.menuTitle} 
                                                            // activeRoute = {(index+1) === activeRoute ? true : false}
                                                            disabled = {route.disabled}
                                                            route = {setProjectRoute(route, currentProjectID)}
                                                            />)
                        })
                    }
                </ul>
            </div>
        )
    }


// -------------------------------------- 
// Define PropTypes 
// -------------------------------------- 
    Navbar.propTypes = {
        props: PropTypes
    };
    
// --------------------------------------
// Export Component
// --------------------------------------
    export default Navbar;