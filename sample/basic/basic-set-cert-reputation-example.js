'use strict'

var common = require('../common')
var dxl = require('@opendxl/dxl-client')
var tie = common.requireTieClient()
var TieClient = tie.TieClient
var TrustLevel = tie.TrustLevel

// Create DXL configuration from file
var config = dxl.Config.createDxlConfigFromFile(common.CONFIG_FILE)

// Create the client
var client = new dxl.Client(config)

var CERTIFICATE_BODY_SHA1 = '6eae26db8c13182a7947982991b4321732cc3de2'
var CERTIFICATE_PUBLIC_KEY_SHA1 = '3b87a2d6f39770160364b79a152fcc73bae27adf'

// Connect to the fabric, supplying a callback function which is invoked
// when the connection has been established
client.connect(function () {
  var tieClient = new TieClient(client)
  tieClient.setCertificateReputation(
    function (error) {
      client.destroy()
      if (error) {
        console.log('Error: ' + error.message)
      } else {
        console.log('Succeeded')
      }
    },
    TrustLevel.KNOWN_TRUSTED,
    CERTIFICATE_BODY_SHA1,
    CERTIFICATE_PUBLIC_KEY_SHA1,
    'Reputation set via OpenDXL'
  )
})
