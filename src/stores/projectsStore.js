import { observable, action, computed } from 'mobx';
import agent from '../agent';

export class ProjectsStore {

  @observable isLoading = false;
  @observable projectsRegistry = observable.map();

  @computed get projects() {
    return this.projectsRegistry.values();
  };

  clear() {
    this.projectsRegistry.clear();
  }

  getProject(id) {
    return this.projectsRegistry.get(id);
  }

  @action loadProjects() {
    this.isLoading = true;
    return agent.Projects.all()
      .then(action((projects) => {
        this.projectsRegistry.clear();
        projects.forEach(project => this.projectsRegistry.set(project.id, project));
      }))
      .finally(action(() => { this.isLoading = false; }));
  }

  @action loadProject(id, { acceptCached = false } = {}) {
    if (acceptCached) {
      const project = this.getProject(id);
      if (project) return Promise.resolve(project);
    }
    this.isLoading = true;
    return agent.Projects.get(id)
      .then(action((project) => {
        this.projectsRegistry.set(project.id, project);
        return project;
      }))
      .finally(action(() => { this.isLoading = false; }));
  }

  @action createProject(project) {
    return agent.Projects.create(project)
      .then((project) => {
        this.projectsRegistry.set(project.id, project);
        return project;
      })
  }

  @action updateProject(data) {
    return agent.Projects.update(data)
      .then(action((project) => {
        this.projectsRegistry.set(project.id, project);
        return project;
      }))
  }

  @action deleteProject(id) {
    this.projectsRegistry.delete(id);
    return agent.Projects.del(id)
      .catch(action(err => { this.loadProjects(); throw err; }));
  }
}

export default new ProjectsStore();
