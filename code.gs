var token = "";     // 1. Fill in the token
var telegramUrl = "https://api.telegram.org/bot" + token;
var webAppUrl = ""; // 2. Fill in the goolgle web address
var ssId = "";      // 3. Fill in the spreadsheet id

function getMe() {
  var url = telegramUrl + "/getMe";
  var response = UrlFetchApp.fetch(url);
  Logger.log(response.getContentText());
}

function setWebhook() {
  var url = telegramUrl + "/setWebhook?url=" + webAppUrl;
  var response = UrlFetchApp.fetch(url);
  Logger.log(response.getContentText());
}

function sendText(id, text) {
  var url = telegramUrl + "/sendMessage?chat_id=" + id + "&text=" + encodeURIComponent(text);
  var response = UrlFetchApp.fetch(url);
  Logger.log(response.getContentText());
}

function doGet(e) {
  return HtmlService.createHtmlOutput();
}

function doPost(e) {
  try {
    // this is where telegram works
    var data = JSON.parse(e.postData.contents);
    var text = data.message.text;
    var id = data.message.from.id;
    var row = SpreadsheetApp.getActiveSheet().getDataRange().getDisplayValues();
    var executed = true;
    
    for (i = 0; i < row.length; i++) {
      if (text == row[i][0]) {
        var weekly = "Weekly Info for " + row[i][1] + " : \n\n" + row[0][2] + " - " + row[i][2] + "\n\n"
          + row[0][3] + " - " + row[i][3] + "\n\n" + row[0][4] + " - " + row[i][4] + "\n\n" + row[0][5] + " - " + row[i][5] + "\n\n" +
          row[0][6] + " - " + row[i][6] + "\n\n" + row[0][7] + " - " + row[i][7] + "\n\n" + row[0][8] + " - " +
          row[i][8] + "\n\nTotal orders = " + row[i][9] + "\n\nTotal Amount = " + row[i][10] + "\n\nBonus = " + row[i][11];
        sendText(id, weekly);
        executed = false;
        break;
      }

    }
    if(executed){
        sendText(id, "Please enter the correct ID");
    }
  }
  catch (e) {
    sendText(id, JSON.stringify(e, null, 4));
  }
}
