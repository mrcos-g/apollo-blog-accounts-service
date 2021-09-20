import {
  ObjectType,
  Directive,
  Field,
  ID,
  InputType,
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
export class AccountFieldResolvers implements ResolverInterface<Account> {
  @FieldResolver()
  id(@Root() account: User): string {
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

@InputType({ description: 'New user account data' })
export class CreateAccountInput {
  @Field()
  public email!: string;

  @Field()
  public password!: string;
}

@InputType({ description: 'Update user account data' })
export class UpdateAccountInput {
  @Field(() => ID)
  public id!: string;

  @Field({ nullable: true })
  public email?: string;

  @Field({ nullable: true })
  public password?: string;

  @Field({ nullable: true })
  public newPassword?: string;
}
