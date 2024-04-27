import Header from './Header';
import CartOverview from '../features/cart/CartOverview';
import { Outlet, useNavigation } from 'react-router-dom';
import Loader from './Loader';

function AppLayout() {
  const navigation = useNavigation();
  console.log('navigation', navigation);
  console.log();
  const isLoading = navigation.state === 'loading';

  return (
    <div className="">
      {isLoading && <Loader />}
      <Header />
      <main>
        {/* <h1>content</h1> */}
        <Outlet />
      </main>
      <CartOverview />
    </div>
  );
}

export default AppLayout;
