import React from "react";
import {UserConfiguration} from "../interfaces/UserConfiguration";
import {Button} from "react-bootstrap";
import utils from "../utils";

import '../creditCard.css';

interface CreditCardProps {
  config: UserConfiguration,
  onEdit: () => any,
  onDelete: () => any,
  className?: string,
  gradients?: string[]
}

export default function CreditCard(props: CreditCardProps) {
  const gradients = props.gradients || utils.getColorCard(0);
  const alreadyPutted = props.config.alreadyPutted || 0;
  const maxToPut = props.config.maxToPut === null ? '-' : (props.config.maxToPut / 100).toFixed(2);
  const diffToPut = props.config.alreadyPutted - props.config.toPut!;
  const toPutDom = props.config.toPut
    ? <>
        <span className="card__label">{diffToPut > 0 ? 'In credit' : 'In debit'}</span>
        <p className="card__info">{utils.intToCurrString(Math.abs(diffToPut))}</p>
      </>
    : null;
  const realClass = `ccard ${props.className || ''}`;
  const cardPartStyle = {
    backgroundImage: `linear-gradient(to right bottom, ${gradients.join(', ')})`
  };

  return (
    <div className={realClass}>
      <div className="card__front card__part" style={cardPartStyle}>
        <div className="card__space-60">
          <span className="card__label">Card holder</span>
          <p className="card__info">{props.config.name}</p>
        </div>
        <div className="card__space-40">
          <span className="card__label">Balance</span>
          <p className="card__info">{utils.intToCurrString(alreadyPutted)}</p>
        </div>
        <p className="card_numer">**** **** **** 6258</p>

        <div className="card__space-60">
          <span className="card__label">Actions</span>
          <p className="card__info">
            <Button variant="secondary" size={'sm'} onClick={props.onEdit}><i className="bi bi-upc-scan" /></Button>{' '}
            <Button variant="danger" size={'sm'} onClick={props.onDelete}><i className="bi bi-trash" /></Button>
          </p>
        </div>
        <div className="card__space-40">
          {toPutDom}
        </div>
      </div>

      <div className="card__back card__part" style={cardPartStyle}>
        <div className="card__black-line" />
        <div className="card__back-content">
          <div className="card__secret">
            <p className="card__secret--last">420</p>
          </div>
        </div>
      </div>
    </div>
  );
}
