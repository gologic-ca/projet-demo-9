import { Octokit } from "octokit";

const octokit = new Octokit({
  auth: process.env.ACTION_TOKEN,
});

async function closeInvalidIssues() {
  try {
    const owner = 'gologic-ca'; 
    const repo = 'projet-demo'; 

    console.log('Entering closeInvalidIssues method');
    console.log(`Owner: ${owner}`);
    console.log(`Repo: ${repo}`);

    const invalidIssues = await octokit.paginate(octokit.rest.issues.listForRepo, {
      owner,
      repo,
      state: 'open',
      labels: 'invalid'
    });

    console.log(`Found ${invalidIssues.length} open issues`);

    for (const issue of invalidIssues) {
      console.log(`Closing issue #${issue.number}`);
      await octokit.rest.issues.update({
        owner,
        repo,
        issue_number: issue.number,
        state: 'closed',
      });
      console.log(`Issue #${issue.number} closed`);
    }
  } catch (error) {
    console.error('An error occurred:', error);
  }
}

closeInvalidIssues().catch(console.error);
