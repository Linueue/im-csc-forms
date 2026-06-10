<div class="content-container bg-background">
    <div class="content flex flex-col gap-2">
        <h1 class="">Privacy Policy</h1>
        <p>Last Updated: May 28, 2026</p>
        <ol>
            <li>
                <b>Educational Purpose & Disclaimer</b>
                <p>This website is a student project developed for the University with the Bachelor of Science in Computer Science program. It is not affliated with, endorsed by, or connected to any government agency. This platform simulates the digitalization of government forms strictly for academic demonstration, and educational purposes.</p>
            </li>
            <li>
                <b>Data Collection</b>
                <p>This database is designed for fabricated, synthetic, or "dummy" data only.</p>
                <ul>
                    <li><b>DO NOT enter real personal information</b>: Do not enter your actual name, real address, or any data that can be traced back to the user.</li>
                    <li><b>Assumption of Risk</b>: If you ignore this warning, and voluntarily input real sensitive information into this educational sandbox, you do so at your own risk, understanding that this system does not have the security infrastructure of a production government database.</li>
                </ul>
            </li>
            <li>
                <b>What We Collect & Why</b>
                <p>To demonstrate Relational Database Management (RDB) functionality, this project collects the data you type into the web forms. This may include (but is not limited to) simulated fields for:</p>
                <ul>
                    <li>Full Name</li>
                    <li>Date of Birth</li>
                    <li>Address</li>
                    <li>Citizenship</li>
                    <li>Mobile Number</li>
                    <li>Email</li>
                    <li>Picture</li>
                    <li>Signature</li>
                </ul>
            </li>
            <li>
                <b>Data Storage, Sharing, and Deletion</b>
                <ul>
                    <li><b>Storage</b>: Data is stored on a MySQL database, with the pictures uploaded to Backblaze B2 object storage, and is likely accessible to the project team, and course instructor.</li>
                    <li><b>No Commercial Use</b>: We do not sell, rent, or use this data for marketing. We do not analyze the data for trends.</li>
                    <li><b>No Real Verification</b>: This system does not verify, or validate data against real government records</li>
                    <li><b>Retention</b>: Data may be wiped frequently during development. Assume any data entered is non-permanent, and non-secure</li>
                </ul>
            </li>
            <li>
                <b>Technical Access</b>
                <p>As with most websites, the server infrastructure may temporarily log standard technical information, including your IP address, and browser type. This is standard for functioning web servers, and is used for debugging coursework only.</p>
            </li>
        </ol>
    </div>
</div>

<style>
    ol {
        list-style-type: decimal;
        padding-left: 1.5em;
    }

    ul {
        list-style-type: disc;
        padding-left: 1.5em;
    }

    li {
        padding-top: 0.25em;
    }

    h1
    {
        font-size: 2rem;
        padding: 0.25rem 0rem 0.25rem 0rem;
        font-family: var(--font-serif);
    }

    .content-container
    {
        padding: 0em;
        display: flex;
        flex-direction: column;
        align-items: center;
        height: 100%;
    }

    .content
    {
        padding: 0.25em 1em 1em 1em;
        max-width: 80ch;
        width: 100%;
        border-radius: var(--radius);
        min-height: 50vh;
    }
</style>
