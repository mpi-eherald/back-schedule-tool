import express from 'express'
import axios from 'axios'
import { erp_url } from './config.js'
import api from './api.js'

api.get('/orders', { params: { status: "open", customerCode: { ne: [ "TEST", "WHATIF" ] } } })
  .then((response) => {
    response.data.Data.forEach((
      {
        orderNumber,
        customerDescription,
        dateEntered,
        orderTotal
      }
    ) => {
      console.log(`
        ${orderNumber} | ${customerDescription} | ${dateEntered}
        ${orderTotal}
      `)
    })
  })