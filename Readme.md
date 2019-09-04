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
}
```
where:

`s3`	AWS s3 instance

`bucket`	name of the bucket inside s3

## Usage
``` javascript
const getBucketStructure = require('get-s3-bucket-structure')

const  s3  =  new  AWS.S3({
accessKeyId:  "<Access Key Here>",
secretAccessKey:  "<Secret Access Key Here>"
})

const  options  = {'s3':  s3, 'bucket':  'test-bucket'}

const  bucketStructure  =  await  getBucketStructure(options)
console.log('bucketStructure -->>', bucketStructure)

/* As a promise */
getBucketStructure(options)
.then((bucketStructure) => {
console.log('bucketStructure -->>', bucketStructure)
})
.catch((err) => {
console.log('error', err)
})
```

## Result
