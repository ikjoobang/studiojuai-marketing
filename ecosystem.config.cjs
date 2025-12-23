// PM2 Configuration for STUDIOJUAI
// AI Marketing Automation Platform

module.exports = {
  apps: [
    {
      name: 'studiojuai',
      script: 'npx',
      args: 'wrangler pages dev dist --ip 0.0.0.0 --port 3000',
      cwd: '/home/user/webapp',
      env: {
        NODE_ENV: 'development',
        PORT: 3000
      },
      watch: false,
      instances: 1,
      exec_mode: 'fork',
      autorestart: true,
      max_restarts: 10,
      restart_delay: 1000,
      error_file: '/home/user/webapp/logs/error.log',
      out_file: '/home/user/webapp/logs/out.log',
      log_file: '/home/user/webapp/logs/combined.log',
      time: true,
      
      // Resource limits
      max_memory_restart: '500M',
      
      // Environment specific settings
      env_production: {
        NODE_ENV: 'production',
        PORT: 3000
      }
    }
  ]
}
