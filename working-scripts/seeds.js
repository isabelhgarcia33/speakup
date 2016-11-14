rep1 = {handle: "@justdroo"}
issue1 = "Gay Marriage"

function formSetup(){

  function issuesSelectFormat() {
    let issues = ["Gay Marriage", "Gun Control", "Abortion", "Education", "Free Ice Cream", "Lil' Bub 4 Prez"]

    let formatted = issues.map(function(issue, index){
      return `<option value ="${issue}"> ${issue}</option>`
    })

    return formatted
  } //end issuesSelectFormat

  function appendIssuesSelect(issuesSelectFormat){
    let formatted = issuesSelectFormat()
    let selector = $('#issues')
    formatted.forEach(function(issueOption) {
      selector.append(issueOption)
    })

  } //end appendIssuesSelect

  let x = issuesSelectFormat
  appendIssuesSelect(x)

} //end formSetup

$(function() {
  formSetup();
})
