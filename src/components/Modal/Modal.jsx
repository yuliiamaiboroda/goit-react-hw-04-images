import { createPortal } from "react-dom";
import { Backdrop, ModalContent, Img } from "./Modal.styled";
import PropTypes from 'prop-types';
import { useEffect } from "react";

const modalRoot = document.querySelector("#modal-root");

export default function  Modal ({closeModal ,currentImage: { largeImageURL, tags }}) {
useEffect(()=>{

    const closeByEsc = (e) => {
    if (e.code === "Escape") {
      closeModal();
    }
    };

    window.addEventListener("keydown", closeByEsc);
    
    return ()=>{window.removeEventListener("keydown", closeByEsc)} },
          [closeModal]);
 

const   handleBackdropClick= e =>{
    if(e.currentTarget===e.target){
       closeModal()
    }
  }
 
   
    return createPortal(
      <Backdrop onClick={handleBackdropClick}>
        <ModalContent>
          <Img src={largeImageURL} alt={tags} />
        </ModalContent>
      </Backdrop>,
      modalRoot,
    );
  }


Modal.propTypes = {
  currentImage: PropTypes.shape({
    largeImageURL: PropTypes.string.isRequired,
    tags:PropTypes.string.isRequired}
  ).isRequired,
  closeModal: PropTypes.func.isRequired
}