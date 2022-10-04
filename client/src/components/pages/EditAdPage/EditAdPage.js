import AdForm from '../../features/AdForm/AdForm';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getAdById, editAd, fetchAds } from '../../../redux/adsRedux';
import { useParams, useNavigate } from 'react-router-dom';
import { API_URL } from '../../../config';

const EditAdPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const adData = useSelector((state) => getAdById(state, id));

  const handleSubmit = (ad) => {
    dispatch(editAd({ ...adData, id }));

    const fd = new FormData();
    fd.append('title', ad.title);
    fd.append('userName', ad.userName);
    fd.append('description', ad.description);
    fd.append('date', ad.date);
    fd.append('image', ad.image);
    fd.append('price', ad.price);
    fd.append('location', ad.location);

    const options = {
      method: 'PUT',
      credentials: 'include',
      body: fd,
      contentType: 'application/json',
    };

    fetch(`${API_URL}api/ads`, options).then(() => {
      dispatch(fetchAds);
      navigate('/');
    });
  };

  useEffect(() => {
    dispatch(fetchAds());
  }, [dispatch]);

  if (!adData) {
    return <h3>Loading</h3>;
  } else {
    return (
      <AdForm
        action={handleSubmit}
        actionText="Edit ad"
        title={adData.title}
        username={adData.username}
        description={adData.description}
        date={adData.date}
        image={adData.image}
        price={adData.price}
        location={adData.location}
      />
    );
  }
};

export default EditAdPage;
