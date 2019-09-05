# get s3 folder structure
npm module to get folder structure from AWS S3 bucket - returns the bucket contents as a JSON object.

## Installation

## Features

- returns the bucket structure as JSON object
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

const  options  = {'s3':  s3, 'bucket':  'test-bucket'}

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
const  options  = {'s3':  s3, 'bucket':  'test-bucket', 'folder': '<Folder Name>'}

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
## Result
