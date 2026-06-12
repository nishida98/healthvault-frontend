import { apiRequest } from './api'

const SESSION_STORAGE_KEY = 'healthvault.session'

export type UserAccount = {
  id: string
  name: string
  nickname: string
  email: string
  createdAt: string
  updatedAt: string
}

export type AuthSession = {
  token: string
  tokenType: string
  expiresAt: string
  user: UserAccount
}

export type SignInPayload = {
  email: string
  password: string
}

export type SignUpPayload = SignInPayload & {
  name: string
  nickname: string
}

function saveSession(session: AuthSession) {
  window.localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(session))
}

export function getSession() {
  const rawSession = window.localStorage.getItem(SESSION_STORAGE_KEY)

  if (!rawSession) {
    return null
  }

  try {
    return JSON.parse(rawSession) as AuthSession
  } catch {
    window.localStorage.removeItem(SESSION_STORAGE_KEY)
    return null
  }
}

export function clearSession() {
  window.localStorage.removeItem(SESSION_STORAGE_KEY)
}

export async function signIn(payload: SignInPayload) {
  const session = await apiRequest<AuthSession>('/api/v1/auth/login', {
    method: 'POST',
    body: JSON.stringify(payload),
  })

  saveSession(session)
  return session
}

export async function signUp(payload: SignUpPayload) {
  await apiRequest<UserAccount>('/api/v1/users', {
    method: 'POST',
    body: JSON.stringify(payload),
  })

  return signIn({
    email: payload.email,
    password: payload.password,
  })
}
