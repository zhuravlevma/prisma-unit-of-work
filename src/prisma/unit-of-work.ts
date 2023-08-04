export abstract class UnitOfWork {
  abstract runInTransaction<T>(fn: (manager?: any) => Promise<T>): Promise<T>;
}
