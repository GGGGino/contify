import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import { useTranslation, Trans } from 'react-i18next';

export default function Home() {
  const [index, setIndex] = useState<number>(0);
  const { t } = useTranslation();

  const words: string[] = [t('Home.places.dinner'), t('Home.places.lunch'), t('Home.places.events')];

  useEffect(() => {
    const timer = setTimeout(() => {
      console.log('timer');
      setIndex((index + 1) % words.length);
    }, 2000);
    return () => clearTimeout(timer);
  }, [index, words.length]);

  return (
    <>
      <div className="position-relative overflow-hidden p-3 p-md-5 m-md-3 text-center bg-light">
          <div className="my-3 py-3">
              <h1 className="display-1">Contify</h1>
              <p className="lead">
                <Trans i18nKey="Home.slogan" /> {words[index]}
              </p>
          </div>
      </div>
      <div className="d-md-flex flex-md-equal w-100 ps-md-3">
        <div className="bg-light me-md-3 py-2 px-3 py-md-3 px-md-5 my-3 text-center overflow-hidden position-relative">
          <div className="my-3 py-3">
            <h2 className="display-5"><Trans i18nKey="Home.checkerTitle" /></h2>
            <p className="lead"><Trans i18nKey="Home.checkerBody" /></p>
            <Link className="btn btn-outline-secondary stretched-link" to="/admin-page">
              <Trans i18nKey="Home.goButton" />
            </Link>
          </div>
        </div>
        <div className="bg-dark me-md-3 py-2 px-3 py-md-3 px-md-5 my-3 text-center overflow-hidden text-white position-relative">
          <div className="my-3 p-3">
            <h2 className="display-5"><Trans i18nKey="Home.userTitle" /></h2>
            <p className="lead"><Trans i18nKey="Home.userBody" /></p>
            <Link className="btn btn-outline-secondary stretched-link" to="/user-page">
              <Trans i18nKey="Home.goButton" />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
