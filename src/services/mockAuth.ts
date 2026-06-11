export type SignInPayload = {
  email: string
  password: string
}

export type SignUpPayload = SignInPayload & {
  name: string
}

const wait = (milliseconds = 350) =>
  new Promise((resolve) => {
    window.setTimeout(resolve, milliseconds)
  })

export async function mockSignIn(payload: SignInPayload) {
  await wait()

  return {
    token: 'mock-session-token',
    user: {
      email: payload.email,
    },
  }
}

export async function mockSignUp(payload: SignUpPayload) {
  await wait()

  return {
    token: 'mock-session-token',
    user: {
      name: payload.name,
      email: payload.email,
    },
  }
}
