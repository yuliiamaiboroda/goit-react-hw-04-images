import React, { useEffect , useState, useCallback } from "react";
import Searchbar from "./Searchbar/Searchbar";
import ImageGalleryItem from "./ImageGalleryItem/ImageGalleryItem";
import ImageGallery from "./ImageGallery/ImageGallery";
import Modal from "./Modal/Modal";
import Button from "./Button/Button";
import { ColorRing } from 'react-loader-spinner';
import Section from "./Section/Section";
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { useApi } from "hooks/useApi";

const STATUSES = {
  IDLE: 'IDLE',
  PENDING: 'PENDING',
  SUCCESS: 'SUCCESS',
  ERROR: 'ERROR',
};


export const App = () => {

const [query, setQuery]= useState(null);
const [currentImage, setcurrentImage] = useState(null);
const [page, setPages]= useState(1);
const [images, setImages] = useState([]);
const [status, setStatus] = useState(false);
const methods = useApi();

const fetchGallary = useCallback(async () => {
  setStatus(STATUSES.PENDING);
  await methods
    .fetchImages(query, page).then(({data}) => {
      setImages(images=>[...images, ...data.hits]);
      setStatus(STATUSES.SUCCESS);

      if(!data.hits.length){
          Notify.failure(`Ooops, there are no images when searching for ${query}`);
          setStatus(STATUSES.ERROR);}

    }).catch(err=>{ setStatus(STATUSES.ERROR);
          console.log(err);});
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, [query, page])

useEffect(()=>{
  if (!query){
    return;
  }
  fetchGallary() 

}, [query, fetchGallary])


const closeModal = () => {
  setcurrentImage(null)
};

const loadMore = () => {
  setPages(page=>page + 1);
};

const onSubmit = (imgName) =>{
  if(query!==imgName){
  setQuery(imgName);
  setPages(1);
  setImages([])
  }
}

return(
<>
<Searchbar onSubmit={onSubmit}/>  
     {images.length> 0&&(
     <Section> 
        <ImageGallery>
        <ImageGalleryItem images={images} onClickOnImage={setcurrentImage}/>
        </ImageGallery>
       <Button text="Load more" handleClick={loadMore} />
          {currentImage && (
                  <Modal currentImage={currentImage} closeModal={closeModal} />
                )}</Section>)}


      {status===STATUSES.PENDING&&(<><ColorRing
      visible={true}
      height="100"
      width="100"
      ariaLabel="blocks-loading"
      wrapperStyle={{
        position:"fixed",
        top: "50%",
        left: "50%",
        transform: "translateX(-50%) translateY(-50%)", }}
      wrapperClass="blocks-wrapper"
      colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
    /></>)}

   </>
  )
}
