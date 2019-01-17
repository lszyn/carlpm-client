import { observable, action, computed } from 'mobx';
import agent from '../agent';

export class TasksStore {

  @observable isLoading = false;
  @observable tasksRegistry = observable.map();

  @computed get tasks() {
    return this.tasksRegistry.values();
  };

  clear() {
    this.tasksRegistry.clear();
  }

  getTask(id) {
    return this.tasksRegistry.get(id);
  }

  @action loadTasks(projectId) {
    this.isLoading = true;
    return agent.Tasks.all(projectId)
      .then(action((tasks) => {
        this.tasksRegistry.clear();
        tasks.forEach(task => this.tasksRegistry.set(task.id, task));
      }))
      .finally(action(() => { this.isLoading = false; }));
  }

  @action loadTask(projectId, id, { acceptCached = false } = {}) {
    if (acceptCached) {
      const task = this.getTask(id);
      if (task) return Promise.resolve(task);
    }
    this.isLoading = true;
    return agent.Tasks.get(projectId, id)
      .then(action((task) => {
        this.tasksRegistry.set(task.id, task);
        return task;
      }))
      .finally(action(() => { this.isLoading = false; }));
  }

  @action createTask(projectId, task) {
    return agent.Tasks.create(projectId, task)
      .then((task) => {
        this.tasksRegistry.set(task.id, task);
        return task;
      })
  }

  @action updateTask(projectId, task) {
    return agent.Tasks.update(projectId, task)
      .then(action((task) => {
        this.tasksRegistry.set(task.id, task);
        return task;
      }))
  }

  @action deleteTask(projectId, id) {
    this.tasksRegistry.delete(id);
    return agent.Tasks.del(projectId, id)
      .catch(action(err => { this.loadTasks(projectId); throw err; }));
  }
}

export default new TasksStore();
