import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import LoadingPage from '../../../component/LoadingPage';

const Index = () => {
  const router = useRouter();
  const [prepareRedirect, setPrepareRedirect] = useState(true);
  useEffect(() => {
    return router.replace(`/games/comingSoon/0`);
  }, [router]);
  if (prepareRedirect)
    return (
      <>
        <LoadingPage />
      </>
    );
  return <div></div>;
};

export default Index;
