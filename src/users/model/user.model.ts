import {
  Column,
  DataType,
  Default,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';

@Table
export class User extends Model {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  public id;

  @Column(DataType.STRING(25))
  FirstName: string;

  @Column(DataType.STRING(25))
  LastName: string;

  @Column(DataType.TEXT)
  Email: string;

  @Column(DataType.TEXT)
  Password: string;
}
