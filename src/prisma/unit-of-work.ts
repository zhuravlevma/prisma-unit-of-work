export abstract class UnitOfWork {
  abstract runInTransaction<T>(fn: () => Promise<T>): Promise<T>;
}
