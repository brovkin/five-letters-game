import React, { FC } from 'react';
import './Logo.scss';

const Logo: FC = () => {
  const logoTitle = '5букв';

  const renderLogo = () => {
    const splitTitle = logoTitle.split('');

    return splitTitle.map((letter) => <div key={letter} className="logo__letter">{letter}</div>)
  }

  return <div className="logo">{renderLogo()}</div>
}

export default Logo;
