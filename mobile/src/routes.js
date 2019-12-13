import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import SignIn from './pages/SignIn/index';
import SignUp from './pages/SignUp/index';

export default createAppContainer(
  createSwitchNavigator({
    SignIn,
    SignUp,
  })
);
