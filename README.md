# Unit of work pattern for PrismaORM

```typescript
return this.unitOfWork.runInTransaction(async (tx) => {
  const updatedAggregate1 = await this.repo.saveAggregate1(entity, { tx });
  await this.repo2.saveAggregate2(entity, { tx });
  return updatedAggregate1;
});
```

![image](https://github.com/zhuravlevma/prisma-unit-of-work/assets/44276887/6ebd10bd-fd88-42cb-8c7c-71a162283e04)
