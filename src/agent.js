import superagentPromise from 'superagent-promise';
import _superagent from 'superagent';
import commonStore from './stores/commonStore';
import authStore from './stores/authStore';

const superagent = superagentPromise(_superagent, global.Promise);

const API_ROOT = 'http://0.0.0.0:3000/v1';

const handleErrors = err => {
  if (err && err.response && err.response.status === 401) {
    authStore.logout();
  }
  return err;
};

const responseBody = res => res.body;

const tokenPlugin = req => {
  if (commonStore.token) {
    req.set('authorization', `Token ${commonStore.token}`);
  }
};

const requests = {
  del: url =>
    superagent
      .del(`${API_ROOT}${url}`)
      .use(tokenPlugin)
      .end(handleErrors)
      .then(responseBody),
  get: url =>
    superagent
      .get(`${API_ROOT}${url}`)
      .use(tokenPlugin)
      .end(handleErrors)
      .then(responseBody),
  patch: url =>
    superagent
      .patch(`${API_ROOT}${url}`)
      .use(tokenPlugin)
      .end(handleErrors)
      .then(responseBody),
  put: (url, body) =>
    superagent
      .put(`${API_ROOT}${url}`, body)
      .use(tokenPlugin)
      .end(handleErrors)
      .then(responseBody),
  post: (url, body) =>
    superagent
      .post(`${API_ROOT}${url}`, body)
      .use(tokenPlugin)
      .end(handleErrors)
      .then(responseBody),
};

const Auth = {
  current: () =>
    requests.get('/users/profile'),
  login: (email, password) =>
    requests.post('/auth/login', { user: { email, password } }),
  register: (email, password) =>
    requests.post('/signup', { user: { email, password } }),
  save: user =>
    requests.put('/user', { user })
};


const Projects = {
  all: () =>
    requests.get(`/projects`),
  del: id =>
    requests.del(`/projects/${id}`),
  get: id =>
    requests.get(`/projects/${id}`),
  update: project =>
    requests.put(`/projects/${project.id}`, { project }),
  create: project =>
    requests.post('/projects', { project })
};

const Tasks = {
  all: (projectId) =>
    requests.get(`/projects/${projectId}/tasks`),
  del: (projectId, id) =>
    requests.del(`/projects/${projectId}/tasks/${id}`),
  makeComplete: (projectId, id) =>
    requests.get(`/projects/${projectId}/tasks/${id}/make_completed`),
  makeIncomplete: (projectId, id) =>
    requests.get(`/projects/${projectId}/tasks/${id}/make_not_completed`),
  get: (projectId, id) =>
    requests.get(`/projects/${projectId}/tasks/${id}`),
  update: (projectId, task) =>
    requests.put(`/projects/${projectId}/tasks/${task.id}`, { task }),
  create: (projectId, task) =>
    requests.post(`/projects/${projectId}/tasks`, { task })
};


export default {
  Auth,
  Projects,
  Tasks
};
