import {
  AllowNull,
  Column,
  CreatedAt,
  DataType,
  Default,
  DeletedAt,
  Model,
  PrimaryKey,
  Table,
  Unique,
  UpdatedAt,
} from 'sequelize-typescript';

@Table({
  tableName: 'Users',
})
export class User extends Model {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column({ type: DataType.UUID })
  ID: string;

  @AllowNull(false)
  @Column(DataType.STRING(25))
  FirstName: string;

  @AllowNull(false)
  @Column(DataType.STRING(25))
  LastName: string;

  @AllowNull(false)
  @Unique
  @Column(DataType.STRING)
  Email: string;

  @AllowNull(false)
  @Column(DataType.TEXT)
  Password: string;

  @CreatedAt
  @Column
  CreatedAt: Date;

  @UpdatedAt
  @Column
  UpdatedAt: Date;
}
