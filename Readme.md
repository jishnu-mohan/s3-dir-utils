﻿# get s3 folder structure
npm module to get folder structure from AWS S3 bucket - returns the bucket contents as a JSON object.

## Installation

## Features

This module features 3 APIs
1. `getStructure` - returns the file structure of the bucket as a JSON object.
2. `fileExists` - to check whether a file is present inside the bucket.
3. `getAllFiles` - returns an array of all files inside the bucket.

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

### To get the file structure of a bucket
``` javascript
const s3B = require('get-s3-bucket-structure')

const  s3  =  new  AWS.S3({
accessKeyId:  "<Access Key Here>",
secretAccessKey:  "<Secret Access Key Here>"
})

const  options  = {'s3':  s3, 'bucket':  '<Bucket Name>'}

const  bucketStructure  =  await  s3B.getStructure(options)
console.log('bucketStructure -->>', bucketStructure)

/* As a promise */

s3B.getStructure(options)
.then((bucketStructure) => {
console.log('bucketStructure -->>', bucketStructure)
})
.catch((err) => {
console.log('error', err)
})
```
### To get file structure of a folder inside bucket
```javascript
const  options  = {'s3':  s3, 'bucket':  '<Bucket Name>', 'folder': '<Folder Name>'}

const  folderStructure  =  await  s3B.getStructure(options)
console.log('folderStructure -->>', folderStructure)

/* As a promise */

s3B.getStructure(options)
.then((folderStructure) => {
console.log('folderStructure -->>', folderStructure)
})
.catch((err) => {
console.log('error', err)
})
```

### To check whether a file is present inside the bucket
Returns a boolean -
`true` if the file is present inside the bucket & 
`false` if the file is not present inside the bucket
``` javascript
const  options  = {'s3':  s3, 'bucket':  '<Bucket Name>'}
const file = '<File Name>'

const isFileExists  =  await  s3B.fileExists(options, file)
console.log('File Exists -->>', isFileExists)

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
`true` if the file is present inside the folder & 
`false` if the file is not present inside the folder
``` javascript
const  options  = {'s3':  s3, 'bucket':  '<Bucket Name>', 'folder': '<Folder Name>'}
const file = '<File Name>'

const isFileExists  =  await  s3B.fileExists(options, file)
console.log('File Exists -->>', isFileExists)

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
console.log('error', err)
})
```

### To get a list of all files inside the bucket
Returns an array of file names inside the bucket
``` javascript
const  options  = {'s3':  s3, 'bucket':  '<Bucket Name>'}

const  files  =  await  s3B.getAllFiles(options)
console.log('files inside bucket -->>', files)

/* As a promise */

s3B.getAllFiles(options)
.then((files) => {
console.log('files inside bucket -->>', files)
})
.catch((err) => {
console.log('error', err)
})
```

### To get a list of all files inside a folder in the bucket
Returns an array of all file names present inside the folder
``` javascript
const  options  = {'s3':  s3, 'bucket':  '<Bucket Name>', 'folder': '<Folder Name>'}

const  files  =  await  s3B.getAllFiles(options)
console.log('files inside folder -->>', files)

/* As a promise */

s3B.getAllFiles(options)
.then((files) => {
console.log('files inside folder -->>', files)
})
.catch((err) => {
console.log('error', err)
})
```


