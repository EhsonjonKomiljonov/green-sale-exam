import './green-button.scss'

export const GreenButton = ({ text, type }) => {
  return (
    <button className="green-btn" type={type} >
      {text}
    </button>
  );
};
