
$('#submit_button').click(function () {
  var filePicker = $('#file_picker')[0]
  postFile(filePicker.files[0])
  console.log('Upload started...')
})


$('#get_from_hash_button').click(function () {
  var hash = $('#hash_input')[0].value
  console.log('loading image from hash: '+hash)
  getFromHash(hash, function (image){
    console.log(image.name)
    $('#display_image')[0].src = image.data
    $('#image_name')[0].innerHTML = image.name
  })
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

  // start serialising the file to Base64 encoding
  reader.readAsDataURL(file)
}

function getFromHash(hash, then) {
  $.post( '/fn/imageStore/getFromHash', JSON.stringify({entryHash: hash}), function (response) {
      console.log('response: ' + response)
      then(JSON.parse(response))
    })
}

function getAllImages() {
  $.post( '/fn/imageStore/getAllImages', {}, function (response) {
      console.log('response: ' + response)
    })
}
