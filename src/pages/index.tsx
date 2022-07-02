import { useRouter } from 'next/router';

import { Meta } from '@/layouts/Meta';
import { Main } from '@/templates/Main';

const Index = () => {
  const router = useRouter();

  return (
    <Main
      meta={
        <Meta
          title="Blood Donors - Ayudha Foundation"
          description="An application to register yourself as a blood donor. This initiative was created by the Ayudha Foundation in Adilabad."
        />
      }
    >
      <h1>🚧 Registeration form is under construction 🚧</h1>
    </Main>
  );
};

export default Index;
