import short from 'short-uuid'

const template = 'abcdefghijklmnopqrstuvwxyz0123456789'

export function genSid() {
  const translator = short(template)
  const newId = translator.generate()

  return newId
}

export function genUuid() {
  const newId = short().uuid()

  return newId
}
