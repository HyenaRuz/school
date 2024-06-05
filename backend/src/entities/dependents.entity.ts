import { Column, Entity, ManyToMany } from 'typeorm';
import { Base } from './base.entity';
import { User } from './user.entity';
import { ETrustee } from '../enums/trustee.enum';

@Entity()
export class Dependents extends Base {
  @ManyToMany(() => User, (user) => user.id)
  trustee_id: User;

  @ManyToMany(() => User, (user) => user.id)
  dependent_id: User;

  @Column()
  relation: ETrustee;
}
