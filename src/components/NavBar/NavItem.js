/* ==========================================================================
** Nav Item Layout Component
** 28/01/2019
** Alan Medina Silva
** ========================================================================== */

// --------------------------------------
// Get Dependences
// --------------------------------------
    import React from 'react';
    import {ProjectLink} from '../../components'
    import PropTypes from 'prop-types';


// --------------------------------------
// Create Functional Component
// --------------------------------------
    const NavItem = (props) => {
        const { title, activeRoute, route, disabled, renderLinks } = props;
        // Set Active Route
        let activeClass = activeRoute === true ? 'int-active' : '';

        if(renderLinks) {
            if(!disabled)
                // ? Item Enabled
                return (
                    <li>
                        <ProjectLink route = {route} disabled = {disabled}>
                            <div className={`int-navItem ${activeClass}`}>
                                <span >
                                    {title}
                                </span>
                            </div>
                        </ProjectLink>
                    </li>

                );
            else 
                // ? Item is Disabled
                return (
                    <li  onClick = {(e) => {props.onClick(route)}} disabled = {disabled} className = "int-linkButton ">
                        <div className={`int-navItem ${activeClass}`}>
                            <span>
                                { title }
                            </span>
                        </div>
                    </li>
                );
        }

        else {

            if(!disabled)
                // ? Item Enabled
                return (
                    // <li>
                    //     <ProjectLink route = {route} disabled = {disabled}>
                    //         <div className={`int-navItem ${activeClass}`}>
                    //             <span >
                    //                 {title}
                    //             </span>
                    //         </div>
                    //     </ProjectLink>
                    // </li>

                     <li onClick = {(e) => {props.onClick(route)}} disabled = {disabled} className = {`${disabled === true ? 'int-linkButton int-disabledLink' : 'int-linkButton'}`}>
                        <div className={`int-navItem ${activeClass}`}>
                            <span>
                                { title }
                            </span>
                        </div>
                    </li>

                );
            else 
                return (
                    // <li onClick = {(e) => {props.onClick(route)}} disabled = {disabled} className = "int-linkButton int-disabledLink">
                    <li disabled = {disabled} className = "int-linkButton int-disabledLink">
                        <div className={`int-navItem ${activeClass}`}>
                            <span>
                                { title }
                            </span>
                        </div>
                    </li>
                );
        }

        
    }


    
// -------------------------------------- 
// Define PropTypes 
// -------------------------------------- 
    NavItem.propTypes = {
        title: PropTypes.string,
        activeRoute : PropTypes.bool,
        route : PropTypes.string ,
        disabled : PropTypes.bool
    };


// --------------------------------------
// Export Component
// --------------------------------------
    export default NavItem;