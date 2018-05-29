
$('#submit_button').click(function () {
  var filePicker = $('#file_picker')[0];
  console.log(filePicker)
  postFile(filePicker.files[0])
  alert('clicked the submit button')
})

function postFile(file) {
  var reader = new FileReader()

  // this is called after the file is serialised
  reader.onload = function(evt) {
    var blobString = evt.target.result
    var data = JSON.stringify({
      filename: file.name,
      size: file.size,
      data: blobString
    })

    $.post( '/fn/imagestore/storeImage', data, function (response) {
      console.log('response: ' + response)
    })
    .error(function(response) {
      console.log('response failed: ' + response.responseText)
    })
  }

  // start serialising the file
  reader.readAsText(file)
}
