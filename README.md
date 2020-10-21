```
Command-line tool to stream logs from Logentries
```
This CLI tool helps you to query live logs from the command line and also search for a specific text on logentries.com.  The logentries portal has a start live tail button, however the browser update on the DOM was a bit slower than streaming on the command line. 

## Installation: 
```npm install -g logentries_reader_cli```

## Usage:

#### How to initialize the module ?

```angular2
logentries-reader liveTail
```

```angular2
logentries-reader liveTail
? Provide the logset value that would like to query 123abc-ahfo-wwe2dh-ahhwofhes
? Provide your logentries token 13hsfghw-f090-523a-2z1e-11c98sha1986
? Do you like to search the logsets for any specific search string  No
No Search entry supplied. 
Connecting to logentries.com. Please wait..
[
  '2020-10-21T07:42:13.084Z info [HEAD] - [UNAUTHORIZED] - [/] - Query: {} - Body: {}'
]
[
  '2020-10-21T07:42:15.578Z info [GET] - [UNAUTHORIZED] - [/] - Query: {} - Body: {}',
  '2020-10-21T07:42:14.885Z info [GET] - [UNAUTHORIZED] - [/] - Query: {} - Body: {}'
]
[
  '2020-10-21T07:42:25.394Z info [GET] - [UNAUTHORIZED] - [/] - Query: {} - Body: {}'
]
[
  '2020-10-21T07:42:42.715Z info [GET] - [UNAUTHORIZED] - [/] - Query: {} - Body: {}'
]
[
  '2020-10-21T07:43:17.748Z info [HEAD] - [UNAUTHORIZED] - [/] - Query: {} - Body: {}'
]
[
  '2020-10-21T07:43:20.005Z info [GET] - [UNAUTHORIZED] - [/] - Query: {} - Body: {}'
]
[
  '2020-10-21T07:44:12.293Z info [HEAD] - [UNAUTHORIZED] - [/] - Query: {} - Body: {}'
]
[
  '2020-10-21T07:44:15.105Z info [GET] - [UNAUTHORIZED] - [/] - Query: {} - Body: {}'
]
[
  '2020-10-21T07:44:25.854Z info [GET] - [abc@gmail.com] - [/prod/search/lookup?group=we&s_for=support@g.co.jp] - Query: {"group":"users","repo":"ng","s_op":"eq","s_on":"username","s_for":"support@gmail.jp"} - Body: {}'
]
[
  '2020-10-21T07:44:26.276Z info [GET] - [abc@google.com] - [/prod/search/lookup?group=wi&s_for=suppor@g.co.jp] - SEARCH USER IN NG > RESPONSE CODE > 200'
]

```

![](https://github.com/Shankar-IBM-ISL-Developer/logentries_reader_cli/blob/master/image.png)


