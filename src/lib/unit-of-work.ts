export abstract class UnitOfWork {
  abstract runInTransaction(fn: () => Promise<void>): Promise<void>;
}
