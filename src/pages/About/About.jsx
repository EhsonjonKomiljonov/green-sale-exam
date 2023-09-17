import { Header } from '../../components/Header/Header';
import { Footer } from '../../components/Footer/Footer';
import './about.scss';
import { Link } from 'react-router-dom';

export const About = () => {
  return (
    <>
      <Header />
      <section className="about">
        <div className="container">
          <div className="about__inner">
            <h2>Biz Haqimizda</h2>
            <p className="about__desc">
              Green Sale - bu, yerli fermerlar va iste'molchilarni
              birlashtiradigan onlayn bozor. Bizning saytimiz orqali siz turli
              meva-sabzavotlar va qishloq xo'jaligi mahsulotlarini sotib
              olishingiz va sotishingiz mumkin.
            </p>
            <h3 className="about__list-title">
              Saytda ro'yxatdan o'tgan foydalanuvchilar ikkita turdagi e'lon{' '}
              <br />
              joylashtirishlari mumkin:
            </h3>
            <ul>
              <li>
                <p>
                  Sotib olish uchun - ushbu e'lon orqali siz qaysi mahsulotni
                  qanday miqdorda sotib olishni istashingizni bildirasiz.
                </p>
              </li>
              <li>
                <p>
                  Sotish uchun - ushbu e'lon orqali siz qanday mahsulotni qancha
                  narxda sotmoqchi ekanligingizni e'lon qilasiz.
                </p>
              </li>
            </ul>
            <h3 className="about__user-title">Foydalanuvchilar:</h3>
            <p className="about__user-desc">
              Saytga kirgan har bir foydalanuvchi barcha joylashtirilgan
              e'lonlarni va izohlarni ko'rish imkoniyatiga ega. Shuningdek,
              e'lon egasi bilan bog'lanish uchun uning telefon raqamini ko'rishi
              mumkin.
            </p>
            <p className="about__user-desc">
              Ammo saytga e'lon joylashtirish va qandaydur e'longa izoh
              qoldirish uchun siz avval ro'yxatdan o'tishingiz lozim. Ro'yxatdan
              o'tish esa bepul va oddiy!
              <Link to="/register"> Ro'yxatdan o'tish</Link>
            </p>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};
