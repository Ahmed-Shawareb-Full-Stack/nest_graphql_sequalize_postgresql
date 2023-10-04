import {
  AllowNull,
  AutoIncrement,
  BelongsTo,
  Column,
  CreatedAt,
  DataType,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
  UpdatedAt,
} from 'sequelize-typescript';
import { User } from './user.model';

@Table({
  tableName: 'UserImages',
})
export class UserImages extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column({ type: DataType.INTEGER })
  ID: number;

  @AllowNull(false)
  @Column({ type: DataType.TEXT })
  URL: string;

  @AllowNull(true)
  @Column({ type: DataType.STRING })
  Type: string;

  @CreatedAt
  @Column
  CreatedAt: Date;

  @UpdatedAt
  @Column
  UpdatedAt: Date;

  @AllowNull(true)
  @ForeignKey(() => User)
  @Column
  UserID: string;

  @BelongsTo(() => User, 'UserID')
  User: User;
}
