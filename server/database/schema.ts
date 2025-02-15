import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core'
import { ulid } from 'ulid'

export const rooms = sqliteTable('rooms', {
  id: text('id').primaryKey().$defaultFn(() => ulid()),
  expireAt: integer('created_at', { mode: 'timestamp' }),
})

export const users = sqliteTable('users', {
  id: text('id').primaryKey().$defaultFn(() => ulid()),
  name: text('name').notNull(),
  username: text('username').notNull(),
  password: text('password').notNull(),
})

export const messages = sqliteTable('messages', {
  id: text('id').primaryKey().$defaultFn(() => ulid()).references(() => rooms.id),
  roomId: text('room_id').notNull(),
  senderId: text('sender_id').notNull().references(() => users.id),
  receiverId: text('receiver_id').notNull().references(() => users.id),
  text: text('text').notNull(),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull(),
})

export const usersRooms = sqliteTable('users_rooms', {
  id: text('id').primaryKey().$defaultFn(() => ulid()),
  userId: text('user_id').notNull().references(() => users.id),
  roomId: text('room_id').notNull().references(() => rooms.id),
})
