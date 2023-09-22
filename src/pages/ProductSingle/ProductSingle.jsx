import React, { useContext, useEffect, useRef, useState } from 'react';
import { useMutation } from 'react-query';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Slider from 'react-slick';
import { toast } from 'react-toastify';
import { API } from '../../API/api';
import { Footer } from '../../components/Footer/Footer';
import { Header } from '../../components/Header/Header';
import { Loading } from '../../components/Loading/Loading';
import { LoadingContext } from '../../context/LoadingContext';
import Placeholder from '../../assets/images/placeholder-product.png';
import { Comment } from '../../components/Comment/Comment';
import Compare from '../../assets/images/compare.png';
import './product-single.scss';

export const ProductSingle = () => {
  const params = useParams();
  const id = params?.id.split('$')[0];
  const type = params?.id.split('$type=')[1];
  const [data, setData] = useState([]);
  const [comparedProduct, setComparedProduct] = useState(
    JSON.parse(localStorage.getItem('compare-products')) || []
  );
  const { isLoading, setIsLoading } = useContext(LoadingContext);
  const navigate = useNavigate();
  const host = import.meta.env.VITE_REACT_APP_HOST;
  const admin_sec_key = import.meta.env.VITE_REACT_APP_ADMIN_SECRET_KEY;
  const inputCheckRef = useRef();

  window.scrollTo({
    top: 140,
  });

  const { mutate: buyMutate } = useMutation(
    'get-single-buy-product',
    API.getSingleBuyProduct,
    {
      onSuccess: (data) => {
        if (data.data.status == 200) {
          setData(data.data.data);
          setIsLoading(false);
        }
      },
      onError: (err) => {
        toast.error(`Ups serverda qandaydur xatolik!
        Saytni yangilang.`);
      },
      retry: 1,
    }
  );

  const { mutate: sellMutate } = useMutation(
    'get-single-sell-product',
    API.getSingleSellProduct,
    {
      onSuccess: (data) => {
        if (data.data.status == 200) {
          setData(data.data.data);
          setIsLoading(false);
        }
      },
      onError: (err) => {
        toast.error(`Ups serverda qandaydur xatolik!
        Saytni yangilang.`);
      },
      retry: 1,
    }
  );

  const parts = data?.created_at ? data?.created_at.split('T') : '';

  let day;
  let month;
  let hour;
  let minute;

  if (data?.created_at) {
    const dateParts = parts[0]?.split('-');
    const timeParts = parts[1]?.split(':');

    day = dateParts[2];
    month = dateParts[1];
    hour = timeParts[0];
    minute = timeParts[1];
  }

  useEffect(() => {
    if (type == 'seller') {
      setIsLoading(true);
      sellMutate(id);
    } else {
      setIsLoading(true);
      buyMutate(id);
    }
  }, [type, id]);

  useEffect(() => {
    if (data.favorite) {
      inputCheckRef.current.checked = true;
    }
  }, [data?.favorite]);

  const settings = {
    className: 'slider',
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: false,
  };

  const { mutate: deleteProductMutate } = useMutation(
    'delete-product',
    API.deleteSellProduct,
    {
      onSuccess: (data) => {
        if (data.data.status == 200) {
          navigate('/admin');
        }
      },
      onError: (err) => {
        toast.error(`Ups Serverda qandaydur xatolik!
        saytni yangilab, qaytadan urunib ko'ring!`);
      },
      retry: 1,
    }
  );

  const { mutate: deleteBuyProductMutate } = useMutation(
    'delete-product',
    API.deleteBuyProduct,
    {
      onSuccess: (data) => {
        if (data.data.status == 200) {
          navigate('/admin/seller');
        }
      },
      onError: (err) => {
        toast.error(`Ups Serverda qandaydur xatolik!
        saytni yangilab, qaytadan urunib ko'ring!`);
      },
    }
  );

  const deleteProduct = (evt) => {
    if (type == 'seller') deleteProductMutate(evt.target.id);
    else deleteBuyProductMutate(evt.target.id);
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
    <>
      <Header />
      <section className="single-product">
        <h2 hidden>User Single</h2>
        <div className="container">
          <div className="single-product__inner row">
            <div className="single-product__left col-7">
              <Slider {...settings}>
                {data?.imgLink?.length ? (
                  data.imgLink.map((image) => (
                    <img
                      className="single-carousel__img"
                      key={image}
                      src={host + image}
                    />
                  ))
                ) : (
                  <img className="single-carousel__img" src={Placeholder} />
                )}
              </Slider>
            </div>
            <div className="single-product__right col-5">
              <div className="single-product__user user">
                <h3>
                  {data?.user_ref_id?.first_name} {data?.user_ref_id?.last_name}
                </h3>
                <Link
                  className="text-dark text-opacity-75 text-decoration-underline"
                  to={`/user-profile/${data?.user_ref_id?._id}`}
                >
                  Profilni ko'rish
                </Link>
              </div>
              <div className="single-product__product product">
                <div className="position-relative">
                  <time dateTime={data?.created_at || ''}>
                    <i className="fa-solid fa-clock"></i>
                    Joylangan: {`${month}-${day} ${hour}:${minute}`}
                  </time>
                  <label className="like-container">
                    <input
                      type="checkbox"
                      id={data._id}
                      ref={inputCheckRef}
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
                  <button
                    className="btn position-absolute py-2 px-2 pb-1 compare"
                    style={{
                      width: 40,
                      height: 40,
                      right: '5px',
                      bottom: '-100px',
                      border: '1px solid #646262',
                      backgroundImage: `url(${Compare})`,
                      backgroundRepeat: 'no-repeat',
                      backgroundPosition: 'center',
                      backgroundSize: '28px',
                    }}
                    onClick={async (evt) => {
                      if (comparedProduct.some((item) => item === data._id)) {
                        toast.info(
                          "Bu vakansiya avval solishtirish uchun qo'shilgan!"
                        );
                      } else if (comparedProduct.length == 3) {
                        toast.info(
                          "Solishtirish uchun eng ko'pi 3 ta vakansiya qo'shish mumkin!"
                        );
                      } else {
                        const updatedComparedProduct = [
                          ...comparedProduct,
                          data._id,
                        ];
                        setComparedProduct(updatedComparedProduct);
                        await localStorage.setItem(
                          'compare-products',
                          JSON.stringify(updatedComparedProduct)
                        );
                        toast.info("Vakansiya solishtirish uchun qo'shildi!");
                      }
                    }}
                  ></button>
                </div>
                <h3>
                  {data.name}, {data.type}
                </h3>
                <p className="product__desc">{data.description}.</p>
                {type == 'seller' ? (
                  <p className="product__price">Narxi: {data.price} so'm</p>
                ) : (
                  ''
                )}
                <p>
                  Hajmi: {data.capacity} {data.capacityMeasure}
                </p>
              </div>
              <div className="single-product__user single-user">
                <p className="single-user__address">
                  Manzil: {data.region}, {data.district}
                </p>
                <a
                  href={`tel:${data.contact}`}
                  className="single-user__contact"
                >
                  Bog'lanish: {data.contact}
                </a>
              </div>
              {admin_sec_key == localStorage.getItem('admin') && (
                <>
                  <div className="pt-5 mt-5">
                    <a className="btn btn-danger" href="#delete_product">
                      DELETE PRODUCT
                    </a>
                  </div>

                  <div id="delete_product">
                    <a href="#"></a>
                    <div>
                      <h3>Aniq o'chirmoqchimisiz ?</h3>

                      <button
                        id={data._id}
                        className="btn btn-danger d-block mx-auto"
                        onClick={(evt) => deleteProduct(evt)}
                      >
                        O'CHIRISH
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
        <Comment obj={data} />
      </section>
      <Footer />

      {isLoading ? <Loading /> : ''}
    </>
  );
};
