import { Octokit } from "@octokit/rest";

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
});

async function closeInvalidIssues() {
  try {
    const owner = 'your-repository-owner'; // replace with repository owner
    const repo = 'your-repository-name'; // replace with repository name

    console.log('Entering closeInvalidIssues method');
    console.log(`Owner: ${owner}`);
    console.log(`Repo: ${repo}`);

    const { data: issues } = await octokit.paginate(octokit.issues.listForRepo, {
      owner,
      repo,
      state: 'open',
    });

    console.log(`Found ${issues.length} open issues`);
    const invalidIssues = issues.filter(issue => issue.labels.some(label => label.name === 'invalid'));

    for (const issue of invalidIssues) {
      console.log(`Closing issue #${issue.number}`);
      await octokit.issues.update({
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
