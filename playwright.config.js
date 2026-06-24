
import { defineConfig, devices } from '@playwright/test';
import { trace } from 'node:console';


const config =({
  testDir: './tests',

  timeout : 40 * 1000,
  
  expect:{
    timeout: 5000
  },
  reporter : 'html',
  use: {
   
  browserName: 'chromium', 
  headless: false,
  screenshot: 'on',
  trace: 'on',  //off ,retain-on-failure

  },
  
});

module.exports = config;