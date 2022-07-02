import { Meta } from '@/layouts/Meta';
import { Main } from '@/templates/Main';

const Dashboard = () => (
  <Main meta={<Meta title="Dashboard" description="A Dashboard for managers of Ayudha Foundation to view/edit/delete donors from the list" />}>
    <p>
      ⚠️ You need to have priviliges to access this page.
    </p>
    <p>
      ✅ This page is only accesible for people with enough priviliges i.e., founding members and managers of the Ayudha Foundation.
    </p>
  </Main>
);

export default Dashboard;
