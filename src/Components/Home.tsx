import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import { useTranslation, Trans } from 'react-i18next';
import {Col, Container, Row} from "react-bootstrap";
import Typist from 'react-typist';

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
      <div className="position-relative overflow-hidden p-3 p-md-5 mb-3 text-center bg-light">
          <div className="my-3 py-3">
              <h1 className="display-1">Contify</h1>
              <p className="lead">
                <Trans i18nKey="Home.slogan" /> {words[index]}
              </p>
          </div>
      </div>
      <Container fluid>
        <Row className="gx-3">
          <Col md={6} lg={6} className="text-center">
            <div className="bg-light px-3 py-5 position-relative">
              <h2 className="display-5"><Trans i18nKey="Home.checkerTitle" /></h2>
              <p className="lead"><Trans i18nKey="Home.checkerBody" /></p>
              <Link className="btn btn-outline-secondary stretched-link" to="/admin-page">
                <Trans i18nKey="Home.goButton" />
              </Link>
            </div>
          </Col>
          <Col md={6} lg={6} className="text-white text-center">
            <div className="bg-dark px-3 py-5 position-relative">
              <h2 className="display-5"><Trans i18nKey="Home.userTitle" /></h2>
              <p className="lead"><Trans i18nKey="Home.userBody" /></p>
              <Link className="btn btn-outline-secondary stretched-link" to="/user-page">
                <Trans i18nKey="Home.goButton" />
              </Link>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
}
