import { Octokit } from "octokit";

const octokit = new Octokit({
  auth: process.env.ACTION_TOKENs,
});

async function closeInvalidIssues() {
  try {
    const owner = 'gologic-ca'; 
    const repo = 'projet-demo'; 

    console.log('Entering closeInvalidIssues method');
    console.log(`Owner: ${owner}`);
    console.log(`Repo: ${repo}`);

    // create 40 issues with random label invalid or bug
    for (let i = 1; i <= 40; i++) {
      const labels = i % 2 === 0 ? ['invalid'] : ['bug'];
      await octokit.rest.issues.create({
        owner,
        repo,
        title: `Issue ${i}`,
        body: `This is issue #${i}`,
        labels,
      });
      console.log(`Issue #${i} created`);
    }
  }
}

closeInvalidIssues().catch(console.error);
