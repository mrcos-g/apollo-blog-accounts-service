import { ObjectType, Directive, Field, ID, Resolver, FieldResolver, Root, ResolverInterface } from 'type-graphql';

@Directive(`@key(fields: "id")`)
@ObjectType()
export class Account {
  @Field(() => ID)
  public id!: string;

  @Field({ description: 'time of account creation' })
  public createdAt!: string;

  @Field({ description: 'user account email', nullable: true })
  public email?: string;
}

@Resolver(() => Account)
export class AccountResolver implements ResolverInterface<Account> {
  @FieldResolver()
  id(@Root() account: Account): string {
    return account.createdAt;
  }
}
