import { eq } from 'drizzle-orm'
import { schemaLogin } from '~~/shared/schemas/user'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const bodyValidated = schemaLogin.safeParse(body)
  const db = useDatabase()

  if (!bodyValidated.success) {
    return createError({
      statusCode: 400,
      message: 'Invalid body',
    })
  }

  const [hasUser] = await db
    .select({
      id: tables.users.id,
    })
    .from(tables.users)
    .where(eq(tables.users.username, body.username))
    .limit(1)

  if (hasUser) {
    return createError({
      statusCode: 400,
      message: 'User already exists',
    })
  }

  const [user] = await db
    .insert(tables.users)
    .values({
      name: body.name,
      username: body.username,
      password: await hashPassword(body.password),
    })
    .returning({
      id: tables.users.id,
      name: tables.users.name,
      username: tables.users.username,
    })

  return {
    status: 201,
    body: user,
  }
})
