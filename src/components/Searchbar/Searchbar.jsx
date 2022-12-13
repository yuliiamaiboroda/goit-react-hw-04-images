import { Header, Form, Input, Button } from "./Searchbar.styled";
import PropTypes from 'prop-types';


export default function Searchbar ({onSubmit}){

   const onSubmitForm = e =>{
        e.preventDefault();
        const { search } = e.currentTarget.elements;
        onSubmit(search.value);
        e.currentTarget.reset();
    }
 
    return(
        <Header>
        <Form onSubmit={onSubmitForm}> 
         <Input
            name="search"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
          <Button type="submit" >
            <span >Search</span>
          </Button>    
        </Form>
      </Header>)
    
}



Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired
}