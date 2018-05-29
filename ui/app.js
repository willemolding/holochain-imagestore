
$('#submit_button').click(function () {
  var filePicker = $('#file_picker')[0]
  postFile(filePicker.files[0])
  console.log('Upload started...')
})


$('#get_from_hash_button').click(function () {
  var hash = $('#hash_input')[0].value
  console.log('loading image from hash: '+hash)
  getFromHash(hash)
})

$('#get_all_button').click(function () {
  console.log('loading all images in DHT')
  getAllImages()
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
      console.log('response: ' + response)
    })
  }

  // start serialising the file
  reader.readAsText(file)
}

function getFromHash(hash) {
  $.post( '/fn/imageStore/getFromHash', JSON.stringify({entryHash: hash}), function (response) {
      console.log('response: ' + response)
    })
}

function getAllImages() {
  $.post( '/fn/imageStore/getAllImages', {}, function (response) {
      console.log('response: ' + response)
    })
}
