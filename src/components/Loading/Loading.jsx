import './loading.scss';
import LoadingImg from '../../assets/images/loading.svg';

export const Loading = ({ img }) => {
  return (
    <div className="loading">
      <img src={img ? img : LoadingImg} alt="Loading..." />
    </div>
  );
};
