'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const Page404 = () => {
  const router = useRouter();

  useEffect(() => {
    const timeout = setTimeout(() => {
      router.push('/');
    }, 3000);

    return () => clearTimeout(timeout);
  }, [router]);

  return (
    <div>
      <div>
        <h1>
          Page not found
          <span className='span' />
          404
        </h1>
        <p>You will be redirected to the main page in 3 sec.</p>
      </div>
    </div>
  );
};

export default Page404;
