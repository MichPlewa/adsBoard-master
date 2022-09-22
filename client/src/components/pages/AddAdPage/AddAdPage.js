import AdForm from '../../features/AdForm/AdForm';
import { addAd, fetchAds } from '../../../redux/adsRedux';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../../../config';

const AddAdPage = () => {
  const dispatch = useDispatch();
  let navigate = useNavigate();

  const handleSubmit = (ad) => {
    dispatch(addAd);
    const fd = new FormData();
    fd.append('title', ad.title);
    fd.append('userName', ad.userName);
    fd.append('description', ad.description);
    fd.append('date', ad.date);
    fd.append('image', ad.image);
    fd.append('price', ad.price);
    fd.append('location', ad.location);

    const options = {
      method: 'POST',
      credentials: 'include',
      body: fd,
      contentType: 'application/json',
    };

    fetch(`${API_URL}api/ads`, options);
    dispatch(fetchAds);

    navigate('/');
  };

  return <AdForm action={handleSubmit} actionText="Add ad" />;
};

export default AddAdPage;
