import {
  AllowNull,
  Column,
  CreatedAt,
  DataType,
  Default,
  DeletedAt,
  HasMany,
  Model,
  PrimaryKey,
  Table,
  Unique,
  UpdatedAt,
} from 'sequelize-typescript';
import { UserImages } from './user-image.model';

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

  @AllowNull(true)
  @Column(DataType.ENUM('user', 'admin'))
  Role: string;

  @CreatedAt
  @Column
  CreatedAt: Date;

  @UpdatedAt
  @Column
  UpdatedAt: Date;

  @HasMany(() => UserImages, 'UserID')
  Images: UserImages[];
}
