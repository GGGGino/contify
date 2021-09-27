# Contify

Web app usata per dividere alla romana il conto.

Per scannerizzare il codice usare https://github.com/nimiq/qr-scanner

## First part

- Ogni qrcode scansionato è una parte per cui dividere
- Ogni slave può inserire diverse info tra cui

| Name       | Description                                | type   | default |
|------------|--------------------------------------------|--------|---------|
| name       | The name of the user                       | string | ''      |
| alreadyPut | The amount of money the user already spent | number | 0       |
| maxToPut   | The max of money the user can pay          | number | 0       |

- 

https://github.com/nimiq/qr-scanner
