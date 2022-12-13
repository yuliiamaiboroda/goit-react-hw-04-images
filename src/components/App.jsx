import React, { useEffect , useState } from "react";
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



useEffect(()=>{
  const getImagesArr = async() =>{
    setStatus(STATUSES.PENDING)
    try {
      const {data} = await methods.fetchImages(query, page);
      setStatus(STATUSES.SUCCESS);
      setImages(images=>[...images, ...data.hits]);
      
      if(!data.hits.length){
          Notify.failure(`Ooops, there are no images when searching for ${query}`)
          setStatus(STATUSES.ERROR)

    }}
    catch(err){
      setStatus(STATUSES.ERROR)
      console.log(err);
    }
  };
  if (!query){
    return;
  }else{getImagesArr()} 

}, [query, page ])


const closeModal = () => {
  setcurrentImage(null)
};

const loadMore = () => {
  setPages(page=>page + 1);
};

const onSubmit = (query) =>{
  setQuery(query);
  setPages(1);
  setImages([])
}

return(
<>
<Searchbar onSubmit={onSubmit}/>  
     {images.length> 0&&(
     <Section> 
        <ImageGallery>
        <ImageGalleryItem images={images} onClickOnImage={setcurrentImage}/>
        </ImageGallery>
       { <Button text="Load more" handleClick={loadMore} />}
          {currentImage && (
                  <Modal currentImage={currentImage} closeModal={closeModal} />
                )}</Section>)}


      {status==='PENDING'&&(<><ColorRing
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
