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

            return projectEditRoute;
        }
        else
            return route.path;
    }

// --------------------------------------
// Create Functional Component
// --------------------------------------
    const Navbar = (props) => {
        const {routes, currentProjectID, renderLinks} = props;

        return (
            <div className = "int-navigationContainer">
                <ul className = "int-navList">
                    {
                        routes && routes.map((route, index)=> {
                            return route.menuTitle &&  (<NavItem 
                                                            title = {route.menuTitle} 
                                                            // activeRoute = {(index+1) === props.activeRoute ? true : false}
                                                            activeRoute = {props.activeRoute === setProjectRoute(route, currentProjectID) ? true : false}
                                                            disabled = {route.disabled}
                                                            route = {setProjectRoute(route, currentProjectID)}
                                                            Key = {route.menuTitle}
                                                            renderLinks = {renderLinks}
                                                            onClick = {props.onItemClick}    
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
        currentProjectID: PropTypes.string,
        routes : PropTypes.array
    };
    
// --------------------------------------
// Export Component
// --------------------------------------
    export default Navbar;