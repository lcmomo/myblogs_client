import dva from 'dva';
import './index.css';
import './styles/index.less'
import 'normalize.css/normalize.css' // a modern alternative to CSS resets
// 1. Initialize
const app = dva();

// 2. Plugins
// app.use({});

//3. Model
app.model(require('./models/init').default);

// 4. Router
app.router(require('./router').default);

// 5. Start
app.start('#root');
