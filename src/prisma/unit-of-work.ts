export abstract class UnitOfWork<T, C> {
  abstract runInTransaction<R>(fn: (manager?: any) => Promise<R>): Promise<R>;
  abstract create(): UnitOfWork<T, C>;
  abstract getClient(): C;
}
