
$('document').ready(function () {
  populateHashList()
})

$('#submit_button').click(function () {
  var filePicker = $('#file_picker')[0]
    postFile(filePicker.files[0], function() {
    populateHashList()
  })
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


function populateHashList() {
  getAllImages(function(response) {
    imageHashList = JSON.parse(response)
    console.log(imageHashList)
    $('#hash_input').empty()
    imageHashList.forEach(function(hash){
      $('#hash_input').append('<option>' + hash + '</option>')
    })
  })
}


function postFile(file, then) {
  var reader = new FileReader()

  // set up a function to be called after the file is loaded and converted
  reader.onload = function(evt) {
    var blobString = evt.target.result

    var data = JSON.stringify({
      name: file.name,
      type: file.type,
      size: file.size,
      data: blobString
    })

    // post the image data to Holochain
    $.post( '/fn/imageStore/storeImage', data, function (response) {
      console.log('response: ' + response)
      then(response)
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


function getAllImages(then) {
  $.post( '/fn/imageStore/getAllImages', {}, function (response) {
      console.log('response: ' + response)
      then(response)
    })
}
