function copyTextVCB() {
    var textCopy = "1016499053";
  
    navigator.clipboard.writeText(textCopy)
      .then(function() {
        alert("Copied text : " + textCopy);
      })
      .catch(function(error) {
        console.error('Error when copying text: ', error);
      });
}

function copyTextMM() {
    var textCopy = "0376282119";
  
    navigator.clipboard.writeText(textCopy)
      .then(function() {
        alert("Copied text : " + textCopy);
      })
      .catch(function(error) {
        console.error('Error when copying text: ', error);
      });
}