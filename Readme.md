# s3 dir utils
![GitHub](https://img.shields.io/github/license/jishnu-mohan/s3-dir-utils)

npm module to get AWS s3 bucket details

## Installation
`npm i s3-dir-utils`
## Features

This module features 3 APIs
1. `getStructure` - returns the file structure of the bucket as a JSON object.
2.  `getAllFiles` - returns an array of all files inside the bucket.
3. `fileExists` - to check whether a file is present inside the bucket.


## Options
The module requires an option object 
``` javascript
{
 s3
 bucket
 folder
}
```
where:

`s3`	AWS s3 instance

`bucket`	name of bucket inside s3

`folder` (optional) returns the file structure of a folder inside the bucket

## Usage

### To get the file structure of the bucket
Returns the file structure of the bucket as a JSON object
``` javascript
const s3B = require('s3-dir-utils')

const  s3  =  new  AWS.S3({
accessKeyId:  "<Access Key Here>",
secretAccessKey:  "<Secret Access Key Here>"
})

const  options  = {'s3':  s3, 'bucket':  '<Bucket Name>'}

try {
  const  bucketStructure  =  await  s3B.getStructure(options)
  console.log('bucketStructure -->>', bucketStructure)
}
catch (e) {
  console.log('ERROR', e)
}

/* As a promise */

s3B.getStructure(options)
.then((bucketStructure) => {
console.log('bucketStructure -->>', bucketStructure)
})
.catch((err) => {
console.log('error', err)
})
```
### To get file structure of a folder inside the bucket
Returns the file structure of a folder inside the bucket as JSON object
```javascript
const  options  = {'s3':  s3, 'bucket':  '<Bucket Name>', 'folder': '<Folder Name>'}

try {
  const  folderStructure  =  await  s3B.getStructure(options)
  console.log('folderStructure -->>', folderStructure)
}
catch (e) {
  console.log('ERROR', e)
}

/* As a promise */

s3B.getStructure(options)
.then((folderStructure) => {
console.log('folderStructure -->>', folderStructure)
})
.catch((err) => {
console.log('ERROR', err)
})
```

### To check whether a file is present inside the bucket
Returns a boolean -
`true` if the file is present inside the bucket or
`false` if the file is not present inside the bucket
``` javascript
const  options  = {'s3':  s3, 'bucket':  '<Bucket Name>'}
const file = '<File Name>'

try {
  const isFileExists  =  await  s3B.fileExists(options, file)
  console.log('File Exists -->>', isFileExists)
}
catch (e) {
  console.log('ERROR', e)
}

/* As a promise */

s3B.fileExists(options, file)
.then((isFileExists) => {
console.log('File Exists -->>', isFileExists)
if(isFileExists) {
  // do something when the file exists inside the bucket 
}
else {
  // do something when the file does not exist inside the bucket
}
})
.catch((err) => {
console.log('error', err)
})
```
### To check whether a file exists inside a folder in the bucket
Returns a boolean -
`true` if the file is present inside the folder or
`false` if the file is not present inside the folder
``` javascript
const  options  = {'s3':  s3, 'bucket':  '<Bucket Name>', 'folder': '<Folder Name>'}
const file = '<File Name>'

try {
  const isFileExists  =  await  s3B.fileExists(options, file)
  console.log('File Exists -->>', isFileExists)
}
catch (e) {
  console.log('ERROR', e)
}


/* As a promise */

s3B.fileExists(options, file)
.then((isFileExists) => {
console.log('File Exists -->>', isFileExists)
if(isFileExists) {
  // do something when the file exists inside the folder 
}
else {
  // do something when the file does not exist inside the folder
}
})
.catch((err) => {
console.log('ERROR', err)
})
```

### To get a list of all files inside the bucket
Returns an array of file names inside the bucket
``` javascript
const  options  = {'s3':  s3, 'bucket':  '<Bucket Name>'}

try {
  const  files  =  await  s3B.getAllFiles(options)
  console.log('files inside bucket -->>', files)
}
catch (e) {
  console.log('ERROR', e)
}

/* As a promise */

s3B.getAllFiles(options)
.then((files) => {
console.log('files inside bucket -->>', files)
})
.catch((err) => {
console.log('ERROR', err)
})
```

### To get a list of all files inside a folder in the bucket
Returns an array of all file names present inside the folder
``` javascript
const  options  = {'s3':  s3, 'bucket':  '<Bucket Name>', 'folder': '<Folder Name>'}

try {
  const  files  =  await  s3B.getAllFiles(options)
  console.log('bucketStructure -->>', bucketStructure)
}
catch (e) {
  console.log('ERROR', e)
}

console.log('files inside folder -->>', files)

/* As a promise */

s3B.getAllFiles(options)
.then((files) => {
console.log('files inside folder -->>', files)
})
.catch((err) => {
console.log('ERROR', err)
})
```
### License
The package is licensed under the terms of [MIT License](https://github.com/jishnu-mohan/s3-dir-utils/blob/master/LICENSE)


