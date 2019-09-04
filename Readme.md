# get s3 folder structure
npm module to get folder structure from AWS S3 bucket - returns the bucket contents as a JSON object.

## Installation


## options
The module requires an option object 
``` javascript
{
 s3
 bucket
}
```
where:
`s3`	AWS s3 instance
`bucket`	name of bucket inside s3

## usage
``` javascript
const  s3  =  new  AWS.S3({
accessKeyId:  "<Access Key Here>",
secretAccessKey:  "<Secret Access Key Here>"
})
```
