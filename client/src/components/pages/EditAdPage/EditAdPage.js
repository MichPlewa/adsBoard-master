import AdForm from '../../features/AdForm/AdForm';
import { useDispatch, useSelector } from 'react-redux';
import { getAdById, editAd } from '../../../redux/adsRedux';
import { useParams } from 'react-router-dom';

const EditAdPage = () => {
  const dispatch = useDispatch();
  const { adId } = useParams();
  const adData = useSelector((state) => getAdById(state, adId));

  const handleSubmit = () => {
    dispatch(editAd({ ...adData, adId }));
  };

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
};

export default EditAdPage;
