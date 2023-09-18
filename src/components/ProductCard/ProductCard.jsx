import { useContext, useEffect, useRef, useState } from 'react';
import { LoaderImageContext } from '../../context/LoaderImage';
import Loader from '../../assets/images/img-loader.svg';
import Placeholder from '../../assets/images/placeholder-product.png';
import './product-card.scss';
import { Link, useNavigate } from 'react-router-dom';
import { API } from '../../API/api';
import editicon from '../../assets/images/edit_icon.svg';
import deleteicon from '../../assets/images/delete_icon.svg';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { useMutation } from 'react-query';
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
    favorite,
  } = obj;
  const sellered = false;

  const parts = created_at ? created_at.split('T') : updated_at.split('T');
  const dateParts = parts[0].split('-');
  const timeParts = parts[1].split(':');

  const day = dateParts[2];
  const month = dateParts[1];
  const hour = timeParts[0];
  const minute = timeParts[1];

  const [productType, setProductType] = useState('no');
  const { isLoadingImage, setIsLoadingImage } = useContext(LoaderImageContext);
  const [placeholderImg, setPlaceholderImg] = useState(false);

  const onLoadImage = () => {
    setIsLoadingImage(false);
  };

  const onErrorImage = () => {
    setPlaceholderImg(true);
  };
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

  const editVacancyCheck = async (e) => {
    const data = await API.getSingleSellProduct(e.target.id);
    const data2 = await API.getSingleBuyProduct(e.target.id);

    if (data.data?.data?._id) {
      setProductType('seller');
    }
    if (data2.data?.data?._id) {
      setProductType('buyer');
    }
  };

  const validationSchema = Yup.object({
    name: Yup.string(),
    description: Yup.string(),
    price: Yup.number('Iltimos son kiriting !!!').typeError(
      'Iltimos Son kiriting !!!'
    ),
    capacity: Yup.number().typeError("Iltimos sig'imga son kiriting !!!"),
    capacityMeasure: Yup.string(),
    type: Yup.string(),
  });
  const filesRef = useRef();

  const updateSellerRequest = async (formData) => {
    const data = await API.updateSeller(_id, formData).catch((err) =>
      toast.error("Ups serverda qandaydur xatolik qaytadan urinib ko'ring!")
    );

    if (data.data?.data?._id) {
      toast.success('Vacansiya muvaffaqiyatli ozgartirildi');
      return setTimeout(() => {
        location.reload();
      }, 1000);
    } else {
      toast.error(data.data?.message);
    }
    console.log(data);
  };

  const initialValues = {
    name: name,
    description: description,
    price: obj.price,
    capacity: obj.capacity,
    capacityMeasure: obj.capacityMeasure,
    type: obj.type,
  };

  const UpdateSellerSubmit = (values) => {
    const formData = new FormData();
    const valueFormData = {
      ...values,
      imgLink: [...filesRef?.current?.files],
    };

    if (valueFormData) {
      formData.append('name', valueFormData.name);
      formData.append('price', valueFormData.price);
      formData.append('capacity', valueFormData.capacity);
      formData.append('capacityMeasure', valueFormData.capacityMeasure);
      formData.append('type', valueFormData.type);
      formData.append('description', valueFormData.description);
      valueFormData.imgLink.forEach((file) => formData.append('imgLink', file));

      updateSellerRequest(formData);
    }
  };

  const handleFiles = (e) => {
    const files = e.target.files;
    if (files.length == 0) {
      return toast.error('Iltimos rasmni tanlang');
    }
    if (files.length > 5) {
      toast.error('5ta gacha rasm tanlash mumkun!');
      e.target.value = null;
      console.log(e.target.files);
    }
  };

  //     buyer

  const validationSchemaBuy = Yup.object({
    name: Yup.string(),
    description: Yup.string(),
    price: Yup.number('Iltimos son kiriting !!!').typeError(
      'Iltimos Son kiriting !!!'
    ),
    capacity: Yup.number().typeError("Iltimos sig'imga son kiriting !!!"),
    capacityMeasure: Yup.string(),
    type: Yup.string(),
  });

  const updateBuyerRequest = async (values) => {
    const data = await API.updateBuyer(_id, values).catch((err) =>
      toast.error("Ups serverda qandaydur xatolik qaytadan urinib ko'ring!")
    );

    if (data.data?.data?._id) {
      toast.success('Vacansiya muvaffaqiyatli ozgartirildi');
      return setTimeout(() => {
        location.reload();
      }, 1000);
    } else {
      toast.error(data.data?.message);
    }
  };

  const initialValuesBuy = {
    name: name,
    description: description,
    capacity: obj.capacity,
    capacityMeasure: obj.capacityMeasure,
    type: obj.type,
  };

  const UpdateBuyerSubmit = (values) => {
    if (values) {
      updateBuyerRequest(values);
    }
  };

  const { mutate: likeMutate } = useMutation('liked-post', API.likedPost, {
    onSuccess: (data) => {
      if (data.data.message == 'Unauthorized') {
        navigate('/login');
      }
    },
    onError: (err) => {
      toast.error(
        "Ups serverda xatolik saytni yangilab qaytadan urinib ko'ring!"
      );
    },
  });

  const { mutate: deleteLikeMutate } = useMutation(
    'liked-post',
    API.deleteLikedPost,
    {
      onSuccess: (data) => {},
      onError: (err) => {
        toast.error(
          "Ups serverda xatolik saytni yangilab qaytadan urinib ko'ring!"
        );
      },
    }
  );

  const likedPost = (evt) => {
    if (evt.target.checked) {
      likeMutate(evt.target.id);
    } else {
      deleteLikeMutate(evt.target.id);
    }
  };

  return (
    <div className={!sellered ? 'product-card' : 'd-none'}>
      <Link
        className="product-card-link"
        to={
          '/single-product/' + _id + '$type=' + (obj.price ? 'seller' : 'buyer')
        }
      >
        <img
          onLoad={onLoadImage}
          onError={onErrorImage}
          className="product__card__img"
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
        <div className="product-card__body">
          <div className="product-card__heading">
            <span className={sellered ? 'sellered' : ''}>
              {sellered ? 'Kelishilgan' : 'Yangi'}
            </span>
            <time className="product-card__time" dateTime={created_at || ''}>
              <i className="fa-solid fa-clock"></i>
              {`${month}-${day} ${+hour + 5}:${minute}`}
            </time>
          </div>
          <h3 className="product-card__title">{name.slice(0, 20)}...</h3>
          <p className="product-card__desc">{description.slice(0, 40)}...</p>
          <p className="product-card__region">
            <i className="fa-solid fa-truck"></i>
            Manzil: {region.slice(0, 17)}, {district.slice(0, 9)}...
          </p>
        </div>
      </Link>
      <label className="like-container">
        <input
          type="checkbox"
          id={_id}
          defaultChecked={favorite ? 'checked' : ''}
          onChange={(evt) => likedPost(evt)}
        />
        <div className="checkmark">
          <svg viewBox="0 0 256 256">
            <rect fill="none" height="256" width="256"></rect>
            <path
              d="M224.6,51.9a59.5,59.5,0,0,0-43-19.9,60.5,60.5,0,0,0-44,17.6L128,59.1l-7.5-7.4C97.2,28.3,59.2,26.3,35.9,47.4a59.9,59.9,0,0,0-2.3,87l83.1,83.1a15.9,15.9,0,0,0,22.6,0l81-81C243.7,113.2,245.6,75.2,224.6,51.9Z"
              strokeWidth="20px"
              stroke="#4e4c4c"
              fill="none"
            ></path>
          </svg>
        </div>
      </label>

      {edit == 'true' ? (
        <>
          <button
            type="button"
            className="btn btn-warning   ms-2 mb-2 w-50 edit-btn"
            data-bs-toggle="modal"
            onClick={editVacancyCheck}
            data-bs-target={`#${_id}_edit`}
            ref={filesRef}
            id={_id}
          >
            <img width="28px" height="28px" src={editicon} id={_id} alt="..." />
          </button>
          <div
            className="modal fade"
            id={`${_id}_edit`}
            data-bs-backdrop="static"
            data-bs-keyboard="false"
            tabindex="-1"
            aria-labelledby="staticBackdropLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h1 className="modal-title fs-5" id="staticBackdropLabel">
                    PRODUCTNI O'ZGARTIRISH
                  </h1>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">
                  {productType != 'no' && productType == 'seller' ? (
                    <Formik
                      initialValues={initialValues}
                      validationSchema={validationSchema}
                      onSubmit={UpdateSellerSubmit}
                    >
                      <Form className="d-flex gap-3 flex-wrap flex-column">
                        <div className="sell_vacancy__input__box">
                          <input
                            type="file"
                            accept="image/*"
                            className="form-control"
                            placeholder="Mahsulot nomini yozing"
                            multiple
                            onChange={handleFiles}
                            ref={filesRef}
                          />
                        </div>
                        <div className="sell__vacancy__input__box">
                          <label htmlFor="name">Mahsulot nomi</label>
                          <Field
                            type="text"
                            className="form-control"
                            id="name"
                            placeholder="Mahsulot nomini yozing"
                            name="name"
                          />
                        </div>
                        <div className="sell__vacancy__input__box">
                          <label htmlFor="price">Mahsulot narxi</label>
                          <Field
                            type="number"
                            className="form-control"
                            id="price"
                            placeholder="Mahsulot narxini yozing"
                            name="price"
                          />
                        </div>
                        <div className="sell__vacancy__input__box">
                          <label htmlFor="capacity">Mahsulot sig'imi</label>
                          <Field
                            type="number"
                            className="form-control"
                            id="capacity"
                            placeholder="Mahsulot sig'imini yozing"
                            name="capacity"
                          />
                        </div>
                        <div className="sell__vacancy__input__box">
                          <label htmlFor="capacityMeasure">
                            Mahsulot sig'im tipi
                          </label>
                          <Field
                            type="text"
                            className="form-control"
                            id="capacityMeasure"
                            placeholder="Mahsulot Sigim tipini yozing (tonna, kilogram, litr)"
                            name="capacityMeasure"
                          />
                        </div>
                        <div className="sell__vacancy__input__box">
                          <label htmlFor="type">Mahsulot tipi</label>
                          <Field
                            type="text"
                            className="form-control"
                            id="type"
                            placeholder="Mahsulot tipini yozing"
                            name="type"
                          />
                        </div>
                        <div className="sell__vacancy__input__box">
                          <label htmlFor="capacity">Izoh</label>
                          <Field
                            type="text"
                            className="form-control"
                            id="description"
                            placeholder="Izohni yozing"
                            name="description"
                          />
                        </div>
                        <button
                          type="submit"
                          data-bs-dismiss="modal"
                          id={_id}
                          className="btn btn-success text-white w-25"
                        >
                          Yuborish
                        </button>
                      </Form>
                    </Formik>
                  ) : productType == 'buyer' ? (
                    <Formik
                      initialValues={initialValuesBuy}
                      validationSchema={validationSchemaBuy}
                      onSubmit={UpdateBuyerSubmit}
                    >
                      <Form className="d-flex gap-3 flex-wrap flex-column">
                        <div className="sell__vacancy__input__box">
                          <Field
                            type="text"
                            className="form-control"
                            id="name"
                            placeholder="Mahsulot nomini yozing"
                            name="name"
                          />
                        </div>
                        <div className="sell__vacancy__input__box">
                          <Field
                            type="number"
                            className="form-control"
                            id="price"
                            placeholder="Mahsulot narxini yozing"
                            name="price"
                          />
                        </div>
                        <div className="sell__vacancy__input__box">
                          <Field
                            type="number"
                            className="form-control"
                            id="capacity"
                            placeholder="Mahsulot sig'imini yozing"
                            name="capacity"
                          />
                        </div>
                        <div className="sell__vacancy__input__box">
                          <Field
                            type="text"
                            className="form-control"
                            id="capacityMeasure"
                            placeholder="Mahsulot Sigim tipini yozing (tonna, kilogram, litr)"
                            name="capacityMeasure"
                          />
                        </div>
                        <div className="sell__vacancy__input__box">
                          <Field
                            type="text"
                            className="form-control"
                            id="type"
                            placeholder="Mahsulot tipini yozing"
                            name="type"
                          />
                        </div>
                        <div className="sell__vacancy__input__box">
                          <Field
                            type="text"
                            className="form-control"
                            id="description"
                            placeholder="Izohni yozing"
                            name="description"
                          />
                        </div>
                        <button
                          type="submit"
                          data-bs-dismiss="modal"
                          id={_id}
                          className="btn btn-success text-white w-25"
                        >
                          Yuborish
                        </button>
                      </Form>
                    </Formik>
                  ) : (
                    ''
                  )}
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Orqaga
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        ''
      )}

      {del == 'true' ? (
        <>
          <button
            type="button"
            className="btn btn-danger ms-2 mb-2 w-50 delete-btn"
            data-bs-toggle="modal"
            data-bs-target={`#${_id}_del`}
          >
            <img width="28px" height="28px" src={deleteicon} alt="" />
          </button>
          <div
            className="modal fade"
            id={`${_id}_del`}
            data-bs-backdrop="static"
            data-bs-keyboard="false"
            tabindex="-1"
            aria-labelledby="staticBackdropLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h1 className="modal-title fs-5" id="staticBackdropLabel">
                    PRODUCTNI O'CHIRISH
                  </h1>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">
                  SIZ ANIQ PRODUCTINGIZNI OCHIRMOQCHIMISIZ ?
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Orqaga
                  </button>
                  <button
                    type="button"
                    data-bs-dismiss="modal"
                    id={_id}
                    onClick={deleteVacancy}
                    className="btn btn-danger"
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
