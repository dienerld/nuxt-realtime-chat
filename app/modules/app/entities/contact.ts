import type { User } from '~/entities/user.model'

export interface Contact extends User {
  roomId: string
}
