# Splittami

> https://ggggino.github.io/splittami

Web app that aim to split the the cost of lunch, dinner, trip, event, etc..

The need of this app happen at the end of a dinner, everyone put different amount of money.
For example John bought 40€ of meat, Fred 15€ of wine, Wilma 100€ of chips.
Sometimes the calculation to know "who have to give to who" may be tedious so here is, this app can help you.

There are tons of app like this but some needs login, some needs to download the app,
some needs to fill in the amount of every peron that put money.

This app don't need any login. You have only to share the url and let that everyone fill in his own configuration and 
scan the qrcode generated.


## Configuration

- Ogni qrcode scansionato è una parte per cui dividere
- Ogni slave può inserire diverse info tra cui

| Name       | Description                                | type   | default |
|------------|--------------------------------------------|--------|---------|
| name       | The name of the user                       | string | ''      |
| alreadyPut | The amount of money the user already spent | number | 0       |
| maxToPut   | The max of money the user can pay          | number | 0       |

## Sections

### Admin

Here you can manage, add, edit, scan the qrcode of every user. You can see this page as the organizator page.

### User

Here you can set your own information. es name, the amount you put

## Link

To scan the qrCode I used:

https://github.com/nimiq/qr-scanner
