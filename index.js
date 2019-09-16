/**
 * Function to get the structure of AWS s3 bucket
 * @param {Object} options 
 * @param {AWS s3 instance} options.s3 - AWS s3 instance
 * @param {string} options.bucket - name of the bucket
 * @param {string} options.folder - name of the folder
 * @return {Promise<Object>} - promise to the bucket structure as JSON object
 */

async function getStructure(options) {
  return new Promise((resolve, reject) => {
    if (!options.hasOwnProperty('s3') || options.s3 === null) { throw new Error('Missing required parameter s3') }
    if (!options.hasOwnProperty('bucket') || options.bucket === null) { throw new Error('Missing required parameter bucket') }

    let prefix = (!options.hasOwnProperty('folder') || options.folder === null) ? '' : String(options.folder)
    let s3 = options.s3
    let bucket = options.bucket
    let params = {
      Bucket: bucket,
      Prefix: prefix
    }

    s3.listObjectsV2(params, async function (err, data) {
      if (err) return reject(err)
      if (data.hasOwnProperty('Contents') && data.Contents.length === 0) {
        if (options.hasOwnProperty('folder'))
          return reject(`${prefix} is empty or no such folder exists`)
        else
          return reject(`${bucket} is empty or no such bucket exists`)
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
        fileStructure = { ...fileStructure, ...result }
      })
      .catch((e) => {
        throw new Error(e)
      })
  })
  return fileStructure
}

async function getFolders(key, parentObject) {
  if (key && key.includes('/')) {
    var directory = key.split('/')[0]
    let remainingPath = key.replace(directory + "/", "")
    if (parentObject.hasOwnProperty(directory)) {
      let result = await getFolders(remainingPath, parentObject[directory])
      parentObject[directory] = { ...parentObject[directory], ...result }
      return parentObject
    }
    else {
      parentObject[directory] = {}
      let result = await getFolders(remainingPath, parentObject[directory])
      parentObject[directory] = { ...parentObject[directory], ...result }
      return parentObject
    }
  }
  else {
    parentObject[key] = {}
    return parentObject
  }
}

/**
 * Function to check whether a file is present inside the bucket
 * @param {Object} options 
 * @param {AWS s3 instance} options.s3 - AWS s3 instance
 * @param {string} options.bucket - name of the bucket
 * @param {string} options.folder - name of the folder
 * @param {string} file - name of file
 * @returns {Promise<boolean>} - promise - true if file is present or false if file is not present
 */

async function fileExists(options, file) {
  return new Promise((resolve, reject) => {
    if (!options.hasOwnProperty('s3') || options.s3 === null) { throw new Error('Missing required parameter s3') }
    if (!options.hasOwnProperty('bucket') || options.bucket === null) { throw new Error('Missing required parameter bucket') }
    if (!file || file === null) { throw new Error('Missing required parameter file name') }
    let prefix = (!options.hasOwnProperty('folder') || options.folder === null) ? '' : String(options.folder)
    let s3 = options.s3
    let bucket = options.bucket

    let params = {
      Bucket: bucket,
      Prefix: prefix
    }

    s3.listObjectsV2(params, async function (err, data) {
      if (err) return reject(err)
      if (data.hasOwnProperty('Contents') && data.Contents.length === 0) {
        if (options.hasOwnProperty('folder'))
          return reject(`${prefix} is empty or no such folder exists`)
        else
          return reject(`${bucket} is empty or no such bucket exists`)
      }
      else {
        let files = await getFiles(data.Contents)
        return resolve(files.includes(file))
      }
    })
  })
}

/**
 * Function to get a list of all files present inside the bucket
 * @param {Object} options 
 * @param {AWS s3 instance} options.s3 - AWS s3 instance
 * @param {string} options.bucket - name of the bucket
 * @param {string} options.folder - name of folder
 * @param {string} file - name of the file
 * @returns {Promise<Array<string>>} - names of files present inside the bucket
 */

async function getAllFiles(options) {
  return new Promise((resolve, reject) => {
    if (!options.hasOwnProperty('s3') || options.s3 === null) { throw new Error('Missing required parameter s3') }
    if (!options.hasOwnProperty('bucket') || options.bucket === null) { throw new Error('Missing required parameter bucket') }
    let prefix = (!options.hasOwnProperty('folder') || options.folder === null) ? '' : String(options.folder)
    let s3 = options.s3
    let bucket = options.bucket

    let params = {
      Bucket: bucket,
      Prefix: prefix
    }

    s3.listObjectsV2(params, async function (err, data) {
      if (err) return reject(err)
      if (data.hasOwnProperty('Contents') && data.Contents.length === 0) {
        if (options.hasOwnProperty('folder'))
          return reject(`${prefix} is empty or no such folder exists`)
        else
          return reject(`${bucket} is empty or no such bucket exists`)
      }
      else {
        let files = await getFiles(data.Contents)
        return resolve(files)
      }
    })
  })
}

async function getFiles(contents) {
  let files = []
  contents.forEach((object) => {
    let key = object.Key
    if (key && key.includes('/')) {
      files.push(key.split('/').pop())
    }
    else {
      files.push(key)
    }
  })
  return files
}

exports.getStructure = getStructure
exports.fileExists = fileExists
exports.getAllFiles = getAllFiles
