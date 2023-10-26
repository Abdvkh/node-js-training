let users = [
    {
        id: 1,
        name: 'Ann',
        email: 'ann@google.com',
        hobbies: ['books', 'sport', 'dancing'],
    },
    {
        id: 2,
        name: 'Ben',
        email: 'ben@google.com',
        hobbies: ['series', 'sport'],
    },
];

function createUser(req, res) {
    let body = '';

    req.on('data', (chunk) => {
        body += chunk.toString();
    });

    req.on('end', () => {
        const newUser = JSON.parse(body);
        newUser.id = users.length + 1;
        users.push(newUser);

        res.writeHead(201, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(newUser));
    });
}

function deleteUser(req, res, userId) {
    const index = users.findIndex((user) => user.id === userId);

    if (index !== -1) {
        const deletedUser = users.splice(index, 1)[0];
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(deletedUser));
    } else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'User not found' }));
    }
}

function updateUser(req, res, userId) {
    let body = '';

    req.on('data', (chunk) => {
        body += chunk.toString();
    });

    req.on('end', () => {
        const updatedUser = JSON.parse(body);
        const index = users.findIndex((user) => user.id === userId);

        if (index !== -1) {
            users[index] = { ...users[index], ...updatedUser };
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(users[index]));
        } else {
            res.writeHead(404, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'User not found' }));
        }
    });
}

function getUserById(req, res, userId) {
    const user = users.find((user) => user.id === userId);

    if (user) {
        const { id, name, email } = user;
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
            id,
            name,
            email,
            links: [
                { rel: 'self', href: `/users/${id}` },
                { rel: 'hobbies', href: `/users/${id}/hobbies` },
            ]
        }));
    } else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'User not found' }));
    }
}

function getUsersList(req, res) {
    const userList = users.map(({ id, name, email }) => ({
        id,
        name,
        email,
        links: [
            { rel: 'self', href: `/users/${id}` },
            { rel: 'hobbies', href: `/users/${id}/hobbies` },
        ]
    }));
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(userList));
}

module.exports = {
    createUser,
    deleteUser,
    updateUser,
    getUserById,
    getUsersList,
};
