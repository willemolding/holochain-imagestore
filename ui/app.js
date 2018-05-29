
$('#submit_button').click(function () {
  var filePicker = $('#file_picker')[0];
  postFile(filePicker.files[0])
  console.log('Upload started...')
})

function postFile(file) {
  var reader = new FileReader()

  // this is called after the file is serialised
  reader.onload = function(evt) {
    var blobString = evt.target.result
    var data = JSON.stringify({
      name: file.name,
      type: file.type,
      size: file.size,
      data: blobString
    })

    $.post( '/fn/imageStore/storeImage', data, function (response) {
      console.log('Upload Success!')
      console.log('response: ' + response)
    })
  }

  // start serialising the file
  reader.readAsText(file)
}
