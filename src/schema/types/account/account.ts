import {
  ObjectType,
  Directive,
  Field,
  ID,
  Resolver,
  FieldResolver,
  Root,
  ResolverInterface,
} from 'type-graphql';
import { User } from 'auth0';

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
  id(@Root() account: User): string {
    console.log('account is:', account);
    return account.user_id as string;
  }

  @FieldResolver()
  createdAt(@Root() account: User): string {
    return account.created_at as string;
  }

  @FieldResolver()
  email(@Root() account: User): string | undefined {
    return account.email;
  }
}
