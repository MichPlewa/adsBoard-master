import { Row, Button, Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getAdBySearch } from '../../../redux/adsRedux';

const SearchForm = () => {
  const dispatch = useDispatch();
  const [searchInput, setSearchInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(getAdBySearch(searchInput));
  };

  return (
    <Form className="mx-auto m-3" onSubmit={handleSubmit}>
      <Row>
        <Form.Group className="mb-3 mr-3" controlId="formSearch">
          <Form.Control
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Search..."
          />
        </Form.Group>

        <Button className="h-75" type="submit">
          <FontAwesomeIcon icon={faSearch} />
        </Button>
      </Row>
    </Form>
  );
};

export default SearchForm;
