import dva from 'dva';
import { createBrowserHistory as createHistory } from 'history';

import init from './models/init.js'
import './index.css';
import 'normalize.css/normalize.css' // a modern alternative to CSS resets
import './styles/index.less'
// 1. Initialize
const app = dva({
  // history: createHistory()
});

// 2. Plugins
// app.use({});

// 3. Model
app.model(init);

// 4. Router
app.router(require('./router').default);

// 5. Start
app.start('#root');
