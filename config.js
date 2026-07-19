import dotenv from 'dotenv'
dotenv.config()

const erp_url = process.env.ERP_URL
const auth_url = process.env.AUTH_URL
const client_id = process.env.CLIENT_ID
const client_secret = process.env.CLIENT_SECRET
const grant_type = process.env.GRANT_TYPE
const scope = process.env.SCOPE

const payloadObject = {
  grant_type,
  client_id,
  client_secret,
  scope
}

const headers = {
  'Content-Type': 'application/x-www-form-urlencoded'
}

const payload = new URLSearchParams(payloadObject)

export {
  erp_url,
  auth_url,
  payload,
  headers
}