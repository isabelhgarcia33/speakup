function initiateMessage(htmlElement){
	
	let citizen = store.citizens[store.citizens.length-1]
	let repArray = $.grep(store.representatives, function(e){ return e.id === parseInt(htmlElement.dataset.id); });
	let rep = repArray[0]
	let issue = $(`#${rep.id} [name=issues]`).val()
	let stance = $(`#${rep.id} [name=stance]`).val()
	let method = $(`#${rep.id} [name=method]`).val()
	citizen.issues[issue] = stance
	let message = new Message(citizen, rep, issue, stance, method)
}

function activate(message){
    if(store.messages.indexOf(message) === -1){
          alert("you've already contacted this representative about this issue!")
        }
    message.rep.issues[message.issue] = message.rep.issues[message.issue] || {pro: [], against: []}
    message.citizen.messages = [...message.citizen.messages, message]
    message.rep.issues[message.issue][message.stance] = message.rep.issues[message.issue][message.stance] || []
    let similarMessages = message.rep.issues[message.issue][message.stance]

    switch (message.method) {
      case 'email':
      if(message.stance === "pro"){
            similarMessages.push(message)
            sendEmailPro(message)
            }
      else {
            similarMessages.push(message)
            sendEmailAnti(message)
        }
        break
      case 'tweet':
      if(message.stance === "pro"){
            similarMessages.push(message)
            sendTweetPro(message)
            }
      else {
            similarMessages.push(message)
            sendTweetAnti(message)
        }

    }
  }

function sendEmailPro(message){
  let repEmail = message.rep.email
  let subject = message.issue
  let body = proEmail[subject]
  window.location.href = `mailto:${repEmail}?subject=${subject}&body=${body}`
}

function sendEmailAnti(message){
  let repEmail = message.rep.email
  let subject = message.issue
  let body = antiEmail[subject]
  window.location.href = `mailto:${repEmail}?subject=${subject}&body=${body}`
}

function sendTweetPro(message){

  let base = 'https://twitter.com/intent/tweet?'
  let text = `@${message.rep.twitter}, ${proTweets[message.issue]}`
  let hashtags = 'speakup,democracy'
  let via = 'speakup'
  let url = `${base}text=${text}&hashtags=${hashtags}&via=${via}`
  window.open(url)
}

function sendTweetAnti(message){

  let base = 'https://twitter.com/intent/tweet?'
  let text = `@${message.rep.twitter}, ${antiTweets[message.issue]}`
  let hashtags = 'speakup,democracy'
  let via = 'speakup'
  let url = `${base}text=${text}&hashtags=${hashtags}&via=${via}`
  window.open(url)
}