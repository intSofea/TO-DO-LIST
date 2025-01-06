import { testConnection } from '../config/database.js'

const main = async () => {
  console.log('Testing database connection...')
  const isConnected = await testConnection()
  
  if (isConnected) {
    console.log('✅ Database connection successful!')
    process.exit(0)
  } else {
    console.log('❌ Failed to connect to database')
    process.exit(1)
  }
}

main().catch((error) => {
  console.error('Error:', error)
  process.exit(1)
})