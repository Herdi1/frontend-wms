const middleware = {}

middleware['checkRoleSuperAdmin'] = require('..\\middleware\\checkRoleSuperAdmin.js')
middleware['checkRoleSuperAdmin'] = middleware['checkRoleSuperAdmin'].default || middleware['checkRoleSuperAdmin']

middleware['checkRoleUser'] = require('..\\middleware\\checkRoleUser.js')
middleware['checkRoleUser'] = middleware['checkRoleUser'].default || middleware['checkRoleUser']

middleware['checkRoleUserDetail'] = require('..\\middleware\\checkRoleUserDetail.js')
middleware['checkRoleUserDetail'] = middleware['checkRoleUserDetail'].default || middleware['checkRoleUserDetail']

middleware['checkRoleUserImport'] = require('..\\middleware\\checkRoleUserImport.js')
middleware['checkRoleUserImport'] = middleware['checkRoleUserImport'].default || middleware['checkRoleUserImport']

middleware['isLogin'] = require('..\\middleware\\isLogin.js')
middleware['isLogin'] = middleware['isLogin'].default || middleware['isLogin']

middleware['isNotAccessable'] = require('..\\middleware\\isNotAccessable.js')
middleware['isNotAccessable'] = middleware['isNotAccessable'].default || middleware['isNotAccessable']

middleware['isNotLogin'] = require('..\\middleware\\isNotLogin.js')
middleware['isNotLogin'] = middleware['isNotLogin'].default || middleware['isNotLogin']

export default middleware
