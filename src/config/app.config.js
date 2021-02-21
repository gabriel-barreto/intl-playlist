import dotenv from 'dotenv'
dotenv.config()

const { APP_LANG: lang = 'pt-BR' } = process.env

export default Object.freeze({ lang })
