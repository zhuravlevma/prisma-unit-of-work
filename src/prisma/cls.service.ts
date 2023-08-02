import { Injectable, Scope } from '@nestjs/common';
import * as cls from 'cls-hooked';

@Injectable({ scope: Scope.REQUEST })
export class CLSService {
  private readonly transactionContext: cls.Namespace;
  constructor() {
    this.transactionContext = cls.createNamespace('transaction');
  }

  getContext() {
    return this.transactionContext;
  }
}
