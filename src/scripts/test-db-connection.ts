import { testConnection } from '../config/database.js'

async function main() {
  console.log('Testing database connection...')
  const isConnected = await testConnection()
  
  if (isConnected) {
    console.log('✅ Database connection successful!')
  } else {
    console.log('❌ Failed to connect to database')
    process.exit(1)
  }
}

main().catch(console.error)