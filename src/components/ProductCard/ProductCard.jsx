import { useContext, useEffect, useRef, useState } from 'react';
import { LoaderImageContext } from '../../context/LoaderImage';
import Loader from '../../assets/images/img-loader.svg';
import Placeholder from '../../assets/images/placeholder-product.png';
import './product-card.scss';
import { Link, useNavigate } from 'react-router-dom';
import { API } from '../../API/api';
// import { Link } from 'react-router-dom';
const host = 'http://localhost:9000';

export const ProductCard = ({ obj, edit, del }) => {
  const {
    name,
    description,
    imgLink,
    created_at,
    region,
    district,
    _id,
    updated_at = null,
  } = obj;
  const sellered = false;

  const parts = created_at ? created_at.split('T') : updated_at.split('T');
  const dateParts = parts[0].split('-');
  const timeParts = parts[1].split(':');

  const day = dateParts[2];
  const month = dateParts[1];
  const hour = timeParts[0];
  const minute = timeParts[1];

  const { isLoadingImage, setIsLoadingImage } = useContext(LoaderImageContext);
  const [placeholderImg, setPlaceholderImg] = useState(false);

  const onLoadImage = () => {
    setIsLoadingImage(false);
  };

  const onErrorImage = () => {
    setPlaceholderImg(true);
  };

  // const validationSchema = Yup.object({
  //   name: Yup.string().required('Mahsulot nomini kiritish majburiy !!!'),
  //   description: Yup.string().required('Izoh kiritish majburiy !!!'),
  //   price: Yup.number('Iltimos son kiriting !!!')
  //     .typeError('Iltimos Son kiriting !!!')
  //     .required('Narxni kiritish majburiy !!!'),
  //   capacity: Yup.number()
  //     .typeError("Iltimos sig'imga son kiriting !!!")
  //     .required("sig'imni yozish majburiy !!!"),
  //   capacityMeasure: Yup.string().required(
  //     "sig'im tipini  kiritsh majburiy !!!"
  //   ),
  //   type: Yup.string().required('Mahsulot tipini kiriting !!!'),
  // });

  // const initialValues = {
  //   name: '',
  //   description: '',
  //   price: '',
  //   capacity: '',
  //   capacityMeasure: '',
  //   type: '',
  // };
  const navigate = useNavigate();

  const deleteVacancy = async (e) => {
    const data = await API.deleteSeller(e.target.id);
    const data2 = await API.deleteBuyer(e.target.id);
    if (data.data.message == 'deleted') {
      location.reload();
    } else if (data2.data.message == 'deleted') {
      location.reload();
    }
  };

  return (
    <div className={!sellered ? 'product-card' : 'd-none'}>
      <Link
        className='product-card-link'
        to={
          '/single-product/' + _id + '$type=' + (obj.price ? 'seller' : 'buyer')
        }
      >
        <img
          onLoad={onLoadImage}
          onError={onErrorImage}
          style={{
            display: isLoadingImage ? 'block' : '',
            width: isLoadingImage ? '200px' : '',
            height: isLoadingImage ? 'auto' : '',
            margin: isLoadingImage ? '0 auto' : '',
          }}
          src={
            isLoadingImage
              ? Loader
              : placeholderImg != false
              ? Placeholder
              : typeof imgLink == 'object'
              ? host + imgLink[0]
              : host + imgLink
          }
          alt={name}
        />
        <div className='product-card__body'>
          <div className='product-card__heading'>
            <span className={sellered ? 'sellered' : ''}>
              {sellered ? 'Kelishilgan' : 'Yangi'}
            </span>
            <time
              className='product-card__time'
              dateTime={created_at || ''}
            >
              <i className='fa-solid fa-clock'></i>
              {`${month}-${day} ${hour}:${minute}`}
            </time>
          </div>
          <h3 className='product-card__title'>{name}</h3>
          <p className='product-card__desc'>{description.slice(0, 40)}...</p>
          <p className='product-card__region'>
            <i className='fa-solid fa-truck'></i>
            Manzil: {region}, {district.slice(0, 9)}...
          </p>
        </div>
      </Link>
      {/* {edit == 'true' ? (
        <>
          <button
            type='button'
            className='btn btn-warning ms-2 mb-2 w-50 edit-btn'
            data-bs-toggle='modal'
            data-bs-target='#staticBackdrop'
          >
            EDIT
          </button>
          <div
            className='modal fade'
            id='staticBackdrop'
            data-bs-backdrop='static'
            data-bs-keyboard='false'
            tabindex='-1'
            aria-labelledby='staticBackdropLabel'
            aria-hidden='true'
          >
            <div className='modal-dialog'>
              <div className='modal-content'>
                <div className='modal-header'>
                  <h1
                    className='modal-title fs-5'
                    id='staticBackdropLabel'
                  >
                    EDIT PRODUCT
                  </h1>
                  <button
                    type='button'
                    className='btn-close'
                    data-bs-dismiss='modal'
                    aria-label='Close'
                  ></button>
                </div>
                <div className='modal-body'>
                  <Formik initialValues={initialValues}>
                    <Form>
                      <Field></Field>
                    </Form>
                  </Formik>
                </div>
                <div className='modal-footer'>
                  <button
                    type='button'
                    className='btn btn-secondary'
                    data-bs-dismiss='modal'
                  >
                    Close
                  </button>
                  <button
                    type='button'
                    className='btn btn-primary'
                  >
                    Understood
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        ''
      )} */}

      {del == 'true' ? (
        <>
          <button
            type='button'
            className='btn btn-danger ms-2 mb-2 w-50 edit-btn'
            data-bs-toggle='modal'
            data-bs-target={`#${_id}`}
          >
            O'CHIRISH
          </button>
          <div
            className='modal fade'
            id={`${_id}`}
            data-bs-backdrop='static'
            data-bs-keyboard='false'
            tabindex='-1'
            aria-labelledby='staticBackdropLabel'
            aria-hidden='true'
          >
            <div className='modal-dialog'>
              <div className='modal-content'>
                <div className='modal-header'>
                  <h1
                    className='modal-title fs-5'
                    id='staticBackdropLabel'
                  >
                    PRODUCTNI O'CHIRISH
                  </h1>
                  <button
                    type='button'
                    className='btn-close'
                    data-bs-dismiss='modal'
                    aria-label='Close'
                  ></button>
                </div>
                <div className='modal-body'>
                  SIZ ANIQ PRODUCTINGIZNI OCHIRMOQCHIMISIZ ?
                </div>
                <div className='modal-footer'>
                  <button
                    type='button'
                    className='btn btn-secondary'
                    data-bs-dismiss='modal'
                  >
                    Orqaga
                  </button>
                  <button
                    type='button'
                    data-bs-dismiss='modal'
                    id={_id}
                    onClick={deleteVacancy}
                    className='btn btn-danger'
                  >
                    Ha
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        ''
      )}
    </div>
  );
};
