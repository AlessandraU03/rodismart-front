import CageWSDataSource from "../datasources/CageWSAPI";

export default class CageWSRepositoryImpl {
  constructor() {
    this.dataSource = new CageWSDataSource();
  }

  connect(token) {
    this.dataSource.connect(token);
  }

  subscribe(cageId, callback) {
    this.dataSource.subscribe(cageId, callback);
  }

  unsubscribe(cageId) {
    this.dataSource.unsubscribe(cageId);
  }
}