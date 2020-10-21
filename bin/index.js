#!/usr/bin/env node
let fetchLogEntries = require('../lib/fetchLogEntries');
let inquirer = require('inquirer');


async function probeForInput(){
  let questions = {
    type: 'input',
    name: 'answer',
    message: 'Provide the logset value that would like to query',
    default: '1'
  }
  let answer = await inquirer.prompt(questions);
  let logset = answer.answer;
  questions.message = `Provide your logentries token`;
  let answer1  = await inquirer.prompt(questions);
  let token = answer1.answer;
  questions.message = `Do you like to search the logsets for any specific search string `
  questions.type = 'confirm'
  let answer2 = await inquirer.prompt(questions);

  if (answer2 == 'true') {
    questions.type = 'input';
    questions.message = "Provide your search string"
    let answer3 = await inquirer.prompt(questions);
    searchForText(answer3, logset, token);
  } else {
    console.log('No Search entry supplied. ')
    liveTail(logset, token)
  }
}



/**
 * Function: Function to be called from command line to tail logs from logentries
 * @param logset
 * @param token
 * @param query
 */
function liveTail (logset, token) {
  console.log('Connecting to logentries.com. Please wait..')
  let logEntriesURL = new URL(`https://rest.logentries.com/query/live/logs/${logset}`);

  let options = {
    url: logEntriesURL,
    method: 'GET',
    headers : {
      'x-api-key': token
    }
  };
  initate_request(logEntriesURL, options);

}


function searchForText(query, logset, token) {

  let logEntriesURL = new URL(`https://rest.logentries.com/query/live/logs/${logset}`)
  let params;
  if (typeof(query) != 'undefined') {
    params = {query:`where(${query})`}
    logEntriesURL.search = new URLSearchParams(params).toString();
  }

  let options = {
    url: logEntriesURL,
    method: 'GET',
    headers : {
      'x-api-key': token
    }
  };

  initate_request(logEntriesURL, options);
}

function initate_request(url, params) {
  fetchLogEntries.fetchData(params.url, params)
      .then(async(res) => {
        if (res.status == 200) {
          const resData = await res.json();
          const hrefLink = resData.links[0].href;
          let i = 1;
          while(i > 0 ){
            let data = await retry_link(hrefLink, params, url);
            i++
          }
        }
      })
}

function retry_link(url, params, inititalurl) {
  return new Promise((resolve, reject) => {
    fetchLogEntries.fetchData(url, params)
        .then(async(res) => {
          if(res.status == 200) {
            const resData = await res.json();
            const events = resData.events;
            if(events.length > 0) {
              let obj = [];
              events.forEach(item => {
                obj.push(item.message)
              })
              Promise.all(obj).then((obj => {
                console.log(obj)
                resolve(obj);
                retry_link(url, params);
              }));
            }
            retry_link(url, params);
          } else {
            //if we get any 404 file not found , reinitate the request
            console.log(`Received non 200 from logentries, so reinitiating the authentication`);
            initate_request(inititalurl, params)
          }
        })
  })
}

module.exports = {
  liveTail: probeForInput()
}


