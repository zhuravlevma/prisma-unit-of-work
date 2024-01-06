export abstract class UnitOfWork<C> {
  abstract runInTransaction<R>(fn: (manager: C) => Promise<R>): Promise<R>;
}
