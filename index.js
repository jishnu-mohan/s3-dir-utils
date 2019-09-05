
async function getStructure(options) {
  return new Promise((resolve, reject) => {
    if (!options.hasOwnProperty('s3') || options.s3 === null) { return reject('Missing required parameter s3') }
    if (!options.hasOwnProperty('bucket') || options.bucket === null) { return reject('Missing required parameter bucket') }
    let prefix = (!options.hasOwnProperty('folder') || options.folder === null)? '' : String(options.folder)
    let s3 =  options.s3
    let bucket = options.bucket

    let params = { 
      Bucket: bucket,
      Prefix: prefix
    }
    
    s3.listObjectsV2(params, async function (err, data) {
      if(err) return reject(err)
      if(data.hasOwnProperty('Contents') && data.Contents.length === 0) {
        return reject(`bucket "${bucket}" is empty`)
      }
      else {
       let bucketContents = await getBucketContents(data.Contents)
        return resolve(bucketContents)
      }
    })
  })
}

var fileStructure = {}

async function getBucketContents(contents) {
  contents.forEach(async (object) => {
    let key = object.Key
    await getFolders(key, fileStructure)
    .then((result) => {
      fileStructure = {...fileStructure, ...result}
    })
    .catch((e) => {
      throw new Error(e)
    })
  })
    return fileStructure
}

async function getFolders(key, parentObject) {
  if(key && key.includes('/')) {
    var directory = key.split('/')[0]
    let remainingPath = key.replace(directory+"/","")
    if(parentObject.hasOwnProperty(directory)) {
      let result = await getFolders(remainingPath, parentObject[directory])
      parentObject[directory] = {...parentObject[directory], ...result}
      return parentObject
    }
    else {   
      parentObject[directory] = {}
      let result = await getFolders(remainingPath, parentObject[directory])
      parentObject[directory] = {...parentObject[directory], ...result}
      return parentObject
    }
  }
  else {
    parentObject[key] = {}
    return parentObject
  }
}

exports.getStructure = getStructure
