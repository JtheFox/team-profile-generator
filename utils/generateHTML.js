const roles = new Map(Object.entries({
    manager: {
        icon: 'fa-user-tie',
        cardInfo(info) {return `Office number: ${info}`;}
    },
    engineer: {
        icon: 'fa-helmet-safety',
        cardInfo(info) {return `GitHub: <a href="https://github.com/${info}">${info}</a>`;}

    },
    intern: {
        icon: 'fa-graduation-cap',
        cardInfo(info) {return `School: ${info}`;}
    }
}));

function generateMemberCard(member) {
    return `<article class="card bg-light m-4" style="min-width: 16rem;">
                <div class="card-header bg-primary text-light p-3">
                    <p class="h4">${member.name}</p>
                    <div class="d-flex align-items-center h5">
                        <i class="fa-solid ${roles.get(member.role).icon}"></i>
                        <p class="ms-2 my-0">${member.role}</p>
                    </div>
                </div>
                <div class="card-body">
                    <p>${member.id}</p>
                    <p>Email: <a href="mailto:${member.email}">${member.email}</a></p>
                    <p>${roles.get(member.role).cardInfo(member.info)}</p>
                </div>
            </article>`;
}

function generateHTML(members) {
    return `
    <!DOCTYPE html>
    <html lang="en">

    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="min-width=device-width, initial-scale=1.0">
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet"
            integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
        <title>My Team</title>
    </head>

    <body>
        <header class="container-fluid text-center bg-secondary p-3">
            <h1 class="text-light">My Team</h1>
        </header>

        <main class="d-flex flex-wrap justify-content-center align-items-center p-5 mx-auto w-75">
            ${members.map(mem => generateMemberCard(mem)).join('\n')}
        </main>

        <script src="https://kit.fontawesome.com/1b2e971152.js" crossorigin="anonymous"></script>
    </body>

    </html>
    `;
}

module.exports = generateHTML;