import dva from 'dva';
import createLoading from 'dva-loading';

const runtimeDva = window.g_plugins.mergeConfig('dva');
let app = dva({
  history: window.g_history,
  
  ...(runtimeDva.config || {}),
});

window.g_app = app;
app.use(createLoading());
(runtimeDva.plugins || []).forEach(plugin => {
  app.use(plugin);
});

app.model({ namespace: 'global', ...(require('C:/Users/qs006/study/ordinary-pro/src/models/global.js').default) });
app.model({ namespace: 'login', ...(require('C:/Users/qs006/study/ordinary-pro/src/models/login.js').default) });
app.model({ namespace: 'menu', ...(require('C:/Users/qs006/study/ordinary-pro/src/models/menu.js').default) });
app.model({ namespace: 'register', ...(require('C:/Users/qs006/study/ordinary-pro/src/models/register.js').default) });
app.model({ namespace: 'user', ...(require('C:/Users/qs006/study/ordinary-pro/src/models/user.js').default) });
