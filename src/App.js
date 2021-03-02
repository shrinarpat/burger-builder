import { Route, Switch } from 'react-router-dom';

import Layout from './hoc/layout/layout';
import BurgerBuilder from './containers/burgerBuilder/burgerBuilder';
import Checkout from './containers/Checkout/checkout';
import Orders from './containers/Orders/Orders';

function App() {
	return (
		<div>
			<Layout>
				<Switch>
					<Route path='/checkout' component={Checkout} />
					<Route path='/orders' component={Orders} />
					<Route path='/' component={BurgerBuilder} />
				</Switch>
			</Layout>
		</div>
	);
}

export default App;
