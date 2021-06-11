import { ObjectType, Directive, Field, ID } from 'type-graphql';

@Directive(`@key(fields: "id")`)
@ObjectType()
export class Account {
  @Field(() => ID)
  public id!: string;

  @Field({ description: 'user account email' })
  public email!: string;
}
