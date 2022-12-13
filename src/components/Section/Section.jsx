import {  SectionTag } from "./Section.styled";
import PropTypes from 'prop-types';


export default function Section  ({children}) {
        return(
            <SectionTag>
               {children}
            </SectionTag>
        )
}


Section.propTypes={
children: PropTypes.node.isRequired
}