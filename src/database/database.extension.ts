import { Prisma } from '@prisma/client';

export const softDelete = Prisma.defineExtension({
  name: 'softDelete',
  model: {
    $allModels: {
      async delete<M, A>(
        this: M,
        where: Prisma.Args<M, 'delete'>['where'],
      ): Promise<Prisma.Result<M, A, 'update'>> {
        const context = Prisma.getExtensionContext(this);

        return (context as any).update({
          where,
          data: {
            deletedAt: new Date(),
          },
        });
      },
    },
  },
});

export const softDeleteMany = Prisma.defineExtension({
  name: 'softDeleteMany',
  model: {
    $allModels: {
      async deleteMany<M, A>(
        this: M,
        where: Prisma.Args<M, 'deleteMany'>['where'],
      ): Promise<Prisma.Result<M, A, 'updateMany'>> {
        const context = Prisma.getExtensionContext(this);

        return (context as any).updateMany({
          where,
          data: {
            deletedAt: new Date(),
          },
        });
      },
    },
  },
});

export const filterSoftDeleted = Prisma.defineExtension({
  name: 'filterSoftDeleted',
  query: {
    $allModels: {
      async $allOperations({ model, operation, args, query }) {
        if (
          operation === 'findUnique' ||
          operation === 'findFirst' ||
          operation === 'findUniqueOrThrow' ||
          operation === 'findMany' ||
          operation === 'count' ||
          operation === 'findFirstOrThrow'
        ) {
          args.where = {
            ...args.where,
            deletedAt: { isSet: false },
          };
          return query(args);
        }
        return query(args);
      },
    },
  },
});

export const computeField = Prisma.defineExtension({
  name: 'computeField',
  result: {
    place: {
      formattedAddress: {
        needs: {},
        compute(data) {
          const addressComponents = data.addressComponents;
          const longTexts = addressComponents.map(
            (component) => component.longText,
          );
          return longTexts.join(', ');
        },
      },
    },
  },
});
