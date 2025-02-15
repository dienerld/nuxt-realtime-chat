import { eq } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  const { username, password } = await readBody(event)

  const db = useDatabase()

  const [user] = await db
    .select({
      id: tables.users.id,
      name: tables.users.name,
      username: tables.users.username,
      password: tables.users.password,
    })
    .from(tables.users)
    .where(eq(tables.users.username, username))
    .limit(1)

  if (!user) {
    return createError({
      statusCode: 401,
      message: 'User not found',
    })
  }

  const isValid = await verifyPassword(user.password, password)
  if (!isValid) {
    return createError({
      statusCode: 401,
      message: 'Invalid password',
    })
  }

  await setUserSession(event, {
    user: {
      id: user.id,
      name: user.name,
      username: user.username,
    }
  })

  return { status: 200 }
})
