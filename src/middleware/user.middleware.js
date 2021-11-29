const { USERNAME_OR_PASSWORD_IS_REQUIRED, USER_ALREADY_EXISTS } = require("../constants/error-type")
const { getUserByUsername } = require("../service/user.service")

const verifyUser = async (ctx, next) => {
  const { username, password } = ctx.request.body
  // 用户名或密码为空
  if (!username || !password) {
    const error = new Error(USERNAME_OR_PASSWORD_IS_REQUIRED)
    return ctx.app.emit('error', error, ctx)
  }
  // 判断用户名是否注册过
  const result = await getUserByUsername(username)
  if(result.length) {
    const error = new Error(USER_ALREADY_EXISTS)
    return ctx.app.emit('error', error, ctx)
  }
  await next()
}

module.exports = {
  verifyUser
}