# holochain-imagestore

A proof of concept for storing images in Holochain and displaying them in the browser

## Background

The crux of the method involves converting images to Base64 string encoding. This is done using the FileReader object from the standard javascript library

```javascript
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
```
The Holochain side is minimal. Image objects are stored in the DHT and linked to the DNA hash for easy retrieval

```javascript
function storeImage(payload) {
  debug('storeImage called with: ' + payload)
  var entryHash = commit('imageEntry', payload)
  // link everything to the DNA hash for now
  commit('imageLinks', { Links: [ { Base: App.DNA.Hash, Link: entryHash, Tag: 'image' } ] })
  return entryHash
}
```


## Getting Started

This example includes a web ui for uploading and then retrieving images. 
```
hcdev web
```

### Running Tests

No tests at this stage

## Next steps

So far this has only been tested with a single node. More tests cases should be devised to identify any limitations (e.g. image size, formats, number of images). 

It would also be interesting to investigate the load times when retrieving an image from another node in the DHT and the influence of different parameters on the load times.

In this example images are stored as a single entry in the DHT. This is ok for small images/files but it would be worth testing sharding of files across multiple nodes, similar to Bittorrent and IPFS. This would spread the storage costs more evenly across the network.

## Authors

* **Willem Olding** - *Initial work* - (https://github.com/willemolding)
