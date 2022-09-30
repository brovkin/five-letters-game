import React, { FC, useEffect, useState } from 'react';
import Confetti from 'react-confetti';

type ConfettiCongratsProps = {
  isWin: boolean;
};

const ConfettiCongrats: FC<ConfettiCongratsProps> = ({ isWin }) => {
  const [recycle, setRecycle] = useState<boolean>(true);
  const [run, setRun] = useState<boolean>(false);

  useEffect(() => {
    if (isWin) {
      setRun(true);
      setRecycle(true);
    }

    if (!isWin && run) {
      setRecycle(false);
    }
  }, [isWin]);

  return (
    <Confetti
      width={window.innerWidth}
      run={run}
      recycle={recycle}
      numberOfPieces={400}
    />
  );
};

export default ConfettiCongrats;
