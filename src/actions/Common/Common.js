import { FIRST_LOGIN } from './types.js'

export const firstLoginActionCreater = (flag) => ({
  type: FIRST_LOGIN,
  flag
})